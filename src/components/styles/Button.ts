import styled, { css, StyledComponent } from 'styled-components';

import { getThemeSpacing } from '../../utils/styleUtils';
import { ReactElement } from 'react';

const buttonColorStyles = (props: { color: 'primary' | undefined }) => {
  if (props.color === 'primary') {
    return css`
      color: #fff;
      background-color: #24468a;
      &:hover,
      &:active {
        color: #24468a;
        background-color: #fff;
      }
      &:disabled {
        background-color: #ccc;
      }
    `;
  }

  return css`
    color: #fff;
    background-color: #2f2f2f;
    &:hover,
    &:active {
      color: #2f2f2f;
      background-color: #fff;
    }
    &:disabled {
      background-color: #ccc;
    }
  `;
};

const buttonReset = css`
  outline: none;
  border: none;
`;

type StyledButton = StyledComponent<
  'button',
  any,
  {
    children: ReactElement | string;
    color?: 'primary';
    padding?: number | string;
    disabled?: boolean;
    type?: string;
  }
>;

const Button: StyledButton = styled.button`
  ${buttonReset};
  border-radius: 4px;
  transition: 325ms ease-in-out;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  font-size: 1.5rem;
  padding: ${getThemeSpacing};
  ${buttonColorStyles};
` as StyledButton;

export { Button };