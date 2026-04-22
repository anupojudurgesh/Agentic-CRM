import asyncio
from app.agent.ai_service import process_user_input

def test():
    user_input = "Log interaction with Dr. Adam Smith today. Sentiment was positive. We discussed the new drug."
    try:
        result = process_user_input(user_input)
        print("SUCCESS:", result)
    except Exception as e:
        print("ERROR:", str(e))

if __name__ == "__main__":
    test()
