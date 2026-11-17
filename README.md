# Event Planner

Modern event planning app — create events, share invite links, and track RSVPs in one place.

## Features

- **Google sign-in** — one-click login with Google OAuth
- **Email/password auth** — traditional sign up and sign in
- **Event creation** — set title, description, location, date/time
- **Invite links** — shareable RSVP links (no account required for guests)
- **RSVP tracking** — see who's going, maybe, or not going
- **Dashboard** — manage all your events in one place
- **Modern UI** — responsive, dark mode support, violet theme

## Environment Variables

Copy `.env.example` to `.env` for local development and fill in the values:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon) |
| `NEON_AUTH_BASE_URL` | Your Neon Auth base URL |
| `NEON_AUTH_COOKIE_SECRET` | Long random secret for cookie signing |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL |
| `NEON_AUTH_GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `NEON_AUTH_GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the **Google Identity Services** API
4. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
5. Set application type to **Web application**
6. Add authorized redirect URIs:
   - `https://your-app.com/api/auth/sign-in/social/google/callback`
   - `http://localhost:3000/api/auth/sign-in/social/google/callback` (for local dev)
7. Copy the Client ID and Client Secret to your `.env` file

## Getting Started

```bash
# Install dependencies
npm install

# Set up the database
npm run db:push

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:studio` | Open Prisma Studio |

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the repository into [Vercel](https://vercel.com)
3. Add all environment variables under **Project Settings > Environment Variables**
4. Deploy

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Auth**: Neon Auth (Better Auth) with Google OAuth
- **Database**: PostgreSQL (Neon) with Prisma ORM
- **Styling**: Tailwind CSS v4 + custom design system
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Deployment**: Vercel-ready