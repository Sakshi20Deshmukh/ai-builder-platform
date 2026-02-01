import os
import json
import google.generativeai as genai


def generate_project(prompt: str):
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found")

        genai.configure(api_key=api_key)

        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction="""
You are an expert AI software architect.

STRICT RULES:
- Output ONLY raw JSON
- No markdown
- No explanations
- No greetings
- No text before or after JSON

The response MUST start with '{' and end with '}'.

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
        )

        response = model.generate_content(prompt)
        raw = response.text.strip()

        start = raw.index("{")
        end = raw.rindex("}") + 1
        json_text = raw[start:end]

        return json.loads(json_text)

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