import React, { useState } from 'react';
import { useStore } from '../../store';
import { submitPipeline } from '../../submit';
import './SubmitButton.css';

/**
 * SubmitButton Component - Submit pipeline to backend
 */
export const SubmitButton = () => {
  const { nodes, edges, isValid, validateGraph } = useStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate before submitting
    validateGraph();

    if (!isValid) {
      alert('Pipeline is invalid! Please fix errors before submitting.');
      return;
    }

    setLoading(true);

    try {
      const data = await submitPipeline(nodes, edges);

      // Show success alert with pipeline statistics
      alert(
        `Pipeline Submitted Successfully!\n\n` +
        `Number of Nodes: ${data.num_nodes}\n` +
        `Number of Edges: ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? 'Yes ✓' : 'No ✗'}`
      );
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-container">
      <button
        className={`submit-button ${!isValid ? 'disabled' : ''}`}
        onClick={handleSubmit}
        disabled={!isValid || loading}
      >
        {loading ? 'Submitting...' : 'Submit Pipeline'}
      </button>
      {!isValid && (
        <div className="submit-warning">
          ⚠️ Pipeline has validation errors
        </div>
      )}
    </div>
  );
};
