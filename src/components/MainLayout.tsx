import React from 'react';
import { StyledMainLayout } from './styles/MainLayout';
import SideNavbar from './SideNavbar';
import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <StyledMainLayout>
      <SideNavbar />
      <main>
        <Header />
        {children}
      </main>
    </StyledMainLayout>
  );
};

export default MainLayout;
