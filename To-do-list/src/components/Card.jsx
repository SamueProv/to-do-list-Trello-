export default function Card({ card, colId, tagColor, priorityIcon, onDelete, onDragStart }) {
  return (
    <div
      className="card"
      draggable
      onDragStart={() => onDragStart(card, colId)}
    >
      <div className="card-tag-bar" style={{ background: tagColor }} />
      <div className="card-body">
        <p className="card-text">{card.text}</p>
        <div className="card-footer">
          <span className="card-tag" style={{ color: tagColor, borderColor: tagColor }}>
            {card.tag}
          </span>
          <span className="card-priority" title={card.priority}>{priorityIcon}</span>
          <button className="card-delete" onClick={() => onDelete(colId, card.id)}>🗑</button>
        </div>
      </div>
    </div>
  );
}
