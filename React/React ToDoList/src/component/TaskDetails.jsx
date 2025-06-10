import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


const fetchImage = async (taskText) => {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(taskText)}&client_id=${accessKey}`
    );
    const data = await response.json();
    const imageUrl =
      data?.results?.[0]?.urls?.regular ||
      `https://source.unsplash.com/600x400/?${taskText}`;

    return {
      image: imageUrl,
      description: `An image related to "${taskText}" fetched from Unsplash.`,
    };
  } catch (error) {
    console.error("Error fetching image:", error);
    return {
      image: `https://source.unsplash.com/600x400/?${taskText}`,
      description: `This is a fallback description for "${taskText}".`,
    };
  }
};

const TaskDetails = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const tasks = JSON.parse(localStorage.getItem(user.email + '_tasks')) || [];

    if (index !== undefined && tasks[index]) {
      const task = tasks[index];
      fetchImage(task.text).then(({ image, description }) => {
        setTask({ ...task, image, description });
        setLoading(false);
      });
    } else {
      navigate('/');
    }
  }, [index, navigate]);

  if (loading || !task)
    return <div className="text-center  mt-10">Loading...</div>;

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center dark:bg-gray-800 bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">{task.text}</h2>
        <img
          src={task.image}
          alt={task.text}
          className="rounded-lg w-full h-64 object-cover mb-4"
        />
        <p className="text-gray-800">{task.description}</p>
        <button
          className="mt-4 text-blue-600 font-semibold hover:underline"
          onClick={() => navigate(-1)}
        >
          ← Back to Tasks
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
