import { Link } from 'react-router-dom';
import { 
  CloudArrowUpIcon, 
  ShieldCheckIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  ArrowPathIcon,
  ServerIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Multi-Cloud Support',
    description: 'Seamlessly migrate between AWS, Azure, and GCP with unified workflows.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'All 7Rs Strategies',
    description: 'Rehost, Replatform, Refactor, Repurchase, Retain, Retire, and Relocate.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Enterprise Security',
    description: 'SOC2 compliant with Vault integration, RBAC, and audit logging.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Cost Optimization',
    description: 'AI-powered cost analysis and savings recommendations up to 40%.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Automated Discovery',
    description: 'Intelligent asset discovery with dependency mapping and analysis.',
    icon: ServerIcon,
  },
  {
    name: 'Real-Time Analytics',
    description: 'Live migration monitoring with comprehensive dashboards and alerts.',
    icon: ChartBarIcon,
  },
];

const stats = [
  { label: 'Assets Migrated', value: '10K+' },
  { label: 'Cost Savings', value: '$2.5M' },
  { label: 'Success Rate', value: '99.7%' },
  { label: 'Enterprise Clients', value: '50+' },
];

const migrationPaths = [
  { from: 'AWS', to: 'Azure', status: 'ready' },
  { from: 'AWS', to: 'GCP', status: 'ready' },
  { from: 'Azure', to: 'AWS', status: 'ready' },
  { from: 'Azure', to: 'GCP', status: 'ready' },
  { from: 'GCP', to: 'AWS', status: 'ready' },
  { from: 'GCP', to: 'Azure', status: 'ready' },
  { from: 'On-Premise', to: 'Any Cloud', status: 'ready' },
];

function Landing() {
  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <CloudArrowUpIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Cloud Genesis</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600">How It Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600">Pricing</a>
              <Link 
                to="/dashboard" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Launch Portal
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Enterprise Multi-Cloud</span>
                  <span className="block text-blue-600">Migration Platform</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Orchestrate seamless migrations across AWS, Azure, and GCP with automated discovery, 
                  intelligent strategy recommendations, and zero-downtime cutover.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <Link
                      to="/dashboard"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <a
                      href="#demo"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Watch Demo
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by Enterprise Leaders
            </h2>
            <p className="mt-3 text-xl text-blue-200 sm:mt-4">
              Powering mission-critical cloud migrations worldwide
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-4 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                  {stat.label}
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for cloud migration
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Enterprise-grade platform supporting all migration strategies and cloud providers
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Migration Paths */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Any Cloud to Any Cloud
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Support for all major cloud providers and migration paths
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {migrationPaths.map((path, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-500">FROM</div>
                    <div className="text-xl font-bold text-gray-900">{path.from}</div>
                  </div>
                  <ArrowPathIcon className="h-8 w-8 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-500">TO</div>
                    <div className="text-xl font-bold text-gray-900">{path.to}</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Production Ready
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Migration in 8 Simple Steps
            </h2>
          </div>
          <div className="mt-10">
            <div className="space-y-6">
              {[
                { step: 1, title: 'Create Project', desc: 'Define source and target cloud environments' },
                { step: 2, title: 'Discovery', desc: 'Auto-discover and inventory all assets' },
                { step: 3, title: 'Strategy Selection', desc: 'AI-powered 7Rs strategy recommendation' },
                { step: 4, title: 'Wave Planning', desc: 'Group assets into migration waves' },
                { step: 5, title: 'Execution', desc: 'Automated migration with real-time monitoring' },
                { step: 6, title: 'Validation', desc: 'Comprehensive post-migration testing' },
                { step: 7, title: 'Cutover', desc: 'Zero-downtime traffic switch with rollback' },
                { step: 8, title: 'Decommission', desc: 'Clean up source resources' },
              ].map((item) => (
                <div key={item.step} className="relative bg-white rounded-lg shadow p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-xl font-bold">
                        {item.step}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="mt-2 text-base text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to migrate?</span>
            <span className="block text-blue-200">Start your journey today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Launch Portal
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="mailto:sales@cloudgenesis.io"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; 2025 Cloud Genesis. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
