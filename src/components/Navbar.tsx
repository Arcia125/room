import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import StyledNavbar from './styles/Navbar';
import logoText from '../logoText.svg';
import { Link as StyledLink } from './styles/Link';
import { theme } from '../theme';

export interface NavbarProps {
  showLogin?: boolean;
}

const Navbar: FunctionComponent<NavbarProps> = ({ showLogin }) => {
  return (
    <StyledNavbar>
      <Link to="/">
        <img src={logoText} alt="Room Logo" />
      </Link>
      {showLogin && (
        <StyledLink color={theme.colors.gray} to="/login">
          LOGIN
        </StyledLink>
      )}
    </StyledNavbar>
  );
};

export default Navbar;
