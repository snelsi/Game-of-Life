import React from "react";
import { ButtonBase, PlayIcon, PauseIcon } from "components";

export interface PlayButtonProps {
  onClick: () => void;
  play: boolean;
}
export const PlayButton: React.FC<PlayButtonProps> = React.memo(
  ({ onClick, play }) => (
    <ButtonBase onClick={onClick}>{play ? <PauseIcon /> : <PlayIcon />}</ButtonBase>
  ),
  (prevProps, nextProps) => prevProps.play === nextProps.play,
);
