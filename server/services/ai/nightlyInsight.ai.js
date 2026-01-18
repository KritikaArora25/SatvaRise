import fetch from "node-fetch";

const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";

export async function generateNightlyInsight(summary) {
  try {
    const HF_TOKEN = process.env.HF_API_TOKEN;

    if (!HF_TOKEN) {
      return fallbackInsight(summary);
    }

    // Build prompt (SatvaRise tone)
    const prompt = `
You are generating a nightly reflection for a behavioral awareness app.

Today’s summary:
- Total urges: ${summary.total}
- Won: ${summary.won}
- Indulged: ${summary.indulged}
${summary.peakHour !== null ? `- Peak difficulty hour: ${summary.peakHour}:00` : ""}

Task:
Generate ONE calm, non-judgmental insight to gently guide tomorrow.

Rules:
- One or two sentences only
- No motivation or praise
- No guilt or shame
- No advice overload
- No therapy or coaching language
- Use observational tone
- Avoid first-person language
- No emojis
`;

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
              "You return a short reflective insight only. No explanations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 120
      })
    });

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      return fallbackInsight(summary);
    }

    return content.trim();

  } catch {
    return fallbackInsight(summary);
  }
}

// 🔒 Safe fallback (always valid)
function fallbackInsight(summary) {
  if (summary.total === 0) {
    return "No pauses were recorded today. Awareness begins when noticing starts.";
  }

  if (summary.indulged > summary.won) {
    return "Some moments carried more weight today. Awareness before those windows may soften tomorrow.";
  }

  return "Moments of awareness appeared today. Quiet consistency may strengthen them further.";
}
