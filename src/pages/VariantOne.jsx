import React, { useState, useRef } from "react";
import "../assets/styles/variantOne.css"

export function VariantOne() {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const elem = useRef()

  const [list, setList] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);

  const dragStart = (e, position) => {
    dragItem.current = position
  }

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };
  
  return (
    <div className="content">
      {list &&
        list.map((item, index) => (
          <div
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            className="draggable"
            key={index}
            draggable
            ref={elem}
          >
            {item}
          </div>
        ))}
    </div>
  );
}

