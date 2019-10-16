import React, { FunctionComponent } from 'react';

import StyledNavbar from './styles/Navbar';
import { Link as StyledLink } from './styles/Link';
import { theme } from '../theme';
import Header from './Header';

export interface NavbarProps {
  showLogin?: boolean;
}

const Navbar: FunctionComponent<NavbarProps> = ({ showLogin }) => {
  return (
    <StyledNavbar>
      <Header />
      {showLogin && (
        <StyledLink color={theme.colors.gray} to="/login">
          LOGIN
        </StyledLink>
      )}
    </StyledNavbar>
  );
};

export default Navbar;
