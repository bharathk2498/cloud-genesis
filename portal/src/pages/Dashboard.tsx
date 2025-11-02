import { useQuery } from '@tanstack/react-query';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie,
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadialBarChart, RadialBar
} from 'recharts';
import {
  CloudIcon, ServerIcon, DatabaseIcon, ArrowPathIcon,
  CurrencyDollarIcon, ChartBarIcon, CheckCircleIcon,
  ExclamationTriangleIcon, ClockIcon, ArrowTrendingUpIcon,
  ArrowTrendingDownIcon, SparklesIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
const GRADIENT_COLORS = [
  { start: '#667eea', end: '#764ba2' },
  { start: '#f093fb', end: '#f5576c' },
  { start: '#4facfe', end: '#00f2fe' },
  { start: '#43e97b', end: '#38f9d7' },
];

function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      return {
        totalProjects: 12,
        totalAssets: 1847,
        activeMigrations: 23,
        completedMigrations: 156,
        costSavings: 127500,
        savingsPercentage: 37,
        uptimePercentage: 99.94,
        avgMigrationTime: 3.2,
        
        // KPI Trends
        trends: {
          projects: 15.3,
          assets: 22.8,
          migrations: 8.5,
          savings: 42.1,
        },
        
        // Migration Status
        migrationsByStatus: [
          { name: 'Completed', value: 156, color: '#10b981' },
          { name: 'In Progress', value: 23, color: '#3b82f6' },
          { name: 'Pending', value: 45, color: '#f59e0b' },
          { name: 'Failed', value: 3, color: '#ef4444' },
        ],
        
        // Asset Distribution
        assetsByType: [
          { name: 'VMs', value: 892, percentage: 48.3 },
          { name: 'Databases', value: 376, percentage: 20.4 },
          { name: 'Storage', value: 312, percentage: 16.9 },
          { name: 'Containers', value: 178, percentage: 9.6 },
          { name: 'Functions', value: 89, percentage: 4.8 },
        ],
        
        // Cloud Distribution
        cloudDistribution: [
          { name: 'AWS', current: 687, target: 234, color: '#FF9900' },
          { name: 'Azure', current: 423, target: 912, color: '#0089D6' },
          { name: 'GCP', current: 289, target: 701, color: '#4285F4' },
          { name: 'On-Prem', current: 448, target: 0, color: '#6B7280' },
        ],
        
        // Migration Timeline
        migrationTimeline: [
          { month: 'Jan', completed: 12, inProgress: 8, planned: 25 },
          { month: 'Feb', completed: 18, inProgress: 12, planned: 22 },
          { month: 'Mar', completed: 25, inProgress: 15, planned: 18 },
          { month: 'Apr', completed: 31, inProgress: 18, planned: 15 },
          { month: 'May', completed: 28, inProgress: 23, planned: 12 },
          { month: 'Jun', completed: 42, inProgress: 19, planned: 8 },
        ],
        
        // Cost Analysis Over Time
        costTrend: [
          { month: 'Jan', current: 345000, projected: 285000, saved: 60000 },
          { month: 'Feb', current: 338000, projected: 268000, saved: 70000 },
          { month: 'Mar', current: 325000, projected: 245000, saved: 80000 },
          { month: 'Apr', current: 312000, projected: 228000, saved: 84000 },
          { month: 'May', current: 298000, projected: 215000, saved: 83000 },
          { month: 'Jun', current: 285000, projected: 205000, saved: 80000 },
        ],
        
        // Strategy Distribution
        strategyDistribution: [
          { name: 'Rehost', value: 68, fill: '#3b82f6' },
          { name: 'Replatform', value: 45, fill: '#10b981' },
          { name: 'Refactor', value: 23, fill: '#f59e0b' },
          { name: 'Retire', value: 18, fill: '#ef4444' },
          { name: 'Retain', value: 12, fill: '#8b5cf6' },
        ],
        
        // Recent Activity
        recentActivity: [
          { 
            id: 1, 
            type: 'success', 
            message: 'Migration wave 5 completed successfully',
            project: 'AWS to Azure Migration',
            time: '5 minutes ago',
            details: '12 VMs migrated with 99.9% uptime'
          },
          { 
            id: 2, 
            type: 'info', 
            message: 'Discovery completed for new project',
            project: 'GCP Data Center Exit',
            time: '1 hour ago',
            details: '234 assets discovered'
          },
          { 
            id: 3, 
            type: 'warning', 
            message: 'Performance degradation detected',
            project: 'Azure to AWS Migration',
            time: '2 hours ago',
            details: 'Database replication lag increased'
          },
          { 
            id: 4, 
            type: 'success', 
            message: 'Cost optimization applied',
            project: 'Multi-Cloud Optimization',
            time: '3 hours ago',
            details: 'Saved $8,200/month by rightsizing'
          },
        ],
        
        // Active Migrations
        activeMigrations: [
          {
            id: 1,
            name: 'Database Cluster Migration',
            project: 'AWS to Azure',
            progress: 73,
            status: 'replicating',
            eta: '2 hours',
            strategy: 'Replatform'
          },
          {
            id: 2,
            name: 'Web Application Servers',
            project: 'On-Prem to GCP',
            progress: 45,
            status: 'migrating',
            eta: '4 hours',
            strategy: 'Rehost'
          },
          {
            id: 3,
            name: 'Storage Bucket Transfer',
            project: 'Azure to AWS',
            progress: 92,
            status: 'validating',
            eta: '30 minutes',
            strategy: 'Rehost'
          },
        ],
      };
    },
  });

  const KPICard = ({ title, value, icon: Icon, trend, subtitle, gradient }: any) => (
    <div 
      className="relative overflow-hidden rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
      style={{
        background: gradient ? `linear-gradient(135deg, ${gradient.start} 0%, ${gradient.end} 100%)` : 'white'
      }}
    >
      <div className="flex items-center justify-between">
        <div className={gradient ? 'text-white' : 'text-gray-900'}>
          <p className={`text-sm font-medium ${gradient ? 'text-white/80' : 'text-gray-500'}`}>
            {title}
          </p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {subtitle && (
            <p className={`text-sm mt-1 ${gradient ? 'text-white/90' : 'text-gray-600'}`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${gradient ? 'bg-white/20' : 'bg-blue-50'}`}>
          <Icon className={`h-8 w-8 ${gradient ? 'text-white' : 'text-blue-600'}`} />
        </div>
      </div>
      
      {trend !== undefined && (
        <div className="flex items-center mt-4">
          {trend > 0 ? (
            <ArrowTrendingUpIcon className={`h-4 w-4 ${gradient ? 'text-white' : 'text-green-600'} mr-1`} />
          ) : (
            <ArrowTrendingDownIcon className={`h-4 w-4 ${gradient ? 'text-white' : 'text-red-600'} mr-1`} />
          )}
          <span className={`text-sm font-semibold ${gradient ? 'text-white' : trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(trend)}%
          </span>
          <span className={`text-sm ml-1 ${gradient ? 'text-white/80' : 'text-gray-500'}`}>
            vs last month
          </span>
        </div>
      )}
      
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
        <div className="w-32 h-32 rounded-full bg-white" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <SparklesIcon className="h-8 w-8 text-blue-600" />
            Migration Command Center
          </h1>
          <p className="mt-2 text-gray-600">Real-time insights across your multi-cloud migrations</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/discovery"
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Start Discovery
          </Link>
          <Link
            to="/projects"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Migration
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Projects"
          value={stats?.totalProjects || 0}
          icon={CloudIcon}
          trend={stats?.trends.projects}
          gradient={GRADIENT_COLORS[0]}
        />
        <KPICard
          title="Assets Under Management"
          value={(stats?.totalAssets || 0).toLocaleString()}
          icon={ServerIcon}
          trend={stats?.trends.assets}
          gradient={GRADIENT_COLORS[1]}
        />
        <KPICard
          title="Active Migrations"
          value={stats?.activeMigrations || 0}
          icon={ArrowPathIcon}
          trend={stats?.trends.migrations}
          subtitle={`${stats?.completedMigrations} completed`}
          gradient={GRADIENT_COLORS[2]}
        />
        <KPICard
          title="Monthly Savings"
          value={`$${((stats?.costSavings || 0) / 1000).toFixed(0)}K`}
          icon={CurrencyDollarIcon}
          trend={stats?.trends.savings}
          subtitle={`${stats?.savingsPercentage}% reduction`}
          gradient={GRADIENT_COLORS[3]}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Migration Timeline */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Migration Progress Timeline</h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats?.migrationTimeline}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorInProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="completed" 
                stackId="1"
                stroke="#10b981" 
                fillOpacity={1}
                fill="url(#colorCompleted)" 
                name="Completed"
              />
              <Area 
                type="monotone" 
                dataKey="inProgress" 
                stackId="1"
                stroke="#3b82f6" 
                fillOpacity={1}
                fill="url(#colorInProgress)" 
                name="In Progress"
              />
              <Area 
                type="monotone" 
                dataKey="planned" 
                stackId="1"
                stroke="#f59e0b" 
                fillOpacity={1}
                fill="url(#colorPlanned)" 
                name="Planned"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Migration Status Pie */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats?.migrationsByStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {stats?.migrationsByStatus.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {stats?.migrationsByStatus.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Cost Analysis */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Cost Optimization Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats?.costTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => `$${value/1000}K`} />
              <Tooltip 
                formatter={(value: any) => `$${value.toLocaleString()}`}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 4 }}
                name="Current Cost"
              />
              <Line 
                type="monotone" 
                dataKey="projected" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                name="Projected Cost"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cloud Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Cloud Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.cloudDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="current" fill="#94a3b8" name="Current" radius={[8, 8, 0, 0]} />
              <Bar dataKey="target" fill="#3b82f6" name="Target" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Migrations & Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Active Migrations */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Migrations</h3>
          <div className="space-y-4">
            {stats?.activeMigrations.map((migration: any) => (
              <div key={migration.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{migration.name}</h4>
                    <p className="text-sm text-gray-500">{migration.project}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {migration.strategy}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{migration.status}</span>
                    <span className="font-semibold text-gray-900">{migration.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${migration.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    ETA: {migration.eta}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link 
            to="/migrations" 
            className="mt-4 block text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Migrations →
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {stats?.recentActivity.map((activity: any) => (
              <div key={activity.id} className="flex gap-4">
                <div className="flex-shrink-0">
                  {activity.type === 'success' && (
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="h-6 w-6 text-green-600" />
                    </div>
                  )}
                  {activity.type === 'info' && (
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <ChartBarIcon className="h-6 w-6 text-blue-600" />
                    </div>
                  )}
                  {activity.type === 'warning' && (
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{activity.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{activity.project}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.details}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategy Distribution */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Migration Strategy Distribution</h3>
        <div className="grid grid-cols-5 gap-4">
          {stats?.strategyDistribution.map((strategy: any, idx: number) => (
            <div key={idx} className="text-center">
              <ResponsiveContainer width="100%" height={120}>
                <RadialBarChart 
                  innerRadius="60%" 
                  outerRadius="100%" 
                  data={[{ value: strategy.value, fill: strategy.fill }]}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <p className="font-semibold text-2xl text-gray-900">{strategy.value}</p>
              <p className="text-sm text-gray-500">{strategy.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
