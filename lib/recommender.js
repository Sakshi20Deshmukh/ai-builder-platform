// lib/recommender.js
import tools from "@/data/tools.json";

export function recommendTools(requirements) {
  const recommendations = [];

  requirements.forEach(req => {
    const tool = tools.find(t => t.category.toLowerCase() === req.toLowerCase());
    if (tool) {
      recommendations.push({
        requirement: req,
        tool: tool.name,
        url: tool.url,
        reason: tool.reason
      });
    }
  });

  return recommendations;
}