// list-components.js - A helper script to list all registered components
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to list all components in the registry
function listComponentsInRegistry() {
  try {
    const appJsxPath = path.join(__dirname, 'src', 'App.jsx');
    const content = fs.readFileSync(appJsxPath, 'utf8');
    
    // Find the componentList array
    const componentListRegex = /const componentList = \[([\s\S]*?)\];/;
    const match = content.match(componentListRegex);
    
    if (!match) {
      console.error('Could not find componentList array in App.jsx');
      return [];
    }
    
    // Extract component names
    const componentListStr = match[1].trim();
    if (!componentListStr) {
      return [];
    }
    
    // Parse the component list using regex to extract component names
    const componentNames = [];
    const componentRegex = /"([^"]+)"/g;
    let componentMatch;
    
    while ((componentMatch = componentRegex.exec(componentListStr)) !== null) {
      componentNames.push(componentMatch[1]);
    }
    
    return componentNames;
  } catch (error) {
    console.error('Error reading component registry:', error);
    return [];
  }
}

// Function to list all component files in the components directory
function listComponentFiles() {
  try {
    const componentsDir = path.join(__dirname, 'src', 'components');
    const files = fs.readdirSync(componentsDir);
    
    // Filter for .jsx and .tsx files and remove extensions
    const componentFiles = files
      .filter(file => file.endsWith('.jsx') || file.endsWith('.tsx'))
      .map(file => {
        const name = file.replace(/\.(jsx|tsx)$/, '');
        const extension = file.endsWith('.jsx') ? 'jsx' : 'tsx';
        return { name, extension };
      });
    
    return componentFiles;
  } catch (error) {
    console.error('Error reading components directory:', error);
    return [];
  }
}

// Function to check if a component is in the registry
function isInRegistry(name, registryComponents) {
  return registryComponents.includes(name);
}

// Main function
function main() {
  console.log('=== Claude React Component Kit ===\n');
  
  // Get components from registry and file system
  const registryComponents = listComponentsInRegistry();
  const fileComponents = listComponentFiles();
  
  console.log(`Found ${registryComponents.length} components in registry and ${fileComponents.length} component files.\n`);
  
  // Show registered components
  console.log('=== Registered Components ===');
  if (registryComponents.length === 0) {
    console.log('No components registered. Use "npm run add ComponentName" to add one.');
  } else {
    registryComponents.forEach((name, index) => {
      const fileInfo = fileComponents.find(comp => comp.name === name);
      const status = fileInfo 
        ? `[${fileInfo.extension}]` 
        : '[MISSING FILE]';
      
      console.log(`${index + 1}. ${name} ${status}`);
    });
  }
  
  console.log('\n=== Component Files Not in Registry ===');
  const unregisteredFiles = fileComponents.filter(file => !isInRegistry(file.name, registryComponents));
  
  if (unregisteredFiles.length === 0) {
    console.log('All component files are registered.');
  } else {
    unregisteredFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file.name}.${file.extension} (run "npm run add ${file.name}" to register)`);
    });
  }
  
  console.log('\n=== Access Information ===');
  console.log('• Home page: http://localhost:5173/');
  if (registryComponents.length > 0) {
    console.log('• First component: http://localhost:5173/component/' + registryComponents[0]);
  }
  
  console.log('\n=== Commands ===');
  console.log('• Add component: npm run add ComponentName');
  console.log('• Delete component: npm run delete ComponentName');
  console.log('• Start dev server: npm run dev');
}

main();