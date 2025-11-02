import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Assessment = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const assetsByType = [
    { type: 'Virtual Machines', count: 4523, icon: '🖥️', color: '#3B82F6' },
    { type: 'Databases', count: 892, icon: '🗄️', color: '#8B5CF6' },
    { type: 'Storage', count: 3421, icon: '💾', color: '#10B981' },
    { type: 'Networks', count: 245, icon: '🌐', color: '#F59E0B' },
    { type: 'Applications', count: 3766, icon: '📦', color: '#EF4444' }
  ];

  const assetsByEnvironment = [
    { name: 'Production', value: 5234 },
    { name: 'Staging', value: 3421 },
    { name: 'Development', value: 2891 },
    { name: 'DR', value: 1301 }
  ];

  const readinessScore = {
    overall: 85,
    categories: [
      { name: 'Documentation', score: 92, icon: '📝' },
      { name: 'Dependencies Mapped', score: 88, icon: '🔗' },
      { name: 'Compatibility', score: 78, icon: '✅' },
      { name: 'Security Baseline', score: 85, icon: '🔒' },
      { name: 'Team Readiness', score: 82, icon: '👥' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-4xl">
              🔍
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Infrastructure Assessment</h1>
              <p className="text-slate-600">Discover and analyze your current infrastructure</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-8">
          <div className="flex border-b border-slate-200">
            {['overview', 'inventory', 'dependencies', 'compliance'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-all relative ${
                  activeTab === tab ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
                )}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="p-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="text-4xl mb-3">🖥️</div>
                  <div className="text-3xl font-bold text-blue-900 mb-1">12,847</div>
                  <div className="text-sm text-blue-700">Total Assets Discovered</div>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="text-4xl mb-3">🎯</div>
                  <div className="text-3xl font-bold text-green-900 mb-1">85%</div>
                  <div className="text-sm text-green-700">Migration Readiness</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <div className="text-4xl mb-3">🔗</div>
                  <div className="text-3xl font-bold text-purple-900 mb-1">9,234</div>
                  <div className="text-sm text-purple-700">Dependencies Mapped</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                  <div className="text-4xl mb-3">⚠️</div>
                  <div className="text-3xl font-bold text-amber-900 mb-1">234</div>
                  <div className="text-sm text-amber-700">Blockers Identified</div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Assets by Type */}
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Assets by Type</h3>
                  <div className="space-y-4">
                    {assetsByType.map(item => (
                      <div key={item.type}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-sm font-medium text-slate-700">{item.type}</span>
                          </div>
                          <span className="text-sm font-bold text-slate-900">{item.count.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${(item.count / 12847) * 100}%`,
                              backgroundColor: item.color
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assets by Environment */}
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Assets by Environment</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={assetsByEnvironment}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {assetsByEnvironment.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'][index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Readiness Score */}
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Migration Readiness Score</h3>
                  <div className="text-4xl font-bold text-green-600">{readinessScore.overall}%</div>
                </div>
                <div className="space-y-4">
                  {readinessScore.categories.map(category => (
                    <div key={category.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{category.icon}</span>
                          <span className="text-sm font-medium text-slate-700">{category.name}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{category.score}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                          style={{ width: `${category.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content... */}
          {activeTab !== 'overview' && (
            <div className="p-8 text-center text-slate-500">
              <div className="text-6xl mb-4">🚧</div>
              <p>This section is under development</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-all">
            ⬅️ Back to Journey
          </button>
          <div className="space-x-4">
            <button className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all">
              💾 Export Report
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
              Continue to TCO Calculator ➡️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;