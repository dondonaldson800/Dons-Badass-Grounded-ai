/**
 * GROUNDED GIVING - The Non-Profit Pillar
 * Mission: Empower global communities through transparent technology and grounded action
 * Owner: Don (Master Builder)
 */

import { useState, useEffect } from 'react';
import { getEmpireTheme } from '../themes/EmpireThemes';

const theme = getEmpireTheme('GROUNDED_GIVING');

const GroundedGiving = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [impactStories, setImpactStories] = useState([]);
  const [transparencyData, setTransparencyData] = useState(null);

  useEffect(() => {
    // Load initial data
    loadImpactStories();
    loadTransparencyData();
  }, []);

  const loadImpactStories = () => {
    // Mock data - replace with API call
    setImpactStories([
      {
        id: 1,
        title: "Clean Water Initiative - Kenya",
        impact: "2,500 families now have access to clean water",
        date: "2026-03-15",
        image: "🌊",
        funds: "$45,000",
        status: "Active"
      },
      {
        id: 2,
        title: "Education Tech - Rural India",
        impact: "15 schools equipped with learning tablets",
        date: "2026-03-10",
        image: "📚",
        funds: "$32,000",
        status: "Complete"
      },
      {
        id: 3,
        title: "Medical Supply Chain - Philippines",
        impact: "Healthcare delivery improved by 60%",
        date: "2026-03-05",
        image: "🏥",
        funds: "$28,000",
        status: "Active"
      }
    ]);
  };

  const loadTransparencyData = () => {
    // Mock data - replace with API call
    setTransparencyData({
      totalRaised: 105000,
      totalAllocated: 98500,
      projectsActive: 12,
      projectsComplete: 8,
      beneficiaries: 45000,
      allocation: {
        programs: 75,
        operations: 15,
        technology: 10
      }
    });
  };

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: theme.background,
        color: theme.text,
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Header */}
      <header 
        className="border-b"
        style={{ 
          borderColor: theme.border,
          backgroundColor: theme.surface
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: theme.text }}>
                🌍 Grounded Giving
              </h1>
              <p className="text-sm mt-1 opacity-80">
                Transparent technology. Grounded action. Lasting impact.
              </p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: theme.primary,
                color: '#FFFFFF'
              }}
            >
              ← Back to Empire
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav 
        className="border-b"
        style={{ borderColor: theme.border }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            {['home', 'transparency', 'action'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="py-4 px-2 font-medium capitalize relative transition-all"
                style={{
                  color: activeTab === tab ? theme.primary : theme.text,
                  opacity: activeTab === tab ? 1 : 0.6,
                  borderBottom: activeTab === tab ? `3px solid ${theme.primary}` : 'none'
                }}
              >
                {tab === 'home' && '🏠 Mission Wall'}
                {tab === 'transparency' && '📊 Transparency Ledger'}
                {tab === 'action' && '⚡ Action Hub'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'home' && <MissionWall stories={impactStories} theme={theme} />}
        {activeTab === 'transparency' && <TransparencyLedger data={transparencyData} theme={theme} />}
        {activeTab === 'action' && <ActionHub theme={theme} />}
      </main>
    </div>
  );
};

// Mission Wall Component
const MissionWall = ({ stories, theme }) => {
  return (
    <div>
      {/* Mission Statement */}
      <div 
        className="rounded-xl p-8 mb-8"
        style={{ 
          backgroundColor: theme.surface,
          borderLeft: `4px solid ${theme.primary}`
        }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: theme.primary }}>
          Our Mission
        </h2>
        <p className="text-lg leading-relaxed" style={{ color: theme.text }}>
          To empower global communities through transparent technology and grounded action. 
          Grounded Giving bridges the gap between digital innovation and human need, providing 
          a clear, verifiable platform where every contribution creates a visible, lasting impact 
          on the future.
        </p>
      </div>

      {/* Impact Stories Feed */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: theme.text }}>
        Real-Time Impact Stories
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(story => (
          <div
            key={story.id}
            className="rounded-xl p-6 transition-all hover:scale-105 cursor-pointer"
            style={{ 
              backgroundColor: theme.surface,
              border: `1px solid ${theme.border}`
            }}
          >
            {/* Icon */}
            <div className="text-5xl mb-4">{story.image}</div>
            
            {/* Title */}
            <h3 className="text-xl font-bold mb-2" style={{ color: theme.primary }}>
              {story.title}
            </h3>
            
            {/* Impact */}
            <p className="mb-4 opacity-90" style={{ color: theme.text }}>
              {story.impact}
            </p>
            
            {/* Meta */}
            <div className="flex justify-between items-center text-sm">
              <span 
                className="px-3 py-1 rounded-full font-medium"
                style={{ 
                  backgroundColor: story.status === 'Active' ? theme.primary : theme.secondary,
                  color: '#FFFFFF'
                }}
              >
                {story.status}
              </span>
              <span className="font-bold" style={{ color: theme.secondary }}>
                {story.funds}
              </span>
            </div>
            
            {/* Date */}
            <div className="mt-4 text-xs opacity-60">
              {new Date(story.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Transparency Ledger Component
const TransparencyLedger = ({ data, theme }) => {
  if (!data) return <div>Loading transparency data...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: theme.text }}>
        Transparency Ledger
      </h2>
      
      <p className="mb-8 text-lg opacity-90">
        Every dollar, every decision, every impact - fully visible and verifiable.
      </p>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon="💰"
          label="Total Raised"
          value={`$${(data.totalRaised / 1000).toFixed(0)}K`}
          theme={theme}
        />
        <MetricCard
          icon="📈"
          label="Allocated"
          value={`$${(data.totalAllocated / 1000).toFixed(0)}K`}
          theme={theme}
        />
        <MetricCard
          icon="🎯"
          label="Active Projects"
          value={data.projectsActive}
          theme={theme}
        />
        <MetricCard
          icon="👥"
          label="Beneficiaries"
          value={`${(data.beneficiaries / 1000).toFixed(0)}K`}
          theme={theme}
        />
      </div>

      {/* Allocation Breakdown */}
      <div 
        className="rounded-xl p-8"
        style={{ 
          backgroundColor: theme.surface,
          border: `1px solid ${theme.border}`
        }}
      >
        <h3 className="text-xl font-bold mb-6" style={{ color: theme.primary }}>
          Fund Allocation Breakdown
        </h3>
        
        <div className="space-y-4">
          <AllocationBar
            label="Programs & Direct Impact"
            percentage={data.allocation.programs}
            color={theme.primary}
            theme={theme}
          />
          <AllocationBar
            label="Operations & Infrastructure"
            percentage={data.allocation.operations}
            color={theme.secondary}
            theme={theme}
          />
          <AllocationBar
            label="Technology & Innovation"
            percentage={data.allocation.technology}
            color="#6B8E23"
            theme={theme}
          />
        </div>

        <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: theme.background }}>
          <p className="text-sm opacity-80">
            <strong style={{ color: theme.primary }}>Transparency Note:</strong> All transactions 
            are recorded on a distributed ledger and can be audited at any time. Our overhead is 
            capped at 15% to ensure maximum impact.
          </p>
        </div>
      </div>
    </div>
  );
};

