import { Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(ReactRouterLink)`
  color: ${p => p.theme.colors.blueLink};
  text-decoration: none;
  font-size: 16px;
`;
