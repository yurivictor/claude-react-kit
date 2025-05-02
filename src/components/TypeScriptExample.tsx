import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { RotateCcw, Plus, Minus } from "lucide-react";

// Define types for our data
interface DataItem {
  name: string;
  value: number;
}

// Define props interface
interface CounterProps {
  initialValue: number;
  label: string;
  onValueChange: (value: number) => void;
}

// A typed counter component
const Counter: React.FC<CounterProps> = ({ initialValue, label, onValueChange }) => {
  const [value, setValue] = useState(initialValue);

  const increment = () => {
    const newValue = value + 1;
    setValue(newValue);
    onValueChange(newValue);
  };

  const decrement = () => {
    const newValue = value - 1;
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-50">
      <span className="text-gray-700 mb-2">{label}</span>
      <div className="flex items-center">
        <button 
          onClick={decrement}
          className="p-2 bg-red-100 rounded-full hover:bg-red-200"
        >
          <Minus size={16} className="text-red-500" />
        </button>
        <span className="mx-4 text-2xl font-semibold">{value}</span>
        <button 
          onClick={increment}
          className="p-2 bg-green-100 rounded-full hover:bg-green-200"
        >
          <Plus size={16} className="text-green-500" />
        </button>
      </div>
    </div>
  );
};

// Initial data
const initialData: DataItem[] = [
  { name: "Category A", value: 10 },
  { name: "Category B", value: 15 },
  { name: "Category C", value: 7 },
  { name: "Category D", value: 20 },
];

const TypeScriptExample: React.FC = () => {
  const [data, setData] = useState<DataItem[]>(initialData);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Handler for counter value changes
  const handleCounterChange = (index: number, newValue: number) => {
    const newData = [...data];
    newData[index].value = newValue;
    setData(newData);
  };

  // Reset data to initial values
  const resetData = () => {
    setData([...initialData]);
  };

  return (
    <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">TypeScript Example</h2>
        <div className="flex space-x-2">
          <button
            onClick={resetData}
            className="flex items-center px-3 py-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-700"
          >
            <RotateCcw size={16} className="mr-1" />
            Reset Data
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {data.map((item, index) => (
          <Counter
            key={item.name}
            initialValue={item.value}
            label={item.name}
            onValueChange={(value) => handleCounterChange(index, value)}
          />
        ))}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
            <Bar 
              dataKey="value" 
              fill={darkMode ? "#8884d8" : "#4C1D95"} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TypeScriptExample;