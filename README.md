# Premium Carpentry Website

A modern, high-class one-page carpenter website with a dark woody theme.

## Features

- Dark woody theme with light highlights
- Fully responsive design
- Smooth animations and transitions
- Auto-sliding image carousel
- Mobile-friendly navigation
- Optimized for performance

## Deployment on Vercel

### Method 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? (Enter a name or press Enter for default)
   - Directory? (Press Enter for current directory)
   - Override settings? **No**

5. **Your site will be live!** Vercel will provide you with a deployment URL.

### Method 2: Using Vercel Web Interface (Easiest)

1. **Go to [vercel.com](https://vercel.com)** and sign up/login

2. **Click "Add New Project"**

3. **Choose one of these options**:

   **Option A: Drag & Drop (Fastest)**
   - Simply drag and drop your project folder onto the Vercel dashboard
   - Vercel will automatically detect and deploy your static site

   **Option B: Import Git Repository**
   - Connect your GitHub/GitLab/Bitbucket account
   - Select your repository
   - Vercel will auto-detect settings and deploy

### Method 3: Using Git Repository

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Go to [vercel.com](https://vercel.com)** and click "Add New Project"

3. **Import your Git repository**

4. **Configure Project**:
   - Framework Preset: **Other**
   - Root Directory: `./` (current directory)
   - Build Command: Leave empty (static site)
   - Output Directory: Leave empty
   - Install Command: Leave empty

5. **Click "Deploy"**

## Project Structure

```
.
├── index.html      # Main HTML file
├── styles.css      # All styles
├── script.js       # JavaScript functionality
├── vercel.json     # Vercel configuration
└── README.md       # This file
```

## Custom Domain (Optional)

After deployment:

1. Go to your project settings on Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Environment Variables

No environment variables needed for this static site.

## Support

For issues or questions, visit [Vercel Documentation](https://vercel.com/docs)


