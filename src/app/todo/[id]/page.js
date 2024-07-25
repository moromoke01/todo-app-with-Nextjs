// src/app/todo/[id]/page.js
'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const TodoDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      if (id) {
        try {
          const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
          const data = await res.json();
          setTodo(data);
        } catch (error) {
          console.error('Error fetching todo:', error);
        }
      }
    };

    fetchTodo();
  }, [id]);

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-auto m-4 p-4 mt-10 bg-purple-800 sm:w-3/4 md:w-2/3 lg:w-3/6">
      <h1 className="text-2xl font-bold mb-4 text-white text-center">Todo Detail</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 ">Todo Title: <b>{todo.title}</b></h2>
        <p>ID: {todo.id}</p>
        <p>Completed: <span className='text-red-500 '><b>{todo.completed ? 'Yes' : 'No'}</b></span></p>
      </div>
    </div>
  );
};

export default TodoDetail;
