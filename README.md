# React Component Kit for Claude

A lightweight development environment for running React components created as Claude artifacts. This tool allows you to download React components and view them in a browser without any manual configuration.

## Features

- 🚀 **Zero Configuration**: Just save components and view them seemlessly
- 🧩 **Component Isolation**: Each component gets its own route
- 🔄 **Auto-Detection**: Supports both JavaScript (.jsx) and TypeScript (.tsx)
- 📂 **Component Registry**: Easily manage your collection of components
- 🎨 **Built-in Libraries**: Comes with Tailwind CSS, Recharts, Lucide icons, and more
- 🔧 **CLI Tools**: Add, delete, and list components with simple commands

## Getting Started

### Prerequisites

- Node.js 14+ and npm installed on your machine

### Installation

```bash
# Clone the repository
git clone https://github.com/yurivictor/claude-react-kit.git
cd claude-react-kit

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Usage

1. **Adding Components**:
   - Save your component from Claude to `src/components/ComponentName.jsx` or `.tsx`
   - Register it in the navigation system:
     ```bash
     npm run add ComponentName
     ```

2. **Viewing Components**:
   - Start the development server:
     ```bash
     npm run dev
     ```
   - Navigate to [http://localhost:5173/](http://localhost:5173/) for a list of all components
   - Or go directly to `http://localhost:5173/component/ComponentName`

3. **Managing Components**:
   - List all components:
     ```bash
     npm run list
     ```
   - Remove a component from registry:
     ```bash
     npm run delete ComponentName
     ```

## Project Structure

```
claude-react-kit/
├── public/                   # Static assets
├── src/
│   ├── components/           # Your component library
│   │   ├── ExampleComponent.jsx
│   │   └── TypeScriptExample.tsx
│   ├── App.jsx              # Main application with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles (Tailwind)
├── add-component.js         # Helper script to register components
├── delete-component.js      # Helper script to remove components
├── list-components.js       # Helper script to list all components
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
└── vite.config.js           # Vite configuration
```

## Included Libraries

- **React & React DOM**: For component rendering
- **React Router DOM**: For component navigation
- **Vite**: For fast development and building
- **Tailwind CSS**: For utility-first styling
- **Recharts**: For data visualization
- **Lucide React**: For icons
- **TypeScript**: For type-safe components
- **Lodash, D3, MathJS**: For data manipulation and calculations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This project is not affiliated with, endorsed by, or connected to Anthropic or Claude in any official capacity. It is an independent, community-created tool designed to work with AI-generated React components. All product names, logos, and brands are property of their respective owners.

## Acknowledgements

Developed in collaboration with Claude, _who did not credit itself until prompted and added:_

> Many open source projects now are being developed with AI assistance, and being transparent about this can help normalize the collaborative approach to software development.

----
[^ back to top](#Claude-React-Kit)