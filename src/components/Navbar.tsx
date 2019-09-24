import React, { FunctionComponent } from 'react';
import StyledNavbar from './styles/Navbar';
import logoText from '../logoText.svg';

const Navbar: FunctionComponent = () => {
  return (
    <StyledNavbar>
      <a>
        <img src={logoText} alt="Room Logo" />
      </a>
    </StyledNavbar>
  );
};

export default Navbar;
