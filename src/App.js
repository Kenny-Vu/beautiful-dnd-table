import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import { v4 as uuid } from "uuid";

const itemsFromBackend = [
  {
    id: uuid(),
    name: "Doggo🐕",
    location: "DW1",
    ward: "R-1",
    aca: "Julie",
    co: "Dr.Berb",
    problem: "ingested chocolate",
  },
  {
    id: uuid(),
    name: "Daisy",
    location: "DW2",
    ward: "R-2",
    aca: "Julie",
    co: "Dr.Berb",
    problem: "ingested chocolate",
  },
  {
    id: uuid(),
    name: "Sniffy",
    location: "ISO",
    ward: "R-3",
    aca: "Julie",
    co: "Dr.Berb",
    problem: "ingested chocolate",
  },
  {
    id: uuid(),
    name: "Curry",
    location: "RR",
    ward: "R-4",
    aca: "Julie",
    co: "Dr.Berb",
    problem: "ingested chocolate",
  },
  {
    id: uuid(),
    name: "Bob",
    location: "DW1",
    ward: "R-5",
    aca: "Julie",
    co: "Dr.Berb",
    problem: "ingested chocolate",
  },
];

const columnsFromBackend = {
  ["triage-table"]: {
    name: "triage-table",
    items: itemsFromBackend,
  },
  ["rvt-table"]: {
    name: "rvt-table",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  console.log(result);
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div key={columnId}>
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <table
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: "100%",
                          minHeight: "100px",
                          border: "solid",
                        }}
                      >
                        <tbody>
                          {column.items.map((pet, index) => {
                            return (
                              <Draggable
                                key={pet.id}
                                draggableId={pet.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <tr
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        height: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <td {...provided.dragHandleProps}>✅</td>
                                      <td>{pet.name}</td>
                                      <td>{pet.location}</td>
                                      <td>{pet.ward}</td>
                                      <td>{pet.aca}</td>
                                      <td>{pet.co}</td>
                                      {columnId === "triage-table" && (
                                        <td>{pet.problem}</td>
                                      )}
                                    </tr>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                        </tbody>
                        {provided.placeholder}
                      </table>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
