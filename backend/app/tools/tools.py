from typing import Dict, Any
from app.db.operations import insert_interaction, update_interaction, get_latest_interaction
from datetime import date


def log_interaction(state: Dict[str, Any]) -> Dict[str, Any]:
    print("🔧 Executing tool: log_interaction")
    data = state.get("extracted_data", {})

    # normalize date
    if data.get("date") == "today":
        data["date"] = str(date.today())

    # 🔥 SAVE TO DB
    new_id = insert_interaction(data)

    return {
        "action": "log_interaction",
        "data": {
            "id": new_id,
            "hcp_name": data.get("hcp_name"),
            "interaction_type": data.get("interaction_type"),
            "date": data.get("date"),
            "time": data.get("time"),
            "attendees": data.get("attendees", []),
            "topics": data.get("topics"),
            "materials_shared": data.get("materials_shared", []),
            "samples_distributed": data.get("samples_distributed", []),
            "sentiment": data.get("sentiment"),
            "outcomes": data.get("outcomes"),
            "follow_up_actions": data.get("follow_up_actions")
        },
        "message": "Logged new interaction successfully."
    }


def edit_interaction(state: Dict[str, Any]) -> Dict[str, Any]:
    print("🔧 Executing tool: edit_interaction")
    updates = state.get("extracted_data", {})
    
    # filter out empty strings if the LLM hallucinated them for an edit
    valid_updates = {k: v for k, v in updates.items() if v != "" and v != [] and v is not None}

    # 🔥 UPDATE DB
    updated_id = update_interaction(valid_updates)

    # Fetch the newly updated full record to send back to frontend
    full_record = get_latest_interaction()

    return {
        "action": "edit_interaction",
        "data": full_record or {},
        "message": "Updated interaction successfully."
    }


def clear_form(state: Dict[str, Any]) -> Dict[str, Any]:
    print("🔧 Executing tool: clear_form")
    return {
        "action": "clear_form",
        "data": {},
        "message": "Form cleared successfully."
    }


def add_attendee(state: Dict[str, Any]) -> Dict[str, Any]:
    print("🔧 Executing tool: add_attendee")
    data = state.get("extracted_data", {})
    existing = state.get("existing_data", {})

    attendees = existing.get("attendees", [])

    new_attendee = data.get("attendees")

    if isinstance(new_attendee, list):
        attendees.extend(new_attendee)
    elif isinstance(new_attendee, str):
        attendees.append(new_attendee)

    return {
        "action": "add_attendee",
        "data": {"attendees": attendees},
        "message": "Attendee added successfully."
    }


def summarize_notes(state: Dict[str, Any]) -> Dict[str, Any]:
    print("🔧 Executing tool: summarize_notes")
    data = state.get("extracted_data", {})
    topics = data.get("topics", "")

    summary = f"Summary: {topics}" if topics else "No notes available"

    return {
        "action": "summarize_notes",
        "data": {"summary": summary},
        "message": "Summarized notes successfully."
    }