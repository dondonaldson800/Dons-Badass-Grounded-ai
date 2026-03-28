// D's Empire - AdMob Revenue Controller
class EmpireRevenueController {
    constructor() {
        // AdMob Configuration
        this.appId = "6268835652";
        this.publisherId = "pub-8715031019966551";
        
        // Ad Unit IDs (you'll need to create these in AdMob console)
        this.adUnits = {
            interstitial: "ca-app-pub-8715031019966551/XXXXXX", // Replace with real ID
            rewarded: "ca-app-pub-8715031019966551/YYYYYY",      // Replace with real ID
            banner: "ca-app-pub-8715031019966551/ZZZZZZ"         // Replace with real ID
        };
        
        this.isReady = false;
        this.adLoaded = false;
        this.revenueGenerated = 0;
    }

    async initializeEmpire() {
        console.log("🏰 Initializing D's Empire Revenue Engine...");
        
        try {
            // Initialize AdMob
            if (window.admob) {
                await window.admob.start();
                console.log("✅ AdMob initialized");
                this.isReady = true;
            } else {
                console.warn("⚠️ AdMob not available - using demo mode");
                this.isReady = true; // Continue without ads in web version
            }
            
            // Preload first ad
            await this.preLoadEmpireAd();
            
        } catch (error) {
            console.error("❌ Empire initialization error:", error);
            this.isReady = true; // Continue anyway
        }
    }

    // Preload ads to minimize latency
    async preLoadEmpireAd() {
        if (!window.admob) return;
        
        try {
            // Load interstitial ad
            await window.admob.interstitial.load({
                adUnitId: this.adUnits.interstitial
            });
            this.adLoaded = true;
            console.log("📢 Interstitial ad loaded");
        } catch (error) {
            console.error("Ad load error:", error);
        }
    }

    // Show ad before AI task
    async showAdBeforeTask() {
        if (!this.adLoaded || !window.admob) return;
        
        try {
            await window.admob.interstitial.show();
            console.log("💰 Ad shown - revenue generated!");
            this.trackRevenue(0.05); // Estimate $0.05 per ad
            
            // Reload next ad
            this.preLoadEmpireAd();
        } catch (error) {
            console.error("Ad show error:", error);
        }
    }

    // Execute AI task with ad monetization
    async executeEmergentTask(taskData) {
        if (!this.isReady) {
            await this.initializeEmpire();
        }
        
        // Show ad every 3rd AI request
        if (this.shouldShowAd()) {
            await this.showAdBeforeTask();
        }
        
        // Execute the actual AI task
        return await this.runAITask(taskData);
    }

    // Determine if ad should be shown
    shouldShowAd() {
        // Show ad every 3 AI requests
        const requestCount = parseInt(localStorage.getItem('ai_request_count') || '0');
        localStorage.setItem('ai_request_count', (requestCount + 1).toString());
        
        return requestCount % 3 === 0;
    }

    // Execute AI task (Q&A, Chat, Image Gen)
    async runAITask(taskData) {
        const { type, prompt, appId } = taskData;
        
        console.log(`🤖 Executing AI task: ${type}`);
        
        try {
            let response;
            
            switch (type) {
                case 'qa':
                    response = await fetch('/api/qa/ask', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            question: prompt,
                            app_id: appId
                        })
                    });
                    break;
                    
                case 'chat':
                    response = await fetch('/api/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            session_id: taskData.sessionId,
                            message: prompt
                        })
                    });
                    break;
                    
                case 'image':
                    response = await fetch('/api/generate-image', {
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
            
            const data = await response.json();
            console.log("✅ AI task completed");
            return data;
            
        } catch (error) {
            console.error("❌ AI task error:", error);
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
}

// Create global instance
window.empireRevenue = new EmpireRevenueController();

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', () => {
    window.empireRevenue.initializeEmpire();
});

export default EmpireRevenueController;
