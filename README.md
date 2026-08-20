# Fitness Pal 🏋️‍♂️

A simple full-stack fitness tracking web app. Users can enter their personal stats (name, age, weight, height) through a static frontend, which are saved via a FastAPI backend into a MySQL database.

## Features

- **User stats form** — collects first name, last name, age, weight, and height.
- **REST API backend** — built with FastAPI, exposing full CRUD (Create, Read, Update, Delete) endpoints for user records.
- **MySQL storage** — user data persisted in a `fitness_db` database.
- **Static multi-page frontend** — plain HTML/CSS/JS pages (landing page, dashboard, and a secondary page).
- **Dockerized frontend** — the static site is containerized with Nginx for easy deployment.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Python, FastAPI, Pydantic |
| Database | MySQL (`mysql-connector-python`) |
| Containerization | Docker (Nginx-based image), Docker Compose |

## Project Structure

```
Fitness_web/
├── backend/
│   ├── main.py         # FastAPI app & CRUD endpoints for users
│   └── database.py     # MySQL connection helper
├── images/              # Static image assets
├── index.html            # Landing page
├── page2.html              # Secondary page
├── dashboard.html            # User stats entry form
├── dashboard.js                # Form submission logic (calls backend API)
├── script.js                    # Frontend script
├── style.css                     # Site-wide styling
├── about.css                      # About/landing page styling
├── Dockerfile                      # Nginx image for serving the static frontend
└── docker-compose.yml               # Compose config to run the frontend container
```

## Getting Started

### Prerequisites

- Python 3.x
- MySQL server
- Docker (optional, for containerized frontend)

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install fastapi uvicorn pydantic mysql-connector-python
   ```

3. Set up a MySQL database named `fitness_db` with a `users` table containing columns: `id`, `first_name`, `last_name`, `age`, `weight`, `height`.

4. Update the database credentials in `database.py` to match your MySQL setup (currently hardcoded — consider moving these to environment variables).

5. Run the API server:
   ```bash
   uvicorn main:app --reload
   ```

   The API will be available at `http://127.0.0.1:8000`.

### Frontend Setup

**Option 1 — Open directly:**
Open `index.html` in your browser. Make sure the backend is running, since `dashboard.js` calls `http://127.0.0.1:8000/users`.

**Option 2 — Run via Docker:**
```bash
docker compose up --build
```
The site will be served at `http://localhost:8080`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check — confirms the API is running |
| `GET` | `/users` | Retrieves all user records |
| `POST` | `/users` | Creates a new user record |
| `PUT` | `/users/{user_id}` | Updates an existing user record |
| `DELETE` | `/users/{user_id}` | Deletes a user record |

## Author

**Andre Nathaniel Barbasa**
- Portfolio: [andrenathanielbarbasa.github.io/andre-portfolio](https://andrenathanielbarbasa.github.io/andre-portfolio/)
- GitHub: [@AndreNathanielBarbasa](https://github.com/AndreNathanielBarbasa)
- LinkedIn: [andrenathanielbarbasa](https://linkedin.com/in/andrenathanielbarbasa)
- Email: dreisbetter@gmail.com
