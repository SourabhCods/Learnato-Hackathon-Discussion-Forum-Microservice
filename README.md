# Learnato Discussion Forum — Microservice (MERN + Socket.io + Docker)

A real-time forum microservice for the Learnato ecosystem. Clean API, responsive UI, and Dockerized deployment.

## Features
- Create, list, view posts
- Replies, upvotes, mark answered
- Search (keyword), sort (top/new)
- Live updates via Socket.io
- Responsive Tailwind UI

## Tech
- **Frontend:** React + Vite + Tailwind
- **Backend:** Node.js, Express, Socket.io, Mongoose
- **DB:** MongoDB
- **Deploy:** Docker, works on Render/Vercel/Cloud Run

## Quickstart (Dev)
```bash
# API
cd server && npm i && cp ../.env.example .env && npm run dev
# Client
cd ../client && npm i && npm run dev
```
Visit http://localhost:5173

## Docker
```bash
docker compose up --build
```

## API
- POST /posts
- GET /posts?sort=(votes|date)&q=term
- GET /posts/:id
- POST /posts/:id/reply
- POST /posts/:id/upvote
- POST /posts/:id/mark-answered

## Env
See `.env.example`. In Docker, `MONGO_URI=mongodb://mongo:27017/learnato`.

## Deployment
- **API:** build image and push to Render/Cloud Run.
- **Client:** build static bundle and host on Vercel/Netlify; set `VITE_API_BASE` env.

## License
MIT
