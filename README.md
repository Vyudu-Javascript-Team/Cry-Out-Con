# Cry Out Con Website

A modern, responsive website for the Cry Out Conference built with React and TypeScript, featuring dynamic content management through Sanity CMS and automated deployments via Netlify.

## Tech Stack

### Frontend
- **React**: Core framework for building the UI
- **TypeScript**: For type-safe development
- **Framer Motion**: Powers smooth animations and transitions
- **TailwindCSS**: Utility-first CSS framework for styling
- **React Router**: Handles client-side routing

### Backend & CMS
- **Sanity.io**: Headless CMS for content management
  - Studio URL: https://cryoutcon.sanity.studio/
  - Manages dynamic content including:
    - Navigation links
    - Footer content
    - Policy pages
    - News and updates

### Deployment
- **Netlify**: Handles automated builds and deployments
- **GitHub**: Version control and collaboration

## Development Workflow

### 1. Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Code Organization
```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── lib/            # Utilities and Sanity client
└── assets/         # Static assets
```

### 3. Content Management Flow
1. **Sanity Studio** (https://cryoutcon.sanity.studio/)
   - Used for managing all dynamic content
   - Changes are instantly reflected in the content lake
   - No deployment needed for content updates

2. **Development to Production**
   - Code changes are made locally
   - Commits are pushed to GitHub
   - Netlify automatically builds and deploys from the main branch

### 4. Key Features

#### Image Optimization
- Lazy loading implementation using Intersection Observer
- Network-aware quality settings
- Responsive image sizes
- Blur placeholders for smooth loading

#### Performance Optimizations
- Code splitting and lazy loading
- Optimized asset delivery
- Caching strategies
- Mobile-first responsive design

## Deployment Process

1. **Code Changes**
   ```bash
   # Stage changes
   git add .
   
   # Commit with descriptive message
   git commit -m "feat: Description of changes"
   
   # Push to GitHub
   git push origin main
   ```

2. **Automatic Deployment**
   - Netlify monitors the main branch
   - Builds and deploys automatically on push
   - Runs build checks and optimizations

3. **Content Updates**
   - Log in to Sanity Studio
   - Make content changes
   - Changes are live instantly
   - No deployment needed

## Important URLs

- **Production Site**: [Production URL]
- **Sanity Studio**: https://cryoutcon.sanity.studio/
- **GitHub Repository**: [Repository URL]
- **Netlify Dashboard**: [Netlify URL]

## Best Practices

### Code
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful commit messages

### Content Management
- Always preview content changes
- Use appropriate image sizes
- Maintain consistent content structure
- Follow the established content model

### Performance
- Optimize images before upload
- Minimize third-party dependencies
- Use code splitting where appropriate
- Monitor Netlify analytics

## Troubleshooting

### Common Issues
1. **Content not updating**
   - Check Sanity Studio connection
   - Verify CORS settings
   - Clear browser cache

2. **Build failures**
   - Check Netlify build logs
   - Verify dependencies
   - Test locally before push

3. **Image loading issues**
   - Verify image URLs in Sanity
   - Check LazyImage component props
   - Monitor network requests

## Support

For technical issues or questions:
1. Check existing documentation
2. Review GitHub issues
3. Contact the development team

## License

[License Information]
