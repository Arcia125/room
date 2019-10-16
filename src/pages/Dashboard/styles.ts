import styled from 'styled-components';

const StyledDashboard = styled.div`
  display: grid;
  grid-template-rows: 100vh;
  grid-template-columns: 192px 1fr;
  & main {
    background-color: ${p => p.theme.colors.lighterPurple};
    padding-left: 39px;
    padding-top: 25px;
  }
`;

export { StyledDashboard };
