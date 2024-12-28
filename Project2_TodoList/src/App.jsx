import { PiNotepad } from "react-icons/pi";
import { TfiPencilAlt2 } from "react-icons/tfi";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }

    if (!todoInput) {
      setError("Please provide a todo");
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const HandleChange = (e) => {
    setTodoInput(e.target.value);
  };

  const HandleAdd = () => {
    if (!todoInput) {
      setError("Please provide a todo");
      return;
    }
    try {
      if (todoInput.trim()) {
        let newTodo = { id: uuidv4(), text: todoInput, isCompleted: false };
        setTodos((prev) => {
          const updatedTodo = [...prev, newTodo];
          return updatedTodo;
        });
        setError("Todo created successfully");
        setTodoInput("");
      }
    } catch (err) {
      setError("Some error occured");
    }
  };

  const HandleDelete = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
      return updatedTodos;
    });
    localStorage.setItem(
      "todos",
      JSON.stringify(todos.filter((todo) => todo.id !== id))
    );
  };

  const HandleEdit = (id) => {
    let newText = prompt("Edit the todo");
    if (newText && newText.trim()) {
      setTodos((prevTodo) =>
        prevTodo.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
    }
  };

  const HandleToggle = (id) => {
    setTodos((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div className="bg-gray-500 flex items-start justify-center h-screen py-9">
      <div className="todo-container w-[600px] px-5 py-8 rounded-xl bg-white h-auto">
        <div className="todo-heading flex gap-3 justify-center items-center mb-7">
          <h1 className="text-3xl font-bold">ToDo List</h1>
          <div className="todo-heading-icons flex">
            <PiNotepad className="text-3xl font-bold" />
            <TfiPencilAlt2 className="text-3xl font-bold" />
          </div>
        </div>
        <div className="add-todo relative mb-7">
          <input
            type="text"
            value={todoInput}
            onChange={HandleChange}
            placeholder="Add your task"
            className="rounded-3xl py-4 px-5 bg-gray-300 w-full outline-none"
          />
          <AiFillPlusCircle
            onClick={HandleAdd}
            className="text-5xl text-teal-600 absolute right-1 top-1"
          />
        </div>
        {error && <p className="text-teal-600 text-center my-2">{error}</p>}
        <div className="todo-list flex flex-col gap-5">
          {todos.map((todo) => {
            return (
              <div
                key={todo.id}
                className="todos bg-gray-300 rounded py-4 px-5 w-full flex items-center justify-between"
              >
                <div className="left flex gap-2">
                  <input
                    type="checkbox"
                    name="todo-checked"
                    checked={todo.isCompleted}
                    onChange={() => HandleToggle(todo.id)}
                  />
                  <h1 className={todo.isCompleted ? "line-through" : ""}>
                    {todo.text}
                  </h1>
                </div>
                <div className="right flex gap-2">
                  <BiSolidPencil
                    className="text-2xl"
                    onClick={() => HandleEdit(todo.id)}
                  />
                  <MdDelete
                    className="text-2xl"
                    onClick={() => {
                      HandleDelete(todo.id);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
