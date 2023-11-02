import React,{useState} from 'react';
import './App.css';
import { Todo } from './model';
import Inputfield from './components/inputfield';
import Todolist from './components/todolist';
import { DragDropContext,DropResult } from 'react-beautiful-dnd';

const App:React.FC= () => {
  
  const[todo,setTodo]=useState<string>("")
  const[todos,setTodos]=useState<Todo[]>([])
  const[completedTodos,setCompletedTodos]=useState<Todo[]>([])

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  const handleAdd=(e:React.FormEvent)=>{
    e.preventDefault()
    if(todo){
      const id=Date.now()
      setTodos([...todos,{id,todo,isDone:false}])
      setTodo("")
    }
  }
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
          <span className="heading">Taskify</span>
          <Inputfield 
            todo={todo}
            setTodo={setTodo}
            handleAdd={handleAdd}
          />
          <Todolist 
            todos={todos}
            setTodos={setTodos}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
      </div>
    </DragDropContext>
  );
}

export default App;
