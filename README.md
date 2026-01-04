# 🌱 SatvaRise

SatvaRise is a pause-based AI reflection tool that helps people regain control during strong emotional urges such as anger, craving, restlessness, or the urge to react instantly.

Instead of asking users to type or explain their thoughts during an unstable moment, SatvaRise guides them through a **30-second pause using simple option-based questions**, followed by a calm, reflective response.

The goal is not to suppress emotions, but to help users **observe and choose instead of reacting automatically**.

---

## 🌿 Core Idea (One Line)

**SatvaRise helps you pause during strong emotions, reflect calmly for 30 seconds, and build self-control step by step.**

---

## 🧠 Why SatvaRise Is Different

During moments of urge, the mind is restless and unstable.  
If a person were calm enough to write long explanations, the urge would already be weakened.

SatvaRise is designed for **urge-state psychology**, not calm journaling.

That is why:
- The user does **not type**
- The user **only chooses**
- Reflection happens **before reaction**, not after regret

---

## ⚙️ How It Works — MVP v1 (Current Scope)

This section describes **only what is being built in the first version**.

1. A strong emotion or urge appears  
   (anger, craving, impulse to reply, restlessness, etc.)

2. The user opens SatvaRise and taps **“Begin Pause”**

3. The app presents **one reflective question** with **4–5 options**  
   (no typing, no explanation required)

4. The user selects the option that feels closest

5. SatvaRise responds with a **calm, reflective message**  
   (not motivational, not judgmental)

6. The pause ends  
   The user is free to act — but now with clarity instead of impulse

> MVP focus: **Fast interruption of impulse, not long conversation**

---

## 🧩 Why Option-Based Instead of Typing

- Urges reduce cognitive clarity  
- Typing requires calm and articulation  
- Choosing requires much less mental effort  

Option-based reflection:
- Works even when the mind is agitated
- Reduces resistance
- Prevents overthinking
- Keeps the pause within 30 seconds

This design allows SatvaRise to function **at the exact moment it is needed most**.

---

## 🧱 Project Structure

satvarise/<br>
├── client/ # Frontend (React)<br>
├── server/ # Backend (Node + Express + Hugging Face)<br>
├── .gitignore<br>
└── README.md<br>



---

## 👥 Team & Responsibilities

- **Frontend (React)** — Sommay  
  - Pause flow UI  
  - Option-based question display  
  - No typing input  
  - Minimal, calm interface  

- **Backend (Node + Express + Hugging Face)** — Kritika  
  - AI logic & prompts  
  - Dynamic question generation  
  - Reflection responses  
  - API design & control  

---

## 🔌 API Contract (MVP)

### Start Pause
POST /api/pause/start


Response:
```json
{
  "question": "Right now, this urge feels like…",
  "options": [
    "Restlessness in the body",
    "Escaping boredom",
    "A reward I feel entitled to",
    "Avoiding stillness"
  ]
}
```

### Submit Response
POST /api/pause/respond

Request:

{
  "selectedOption": "Escaping boredom"
}


Response:

{
  "reply": "You are not craving pleasure. You are avoiding stillness..."
}



### 🤝 Collaboration Rules

main branch is protected

Feature branches:

frontend → UI work only

backend → API & AI logic only

No one commits directly to main

API contracts must not change without discussion

No scope expansion during MVP

### 🚀 Getting Started (Local → GitHub)

Clone the Repository
git clone https://github.com/kritikaarora25/satvarise.git
cd satvarise

Branch Setup (Important)
Backend branch

```bash
git checkout -b backend
git push -u origin backend
```

Frontend branch

```bash
git checkout -b frontend
git push -u origin frontend
```

### 📦 Backend Setup (server)
```bash
cd server
npm install
npm run dev
```


Create a .env file (do NOT commit this):

```bash
HUGGINGFACE_API_KEY=your_api_key_here
PORT=5000
```


### 🎨 Frontend Setup (client)
```bash
cd client
npm install
npm run dev
```


### 🔁 Daily Workflow
```bash
git pull origin main
git add .
git commit -m "feat: meaningful message"
git push
```


Open a Pull Request:

frontend → main (UI changes)

backend → main (API / AI logic)

### 🌱 Future Vision (Post-MVP)

The long-term vision of SatvaRise is to help users understand their emotional patterns over time, without guilt or judgment.

Planned future features include:

End-of-day reflections summarizing emotional moments

Gentle insights such as recurring triggers or calm periods

Monthly summaries showing growth in self-control

Pattern awareness without scoring, pressure, or shame

These features are intentionally excluded from MVP v1 to keep the pause experience fast, focused, and effective.



