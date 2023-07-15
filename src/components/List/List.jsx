import { useState } from 'react';
import './list.css';

const List = ({ list, toggleCompleted, removeItem, handleListUpdate }) => {
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [updatedItemText, setUpdatedItemText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
    setDraggedOverIndex(index);
  };

  const handleTouchStart = (e, index) => {
    setDraggedOverIndex(index);
  };

  const startEditingItem = (itemId) => {
    const itemToEdit = list.find((item) => item.id === itemId);
    setEditingItem(itemToEdit);
    setUpdatedItemText(itemToEdit.text);
    setIsEditing(true);
  };

  const updateItemText = (e) => {
    setUpdatedItemText(e.target.value);
  };

  const saveItemText = () => {
    const updatedItems = list.map((item) => {
      if (item.id === editingItem.id) {
        return { ...item, text: updatedItemText };
      }
      return item;
    });
    handleListUpdate(updatedItems);
    setEditingItem(null);
    setIsEditing(false);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (index !== draggedOverIndex) {
      const items = Array.from(list);
      const [draggedItem] = items.splice(draggedOverIndex, 1);
      items.splice(index, 0, draggedItem);
      handleListUpdate(items);
      setDraggedOverIndex(index);
    }
  };

  const handleTouchMove = (e, index) => {
    e.preventDefault();
    if (index !== draggedOverIndex) {
      const items = Array.from(list);
      const [draggedItem] = items.splice(draggedOverIndex, 1);
      items.splice(index, 0, draggedItem);
      handleListUpdate(items);
      setDraggedOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedOverIndex(null);
  };

  return (
    <ul className="list">
      {list.map((item, index) => (
        <li
          key={item.id}
          className="task"
          draggable
          onTouchStart={(e) => handleTouchStart(e, index)}
          onTouchMove={(e) => handleTouchMove(e, index)}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          style={{
            textDecoration: item.completed ? 'line-through' : 'none',
            opacity: index === draggedOverIndex ? 0.5 : 1,
          }}
        >
          {editingItem && editingItem.id === item.id ? (
            <div className="edit-input-container">
              <input
                type="text"
                value={updatedItemText}
                onChange={updateItemText}
                onBlur={saveItemText}
              />
              {isEditing && (
                <button className="edit-save" onClick={saveItemText}>
                  <i className="fas fa-check"></i>
                </button>
              )}
            </div>
          ) : (
            <>
              <input
                className="checkbox-style"
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompleted(item.id)}
              />
              <span className="task-text" onClick={() => startEditingItem(item.id)}>
                {item.text}
              </span>
              <button className="erase" onClick={() => removeItem(item.id)}>
                <i className="fas fa-trash"></i>
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
