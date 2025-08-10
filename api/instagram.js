const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
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
};