<div align="center">

# Ambrose Abaasa — Portfolio & Blog

A full-stack personal portfolio and technical blog API — async FastAPI + PostgreSQL on the backend, React + Vite + TypeScript on the frontend.

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-async-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Live Site](#) · [API Docs](#) · [Report a Bug](https://github.com/AmbroseTech/MY_BLOG/issues)

</div>

---

## About

This is my personal developer portfolio and blog, built from scratch as a real production-style full-stack app rather than a template. It serves my profile, skills, and blog content through a versioned REST API, with an async SQLAlchemy data layer backing a FastAPI service and a React/Vite frontend consuming it.

**Live Preview**
| | |
|---|---|
| Frontend | `[ deployed URL here]` |
| API Docs (Swagger) | `[ deployed URL here]/docs` |

## Tech Stack

**Backend**
- FastAPI (async)
- SQLAlchemy 2.0 (async ORM)
- PostgreSQL
- Pydantic Settings for environment-based config
- Uvicorn (ASGI server)

**Frontend**
- React 19
- Vite
- TypeScript

## Project Structure

```
MY_BLOG/
├── portfolio/
│   ├── backend/
│   │   ├── app/
│   │   │   ├── routes/        # API route modules (profile, skills, blog)
│   │   │   ├── config.py      # Environment/config settings
│   │   │   ├── database.py    # Async engine, session, and DB dependency
│   │   │   ├── main.py        # FastAPI app entrypoint
│   │   │   ├── models.py      # SQLAlchemy ORM models
│   │   │   └── schemas.py     # Pydantic response/request schemas
│   │   ├── requirements.txt
│   │   └── .env                # Local environment variables (not committed)
│   └── frontend/
│       ├── src/
│       ├── index.html
│       └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+

### 1. Clone the repository

```bash
git clone https://github.com/AmbroseTech/MY_BLOG.git
cd MY_BLOG
```

### 2. Backend setup

```bash
cd portfolio/backend
python -m venv venv

# Windows PowerShell
.\venv\Scripts\Activate.ps1
# macOS/Linux
# source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in `portfolio/backend/`:

```env
ENVIRONMENT=development
DATABASE_URL=postgresql+asyncpg://<user>:<password>@localhost:5432/<database>
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
```

Run the API:

```bash
uvicorn app.main:app --reload --port 8000
```

Database tables are created automatically on startup via SQLAlchemy's `create_all`. The API will be live at `http://localhost:8000`, with interactive docs at `http://localhost:8000/docs`.

### 3. Frontend setup

```bash
cd portfolio/frontend
npm install
npm run dev
```

The frontend will be live at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check for monitoring |
| `GET` | `/api/v1/profile` | Developer profile information |
| `GET` | `/api/v1/skills` | List of skills, ordered for display |
| `GET` | `/api/v1/blog` | Published blog posts with tags |

Full interactive documentation is available at `/docs` (Swagger UI) and `/redoc` (ReDoc).

## Roadmap

- [ ] Blog post detail view (single post by slug/ID)
- [ ] Admin/write access for creating blog posts
- [ ] Deployment (Docker + Render/Railway)
- [ ] CI/CD via GitHub Actions

## Author

**Ambrose Abaasa**
Full-Stack Software Engineering student, Victoria University Kampala

[GitHub](https://github.com/AmbroseAbaasa) · [X](https://x.com/AmbroseAbaasa)

## License

This project is open source and available under the [MIT License](LICENSE).