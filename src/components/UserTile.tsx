import React from 'react';

import StyledUserTile from './styles/UserTile';

const UserTile: React.FunctionComponent<{ avatar: string; name: string }> = ({
  avatar,
  name
}) => (
  <StyledUserTile>
    <img
      style={{ borderRadius: '50%' }}
      src={avatar || 'https://via.placeholder.com/50x50'}
      alt=""
    />
    <span>{name}</span>
  </StyledUserTile>
);

export default UserTile;