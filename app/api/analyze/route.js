import { analyzeProject } from "@/lib/analyzer";

export async function POST(req) {
  const body = await req.json();
  const result = analyzeProject(body.prompt);

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}