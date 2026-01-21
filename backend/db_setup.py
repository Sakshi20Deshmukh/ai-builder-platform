import sqlite3

conn = sqlite3.connect("tools.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS tools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    domain TEXT,
    difficulty TEXT,
    description TEXT,
    UNIQUE(name, domain, difficulty)
)
""")

conn.commit()
conn.close()
