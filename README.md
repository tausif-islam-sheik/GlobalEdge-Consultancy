# GlobalEdge Consultancy — Study Abroad Portal

Frontend: Next.js 14 + TypeScript + Tailwind + shadcn/ui (Poppins).
Backend: NestJS + Prisma + PostgreSQL. Package manager: pnpm.

```
GlobalEdge Consultancy/
  frontend/   (Next.js app)
  backend/    (NestJS API + prisma/)
```

## Run locally

1. Postgres (local installed v18):
```powershell
$env:PGPASSWORD="postgres"
psql -U postgres -h localhost -c "CREATE DATABASE globaledge;"
Copy-Item backend\.env.example backend\.env
# edit DATABASE_URL if needed
```

2. Backend:
```powershell
cd backend
pnpm install
pnpm exec prisma generate
pnpm run db:push
pnpm run db:seed
pnpm run start:dev
```

3. Frontend (new terminal):
```powershell
cd frontend
pnpm install
pnpm dev
```
Open http://localhost:3000, API http://localhost:4000

Demo login: `admin@globaledge.com / admin123`, passport track demo: `A1234567`.
