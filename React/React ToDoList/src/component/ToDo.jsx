import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const ToDo = ({tasks , setTasks}) => {
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();
  const addOrEditTask = () => {
    if (input.trim() === '') {
      toast.error('Please enter the task');
    } else if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = input;
      setTasks(updatedTasks);
      setEditIndex(null);
      toast.success('Task updated');
    } else {
      setTasks([...tasks, { text: input, done: false }]);
      toast.success('Task added');
    }
    setInput('');
  };

  const toggleTask = index => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const handleTaskClick = (task, index) => {
    localStorage.setItem('selected_task', JSON.stringify(task));
    navigate(`/task/${index}`);
  };

  const deleteTask = index => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = index => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen w-screen bg-neutral-300 bg-cover bg-no-repeat bg-center dark:bg-slate-500 dark:text-white">
      <div className="flex justify-center px-4 py-6">
        <div className="w-full max-w-xl bg-white dark:bg-gray-900 bg-opacity-10 dark:bg-opacity-80 p-6 rounded-lg shadow-xl">
          
         
          <div className="flex mb-4">
            <input
              className="flex-grow p-2 border rounded-l text-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
              placeholder="Enter a task"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r"
              onClick={addOrEditTask}
            >
              {editIndex !== null ? 'Update' : 'Add'}
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
                    className={`cursor-pointer ${task.done ? 'line-through decoration-red-700' : ''}`}
                    onClick={() => handleTaskClick(task, index)}
                  >
                    {task.text}
                  </span>
                </div>
                <div className="space-x-2">
                  <button className="text-yellow-500 dark:text-yellow-400" onClick={() => editTask(index)}>Edit</button>
                  <button className="text-red-500 dark:text-red-400" onClick={() => deleteTask(index)}>Delete</button>
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
