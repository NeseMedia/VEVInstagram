# Meta Developer Setup Guide for Instagram Basic Display API

## ⚠️ VIKTIG: Instagram App ID vs Facebook App ID

**Problem:** "Invalid platform app" betyr at du bruker Facebook App ID istedenfor Instagram App ID.

## Steg-for-steg oppsett i Meta Developer Dashboard

### 1. Opprett Facebook App (hvis du ikke har en)
1. Gå til [developers.facebook.com/apps](https://developers.facebook.com/apps)
2. Klikk "Create App"
3. Velg "Consumer" som app type
4. Fyll inn app navn og kontakt e-post

### 2. Legg til Instagram Basic Display
1. I din app dashboard, gå til "Add Product"
2. Finn "Instagram Basic Display" og klikk "Set Up"
3. Klikk "Create New App" under Instagram Basic Display

### 3. Få riktig Instagram App ID (IKKE Facebook App ID!)
1. Gå til: **Products → Instagram Basic Display → Basic Display**
2. Her finner du:
   - **Instagram App ID** (dette er IKKE samme som Facebook App ID!)
   - **Instagram App Secret**
   - Mulighet til å generere "Client Token"

### 4. Konfigurer OAuth Redirect URIs
I samme seksjon (Instagram Basic Display → Basic Display):
1. Under "Valid OAuth Redirect URIs", legg til:
   ```
   https://vevinstagram-production.up.railway.app/auth/instagram/callback
   https://localhost:3000/auth/instagram/callback
   ```
2. Under "Deauthorize Callback URL":
   ```
   https://vevinstagram-production.up.railway.app/data-deletion
   ```
3. Under "Data Deletion Request URL":
   ```
   https://vevinstagram-production.up.railway.app/data-deletion
   ```

### 5. Legg til Instagram Test Users
1. Gå til: **Roles → Roles**
2. Scroll ned til "Instagram Testers"
3. Klikk "Add Instagram Testers"
4. Skriv inn Instagram-brukernavnet til test-kontoen
5. Test-brukeren må:
   - Gå til Instagram Settings → Apps and Websites
   - Godta tester-invitasjonen

### 6. App Mode
- Hold appen i "Development Mode" mens du tester
- Du trenger IKKE app review for testing med test users

## Hvordan finne riktig ID-er:

### Facebook App ID (IKKE bruk denne for Instagram API):
- Finnes på hovedsiden av app dashboard
- Format: 15-16 sifre (f.eks. 1234567890123456)
- URL: `https://developers.facebook.com/apps/YOUR_FACEBOOK_APP_ID`

### Instagram App ID (BRUK DENNE!):
- Finnes under: Products → Instagram Basic Display → Basic Display
- Format: Ofte lengre nummer
- Dette er en SEPARAT ID fra Facebook App ID

### Instagram App Secret:
- Samme sted som Instagram App ID
- Klikk "Show" for å se den
- ALDRI del denne offentlig!

## Environment Variables for Railway:

```bash
# RIKTIG - Bruk Instagram App ID (fra Instagram Basic Display)
INSTAGRAM_APP_ID=your_instagram_app_id_here

# Instagram App Secret
INSTAGRAM_APP_SECRET=your_instagram_app_secret_here

# Redirect URI
INSTAGRAM_REDIRECT_URI=https://vevinstagram-production.up.railway.app/auth/instagram/callback

# VALGFRITT - Facebook App ID (for analytics, ikke for API calls)
FACEBOOK_APP_ID=your_facebook_app_id_here
```

## Vanlige feil:

1. **"Invalid platform app"**
   - Du bruker Facebook App ID istedenfor Instagram App ID
   - Løsning: Gå til Instagram Basic Display settings og finn riktig ID

2. **"Redirect URI mismatch"**
   - OAuth Redirect URI matcher ikke eksakt
   - Løsning: Sjekk at URI er identisk (inkludert https:// og trailing slash)

3. **"User not authorized"**
   - Test user har ikke godtatt invitasjonen
   - Løsning: Test user må godta i Instagram settings

4. **"App not active"**
   - Appen er i feil modus
   - Løsning: Sjekk at appen er i Development mode for testing

## Test OAuth Flow:

1. Bruk test-siden: `https://vevinstagram-production.up.railway.app/test-meta-api`
2. Når du starter OAuth flow, bruk **Instagram App ID** (ikke Facebook App ID)
3. Logg inn med en Instagram test user (ikke din hovedkonto)
4. Godta permissions
5. Kopier authorization code
6. Bytt code for access token
7. Test API calls

## Permissions for Basic Display:
- `user_profile` - Automatisk inkludert
- `user_media` - Må legges til hvis du vil hente media

Disse er automatisk godkjent for test users i development mode.