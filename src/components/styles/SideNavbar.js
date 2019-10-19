import styled from 'styled-components';

const StyledSideNavbar = styled.nav`
  display: grid;
  grid-template-rows: 197px 1fr;
  top: 0;
  left: 0;
  justify-content: space-between;
  padding: 1.6rem;
  height: 100%;
  background-color: ${p => p.theme.colors.lightPurple};

  & .user {
    align-self: center;
    justify-self: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    & img {
      height: 64px;
    }
    & p {
      text-align: center;
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;

      letter-spacing: 0.005em;
    }
  }
  & ul {
    list-style: none;
  }
`;

export default StyledSideNavbar;
