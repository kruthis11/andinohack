import React, { useState } from 'react';

const ControlPanel = ({ onRun }) => {
  const [mapInput, setMapInput] = useState("E,E\nA,C");
  const [position, setPosition] = useState("0,0");
  const [direction, setDirection] = useState("N");
  const [maxPower, setMaxPower] = useState(5);
  const [chargeRate, setChargeRate] = useState(1);
  const [commands, setCommands] = useState("MRMPP");

  const parseMap = (text) => {
    return text.trim().split("\n").map(row => row.split(","));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [x, y] = position.split(",").map(Number);
    const data = {
      plateau_map: parseMap(mapInput),
      initial_state: {
        position: [x, y],
        direction: direction.toUpperCase()
      },
      max_power: parseInt(maxPower),
      charging_rate: parseInt(chargeRate),
      command_sequence: commands.toUpperCase()
    };
    onRun(data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-4 space-y-2">
      <div>
        <label className="block font-semibold">Plateau Map (rows of comma-separated values):</label>
        <textarea value={mapInput} onChange={(e) => setMapInput(e.target.value)} rows={3} className="w-full border p-1" />
      </div>
      <div>
        <label className="block font-semibold">Initial Position (x,y):</label>
        <input value={position} onChange={(e) => setPosition(e.target.value)} className="w-full border p-1" />
      </div>
      <div>
        <label className="block font-semibold">Direction (N, E, S, W):</label>
        <input value={direction} onChange={(e) => setDirection(e.target.value)} className="w-full border p-1" />
      </div>
      <div>
        <label className="block font-semibold">Max Power:</label>
        <input type="number" value={maxPower} onChange={(e) => setMaxPower(e.target.value)} className="w-full border p-1" />
      </div>
      <div>
        <label className="block font-semibold">Charging Rate:</label>
        <input type="number" value={chargeRate} onChange={(e) => setChargeRate(e.target.value)} className="w-full border p-1" />
      </div>
      <div>
        <label className="block font-semibold">Command Sequence:</label>
        <input value={commands} onChange={(e) => setCommands(e.target.value)} className="w-full border p-1" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Run Mission
      </button>
    </form>
  );
};

export default ControlPanel;