// Action Hub Component
const ActionHub = ({ theme }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: theme.text }}>
        Action Hub
      </h2>
      
      <p className="mb-8 text-lg opacity-90">
        Choose how you want to create impact today.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Donate */}
        <ActionCard
          icon="💝"
          title="Donate"
          description="Make a direct contribution to active projects"
          cta="Start Giving"
          theme={theme}
        />
        
        {/* Volunteer */}
        <ActionCard
          icon="🤝"
          title="Volunteer"
          description="Offer your skills and time to support causes"
          cta="Join Mission"
          theme={theme}
        />
        
        {/* Advocate */}
        <ActionCard
          icon="📢"
          title="Advocate"
          description="Amplify impact by spreading the word"
          cta="Share Story"
          theme={theme}
        />
      </div>
    </div>
  );
};

// Helper Components
const MetricCard = ({ icon, label, value, theme }) => (
  <div 
    className="rounded-xl p-6"
    style={{ 
      backgroundColor: theme.surface,
      border: `1px solid ${theme.border}`
    }}
  >
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-sm opacity-60 mb-1">{label}</div>
    <div className="text-3xl font-bold" style={{ color: theme.primary }}>
      {value}
    </div>
  </div>
);

const AllocationBar = ({ label, percentage, color, theme }) => (
  <div>
    <div className="flex justify-between mb-2">
      <span className="font-medium">{label}</span>
      <span className="font-bold" style={{ color: color }}>{percentage}%</span>
    </div>
    <div 
      className="h-3 rounded-full overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <div
        className="h-full transition-all duration-500"
        style={{ 
          width: `${percentage}%`,
          backgroundColor: color
        }}
      />
    </div>
  </div>
);

const ActionCard = ({ icon, title, description, cta, theme }) => (
  <div 
    className="rounded-xl p-8 text-center transition-all hover:scale-105"
    style={{ 
      backgroundColor: theme.surface,
      border: `2px solid ${theme.border}`
    }}
  >
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-3" style={{ color: theme.primary }}>
      {title}
    </h3>
    <p className="mb-6 opacity-80">{description}</p>
    <button 
      className="w-full py-3 rounded-lg font-bold transition-all hover:opacity-90 empire-btn"
      style={{ 
        backgroundColor: theme.secondary,
        color: '#FFFFFF'
      }}
    >
      {cta}
    </button>
  </div>
);

export default GroundedGiving;
