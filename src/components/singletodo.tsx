import React,{useState,useRef,useEffect} from 'react';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from '../model';
import './styles.css';
import { Draggable } from "react-beautiful-dnd";

interface Props  {
  index: number;
  stodo:Todo,
  todos:Todo[],
  setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}

const Singletodo:React.FC<Props> = ({index,stodo,todos,setTodos}) => {
  
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(stodo.todo);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
      }, [edit]);
    
    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
          todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
    };
   
   const handleDone = (id: number) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
          )
        );
    };
  
  return (
    <Draggable draggableId={stodo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, stodo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todo_single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todo_single_text"
              ref={inputRef}
            />
          ) : stodo.isDone ? (
            <s className="todo_single_text">{stodo.todo}</s>
          ) : (
            <span className="todo_single_text">{stodo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !stodo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(stodo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(stodo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
    
    
  )
}

export default Singletodo