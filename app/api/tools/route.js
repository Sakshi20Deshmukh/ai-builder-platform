import tools from "../../../data/tools.json";

export async function GET() {
  return new Response(JSON.stringify(tools), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}