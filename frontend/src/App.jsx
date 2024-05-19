import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="relative bg-white shadow-md rounded-lg p-6 w-full max-w-2xl border border-gray-300">
        <div className="absolute top-2 left-2 flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/add" element={<TodoForm />} />
          <Route path="/edit/:id" element={<TodoForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
