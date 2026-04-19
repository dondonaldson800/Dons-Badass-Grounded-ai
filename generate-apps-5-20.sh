#!/bin/bash

###############################################################################
# GROUNDED EMPIRE - Apps 5-20 Generator
# Generates 16 complete React Native/Expo apps
###############################################################################

set -e

echo "🏗️ GROUNDED EMPIRE - Generating Apps 5-20"
echo "=========================================="
echo ""

# App configurations: name|slug|bundleId|theme|backgroundColor
declare -a APPS=(
  "5|Fit Empire|fit-empire|com.empire.fitness|#E63946|#1A0F0F"
  "6|Recipe Hub|recipe-hub|com.empire.recipes|#2A9D8F|#0F1A18"
  "7|Budget Master|budget-master|com.empire.finance|#7209B7|#1A0F1A"
  "8|Real Estate Pro|realestate-pro|com.empire.realestate|#0096C7|#0F1619"
  "9|Travel Guide|travel-guide|com.empire.travel|#F77F00|#1A150F"
  "10|Pet Care|pet-care|com.empire.petcare|#F72585|#1A0F17"
  "11|Learn Hub|learn-hub|com.empire.education|#023E8A|#0F1419"
  "12|Career Path|career-path|com.empire.career|#495057|#12131"
  "13|Home Garden|home-garden|com.empire.homegarden|#6A4C93|#15111A"
  "14|Photo Studio|photo-studio|com.empire.photography|#0D1B2A|#0A0F14"
  "15|Music Player|music-player|com.empire.music|#D90429|#1A0F11"
  "16|Sports News|sports-news|com.empire.sports|#06A77D|#0F1A17"
  "17|Book Tracker|book-tracker|com.empire.books|#6A040F|#14090C"
  "18|Style Guide|style-guide|com.empire.fashion|#CB997E|#1A1612"
  "19|Auto Care|auto-care|com.empire.automotive|#1D3557|#0F1215"
  "20|Zen Wellness|zen-wellness|com.empire.wellness|#9D4EDD|#17111A"
)

echo "Creating 16 app directories..."
echo ""

for app_config in "${APPS[@]}"; do
  IFS='|' read -r num name slug bundleId theme bgColor <<< "$app_config"
  
  DIR="/app/expo-app${num}"
  
  echo "📱 App #${num}: ${name}"
  
  # Create directory structure
  mkdir -p "${DIR}/screens"
  mkdir -p "${DIR}/assets"
  
  echo "  ✓ Created directories"
done

echo ""
echo "✅ All 16 app directories created!"
echo ""
echo "Run the Node.js generator script next to create all files..."
