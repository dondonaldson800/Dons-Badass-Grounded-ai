# 🏰 Empire Management Dashboard

A powerful full-stack application for managing multiple apps, tracking revenue, and leveraging AI for business growth.

## ✨ Features

### 📊 Dashboard
- **Multi-App Management**: Create and manage unlimited apps in your empire
- **Real-time Statistics**: Track total apps, active apps, revenue, images, and chats
- **Visual Cards**: Beautiful app cards with icons, descriptions, and revenue display
- **Quick Actions**: Add, edit, and delete apps with ease

### 🤖 Empire AI Assistant
- **Unrestricted AI Chat**: Get expert advice on medical, legal, and business topics
- **Powered by Gemini 3 Flash**: Latest AI technology for accurate responses
- **Chat History**: Persistent conversations with context
- **No Restrictions**: Ask anything - medical diagnoses, legal advice, business strategies

### 🎨 Creative Studio
- **AI Image Generation**: Create stunning images from text prompts using Gemini Nano Banana
- **Image Gallery**: View and manage all your generated images
- **Download Images**: Save images directly to your device
- **Smart Prompts**: Example prompts to get you started

### 💰 Revenue Analytics
- **Total Revenue Tracking**: Monitor earnings across all apps
- **Per-App Breakdown**: See revenue by individual app
- **External App Integration**: Sync revenue from your other apps via API
- **API Documentation**: Complete integration guide with examples

### ⚙️ Settings
- **Master API Key**: Secure key for external app integration
- **Account Overview**: View all your stats in one place
- **Premium Features**: Access to all premium functionality
- **API Configuration**: Copy endpoints and keys easily

## 🚀 Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **MongoDB**: NoSQL database for scalability
- **Gemini AI**: For chat and image generation
- **Emergent Integrations**: Unified LLM API library

### Frontend
- **React 19**: Latest React features
- **Tailwind CSS**: Utility-first styling
- **Axios**: HTTP client
- **React Router**: Navigation

## 📁 Project Structure

```
/app/
├── backend/
│   ├── server.py                 # Main FastAPI application
│   ├── fixed_gemini_code.java   # Fixed Java reference code
│   ├── requirements.txt          # Python dependencies
│   └── .env                      # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── App.js               # Main app component
│   │   ├── App.css              # Global styles
│   │   └── pages/
│   │       ├── Dashboard.js      # Multi-app dashboard
│   │       ├── AIChat.js         # AI chat interface
│   │       ├── CreativeStudio.js # Image generation
│   │       ├── RevenueAnalytics.js # Revenue tracking
│   │       └── Settings.js       # Settings page
│   ├── package.json
│   └── .env
```

## 🔧 Setup & Installation

### Environment Variables

**Backend (.env)**:
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"
EMERGENT_LLM_KEY=sk-emergent-2A80e92591dF18c1f5
```

**Frontend (.env)**:
```
REACT_APP_BACKEND_URL=<your-backend-url>
```

### Starting Services

```bash
# Restart all services
sudo supervisorctl restart all

# Check service status
sudo supervisorctl status

# View logs
tail -f /var/log/supervisor/backend.*.log
tail -f /var/log/supervisor/frontend.*.log
```

## 📡 API Endpoints

### Apps Management
- `GET /api/apps` - Get all apps
- `POST /api/apps` - Create new app
- `GET /api/apps/{app_id}` - Get specific app
- `PUT /api/apps/{app_id}` - Update app
- `DELETE /api/apps/{app_id}` - Delete app

### AI Chat
- `POST /api/chat` - Send message to AI
- `GET /api/chat/history/{session_id}` - Get chat history

### Image Generation
- `POST /api/generate-image` - Generate AI image
- `GET /api/gallery` - Get all generated images
- `GET /api/gallery/{image_id}` - Get specific image

### Revenue Tracking
- `POST /api/revenue/sync` - Sync revenue from external app
- `GET /api/revenue/total` - Get total revenue

### System
- `GET /api/stats` - Get dashboard statistics
- `GET /api/master-key` - Get master API key

## 🔗 External App Integration

### Syncing Revenue

Use the Revenue Sync API to automatically update your Empire dashboard when users make purchases in your external apps.

**Example (JavaScript)**:
```javascript
fetch('https://your-domain.com/api/revenue/sync', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    app_id: 'your-app-id',
    amount: 10.50,
    api_key: 'your-master-api-key'
  })
});
```

**Example (Python)**:
```python
import requests

requests.post(
    'https://your-domain.com/api/revenue/sync',
    json={
        'app_id': 'your-app-id',
        'amount': 10.50,
        'api_key': 'your-master-api-key'
    }
)
```

## 🎯 Key Features Explained

### 1. Multi-App Dashboard
Create slots for all your apps and track them in one place. Each app shows:
- Name and description
- Category (Business, Health, Finance, etc.)
- Current revenue
- Status (Active/Paused)
- Custom icon

### 2. AI Chat Assistant
Ask anything without restrictions:
- **Medical**: "What are the symptoms of flu?"
- **Legal**: "What are the requirements for LLC?"
- **Business**: "How do I optimize app revenue?"
- **Technical**: "Explain blockchain technology"

### 3. Image Generation
Create professional images for:
- App logos and icons
- Marketing materials
- Social media content
- Promotional graphics

### 4. Revenue Tracking
- Real-time revenue updates
- Per-app breakdown
- External app integration via API
- Master API key for secure syncing

## 🔐 Security

- **Master API Key**: Secure key for external integrations
- **Environment Variables**: Sensitive data stored securely
- **CORS Protection**: Configurable origins
- **MongoDB**: No exposed ObjectIDs (using UUIDs)

## 🚀 Deployment

All services are managed by Supervisor:
- **Backend**: Port 8001 (FastAPI)
- **Frontend**: Port 3000 (React)
- **MongoDB**: Port 27017
- **Nginx**: Reverse proxy

## 📊 Database Collections

- `apps` - Your managed applications
- `chat_messages` - AI chat history
- `generated_images` - AI-generated images
- `revenue_events` - Revenue sync history
- `api_keys` - Master API keys

## 💡 Tips & Best Practices

1. **Master API Key**: Keep it secure - never expose in client code
2. **Revenue Sync**: Call the API after every successful transaction
3. **Image Generation**: Use descriptive prompts for better results
4. **Chat Sessions**: Each session maintains context independently
5. **App Management**: Regular revenue updates keep analytics accurate

## 🐛 Troubleshooting

### Backend not starting?
```bash
# Check logs
tail -f /var/log/supervisor/backend.err.log

# Restart backend
sudo supervisorctl restart backend
```

### Frontend errors?
```bash
# Check logs
tail -f /var/log/supervisor/frontend.err.log

# Restart frontend
sudo supervisorctl restart frontend
```

### Database connection issues?
```bash
# Check MongoDB status
sudo supervisorctl status mongodb

# Restart MongoDB
sudo supervisorctl restart mongodb
```

## 📈 Future Enhancements

- [ ] User authentication
- [ ] Team collaboration
- [ ] Advanced analytics charts
- [ ] Email notifications
- [ ] Mobile app version
- [ ] Video generation support
- [ ] Multi-language support

## 📄 License

Built with ❤️ for Empire builders

---

**Version**: 1.0.0  
**Last Updated**: 2025
