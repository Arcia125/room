import styled from 'styled-components';

const StyledUserTile = styled.li`
  background-color: #fff;
  border-radius: 4px;
  padding: 1.6rem;
  min-height: 6.8rem;
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-items: center;
  grid-gap: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 1.6rem;
  font-weight: 500;

  .user__avatar {
    width: 4.8rem;
    border-radius: 50%;
  }

  /* Styles for user name & last message */
  .user-glance {
    display: grid;
    grid-template-rows: repeat(2, min-content);
    &__name {
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: #4c535d;
    }

    &__last-message {
      font-size: 14px;
      font-weight: 500;
      color: #8f96a2;
    }
  }

  /* Styles for last message time stamp and notification count */
  .message-info {
    display: grid;
    grid-auto-rows: repeat(2, min-content);
    justify-items: end;
    &__last-contact {
      width: 52px;
      color: #8b929e;
    }

    &__notification {
      width: 20px;
      height: 20px;
      padding: 1px 0;
      border-radius: 50%;
      background-color: #fa474f;
      color: #fff;
      text-align: center;
      font-weight: 500;
      font-size: 12px;
    }
  }
`;

export default StyledUserTile;
