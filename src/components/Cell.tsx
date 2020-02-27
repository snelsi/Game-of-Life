import styled from "styled-components";

export const Cell = styled.button`
  --deadCellBackground: #fff;
  --deadCellHoverBackground: #f4f4f4;
  --aliveCellBackground: #6fdc8c;
  --aliveCellHoverBackground: #42be65;

  border: 1px solid #262626;
  cursor: pointer;
  height: var(--cell-size, 24px);
  width: var(--cell-size, 24px);

  transition: background-color 0.1s ease-out;

  &:hover,
  &:focus {
    border-color: transparent;
    border-radius: 4px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 15);
    transform: scale(1.05);
  }
  &:focus {
    border-color: #0043ce;
  }
  &:not(.alive) {
    background-color: var(--deadCellBackground);

    &:hover {
      background-color: var(--deadCellHoverBackground);
    }
  }
  &.alive {
    background-color: var(--aliveCellBackground);

    &:hover {
      background-color: var(--aliveCellHoverBackground);
    }
  }
`;
