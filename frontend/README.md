# Agentic-CRM Frontend

This is the frontend client for the Agentic-CRM project. It is built using **React, Vite, and TypeScript**, offering a lightning-fast development experience and strict type safety.

The UI is designed to mimic enterprise-grade SaaS platforms, featuring a clean, responsive 2-pane layout consisting of a detailed CRM Form and an interactive AI Assistant Chat Panel.

## ✨ Key Features
- **Redux Toolkit State Management:** The entire CRM form state is managed globally. When the LangGraph AI backend extracts data, it seamlessly updates the Redux state, triggering instantaneous UI updates.
- **Tailwind CSS Styling:** Pixel-perfect, compact UI modeled after modern, high-density professional dashboards.
- **Interactive UI Components:**
  - **Slide-out History Drawer:** Fetch and select past interactions without losing context of your current workspace.
  - **Dynamic Form Inputs:** Add attendees and materials effortlessly using integrated event listeners and prompts.
  - **Animated Chat Interface:** Custom CSS animations for AI typing indicators and message bubbles.

## 🛠 Tech Stack
- React 18
- TypeScript
- Vite
- Redux Toolkit (`@reduxjs/toolkit`)
- Tailwind CSS v3
- Axios (for API communication)

## 🚀 Local Setup

1. **Install Dependencies**
   Navigate to the `frontend` directory and run:
   ```bash
   npm install
   ```

2. **Environment Configuration**
   By default, the app expects the backend to run on `http://127.0.0.1:8000`. If you deploy the backend or change the port, update the `axios` base URLs in `App.tsx` and `HistoryDrawer.tsx`.

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.
