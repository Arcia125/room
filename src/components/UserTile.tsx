import React from 'react';

import StyledUserTile from './styles/UserTile';

const UserTile: React.FunctionComponent<{ avatar: string; name: string }> = ({
  avatar,
  name,
}) => (
  <StyledUserTile>
    <img
      className="user__avatar"
      src={avatar || 'https://via.placeholder.com/50x50'}
      alt={`${name}'s avatar`}
    />
    <div className="user-glance">
      <span className="user-glance__name">{name}</span>
      <span className="user-glance__last-message">Sure 8:pm</span>
    </div>

    <div className="message-info">
      <span className="message-info__last-contact">02 Feb</span>
      <span className="message-info__notification">1</span>
    </div>
  </StyledUserTile>
);

export default UserTile;
