from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import os

from llm_engine import generate_project

# # ✅ Import fallback generators
# from prompt_parser import analyze_prompt
# from tool_recommender import recommend_tools
# from roadmap_generator import generate_roadmap
# from ai_generator import generate_components

app = Flask(__name__)
CORS(app)

# ---------------- HEALTH ----------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "Backend running successfully"}), 200

# ---------------- ANALYZE ----------------
@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    prompt = data.get("prompt", "").strip()

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    # Call LLM
    result = generate_project(prompt)

    # Return both raw and parsed
    return jsonify({
        "RAW_LLM_OUTPUT": result.get("raw_text"),
        "parsed_result": result.get("parsed")
    }), 200

# ---------------- RUN ----------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)














































# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import re
# import os
# from llm_engine import generate_project


# # Optional: your real generators
# from prompt_parser import analyze_prompt
# from tool_recommender import recommend_tools
# from roadmap_generator import generate_roadmap
# from ai_generator import generate_components

# app = Flask(__name__)
# CORS(app)

# @app.route("/health", methods=["GET"])
# def health():
#     return jsonify({"status": "ok"})

# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({"status": "Backend running successfully"}), 200


# @app.route("/analyze", methods=["POST"])
# def analyze():
#     try:
#         data = request.get_json()

#         if not data or "prompt" not in data:
#             return jsonify({"error": "Prompt is required"}), 400

#         prompt = data.get("prompt", "")

#         if not prompt:
#             return jsonify({"error": "Prompt cannot be empty"}), 400

#         if not re.search(r"[a-zA-Z]{2,}", prompt):
#             return jsonify({"error": "Please enter a meaningful project description"}), 400


#         if len(prompt.split()) < 3:
#             return jsonify({"error": "Prompt too short to understand"}), 400
        
#         print("PROMPT RECEIVED:", prompt)  # log prompt
#         result = generate_project(prompt)
#         print("RESULT GENERATED:", result)  # log result


#         # ---- SAFE EXECUTION BLOCK ----

#         # try:
#         #     analysis = analyze_prompt(prompt)
#         #     if not analysis:
#         #         analysis = {}
#         # except Exception as e:
#         #     print("ERROR analyze_prompt:", e)
#         #     analysis = {}

#         # try:
#         #     tools = recommend_tools(analysis)
#         #     if not tools:
#         #         tools = []
#         # except Exception as e:
#         #     print("ERROR recommend_tools:", e)
#         #     tools = []

#         # try:
#         #     roadmap = generate_roadmap(analysis)
#         #     if not roadmap:
#         #         roadmap = []
#         # except Exception as e:
#         #     print("ERROR generate_roadmap:", e)
#         #     roadmap = []

#         # try:
#         #     components = generate_components(analysis)
#         #     if not components:
#         #         components = []
#         # except Exception as e:
#         #     print("ERROR generate_components:", e)
#         #     components = []

#         # return jsonify({
#         #     "analysis": analysis,
#         #     "recommended_tools": tools,
#         #     "roadmap": roadmap,
#         #     "generated_components": components
#         # }), 200


#         # required_keys = {"analysis", "tools", "roadmap", "components"}
#         # if not isinstance(result, dict) or not required_keys.issubset(result.keys()):
#         #     return jsonify({"error": "AI response invalid"}), 500

#         return jsonify({"result": result})



#     except Exception as e:
#         # THIS WILL PRINT THE ACTUAL ERROR
#         import traceback
#         traceback.print_exc()
#         return jsonify({"error": str(e)}), 500
    
# # for cloud hosting.
# if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 5000))
#     app.run(host="0.0.0.0", port=port, debug=False)


