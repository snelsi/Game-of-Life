import styled from "styled-components";

export const IconButton = styled.button`
  border-radius: 50%;
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;

  align-items: center;
  display: flex;
  justify-content: center;

  width: 48px;
  height: 48px;
  outline: none;

  transition: all 0.2s ease;

  &:focus,
  &:hover {
    transform: scale(1.05);
  }
  &:focus {
    border-color: #1063ff;
  }
  &:hover {
    background-color: #eee;
  }

  &:active {
    transform: scale(0.95);
    background-color: #ddd;
  }
`;
