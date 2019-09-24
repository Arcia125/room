import styled from 'styled-components';

const GetStartedFormStyles = styled.form`
  .form {
    display: flex;
    width: 39.6rem;
    height: min-content;
    border: none;
    &__input {
      font-size: 1.6rem;
      padding: 1.5rem;
      width: 34.8rem;
      border: 1px;
      border-radius: 2px 0 0 2px;
    }
    &__button {
      cursor: pointer;
      height: 4.8rem;
      width: 4.8rem;
      border: 1px solid #f2f2f2;
      border-radius: 0 2px 2px 0;
      padding: 0;
      color: #fff;
      /* avoids weird gap when input is focused */
      border: 1px;
      &:hover {
        background-color: ${p => p.theme.colors.purple};
      }
    }
  }
`;

export default GetStartedFormStyles;
