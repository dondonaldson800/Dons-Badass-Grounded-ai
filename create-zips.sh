#!/bin/bash

echo "📦 Creating ZIP archives for Apps 5-20..."
echo ""

cd /app

# Create individual zips
for i in {5..20}; do
  DIR="expo-app${i}"
  if [ -d "$DIR" ]; then
    APP_NAME=$(grep '"name"' ${DIR}/app.json | head -1 | cut -d'"' -f4 | tr ' ' '-' | tr '[:upper:]' '[:lower:]')
    ZIP_NAME="app${i}-${APP_NAME}.zip"
    
    echo "Creating ${ZIP_NAME}..."
    cd "$DIR"
    zip -q -r "/app/app-archives/${ZIP_NAME}" . -x "node_modules/*" ".expo/*" "*.log"
    cd /app
    echo "  ✓ ${ZIP_NAME} created"
  fi
done

# Create master zip with all 16 apps
echo ""
echo "Creating master archive with all Apps 5-20..."
zip -q -r /app/app-archives/grounded-empire-apps-5-20-complete.zip \
  expo-app{5..20} \
  -x "*/node_modules/*" "*/.expo/*" "*/*.log"

echo "  ✓ grounded-empire-apps-5-20-complete.zip created"

echo ""
echo "✅ All archives created in /app/app-archives/"
ls -lh /app/app-archives/
