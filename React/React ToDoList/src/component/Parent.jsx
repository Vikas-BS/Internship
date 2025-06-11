import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import ToDo from "./ToDo";

const Parent = ({ user, setUser }) => {
  const [search, setSearch] = useState("");
  const [tasksFromChild, setTasksFromChild] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleTasksChange = (tasks) => {
    setTasksFromChild(tasks);
  };

  useEffect(() => {
    setFilteredTasks(
      tasksFromChild.filter((task) =>
        task.text.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, tasksFromChild]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectTask = (task) => {
    const originalIndex = tasksFromChild.findIndex(
      (t) => t.text === task.text && t.done === task.done
    );

    if (originalIndex !== -1) {
      localStorage.setItem("selected_task", JSON.stringify(task));
      setSearch("");
      navigate(`/task/${originalIndex}`);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="w-screen">
      <div className="bg-white dark:bg-gray-800 px-6 py-4 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl font-bold text-blue-700 dark:text-white">
          Todo App
        </h1>

        <div ref={searchRef} className="relative w-1/3">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && filteredTasks.length > 0 && (
            <ul className="absolute left-0 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 mt-1 rounded shadow-lg max-h-40 overflow-auto z-50">
              {filteredTasks.map((task) => (
                <li
                  key={task.text}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-black dark:text-white"
                  onClick={() => handleSelectTask(task)}
                >
                  {task.text}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <button
            onClick={() => setShowProfile(true)}
            className="text-blue-600 dark:text-blue-300 font-semibold hover:underline"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="text-red-500 dark:text-red-400 font-semibold hover:underline"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center px-4 py-6">
        {showProfile ? (
          <div className="w-full max-w-xl bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              User Profile
            </h2>
            <p className="text-black dark:text-white text-lg">
              <strong>Email:</strong> {user.email}
            </p>
            <button
              onClick={() => setShowProfile(false)}
              className="text-blue-500 dark:text-blue-300 hover:underline mt-4"
            >
              Back to Tasks
            </button>
          </div>
        ) : (
          <ToDo
            user={user}
            onTasksChange={handleTasksChange}
            
          />
        )}
      </div>
    </div>
  );
};

export default Parent;
