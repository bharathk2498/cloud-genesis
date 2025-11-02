import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
          {/* Public Landing Page */}
          <Route path="/" element={<Landing />} />
          
          {/* Application Portal (Protected) */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/projects/:id" element={<Layout><ProjectDetail /></Layout>} />
          <Route path="/discovery" element={<Layout><Discovery /></Layout>} />
          <Route path="/migrations" element={<Layout><Migrations /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
