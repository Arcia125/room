import styled from 'styled-components';

// Navbar will persist at top of page with these styles.
const StyledNavbar = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: space-between;
  padding: 1.6rem;
  width: 100%;
  background-color: ${p => p.theme.colors.lightPurple};
`;

export default StyledNavbar;
