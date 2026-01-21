export async function startPause(userId, urgeType) {
  const res = await fetch("/api/pause/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, urgeType })
  });
  return res.json();
}

export async function respondPause(pauseSessionId, choice, stepIndex) {
  const res = await fetch("/api/pause/respond", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pauseSessionId, choice, stepIndex })
  });
  return res.json();
}

export async function decidePause(pauseSessionId, decision) {
  const res = await fetch("/api/pause/decide", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pauseSessionId, decision })
  });
  return res.json();
}
export async function getDailyAnalytics(userId) {
  const res = await fetch(`/api/analytics/daily?userId=${userId}`);
  return res.json();
}

