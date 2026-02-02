import os
import json
from google import genai

def generate_project(prompt: str):
    """
    Generates project details using Gemini LLM.
    Returns both raw LLM output and parsed JSON.
    """
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY missing")

        client = genai.Client(api_key=api_key)

        # Build system instruction
        system_instruction = """
You are an expert AI software architect.

STRICT RULES:
- Output ONLY valid JSON
- No markdown, no explanations
- No greetings
- JSON must start with '{' and end with '}'

JSON format:
{
  "analysis": {
    "project_type": [],
    "domain": [],
    "difficulty": ""
  },
  "tools": [],
  "roadmap": [],
  "components": []
}
"""

        # Call Gemini
        response = client.generations.create(
            model="gemini-1.5-flash",
            prompt=f"{system_instruction}\nProject description: {prompt}"
        )

        raw_text = response.output_text
        print("RAW LLM OUTPUT:", raw_text)  # Optional local debug

        # Safely extract JSON
        start = raw_text.find("{")
        end = raw_text.rfind("}") + 1
        if start == -1 or end == -1:
            raise ValueError("No JSON object found in LLM output")

        parsed = json.loads(raw_text[start:end])

        return {"parsed": parsed, "raw_text": raw_text}

    except Exception as e:
        print("LLM ERROR:", str(e))
        return {
            "parsed": {
                "analysis": {"project_type": [], "domain": [], "difficulty": ""},
                "tools": [],
                "roadmap": [],
                "components": [f"LLM failed: {str(e)}"]
            },
            "raw_text": None
        }