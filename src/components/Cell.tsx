import * as React from "react";
import styled from "styled-components";

export const CellButton = styled.button`
  --deadCellBackground: #fff;
  --deadCellHoverBackground: #f4f4f4;
  --aliveCellBackground: #6fdc8c;
  --aliveCellHoverBackground: #42be65;

  border: none;
  cursor: pointer;
  height: var(--cell-size, 24px);
  width: var(--cell-size, 24px);

  &:hover,
  &:focus {
    border-color: transparent;
    border-radius: 3px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
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
    box-shadow: 0 0 0 1px #161616;

    &:hover {
      background-color: var(--aliveCellHoverBackground);
    }
  }
`;

interface CellProps {
  alive: boolean;
  onClick: () => void;
}
export const Cell: React.FC<CellProps> = React.memo(
  ({ alive, onClick }) => <CellButton className={alive ? "alive" : ""} onMouseDown={onClick} />,
  (prevProps, nextProps) => prevProps.alive === nextProps.alive,
);
