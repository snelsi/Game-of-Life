import styled from "styled-components";

export const ButtonBase = styled.button`
  background-color: #1063ff;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  outline: none;

  transition: all 0.15s ease;

  width: 64px;
  height: 64px;

  z-index: 120;

  & svg {
    height: 36px;
    width: 36px;
  }

  &:hover {
    background-color: #0043ce;
    transform: scale(1.05);
  }

  &:focus {
    border-color: #0043ce;
    transform: scale(1.05);
  }
`;
