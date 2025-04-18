# 📅 Event Management System (EMS)

A full-stack Event Management System built with **Next.js**, **NestJS**, and **PostgreSQL**. This system allows users to create, view, edit, and delete events, includes a basic event recommendation algorithm, and optionally shows events on a map using the Google Maps API.

---

## 🚀 Tech Stack

- **Frontend:** Next.js, React, TypeScript, Material UI
- **Backend:** NestJS (TypeScript), REST API
- **Database:** PostgreSQL (via Prisma)
- **Map Integration (optional):** @vis.gl/react-google-maps
- **State Management:** React Context
- **Styling:** Material UI

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone
cd ems-project

2. Frontend Setup
cd frontend
npm install

Create a .env.local file:

.env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_KEY=your_google_maps_api_key
NEXT_PUBLIC_GOOGLE_URL=https://maps.googleapis.com/maps/api/geocode/json?address=

Start the development server:
npm run dev

3. Backend Setup
cd backend
npm install
Create a .env file for NestJS:
env
DATABASE_URL=postgresql://user:password@localhost:5432/emsdb
Run migrations and start the server:
npx prisma migrate dev --name init
npm run start:dev

🧩 Features
🌐 Frontend (Next.js)
Event List Page

Displays events with sorting & filtering by date and category

Event Details Page

Shows full event info and similar recommended events

Create / Edit Event

Form with validation (title, date, location, etc.)

Delete Event

Confirmation prompt before deletion

Theme Toggle

Light/dark mode with persistent theme

Map View (Optional)

Interactive map with event markers and modal on click

🧪 Backend (NestJS)
RESTful API with endpoints:

GET /events

GET /events/:id

POST /events

PATCH /events/:id

DELETE /events/:id

Input validation (DTOs, pipes)

Error handling (filters, guards)

📊 Database Schema

Field	Type
id	UUID
title	String
description	String
date	Date
location	String
category	String
🎯 How Recommendations Work
A basic algorithm recommends similar events based on:

Same category

Close date range

Same or nearby location

Results are sorted by relevance using basic scoring.

✅ Evaluation Focus

Area	Goal
Code Quality	Clear, modular, well-commented
Functionality	Full CRUD + Recommendations + Map
UI/UX	Responsive, theme-able, clean with Material UI
Error Handling	Friendly messages, form validation, empty states
Documentation	Complete setup and architecture overview (this README 😉)
🧠 Optional Improvements
Authentication & Role-based access

Unit and integration tests (Jest)

Debounced filtering / infinite scroll

Event RSVP or booking logic

📍 Screenshots (Optional)
Include screenshots of:

Event list

Detail page

Map view

Theme toggle
