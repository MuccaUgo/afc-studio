# AFC Studio

A review web app for the **Accounting, Finance and Control** course at Politecnico di Milano. It covers 7 modules and 162 exercises: single choice, multi-select, calculations, ordering and 44 **exam-style A–D cases** for Accounting and Finance, written in the format and with the conventions of the course's past exams. Each module also has theory notes and formulas, and the app includes a formula sheet and a timed mock exam.

**Live site:** https://muccaugo.github.io/afc-studio/

| Module | Area | Exercises | of which exam-style |
| --- | --- | --- | --- |
| Financial Statements & Consolidation | Accounting | 27 | 7 |
| Financial Analysis | Accounting | 35 | 11 |
| DCF Valuation | Finance | 25 | 7 |
| WACC & Cost of Capital | Finance | 12 | 12 |
| Relative Valuation | Finance | 25 | 7 |
| Budgeting & Control | Control | 20 | – |
| AI for AFC | Tools | 18 | – |

## Features

- **Practice sessions** by module, or filtered by topic, exercise type and difficulty, with the solution and explanation after each answer.
- **Exam-style practice**: A–D cases with distractors built on typical mistakes, "None of the other answers" options and the course rounding rules (two decimals, four for percentages).
- **Timed mock exam**: 12 exam-style questions, 3 minutes each, with corrections on submission. The timing is a practice choice, not the official exam format.
- **Formula sheet** with search, **saved exercises** and a **mistake review** list.
- Progress is stored only in your browser (`localStorage`). There is no account and no server.

## Run locally

It is a static site with no build step. Serve the folder with any static server, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Files

| File | Contents |
| --- | --- |
| `index.html` | Page shell |
| `accounting.js`, `finance.js`, `control.js` | Theory notes, formulas and exercises |
| `engine.js` | Question bank, answer checking and saved progress |
| `app.js` | Pages, navigation and interactions |
| `icons.js`, `styles.css`, `favicon.svg` | Icons and styles |

This is an unofficial study aid. It is not affiliated with Politecnico di Milano.
