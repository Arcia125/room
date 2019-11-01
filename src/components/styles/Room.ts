import styled from 'styled-components';

const StyledRoom = styled.div`
  /* This line is giving padding to both chatbox and room-page... */
  padding: 4rem;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    'search-bar room-name'
    'list' 'messages';
  background-color: ${'#EFEEF8'};
  .chatbox {
    max-width: 90rem;
    &__user-list {
      grid-area: 'list';
      list-style: none;
      width: 45rem;
      border: 1px solid gray;
      border-radius: 2px;
    }

    &__header {
      color: ${'#454D57'};
      font-family: 'Montserrat', sans-serif;
      padding-bottom: 1.6rem;
      margin-bottom: 1.6rem;
      border-bottom: 2px solid #e4e6ee;
      font-weight: 500;
      font-size: 2rem;
    }

    &__message-list {
      grid-area: message-list;
      width: 90rem;
      min-height: 70rem;
      list-style: none;
      display: grid;
      grid-gap: 2rem;
      grid-template-rows: repeat(9, min-content);
      &--item {
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        font-size: 1.6rem;
        background-color: ${'#EAE8ED'};
        padding: 1.6rem;
        border-radius: 18px;
      }

      /* styles for messages from user */

      /* styles for messages from others */
    }
    &__input {
      height: 5.4rem;
      border-radius: 0 0 4px 4px;
      padding: 0 16px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &--field {
        border: none;
        width: 100%;
        height: 100%;
        font-size: 1.6rem;
        &::placeholder {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 1.6rem;
          color: #c6c8cb;
        }
        /* padding: .8rem; */
      }
      &--button {
        background: radial-gradient(
          farthest-corner at 0px 5px,
          #2d8df2,
          #9198e5
        );
        transform: rotate(-45deg);
        width: 4rem;
        height: 4rem;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        .material-icons {
          transform: translate(2px);
          font-size: 26px;
          color: #fff;
        }
      }
    }
  }

  .room-page {
    padding: 4rem;
    &__header {
      color: ${'#1f1f1f'};
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 4.8rem;
    }
  }
`;

export default StyledRoom;
