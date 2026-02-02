import os
import json
from google import genai

def generate_project(prompt: str):
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY missing")

        client = genai.Client(api_key=api_key)

        response = client.generations.create(
            model="gemini-1.5-flash",
            prompt=f"""
You are an expert AI software architect.

Return ONLY valid JSON in this exact format:
{{
  "analysis": {{"project_type": [], "domain": [], "difficulty": ""}},
  "tools": [],
  "roadmap": [],
  "components": []
}}

Generate the JSON for this project description:
"{prompt}"
"""
        )

        raw_text = response.output_text
        print("RAW LLM OUTPUT:", raw_text)

        # Safely extract JSON
        start = raw_text.find("{")
        end = raw_text.rfind("}") + 1
        parsed = json.loads(raw_text[start:end])

        # ✅ Return both parsed JSON and raw
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