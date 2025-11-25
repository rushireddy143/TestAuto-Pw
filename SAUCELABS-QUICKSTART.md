# 🚀 Sauce Labs Quick Start

## Prerequisites
- ✅ Sauce Labs account ([Sign up here](https://saucelabs.com))
- ✅ Node.js 18+ installed
- ✅ Repository cloned and dependencies installed

## 🔑 Step 1: Get Your Credentials

1. Login to [Sauce Labs](https://app.saucelabs.com)
2. Click on your profile (top right)
3. Go to **User Settings → User Settings**
4. Copy your **Username** and **Access Key**

## 🔧 Step 2: Set Environment Variables

### Windows (PowerShell)
```powershell
$env:SAUCE_USERNAME="your-sauce-username"
$env:SAUCE_ACCESS_KEY="your-sauce-access-key"
```

### Linux/macOS
```bash
export SAUCE_USERNAME="your-sauce-username"
export SAUCE_ACCESS_KEY="your-sauce-access-key"
```

## 🧪 Step 3: Run Your First Test

### Run all tests on Sauce Labs
```bash
npm run test:saucelabs
```

### Run on specific platform
```bash
# Chrome on Windows
npm run test:saucelabs:chrome

# Firefox on Windows
npm run test:saucelabs:firefox

# Safari on macOS
npm run test:saucelabs:safari

# Edge on Windows
npm run test:saucelabs:edge

# Chrome on Android
npm run test:saucelabs:android

# Safari on iOS
npm run test:saucelabs:ios
```

## 📊 Step 4: View Results

1. Go to [Sauce Labs Dashboard](https://app.saucelabs.com/dashboard/tests)
2. Click on **Automated → Test Results**
3. See your test execution with:
   - ✅ Video recording
   - 📸 Screenshots
   - 📝 Logs
   - 📈 Performance metrics

## 🔄 Step 5: Setup CI/CD (Optional)

### GitHub Actions
1. Go to **Repository Settings → Secrets → Actions**
2. Add secrets:
   - `SAUCE_USERNAME`
   - `SAUCE_ACCESS_KEY`
3. Push to `main` branch
4. Workflow runs automatically!

### Azure DevOps
1. Go to **Pipelines → Library**
2. Add variables:
   - `SAUCE_USERNAME`
   - `SAUCE_ACCESS_KEY` (mark as secret)
3. Create new pipeline with `azure-pipelines-saucelabs.yml`
4. Run pipeline!

## 📚 Need Help?

- 📖 Full guide: [SAUCELABS-INTEGRATION.md](./SAUCELABS-INTEGRATION.md)
- 🌐 Sauce Labs Docs: [docs.saucelabs.com](https://docs.saucelabs.com)
- 💬 Community: [community.saucelabs.com](https://community.saucelabs.com)

## 🎯 Pro Tips

1. **Start small**: Test with one browser first
2. **Check dashboard**: Always review results in Sauce Labs
3. **Use parallel execution**: Run multiple platforms simultaneously
4. **Monitor usage**: Keep an eye on your concurrent sessions
5. **Watch videos**: Video recordings are great for debugging

Happy Testing! 🧪✨