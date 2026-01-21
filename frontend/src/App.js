import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendPrompt = async () => {
  if (!prompt.trim()) {
    setError("Please describe your project idea.");
    return;
  }

  setLoading(true);
  setError("");
  setResult(null);

  try {
    const res = await fetch(
      "https://ai-builder-platform-4.onrender.com/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      }
    );

    // Handle non-JSON or empty responses safely
    let data = null;
    const text = await res.text();

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error("Invalid JSON from backend");
    }

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    setResult(data);
  } catch (err) {
    console.error(err);
    setError("Backend not reachable. Please try again.");
  }

  setLoading(false);
};


  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1>🚀 AI Builder Platform</h1>

      {/* PROMPT INPUT */}
      <textarea
        rows="4"
        placeholder="Describe what you want to build..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      {/* GENERATE BUTTON */}
      <button
        onClick={sendPrompt}
        style={{ marginTop: "10px", padding: "8px 16px" }}
      >
        Generate
      </button>

      {/* ERROR DISPLAY */}
      {error && (
        <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
          ❌ {error}
        </p>
      )}

      {/* LOADING */}
      {loading && <p>⏳ Generating project plan...</p>}

      {/* RESULT DISPLAY */}
      {result && !loading && (
        <>
          <h2>🔍 Project Analysis</h2>
          <p>
            <strong>Type:</strong> {result.analysis.project_type.join(", ")}
          </p>
          <p>
            <strong>Domain:</strong> {result.analysis.domain.join(", ")}
          </p>
          <p>
            <strong>Difficulty:</strong> {result.analysis.difficulty.join(", ")}
          </p>

          <h2>🧰 Recommended Tools</h2>
          <ul>
            {result.recommended_tools.map((tool, i) => (
              <li key={i}>
                <strong>{tool.name}</strong> – {tool.description}
              </li>
            ))}
          </ul>

          <h2>🗺️ Roadmap</h2>
          <ol>
            {result.roadmap.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <h2>🧩 Generated Components</h2>
          {result.generated_components.map((comp, i) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <h4>{comp.component}</h4>
              <p>{comp.description}</p>
              <pre
                style={{
                  background: "#f4f4f4",
                  padding: "10px",
                  overflowX: "auto"
                }}
              >
                {comp.code}
              </pre>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
