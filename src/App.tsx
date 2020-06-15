import React, { useState } from "react";
import { Table, ButtonsGroup, PlayButton, RandomizeButton, ResetButton } from "components";
import styled from "styled-components";
import { toCellKey, useGameOfLife, useInterval } from "scripts";

const numRows = 40;
const numCols = 50;

const App: React.FC = () => {
  const [
    { aliveCells, rows, columns },
    { has, setCellDead, setCellAlive, clearData, setRandomData, simulateOnce },
  ] = useGameOfLife(numRows, numCols);
  const [running, setRunning] = useState(false);

  useInterval(() => {
    if (running) simulateOnce();
  }, 200);

  const handleCellClick = (row: number, column: number) =>
    has(toCellKey(row, column)) ? setCellDead(row, column) : setCellAlive(row, column);

  const randomize = () => setRandomData();
  const clear = () => clearData();
  const toggleRun = () => setRunning(!running);

  return (
    <Container>
      <Header>
        <h2>The Game of Life</h2>
        <div>
          <RandomizeButton onClick={randomize} />
          <ResetButton onClick={clear} />
        </div>
      </Header>
      <Table aliveCells={aliveCells} onCellClick={handleCellClick} rows={rows} columns={columns} />
      <ButtonsGroup>
        <PlayButton onClick={toggleRun} play={running} />
      </ButtonsGroup>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1080px;
  margin: auto;
  padding: 20px;
  & header {
    margin-bottom: 16px;
  }

  @media (max-width: 420px) {
    padding: 20px 0;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    justify-content: space-around;
  }

  @media (max-width: 420px) {
    padding: 0 20px;
  }
`;

export default App;
