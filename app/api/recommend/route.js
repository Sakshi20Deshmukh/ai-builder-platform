import tools from "@/data/tools.json";

export async function POST(req) {
  try {
    const { requirements } = await req.json();

    const recommendations = requirements.map(reqItem => {
      return tools.find(tool => tool.category.toLowerCase() === reqItem.toLowerCase());
    }).filter(Boolean); // remove nulls

    return new Response(JSON.stringify(recommendations), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}