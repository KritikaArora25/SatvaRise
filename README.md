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
├── README.md<br>
├── CONTRIBUTING.md<br>
└── .gitignore<br>


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
```json
POST /api/pause/respond
```


Request:

```json
{
  "selectedOption": "Escaping boredom"
}
```

Response:

```json
{
  "reply": "You are not craving pleasure. You are avoiding stillness..."
}
```

### 🤝 Collaboration Rules

main branch contains documentation and stable code

Feature branches:

frontend → UI work only

backend → API & AI logic only

No one commits directly to main

API contracts must not change without discussion

No scope expansion during MVP

### 🚀 Getting Started
Clone Repository
git clone https://github.com/kritikaarora2505/SatvaRise.git
cd SatvaRise

Branch Setup
Backend (Kritika)
git checkout -b backend
git push -u origin backend

Frontend (Sommay)
git checkout -b frontend
git push -u origin frontend

### 📦 Backend Setup
cd server
npm install
npm run dev


Create .env (do NOT commit):

HUGGINGFACE_API_KEY=your_api_key_here
PORT=5000

### 🎨 Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 🔁 Daily Workflow
git pull origin main
git add .
git commit -m "feat: meaningful message"
git push


### Open Pull Request:

frontend → main

backend → main

### ❌ Do Not Commit
.env
node_modules/
dist/
build/

### 🌱 Future Vision (Post-MVP)

SatvaRise will later help users understand emotional patterns over time through:

End-of-day reflections

Gentle pattern insights

Monthly growth summaries

Awareness without guilt or pressure

These features are intentionally excluded from MVP v1.

### 🧠 Final Principle

Pause before reaction.
Choice before impulse.
Clarity before action.