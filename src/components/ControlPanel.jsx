
import React, { useState } from 'react';
import './ControlPanel.css';
import './resultDisplay.css';

const ControlPanel = ({ onRun }) => {
  const [mapInput, setMapInput] = useState("");
  const [position, setPosition] = useState("");
  const [direction, setDirection] = useState("");
  const [maxPower, setMaxPower] = useState("");
  const [chargeRate, setChargeRate] = useState("");
  const [commands, setCommands] = useState("");

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
    <form onSubmit={handleSubmit} className="control-panel">
      <h2 className="panel-heading"> Mars Rover Mission Control</h2>

      <div className="form-group">
        <label> Plateau Map (comma-separated, bottom to top):</label>
        <textarea
          value={mapInput}
          onChange={(e) => setMapInput(e.target.value)}
          rows={3}
          className="input-box textarea"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label> Initial Position (x,y):</label>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="input-box"
          />
        </div>
        <div className="form-group">
          <label> Direction (N/E/S/W):</label>
          <input
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="input-box"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label> Max Power:</label>
          <input
            type="number"
            value={maxPower}
            onChange={(e) => setMaxPower(e.target.value)}
            className="input-box"
          />
        </div>
        <div className="form-group">
          <label> Charging Rate:</label>
          <input
            type="number"
            value={chargeRate}
            onChange={(e) => setChargeRate(e.target.value)}
            className="input-box"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Command Sequence:</label>
        <input
          value={commands}
          onChange={(e) => setCommands(e.target.value)}
          className="input-box"
        />
      </div>

      <button type="submit" className="submit-button">Run Mission 🚀</button>
    </form>
  );
};

export default ControlPanel;
