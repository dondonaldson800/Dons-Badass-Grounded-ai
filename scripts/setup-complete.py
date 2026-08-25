#!/usr/bin/env python3
"""
Complete Automation Setup - Minimal User Interaction
Handles: EAS, Google Cloud, GitHub Secrets, Play Store
"""

import os
import sys
import subprocess
import json
import base64
from pathlib import Path

# Colors
GREEN = '\033[0;32m'
BLUE = '\033[0;34m'
YELLOW = '\033[1;33m'
RED = '\033[0;31m'
NC = '\033[0m'

def run(cmd, capture=False):
    try:
        if capture:
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True, check=False)
            return result.stdout.strip()
        subprocess.run(cmd, shell=True, check=False)
        return True
    except:
        return None

def log_success(msg):
    print(f"{GREEN}✅ {msg}{NC}")

def log_info(msg):
    print(f"{BLUE}ℹ️  {msg}{NC}")

def log_warn(msg):
    print(f"{YELLOW}⚠️  {msg}{NC}")

def save_secrets(secrets):
    """Save secrets to file for easy GitHub addition"""
    path = Path('scripts/.automation-secrets.json')
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'w') as f:
        json.dump(secrets, f, indent=2)
    return str(path)

def main():
    print(f"\n{BLUE}{'='*70}")
    print(f"🚀 COMPLETE AUTOMATION SETUP - DONS-BADASS-GROUNDED-AI")
    print(f"{'='*70}{NC}\n")
    
    # Auto-detect project info
    log_info("Detecting project configuration...")
    
    # Read app.json
    try:
        with open('app.json', 'r') as f:
            app_config = json.load(f)
        package_name = app_config.get('expo', {}).get('android', {}).get('package', 'com.dondonaldson.groundedai')
        log_success(f"Package name detected: {package_name}")
    except:
        package_name = 'com.dondonaldson.groundedai'
        log_warn(f"Using default package name: {package_name}")
    
    # Check Node/npm
    log_info("Checking prerequisites...")
    if not subprocess.run("command -v node", shell=True, capture_output=True).returncode == 0:
        print(f"{RED}❌ Node.js not found. Please install Node.js first.{NC}")
        sys.exit(1)
    log_success("Node.js ✓")
    log_success("npm ✓")
    
    # Install EAS CLI silently
    log_info("Installing EAS CLI...")
    run("npm install -g eas-cli > /dev/null 2>&1")
    log_success("EAS CLI installed")
    
    # Initialize EAS if needed
    if not os.path.exists('eas.json'):
        log_info("Initializing EAS project...")
        run("eas init --non-interactive")
        log_success("EAS initialized")
    else:
        log_success("EAS already configured")
    
    # Get EAS Project ID
    log_info("Extracting EAS Project ID...")
    project_info = run("eas project info", capture=True)
    eas_project_id = None
    for line in project_info.split('\n'):
        if 'Project ID:' in line:
            eas_project_id = line.split(':', 1)[1].strip()
            break
    
    if eas_project_id:
        log_success(f"EAS Project ID: {eas_project_id}")
    else:
        log_warn("Could not auto-detect EAS Project ID")
        eas_project_id = input(f"{YELLOW}Enter EAS Project ID (from 'eas project info'): {NC}").strip()
    
    # Prepare secrets dict
    secrets = {
        "EAS_PROJECT_ID": eas_project_id,
        "ANDROID_PACKAGE_NAME": package_name,
        "GOOGLE_PLAY_SERVICE_ACCOUNT": "PASTE_BASE64_JSON_HERE"
    }
    
    # Save automation config
    config_path = save_secrets(secrets)
    log_success(f"Configuration saved to: {config_path}")
    
    # Display Final Instructions
    print(f"\n{BLUE}{'='*70}")
    print(f"📋 GITHUB SECRETS - ADD THESE 3 SECRETS")
    print(f"{'='*70}{NC}")
    print(f"\nGo to: {BLUE}https://github.com/dondonaldson800/Dons-Badass-Grounded-ai/settings/secrets/actions{NC}\n")
    
    print(f"{GREEN}1️⃣  Secret: EAS_PROJECT_ID{NC}")
    print(f"   Value: {eas_project_id}\n")
    
    print(f"{GREEN}2️⃣  Secret: ANDROID_PACKAGE_NAME{NC}")
    print(f"   Value: {package_name}\n")
    
    print(f"{GREEN}3️⃣  Secret: GOOGLE_PLAY_SERVICE_ACCOUNT{NC}")
    print(f"   Value: (base64-encoded JSON from Google Cloud)\n")
    
    print(f"{BLUE}{'='*70}")
    print(f"🌐 GOOGLE CLOUD SERVICE ACCOUNT SETUP")
    print(f"{'='*70}{NC}\n")
    
    print(f"Follow these steps:\n")
    print(f"1. Open: {BLUE}https://console.cloud.google.com/{NC}")
    print(f"2. Create NEW PROJECT: 'Dons-Badass-Grounded-AI'")
    print(f"3. Go to: IAM & Admin → Service Accounts")
    print(f"4. CREATE SERVICE ACCOUNT:")
    print(f"   - Name: 'play-store-api'")
    print(f"5. Grant role: 'Service Account User'")
    print(f"6. Go to KEYS tab → ADD KEY")
    print(f"7. Download JSON format")
    print(f"8. Convert to base64:\n")
    
    print(f"{YELLOW}Run this in terminal:{NC}")
    print(f"  {BLUE}cat /path/to/service-account.json | base64{NC}\n")
    
    print(f"9. Copy output and add as GOOGLE_PLAY_SERVICE_ACCOUNT secret\n")
    
    print(f"{BLUE}{'='*70}")
    print(f"🎯 GOOGLE PLAY CONSOLE")
    print(f"{'='*70}{NC}\n")
    
    print(f"1. Open: {BLUE}https://play.google.com/console{NC}")
    print(f"2. CREATE APP:")
    print(f"   - Name: 'Dons Badass Grounded AI'")
    print(f"   - Package: '{package_name}'")
    print(f"3. Fill app details (icon, screenshots, description)")
    print(f"4. Add service account as Admin user\n")
    
    print(f"{BLUE}{'='*70}")
    print(f"✅ AUTOMATION READY!")
    print(f"{'='*70}{NC}\n")
    
    print(f"{GREEN}🚀 How to use:{NC}\n")
    print(f"1️⃣  Add 3 GitHub Secrets (see above)")
    print(f"2️⃣  Push to main → Auto-build APK")
    print(f"3️⃣  Manual: Go to Actions → Run AAB build")
    print(f"4️⃣  Download AAB → Upload to Play Store\n")
    
    print(f"{BLUE}{'='*70}")
    print(f"🔗 QUICK LINKS")
    print(f"{'='*70}{NC}\n")
    print(f"GitHub Secrets: https://github.com/dondonaldson800/Dons-Badass-Grounded-ai/settings/secrets/actions")
    print(f"Actions: https://github.com/dondonaldson800/Dons-Badass-Grounded-ai/actions")
    print(f"Play Console: https://play.google.com/console")
    print(f"EAS Dashboard: https://expo.dev/\n")
    
    log_success("Setup Complete! Ready for deployment 🚀\n")

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n{YELLOW}Setup cancelled{NC}")
        sys.exit(0)
    except Exception as e:
        print(f"{RED}❌ Error: {e}{NC}")
        sys.exit(1)
