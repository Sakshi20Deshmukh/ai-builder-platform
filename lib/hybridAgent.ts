export async function analyzePromptWithHybridAgent(prompt: string) {

try {

const response = await fetch("http://localhost:11434/api/generate", {

method: "POST",

headers: {

"Content-Type": "application/json"

},

body: JSON.stringify({

model: "phi3",

prompt: `
You are an AI system.

Analyze this project idea:

"${prompt}"

Return ONLY JSON in this format:

{
"valid": true,
"domain": "web | mobile | ai | data",
"requirements": ["frontend","backend","database","deployment"],
"techStack": ["example"]
}

DO NOT WRITE ANYTHING ELSE.
`,

stream: false

})

})

const data = await response.json()

const text = data.response

const jsonStart = text.indexOf("{")
const jsonEnd = text.lastIndexOf("}") + 1

const jsonString = text.slice(jsonStart, jsonEnd)

return JSON.parse(jsonString)

}

catch(error){

return {

valid: true,

domain: "web",

requirements: ["frontend","backend","database","deployment"],

techStack: []

}

}

}
