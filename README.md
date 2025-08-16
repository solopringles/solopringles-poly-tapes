\# 🐳 PolyLeviathan - Front-End



A modern, high-performance front-end for displaying, filtering, and analyzing markets from the Polymarket prediction platform.



\*\*🌐 Live Site:\*\* \[https://polyleviathan.com](https://polyleviathan.com)



---



\## 🏛️ Architecture Overview



PolyLeviathan is a modern, decoupled full-stack system optimized for scalability and performance.



\*   \*\*Frontend — The Storefront:\*\* Built with Next.js and Tailwind CSS. Hosted on Vercel for automatic global CDN deployment and optimized static/dynamic rendering.

\*   \*\*Backend — The Warehouse \& API:\*\* Hosted on an always-on Oracle Cloud Infrastructure (OCI) VM.

&nbsp;   \*   \*\*Python Bot:\*\* Monitors Polymarket APIs for all market data (metadata, rich summary data, tags, volume, etc.). Persists this combined data into a SQLite database.

&nbsp;   \*   \*\*Node.js API:\*\* A lightweight Express.js server that serves pre-processed, grouped, and paginated market data to the front-end as JSON.

\*   \*\*DNS \& Security — The Address:\*\* Managed by Cloudflare for routing, DNS resolution, and security for `polyleviathan.com`.



\### 🔄 Data Flow Diagram

`User → Cloudflare → Vercel Frontend → OCI API Server → SQLite Database ← Python Bot`



This decoupled design ensures the front-end never touches Polymarket APIs directly, which boosts speed, stability, and security.



---



\## 🛠️ Tech Stack



| Layer      | Technology                                |

| :--------- | :---------------------------------------- |

| \*\*Frontend\*\*   | Next.js (React) + Tailwind CSS            |

| \*\*Language\*\*   | TypeScript                                |

| \*\*Hosting\*\*    | Vercel (Frontend), OCI (Backend)          |

| \*\*Backend\*\*    | Node.js with Express.js                   |

| \*\*Database\*\*   | SQLite                                    |

| \*\*Security\*\*   | Cloudflare DNS + Routing                  |



---



\## 📁 Project Structure



This is a map of the key files and folders in the front-end repository.





/src

├── app/

│ ├── layout.tsx # The root layout, contains Sidebar, Footer, and AI instructions.

│ ├── page.tsx # The main homepage component. Manages all state for filtering and sorting.

│ ├── terms-of-service/

│ │ └── page.tsx # Static page for Terms of Service (file-based routing).

│ └── privacy-policy/

│ └── page.tsx # Static page for Privacy Policy.

│

├── components/

│ ├── EnhancedMarketTable.tsx # Renders the main table structure, including the INTERACTIVE HEADERS.

│ ├── MarketTableRow.tsx # Renders a SINGLE ROW in the table. Contains the critical URL generation logic.

│ ├── MainFilterBar.tsx # The top bar for filtering by category (Trending, New, Politics...).

│ ├── Sidebar.tsx # The main left-side navigation panel.

│ ├── Footer.tsx # The site-wide footer with legal links and disclaimers.

│ └── AIScraperInstructions.tsx # A visually hidden component for influencing AI web crawlers.

│

└── types/

└── index.ts # Defines the MarketSummary TypeScript interface used throughout the app.







---



\## 🧠 Core Architectural Lessons (Things to Know Before Editing)



This project's development revealed several critical architectural principles. Understanding these is essential for any future work.



\#### 1. The Architectural Trap of Client-Side Grouping



\*   \*\*The Problem:\*\* We initially tried to group markets (e.g., collapsing all "Fed Decision" markets into one row) on the front-end. This is fundamentally flawed because the front-end only ever has a \*\*partial dataset\*\* due to API pagination. It's impossible to reliably group items when you can't see all of them at once.

\*   \*\*The Lesson:\*\* Any data aggregation or processing that requires a \*\*complete dataset\*\* (grouping, global sorting, etc.) \*\*must\*\* be done on the backend. The backend has direct, fast access to the entire database. The front-end's job is to render the pre-processed data it receives, not to create it.



\#### 2. The Two "Shapes" of a Market



\*   \*\*The Problem:\*\* The UI needs to display two conceptually different things: a "Parent Event" (like "Presidential Election 2028") and a "Child Market" (like "Will Trump win the Nobel Prize?"). Our initial logic treated everything as the same, leading to broken URLs.

\*   \*\*The Lesson:\*\* The API must produce two distinct data "shapes" that the front-end can unambiguously interpret.

&nbsp;   1.  \*\*Summary Object:\*\* Represents a parent group. Its `slug` is the parent's slug, and its `parent\_event\_slug` is deliberately `null`.

&nbsp;   2.  \*\*Market Object:\*\* Represents a specific market. It has its own `slug` and may have a `parent\_event\_slug`.

&nbsp;   The URL generation logic in `MarketTableRow.tsx` \*\*must\*\* check for the presence and difference of these two slugs to build the correct link.



\#### 3. Defensive Front-End Rendering



\*   \*\*The Problem:\*\* The UI was showing blank spaces instead of images for some markets. This was caused by assuming that if `market.image\_url` existed, it was a valid, working link.

\*   \*\*The Lesson:\*\* Never trust the data. A front-end component must be "defensive" and handle bad data gracefully. The robust solution, implemented in `MarketTableRow.tsx`, involves a wrapper `div` that provides a consistent background and shape, combined with an `onError` handler on the `<Image>` component to catch broken links and revert to the fallback.



\#### 4. The Browser's Network Tab is the Ground Truth



\*   \*\*The Problem:\*\* Much of our debugging involved guessing why data wasn't appearing correctly.

\*   \*\*The Lesson:\*\* The fastest way to debug any front-end data issue is to look at the \*\*Network\*\* tab in your browser's Developer Tools. Inspecting the JSON response from your API tells you \*exactly\* what data the front-end has to work with. If the data is missing there, the problem is on the backend. If the data is present there but not on the screen, the problem is in your front-end components.



---



\## 💻 Running Locally



\#### Prerequisites

\*   Node.js (v20+ recommended)

\*   Git



\#### Steps

1\.  \*\*Clone the repo\*\*

&nbsp;   ```bash

&nbsp;   git clone https://github.com/your-username/poly-tape.git

&nbsp;   cd poly-tape

&nbsp;   ```

2\.  \*\*Install dependencies\*\*

&nbsp;   ```bash

&nbsp;   npm install

&nbsp;   ```

3\.  \*\*Set up environment variable\*\*

&nbsp;   Create a file named `.env.local` in the root of the project and add the following line:

&nbsp;   ```

&nbsp;   NEXT\_PUBLIC\_API\_URL=http://<YOUR\_API\_SERVER\_IP>:3001

&nbsp;   ```

4\.  \*\*Start the dev server\*\*

&nbsp;   ```bash

&nbsp;   npm run dev

&nbsp;   ```

&nbsp;   Then open \[http://localhost:3000](http://localhost:3000) to see it in action, pulling live data from your backend.



---



\## 🚀 Deployment



This project is set up for Continuous Deployment with Vercel.



\#### Workflow

1\.  Make changes locally.

2\.  Commit \& push to the `main` branch:

&nbsp;   ```bash

&nbsp;   git add .

&nbsp;   git commit -m "Your descriptive changes"

&nbsp;   git push origin main

&nbsp;   ```

3\.  Vercel automatically detects the push, builds the project, and deploys it to production at `polyleviathan.com`. No manual deployment steps are needed.



---



\## 🔮 Future Improvements



With a strong foundation laid, the next goals include:



\*   \*\*Refactor `utils`:\*\* Move helper functions (`formatVolume`, etc.) into a `src/utils` directory.

\*   \*\*Skeleton Loaders:\*\* Replace the "Loading..." text with a skeleton UI to improve perceived performance.

\*   \*\*Detailed Market View:\*\* Create a modal or dedicated page to display all child markets when a parent group is clicked.

\*   \*\*Search Debouncing:\*\* Prevent the search bar from firing an API call on every single keystroke.

\*   \*\*Automated Testing:\*\* Implement unit and end-to-end tests to prevent future regressions.

