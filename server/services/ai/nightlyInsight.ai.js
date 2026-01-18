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

Context:
This reflection is shown at night as a mirror of today only.

Task:
Generate ONE calm, observational insight that reflects today’s pattern only.

This insight should feel specific to today, not universal.

Rules:
- One or two short sentences only
- Do NOT motivate, encourage, or inspire
- Do NOT talk about growth, improvement, or opportunity
- Do NOT mention tomorrow or the future
- Do NOT give advice or suggestions
- Do NOT praise or shame
- Do NOT use therapy, coaching, or self-help language
- Avoid abstract philosophy or poetic wording
- Use a quiet, factual, reflective tone
- Refer implicitly to today’s behavior (counts, balance, timing)
- Avoid first-person language
- No emojis
- No explanations

Output:
Return ONLY the insight text. Nothing else.
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
