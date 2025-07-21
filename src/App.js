import React, { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import GridDisplay from './components/GridDisplay';
import ResultDisplay from './components/ResultDisplay';
import executeRoverCommands from './utils/roverEngine';

function App() {
  const [input, setInput] = useState(null);
  const [result, setResult] = useState(null);

  const handleRunSimulation = (data) => {
    setInput(data);
    const output = executeRoverCommands(data);
    setResult(output);
  };

  return (
  <div className="max-w-3xl mx-auto">
    <h1> Mars Rover Pathfinder</h1>
    <ControlPanel onRun={handleRunSimulation} />
    {input && <GridDisplay map={input.plateau_map} rover={result?.final_state} />}
    {result && <ResultDisplay result={result} />}
  </div>
);

}

export default App;