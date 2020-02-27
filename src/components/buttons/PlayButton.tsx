import React from "react";
import { ButtonBase, PlayIcon, PauseIcon } from "components";

export interface PlayButtonProps {
  onClick: () => void;
  play: boolean;
}
export const PlayButton: React.FC<PlayButtonProps> = ({ onClick, play }) => (
  <ButtonBase onClick={onClick}>{play ? <PauseIcon /> : <PlayIcon />}</ButtonBase>
);
