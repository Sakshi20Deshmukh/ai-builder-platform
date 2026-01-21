PROJECT_TYPES = {
    "web": ["website", "web app", "frontend", "backend"],
    "ml": ["machine learning", "ml", "model", "prediction"],
    "ai": ["ai", "artificial intelligence", "llm"],
    "app": ["mobile app", "android", "ios"]
}

DOMAINS = {
    "nlp": ["sentiment", "text", "nlp", "chatbot"],
    "cv": ["image", "face", "object detection"],
    "timeseries": ["stock", "gold price", "forecast"]
}

DIFFICULTY = {
    "beginner": ["beginner", "basic", "simple"],
    "intermediate": ["intermediate", "medium"],
    "advanced": ["advanced", "complex"]
}


def detect_from_prompt(prompt, mapping):
    found = []
    for key, keywords in mapping.items():
        for word in keywords:
            if word in prompt:
                found.append(key)
                break
    return found


def analyze_prompt(prompt):
    prompt = prompt.lower()

    project_types = detect_from_prompt(prompt, PROJECT_TYPES)
    domains = detect_from_prompt(prompt, DOMAINS)
    difficulty = detect_from_prompt(prompt, DIFFICULTY)

    # 🔥 IMPLICIT ML DETECTION
    if any(d in ["nlp", "cv", "timeseries"] for d in domains):
        if "ml" not in project_types:
            project_types.append("ml")

    if not difficulty:
        difficulty = ["beginner"]

    return {
        "project_type": project_types,
        "domain": domains,
        "difficulty": difficulty
    }
