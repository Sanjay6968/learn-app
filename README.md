# LearnHub – Mini Course Subscription App 
### Black Friday Edition

A full-stack course subscription application built with **React**, **Node.js + Express**, **MongoDB**, and **TailwindCSS**.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Seeding the Database](#seeding-the-database)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Demo Credentials](#demo-credentials)
- [Promo Code](#promo-code)
- [Deployment](#deployment)

---

##  Features

- **Authentication** — Signup / Login with JWT (stored in localStorage)
- **Course Listing** — Responsive grid with Free / Paid filter + category tags
- **Course Details** — Full info, promo-code validation, subscribe flow
- **My Courses** — All enrolled courses with price-paid, promo badge, date
- **Black Friday Promo** — Code `BFSALE25` gives 50 % off every paid course
- **Toast Notifications** — Success / Error / Info via a global portal
- **Loading Skeletons** — Smooth placeholder cards while data loads
- **Protected Routes** — Auth middleware on both backend & frontend
- **Responsive Design** — Mobile-first, hamburger nav, stacked layouts

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, React Router 6, TailwindCSS 3 |
| Backend    | Node.js, Express 4                  |
| Database   | MongoDB (via Mongoose)              |
| Auth       | JSON Web Tokens (jsonwebtoken)      |
| Passwords  | bcryptjs                            |
| HTTP Client| Axios                               |

---

##  Project Structure

```
course-app/
├── backend/
│   ├── src/
│   │   ├── app.js                  # Express entry point
│   │   ├── models/
│   │   │   ├── User.js             # Mongoose User schema
│   │   │   ├── Course.js           # Mongoose Course schema
│   │   │   └── Subscription.js     # Mongoose Subscription schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js       # POST /signup, /login, GET /me
│   │   │   ├── courseRoutes.js      # GET /courses, /courses/:id
│   │   │   └── subscriptionRoutes.js # POST /subscribe, /validate-promo, GET /my-courses
│   │   ├── middleware/
│   │   │   └── authMiddleware.js   # JWT verification
│   │   └── seed/
│   │       └── seedData.js         # Seeds users + courses
│   ├── package.json
│   ├── .env.example
│   └── .env                        # (created by you)
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js                  # Router + providers
    │   ├── index.js                # ReactDOM entry
    │   ├── index.css               # Tailwind directives + custom styles
    │   ├── context/
    │   │   └── AuthContext.js       # Global auth state
    │   ├── components/
    │   │   ├── Navbar.js           # Sticky nav with mobile menu
    │   │   ├── CourseCard.js       # Card used on Home
    │   │   ├── SkeletonCard.js     # Loading skeleton
    │   │   └── ProtectedRoute.js   # Auth guard wrapper
    │   ├── pages/
    │   │   ├── AuthPage.js         # Login + Signup
    │   │   ├── HomePage.js         # Course grid with hero
    │   │   ├── CourseDetailPage.js # Single course + subscribe
    │   │   └── MyCourses.js        # Enrolled courses
    │   └── utils/
    │       ├── api.js              # Axios instance + interceptors
    │       └── toast.js            # Global toast system
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## Setup & Installation

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9
- MongoDB running locally (or a cloud URI like MongoDB Atlas)

### 1. Clone the repository
```bash
git clone <repo-url>
cd course-app
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env          # then edit .env with your values
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
```

---

## Environment Variables

Create **`backend/.env`**:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/course_subscription_db
JWT_SECRET=replace_this_with_a_strong_secret
```

Create **`frontend/.env`** (optional – defaults to localhost):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

##  Seeding the Database

Populates 3 users and 7 courses:

```bash
cd backend
npm run seed
```

Output shows the created users and courses with their prices.

---

##  Running Locally

**Terminal 1 – Backend:**
```bash
cd backend
npm run dev          # uses nodemon for hot-reload
# Server starts at http://localhost:5000
```

**Terminal 2 – Frontend:**
```bash
cd frontend
npm start            # create-react-app dev server
# App opens at http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Route                            | Auth? | Description                      |
|--------|----------------------------------|-------|----------------------------------|
| POST   | `/api/auth/signup`               | No    | Create account, return JWT       |
| POST   | `/api/auth/login`                | No    | Login, return JWT                |
| GET    | `/api/auth/me`                   | Yes   | Return current user              |
| GET    | `/api/courses`                   | No    | List all courses                 |
| GET    | `/api/courses/:id`               | No    | Single course                    |
| POST   | `/api/subscriptions/subscribe`   | Yes   | Subscribe to a course            |
| POST   | `/api/subscriptions/validate-promo` | Yes | Validate a promo code         |
| GET    | `/api/subscriptions/my-courses`  | Yes   | All courses user is enrolled in  |

---

## 👤 Demo Credentials

After running `npm run seed`:

| Name          | Email               | Password    |
|---------------|---------------------|-------------|
| monu          | monu@gmail.com      | pass@4647   |
| sanjay        | sanjay@gmail.com     | pass@777    |
| manij         | manij@gmail.com     | pass@7878   |

These are also shown directly in the login page UI.

---

##  Promo Code

| Code       | Discount | Applies to   |
|------------|----------|--------------|
| BFSALE25   | 50 %     | All paid courses |

Enter the code on any paid course's detail page → click **Apply** → then **Subscribe**.

---

## ☁️ Deployment

### Backend – Render / Railway / Vercel (serverless)
1. Push `backend/` to GitHub.
2. Set environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`).
3. Build command: `npm install`
4. Start command: `node src/app.js`

### Frontend – Vercel / Netlify
1. Push `frontend/` to GitHub.
2. Set `REACT_APP_API_URL` to your deployed backend URL.
3. Build command: `npm run build`
4. Publish directory: `build/`

### MongoDB – Atlas (free tier)
1. Create a free cluster on [atlas.mongodb.com](https://www.mongodb.com/cloud/atlas).
2. Copy the connection string into your backend `.env` as `MONGO_URI`.
3. Run `npm run seed` against the Atlas cluster before first use.

---

##  Notes
- **No real payments** are processed. The promo code simply calculates a mock discounted price.
- The compound index on `Subscription (userId + courseId)` prevents duplicate enrolments.
- The frontend intercepts 401 responses globally and redirects to `/login`.
