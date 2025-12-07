# VectorShift Frontend Technical Assessment

This project is a React-based pipeline builder with a Python/FastAPI backend, completed as part of the VectorShift technical assessment.

## Features

### 1. Node Abstraction
- **BaseNodeComponent**: A shared wrapper component that handles common UI elements (header, handles, styling) for all nodes.
- **Node Factory**: A centralized system to create and manage node instances.
- **Extensible Design**: Easy to add new nodes by extending `BaseNode` and creating a simple component wrapped in `BaseNodeComponent`.

### 2. Custom Nodes
In addition to the standard Input, Output, Text, and LLM nodes, 5 new custom nodes were added:
- **Filter Node**: For filtering data based on conditions.
- **Transform Node**: For text transformations (Uppercase, Lowercase, etc.).
- **Combine Node**: For merging two inputs.
- **Note Node**: A sticky note for documentation.
- **API Node**: For simulating API requests.

### 3. Text Node Logic
- **Auto-resize**: The text node automatically resizes its width and height based on the content.
- **Variable Detection**: Typing `{{variableName}}` inside the text node automatically creates a new input handle for that variable.

### 4. Backend Integration
- **DAG Validation**: The backend validates if the constructed pipeline is a Directed Acyclic Graph (DAG) using DFS.
- **Statistics**: Returns the count of nodes and edges.
- **Alert System**: The frontend displays a user-friendly alert with the validation results.

### 5. Styling
- **Modern UI**: Clean, professional design with a consistent color palette.
- **Interactive Elements**: Hover effects, smooth transitions, and a polished toolbar.

## Installation & Running

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- pip

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The app will run at `http://localhost:3000`.

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   *(If `requirements.txt` is missing, install: `pip install fastapi uvicorn`)*
3. Start the backend server:
   ```bash
   python main.py
   ```
   The API will run at `http://localhost:8000`.

## Usage
1. Drag nodes from the toolbar onto the canvas.
2. Connect nodes by dragging from an output handle to an input handle.
3. Use the Text Node to create dynamic variables.
4. Click "Submit Pipeline" to validate the graph and see statistics.

### Troubleshooting
- **Unknown node type error**: If you previously saw `Unknown node type: [object Object]`, pull the latest code, rerun `npm install`, restart `npm start`, and refresh the browser. The drag-and-drop handler now correctly registers the selected node type with the store.

## Author
Rishik Kumar Chaurasiya