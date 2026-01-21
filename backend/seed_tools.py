import sqlite3

tools = [
    ("Scikit-learn", "ML", "general", "beginner", "Classical ML models"),
    ("TensorFlow", "ML", "general", "advanced", "Deep learning framework"),
    ("HuggingFace", "AI", "nlp", "beginner", "Pretrained NLP models"),
    ("OpenCV", "AI", "cv", "intermediate", "Computer vision tools"),
    ("Streamlit", "Web", "general", "beginner", "ML web apps quickly"),
]

conn = sqlite3.connect("tools.db")
cursor = conn.cursor()

cursor.executemany("""
INSERT INTO tools (name, category, domain, difficulty, description)
VALUES (?, ?, ?, ?, ?)
""", tools)

conn.commit()
conn.close()

print("Tools inserted successfully.")
