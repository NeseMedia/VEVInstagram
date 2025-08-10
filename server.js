const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="no">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VEV Instagram Widget API</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
        }
        .status {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            margin-bottom: 30px;
        }
        .endpoint {
            background: #f3f4f6;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .endpoint h3 {
            margin-top: 0;
            color: #374151;
        }
        code {
            background: #1f2937;
            color: #10b981;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Courier New', monospace;
        }
        .example {
            background: #fef3c7;
            border: 1px solid #fbbf24;
            border-radius: 6px;
            padding: 15px;
            margin-top: 15px;
        }
        .example strong {
            color: #92400e;
        }
        a {
            color: #6366f1;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        pre {
            background: #1f2937;
            color: #e5e7eb;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📷 VEV Instagram Widget API</h1>
        <span class="status">✓ API er aktiv på Railway</span>
        
        <p>Dette er API-endepunktet for Instagram Follow Widget i Vev.</p>
        
        <div class="endpoint">
            <h3>API Endpoint</h3>
            <p><strong>GET</strong> <code>/api/instagram</code></p>
            <p><strong>Parameter:</strong> <code>username</code> - Instagram brukernavn (uten @)</p>
            
            <div class="example">
                <strong>Eksempel:</strong><br>
                <a href="/api/instagram?username=cristiano" target="_blank">
                    /api/instagram?username=cristiano
                </a>
            </div>
        </div>
        
        <div class="endpoint">
            <h3>Response Format</h3>
            <pre>{
  "username": "cristiano",
  "profileUrl": "https://www.instagram.com/cristiano/",
  "fullName": "Cristiano Ronaldo",
  "profilePic": "...",
  "followers": 600000000,
  "isVerified": true,
  "success": true
}</pre>
        </div>
        
        <div class="endpoint">
            <h3>Bruk i Vev</h3>
            <p>Denne API-en brukes automatisk av Instagram Follow Widget komponenten i Vev.</p>
            <p>Bare legg til brukernavnet i komponent-innstillingene, så hentes data automatisk.</p>
        </div>
        
        <p style="margin-top: 40px; color: #6b7280; text-align: center;">
            <a href="https://github.com/NeseMedia/VEVInstagram" target="_blank">GitHub Repository</a>
        </p>
    </div>
</body>
</html>`;
  
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});