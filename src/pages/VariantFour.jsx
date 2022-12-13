import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { categoriesArr } from "../data.js";
import "../assets/styles/variantFour.css";

import { reorder } from "../helpers.js";

export function VariantFour() {
  const [categories, setCategories] = useState(categoriesArr);
  const handleDragEnd = (result) => {
    const { type, source, destination } = result;

    if (!destination) return;

    const sourceCategoryId = source.droppableId;
    const destinationCategoryId = destination.droppableId;

    // Reordering items
    if (type === "droppable-item") {
      // If reordering within the same category
      if (sourceCategoryId === destinationCategoryId) {
        const updatedOrder = reorder(
          categories.find((category) => category.id === sourceCategoryId).items,
          source.index,
          destination.index
        );
        const updatedCategories = categories.map((category) =>
          category.id !== sourceCategoryId
            ? category
            : { ...category, items: updatedOrder }
        );

        setCategories(updatedCategories);
      } else {
        // Dragging to a different category
        const sourceOrder = categories.find(
          (category) => category.id === sourceCategoryId
        ).items;
        const destinationOrder = categories.find(
          (category) => category.id === destinationCategoryId
        ).items;

        const [removed] = sourceOrder.splice(source.index, 1);
        destinationOrder.splice(destination.index, 0, removed);

        destinationOrder[removed] = sourceOrder[removed];
        delete sourceOrder[removed];

        const updatedCategories = categories.map((category) =>
          category.id === sourceCategoryId
            ? { ...category, items: sourceOrder }
            : category.id === destinationCategoryId
            ? { ...category, items: destinationOrder }
            : category
        );

        setCategories(updatedCategories);
      }
    }

    // Reordering categories
    if (type === "droppable-category") {
      const updatedCategories = reorder(
        categories,
        source.index,
        destination.index
      );

      setCategories(updatedCategories);
    }
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" type="droppable-category">
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {categories.map((category, categoryIndex) => {
                return (
                  <Draggable
                    key={category.id}
                    draggableId={category.id}
                    index={categoryIndex}
                  >
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="draggable-category"
                        >
                          <div
                            className="drag-handle"
                            {...provided.dragHandleProps}
                          >
                            Drag 1
                          </div>
                          <div className="category-container">
                            <h2 className="item">{category.name}</h2>
                            <Droppable
                              key={category.id}
                              droppableId={category.id}
                              type="droppable-item"
                            >
                              {(provided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                  >
                                    {category.items.map((item, index) => {
                                      return (
                                        <Draggable
                                          key={item.id}
                                          draggableId={item.id}
                                          index={index}
                                        >
                                          {(provided) => {
                                            return (
                                              <div
                                                className="draggable_5"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                              >
                                                <div
                                                  className="drag-handle"
                                                  {...provided.dragHandleProps}
                                                >
                                                  Drag
                                                </div>
                                                <div className="item">
                                                  {item.name}
                                                </div>
                                              </div>
                                            );
                                          }}
                                        </Draggable>
                                      );
                                    })}
                                    {provided.placeholder}
                                  </div>
                                );
                              }}
                            </Droppable>
                          </div>
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}
