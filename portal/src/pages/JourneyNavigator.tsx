import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JourneyNavigator = () => {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState('pre-migration');

  const journeyPhases = [
    {
      id: 'pre-migration',
      title: 'Pre-Migration',
      subtitle: 'Discovery & Planning',
      icon: '📋',
      color: 'blue',
      progress: 65,
      modules: [
        {
          id: 'assessment',
          title: 'Assessment',
          description: 'Discover and inventory your infrastructure',
          icon: '🔍',
          status: 'completed',
          route: '/assessment',
          metrics: { assets: 12847, readiness: 85 }
        },
        {
          id: 'tco',
          title: 'TCO Calculator',
          description: 'Calculate total cost of ownership',
          icon: '💰',
          status: 'completed',
          route: '/tco-calculator',
          metrics: { savings: '2.8M', roi: '18 months' }
        },
        {
          id: 'strategy',
          title: 'Strategy Advisor',
          description: 'AI-powered migration strategy recommendations',
          icon: '🎯',
          status: 'in-progress',
          route: '/strategy-advisor',
          metrics: { recommended: 7234, pending: 3613 }
        },
        {
          id: 'architecture',
          title: 'Architecture Design',
          description: 'Design target cloud architecture',
          icon: '🏛️',
          status: 'pending',
          route: '/architecture',
          metrics: { blueprints: 3, validated: 1 }
        },
        {
          id: 'risk',
          title: 'Risk Analysis',
          description: 'Identify and mitigate migration risks',
          icon: '⚖️',
          status: 'pending',
          route: '/risk-analysis',
          metrics: { risks: 23, critical: 2 }
        },
        {
          id: 'planning',
          title: 'Migration Planning',
          description: 'Create detailed migration roadmap',
          icon: '📅',
          status: 'pending',
          route: '/migration-planning',
          metrics: { waves: 12, timeline: '8 months' }
        }
      ]
    },
    {
      id: 'migration',
      title: 'Migration',
      subtitle: 'Execute & Monitor',
      icon: '🚀',
      color: 'purple',
      progress: 34,
      modules: [
        {
          id: 'execution',
          title: 'Execution Dashboard',
          description: 'Monitor real-time migration progress',
          icon: '📈',
          status: 'in-progress',
          route: '/dashboard-enterprise',
          metrics: { active: 23, completed: 4389 }
        },
        {
          id: 'validation',
          title: 'Validation Suite',
          description: 'Automated testing and validation',
          icon: '🛡️',
          status: 'in-progress',
          route: '/validation',
          metrics: { passed: 4201, failed: 188 }
        },
        {
          id: 'issues',
          title: 'Issue Management',
          description: 'Track and resolve migration issues',
          icon: '🔧',
          status: 'in-progress',
          route: '/issues',
          metrics: { open: 34, resolved: 278 }
        },
        {
          id: 'cutover',
          title: 'Cutover Planner',
          description: 'Plan and execute cutover activities',
          icon: '⏱️',
          status: 'pending',
          route: '/cutover',
          metrics: { scheduled: 8, completed: 3 }
        }
      ]
    },
    {
      id: 'post-migration',
      title: 'Post-Migration',
      subtitle: 'Optimize & Govern',
      icon: '📊',
      color: 'green',
      progress: 0,
      modules: [
        {
          id: 'monitoring',
          title: 'Health Monitoring',
          description: 'Track application health and performance',
          icon: '❤️',
          status: 'pending',
          route: '/monitoring',
          metrics: { healthy: 0, degraded: 0 }
        },
        {
          id: 'finops',
          title: 'FinOps Center',
          description: 'Cost optimization and management',
          icon: '💸',
          status: 'pending',
          route: '/finops',
          metrics: { spend: '0', opportunities: '0' }
        },
        {
          id: 'optimization',
          title: 'Performance Tuning',
          description: 'Optimize cloud resources',
          icon: '⚡',
          status: 'pending',
          route: '/optimization',
          metrics: { recommendations: 0 }
        },
        {
          id: 'security',
          title: 'Security Posture',
          description: 'Continuous security and compliance',
          icon: '🔒',
          status: 'pending',
          route: '/security-posture',
          metrics: { score: 0, findings: 0 }
        },
        {
          id: 'governance',
          title: 'Cloud Governance',
          description: 'Policy enforcement and compliance',
          icon: '📑',
          status: 'pending',
          route: '/governance',
          metrics: { policies: 0, violations: 0 }
        },
        {
          id: 'analytics',
          title: 'Analytics & Insights',
          description: 'Business intelligence and reporting',
          icon: '📊',
          status: 'pending',
          route: '/analytics',
          metrics: { reports: 0 }
        }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'pending': return '⏳';
      default: return '⏳';
    }
  };

  const getPhaseColor = (color) => {
    switch (color) {
      case 'blue': return 'from-blue-600 to-cyan-500';
      case 'purple': return 'from-purple-600 to-pink-500';
      case 'green': return 'from-green-600 to-emerald-500';
      default: return 'from-slate-600 to-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">CG</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Migration Journey Navigator
                </h1>
                <p className="text-xs text-slate-500">Your complete migration lifecycle guide</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
              📞 Get Help
            </button>
          </div>
        </div>
      </header>

      <main className="px-8 py-8 max-w-7xl mx-auto">
        {/* Journey Timeline */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            {journeyPhases.map((phase, index) => (
              <React.Fragment key={phase.id}>
                <div className="flex-1">
                  <button
                    onClick={() => setCurrentPhase(phase.id)}
                    className={`w-full text-left transition-all ${
                      currentPhase === phase.id ? 'scale-105' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 ${
                      currentPhase === phase.id ? `border-${phase.color}-500` : 'border-slate-200'
                    }">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className={`w-16 h-16 bg-gradient-to-br ${getPhaseColor(phase.color)} rounded-xl flex items-center justify-center text-3xl`}>
                          {phase.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900">{phase.title}</h3>
                          <p className="text-sm text-slate-500">{phase.subtitle}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Progress</span>
                          <span className="font-bold text-slate-900">{phase.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${getPhaseColor(phase.color)}`}
                            style={{ width: `${phase.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
                {index < journeyPhases.length - 1 && (
                  <div className="w-12 flex items-center justify-center">
                    <div className="text-2xl text-slate-300">→</div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Current Phase Modules */}
        {journeyPhases.map(phase => (
          currentPhase === phase.id && (
            <div key={phase.id}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {phase.icon} {phase.title} Modules
                </h2>
                <p className="text-slate-600">
                  Complete these modules to progress through your {phase.title.toLowerCase()} journey
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {phase.modules.map(module => (
                  <div 
                    key={module.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => navigate(module.route)}
                  >
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(module.status)}`}>
                        {getStatusIcon(module.status)} {module.status.replace('-', ' ').toUpperCase()}
                      </div>
                      <div className="text-3xl">{module.icon}</div>
                    </div>

                    {/* Module Info */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{module.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{module.description}</p>

                    {/* Metrics */}
                    {module.metrics && (
                      <div className="bg-slate-50 rounded-xl p-3 space-y-2">
                        {Object.entries(module.metrics).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-bold text-slate-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Button */}
                    <button className={`w-full mt-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      module.status === 'completed' 
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : module.status === 'in-progress'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}>
                      {module.status === 'completed' ? '✅ View Results' : 
                       module.status === 'in-progress' ? '🚀 Continue' : 
                       '📢 Start Module'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Need Guidance?</h3>
              <p className="text-blue-100 mb-4">
                Our AI assistant and expert team are here to help you every step of the way
              </p>
              <div className="flex space-x-4">
                <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:shadow-lg transition-all">
                  🤖 Ask AI Assistant
                </button>
                <button className="px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-all">
                  📚 Browse Knowledge Base
                </button>
                <button className="px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-all">
                  📞 Talk to Expert
                </button>
              </div>
            </div>
            <div className="text-8xl ml-8">🧐</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JourneyNavigator;