import { useState } from "react";

const TAG_COLORS = { dev: "#6366f1", design: "#ec4899", planning: "#f59e0b", bug: "#ef4444", docs: "#10b981" };
const PRIORITY_ICONS = { high: "🔴", medium: "🟡", low: "🟢" };

export default function MobileColumn({
  column, colIdx, totalCols,
  onAddCard, onDeleteCard, onMoveCard, onDeleteColumn,
  onPrev, onNext,
}) {
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState("");
  const [tag, setTag] = useState("dev");
  const [priority, setPriority] = useState("medium");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAddCard(column.id, text.trim(), tag, priority);
    setText("");
    setAdding(false);
  };

  return (
    <div className="mobile-column">
      {/* Header with prev/next navigation */}
      <div className="mobile-col-header" style={{ "--col-color": column.color }}>
        <button
          className="mob-nav-btn"
          onClick={onPrev}
          disabled={colIdx === 0}
        >‹</button>

        <div className="mobile-col-title-wrap">
          <span className="col-dot" style={{ background: column.color }} />
          <h2 className="col-title">{column.title}</h2>
          <span className="col-count">{column.cards.length}</span>
        </div>

        <button
          className="mob-nav-btn"
          onClick={onNext}
          disabled={colIdx === totalCols - 1}
        >›</button>
      </div>

      {/* Step indicator */}
      <div className="mob-step-dots">
        {Array.from({ length: totalCols }).map((_, i) => (
          <span
            key={i}
            className={`mob-dot ${i === colIdx ? "active" : ""}`}
            style={i === colIdx ? { background: column.color } : {}}
          />
        ))}
      </div>

      {/* Cards list */}
      <div className="mobile-cards-list">
        {column.cards.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>Nessuna card in questa lista</p>
          </div>
        )}

        {column.cards.map((card) => {
          const tagColor = TAG_COLORS[card.tag] || "#64748b";
          return (
            <div key={card.id} className="mobile-card">
              <div className="card-tag-bar" style={{ background: tagColor }} />
              <div className="card-body">
                <p className="card-text">{card.text}</p>
                <div className="mobile-card-footer">
                  <span
                    className="card-tag"
                    style={{ color: tagColor, borderColor: tagColor }}
                  >{card.tag}</span>
                  <span className="card-priority">{PRIORITY_ICONS[card.priority]}</span>
                  <div className="mobile-card-actions">
                    <button
                      className="mob-move-btn"
                      onClick={() => onMoveCard(card.id, column.id, -1)}
                      disabled={colIdx === 0}
                      title="Colonna precedente"
                    >←</button>
                    <button
                      className="mob-move-btn"
                      onClick={() => onMoveCard(card.id, column.id, 1)}
                      disabled={colIdx === totalCols - 1}
                      title="Colonna successiva"
                    >→</button>
                    <button
                      className="card-delete-mob"
                      onClick={() => onDeleteCard(column.id, card.id)}
                    >🗑</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add card form */}
      {adding ? (
        <div className="add-form">
          <textarea
            className="add-input"
            placeholder="Titolo della card..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            rows={3}
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

      <button className="mobile-delete-col" onClick={() => onDeleteColumn(column.id)}>
        🗑 Elimina questa lista
      </button>
    </div>
  );
}
