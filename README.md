Here’s a cleaned-up, professional, and visually readable layout for your documentation. I've used clear headings, bullet points, emojis sparingly for highlights, and consistent formatting:

---

# 🐳 PolyLeviathan Trade Feed — Frontend (Phase 2)

A modern, high-performance frontend for displaying live trades from the **Polymarket** prediction platform.

🌐 **Live Site:** [https://polyleviathan.com](https://polyleviathan.com)

---

## 🏛️ Architecture Overview

Phase 2 marks the completion of a **modern, decoupled full-stack system** optimized for scalability and performance.

### 🔹 Frontend — *The Storefront*

* Built with **Next.js** and **Tailwind CSS**
* Hosted on **Vercel** for automatic global CDN deployment

### 🔹 Backend — *The Warehouse & API*

Hosted on an always-on **Oracle Cloud Infrastructure (OCI)** VM:

* **Python Bot:**

  * Monitors Polymarket blockchain
  * Stores trades in a **7-day rolling SQLite database**
* **Node.js API:**

  * Lightweight **Express.js server**
  * Serves live trade data to frontend as JSON

### 🔹 DNS & Security — *The Address*

* Managed by **Cloudflare**
* Handles routing, DNS resolution, and security for `polyleviathan.com`

### 🔄 Data Flow Diagram

```
User → Cloudflare → Vercel Frontend → OCI API Server → SQLite Database ← Python Bot
```

This decoupled design ensures the frontend never touches Polymarket APIs directly — boosting speed, stability, and security.

---

## 🛠️ Tech Stack

| Layer        | Technology                       |
| ------------ | -------------------------------- |
| **Frontend** | Next.js (React) + Tailwind CSS   |
| **Language** | TypeScript                       |
| **Hosting**  | Vercel (Frontend), OCI (Backend) |
| **Backend**  | Node.js with Express.js          |
| **Database** | SQLite (7-day rolling)           |
| **Security** | Cloudflare DNS + Routing         |

---

## 📁 Project Structure

Here's a breakdown of the key files and folders in the frontend repo:

* `src/app/page.tsx`

  * Main homepage component with server-side logic to fetch trades

* `src/app/api/trades/route.ts`

  * Next.js API route (local development only)

* `src/components/TradeCard.tsx`

  * Reusable UI component for rendering individual trades

* `src/types/index.ts`

  * Central TypeScript definitions to ensure consistent trade structure

* `.gitignore`

  * Excludes local DB files and large datasets (avoids GitHub deploy issues)

* `.env.local`

  * Stores sensitive API URL for development (Git-ignored)

* `package.json`

  * Lists dependencies and dev scripts (`dev`, `build`, etc.)

---

## 💻 Running Locally

### 🧰 Prerequisites

* Node.js (v20+ recommended)
* Git installed

### 🧾 Steps

```bash
# 1. Clone the repo
git clone https://github.com/solopringles/poly-tape.git
cd poly-tape

# 2. Install dependencies
npm install

# 3. Set up environment variable
echo "NEXT_PUBLIC_API_URL=http://79.72.73.73:3001" > .env.local

# 4. Start the dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to see it in action — pulling live data from the OCI backend.

---

## 🚀 Deployment

This project is set up for **Continuous Deployment with Vercel**.

### 🔄 Workflow

1. Make changes locally
2. Commit & push to `main`:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

3. Vercel auto-builds and deploys to production (`polyleviathan.com`)

No manual deploy steps needed.

---

## 🔮 Phase 3 and Beyond

With a strong foundation laid, the next goals include:

* **📄 Whale Profile Pages**
  View trade history and behavior per wallet

* **🔁 Real-Time WebSockets**
  Replace polling with instant trade updates

* **📊 Advanced Filtering & Stats**
  Filter by market, trade size, category + view analytics

* **🏆 Leaderboards**
  Rank top traders by volume or win rate

---

