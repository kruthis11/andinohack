
const movementDirections = ["N", "E", "S", "W"];
const movementVectors = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0]
};

const terrainPowerCost = {
  E: 1,
  R: 2, 
  X: Number.MAX_SAFE_INTEGER, 
  C: 1, 
  A: 1  
};

export default function executeRoverCommands({ plateau_map, initial_state, max_power, charging_rate, command_sequence }) {
  const numRows = plateau_map.length;
  const numCols = plateau_map[0].length;
  const terrainMap = [...plateau_map].reverse(); 

  let [x, y] = initial_state.position;
  let direction = initial_state.direction;
  let power = max_power;
  let scientificDataCollected = 0;

  for (let instruction of command_sequence) {
    if (power < 0) return fail(x, y, direction, scientificDataCollected, 'Power Depleted');

    if (instruction === 'L' || instruction === 'R') {
      if (power <= 0) return fail(x, y, direction, scientificDataCollected, 'Power Depleted During Rotation');
      power--;
      const turn = instruction === 'L' ? -1 : 1;
      const newDirIndex = (movementDirections.indexOf(direction) + turn + 4) % 4;
      direction = movementDirections[newDirIndex];

    } else if (instruction === 'M') {
      const [dx, dy] = movementVectors[direction];
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= numCols || ny >= numRows) continue;

      const terrain = terrainMap[ny][nx];
      const moveCost = terrainPowerCost[terrain] ?? 1;
      if (moveCost === Number.MAX_SAFE_INTEGER) continue;
      if (power < moveCost) return fail(x, y, direction, scientificDataCollected, 'Power Depleted During Movement');
      power -= moveCost;
      x = nx;
      y = ny;

    } else if (instruction === 'P') {
      if (power <= 0) return fail(x, y, direction, scientificDataCollected, 'Power Depleted During Anomaly Processing');
      power--;
      if (terrainMap[y][x] === 'A') {
        scientificDataCollected++;
      }
    }

    if (terrainMap[y][x] === 'C') {
      power = Math.min(max_power, power + charging_rate);
    }
  }

  return {
    final_state: {
      position: [x, y],
      direction,
      power: Math.max(0, power),
      scientific_data: scientificDataCollected
    },
    status: 'Mission Successful'
  };

  function fail(x, y, direction, scientificDataCollected, reason) {
    return {
      final_state: {
        position: [x, y],
        direction,
        power: 0,
        scientific_data: scientificDataCollected
      },
      status: `Mission Failed: ${reason}`
    };
  }
}
