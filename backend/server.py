from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import base64
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")

# ============== MODELS ==============

class App(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    category: str
    revenue: float = 0.0
    status: str = "active"  # active, paused, archived
    icon: Optional[str] = None
    is_favorited: bool = False  # New: Track if user favorited this app
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AppCreate(BaseModel):
    name: str
    description: str
    category: str
    icon: Optional[str] = None

class AppUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    revenue: Optional[float] = None
    status: Optional[str] = None
    icon: Optional[str] = None

class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    role: str  # user or assistant
    content: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    response: str
    session_id: str

class ImageGenerateRequest(BaseModel):
    prompt: str
    session_id: Optional[str] = None

class ImageGenerateResponse(BaseModel):
    image_data: str  # base64 encoded
    text_response: Optional[str] = None
    image_id: str

class GeneratedImage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    prompt: str
    image_data: str  # base64
    text_response: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class RevenueSync(BaseModel):
    app_id: str
    amount: float
    api_key: str

class DashboardStats(BaseModel):
    total_apps: int
    active_apps: int
    total_revenue: float
    total_images_generated: int
    total_chats: int
    favorited_apps: int

class QAItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    app_id: Optional[str] = None  # If related to specific app
    question: str
    answer: str
    category: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class QARequest(BaseModel):
    question: str
    app_id: Optional[str] = None
    category: Optional[str] = None

class QAResponse(BaseModel):
    answer: str
    question: str
    qa_id: str

class FavoriteToggle(BaseModel):
    app_id: str

# ============== HELPER FUNCTIONS ==============

async def get_master_api_key():
    """Get or create master API key for external app syncing"""
    key_doc = await db.api_keys.find_one({"type": "master"})
    if not key_doc:
        master_key = f"emp_{uuid.uuid4().hex}"
        await db.api_keys.insert_one({
            "type": "master",
            "key": master_key,
            "created_at": datetime.now(timezone.utc).isoformat()
        })
        return master_key
    return key_doc["key"]

async def verify_api_key(api_key: str) -> bool:
    """Verify if API key is valid"""
    key_doc = await db.api_keys.find_one({"key": api_key, "type": "master"})
    return key_doc is not None

# ============== APP MANAGEMENT ENDPOINTS ==============

@api_router.get("/")
async def root():
    return {"message": "Empire Management API", "version": "1.0.0"}

@api_router.post("/apps", response_model=App)
async def create_app(input: AppCreate):
    """Create a new app in the empire"""
    app_obj = App(**input.model_dump())
    doc = app_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    await db.apps.insert_one(doc)
    return app_obj

@api_router.get("/apps", response_model=List[App])
async def get_apps():
    """Get all apps"""
    apps = await db.apps.find({}, {"_id": 0}).to_list(100)
    for app in apps:
        if isinstance(app.get('created_at'), str):
            app['created_at'] = datetime.fromisoformat(app['created_at'])
        if isinstance(app.get('updated_at'), str):
            app['updated_at'] = datetime.fromisoformat(app['updated_at'])
    return apps

@api_router.get("/apps/{app_id}", response_model=App)
async def get_app(app_id: str):
    """Get specific app by ID"""
    app = await db.apps.find_one({"id": app_id}, {"_id": 0})
    if not app:
        raise HTTPException(status_code=404, detail="App not found")
    if isinstance(app.get('created_at'), str):
        app['created_at'] = datetime.fromisoformat(app['created_at'])
    if isinstance(app.get('updated_at'), str):
        app['updated_at'] = datetime.fromisoformat(app['updated_at'])
    return app

@api_router.put("/apps/{app_id}", response_model=App)
async def update_app(app_id: str, input: AppUpdate):
    """Update app details"""
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    result = await db.apps.update_one(
        {"id": app_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="App not found")
    
    return await get_app(app_id)

@api_router.delete("/apps/{app_id}")
async def delete_app(app_id: str):
    """Delete an app"""
    result = await db.apps.delete_one({"id": app_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="App not found")
    return {"message": "App deleted successfully"}

@api_router.post("/apps/{app_id}/favorite")
async def toggle_favorite(app_id: str):
    """Toggle favorite status for an app"""
    app = await db.apps.find_one({"id": app_id}, {"_id": 0})
    if not app:
        raise HTTPException(status_code=404, detail="App not found")
    
    # Toggle favorite
    new_favorite_status = not app.get('is_favorited', False)
    
    await db.apps.update_one(
        {"id": app_id},
        {"$set": {"is_favorited": new_favorite_status, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    return {"app_id": app_id, "is_favorited": new_favorite_status}

@api_router.get("/apps/favorites/list", response_model=List[App])
async def get_favorite_apps():
    """Get only favorited apps"""
    apps = await db.apps.find({"is_favorited": True}, {"_id": 0}).to_list(100)
    for app in apps:
        if isinstance(app.get('created_at'), str):
            app['created_at'] = datetime.fromisoformat(app['created_at'])
        if isinstance(app.get('updated_at'), str):
            app['updated_at'] = datetime.fromisoformat(app['updated_at'])
    return apps

# ============== AI CHAT ENDPOINTS ==============

@api_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """AI chat assistant - handles medical, legal, business advice"""
    try:
        # Get API key
        api_key = os.getenv("EMERGENT_LLM_KEY")
        
        # Create chat instance with unrestricted system message
        chat_instance = LlmChat(
            api_key=api_key,
            session_id=request.session_id,
            system_message="You are Empire AI Assistant, a powerful AI that provides expert advice on medical, legal, business, and technical topics. You answer all questions thoroughly and professionally without restrictions."
        )
        
        # Use Gemini 3 Flash
        chat_instance.with_model("gemini", "gemini-3-flash-preview")
        
        # Get chat history for context
        history = await db.chat_messages.find(
            {"session_id": request.session_id},
            {"_id": 0}
        ).sort("timestamp", 1).limit(20).to_list(20)
        
        # Create user message
        user_msg = UserMessage(text=request.message)
        
        # Send message
        response = await chat_instance.send_message(user_msg)
        
        # Save user message
        user_message_doc = ChatMessage(
            session_id=request.session_id,
            role="user",
            content=request.message
        ).model_dump()
        user_message_doc['timestamp'] = user_message_doc['timestamp'].isoformat()
        await db.chat_messages.insert_one(user_message_doc)
        
        # Save assistant message
        assistant_message_doc = ChatMessage(
            session_id=request.session_id,
            role="assistant",
            content=response
        ).model_dump()
        assistant_message_doc['timestamp'] = assistant_message_doc['timestamp'].isoformat()
        await db.chat_messages.insert_one(assistant_message_doc)
        
        return ChatResponse(response=response, session_id=request.session_id)
    
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

@api_router.get("/chat/history/{session_id}", response_model=List[ChatMessage])
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    messages = await db.chat_messages.find(
        {"session_id": session_id},
        {"_id": 0}
    ).sort("timestamp", 1).to_list(100)
    
    for msg in messages:
        if isinstance(msg.get('timestamp'), str):
            msg['timestamp'] = datetime.fromisoformat(msg['timestamp'])
    
    return messages

# ============== Q&A ENDPOINTS ==============

@api_router.post("/qa/ask", response_model=QAResponse)
async def ask_question(request: QARequest):
    """Ask a question and get AI answer, save it as Q&A"""
    try:
        api_key = os.getenv("EMERGENT_LLM_KEY")
        
        # Create context based on app_id if provided
        context = "You are Empire AI Assistant, providing expert answers to user questions."
        if request.app_id:
            # Get app details for context
            app = await db.apps.find_one({"id": request.app_id}, {"_id": 0})
            if app:
                context += f"\n\nContext: The user is asking about {app['name']}, which is a {app['category']} app. Description: {app['description']}"
        
        chat_instance = LlmChat(
            api_key=api_key,
            session_id=f"qa_{uuid.uuid4()}",
            system_message=context
        )
        
        chat_instance.with_model("gemini", "gemini-3-flash-preview")
        
        # Get answer
        answer = await chat_instance.send_message(UserMessage(text=request.question))
        
        # Save Q&A
        qa_doc = QAItem(
            question=request.question,
            answer=answer,
            app_id=request.app_id,
            category=request.category
        ).model_dump()
        qa_doc['created_at'] = qa_doc['created_at'].isoformat()
        
        await db.qa_items.insert_one(qa_doc)
        
        return QAResponse(
            answer=answer,
            question=request.question,
            qa_id=qa_doc['id']
        )
    
    except Exception as e:
        logging.error(f"Q&A error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Q&A error: {str(e)}")

@api_router.get("/qa/list")
async def get_qa_list(app_id: Optional[str] = None, category: Optional[str] = None):
    """Get list of Q&A items, optionally filtered"""
    query = {}
    if app_id:
        query['app_id'] = app_id
    if category:
        query['category'] = category
    
    qa_items = await db.qa_items.find(query, {"_id": 0}).sort("created_at", -1).limit(50).to_list(50)
    
    for item in qa_items:
        if isinstance(item.get('created_at'), str):
            item['created_at'] = datetime.fromisoformat(item['created_at'])
    
    return qa_items

@api_router.delete("/qa/{qa_id}")
async def delete_qa(qa_id: str):
    """Delete a Q&A item"""
    result = await db.qa_items.delete_one({"id": qa_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Q&A not found")
    return {"message": "Q&A deleted successfully"}

# ============== IMAGE GENERATION ENDPOINTS ==============

@api_router.post("/generate-image", response_model=ImageGenerateResponse)
async def generate_image(request: ImageGenerateRequest):
    """Generate AI image using Gemini Nano Banana"""
    try:
        api_key = os.getenv("EMERGENT_LLM_KEY")
        session_id = request.session_id or str(uuid.uuid4())
        
        # Create chat instance for image generation
        chat_instance = LlmChat(
            api_key=api_key,
            session_id=session_id,
            system_message="You are a creative AI assistant that generates stunning images."
        )
        
        # Configure for image generation
        chat_instance.with_model("gemini", "gemini-3-pro-image-preview").with_params(
            modalities=["image", "text"]
        )
        
        # Generate image
        msg = UserMessage(text=request.prompt)
        text_response, images = await chat_instance.send_message_multimodal_response(msg)
        
        if not images or len(images) == 0:
            raise HTTPException(status_code=500, detail="No image generated")
        
        # Get first image
        image_data = images[0]['data']
        
        # Save to database
        image_id = str(uuid.uuid4())
        image_doc = GeneratedImage(
            id=image_id,
            prompt=request.prompt,
            image_data=image_data[:100],  # Store first 100 chars for reference
            text_response=text_response
        ).model_dump()
        image_doc['created_at'] = image_doc['created_at'].isoformat()
        
        # Store full image separately
        await db.generated_images.insert_one({
            **image_doc,
            "full_image_data": image_data
        })
        
        return ImageGenerateResponse(
            image_data=image_data,
            text_response=text_response,
            image_id=image_id
        )
    
    except Exception as e:
        logging.error(f"Image generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Image generation error: {str(e)}")

@api_router.get("/gallery")
async def get_gallery():
    """Get all generated images"""
    images = await db.generated_images.find({}, {"_id": 0}).sort("created_at", -1).limit(50).to_list(50)
    
    # Return without full image data for list view
    gallery = []
    for img in images:
        if isinstance(img.get('created_at'), str):
            img['created_at'] = datetime.fromisoformat(img['created_at'])
        gallery.append({
            "id": img['id'],
            "prompt": img['prompt'],
            "text_response": img.get('text_response'),
            "created_at": img['created_at'],
            "thumbnail": img.get('image_data', '')[:100]
        })
    
    return gallery

@api_router.get("/gallery/{image_id}")
async def get_image(image_id: str):
    """Get full image data"""
    image = await db.generated_images.find_one({"id": image_id}, {"_id": 0})
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    return {
        "id": image['id'],
        "prompt": image['prompt'],
        "image_data": image.get('full_image_data', ''),
        "text_response": image.get('text_response'),
        "created_at": image['created_at']
    }

# ============== REVENUE TRACKING ==============

@api_router.post("/revenue/sync")
async def sync_revenue(sync: RevenueSync):
    """Sync revenue from external apps"""
    # Verify API key
    if not await verify_api_key(sync.api_key):
        raise HTTPException(status_code=401, detail="Invalid API key")
    
    # Update app revenue
    result = await db.apps.update_one(
        {"id": sync.app_id},
        {"$inc": {"revenue": sync.amount}, "$set": {"updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="App not found")
    
    # Log revenue event
    await db.revenue_events.insert_one({
        "app_id": sync.app_id,
        "amount": sync.amount,
        "timestamp": datetime.now(timezone.utc).isoformat()
    })
    
    return {"message": "Revenue synced successfully", "amount": sync.amount}

@api_router.get("/revenue/total")
async def get_total_revenue():
    """Get total revenue across all apps"""
    pipeline = [
        {"$group": {"_id": None, "total": {"$sum": "$revenue"}}}
    ]
    result = await db.apps.aggregate(pipeline).to_list(1)
    total = result[0]["total"] if result else 0.0
    return {"total_revenue": total}

# ============== DASHBOARD STATS ==============

@api_router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats():
    """Get overall dashboard statistics"""
    total_apps = await db.apps.count_documents({})
    active_apps = await db.apps.count_documents({"status": "active"})
    favorited_apps = await db.apps.count_documents({"is_favorited": True})
    
    # Total revenue
    revenue_pipeline = [
        {"$group": {"_id": None, "total": {"$sum": "$revenue"}}}
    ]
    revenue_result = await db.apps.aggregate(revenue_pipeline).to_list(1)
    total_revenue = revenue_result[0]["total"] if revenue_result else 0.0
    
    total_images = await db.generated_images.count_documents({})
    total_chats = await db.chat_messages.count_documents({"role": "user"})
    
    return DashboardStats(
        total_apps=total_apps,
        active_apps=active_apps,
        total_revenue=total_revenue,
        total_images_generated=total_images,
        total_chats=total_chats,
        favorited_apps=favorited_apps
    )

# ============== API KEY MANAGEMENT ==============

@api_router.get("/master-key")
async def get_api_key():
    """Get master API key for external integrations"""
    master_key = await get_master_api_key()
    return {"master_key": master_key}

# Include router
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
