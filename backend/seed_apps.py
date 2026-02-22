import asyncio
import sys
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import uuid

# MongoDB connection
mongo_url = "mongodb://localhost:27017"
client = AsyncIOMotorClient(mongo_url)
db = client["test_database"]

# 20 Empire Apps
EMPIRE_APPS = [
    {
        "name": "Legal Eagle Consult",
        "description": "On-demand legal consultation and document review platform for businesses and individuals",
        "category": "Legal",
        "icon": "⚖️",
        "revenue": 12450.75,
        "status": "active"
    },
    {
        "name": "Empire Health Pulse",
        "description": "AI-powered health monitoring and telemedicine platform connecting patients with doctors",
        "category": "Health",
        "icon": "🏥",
        "revenue": 18920.50,
        "status": "active"
    },
    {
        "name": "Gold Vault Finance",
        "description": "Premium investment portfolio management and wealth building advisory platform",
        "category": "Finance",
        "icon": "💰",
        "revenue": 34567.25,
        "status": "active"
    },
    {
        "name": "Scholar Academy Pro",
        "description": "Interactive online learning platform with courses from industry experts and certifications",
        "category": "Education",
        "icon": "📚",
        "revenue": 8765.00,
        "status": "active"
    },
    {
        "name": "Pixel Legends Gaming",
        "description": "Multiplayer battle royale game with stunning graphics and competitive tournaments",
        "category": "Entertainment",
        "icon": "🎮",
        "revenue": 45230.90,
        "status": "active"
    },
    {
        "name": "TaskMaster Pro Suite",
        "description": "All-in-one business productivity and project management solution for modern teams",
        "category": "Business",
        "icon": "💼",
        "revenue": 15680.40,
        "status": "active"
    },
    {
        "name": "QuickBite Delivery",
        "description": "Lightning-fast food delivery service connecting local restaurants with hungry customers",
        "category": "Food",
        "icon": "🍽️",
        "revenue": 22340.85,
        "status": "active"
    },
    {
        "name": "FitZone Wellness",
        "description": "Personal fitness training app with custom workout plans and nutrition tracking",
        "category": "Health",
        "icon": "💪",
        "revenue": 9876.30,
        "status": "active"
    },
    {
        "name": "Wanderlust Travel",
        "description": "Smart travel booking platform with AI-powered itinerary planning and deals",
        "category": "Travel",
        "icon": "✈️",
        "revenue": 28450.60,
        "status": "active"
    },
    {
        "name": "Prime Property Hub",
        "description": "Real estate marketplace for buying, selling, and renting premium properties",
        "category": "Business",
        "icon": "🏢",
        "revenue": 56789.20,
        "status": "active"
    },
    {
        "name": "StyleMarket Elite",
        "description": "Luxury e-commerce platform for designer fashion, accessories, and lifestyle products",
        "category": "Business",
        "icon": "🛍️",
        "revenue": 41250.75,
        "status": "active"
    },
    {
        "name": "ConnectHub Social",
        "description": "Next-generation social networking platform with privacy-first features",
        "category": "Entertainment",
        "icon": "📱",
        "revenue": 67890.45,
        "status": "active"
    },
    {
        "name": "BeatFlow Music Studio",
        "description": "Professional music production and streaming platform for artists and creators",
        "category": "Entertainment",
        "icon": "🎵",
        "revenue": 13450.80,
        "status": "active"
    },
    {
        "name": "StreamVault Premium",
        "description": "4K video streaming service with exclusive original content and live sports",
        "category": "Entertainment",
        "icon": "📺",
        "revenue": 89456.30,
        "status": "active"
    },
    {
        "name": "PhotoPro Studio",
        "description": "AI-enhanced photo editing suite with professional tools for photographers",
        "category": "Business",
        "icon": "📸",
        "revenue": 7234.50,
        "status": "active"
    },
    {
        "name": "BizGrowth Consulting",
        "description": "Strategic business consulting and growth advisory for startups and enterprises",
        "category": "Business",
        "icon": "📊",
        "revenue": 32100.90,
        "status": "active"
    },
    {
        "name": "AdVantage Marketing",
        "description": "Full-service digital marketing agency with AI-powered campaign optimization",
        "category": "Business",
        "icon": "📈",
        "revenue": 24567.65,
        "status": "active"
    },
    {
        "name": "CloudSync Enterprise",
        "description": "Enterprise cloud storage and collaboration platform with military-grade encryption",
        "category": "Business",
        "icon": "☁️",
        "revenue": 52340.20,
        "status": "active"
    },
    {
        "name": "AutoPro Service Hub",
        "description": "On-demand automotive repair and maintenance booking platform with certified mechanics",
        "category": "Business",
        "icon": "🚗",
        "revenue": 16789.45,
        "status": "active"
    },
    {
        "name": "HomeHelper Services",
        "description": "Professional home services marketplace for cleaning, repairs, and maintenance",
        "category": "Business",
        "icon": "🏠",
        "revenue": 19876.55,
        "status": "active"
    }
]

async def seed_database():
    print("🌱 Seeding Empire Dashboard with 20 apps...")
    
    # Clear existing apps
    await db.apps.delete_many({})
    print("✅ Cleared existing apps")
    
    # Insert all 20 apps
    for app in EMPIRE_APPS:
        app_doc = {
            "id": str(uuid.uuid4()),
            "name": app["name"],
            "description": app["description"],
            "category": app["category"],
            "icon": app["icon"],
            "revenue": app["revenue"],
            "status": app["status"],
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        await db.apps.insert_one(app_doc)
        print(f"✅ Created: {app['name']} - ${app['revenue']}")
    
    # Get total revenue
    total_revenue = sum(app['revenue'] for app in EMPIRE_APPS)
    print(f"\n🎉 Successfully created 20 Empire apps!")
    print(f"💰 Total Empire Revenue: ${total_revenue:,.2f}")
    print(f"📊 Active Apps: {len([a for a in EMPIRE_APPS if a['status'] == 'active'])}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
