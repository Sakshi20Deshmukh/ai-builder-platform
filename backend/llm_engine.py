import os
import json
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction="""
You are an expert AI software architect.

You MUST return ONLY valid JSON.
No explanations. No markdown. No extra text.

Return exactly this structure:
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

def generate_project(prompt):
    response = MODEL.generate_content(prompt)
    text = response.text.strip()
    return json.loads(text)
