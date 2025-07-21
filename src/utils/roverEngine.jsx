const directions = ["N", "E", "S", "W"];
const moves = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0]
};

const terrainCost = {
  E: 1,
  R: 2,
  X: Number.MAX_SAFE_INTEGER,
  C: 1,
  A: 1
};

export default function executeRoverCommands({ plateau_map, initial_state, max_power, charging_rate, command_sequence }) {
  let [x, y] = initial_state.position;
  let dir = initial_state.direction;
  let power = max_power;
  let data = 0;
  const height = plateau_map.length;
  const width = plateau_map[0].length;

  for (let cmd of command_sequence) {
    if (power < 0) {
      return fail(x, y, dir, data, 'Power Depleted');
    }

    if (cmd === 'L' || cmd === 'R') {
      if (power <= 0) return fail(x, y, dir, data, 'Power Depleted During Rotation');
      power--;
      const turn = cmd === 'L' ? -1 : 1;
      const newDirIndex = (directions.indexOf(dir) + turn + 4) % 4;
      dir = directions[newDirIndex];
    } else if (cmd === 'M') {
      const [dx, dy] = moves[dir];
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const cell = plateau_map[ny][nx];
      const cost = terrainCost[cell] ?? 1;
      if (cost === Number.MAX_SAFE_INTEGER) continue;
      if (power < cost) return fail(x, y, dir, data, 'Power Depleted During Movement');
      power -= cost;
      x = nx;
      y = ny;
    } else if (cmd === 'P') {
      if (power <= 0) return fail(x, y, dir, data, 'Power Depleted During Anomaly Processing');
      power--;
      if (plateau_map[y][x] === 'A') {
        data++;
      }
    }

    // Charging happens after the command is executed
    if (plateau_map[y][x] === 'C') {
      power = Math.min(max_power, power + charging_rate);
    }
  }

  return {
    final_state: {
      position: [x, y],
      direction: dir,
      power: Math.max(0, power),
      scientific_data: data
    },
    status: 'Mission Successful'
  };

  function fail(x, y, dir, data, reason) {
    return {
      final_state: {
        position: [x, y],
        direction: dir,
        power: 0,
        scientific_data: data
      },
      status: `Mission Failed: ${reason}`
    };
  }
}
