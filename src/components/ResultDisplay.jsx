
import './resultDisplay.css';
const ResultDisplay = ({ result }) => (
  <div className="center-container">
    <div className="result-display">
      <h2 className="result-heading"> Mission Result</h2>
      <p><strong>Final Position:</strong> [{result.final_state.position.join(', ')}]</p>
      <p><strong> Direction:</strong> {result.final_state.direction}</p>
      <p><strong>Power:</strong> {result.final_state.power}</p>
      <p><strong> Scientific Data:</strong> {result.final_state.scientific_data}</p>
      <p><strong>Status:</strong> <span className={result.status.includes('Successful') ? 'status-success' : 'status-failed'}>{result.status}</span></p>
    </div>
  </div>
);

export default ResultDisplay;