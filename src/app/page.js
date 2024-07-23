'use client';
import { useEffect, useState } from "react";
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';

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
      <div className="w-full w-3/6 p-5 m-10 bg-white rounded-lg shadow-md sm:w-screen md:w-2/3 lg: w-1/2 bg-purple-800">
        <h1 className="text-2xl font-bold mb-4 text-center text-white"> My Todo List</h1>
        <TodoForm 
          initialData={currentTodo || {}} 
          onSave={handleSave} 
        />
        <div className="mt-4 bg-white rounded-lg pt-10">
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
