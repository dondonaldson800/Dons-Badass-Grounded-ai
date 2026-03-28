#!/bin/bash

# 🚀 D's Empire - Google Cloud Deployment Script
# Run this from your LOCAL MACHINE after downloading the code

set -e  # Exit on error

echo "🏰 D's Empire - Google Cloud Deployment"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="249321727719"
REGION="us-central1"
BACKEND_SERVICE="empire-backend"

# Check if required tools are installed
echo "📋 Checking prerequisites..."

if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ Google Cloud SDK not installed${NC}"
    echo "Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

if ! command -v firebase &> /dev/null; then
    echo -e "${RED}❌ Firebase CLI not installed${NC}"
    echo "Install with: npm install -g firebase-tools"
    exit 1
fi

echo -e "${GREEN}✅ All tools installed${NC}"
echo ""

# Login to Google Cloud
echo "🔐 Authenticating with Google Cloud..."
gcloud auth login
gcloud config set project $PROJECT_ID

echo ""
echo "📊 Select deployment target:"
echo "1) Backend only (Cloud Run)"
echo "2) Frontend only (Firebase Hosting)"
echo "3) Both Backend + Frontend"
echo "4) Exit"
read -p "Enter choice [1-4]: " choice

case $choice in
  1)
    echo ""
    echo "🐳 Deploying Backend to Cloud Run..."
    echo "======================================"
    
    # Check if .env exists
    if [ ! -f "backend/.env" ]; then
        echo -e "${RED}❌ backend/.env not found${NC}"
        echo "Please create backend/.env with production values"
        exit 1
    fi
    
    # Deploy backend
    cd backend
    echo "Building and deploying..."
    gcloud run deploy $BACKEND_SERVICE \
      --source . \
      --platform managed \
      --region $REGION \
      --allow-unauthenticated \
      --port 8001 \
      --memory 512Mi \
      --cpu 1 \
      --min-instances 0 \
      --max-instances 10
    
    # Get backend URL
    BACKEND_URL=$(gcloud run services describe $BACKEND_SERVICE \
      --platform managed \
      --region $REGION \
      --format 'value(status.url)')
    
    echo ""
    echo -e "${GREEN}✅ Backend deployed successfully!${NC}"
    echo -e "${BLUE}Backend URL: $BACKEND_URL${NC}"
    echo ""
    echo "📝 Update your frontend/.env with:"
    echo "REACT_APP_BACKEND_URL=$BACKEND_URL"
    ;;
    
  2)
    echo ""
    echo "🌐 Deploying Frontend to Firebase..."
    echo "====================================="
    
    # Check if frontend/.env exists
    if [ ! -f "frontend/.env" ]; then
        echo -e "${RED}❌ frontend/.env not found${NC}"
        echo "Please create frontend/.env with REACT_APP_BACKEND_URL"
        exit 1
    fi
    
    # Build frontend
    cd frontend
    echo "Installing dependencies..."
    yarn install
    
    echo "Building production bundle..."
    yarn build
    
    # Deploy to Firebase
    cd ..
    echo "Deploying to Firebase Hosting..."
    firebase login
    firebase deploy --only hosting --project $PROJECT_ID
    
    echo ""
    echo -e "${GREEN}✅ Frontend deployed successfully!${NC}"
    echo -e "${BLUE}Frontend URL: https://$PROJECT_ID.web.app${NC}"
    ;;
    
  3)
    echo ""
    echo "🚀 Full Deployment: Backend + Frontend"
    echo "======================================="
    
    # Deploy backend first
    echo ""
    echo "📦 Step 1/2: Deploying Backend..."
    cd backend
    gcloud run deploy $BACKEND_SERVICE \
      --source . \
      --platform managed \
      --region $REGION \
      --allow-unauthenticated \
      --port 8001
    
    # Get backend URL
    BACKEND_URL=$(gcloud run services describe $BACKEND_SERVICE \
      --platform managed \
      --region $REGION \
      --format 'value(status.url)')
    
    echo -e "${GREEN}✅ Backend deployed: $BACKEND_URL${NC}"
    
    # Update frontend .env
    cd ../frontend
    echo "REACT_APP_BACKEND_URL=$BACKEND_URL" > .env.production
    echo "REACT_APP_ADMOB_PUB_ID=pub-8715031019966551" >> .env.production
    echo "REACT_APP_ADMOB_APP_ID=6268835652" >> .env.production
    
    # Deploy frontend
    echo ""
    echo "🌐 Step 2/2: Deploying Frontend..."
    yarn install
    yarn build
    
    cd ..
    firebase login
    firebase deploy --only hosting --project $PROJECT_ID
    
    echo ""
    echo -e "${GREEN}✅✅ Full deployment complete!${NC}"
    echo ""
    echo "🎉 Your Empire is live at:"
    echo -e "${BLUE}Frontend: https://$PROJECT_ID.web.app${NC}"
    echo -e "${BLUE}Backend:  $BACKEND_URL${NC}"
    ;;
    
  4)
    echo "Exiting..."
    exit 0
    ;;
    
  *)
    echo -e "${RED}Invalid choice${NC}"
    exit 1
    ;;
esac

echo ""
echo "🎊 Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Test your live app"
echo "2. Configure Stripe webhook in dashboard"
echo "3. Monitor logs: gcloud run logs read $BACKEND_SERVICE --region $REGION"
echo "4. Celebrate! 🎉"
