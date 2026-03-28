"""
Stripe Payment Integration for D's Empire
Handles subscriptions, one-time payments, and webhooks
"""

from fastapi import APIRouter, HTTPException, Request, Header
from pydantic import BaseModel, Field
from typing import Optional, Dict, List
from datetime import datetime, timezone
import os
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout,
    CheckoutSessionResponse,
    CheckoutStatusResponse,
    CheckoutSessionRequest
)

router = APIRouter(prefix="/api/payments", tags=["payments"])

# Subscription Plans for Empire
SUBSCRIPTION_PLANS = {
    "basic": {
        "name": "Empire Basic",
        "price": 9.99,
        "currency": "usd",
        "features": ["Access to all 4 AI assistants", "100 messages/month", "Standard support"]
    },
    "pro": {
        "name": "Empire Pro",
        "price": 29.99,
        "currency": "usd",
        "features": ["Unlimited AI messages", "Priority support", "Voice features", "Early access to new apps"]
    },
    "enterprise": {
        "name": "Empire Enterprise",
        "price": 99.99,
        "currency": "usd",
        "features": ["Everything in Pro", "Custom AI training", "Dedicated support", "White-label options"]
    }
}

# One-time Credit Packages
CREDIT_PACKAGES = {
    "starter": {
        "name": "Starter Pack",
        "credits": 100,
        "price": 10.00,
        "currency": "usd"
    },
    "power": {
        "name": "Power Pack",
        "credits": 500,
        "price": 40.00,
        "currency": "usd"
    },
    "ultimate": {
        "name": "Ultimate Pack",
        "credits": 1000,
        "price": 70.00,
        "currency": "usd"
    }
}


class CheckoutRequest(BaseModel):
    package_type: str = Field(..., description="'subscription' or 'credits'")
    package_id: str = Field(..., description="Package identifier (basic, pro, enterprise, starter, power, ultimate)")
    origin_url: str = Field(..., description="Frontend origin URL for redirect")
    user_email: Optional[str] = Field(None, description="User email for transaction record")
    payment_methods: Optional[List[str]] = Field(default=['card'], description="Payment methods (card, crypto)")


class PaymentTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(__import__('uuid').uuid4()))
    session_id: str
    package_type: str
    package_id: str
    amount: float
    currency: str
    user_email: Optional[str] = None
    payment_status: str = "pending"
    metadata: Dict = {}
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@router.post("/checkout/session")
async def create_checkout_session(
    request: CheckoutRequest,
    http_request: Request
):
    """
    Create a Stripe checkout session for subscription or credits
    """
    try:
        # Get Stripe API key from environment
        api_key = os.getenv("STRIPE_API_KEY")
        if not api_key:
            raise HTTPException(500, "Stripe API key not configured")
        
        # Get package details from backend-defined packages (SECURITY: Never trust frontend for prices)
        if request.package_type == "subscription":
            if request.package_id not in SUBSCRIPTION_PLANS:
                raise HTTPException(400, f"Invalid subscription plan: {request.package_id}")
            package = SUBSCRIPTION_PLANS[request.package_id]
        elif request.package_type == "credits":
            if request.package_id not in CREDIT_PACKAGES:
                raise HTTPException(400, f"Invalid credit package: {request.package_id}")
            package = CREDIT_PACKAGES[request.package_id]
        else:
            raise HTTPException(400, "Invalid package_type. Must be 'subscription' or 'credits'")
        
        # Build dynamic success/cancel URLs from frontend origin
        success_url = f"{request.origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{request.origin_url}/payment/cancel"
        
        # Initialize Stripe checkout
        host_url = str(http_request.base_url).rstrip('/')
        webhook_url = f"{host_url}/api/payments/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=api_key, webhook_url=webhook_url)
        
        # Prepare metadata
        metadata = {
            "package_type": request.package_type,
            "package_id": request.package_id,
            "package_name": package["name"],
            "user_email": request.user_email or "guest"
        }
        
        if request.package_type == "credits":
            metadata["credits"] = str(package["credits"])
        
        # Create checkout session
        checkout_request = CheckoutSessionRequest(
            amount=package["price"],
            currency=package["currency"],
            success_url=success_url,
            cancel_url=cancel_url,
            metadata=metadata,
            payment_methods=request.payment_methods
        )
        
        session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Store transaction in database (MANDATORY before redirect)
        from motor.motor_asyncio import AsyncIOMotorClient
        mongo_url = os.environ.get('MONGO_URL')
        client = AsyncIOMotorClient(mongo_url)
        db = client[os.environ.get('DB_NAME')]
        
        transaction = PaymentTransaction(
            session_id=session.session_id,
            package_type=request.package_type,
            package_id=request.package_id,
            amount=package["price"],
            currency=package["currency"],
            user_email=request.user_email,
            payment_status="pending",
            metadata=metadata
        )
        
        await db.payment_transactions.insert_one(transaction.dict())
        
        return {
            "url": session.url,
            "session_id": session.session_id,
            "package": package["name"],
            "amount": package["price"]
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error creating checkout session: {e}")
        raise HTTPException(500, f"Failed to create checkout session: {str(e)}")


@router.get("/checkout/status/{session_id}")
async def get_checkout_status(session_id: str):
    """
    Get payment status for a checkout session (used for polling)
    """
    try:
        api_key = os.getenv("STRIPE_API_KEY")
        if not api_key:
            raise HTTPException(500, "Stripe API key not configured")
        
        # Initialize Stripe checkout
        stripe_checkout = StripeCheckout(api_key=api_key, webhook_url="")
        
        # Get status from Stripe
        status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        # Update database with latest status
        from motor.motor_asyncio import AsyncIOMotorClient
        mongo_url = os.environ.get('MONGO_URL')
        client = AsyncIOMotorClient(mongo_url)
        db = client[os.environ.get('DB_NAME')]
        
        # Find transaction
        transaction = await db.payment_transactions.find_one(
            {"session_id": session_id},
            {"_id": 0}
        )
        
        if not transaction:
            raise HTTPException(404, "Transaction not found")
        
        # Update status only if changed and not already processed
        if transaction["payment_status"] != status.payment_status:
            update_data = {
                "payment_status": status.payment_status,
                "updated_at": datetime.now(timezone.utc)
            }
            
            # If payment successful and not already credited, add credits/activate subscription
            if status.payment_status == "paid" and transaction["payment_status"] != "paid":
                # TODO: Add credits to user account or activate subscription
                # This is where you'd update user's credits/subscription status
                update_data["processed"] = True
                print(f"✅ Payment successful for session {session_id}")
                print(f"   Package: {transaction['package_id']}")
                print(f"   Amount: ${transaction['amount']}")
            
            await db.payment_transactions.update_one(
                {"session_id": session_id},
                {"$set": update_data}
            )
        
        return {
            "status": status.status,
            "payment_status": status.payment_status,
            "amount_total": status.amount_total,
            "currency": status.currency,
            "metadata": status.metadata,
            "transaction": transaction
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting checkout status: {e}")
        raise HTTPException(500, f"Failed to get checkout status: {str(e)}")


@router.post("/webhook/stripe")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    """
    Handle Stripe webhook events for payment confirmation
    """
    try:
        api_key = os.getenv("STRIPE_API_KEY")
        if not api_key:
            raise HTTPException(500, "Stripe API key not configured")
        
        # Get raw body
        body = await request.body()
        
        # Initialize Stripe checkout
        stripe_checkout = StripeCheckout(api_key=api_key, webhook_url="")
        
        # Handle webhook
        webhook_response = await stripe_checkout.handle_webhook(body, stripe_signature)
        
        # Process webhook event
        print(f"📨 Stripe Webhook: {webhook_response.event_type}")
        print(f"   Session ID: {webhook_response.session_id}")
        print(f"   Payment Status: {webhook_response.payment_status}")
        
        # Update database based on webhook event
        if webhook_response.event_type in ["checkout.session.completed", "payment_intent.succeeded"]:
            from motor.motor_asyncio import AsyncIOMotorClient
            mongo_url = os.environ.get('MONGO_URL')
            client = AsyncIOMotorClient(mongo_url)
            db = client[os.environ.get('DB_NAME')]
            
            await db.payment_transactions.update_one(
                {"session_id": webhook_response.session_id},
                {"$set": {
                    "payment_status": webhook_response.payment_status,
                    "updated_at": datetime.now(timezone.utc),
                    "webhook_received": True
                }}
            )
        
        return {"status": "success", "event": webhook_response.event_type}
        
    except Exception as e:
        print(f"Webhook error: {e}")
        raise HTTPException(400, f"Webhook error: {str(e)}")


@router.get("/plans")
async def get_payment_plans():
    """
    Get available subscription plans and credit packages
    """
    return {
        "subscriptions": SUBSCRIPTION_PLANS,
        "credits": CREDIT_PACKAGES
    }
