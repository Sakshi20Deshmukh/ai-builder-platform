from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import os

# Optional: your real generators
from prompt_parser import analyze_prompt
from tool_recommender import recommend_tools
from roadmap_generator import generate_roadmap
from ai_generator import generate_components

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "Backend running successfully"}), 200

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        prompt = data.get("prompt", "").strip()

        print("PROMPT RECEIVED >>>", repr(prompt))

        # 1️⃣ Empty check
        if not prompt:
            return jsonify({"error": "Prompt cannot be empty"}), 400

        # 2️⃣ Symbols-only / meaningless check
        if not re.search(r"[a-zA-Z]", prompt):
            return jsonify({"error": "Please enter a meaningful project description"}), 400

        # 3️⃣ Too short check (less than 3 words)
        if len(prompt.split()) < 3:
            return jsonify({"error": "Prompt too short to understand"}), 400

        # 4️⃣ SUCCESS — call your existing functions
        analysis = analyze_prompt(prompt)
        tools = recommend_tools(analysis)
        roadmap = generate_roadmap(analysis)
        components = generate_components(analysis)

        return jsonify({
            "analysis": analysis,
            "recommended_tools": tools,
            "roadmap": roadmap,
            "generated_components": components
        }), 200

    except Exception as e:
        print("BACKEND ERROR:", e)
        return jsonify({"error": "Backend not reachable"}), 500

# for cloud hosting.
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)


