# AFC Studio

A review web app for the **Accounting, Finance and Control** course at Politecnico di Milano. It covers 6 modules and 118 exercises: single choice, multi-select, calculations and ordering. Each module also has theory notes and formulas, and the app includes a formula sheet and a timed mock exam.

**Live site:** https://muccaugo.github.io/afc-studio/

| Module | Area | Exercises |
| --- | --- | --- |
| Financial Statements & Consolidation | Accounting | 20 |
| Financial Analysis | Accounting | 24 |
| DCF Valuation | Finance | 18 |
| Relative Valuation | Finance | 18 |
| Budgeting & Control | Control | 20 |
| AI for AFC | Tools | 18 |

## Features

- **Practice sessions** by module, or filtered by topic, exercise type and difficulty, with the solution and explanation after each answer.
- **Timed mock exam**: 12 questions, two per module, in 24 minutes, with corrections on submission.
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
