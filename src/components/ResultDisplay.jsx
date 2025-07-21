const ResultDisplay = ({ result }) => (
  <div className="mt-6 bg-green-100 p-4 rounded">
    <h2 className="font-bold mb-2">📋 Mission Result</h2>
    <p><strong>Final Position:</strong> [{result.final_state.position.join(', ')}]</p>
    <p><strong>Direction:</strong> {result.final_state.direction}</p>
    <p><strong>Power:</strong> {result.final_state.power}</p>
    <p><strong>Scientific Data:</strong> {result.final_state.scientific_data}</p>
    <p><strong>Status:</strong> {result.status}</p>
  </div>
);

export default ResultDisplay;
