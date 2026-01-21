import sqlite3

def recommend_tools(analysis):
    conn = sqlite3.connect("tools.db")
    cursor = conn.cursor()

    domain = analysis["domain"][0] if analysis["domain"] else "general"
    difficulty = analysis["difficulty"][0]

    cursor.execute("""
    SELECT DISTINCT name, category, description
    FROM tools
    WHERE (domain=? OR domain='general')
    AND difficulty=?
    """, (domain, difficulty))

    rows = cursor.fetchall()
    conn.close()

    tools = []
    seen = set()

    for r in rows:
        if r[0] not in seen:
            tools.append({
                "name": r[0],
                "category": r[1],
                "description": r[2]
            })
            seen.add(r[0])

    return tools
