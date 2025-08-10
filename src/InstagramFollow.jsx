import React, { useState, useEffect } from 'react';
import { registerVevComponent } from '@vev/react';
import styles from './InstagramFollow.module.css';

const InstagramFollow = ({ 
  username = '',
  ctaText = 'Følg oss på Instagram',
  showFollowerCount = true,
  showProfilePicture = true,
  displayStyle = 'horizontal',
  backgroundColor = '#FFFFFF',
  buttonColor = '#E4405F',
  buttonTextColor = '#FFFFFF',
  textColor = '#000000',
  borderRadius = 12,
  apiEndpoint = 'https://your-project.vercel.app/api/instagram'
}) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) {
      setProfile(null);
      setError(null);
      return;
    }
    
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${apiEndpoint}?username=${username}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error('Error fetching Instagram profile:', err);
        setError('Kunne ikke hente profil');
        // Fallback data
        setProfile({ 
          username, 
          profileUrl: `https://www.instagram.com/${username}/`,
          success: false 
        });
      } finally {
        setLoading(false);
      }
    };

    // Debounce API calls
    const timeoutId = setTimeout(fetchProfile, 500);
    return () => clearTimeout(timeoutId);
  }, [username, apiEndpoint]);

  const handleFollowClick = () => {
    if (!username) return;
    
    // Track click event (optional analytics)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'instagram_follow_click', {
        username: username,
        event_category: 'social'
      });
    }
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const profileUrl = `https://www.instagram.com/${username}/`;
    
    if (isMobile) {
      // Try Instagram app first on mobile
      const appUrl = `instagram://user?username=${username}`;
      
      // Attempt to open app
      window.location.href = appUrl;
      
      // Fallback to web version after delay
      setTimeout(() => {
        window.open(profileUrl, '_blank', 'noopener,noreferrer');
      }, 1500);
    } else {
      // Desktop: directly to web version
      window.open(profileUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Format follower count
  const formatFollowerCount = (count) => {
    if (!count || count === '0') return '';
    
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M følgere`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k følgere`;
    }
    return `${num.toLocaleString()} følgere`;
  };

  if (!username) {
    return (
      <div className={styles.placeholder} style={{ borderRadius: `${borderRadius}px` }}>
        <div className={styles.placeholderIcon}>📷</div>
        <p className={styles.placeholderText}>Legg til Instagram brukernavn</p>
      </div>
    );
  }

  const widgetClasses = `${styles.widget} ${styles[displayStyle]}`;

  return (
    <div 
      className={widgetClasses}
      style={{ 
        backgroundColor,
        borderRadius: `${borderRadius}px`,
        color: textColor
      }}
    >
      <div className={styles.content}>
        {showProfilePicture && (
          <div className={styles.profileSection}>
            {profile?.profilePic ? (
              <img 
                src={profile.profilePic} 
                alt={`${username} profilbilde`}
                className={styles.profilePic}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={styles.profilePlaceholder}
              style={{ display: profile?.profilePic ? 'none' : 'flex' }}
            >
              📷
            </div>
          </div>
        )}
        
        <div className={styles.textSection}>
          <div className={styles.username}>
            @{username}
            {profile?.isVerified && (
              <span className={styles.verified} title="Verifisert konto">✓</span>
            )}
          </div>
          
          {profile?.fullName && (
            <div className={styles.fullName}>{profile.fullName}</div>
          )}
          
          {showFollowerCount && profile?.followers && (
            <div className={styles.followers}>
              {formatFollowerCount(profile.followers)}
            </div>
          )}
          
          {error && (
            <div className={styles.errorText}>
              {error}
            </div>
          )}
        </div>
      </div>
      
      <button 
        onClick={handleFollowClick}
        className={styles.followButton}
        style={{ 
          backgroundColor: buttonColor,
          color: buttonTextColor
        }}
        disabled={loading}
      >
        {loading ? (
          <span className={styles.loadingText}>
            <span className={styles.spinner}></span>
            Laster...
          </span>
        ) : (
          ctaText
        )}
      </button>
    </div>
  );
};

registerVevComponent(InstagramFollow, {
  name: 'Instagram Follow Widget',
  props: [
    {
      name: 'username',
      type: 'string',
      title: 'Instagram brukernavn',
      description: 'Skriv brukernavnet uten @ tegn',
      initialValue: ''
    },
    {
      name: 'ctaText',
      type: 'string',
      title: 'Knapp-tekst',
      initialValue: 'Følg oss på Instagram'
    },
    {
      name: 'displayStyle',
      type: 'select',
      title: 'Layout-stil',
      options: {
        items: [
          { label: 'Horisontal', value: 'horizontal' },
          { label: 'Vertikal', value: 'vertical' },
          { label: 'Kompakt', value: 'compact' }
        ]
      },
      initialValue: 'horizontal'
    },
    {
      name: 'showFollowerCount',
      type: 'boolean',
      title: 'Vis antall følgere',
      initialValue: true
    },
    {
      name: 'showProfilePicture',
      type: 'boolean',
      title: 'Vis profilbilde',
      initialValue: true
    },
    {
      name: 'backgroundColor',
      type: 'string',
      title: 'Bakgrunnsfarge',
      initialValue: '#FFFFFF'
    },
    {
      name: 'buttonColor',
      type: 'string',
      title: 'Knapp-farge',
      initialValue: '#E4405F'
    },
    {
      name: 'buttonTextColor',
      type: 'string',
      title: 'Knapp-tekstfarge',
      initialValue: '#FFFFFF'
    },
    {
      name: 'textColor',
      type: 'string',
      title: 'Tekstfarge',
      initialValue: '#000000'
    },
    {
      name: 'borderRadius',
      type: 'number',
      title: 'Hjørne-radius (px)',
      initialValue: 12,
      options: {
        min: 0,
        max: 50
      }
    },
    {
      name: 'apiEndpoint',
      type: 'string',
      title: 'API Endpoint URL',
      description: 'Din Vercel API URL',
      initialValue: 'https://your-project.vercel.app/api/instagram'
    }
  ],
  editableCSS: [
    {
      selector: styles.widget,
      properties: ['background', 'padding', 'margin', 'border', 'box-shadow', 'border-radius']
    },
    {
      selector: styles.followButton,
      properties: ['font-size', 'font-weight', 'padding', 'border-radius', 'border', 'box-shadow']
    },
    {
      selector: styles.username,
      properties: ['font-size', 'font-weight', 'color', 'font-family']
    },
    {
      selector: styles.fullName,
      properties: ['font-size', 'color', 'font-family', 'font-weight']
    },
    {
      selector: styles.followers,
      properties: ['font-size', 'color', 'font-family', 'opacity']
    },
    {
      selector: styles.profilePic,
      properties: ['width', 'height', 'border-radius', 'border', 'box-shadow']
    },
    {
      selector: styles.content,
      properties: ['gap', 'align-items', 'justify-content']
    }
  ]
});

export default InstagramFollow;