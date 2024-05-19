import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState("uncompleted");

  useEffect(() => {
    axios
      .get("/todos")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTodos(response.data);
        } else {
          setTodos([]);
          console.error("Received data is not an array:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const deleteTodo = (id) => {
    axios
      .delete(`/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => console.error(`Error deleting todo: ${error}`));
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo._id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) =>
    activeTab === "completed" ? todo.completed : !todo.completed
  );

  return (
    <div className="flex flex-grow">
      <div className="w-1/4 border-r border-gray-300 p-4 flex flex-col space-y-4">
        <div
          className={`cursor-pointer px-4 py-2 text-left border-b border-gray-300 ${
            activeTab === "uncompleted"
              ? "text-black font-semibold hover:text-black"
              : "text-gray-700 hover:text-black"
          }`}
          onClick={() => setActiveTab("uncompleted")}
        >
          Uncompleted
        </div>
        <div
          className={`cursor-pointer px-4 py-2 text-left ${
            activeTab === "completed"
              ? "text-black font-semibold hover:text-black"
              : "text-gray-700 hover:text-black"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </div>
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center text-black">To-Do List</h1>
        <ul className="space-y-4">
          {filteredTodos.map((todo) => (
            <li
              key={todo._id}
              className={`p-4 bg-white rounded-lg shadow h-24 overflow-y-auto ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo._id)}
                    className="form-checkbox h-5 w-5 text-blue-500 cursor-pointer"
                  />
                  <span className="ml-2 font-bold">{todo.title}</span>
                </div>
                <div className="flex items-center">
                  <Link
                    to={`/edit/${todo._id}`}
                    className="text-blue-500 hover:text-blue-700 mr-2 transition duration-300"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <span
                    onClick={() => deleteTodo(todo._id)}
                    className="text-red-500 cursor-pointer hover:text-red-700 transition duration-300"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mt-2">{todo.description}</p>
            </li>
          ))}
        </ul>
        {activeTab === "uncompleted" && (
          <div className="flex justify-center mt-8">
            <Link
              to="/add"
              className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition duration-300 flex items-center"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              New Task
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;