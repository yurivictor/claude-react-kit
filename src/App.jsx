import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

// ComponentLoader will dynamically import components
const ComponentLoader = () => {
  const { componentName } = useParams();
  const [Component, setComponent] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadComponent = async () => {
      try {
        // Try to import .jsx first, then .tsx if that fails
        try {
          const module = await import(`./components/${componentName}.jsx`);
          setComponent(() => module.default);
        } catch (jsxError) {
          try {
            const module = await import(`./components/${componentName}.tsx`);
            setComponent(() => module.default);
          } catch (tsxError) {
            throw new Error(`Could not load component ${componentName} (.jsx or .tsx)`);
          }
        }
      } catch (err) {
        console.error("Failed to load component:", err);
        setError(`Component "${componentName}" not found`);
      }
    };
    
    loadComponent();
  }, [componentName]);
  
  
  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }
  
  if (!Component) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return <Component />;
};

// ComponentList scans the components directory and lists all available components
const ComponentList = () => {
  // This is a workaround since we can't directly read the file system
  // In a real app, this would be dynamically generated
  const componentList = [
    "ExampleComponent",
    "TypeScriptExample",
    // Add the names of your other components here
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Claude React Component Kit</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Available Components:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {componentList.map(name => (
            <div 
              key={name}
              className="border rounded-lg hover:shadow-md transition-shadow"
            >
              <Link 
                to={`/component/${name}`}
                className="block p-4"
              >
                <div className="font-medium text-blue-600 mb-1">{name}</div>
                <div className="text-sm text-gray-500">Click to view component</div>
              </Link>
              <div className="px-4 py-2 border-t flex justify-end">
                <button 
                  onClick={() => {
                    if (confirm(`Open terminal and run "npm run delete ${name}" to remove this component from the registry?`)) {
                      console.log(`Run: npm run delete ${name}`);
                    }
                  }}
                  className="text-xs text-red-600 cursor-pointer hover:text-red-800"
                >
                  Remove from registry
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-700">Adding new components:</h3>
        <ol className="list-decimal pl-5 text-yellow-800 mt-2">
          <li>Save the component file to <code>src/components/ComponentName.jsx</code></li>
          <li>Run <code>npm add ComponentName</code> or add the component name to the componentList array in App.jsx</li>
          <li>Access it at <code>/component/ComponentName</code></li>
        </ol>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto p-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
              Home
            </Link>
          </div>
        </nav>
        
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<ComponentList />} />
            <Route path="/component/:componentName" element={<ComponentLoader />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;