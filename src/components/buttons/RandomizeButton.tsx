import React from "react";
import { IconButton, DiceIcon } from "components";

export interface RandomizeButtonProps {
  onClick: () => void;
}
export const RandomizeButton: React.FC<RandomizeButtonProps> = ({ onClick }) => (
  <IconButton type="button" onClick={onClick}>
    <DiceIcon />
  </IconButton>
);
