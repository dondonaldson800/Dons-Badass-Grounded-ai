/**
 * EMERGENCE MASTER WORKFLOW: Badass Grounded AI
 * Project: Dons-Badass-Grounded-ai
 * Owner: Don (Master Builder)
 */

const EmergentConfig = {
  appId: "6268835652",
  publisherId: "pub-8715031019966551",
  framework: "Vibe Code Apps",
  mode: "Production"
};

// D's Empire - AdMob Revenue Controller (Badass Workflow Pattern)
class EmpireRevenueController {
    constructor() {
        // AdMob Configuration from EmergentConfig
        this.appId = EmergentConfig.appId;
        this.publisherId = EmergentConfig.publisherId;
        
        // Ad Unit IDs (you'll need to create these in AdMob console)
        this.adUnits = {
            interstitial: `ca-app-pub-${EmergentConfig.publisherId}/XXXXXX`, // Replace with real ID
            rewarded: `ca-app-pub-${EmergentConfig.publisherId}/YYYYYY`,      // Replace with real ID
            banner: `ca-app-pub-${EmergentConfig.publisherId}/ZZZZZZ`         // Replace with real ID
        };
        
        this.isReady = false;
        this.adLoaded = false;
        this.revenueGenerated = 0;
        this.agent = "Emergent-Vibe-1.0";
        this.status = "Initializing Empire...";
    }

    async initializeEmpire() {
        console.log(`[${this.agent}] 🏰 Initializing D's Empire Revenue Engine...`);
        this.status = "Loading Empire...";
        
        try {
            // Initialize AdMob
            if (window.admob) {
                await window.admob.start();
                console.log("✅ AdMob initialized");
                this.isReady = true;
                this.status = "Empire Active";
            } else {
                console.warn("⚠️ AdMob not available - using demo mode (web version)");
                this.isReady = true; // Continue without ads in web version
                this.status = "Empire Active (Web Mode)";
            }
            
            // Preload first ad
            await this.loadAdMob(this.publisherId);
            
        } catch (error) {
            console.error("❌ Empire initialization error:", error);
            this.isReady = true; // Continue anyway
            this.status = "Empire Active (Fallback Mode)";
        }
    }

    // Preload ads to minimize latency (The loadAdMob method from BadassWorkflow)
    async loadAdMob(id) {
        if (!window.admob) {
            console.log(`[${this.agent}] AdMob Active (Web Mode): ${id}`);
            return `AdMob Active: ${id}`;
        }
        
        try {
            // Load interstitial ad
            await window.admob.interstitial.load({
                adUnitId: this.adUnits.interstitial
            });
            this.adLoaded = true;
            console.log(`[${this.agent}] 📢 Interstitial ad loaded for Publisher: ${id}`);
            return `AdMob Active: ${id}`;
        } catch (error) {
            console.error("Ad load error:", error);
            return `AdMob Error: ${error.message}`;
        }
    }

    // Show ad before AI task
    async showAdBeforeTask() {
        if (!this.adLoaded || !window.admob) return;
        
        try {
            await window.admob.interstitial.show();
            console.log(`[${this.agent}] 💰 Ad shown - revenue generated!`);
            this.trackRevenue(0.05); // Estimate $0.05 per ad
            
            // Reload next ad
            this.loadAdMob(this.publisherId);
        } catch (error) {
            console.error("Ad show error:", error);
        }
    }

    // Core execution loop for your 20 niche apps (The runEmpireTask from BadassWorkflow)
    async runEmpireTask(taskType, inputData) {
        console.log(`[${this.agent}] Executing ${taskType} for Don...`);
        
        if (!this.isReady) {
            await this.initializeEmpire();
        }
        
        // Step 1: Pre-cache AdMob Interstitial (show ad every 3rd request)
        if (this.shouldShowAd()) {
            await this.showAdBeforeTask();
        }
        
        // Step 2: Run Grounded AI Logic (The "Badass" Engine)
        const result = await this.executeGroundedAI(inputData);
        
        return result;
    }

    // Determine if ad should be shown
    shouldShowAd() {
        // Show ad every 3 AI requests
        const requestCount = parseInt(localStorage.getItem('ai_request_count') || '0');
        localStorage.setItem('ai_request_count', (requestCount + 1).toString());
        
        return requestCount % 3 === 0;
    }

    // Execute Grounded AI task (Q&A, Chat, Image Gen) - The Badass Engine
    async executeGroundedAI(inputData) {
        const { type, prompt, appId, sessionId } = inputData;
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
        const API = `${BACKEND_URL}/api`;
        
        console.log(`[${this.agent}] 🤖 Executing Grounded AI task: ${type}`);
        
        try {
            let response;
            
            switch (type) {
                case 'qa':
                    response = await fetch(`${API}/qa/ask`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            question: prompt,
                            app_id: appId
                        })
                    });
                    break;
                    
                case 'chat':
                    response = await fetch(`${API}/ai/chat`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            session_id: sessionId,
                            message: prompt
                        })
                    });
                    break;
                    
                case 'image':
                    response = await fetch(`${API}/generate-image`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            prompt: prompt
                        })
                    });
                    break;
                    
                default:
                    throw new Error('Unknown task type');
            }
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`[${this.agent}] ✅ Grounded AI task completed`);
            return data;
            
        } catch (error) {
            console.error(`[${this.agent}] ❌ AI task error:`, error);
            throw error;
        }
    }

    // Track revenue
    trackRevenue(amount) {
        this.revenueGenerated += amount;
        console.log(`💵 Revenue generated: $${amount.toFixed(3)} | Total: $${this.revenueGenerated.toFixed(2)}`);
        
        // Update analytics (optional)
        if (window.gtag) {
            window.gtag('event', 'ad_impression', {
                'value': amount,
                'currency': 'USD'
            });
        }
    }

    // Show banner ad
    async showBannerAd(position = 'bottom') {
        if (!window.admob) return;
        
        try {
            await window.admob.banner.show({
                adUnitId: this.adUnits.banner,
                position: position // 'top' or 'bottom'
            });
            console.log("📢 Banner ad displayed");
        } catch (error) {
            console.error("Banner ad error:", error);
        }
    }

    // Hide banner ad
    async hideBannerAd() {
        if (!window.admob) return;
        
        try {
            await window.admob.banner.hide();
        } catch (error) {
            console.error("Banner hide error:", error);
        }
    }

    // Show rewarded ad (user gets premium features)
    async showRewardedAd() {
        if (!window.admob) {
            console.warn("Rewarded ads not available");
            return { watched: false };
        }
        
        try {
            // Load rewarded ad
            await window.admob.rewarded.load({
                adUnitId: this.adUnits.rewarded
            });
            
            // Show ad
            const result = await window.admob.rewarded.show();
            
            if (result.watched) {
                console.log("🎁 User watched rewarded ad!");
                this.trackRevenue(0.10); // Rewarded ads pay more
                return { watched: true, reward: 'premium_access' };
            }
            
            return { watched: false };
            
        } catch (error) {
            console.error("Rewarded ad error:", error);
            return { watched: false };
        }
    }

    // Get total revenue
    getTotalRevenue() {
        return this.revenueGenerated;
    }

    // Convenience alias for backward compatibility
    async executeEmergentTask(taskData) {
        return await this.runEmpireTask(taskData.type, taskData);
    }
}

// Create global instance
window.empireRevenue = new EmpireRevenueController();

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', () => {
    window.empireRevenue.initializeEmpire();
});

export default EmpireRevenueController;
