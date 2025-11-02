import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const EnterpriseDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  // Real-time metrics simulation
  const [metrics, setMetrics] = useState({
    totalAssets: 12847,
    activeMigrations: 23,
    completedToday: 147,
    costSaved: 2847593,
    successRate: 99.7,
    avgMigrationTime: 4.2
  });

  // Migration trends data
  const migrationTrends = [
    { date: 'Mon', completed: 145, failed: 3, inProgress: 28 },
    { date: 'Tue', completed: 167, failed: 2, inProgress: 31 },
    { date: 'Wed', completed: 189, failed: 1, inProgress: 25 },
    { date: 'Thu', completed: 203, failed: 4, inProgress: 29 },
    { date: 'Fri', completed: 178, failed: 2, inProgress: 33 },
    { date: 'Sat', completed: 156, failed: 1, inProgress: 22 },
    { date: 'Sun', completed: 147, failed: 3, inProgress: 23 }
  ];

  // Cloud distribution
  const cloudDistribution = [
    { name: 'AWS', value: 4523, color: '#FF9900' },
    { name: 'Azure', value: 3891, color: '#0078D4' },
    { name: 'GCP', value: 2678, color: '#4285F4' },
    { name: 'On-Prem', value: 1755, color: '#6B7280' }
  ];

  // Strategy breakdown
  const strategyBreakdown = [
    { strategy: 'Rehost', count: 5234, percentage: 40.7 },
    { strategy: 'Replatform', count: 3421, percentage: 26.6 },
    { strategy: 'Refactor', count: 2145, percentage: 16.7 },
    { strategy: 'Retain', count: 1289, percentage: 10.0 },
    { strategy: 'Retire', count: 758, percentage: 5.9 }
  ];

  // Cost savings over time
  const costSavings = [
    { month: 'Jan', savings: 187000, projected: 175000 },
    { month: 'Feb', savings: 234000, projected: 195000 },
    { month: 'Mar', savings: 298000, projected: 215000 },
    { month: 'Apr', savings: 356000, projected: 245000 },
    { month: 'May', savings: 423000, projected: 285000 },
    { month: 'Jun', savings: 489000, projected: 335000 }
  ];

  // Active migrations
  const activeMigrations = [
    { id: 'MIG-2847', source: 'AWS', target: 'Azure', progress: 87, eta: '2h 15m', status: 'running' },
    { id: 'MIG-2848', source: 'On-Prem', target: 'AWS', progress: 62, eta: '4h 30m', status: 'running' },
    { id: 'MIG-2849', source: 'GCP', target: 'AWS', progress: 45, eta: '6h 45m', status: 'running' },
    { id: 'MIG-2850', source: 'Azure', target: 'GCP', progress: 91, eta: '1h 10m', status: 'running' },
    { id: 'MIG-2851', source: 'AWS', target: 'GCP', progress: 28, eta: '8h 20m', status: 'running' }
  ];

  // Security & Compliance
  const securityScores = [
    { category: 'Encryption', score: 98, color: '#10B981' },
    { category: 'Access Control', score: 95, color: '#10B981' },
    { category: 'Audit Logging', score: 100, color: '#10B981' },
    { category: 'Network Security', score: 92, color: '#F59E0B' },
    { category: 'Data Privacy', score: 97, color: '#10B981' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CG</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Cloud Genesis
                  </h1>
                  <p className="text-xs text-slate-500">Enterprise Migration Command Center</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                New Migration
              </button>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full absolute top-0 right-0 animate-pulse"></div>
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">BK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-8 border-t border-slate-200">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'migrations', label: 'Migrations', icon: '🚀' },
              { id: 'analytics', label: 'Analytics', icon: '📈' },
              { id: 'security', label: 'Security', icon: '🔒' },
              { id: 'cost', label: 'FinOps', icon: '💰' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium transition-all relative ${
                  activeTab === tab.id
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-6">
          {/* Total Assets */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🗄️</span>
              </div>
              <span className="text-green-500 text-sm font-medium">+12.5%</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {metrics.totalAssets.toLocaleString()}
            </div>
            <div className="text-sm text-slate-500">Total Assets</div>
          </div>

          {/* Active Migrations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-500 text-sm font-medium">Live</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {metrics.activeMigrations}
            </div>
            <div className="text-sm text-slate-500">Active Migrations</div>
          </div>

          {/* Completed Today */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <span className="text-green-500 text-sm font-medium">+8.3%</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {metrics.completedToday}
            </div>
            <div className="text-sm text-slate-500">Completed Today</div>
          </div>

          {/* Cost Saved */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <span className="text-green-500 text-sm font-medium">+23.1%</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              ${(metrics.costSaved / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-slate-500">Cost Savings</div>
          </div>

          {/* Success Rate */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <span className="text-green-500 text-sm font-medium">+0.3%</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {metrics.successRate}%
            </div>
            <div className="text-sm text-slate-500">Success Rate</div>
          </div>

          {/* Avg Migration Time */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <span className="text-red-500 text-sm font-medium">-15.2%</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {metrics.avgMigrationTime}h
            </div>
            <div className="text-sm text-slate-500">Avg Duration</div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Migration Trends */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Migration Trends</h3>
                <p className="text-sm text-slate-500">Weekly performance overview</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-lg">Completed</button>
                <button className="px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50">Failed</button>
                <button className="px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50">In Progress</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={migrationTrends}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="date" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip />
                <Area type="monotone" dataKey="completed" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCompleted)" />
                <Area type="monotone" dataKey="inProgress" stroke="#F59E0B" fillOpacity={1} fill="url(#colorInProgress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Cloud Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Cloud Distribution</h3>
              <p className="text-sm text-slate-500">Asset allocation across platforms</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cloudDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {cloudDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              {cloudDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategy Breakdown & Active Migrations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Strategy Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Migration Strategies</h3>
              <p className="text-sm text-slate-500">7Rs framework distribution</p>
            </div>
            <div className="space-y-4">
              {strategyBreakdown.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{item.strategy}</span>
                    <span className="text-sm font-bold text-slate-900">{item.count.toLocaleString()} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Migrations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Active Migrations</h3>
              <p className="text-sm text-slate-500">Real-time migration status</p>
            </div>
            <div className="space-y-4">
              {activeMigrations.map((migration, index) => (
                <div key={index} className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-mono font-medium text-slate-700">{migration.id}</span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                        {migration.status}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">ETA: {migration.eta}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs text-slate-500">{migration.source}</span>
                    <span className="text-slate-400">→</span>
                    <span className="text-xs text-slate-500">{migration.target}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" 
                      style={{ width: `${migration.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs font-medium text-slate-700 mt-1">{migration.progress}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cost Savings & Security Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cost Savings */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Cost Optimization</h3>
              <p className="text-sm text-slate-500">Savings vs projected baseline</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costSavings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip />
                <Legend />
                <Bar dataKey="savings" fill="#10B981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="projected" fill="#94A3B8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Security Score */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Security Score</h3>
              <p className="text-sm text-slate-500">Compliance & security posture</p>
            </div>
            <div className="space-y-4">
              {securityScores.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{item.category}</span>
                    <span className="text-sm font-bold" style={{ color: item.color }}>{item.score}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${item.score}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">96.4%</div>
                <div className="text-xs text-green-700 font-medium">Overall Security Score</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnterpriseDashboard;