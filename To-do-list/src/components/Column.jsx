import { useState } from "react";
import Card from "./Card";

const TAG_COLORS = {
  dev: "#6366f1",
  design: "#ec4899",
  planning: "#f59e0b",
  bug: "#ef4444",
  docs: "#10b981",
};

const PRIORITY_ICONS = { high: "🔴", medium: "🟡", low: "🟢" };

export default function Column({ column, onAddCard, onDeleteCard, onDragStart, onDrop, onDeleteColumn }) {
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState("");
  const [tag, setTag] = useState("dev");
  const [priority, setPriority] = useState("medium");
  const [dragOver, setDragOver] = useState(false);

  const handleAdd = () => {
    if (!text.trim()) return;
    onAddCard(column.id, text.trim(), tag, priority);
    setText("");
    setAdding(false);
  };

  return (
    <div
      className={`column ${dragOver ? "drag-over" : ""}`}
      style={{ "--col-color": column.color }}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={() => { setDragOver(false); onDrop(column.id); }}
    >
      <div className="col-header">
        <div className="col-title-row">
          <span className="col-dot" style={{ background: column.color }} />
          <h2 className="col-title">{column.title}</h2>
          <span className="col-count">{column.cards.length}</span>
        </div>
        <button className="col-delete-btn" onClick={() => onDeleteColumn(column.id)} title="Elimina lista">×</button>
      </div>

      <div className="cards-list">
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            colId={column.id}
            tagColor={TAG_COLORS[card.tag] || "#64748b"}
            priorityIcon={PRIORITY_ICONS[card.priority]}
            onDelete={onDeleteCard}
            onDragStart={onDragStart}
          />
        ))}
      </div>

      {adding ? (
        <div className="add-form">
          <textarea
            className="add-input"
            placeholder="Titolo della card..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleAdd()}
            autoFocus
            rows={2}
          />
          <div className="add-row">
            <select className="select-sm" value={tag} onChange={(e) => setTag(e.target.value)}>
              <option value="dev">Dev</option>
              <option value="design">Design</option>
              <option value="planning">Planning</option>
              <option value="bug">Bug</option>
              <option value="docs">Docs</option>
            </select>
            <select className="select-sm" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="high">🔴 Alta</option>
              <option value="medium">🟡 Media</option>
              <option value="low">🟢 Bassa</option>
            </select>
          </div>
          <div className="add-actions">
            <button className="btn-confirm" onClick={handleAdd}>Aggiungi</button>
            <button className="btn-cancel" onClick={() => { setAdding(false); setText(""); }}>Annulla</button>
          </div>
        </div>
      ) : (
        <button className="add-card-btn" onClick={() => setAdding(true)}>
          <span>+</span> Aggiungi una card
        </button>
      )}
    </div>
  );
}
