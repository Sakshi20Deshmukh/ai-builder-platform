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

Return a SINGLE valid JSON object.
No markdown.
No explanations.
No text outside JSON.

If information is missing, infer reasonable values.

Required JSON format:
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
        )

        response = model.generate_content(prompt)
        raw = response.text.strip()

        print("RAW LLM OUTPUT:", raw)  # DEBUG (temporary)

        # safer JSON extraction
        start = raw.find("{")
        end = raw.rfind("}") + 1

        if start == -1 or end == -1:
            raise ValueError("No JSON found in LLM response")

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