import { useState } from "react";
import { useSet } from "scripts";

export interface Data {
  aliveCells: Set<string>;
  rows: number;
  columns: number;
}

/**
 * row, column  => "row-column"
 */
export const toCellKey = (row: number, column: number) => `${row}-${column}`;

const operations = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const countNeighbors = (
  row: number,
  column: number,
  aliveCells: Set<string>,
  rows: number,
  columns: number,
) =>
  operations.reduce((neighbors, [y, x]) => {
    const neighborsNeighborY = (y + row + columns) % columns;
    const neighborsNeighborX = (x + column + rows) % rows;
    if (aliveCells.has(toCellKey(neighborsNeighborY, neighborsNeighborX))) {
      neighbors++;
    }
    return neighbors;
  }, 0);

export const runSimulationOnce = ({ aliveCells, rows, columns }: Data): Set<string> => {
  if (aliveCells.size === 0) return aliveCells;

  const newSet = new Set<string>();
  const checkedCells = new Set<string>();

  aliveCells.forEach(aliveCell => {
    const [i, j] = aliveCell.split("-");

    const neighbors = operations.reduce((neighbors, [y, x]) => {
      const neighborY = (y + Number(i) + rows) % rows;
      const neighborX = (x + Number(j) + columns) % columns;
      const neighborKey = toCellKey(neighborY, neighborX);

      if (aliveCells.has(neighborKey)) {
        neighbors++;
      } else if (!checkedCells.has(neighborKey)) {
        const neighborsNeighbors = countNeighbors(neighborY, neighborX, aliveCells, rows, columns);
        if (neighborsNeighbors === 3) newSet.add(neighborKey);
        checkedCells.add(neighborKey);
      }
      return neighbors;
    }, 0);

    const key = toCellKey(Number(i), Number(j));
    const alive = aliveCells.has(key);

    if (neighbors === 3 || (alive && neighbors === 2)) {
      newSet.add(key);
    }
    checkedCells.add(key);
  });

  return newSet;
};

export const useGameOfLife = (
  numRows: number,
  numCols: number,
): [
  Data,
  {
    setRows: (newValue: number) => void;
    setColumns: (newValue: number) => void;
    setCellDead: (column: number, row: number) => void;
    setCellAlive: (column: number, row: number) => void;
    clearData: () => void;
    setRandomData: () => void;
    simulateOnce: () => void;
    has: (key: string) => boolean;
  },
] => {
  const [aliveCells, { add, remove, reset: clearData, has, setSet }] = useSet<string>();
  const [rows, setRows] = useState(numRows);
  const [columns, setColumns] = useState(numCols);

  const setCellDead = (row: number, column: number) => {
    if (row < 0 || row > rows || column < 0 || column > columns) return;
    remove(toCellKey(row, column));
  };

  const setCellAlive = (row: number, column: number) => {
    if (row < 0 || row > rows || column < 0 || column > columns) return;
    add(toCellKey(row, column));
  };

  const setRandomData = () => {
    clearData();
    const newSet = new Set<string>();
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (Math.random() > 0.7) newSet.add(toCellKey(i, j));
      }
    }
    setSet(newSet);
  };

  const simulateOnce = () => {
    setSet(runSimulationOnce({ aliveCells, rows, columns }));
  };

  return [
    { aliveCells, rows, columns },
    {
      setRows,
      setColumns,
      setCellDead,
      setCellAlive,
      clearData,
      setRandomData,
      simulateOnce,
      has,
    },
  ];
};
