const GridDisplay = ({ map, rover }) => {
  return (
    <div className="mt-4">
      <h2 className="font-bold mb-2">🗺️ Plateau Map</h2>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${map[0].length}, 40px)` }}>
        {map
          .slice()
          .reverse()
          .flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const actualRow = map.length - 1 - rowIndex;
              const roverHere = rover?.position[0] === colIndex && rover?.position[1] === actualRow;
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-10 h-10 flex items-center justify-center border rounded text-sm ${
                    roverHere ? 'bg-yellow-300 font-bold' : 'bg-white'
                  }`}
                >
                  {roverHere ? rover.direction : cell}
                </div>
              );
            })
          )}
      </div>
    </div>
  );
};

export default GridDisplay;