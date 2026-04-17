Commodity Prices Buddy - Chrome Extension (MV3)
A high-performance Chrome Extension dashboard providing real-time telemetry for global fuel prices, commodities, and FX rates. Built with a focus on Message Loop integrity and clean architectural separation.

🏗 Architecture & Design Patterns
This project implements a Distributed Message Bus architecture typical of robust Chrome Extensions:

Kernel (Service Worker): Acts as the central I/O hub. Handles asynchronous fetch operations to the OilPriceAPI and manages the long-lived message channel using the sendResponse (Async Return True) pattern.

UI Layer (React + Vite): A decoupled React 18 application that serves as the telemetry dashboard. It utilizes CSS Grid for a 2-column layout and Chart.js for data visualization.

Context Switching: Designed to handle the ephemeral nature of Manifest V3 service workers, ensuring state persistence and reliable IPC (Inter-Process Communication) between the background script and the popup UI.

🛠 Tech Stack
Engine: Node.js / Vite

Frontend: React 18 / TypeScript

Visualization: Chart.js (Native implementation with minimal wrappers)

Communication: Chrome Runtime Messaging (MV3)

Styling: Modern CSS (Grid/Flexbox) with a focus on Industrial UI aesthetics.

🚀 Key Features
Grouped Telemetry: Automated data-shaping that categorizes flat API responses into logical sectors (Energy vs. FX/Metals).

Real-time Visualization: Categorized Bar Charts with customized tooltips and legends for high-density information display.

Optimized Rendering: Uses React’s lifecycle to manage the message loop, ensuring the UI only updates when the "Kernel" broadcasts new data.

SVG-in-JS: Custom vector iconography for a lightweight, dependency-free UI.

📦 Installation & Development
Clone & Install:

Bash
git clone [your-repo-link]
cd commodity-prices-buddy
npm install
Build:

Bash
npm run build
Load in Chrome:

Navigate to chrome://extensions/

Enable Developer Mode.

Click Load unpacked and select the dist folder.

🧠 Senior Note
"The choice of Manifest V3 was driven by the need for a modern, secure service-worker based execution environment. By treating the background script as a stateless controller and the storage as a local cache, the extension achieves 100% reliability even during worker termination cycles."
