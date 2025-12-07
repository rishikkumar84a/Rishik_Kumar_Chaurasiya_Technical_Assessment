import React from 'react';
import { PipelineCanvas } from './components/PipelineCanvas/PipelineCanvas';
import { Toolbar } from './components/Toolbar/Toolbar';
import { SubmitButton } from './components/SubmitButton/SubmitButton';
import { ValidationPanel } from './components/ValidationPanel/ValidationPanel';
import './App.css';

/**
 * Main App Component
 * VectorShift Frontend Technical Assessment
 * Author: Rishik Kumar Chaurasiya
 */
function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>VectorShift Pipeline Builder</h1>
        <p>Drag nodes, create connections, and build your pipeline</p>
      </header>
      
      <Toolbar />
      <SubmitButton />
      <ValidationPanel />
      <PipelineCanvas />
    </div>
  );
}

export default App;
