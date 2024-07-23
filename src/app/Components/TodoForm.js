import { useState, useEffect } from 'react';

const TodoForm = ({ initialData = {}, onSave }) => {
  const [title, setTitle] = useState(initialData?.title || '');

  useEffect(() => {
    setTitle(initialData?.title || '');
  }, [initialData?.title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...initialData, title });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded-lg border"
        placeholder="Enter todo title"
        required
      />
      <button type="submit" className="mt-2 py-2 px-5 bg-blue-500 text-white rounded-xl">
        Save
      </button>
    </form>
  );
};

export default TodoForm;
