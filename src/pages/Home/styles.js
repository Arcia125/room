import styled from 'styled-components';

const HomePage = styled.div`
  background-color: ${p => p.theme.colors.lightPurple};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .homePage {
    display: grid;
    grid-gap: 1.6rem;
    align-items: center;
    justify-content: center;
    &__invite {
      font-family: 'Poppins', sans-serif;
      font-size: 2.58rem;
      line-height: 1.5;
    }
  }
`;

export { HomePage };
