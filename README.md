# Instagram Follow Widget for Vev

Widget for å vise Instagram-profiler i Vev med Railway API.

## Deploy til Railway

### Rask deploy via GitHub

1. Gå til [railway.app](https://railway.app)
2. Klikk "Start a New Project"
3. Velg "Deploy from GitHub repo"
4. Velg `NeseMedia/VEVInstagram` repository
5. Railway vil automatisk:
   - Installere dependencies
   - Starte serveren
   - Gi deg en URL

### Etter deploy

Når Railway er ferdig får du en URL som f.eks:
```
https://vev-instagram-production.up.railway.app
```

Oppdater `apiEndpoint` i Vev-komponenten til:
```
https://vev-instagram-production.up.railway.app/api/instagram
```

## API Endpoints

- `GET /` - Info-side
- `GET /api/instagram?username={brukernavn}` - Hent Instagram-data

## Testing lokalt

```bash
npm install
npm start
```

Besøk: `http://localhost:3000/api/instagram?username=cristiano`

## Teknologi

- Node.js med Express
- Deployed på Railway
- CORS aktivert for Vev-integrasjon