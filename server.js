const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins with all methods
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Read CSS file once at startup
const styles = fs.readFileSync(path.join(__dirname, 'views', 'styles.css'), 'utf8');

// Helper function to serve HTML with embedded styles
function serveHTML(res, filename) {
  const htmlPath = path.join(__dirname, 'views', filename);
  let html = fs.readFileSync(htmlPath, 'utf8');
  html = html.replace('___STYLES___', styles);
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
}

// Landing page
app.get('/', (req, res) => {
  serveHTML(res, 'index.html');
});

// Privacy Policy
app.get('/privacy', (req, res) => {
  serveHTML(res, 'privacy.html');
});

// Terms of Service
app.get('/terms', (req, res) => {
  serveHTML(res, 'terms.html');
});

// Data Deletion - GET request (for users visiting the page)
app.get('/data-deletion', (req, res) => {
  serveHTML(res, 'data-deletion.html');
});

// Data Deletion Callback - POST request (for Meta/Facebook)
app.post('/data-deletion', (req, res) => {
  // Log the deletion request (optional)
  console.log('Data deletion request received:', req.body);
  
  // Since we don't store any user data, we just confirm the deletion
  const confirmationCode = `del_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Return response in the format Meta expects
  res.json({
    url: `https://${req.get('host')}/data-deletion-status?code=${confirmationCode}`,
    confirmation_code: confirmationCode
  });
});

// Data Deletion Status Check (optional endpoint for users to verify deletion)
app.get('/data-deletion-status', (req, res) => {
  const { code } = req.query;
  res.json({
    status: 'completed',
    message: 'No user data was stored, so no deletion was necessary.',
    confirmation_code: code || 'N/A',
    timestamp: new Date().toISOString()
  });
});

// App Icon Page
app.get('/app-icon', (req, res) => {
  serveHTML(res, 'app-icon.html');
});

// Instagram API endpoint
app.get('/api/instagram', async (req, res) => {
  const { username } = req.query;
  
  if (!username) {
    return res.status(400).json({ 
      error: 'Username parameter is required',
      success: false 
    });
  }
  
  try {
    const cleanUsername = username.replace('@', '').trim();
    const profileUrl = `https://www.instagram.com/${cleanUsername}/`;
    
    const mockData = {
      username: cleanUsername,
      profileUrl: profileUrl,
      fullName: null,
      profilePic: null,
      followers: null,
      isVerified: false,
      success: true
    };
    
    try {
      const response = await axios.get(
        `https://www.instagram.com/api/v1/users/web_profile_info/?username=${cleanUsername}`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'X-IG-App-ID': '936619743392459',
            'X-Requested-With': 'XMLHttpRequest',
            'Referer': profileUrl
          },
          timeout: 5000
        }
      );
      
      if (response.data && response.data.data && response.data.data.user) {
        const userData = response.data.data.user;
        
        return res.status(200).json({
          username: cleanUsername,
          profileUrl: profileUrl,
          fullName: userData.full_name || null,
          profilePic: userData.profile_pic_url || null,
          followers: userData.edge_followed_by?.count || null,
          isVerified: userData.is_verified || false,
          success: true
        });
      }
    } catch (apiError) {
      console.log('Instagram API error, returning basic data:', apiError.message);
    }
    
    return res.status(200).json(mockData);
    
  } catch (error) {
    console.error('Error in Instagram API endpoint:', error);
    return res.status(200).json({
      username: username,
      profileUrl: `https://www.instagram.com/${username}/`,
      success: false,
      error: 'Could not fetch profile data'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'Instagram Widget for Vev',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>404 - Page Not Found</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
          text-align: center;
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h1 { color: #333; margin-bottom: 10px; }
        p { color: #666; margin-bottom: 20px; }
        a { 
          color: #1877f2; 
          text-decoration: none;
          font-weight: 600;
        }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/">Return to Home</a>
      </div>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`
    🚀 Server is running on port ${PORT}
    📷 Instagram Widget for Vev
    
    Available endpoints:
    - GET /              → Landing page
    - GET /privacy       → Privacy Policy
    - GET /terms         → Terms of Service
    - GET /data-deletion → Data Deletion Instructions
    - POST /data-deletion → Data Deletion Callback (Meta)
    - GET /data-deletion-status → Deletion Status Check
    - GET /app-icon      → App Icon & Downloads
    - GET /app-icon.svg  → App Icon (SVG)
    - GET /api/instagram → Instagram API endpoint
    - GET /health        → Health check
    
    Ready for Meta App Review! 🎉
  `);
});