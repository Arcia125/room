import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import StyledNavbar from './styles/Navbar';
import logoText from '../logoText.svg';

const Navbar: FunctionComponent = () => {
  return (
    <StyledNavbar>
      <Link to="/">
        <img src={logoText} alt="Room Logo" />
      </Link>
    </StyledNavbar>
  );
};

export default Navbar;
