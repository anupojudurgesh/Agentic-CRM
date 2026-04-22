from langgraph.graph import StateGraph, END
from app.agent.state import AgentState
from app.agent.llm import call_llm
from app.agent.prompt import build_prompt
from app.agent.parser import parse_llm_output

from app.tools.tools import (
    log_interaction,
    edit_interaction,
    clear_form,
    add_attendee,
    summarize_notes
)


# 🔹 STEP 1 — LLM Node
def llm_node(state: AgentState):
    prompt = build_prompt(state["user_input"])
    raw_output = call_llm(prompt)
    print("\n🔍 LLM OUTPUT:", raw_output)
    
    parsed = parse_llm_output(raw_output)

    return {
        "action": parsed.get("action"),
        "extracted_data": parsed.get("data", {}),
        "message": parsed.get("message"),
        "raw_llm_output": raw_output
    }


# 🔹 STEP 2 — Tool Router
def tool_router(state: AgentState):
    action = state.get("action")
    ai_message = state.get("message")

    print(f"➡️ Action detected: {action}")

    if not action or action == "unknown":
        return {
            "action": "unknown",
            "extracted_data": {},
            "message": ai_message or "I didn't quite catch that. Could you try again?"
        }

    print("🔧 Executing tool:", action)

    # Execute corresponding tool
    if action == "log_interaction":
        result = log_interaction(state)
    elif action == "edit_interaction":
        result = edit_interaction(state)
    elif action == "clear_form":
        result = clear_form(state)
    elif action == "add_attendee":
        result = add_attendee(state)
    elif action == "summarize_notes":
        result = summarize_notes(state)
    else:
        result = {
            "action": "unknown",
            "data": {},
            "message": "Unknown action"
        }

    # Fallback to tool's message only if AI didn't provide one
    final_message = ai_message if ai_message else result.get("message")

    return {
        "action": result.get("action"),
        "extracted_data": result.get("data", {}),
        "message": final_message
    }


# 🔹 STEP 3 — Build Graph
builder = StateGraph(AgentState)

builder.add_node("llm", llm_node)
builder.add_node("tool", tool_router)

builder.set_entry_point("llm")
builder.add_edge("llm", "tool")
builder.add_edge("tool", END)

app_graph = builder.compile()