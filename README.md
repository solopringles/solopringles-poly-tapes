# PolyLeviathan Trade Feed - Frontend (Phase 2)

 <!-- Optional: Add a screenshot of your app here -->

This is the frontend application for the PolyLeviathan project, designed to display a live feed of interesting trades from the Polymarket prediction market platform.

**🚀 Live Site: [https://polyleviathan.com/](https://polyleviathan.com/)**

---

## 🏛️ Architecture Overview

This project marks the successful completion of **Phase 2**. It follows a modern, decoupled, full-stack architecture.

*   **Frontend (The Storefront):** A [Next.js](https://nextjs.org/) application hosted on **[Vercel](https://vercel.com/)**. It is responsible for rendering the user interface and is automatically deployed to a global CDN for high performance.
*   **Backend (The Warehouse & API):** A separate ecosystem running on an **Oracle Cloud Infrastructure (OCI) VM**. It consists of two parts:
    1.  **The Python Bot:** The original bot that monitors the blockchain, fetches trades, and saves them to a database.
    2.  **The Node.js API:** A small, efficient [Express.js](https://expressjs.com/) server that reads directly from the live database and serves the data to the frontend when requested.

The data flow is simple and robust:
`User` → `Vercel Frontend` → `OCI API Server` → `Live SQLite Database` ← `Python Bot`

This architecture ensures the frontend is fast and scalable, while the backend is a reliable, cost-effective workhorse. It completely separates concerns and prevents the public-facing website from ever directly interacting with the Polymarket APIs.

## 🛠️ Tech Stack

*   **Frontend:** [Next.js](https://nextjs.org/) (React Framework)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Frontend Hosting:** [Vercel](https://vercel.com/)
*   **Backend API:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
*   **Backend Hosting:** Oracle Cloud Infrastructure (OCI)
*   **Database:** SQLite

## 📁 Project Structure Explained

This repository contains the frontend code for the `poly-tape` website.

*   **`src/app/page.tsx`**: The main homepage component. This file contains the primary layout and server-side logic to fetch the initial list of trades from our live OCI API when a user first visits the site.

*   **`src/components/TradeCard.tsx`**: A reusable React component that represents a single trade in the feed. It takes trade data as a prop and is responsible for all the styling and formatting of that individual card.

*   **`src/types/index.ts`**: Our central TypeScript definition file. It defines the "shape" of a `Trade` object, ensuring data consistency throughout the application and preventing common bugs.

*   **`.gitignore`**: A crucial configuration file for Git. It tells Git which files and folders to **ignore**. Most importantly, it is configured to **ignore the local `db/` folder**, preventing the large database file from ever being committed to the repository. This was key to solving our deployment issues.

*   **`package.json`**: The "recipe" for our project. It lists all the Node.js dependencies (like Next.js, React, Tailwind) and defines the scripts needed to run (`npm run dev`) and build (`npm run build`) the application.

*   **`public/`**: A folder for static assets like images, fonts, or icons that are served directly.

*   **`vercel.json`** (Optional, if needed): A configuration file for Vercel-specific settings, like redirects or headers.

## 💻 Running Locally

To run this project on your local machine for development:

1.  **Prerequisites:** Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and [Git](https://git-scm.com/) installed.

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/solopringles/poly-tape.git
    cd poly-tape
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up Environment Variable:** The application needs to know where to find the live API. Create a new file in the root of the project named `.env.local`.
    ```
    # .env.local
    NEXT_PUBLIC_API_URL=http://79.72.73.73:3001
    ```
    *(This file is automatically ignored by Git, so your secrets are safe.)*

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running with live data from the OCI server.

## 🚀 Deployment

This project is configured for **Continuous Deployment** with Vercel. The deployment process is fully automated:

1.  Make code changes locally.
2.  Commit and push the changes to the `main` branch on GitHub.
    ```bash
    git add .
    git commit -m "Describe your changes"
    git push
    ```
3.  Vercel automatically detects the push, builds the project, and deploys the new version to production at `polyleviathan.com`. No manual steps are required.

## 🔮 Phase 3 and Beyond

With the successful deployment of Phase 2, the foundation is set for future enhancements:

*   **Whale Profile Pages:** Create dedicated pages to view the trade history of a single wallet.
*   **Live Updates with WebSockets:** Upgrade from polling to a real-time WebSocket connection for instant trade updates.
*   **Advanced Filtering & Analytics:** Add UI controls to filter trades by market, size, or category, and display basic stats.
*   **Leaderboards:** Track top traders by volume or PnL.