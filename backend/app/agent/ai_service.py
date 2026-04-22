from app.agent.graph import app_graph
from typing import Dict, Any

def process_user_input(user_input: str) -> Dict[str, Any]:
    initial_state = {
        "user_input": user_input,
        "extracted_data": {},
        "action": "",
        "response": {},
        "message": "",
        "raw_llm_output": ""
    }

    final_state = app_graph.invoke(initial_state)

    print(f"🤖 RAW LLM OUTPUT IN AI_SERVICE:\n{final_state.get('raw_llm_output')}")

    return {
        "action": final_state.get("action", "unknown"),
        "data": final_state.get("extracted_data", {}),  # ✅ correct
        "message": final_state.get("message") or "Action executed successfully"
    }