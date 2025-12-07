import React from 'react';
import { useStore } from '../../store';
import './ValidationPanel.css';

/**
 * ValidationPanel Component - Display validation status and errors
 */
export const ValidationPanel = () => {
  const { isValid, validationErrors } = useStore();

  if (isValid) {
    return (
      <div className="validation-panel valid">
        <div className="validation-header">
          <span className="validation-icon">✓</span>
          <span>Pipeline Valid</span>
        </div>
      </div>
    );
  }

  return (
    <div className="validation-panel invalid">
      <div className="validation-header">
        <span className="validation-icon">⚠</span>
        <span>Validation Errors</span>
      </div>
      <ul className="validation-errors">
        {validationErrors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};
