import fetch from "node-fetch";
/**
 * AI Scenario Generator
 * ---------------------
 * Input: raw user urge text
 * Output: JSON matching Cognitive Scenario Contract
 */



const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";



const HF_TOKEN = process.env.HF_API_TOKEN;

/**
 * Builds a strict prompt that mirrors our hardcoded logic
 */
function buildPrompt(urgeText) {
  return `
You are generating cognitive pause scenarios for a behavioral awareness app.

User urge:
"${urgeText}"

Task:
Generate EXACTLY 3 cognitive scenarios.

Each scenario must represent:
1. Immediate consequence of acting on the urge
2. Long-term pattern if the urge is repeated
3. Awareness of inner strength without recalling past events

For EACH scenario:
- Provide an id (snake_case)
- Provide a situation (ONE short sentence only)
- Provide EXACTLY 3 options

For EACH option:
- id (snake_case)
- text (very short, neutral, realistic)
- reflection (ONE short, grounded sentence)

Hard constraints (must follow exactly):
- Do NOT use first-person ("I", "I'm", "my")
- Do NOT describe scenes, places, or stories
- Do NOT recall past events or memories
- Do NOT describe emotions or mental health states
- Do NOT suggest coping strategies, breaks, or self-care
- Do NOT give advice or motivation
- Do NOT judge the user
- Avoid therapy, coaching, or self-help language
- Use neutral or imagined phrasing ("Imagine...", "Notice...")
- Keep situations abstract and impersonal
- Keep option text under ~8–10 words
- Keep reflections concise and observational
- No emojis
- No poetic metaphors
- No explanations outside JSON

Output:
Return ONLY valid JSON in this exact format:

{
  "scenarios": [
    {
      "id": "",
      "situation": "",
      "options": [
        { "id": "", "text": "", "reflection": "" },
        { "id": "", "text": "", "reflection": "" },
        { "id": "", "text": "", "reflection": "" }
      ]
    }
  ]
}
`;
}

/**
 * Calls Hugging Face Inference API
 */
async function callHuggingFace(prompt) {
  const HF_TOKEN = process.env.HF_API_TOKEN;

  if (!HF_TOKEN) {
    throw new Error("HF_API_TOKEN missing at runtime");
  }

  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        {
          role: "system",
          content:
            "You generate structured JSON only. No explanations. No markdown."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 900
    })
  });

  const data = await response.json();
  return data;
}


/**
 * Extracts JSON safely from model output
 */
function extractJSONFromChat(data) {
  try {
    const content = data?.choices?.[0]?.message?.content;
    if (!content) return null;

    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");
    if (start === -1 || end === -1) return null;

    return JSON.parse(content.slice(start, end + 1));
  } catch {
    return null;
  }
}


/**
 *  MAIN FUNCTION (USED BY SERVICE LAYER)
 */
export async function generateScenariosFromAI(urgeText) {
  const prompt = buildPrompt(urgeText);

  const raw = await callHuggingFace(prompt);

  console.log("🔍 HF RAW RESPONSE:", JSON.stringify(raw, null, 2));

  const parsed = extractJSONFromChat(raw);

  return parsed;
}

