import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("AIBuilderPlatformKey"))

def generate_project(prompt: str):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are an expert software architect. Return tools, roadmap, and components."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3
    )

    return response.choices[0].message.content
