# GitHub Pages Deployment Guide

## Current Status

✅ **GitHub Pages configuration is complete!**

Your application will be available at:
```
https://bharathk2498.github.io/cloud-genesis/
```

---

## Automatic Deployment

The application will automatically deploy to GitHub Pages when:
- You push to the `enterprise-implementation` branch
- The GitHub Actions workflow runs successfully

---

## Enable GitHub Pages (One-Time Setup)

### Step 1: Go to Repository Settings
1. Navigate to: https://github.com/bharathk2498/cloud-genesis
2. Click **Settings** tab
3. Scroll down to **Pages** in the left sidebar

### Step 2: Configure GitHub Pages
```
Source: GitHub Actions
```

That's it! GitHub Actions will handle the rest.

---

## Manual Deployment (Alternative)

If you want to deploy manually:

```bash
# Clone repository
git clone https://github.com/bharathk2498/cloud-genesis.git
cd cloud-genesis
git checkout enterprise-implementation

# Navigate to portal
cd portal

# Install dependencies
npm install

# Deploy to GitHub Pages
npm run deploy
```

---

## What Happens During Deployment

1. **GitHub Action Triggers** (on push to enterprise-implementation)
2. **Install Dependencies** (npm install)
3. **Build Application** (npm run build)
4. **Deploy to gh-pages branch** (automatically)
5. **GitHub Pages serves the site** from gh-pages branch

---

## Checking Deployment Status

1. Go to: https://github.com/bharathk2498/cloud-genesis/actions
2. Look for "Deploy to GitHub Pages" workflow
3. Green checkmark = successful deployment
4. Red X = failed (click to see error logs)

---

## Expected Build Time

- First deployment: 3-5 minutes
- Subsequent deployments: 2-3 minutes

---

## Troubleshooting

### Issue: 404 Error on Routes
**Solution:** Already configured with 404.html redirect

### Issue: Assets Not Loading
**Solution:** Base path is set to `/cloud-genesis/` in vite.config.ts

### Issue: Build Fails
**Check:**
1. GitHub Actions logs for errors
2. TypeScript compilation errors
3. Missing dependencies

**Fix:**
```bash
cd portal
npm install
npm run build
```

If build works locally, push the fix.

### Issue: GitHub Pages Not Enabled
**Solution:**
1. Go to Settings > Pages
2. Select "GitHub Actions" as source
3. Save

---

## URLs After Deployment

### Main Application
```
https://bharathk2498.github.io/cloud-genesis/
```

### Pre-Migration Modules
```
https://bharathk2498.github.io/cloud-genesis/assessment
https://bharathk2498.github.io/cloud-genesis/tco-calculator
https://bharathk2498.github.io/cloud-genesis/strategy-advisor
https://bharathk2498.github.io/cloud-genesis/architecture
https://bharathk2498.github.io/cloud-genesis/risk-analysis
https://bharathk2498.github.io/cloud-genesis/migration-planning
```

### Migration Modules
```
https://bharathk2498.github.io/cloud-genesis/dashboard-enterprise
https://bharathk2498.github.io/cloud-genesis/validation
https://bharathk2498.github.io/cloud-genesis/issues
https://bharathk2498.github.io/cloud-genesis/cutover
```

### Post-Migration Modules
```
https://bharathk2498.github.io/cloud-genesis/monitoring
https://bharathk2498.github.io/cloud-genesis/finops
https://bharathk2498.github.io/cloud-genesis/optimization
https://bharathk2498.github.io/cloud-genesis/security-posture
https://bharathk2498.github.io/cloud-genesis/governance
https://bharathk2498.github.io/cloud-genesis/analytics
```

---

## Custom Domain (Optional)

If you want to use a custom domain like `cloudgenesis.io`:

1. Go to Settings > Pages
2. Enter your custom domain
3. Update DNS records:
   ```
   Type: CNAME
   Name: www
   Value: bharathk2498.github.io
   ```
4. Wait for DNS propagation (5-60 minutes)

---

## Performance Optimization

✅ Already configured:
- Code splitting
- Asset optimization
- Gzip compression (automatic)
- CDN delivery via GitHub Pages

---

## Security

✅ Already configured:
- HTTPS enabled by default
- Security headers
- SPA routing handled

---

## Monitoring Deployments

### GitHub Actions Dashboard
```
https://github.com/bharathk2498/cloud-genesis/actions
```

### Deployment History
```
https://github.com/bharathk2498/cloud-genesis/deployments
```

---

## Next Steps After Deployment

1. ✅ Wait 3-5 minutes for first deployment
2. ✅ Visit: https://bharathk2498.github.io/cloud-genesis/
3. ✅ Test all routes and features
4. ✅ Gather feedback
5. ✅ Make improvements
6. 🚀 Deploy to production (Vercel) when ready!

---

## Support

**GitHub Pages Docs:** https://docs.github.com/pages  
**GitHub Actions Docs:** https://docs.github.com/actions  
**Vite Docs:** https://vitejs.dev  

---

**Your application will be live at:**
**https://bharathk2498.github.io/cloud-genesis/** 🚀
