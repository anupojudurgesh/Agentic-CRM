# Agentic-CRM Backend

This is the backend server for the Agentic-CRM application. It is built using **FastAPI** for high-performance REST APIs and integrates **LangGraph** with the **Groq LLM** to power the AI Assistant.

## 🚀 Key Features
- **FastAPI Endpoints:** Clean `/chat`, `/interactions`, and `/interactions/latest` routes handling robust JSON communication.
- **PostgreSQL Database:** Raw SQL queries via `psycopg` for highly optimized, customized database operations.
- **Agentic Workflow:** Utilizing LangGraph to map conversational AI input strictly into predefined PostgreSQL schemas.

## 🛠 Local Setup

1. **Create Virtual Environment & Install Dependencies**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   ```

2. **Environment Variables**
   Create a `.env` file in the `backend` directory and add:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

3. **Start the Server**
   ```bash
   python -m uvicorn app.main:app --reload
   ```
   The backend will run on `http://127.0.0.1:8000`. Swagger documentation is available at `http://127.0.0.1:8000/docs`.

---

## 🧠 LangGraph AI Agent & Tools Documentation
## Role of the LangGraph Agent in Managing HCP Interactions
The LangGraph agent serves as the intelligent orchestration layer between the user's natural language input and the rigid, structured data requirements of the CRM database. In a fast-paced sales environment, field representatives often lack the time to manually fill out complex, 10+ field forms after every Healthcare Professional (HCP) interaction. 

The LangGraph agent solves this by:
1. **Semantic Routing:** Understanding the *intent* of the user's message (e.g., logging a new meeting vs. editing an existing one vs. adding a forgotten attendee).
2. **Entity Extraction:** Using the LLM to pull unstructured text (e.g., "Met Dr. Smith at 2pm, gave him the OncoBoost brochure") and mapping it to strict database schemas (`hcp_name: "Dr. Smith"`, `time: "02:00 PM"`, `materials_shared: ["OncoBoost brochure"]`).
3. **State Management:** Maintaining the state of the conversation and the form, ensuring that data is correctly routed to the appropriate backend tool (database operations) before returning a human-friendly confirmation to the UI.

## Five Specific Tools Used by the Agent

### 1. Log Interaction
**Purpose:** Captures and stores new HCP interaction data into the database.
**How it works:** When a rep dictates or types a summary of their meeting, the LLM processes the unstructured text. It performs entity extraction to identify the HCP's name, the date/time of the interaction, materials shared, and specific discussion topics. It also performs sentiment analysis to categorize the interaction as Positive, Neutral, or Negative. The LangGraph agent then passes this perfectly structured JSON object to the `log_interaction` tool, which inserts the record into the PostgreSQL database and returns the new record ID.

### 2. Edit Interaction
**Purpose:** Allows modification of existing logged data via conversational commands.
**How it works:** If a rep says, "Actually, change the sentiment to neutral and add that we discussed pricing," the LLM identifies the intent to *update* rather than create. The agent extracts only the newly provided fields (`sentiment: "neutral"`, `topics: "pricing"`) and maps them to the `edit_interaction` tool. This tool fetches the latest interaction state, merges the new updates, and applies a SQL `UPDATE` command to the database without overwriting the unmodified fields.

### 3. Add Attendee
**Purpose:** Specifically appends new individuals to the attendees list of the current interaction.
**How it works:** If a rep forgets an attendee and says, "Oh, Dr. Sharma was also there," the LLM extracts "Dr. Sharma" as a person entity. The `add_attendee` tool retrieves the existing JSON array of attendees for the current interaction, appends the new name, and updates the record, preventing the rep from having to manually navigate the UI to find the input field.

### 4. Summarize Notes
**Purpose:** Condenses lengthy voice transcripts or long text dumps into actionable bullet points.
**How it works:** Sales reps often dictate long, rambling voice notes while driving between clinics. The `summarize_notes` tool takes a large block of unstructured text and uses the LLM to distill it into key topics and outcomes, stripping away filler words and formatting it perfectly for the CRM's `topics` and `outcomes` fields.

### 5. Clear Form
**Purpose:** Resets the current CRM state to prepare for a completely new interaction.
**How it works:** When a rep says, "Start over" or "Clear the form," the agent routes to the `clear_form` tool. This tool bypasses the database and simply emits a state-clearing payload back to the frontend Redux store, instantly wiping all fields in the UI.
