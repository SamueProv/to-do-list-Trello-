import Column from "./Column";

export default function Board({ columns, onAddCard, onDeleteCard, onDragStart, onDrop, onDeleteColumn }) {
  return (
    <div className="board">
      {columns.map((col) => (
        <Column
          key={col.id}
          column={col}
          onAddCard={onAddCard}
          onDeleteCard={onDeleteCard}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onDeleteColumn={onDeleteColumn}
        />
      ))}
    </div>
  );
}
