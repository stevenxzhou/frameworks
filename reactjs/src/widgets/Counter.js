import { useState } from "react";

const Counter = () => {
  const {count, setCount} = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-pink-500 text-white p-4 rounded-lg">
        Tailwind CSS is working!
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Counter</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600"
        >
          Decrease
        </button>
        <span className="text-2xl font-semibold text-gray-700">{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
        >
          Increase
        </button>
      </div>
    </div>
  );
};

export default Counter;