import React from 'react';
export const LoginForm = ({
  onSubmit,
  username,
  onChangeUsername,
  password,
  onChangePassword
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={username} onChange={onChangeUsername} />
      <input type="password" value={password} onChange={onChangePassword} />
      <button type="submit">login</button>
    </form>
  );
};
