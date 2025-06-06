import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import bg from '../assets/bg.jpg';

const ToDo = ({ user, setUser }) => {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem(user.email + '_tasks')) || []);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    localStorage.setItem(user.email + '_tasks', JSON.stringify(tasks));
  }, [tasks, user.email]);

  const addOrEditTask = () => {
    if (input.trim() === '') return;

    if (editIndex !== null) {
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

  const deleteTask = index => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out');
  };

  const editTask = index => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  return (
    <div
      className="min-h-screen w-screen  bg-cover bg-no-repeat bg-center   flex flex-col"
      style={{ backgroundImage: `url(${bg})` }}
    >
      
      <div className="bg-white bg-opacity-80 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-700">Todo App</h1>
        <div className="space-x-4">
          <button onClick={() => setShowProfile(true)} className="text-blue-600 font-semibold hover:underline">
            Profile
          </button>
          <button onClick={logout} className="text-red-500 font-semibold hover:underline">
            Logout
          </button>
        </div>
      </div>

    
      <div className="flex-grow flex justify-center items-center px-4">
        <div className="w-full max-w-xl bg-white bg-opacity-0 p-6 rounded-lg shadow-lg">
          {showProfile ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h2>
              
              <p className="text-black"><strong className="text-black">Email:</strong> {user.email}</p>
              <p className="mt-4">
                <button
                  onClick={() => setShowProfile(false)}
                  className="text-blue-500 hover:underline mt-2"
                >
                  Back to Tasks
                </button>
              </p>
            </div>
          ) : (
            <>
              <div className="flex mb-4">
                <input
                  className="flex-grow p-2 border rounded-l"
                  placeholder="Enter a task"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 rounded-r" onClick={addOrEditTask}>
                  {editIndex !== null ? 'Update' : 'Add'}
                </button>
              </div>
              <ul>
                {tasks.map((task, index) => (
                  <li key={index} className=" flex justify-between items-center p-2 border-b">
                    <div className="font-bold text-2xl text-black flex items-center space-x-2 ">
                      <input type="checkbox" checked={task.done} onChange={() => toggleTask(index)} />
                      <span
                        className={`cursor-pointer ${task.done ? 'line-through text-gray-400' : ''}`}
                        onClick={() => toggleTask(index)}
                      >
                        {task.text}
                      </span>
                    </div>
                    <div className="space-x-2">
                      <button className="text-yellow-500" onClick={() => editTask(index)}>Edit</button>
                      <button className="text-red-500" onClick={() => deleteTask(index)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
