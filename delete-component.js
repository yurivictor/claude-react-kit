// delete-component.js - A helper script to remove components from the registry
const fs = require('fs');
const path = require('path');
const readline = require('readline');

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
      rl.question('Enter the component name to delete from registry: ', (answer) => {
        resolve(answer);
      });
    }
  });
}

// Check if component file exists
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

// Function to prompt for confirmation before deletion
function confirmDeletion(componentName, fileInfo) {
  return new Promise((resolve) => {
    let message = `Remove "${componentName}" from component registry?`;
    
    if (fileInfo.exists) {
      message += `\nNOTE: The actual file "${path.basename(fileInfo.path)}" will NOT be deleted, only removed from the registry.`;
    }
    
    rl.question(`${message} (y/N): `, (answer) => {
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

// Function to update the App.jsx file to remove the component
async function removeFromRegistry(componentName) {
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
    
    // Check if component is in the list
    const componentPattern = new RegExp(`"${componentName}"\\s*,?|,\\s*"${componentName}"`, 'i');
    const matchComponent = currentList.match(componentPattern);
    
    if (!matchComponent) {
      console.log(`Component "${componentName}" is not in the registry.`);
      return false;
    }
    
    // Remove the component from the list
    let newList = currentList.replace(componentPattern, '');
    
    // Clean up any potential double commas or trailing commas
    newList = newList.replace(/,\s*,/g, ',').replace(/,\s*$/, '');
    
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
    
    // Check if the component file exists
    const componentFile = checkComponentFile(componentName);
    
    // Confirm deletion
    const confirmed = await confirmDeletion(componentName, componentFile);
    
    if (!confirmed) {
      console.log('Operation cancelled.');
      rl.close();
      return;
    }
    
    // Remove from registry
    const removed = await removeFromRegistry(componentName);
    
    if (removed) {
      console.log(`Component "${componentName}" has been removed from the registry.`);
      
      if (componentFile.exists) {
        console.log(`Note: The component file "${path.basename(componentFile.path)}" still exists in the components directory.`);
        console.log(`If you want to delete the file as well, you can do so manually.`);
      }
    } else {
      console.log(`No changes were made to the registry.`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
  
  rl.close();
}

main();