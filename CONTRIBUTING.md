
# 🤝 Contributing to SatvaRise

Thank you for contributing to **SatvaRise** 🌱  
This project values discipline, clarity, and restraint — the same values apply to collaboration.

Please read this document carefully before contributing.

---

## 🌿 Project Philosophy

SatvaRise is built on one core principle:

> **Pause before reaction. Choice before impulse.**

Every contribution must respect this philosophy.

---

## 👥 Roles & Responsibilities

### Frontend
- Works only inside `/client`
- Builds the pause flow UI
- Focus: calm, minimal, distraction-free design

### Backend
- Works only inside `/server`
- Handles AI logic, prompts, and APIs
- Focus: psychology, reflection quality, clarity

Do not cross responsibilities without discussion.

---

## 🌱 Branching Rules

- `main` → stable & documentation
- `frontend` → frontend development
- `backend` → backend development

### Rules
- ❌ Never commit directly to `main`
- ✅ Always work on your feature branch
- ✅ Use Pull Requests to merge

---

## 🔁 Workflow

1. Pull latest changes
```bash
git pull origin main
```

Switch to your branch

git checkout frontend
# or
git checkout backend


Commit changes

git add .
git commit -m "feat: short meaningful message"


Push branch

git push


Open Pull Request → main

### 📝 Commit Message Guidelines

Use clear prefixes:

feat: new feature

fix: bug fix

docs: documentation

chore: setup / cleanup

Examples:

feat: add pause option UI
fix: handle empty AI response
docs: update README

### 🔌 API Contract Discipline

Frontend & backend communicate via fixed APIs

Do not change request/response formats casually

Any API change must be discussed and documented

### 🚫 What Not To Do

Do not add features outside MVP

Do not add dashboards, analytics, or gamification

Do not commit secrets or .env

Do not change AI prompts casually

Do not add heavy animations or distractions

### 🧠 Design Rules (Non-Negotiable)

No typing during pause

No timers counting seconds

No guilt, pressure, or motivation language

Calm > clever

Simple > complex

Working > perfect

### 🌸 Review Checklist (Before PR)

Ask yourself:

Does this reduce cognitive load?

Does this respect the 30-second pause?

Does this feel calm and minimal?

Is this necessary for MVP?

If unsure, ask before pushing.

### 🧘 Final Note

SatvaRise is not built to impress.
It is built to help someone pause at the right moment.

Thank you for contributing with care 🌱


---

### ✅ What to do now (exact order)

```bash
git checkout main
# paste README.md
git add README.md
git commit -m "docs: add full README"

# create CONTRIBUTING.md and paste content
git add CONTRIBUTING.md
git commit -m "docs: add contributing guidelines"

git push
```