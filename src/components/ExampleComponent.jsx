import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

// Sample data
const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
];

const ExampleComponent = () => {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Example Component</h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setCount(count - 1)}
            className="p-2 rounded-full bg-red-100 hover:bg-red-200"
          >
            <ArrowDownCircle className="text-red-500" size={24} />
          </button>
          
          <div className="text-3xl font-bold">{count}</div>
          
          <button
            onClick={() => setCount(count + 1)}
            className="p-2 rounded-full bg-green-100 hover:bg-green-200"
          >
            <ArrowUpCircle className="text-green-500" size={24} />
          </button>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={darkMode ? "#8884d8" : "#4C1D95"} 
              strokeWidth={2} 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExampleComponent;