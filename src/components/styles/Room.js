import styled from 'styled-components';

const StyledRoom = styled.div`
  /* This line is giving padding to both chatbox and room-page... */
  padding: 4rem;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    'search-bar room-name'
    'list' 'messages';
  .chatbox {
    &__user-list {
      grid-area: 'list';
      list-style: none;
      width: 45rem;
      border: 1px solid gray;
      border-radius: 2px;
    }
    &__input {
      &--field {
        height: 4.8rem;
        /* padding: .8rem; */
      }
      &--button {
      }
    }
    &__header {
      color: ${p => p.theme.colors.grayDark};
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 3.2rem;
    }

    &__message-list {
      grid-area: message-list;
      border: 1px solid gray;
      width: 90rem;
      min-height: 70rem;
      list-style: none;
      &--item {
      }
    }
  }

  .room-page {
    padding: 4rem;
    &__header {
      color: ${p => p.theme.colors.grayDark};
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 4.8rem;
    }
  }
`;

export default StyledRoom;
