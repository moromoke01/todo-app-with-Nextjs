'use client';
import { useEffect, useState } from "react";
import TodoItem from './Components/TodoItem';
import TodoForm from './Components/TodoForm';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await res.json();
        console.log(data);
        setTodos(data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleSave = (todo) => {
    if (todo.id) {
      setTodos(todos.map((item) => (item.id === todo.id ? todo : item)));
    } else {
      todo.id = todos.length + 1;
      setTodos([...todos, todo]);
    }
    setCurrentTodo(null);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-lg p-5 m-4 bg-purple-800 rounded-lg shadow-md sm:w-3/4 md:w-2/3 lg:w-1/2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center text-white">My Todo List</h1>
        <TodoForm 
          initialData={currentTodo || {}} 
          onSave={handleSave} 
        />
        <div className="mt-4 bg-white rounded-lg p-4">
          {todos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onEdit={setCurrentTodo} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
