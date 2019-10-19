import React from 'react';
import { Link } from 'react-router-dom';

import logoText from '../logoText.svg';

const Header = () => {
  return (
    <Link to="/">
      <img src={logoText} alt="Room Logo" />
    </Link>
  );
};

export default Header;
