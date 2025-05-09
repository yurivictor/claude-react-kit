// add-component.js - A helper script to add components to the registry
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get the component name from command line arguments or prompt
function getComponentName() {
  return new Promise((resolve) => {
    const args = process.argv.slice(2);
    if (args.length > 0) {
      resolve(args[0]);
    } else {
      rl.question('Enter the component name: ', (answer) => {
        resolve(answer);
      });
    }
  });
}

// Check if component file exists (checking both .jsx and .tsx extensions)
function checkComponentFile(componentName) {
  const componentsDir = path.join(__dirname, 'src', 'components');
  const jsxPath = path.join(componentsDir, `${componentName}.jsx`);
  const tsxPath = path.join(componentsDir, `${componentName}.tsx`);
  
  if (fs.existsSync(jsxPath)) {
    return { exists: true, path: jsxPath, extension: 'jsx' };
  } else if (fs.existsSync(tsxPath)) {
    return { exists: true, path: tsxPath, extension: 'tsx' };
  } else {
    return { exists: false, path: null, extension: null };
  }
}

// Function to update the App.jsx file with the new component name
async function updateAppJsx(componentName, fileExtension) {
  const appJsxPath = path.join(__dirname, 'src', 'App.jsx');
  
  try {
    let content = fs.readFileSync(appJsxPath, 'utf8');
    
    // Find the componentList array
    const componentListRegex = /const componentList = \[([\s\S]*?)\];/;
    const match = content.match(componentListRegex);
    
    if (!match) {
      console.error('Could not find componentList array in App.jsx');
      return false;
    }
    
    // Get the current list content
    const currentList = match[1];
    
    // Check if component is already in the list
    const componentRegex = new RegExp(`"${componentName}"`, 'i');
    if (componentRegex.test(currentList)) {
      console.log(`Component "${componentName}" is already in the list.`);
      return true;
    }
    
    // Add the new component to the list
    const newList = currentList.trim() 
      ? currentList + `,\n    "${componentName}"`
      : `"${componentName}"`;
    
    // Replace the old list with the new one
    const newContent = content.replace(componentListRegex, `const componentList = [${newList}];`);
    
    // Write the updated content back to the file
    fs.writeFileSync(appJsxPath, newContent, 'utf8');
    return true;
  } catch (error) {
    console.error('Error updating App.jsx:', error);
    return false;
  }
}

// Main function
async function main() {
  try {
    const componentName = await getComponentName();
    
    if (!componentName) {
      console.error('Component name is required.');
      rl.close();
      return;
    }
    
    // Check if the component file exists (either .jsx or .tsx)
    const componentFile = checkComponentFile(componentName);
    
    if (!componentFile.exists) {
      console.log(`Warning: Component file "${componentName}.jsx" or "${componentName}.tsx" does not exist in src/components/.`);
      console.log('Make sure to create this file before trying to use the component.');
    } else {
      console.log(`Found component file: ${path.basename(componentFile.path)}`);
    }
    
    // Update App.jsx
    const updated = await updateAppJsx(componentName, componentFile.extension);
    
    if (updated) {
      console.log(`Component "${componentName}" has been added to the registry.`);
      console.log(`You can now access it at: http://localhost:5173/component/${componentName}`);
    } else {
      console.error('Failed to update component registry.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
  
  rl.close();
}

main();