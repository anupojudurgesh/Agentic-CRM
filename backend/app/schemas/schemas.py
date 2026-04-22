from pydantic import BaseModel
from typing import Dict, Any, List, Optional

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    action: str
    data: Dict[str, Any]
    message: str

class InteractionResponse(BaseModel):
    id: int
    hcp_name: Optional[str] = None
    interaction_type: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    attendees: List[str] = []
    topics: Optional[str] = None
    materials_shared: List[str] = []
    samples_distributed: List[str] = []
    sentiment: Optional[str] = None
    outcomes: Optional[str] = None
    follow_up_actions: Optional[str] = None
    created_at: Optional[str] = None
class InteractionsListResponse(BaseModel):
    interactions: List[InteractionResponse]

class LatestInteractionResponse(BaseModel):
    interaction: Optional[InteractionResponse] = None