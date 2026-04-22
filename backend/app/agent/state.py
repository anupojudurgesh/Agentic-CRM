from typing import TypedDict, Dict, Any


class AgentState(TypedDict):
    user_input: str
    extracted_data: Dict[str, Any]
    action: str
    response: Dict[str, Any]
    message: str
    raw_llm_output: str