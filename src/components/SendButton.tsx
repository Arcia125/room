import React from 'react';
import styled from 'styled-components';

import { Button } from './styles/Button';

const StyledSvg = styled.svg``;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SendButton: React.FunctionComponent<{ [key: string]: any }> = props => {
  return (
    <Button {...props}>
      <StyledSvg
        width="20"
        height="20"
        viewBox="5 5 10 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <path
            d="M11.7683 21.5379L17.3812 6.36591L2.52139 12.7597L6.11252 16.1786L14.4552 9.44821L8.16739 18.1293L11.7683 21.5379Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect
              width="17"
              height="17"
              fill="white"
              transform="translate(0 12.3292) rotate(-46.4893)"
            />
          </clipPath>
        </defs>
      </StyledSvg>
    </Button>
  );
};

SendButton.propTypes = {};

export default SendButton;
