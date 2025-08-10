# Instagram Follow Widget for Vev

Widget for å vise Instagram-profiler i Vev med Vercel API.

## Deploy til Vercel

### Steg 1: Installer Vercel CLI (om du ikke har det)
```bash
npm install -g vercel
```

### Steg 2: Deploy til Vercel
```bash
# I prosjektmappen, kjør:
vercel

# Følg instruksjonene:
# - Logg inn med din Vercel-konto
# - Velg "Y" for å deploye
# - Gi prosjektet et navn (f.eks. "vev-instagram-api")
# - Velg default settings
```

### Steg 3: Oppdater API URL i Vev
Etter deploy vil du få en URL som f.eks: `https://vev-instagram-api.vercel.app`

I Vev-komponenten, oppdater `apiEndpoint` til:
```
https://vev-instagram-api.vercel.app/api/instagram
```

## Hvordan det fungerer

1. **Vev-komponenten** (`src/InstagramFollow.jsx`) viser Instagram-widget i Vev
2. **Vercel API** (`api/instagram.js`) håndterer forespørsler om Instagram-data
3. API-et prøver å hente data fra Instagram, men returnerer fallback-data om nødvendig

## Testing lokalt
```bash
npm install
vercel dev
```

Besøk: `http://localhost:3000/api/instagram?username=cristiano`

## Produksjon
Etter deploy, bruk din Vercel URL i Vev-komponenten.