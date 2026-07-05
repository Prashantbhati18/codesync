# CodeSync – Coding Contest Reminder & Tracker

A full-stack platform that aggregates coding contests from LeetCode, Codeforces, CodeChef, AtCoder, GeeksforGeeks, and HackerRank into one place — with filtering, bookmarking, automated email reminders, participation tracking, and an analytics dashboard.

## Problem Statement
Competitive programmers juggle multiple platforms and often miss contests because there's no single place to track them all. CodeSync centralizes contest discovery, reminders, and personal performance history.

## Features
- Browse all upcoming/ongoing/past contests across 6 platforms
- Filter by platform, date, duration, or search term
- Bookmark contests for quick access
- Configurable email reminders (24h / 12h / 6h / 1h / 15min before)
- Participation tracker (rating change, rank, problems solved, notes)
- Analytics dashboard (Chart.js): success rate, platform breakdown, monthly trends
- FullCalendar view of all contests
- JWT authentication with role-based authorization (user/admin)
- Admin panel: manage users, platforms, force contest sync, view logs

## Tech Stack
**Frontend:** React, React Router, Axios, Tailwind CSS, React Hook Form, FullCalendar, Chart.js
**Backend:** Node.js, Express.js, MySQL, JWT, bcrypt, node-cron, Nodemailer, express-validator
**Deployment:** Vercel (frontend) · Render (backend) · Railway (MySQL)

## Architecture
This project follows **MVC + Service Layer** architecture on the backend:

```
Request → Route → Middleware (auth/validation) → Controller → Service → Model → Database
                                                       ↓
                                                   Response
```

- **Routes** define endpoints only
- **Controllers** parse requests and shape responses (thin)
- **Services** hold all business logic
- **Models** are the only layer that talks to MySQL directly

## Project Structure
```
codesync/
├── backend/          # Express REST API
│   └── src/
│       ├── config/       # DB, env, mailer configuration
│       ├── controllers/  # Request handlers
│       ├── routes/       # Express routers
│       ├── middleware/   # Auth, validation, error handling
│       ├── services/     # Business logic
│       ├── models/       # MySQL data access
│       ├── validators/   # express-validator rules
│       ├── cron/         # Scheduled jobs (contest sync, reminders)
│       ├── utils/        # Helpers (JWT, async handler, logger)
│       └── database/     # Connection pool + schema.sql
│
└── frontend/         # React SPA
    └── src/
        ├── components/   # Reusable UI pieces
        ├── pages/        # Route-level views
        ├── layouts/      # Shared page shells
        ├── hooks/        # Custom hooks
        ├── context/      # Global auth state
        ├── services/     # Axios API calls
        └── utils/        # Formatting helpers
```

## Database Schema
See [`backend/src/database/schema.sql`](backend/src/database/schema.sql) for the full DDL. Core tables: `users`, `platforms`, `contests`, `bookmarks`, `reminder_settings`, `reminder_history`, `participation_history`, `notifications` — normalized to 3NF with foreign keys enforcing referential integrity.

## Installation

### Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in DB + JWT + SMTP values
mysql -u root -p codesync < src/database/schema.sql
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_BASE_URL
npm run dev
```

## Environment Variables
See `.env.example` in each of `backend/` and `frontend/` for the full list (DB credentials, JWT secrets, SMTP settings, API base URL).

## API Documentation
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in, receive JWT |
| POST | /api/auth/forgot-password | Request password reset email |
| GET | /api/contests | List/filter contests |
| GET | /api/contests/upcoming | Upcoming contests only |
| GET | /api/contests/platform/:id | Contests for one platform |
| POST | /api/bookmarks | Bookmark a contest |
| DELETE | /api/bookmarks/:id | Remove a bookmark |
| POST | /api/reminders | Set a reminder |
| GET | /api/dashboard | Analytics stats |

## Future Improvements
- Push notifications (web push) in addition to email
- Rating-change auto-sync from Codeforces/CodeChef APIs
- Team/group contest tracking
- Mobile app (React Native)

## License
MIT
