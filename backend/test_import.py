print("Starting import test")

import os
print("Files in directory:", os.listdir("."))

try:
    import ai_generator
    print("✅ ai_generator IMPORTED")
    print(dir(ai_generator))
except Exception as e:
    print("❌ ai_generator FAILED:", e)
