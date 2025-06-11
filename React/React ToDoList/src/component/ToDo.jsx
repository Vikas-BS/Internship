import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ToDo = ({ user, onTasksChange }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const data = localStorage.getItem(user.email + "_tasks");
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("Failed to parse tasks from localStorage:", err);
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem(user.email + "_tasks", JSON.stringify(tasks));
    onTasksChange(tasks);
  }, [tasks , user.email]); 

  const addOrEditTask = () => {
    if (input.trim() === "") {
      toast.error("Please enter the task");
      return;
    }
    const newTasks = [...tasks];
    if (editIndex !== null) {
      newTasks[editIndex].text = input;
      toast.success("Task updated");
      setEditIndex(null);
    } else {
      newTasks.push({ text: input, done: false });
      toast.success("Task added");
    }
    setTasks(newTasks);
    setInput("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen w-screen bg-neutral-300 bg-cover bg-no-repeat bg-center dark:bg-slate-500 dark:text-white">
      <div className="flex justify-center px-4 py-6">
        <div className="w-full max-w-xl bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl">
          <div className="flex mb-4">
            <input
              className="flex-grow p-2 border rounded-l text-black dark:text-white dark:bg-gray-800 dark:border-gray-600"
              placeholder="Enter a task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r"
              onClick={addOrEditTask}
            >
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>

          <ul>
            {tasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b dark:border-gray-600"
              >
                <div className="font-bold text-2xl text-black dark:text-white flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(index)}
                  />
                  <span
                    className={`cursor-pointer ${
                      task.done ? "line-through decoration-red-700" : ""
                    }`}
                    
                  >
                    {task.text}
                  </span>
                </div>
                <div className="space-x-2">
                  <button
                    className="text-yellow-500 dark:text-yellow-400"
                    onClick={() => editTask(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 dark:text-red-400"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
