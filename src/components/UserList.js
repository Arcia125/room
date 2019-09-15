import React from 'react';
import UserTile from './UserTile';

import StyledUserList from './styles/UserList';

const UserList = () => (
  <StyledUserList>
    <UserTile
      avatar="https://source.unsplash.com/cqraK2a3Or8/50x50"
      name="Kevin"
    />
    <UserTile
      avatar="https://source.unsplash.com/tzzpfLiRPlA/50x50"
      name="Kaitlyn"
    />
    <UserTile
      avatar="https://source.unsplash.com/7nL3AhoUxw0/50x50"
      name="Donte"
    />
    <UserTile
      avatar="https://source.unsplash.com/4TMBk-LqEKo/50x50"
      name="Chelsie"
    />
  </StyledUserList>
);

export default UserList;
