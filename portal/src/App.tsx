import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import JourneyNavigator from './pages/JourneyNavigator';
import Assessment from './pages/PreMigration/Assessment';
import EnterpriseDashboard from './pages/EnterpriseDashboard';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Discovery from './pages/Discovery';
import Migrations from './pages/Migrations';
import Analytics from './pages/Analytics';
import Layout from './components/Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Main Journey Navigator - NEW DEFAULT PAGE */}
          <Route path="/" element={<JourneyNavigator />} />
          
          {/* Public Landing Page */}
          <Route path="/landing" element={<Landing />} />
          
          {/* PRE-MIGRATION Modules */}
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/tco-calculator" element={<ComingSoon title="TCO Calculator" />} />
          <Route path="/strategy-advisor" element={<ComingSoon title="Strategy Advisor" />} />
          <Route path="/architecture" element={<ComingSoon title="Architecture Designer" />} />
          <Route path="/risk-analysis" element={<ComingSoon title="Risk Analysis" />} />
          <Route path="/migration-planning" element={<ComingSoon title="Migration Planning" />} />
          
          {/* MIGRATION Modules */}
          <Route path="/dashboard-enterprise" element={<EnterpriseDashboard />} />
          <Route path="/validation" element={<ComingSoon title="Validation Suite" />} />
          <Route path="/issues" element={<ComingSoon title="Issue Management" />} />
          <Route path="/cutover" element={<ComingSoon title="Cutover Planner" />} />
          
          {/* POST-MIGRATION Modules */}
          <Route path="/monitoring" element={<ComingSoon title="Health Monitoring" />} />
          <Route path="/finops" element={<ComingSoon title="FinOps Center" />} />
          <Route path="/optimization" element={<ComingSoon title="Performance Optimization" />} />
          <Route path="/security-posture" element={<ComingSoon title="Security Posture" />} />
          <Route path="/governance" element={<ComingSoon title="Cloud Governance" />} />
          <Route path="/analytics" element={<ComingSoon title="Analytics & Insights" />} />
          
          {/* Legacy Application Portal (Protected) */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/projects/:id" element={<Layout><ProjectDetail /></Layout>} />
          <Route path="/discovery" element={<Layout><Discovery /></Layout>} />
          <Route path="/migrations" element={<Layout><Migrations /></Layout>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

// Coming Soon placeholder component
const ComingSoon = ({ title }: { title: string }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-6">🚧</div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
        <p className="text-xl text-slate-600 mb-8">Coming Soon</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
        >
          ← Back to Journey Navigator
        </a>
      </div>
    </div>
  );
};

export default App;
