# Cloud Genesis - Deployment Guide

## Quick Deploy to Vercel

### Method 1: Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign in with your GitHub account

2. **Import Repository**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose: `bharathk2498/cloud-genesis`

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: portal
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables**
   - Not required for initial deployment
   - Add later if needed for API connections

5. **Deploy Settings**
   - Branch: `enterprise-implementation`
   - Click "Deploy"

6. **Wait 2-3 Minutes**
   - Vercel will build and deploy automatically

7. **Get Your URL**
   - You'll receive a URL like:
   - `https://cloud-genesis-bharathk2498.vercel.app`

---

### Method 2: Vercel CLI (For Developers)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to portal directory
cd portal

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts:
# - Setup and deploy: Y
# - Scope: Your account
# - Link to existing project: N
# - Project name: cloud-genesis
# - Directory: ./ (already in portal)
# - Override settings: N

# Get your URL
```

---

### Method 3: GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - enterprise-implementation

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install Vercel CLI
        run: npm install -g vercel
      
      - name: Deploy to Vercel
        working-directory: ./portal
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Expected URLs After Deployment

### Main Application
- **Homepage (Journey Navigator):** `https://your-domain.vercel.app/`
- **Landing Page:** `https://your-domain.vercel.app/landing`

### Pre-Migration Modules
- **Assessment:** `https://your-domain.vercel.app/assessment`
- **TCO Calculator:** `https://your-domain.vercel.app/tco-calculator`
- **Strategy Advisor:** `https://your-domain.vercel.app/strategy-advisor`
- **Architecture:** `https://your-domain.vercel.app/architecture`
- **Risk Analysis:** `https://your-domain.vercel.app/risk-analysis`
- **Migration Planning:** `https://your-domain.vercel.app/migration-planning`

### Migration Modules
- **Enterprise Dashboard:** `https://your-domain.vercel.app/dashboard-enterprise`
- **Validation:** `https://your-domain.vercel.app/validation`
- **Issues:** `https://your-domain.vercel.app/issues`
- **Cutover:** `https://your-domain.vercel.app/cutover`

### Post-Migration Modules
- **Monitoring:** `https://your-domain.vercel.app/monitoring`
- **FinOps:** `https://your-domain.vercel.app/finops`
- **Optimization:** `https://your-domain.vercel.app/optimization`
- **Security:** `https://your-domain.vercel.app/security-posture`
- **Governance:** `https://your-domain.vercel.app/governance`
- **Analytics:** `https://your-domain.vercel.app/analytics`

---

## Alternative Hosting Platforms

### Netlify

1. Go to: https://netlify.com
2. Import: `bharathk2498/cloud-genesis`
3. Configure:
   ```
   Base directory: portal
   Build command: npm run build
   Publish directory: portal/dist
   Branch: enterprise-implementation
   ```
4. Deploy

**URL:** `https://cloud-genesis-bharathk2498.netlify.app`

---

### AWS Amplify

1. Go to: AWS Amplify Console
2. Connect: GitHub repository
3. Configure:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - cd portal
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: portal/dist
       files:
         - '**/*'
     cache:
       paths:
         - portal/node_modules/**/*
   ```
4. Deploy

---

### GitHub Pages (Static Only)

```bash
# Build
cd portal
npm run build

# Deploy using gh-pages
npm install -g gh-pages
gh-pages -d dist -b gh-pages
```

**URL:** `https://bharathk2498.github.io/cloud-genesis/`

---

## Local Testing Before Deploy

```bash
# Clone repository
git clone https://github.com/bharathk2498/cloud-genesis.git
cd cloud-genesis
git checkout enterprise-implementation

# Install dependencies
cd portal
npm install

# Run development server
npm run dev

# Open: http://localhost:3000

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Custom Domain Setup (Optional)

### On Vercel

1. Go to Project Settings
2. Select "Domains"
3. Add your custom domain (e.g., `cloudgenesis.io`)
4. Update DNS records:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
5. Wait for DNS propagation (5-60 minutes)

---

## Environment Variables

If connecting to backend APIs, add these in Vercel:

```
VITE_API_URL=https://api.cloudgenesis.io
VITE_AUTH_DOMAIN=your-auth-domain
VITE_ANALYTICS_ID=your-analytics-id
```

---

## Troubleshooting

### Build Fails

**Check:**
- Node version (should be 18+)
- All dependencies installed
- No TypeScript errors

**Fix:**
```bash
cd portal
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes Not Working (404)

**Solution:** Ensure `vercel.json` exists in portal directory with SPA rewrites.

### Slow Load Times

**Optimization:**
- Enable Vercel Edge Network
- Add `cache-control` headers
- Use lazy loading for routes

---

## Monitoring & Analytics

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `App.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      {/* Your app */}
      <Analytics />
    </>
  );
}
```

---

## Performance Optimization

### Code Splitting

Already implemented with React lazy loading:
```typescript
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

### Image Optimization

Use Vercel Image Optimization:
```typescript
import Image from 'next/image'; // If using Next.js
```

### Caching

Configured in `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## Security

### Headers

Configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

### HTTPS

Automatically enabled by Vercel.

---

## CI/CD

### Automatic Deployments

Vercel automatically deploys when you push to `enterprise-implementation` branch.

### Preview Deployments

Every pull request gets a unique preview URL.

---

## Support

**Vercel Docs:** https://vercel.com/docs  
**Vite Docs:** https://vitejs.dev  
**React Router:** https://reactrouter.com  

---

## Next Steps After Deployment

1. ✅ Visit your live URL
2. ✅ Test all routes
3. ✅ Share with stakeholders
4. ✅ Gather feedback
5. ✅ Iterate and improve

---

**Your Cloud Genesis platform is now live!** 🚀
