import styled from 'styled-components';

const HomePage = styled.div`
  text-align: center;

  .home-page-logo {
    animation: home-page-logo-spin infinite 20s linear;
    height: 40vmin;
    pointer-events: none;
  }

  .home-page-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  @keyframes home-page-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export { HomePage };
