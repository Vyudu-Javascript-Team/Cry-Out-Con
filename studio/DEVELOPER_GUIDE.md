# Cry Out Con - Sanity CMS Developer Documentation

## Overview
This documentation covers the Sanity CMS implementation for Cry Out Con, including setup details, access instructions, and required image migration steps.

## Quick Links
- Production CMS: https://cryoutcon.sanity.studio
- Project Management: https://www.sanity.io/manage/project/l96yh15e
- Production Website: https://cryoutcon.com

## Project Details
- **Project ID**: l96yh15e
- **Dataset**: production
- **Studio Version**: 3.69.0
- **Node Version**: >= 16.x

## Recent Implementation Changes
1. Deployed Sanity Studio to `cryoutcon.sanity.studio`
2. Configured CORS settings for secure access
3. Set up content schemas for:
   - Speakers
   - Sections
   - Pages
   - Settings

## Accessing the CMS

### For Content Editors
1. Visit https://cryoutcon.sanity.studio
2. Click "Login with Google"
3. Use your authorized Google account
4. You'll see the content dashboard after login

### For Developers
1. Same login process as above
2. Additional access to project settings via https://www.sanity.io/manage/project/l96yh15e
3. Ensure you have appropriate role permissions (Developer or Administrator)

## Content Structure

### Schemas
Located in `/studio/schemas/`:
- `speaker.ts`: Speaker profiles with images
- `section.ts`: Website sections
- `page.ts`: Page content
- `settings.ts`: Global settings

### Image Handling
All images use Sanity's image pipeline with:
- Hotspot functionality enabled
- Alt text fields for accessibility
- Automatic image optimization

## Required Actions: Image Migration

### Current Status
- Website images currently served from file system
- Images need migration to Sanity's content lake
- CMS won't display images until uploaded

### Migration Steps
1. **Image Inventory**:
   ```bash
   # From project root
   find . -type f -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" -o -name "*.gif"
   ```

2. **For Each Content Type**:
   - Download current images
   - Access corresponding CMS entry
   - Upload image via Sanity Studio
   - Add alt text
   - Save and publish

3. **Verification**:
   - Check image display in CMS
   - Verify hotspot functionality
   - Confirm alt text saved

## Development Setup

### Local Development
```bash
# Clone repository
git clone [repository-url]
cd Cry-Out-Con

# Install dependencies
cd studio
npm install

# Start local development
npm run dev
```

### Environment Setup
Create `/studio/.env`:
```env
SANITY_STUDIO_PROJECT_ID=l96yh15e
SANITY_STUDIO_DATASET=production
```

### CORS Configuration
Currently configured for:
- `http://localhost:3333` (local studio)
- `https://cryoutcon.sanity.studio` (production studio)
- `http://localhost:3000` (local frontend)
- `https://cryoutcon.com` (production site)

## Deployment

### Studio Deployment
```bash
cd studio
npx sanity deploy
```

### Authentication Token
- Type: Deploy Studio (Token only)
- Store securely in environment variables
- Never commit tokens to version control

## Content Management

### Best Practices
1. **Images**:
   - Use descriptive filenames
   - Always add alt text
   - Set appropriate hotspots
   - Optimize before upload (recommended max size: 2MB)

2. **Content**:
   - Preview changes before publishing
   - Use meaningful titles
   - Maintain consistent formatting

### Version Control
- All content changes are versioned
- Access history via document "History" tab
- Restore previous versions if needed

## Troubleshooting

### Common Issues
1. **Images Not Displaying**:
   - Verify CORS settings
   - Check image upload success
   - Confirm proper schema configuration

2. **Authentication Issues**:
   - Verify user project access
   - Check role permissions
   - Clear browser cache/cookies

3. **Deployment Problems**:
   - Confirm token permissions
   - Check for build errors
   - Verify network connectivity

## Support Resources
- [Sanity Documentation](https://www.sanity.io/docs)
- [Image Pipeline Guide](https://www.sanity.io/docs/image-url)
- [Schema Types Reference](https://www.sanity.io/docs/schema-types)

## Security Notes
- Keep API tokens secure
- Regular security audits
- Monitor access logs
- Review CORS settings periodically

## Maintenance
1. **Regular Tasks**:
   - Update dependencies
   - Review access permissions
   - Monitor disk usage
   - Backup content

2. **Updates**:
   - Check for Sanity updates
   - Test locally before deployment
   - Document any changes

## Contact
For additional support or questions:
1. Project Admin: [Your Contact Info]
2. Sanity Support: https://www.sanity.io/support

---

Last Updated: January 14, 2026
