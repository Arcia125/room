import styled from 'styled-components';

import { Input as InputComponent } from '../Input';

export const Input = styled(InputComponent)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;
  & input {
    height: 48px;
  }
  & label {
    color: #bdbdbd;
    font-size: 16px;
    line-height: 24px;
    font-weight: normal;
  }
`;
