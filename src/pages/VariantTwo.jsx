import { useState, useRef } from "react";
import "../assets/variantTwo.css";

export function VariantTwo() {
    
  const dragItem = useRef(null) 
  const dragOverItem = useRef(null)  
  const [fruitItems, setFruitsItems] = useState(["Apple", "Orange", "Banana"]);

  const [newFruitItem, setNewFruiteItem] = useState('')

  const handleSort = () => {
    //dublicate items
    let _fruitItems = [...fruitItems]

    const draggedItemContent = _fruitItems.splice(dragItem.current, 1)[0]
    _fruitItems.splice(dragOverItem.current, 0, draggedItemContent)

    dragItem.current = null
    dragOverItem.current = null

    setFruitsItems(_fruitItems)
  }

  const handleAddItem = () => {
    setFruitsItems([...fruitItems, newFruitItem])
  }


  return (
    <div className="container_two">
      <h2>Fruit List</h2>
      <div className="input-group">
        <input type="text" name="fruitName" placeholder="e.g Banana" value={newFruitItem} onChange={(e) => setNewFruiteItem(e.target.value)} />
        <button className="btn" onClick={handleAddItem}>Add item</button>
      </div>

      {/* List component  */}
      <div className="list-container">
        {fruitItems.map((item, index) => (
          <div
            key={index}
            className="list-item"
            draggable
            onDragStart={(e) => (dragItem.current=index)}
            onDragEnter = {(e) => (dragOverItem.current=index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <i>...</i>
            <h3>{item}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
