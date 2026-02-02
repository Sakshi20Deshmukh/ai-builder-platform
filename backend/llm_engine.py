import os
import json
from google import genai

def generate_project(prompt: str):
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found")

        client = genai.Client(api_key=api_key)

        system_prompt = """
You are an expert AI software architect.

Return ONLY valid JSON.
No markdown.
No explanations.
No text outside JSON.

JSON format:
{
  "analysis": {
    "project_type": ["string"],
    "domain": ["string"],
    "difficulty": "string"
  },
  "tools": ["string"],
  "roadmap": ["string"],
  "components": ["string"]
}
"""

        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=[
                system_prompt,
                prompt
            ]
        )

        raw = response.text.strip()
        print("RAW LLM OUTPUT:", raw)  # TEMP DEBUG

        return json.loads(raw)

    except Exception as e:
        print("LLM ERROR:", str(e))
        return {
            "analysis": {
                "project_type": [],
                "domain": [],
                "difficulty": ""
            },
            "tools": [],
            "roadmap": [],
            "components": [
                "Unable to generate project. Please try a clearer prompt."
            ]
        }