import React from "react";
import { IconButton, RefreshIcon } from "components";

export interface ResetButtonProps {
  onClick: () => void;
}
export const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => (
  <IconButton type="button" onClick={onClick}>
    <RefreshIcon />
  </IconButton>
);
