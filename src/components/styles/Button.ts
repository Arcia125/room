import styled, { css, StyledComponent } from 'styled-components';

import { getThemeSpacing } from '../../utils/styleUtils';

const buttonColorStyles = (props: { color?: 'primary'; basic?: boolean }) => {
  if (props.basic) {
    return css`
      color: ${p => p.theme.colors.grayBlue};
      background-color: transparent;
    `;
  }

  if (props.color === 'primary') {
    return css`
      color: #fff;
      background-color: ${p => p.theme.colors.blueAccent};
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  {
    basic?: boolean;
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
  font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 16px;
  padding: ${getThemeSpacing};
  display: flex;
  align-items: center;
  ${buttonColorStyles};
` as StyledButton;

export { Button };
