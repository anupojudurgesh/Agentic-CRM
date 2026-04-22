# Agentic-CRM

Agentic-CRM is an AI-powered Healthcare Professional (HCP) interaction platform. Designed to eliminate manual data entry for medical sales representatives, it leverages a sophisticated **LangGraph** agent to process natural language (or dictated voice notes) and automatically extract, map, and log structured data into a PostgreSQL database.

This repository features a decoupled architecture containing a **FastAPI** backend and a **React/Vite** frontend.

## 🚀 Key Features
- **Agentic Workflow:** Built with LangGraph, the AI acts autonomously—semantically routing user intent to log new meetings, edit past records, append attendees, or summarize voice notes.
- **Strict Data Extraction:** Uses few-shot prompting with the Groq API (Llama 3) to reliably extract 12+ data points (Sentiment, Time, Materials Shared, Samples, Outcomes) into rigid JSON schemas.
- **Two-Pane Workspace:** A sleek, enterprise-grade React dashboard featuring real-time state synchronization via Redux Toolkit.
- **Interaction History:** A slide-out drawer to view and load past interactions.

## 📁 Repository Structure
- `/backend`: FastAPI server, PostgreSQL (psycopg) database operations, LangGraph agent logic.
- `/frontend`: React (Vite), TypeScript, Tailwind CSS, Redux Toolkit state management.

## 🛠 Tech Stack
- **AI/Backend:** FastAPI, Python, LangGraph, Groq API (LLM)
- **Database:** PostgreSQL
- **Frontend:** React, TypeScript, Vite, Redux Toolkit, Tailwind CSS

## 🏃 Getting Started
For detailed setup instructions, please refer to the specific README files in the respective directories:
1. [Backend Setup & API Documentation](./backend/README.md)
2. [Frontend Setup & UI Documentation](./frontend/README.md)
