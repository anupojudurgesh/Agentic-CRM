import json

def parse_llm_output(output: str):
    try:
        if not output:
            raise ValueError("Empty output")
        return json.loads(output)
    except:
        return {
            "action": "unknown",
            "data": {},
            "message": "I'm sorry, I couldn't understand that. Could you please rephrase?"
        }