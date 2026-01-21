def generate_components(analysis):
    print("✅ generate_components() called with:", analysis)

    components = []

    analysis_text = " ".join(
        str(v).lower() for v in analysis.values()
    )

    # ML / NLP component
    if "sentiment" in analysis_text or "nlp" in analysis_text:
        components.append({
            "component": "ML Model",
            "description": "Beginner-friendly sentiment analysis model",
            "code": """from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

texts = ["I love this", "I hate this"]
labels = [1, 0]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

model = LogisticRegression()
model.fit(X, labels)
"""
        })

    # Web components
    if "web" in analysis_text:
        components.append({
            "component": "Backend API",
            "description": "Flask backend for sentiment analysis",
            "code": """from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    return jsonify({'sentiment': 'positive'})

if __name__ == '__main__':
    app.run()
"""
        })

        components.append({
            "component": "Frontend UI",
            "description": "React UI for sentiment input",
            "code": """function App() {
  return (
    <div>
      <h1>Sentiment Analysis</h1>
      <textarea placeholder="Enter text..." />
    </div>
  );
}

export default App;
"""
        })

    return components
