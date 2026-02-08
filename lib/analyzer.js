export function analyzeProject(prompt) {
  const text = (prompt || "").toLowerCase();

  return {
    domain: "web",
    requirements: ["architecture", "ui", "backend", "database", "deployment"],
  };
}