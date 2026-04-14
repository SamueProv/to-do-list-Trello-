import { useState } from "react";
import Board from "./components/Board";
import MobileColumn from "./components/MobileColumn";
import "./App.css";

const INITIAL_COLUMNS = [
  {
    id: "todo",
    title: "📋 Da Fare",
    color: "#6366f1",
    cards: [
      { id: "c1", text: "Pianificare lo sprint", tag: "planning", priority: "high" },
      { id: "c2", text: "Scrivere i test unitari", tag: "dev", priority: "medium" },
    ],
  },
  {
    id: "inprogress",
    title: "⚡ In Corso",
    color: "#f59e0b",
    cards: [
      { id: "c3", text: "Implementare autenticazione", tag: "dev", priority: "high" },
    ],
  },
  {
    id: "review",
    title: "🔍 In Revisione",
    color: "#8b5cf6",
    cards: [
      { id: "c4", text: "Design del dashboard", tag: "design", priority: "low" },
    ],
  },
  {
    id: "done",
    title: "✅ Completato",
    color: "#10b981",
    cards: [
      { id: "c5", text: "Setup del progetto", tag: "dev", priority: "low" },
    ],
  },
];

export default function App() {
  const [columns, setColumns] = useState(INITIAL_COLUMNS);
  const [dragCard, setDragCard] = useState(null);
  const [dragFrom, setDragFrom] = useState(null);
  const [activeColId, setActiveColId] = useState(INITIAL_COLUMNS[0].id);

  const addCard = (colId, text, tag, priority) => {
    setColumns((cols) =>
      cols.map((col) =>
        col.id === colId
          ? { ...col, cards: [...col.cards, { id: `c${Date.now()}`, text, tag, priority }] }
          : col
      )
    );
  };

  const deleteCard = (colId, cardId) => {
    setColumns((cols) =>
      cols.map((col) =>
        col.id === colId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col
      )
    );
  };

  const onDragStart = (card, fromColId) => {
    setDragCard(card);
    setDragFrom(fromColId);
  };

  const onDrop = (toColId) => {
    if (!dragCard || dragFrom === toColId) return;
    setColumns((cols) =>
      cols.map((col) => {
        if (col.id === dragFrom) return { ...col, cards: col.cards.filter((c) => c.id !== dragCard.id) };
        if (col.id === toColId) return { ...col, cards: [...col.cards, dragCard] };
        return col;
      })
    );
    setDragCard(null);
    setDragFrom(null);
  };

  const moveCardMobile = (cardId, fromColId, direction) => {
    const fromIdx = columns.findIndex((c) => c.id === fromColId);
    const toIdx = fromIdx + direction;
    if (toIdx < 0 || toIdx >= columns.length) return;
    const card = columns[fromIdx].cards.find((c) => c.id === cardId);
    if (!card) return;
    setColumns((cols) =>
      cols.map((col, i) => {
        if (i === fromIdx) return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        if (i === toIdx) return { ...col, cards: [...col.cards, card] };
        return col;
      })
    );
  };

  const addColumn = () => {
    const title = prompt("Nome della nuova colonna:");
    if (!title) return;
    const newCol = {
      id: `col-${Date.now()}`,
      title: `📌 ${title}`,
      color: "#64748b",
      cards: [],
    };
    setColumns((cols) => [...cols, newCol]);
    setActiveColId(newCol.id);
  };

  const deleteColumn = (colId) => {
    setColumns((cols) => {
      const remaining = cols.filter((c) => c.id !== colId);
      if (activeColId === colId && remaining.length > 0) setActiveColId(remaining[0].id);
      return remaining;
    });
  };

  const totalCards = columns.reduce((a, c) => a + c.cards.length, 0);
  const activeColIdx = columns.findIndex((c) => c.id === activeColId);
  const activeCol = columns[activeColIdx];

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <div className="logo">⬡</div>
          <div>
            <h1 className="app-title">KanFlow</h1>
            <p className="app-sub">Il tuo workspace</p>
          </div>
        </div>
        <div className="header-right">
          <span className="badge">{totalCards} card</span>
          <button className="add-col-btn-header" onClick={addColumn} title="Nuova lista">+</button>
        </div>
      </header>

      {/* Mobile tab bar */}
      <nav className="mobile-tabs">
        {columns.map((col) => (
          <button
            key={col.id}
            className={`mobile-tab ${activeColId === col.id ? "active" : ""}`}
            style={{ "--tab-color": col.color }}
            onClick={() => setActiveColId(col.id)}
          >
            <span className="mobile-tab-emoji">{col.title.split(" ")[0]}</span>
            <span className="mobile-tab-count">{col.cards.length}</span>
          </button>
        ))}
      </nav>

      {/* Desktop board */}
      <main className="board-wrapper desktop-only">
        <Board
          columns={columns}
          onAddCard={addCard}
          onDeleteCard={deleteCard}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onDeleteColumn={deleteColumn}
        />
        <button className="add-col-btn" onClick={addColumn}>
          <span>+</span> Aggiungi lista
        </button>
      </main>

      {/* Mobile single-column view */}
      <main className="mobile-view mobile-only">
        {activeCol && (
          <MobileColumn
            column={activeCol}
            colIdx={activeColIdx}
            totalCols={columns.length}
            onAddCard={addCard}
            onDeleteCard={deleteCard}
            onMoveCard={moveCardMobile}
            onDeleteColumn={deleteColumn}
            onPrev={() => activeColIdx > 0 && setActiveColId(columns[activeColIdx - 1].id)}
            onNext={() => activeColIdx < columns.length - 1 && setActiveColId(columns[activeColIdx + 1].id)}
          />
        )}
      </main>
    </div>
  );
}
