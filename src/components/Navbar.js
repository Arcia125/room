import React from 'react';
import StyledNavbar from './styles/Navbar';
import logoText from '../logoText.svg';

const Navbar = props => {
  return (
    <StyledNavbar>
      <a href="/">
        <img src={logoText} alt="Room Logo" />
      </a>
    </StyledNavbar>
  );
};

export default Navbar;
