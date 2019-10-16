import React from 'react';
import { StyledMainLayout } from './styles/MainLayout';
import SideNavbar from './SideNavbar';

const MainLayout = ({ children }) => {
  return (
    <StyledMainLayout>
      <SideNavbar />
      <main>{children}</main>
    </StyledMainLayout>
  );
};

export default MainLayout;
