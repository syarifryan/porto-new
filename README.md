# 🌌 Neo-Futuristic Personal Portfolio Website

A modern, highly interactive portfolio website with a sleek dark neo-futuristic design. Built to highlight a developer’s profile, projects, technical skills, work experience, certifications, and blog content, while also providing a secure and fully functional contact form for easy communication.

---

## 🚀 Key Features

- **Neo-Futuristic Visuals:** Custom liquid cursor, ambient grain overlay background, dynamic glowing cards, and digital glitch text animations.
- **Interactive Skills Showcase:** Tech stack grid featuring category filters and animated proficiency level bars.
- **Project Portfolio:** Filterable project categories with modular detail overlays, live-demo URLs, and source-code redirects.
- **Experience & Certifications:** Vertical chronological career timeline alongside a high-fidelity certificate previewer.
- **Integrated Blog Engine:** Static markdown-based blog loader allowing frictionless article additions without rebuild overhead.
- **Secure Contact Portal:** Validated feedback submission backed by a Node/Express API with Rate Limiting (anti-spam) and Nodemailer (Gmail SMTP).

---

## 🛠️ Tech Stack

### Frontend (Client)

- **Core:** [React 19](https://react.dev/) + [Vite](https://vite.dev/) (Ultra-fast Hot Module Replacement)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (Performant custom physics/spring animations) + CSS Keyframes
- **Routing:** [React Router v7](https://reactrouter.com/) (For dedicated blog article page states)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Markdown Engine:** [React Markdown](https://github.com/remarkjs/react-markdown) (Seamlessly renders articles from `.md` files)
- **Styling:** Vanilla CSS (No bloated CSS frameworks, written using custom properties for total styling control)

### Backend (Server)

- **Core:** [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/) (Lightweight serverless-compatible API layer)
- **Mailing:** [Nodemailer](https://nodemailer.com/) (Secure Gmail SMTP integration)
- **Security:**
  - `helmet`: Custom security headers
  - `express-rate-limit`: Prevents contact API abuse (capped at 5 requests/minute per client)
  - `cors`: Structured cross-origin resource sharing
  - `express-validator`: Rigorous input data sanitization and format verification

---

---

## ⚙️ Getting Started & Installation

Follow these steps to run both the frontend and backend locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+) and [npm](https://www.npmjs.com/) installed on your machine.

---

### 1. Set Up the Backend Server

1. Navigate to the backend directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Open the `.env` file and configure your Gmail details:
   - `GMAIL_USER`: Your Gmail address (e.g., `you@gmail.com`).
   - `GMAIL_APP_PASSWORD`: A 16-character Google App Password. [See instructions here to generate one.](https://support.google.com/accounts/answer/185833?hl=en)
   - `GMAIL_TO`: The email where you want to receive contact form submissions.

4. Start the backend development server (runs on `http://localhost:5000`):
   ```bash
   npm run dev
   ```

---

### 2. Set Up the Frontend Client

1. Open a new terminal window/tab and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend dev server (runs on `http://localhost:5173`):
   ```bash
   npm run dev
   ```
4. Access the web app in your browser at `http://localhost:5173`. Any API calls to `/api/` will be automatically proxied to the backend at port `5000`.

---
