def mock_ai_response(user_input: str):
    user_input = user_input.lower()

    # very basic simulation logic
    if "met" in user_input and "dr" in user_input:
        return {
            "action": "log_interaction",
            "data": {
                "hcp_name": "Dr. Smith",
                "sentiment": "positive",
                "date": "2025-04-21",
                "attendees": [],
                "topics": "Product discussion"
            },
            "message": "Interaction logged successfully"
        }

    if "change" in user_input or "update" in user_input:
        return {
            "action": "edit_interaction",
            "data": {
                "sentiment": "negative"
            },
            "message": "Interaction updated"
        }

    return {
        "action": "unknown",
        "data": {},
        "message": "Could not understand request"
    }