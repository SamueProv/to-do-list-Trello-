# KanFlow — Kanban Board stile Trello

Una to-do app Kanban con drag & drop, tag, priorità e colonne personalizzabili.

## 🚀 Avvio rapido (GitHub Codespaces)

```bash
npm install
npm run dev
```

Apri il **Ports panel** in Codespaces e clicca sul link della porta `5173`.

## 📁 Struttura

```
src/
  App.jsx          # Root: stato globale + drag & drop
  App.css          # Tutti gli stili
  components/
    Board.jsx      # Contenitore delle colonne
    Column.jsx     # Colonna con form di aggiunta
    Card.jsx       # Singola card draggable
```

## ✨ Funzionalità

- **Drag & Drop** nativo tra colonne
- **Aggiungi card** con testo, tag e priorità
- **Elimina card** con il tasto 🗑
- **Aggiungi colonne** personalizzate
- **Elimina colonne** con hover → ×
- Tag colorati: dev, design, planning, bug, docs
- Priorità: 🔴 Alta, 🟡 Media, 🟢 Bassa

## 🛠 Stack

- React 18 + Vite 5
- CSS puro (no librerie UI)
- Drag & Drop HTML5 nativo
