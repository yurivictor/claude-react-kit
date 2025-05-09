# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Claude React Kit is a lightweight development environment for creating, running, and managing React components. It's designed to seamlessly integrate with components created by Claude, allowing users to download and view them in a browser without manual configuration.

## Commands

### Development

- **Start development server**: `npm run dev`
  - This will start the Vite development server at http://localhost:5173/

- **Build for production**: `npm run build`
  - Builds the application for production deployment

- **Preview production build**: `npm run preview`
  - Runs the production build locally

### Component Management

- **Add a component to registry**: `npm run add ComponentName`
  - Registers an existing component in src/components/ to be accessible in the UI
  - Component files can be either .jsx or .tsx

- **Remove a component from registry**: `npm run delete ComponentName`
  - Removes a component from the registry (does not delete the file)

- **List all components**: `npm run list`
  - Shows all registered components and component files not in registry

## Architecture

### Core Functionality

1. **Dynamic Component Loading**
   - App.jsx contains a `ComponentLoader` that dynamically imports components based on the URL path parameter
   - Supports both JSX and TSX components through dynamic imports
   - Error handling for missing components

2. **Component Registry System**
   - Components are registered in the `componentList` array within App.jsx
   - Helper scripts (add-component.js, delete-component.js, list-components.js) manage this registry
   - Components are accessible at `/component/ComponentName` routes

3. **Built-in Libraries**
   - Tailwind CSS for styling
   - Recharts for data visualization
   - Lucide icons
   - Support for TypeScript
   - Additional utility libraries: Lodash, D3, MathJS

### Workflow

1. Save a component file to `src/components/ComponentName.jsx` or `.tsx`
2. Register it using `npm run add ComponentName`
3. Access it at http://localhost:5173/component/ComponentName
4. View all components at http://localhost:5173/

## File Structure

- `src/components/` - Directory for all React components
- `src/App.jsx` - Main application with routing and component management
- `add-component.js`, `delete-component.js`, `list-components.js` - Helper scripts
- `vite.config.mjs` - Vite configuration (includes base path for production deployment)