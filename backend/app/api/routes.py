from fastapi import APIRouter, HTTPException
from app.schemas.schemas import (
    ChatRequest, 
    ChatResponse, 
    InteractionsListResponse, 
    LatestInteractionResponse
)
from app.agent.ai_service import process_user_input
from app.db.operations import (
    get_all_interactions, 
    get_latest_interaction, 
    delete_all_interactions, 
    check_db_connection
)
import logging

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        result = process_user_input(request.message)

        return ChatResponse(
            action=result.get("action", "unknown"),
            data=result.get("data", {}),
            message=result.get("message", "Processed by AI")
        )
    except Exception as e:
        logging.error(f"Error processing chat: {e}")
        return ChatResponse(
            action="error",
            data={},
            message="An unexpected error occurred while processing your request."
        )

@router.get("/interactions", response_model=InteractionsListResponse)
def get_interactions():
    try:
        interactions = get_all_interactions()
        return {"interactions": interactions}
    except Exception as e:
        logging.error(f"Error fetching interactions: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/interactions/latest", response_model=LatestInteractionResponse)
def get_latest():
    try:
        interaction = get_latest_interaction()
        return {"interaction": interaction}
    except Exception as e:
        logging.error(f"Error fetching latest interaction: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.delete("/interactions")
def delete_interactions():
    try:
        delete_all_interactions()
        return {"message": "All interactions deleted successfully."}
    except Exception as e:
        logging.error(f"Error deleting interactions: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/health/full")
def health_full():
    is_db_connected = check_db_connection()
    if is_db_connected:
        return {"status": "success", "message": "System is fully operational, DB connection successful"}
    else:
        raise HTTPException(status_code=503, detail="Database connection failed")