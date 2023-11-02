import React from 'react';
import './styles.css';
import { Todo } from '../model';
import Singletodo from './singletodo';
import { Droppable } from "react-beautiful-dnd";

interface Props {
    todos:Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos:Todo[],
    setCompletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}



const Todolist:React.FC<Props> = ({todos,setTodos,completedTodos,setCompletedTodos}) => {
  
  
  return (
    <div className="container">
    <Droppable droppableId="TodosList">
      {(provided, snapshot) => (
        <div
          className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <span className="todos_heading">Active Tasks</span>
          {todos?.map((stodo, index) => (
            <Singletodo
              index={index}
              stodo={stodo}
              key={stodo.id} 
              todos={todos}
              setTodos={setTodos}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    <Droppable droppableId="TodosRemove">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`todos  ${
            snapshot.isDraggingOver ? "dragcomplete" : "remove"
          }`}
        >
          <span className="todos_heading">Completed Tasks</span>
          {completedTodos?.map((stodo, index) => (
            <Singletodo
              index={index}
              todos={completedTodos}
              stodo={stodo}
              key={stodo.id}
              setTodos={setCompletedTodos}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
    
  )
}

export default Todolist