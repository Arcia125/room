import React, { FunctionComponent } from 'react';

import StyledSideNavbar from './styles/SideNavbar';
import { Button } from './styles/Button';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '../graphql/getCurrentUser';
import { useHistory } from 'react-router';
import { SAVE_USER } from '../graphql/saveUser';
import { CLAIM_ACCOUNT } from '../graphql/claimAccount';
import { ADD_ROOM } from '../graphql/addRoom';
import Modal from './Modal';
import { ClaimAccountForm } from './ClaimAccountForm';
import { logout } from '../utils/user';

const useModalState = (
  { initialIsOpen = false } = { initialIsOpen: false }
) => {
  const [isOpen, setIsOpen] = React.useState(initialIsOpen);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
  };
};

const SideNavbar: FunctionComponent<{}> = () => {
  const getCurrentUserQuery = useQuery(GET_CURRENT_USER);

  const claimAccountModal = useModalState();

  const history = useHistory();

  const currentUser =
    getCurrentUserQuery.data && getCurrentUserQuery.data.currentUser;

  const [saveUser] = useMutation(SAVE_USER);

  const [claimAccount, claimAccountMutation] = useMutation(CLAIM_ACCOUNT, {
    update: (client, mutResult) => {
      const variables = {
        ...mutResult.data.claimAccount.user,
        token: mutResult.data.claimAccount.token,
      };

      console.log('saving user ', variables);

      saveUser({
        variables,
      });

      window.location.reload();
    },
  });

  const [addRoom, addRoomMutation] = useMutation(ADD_ROOM);

  const addedRoomId = addRoomMutation.data && addRoomMutation.data.addRoom.id;

  React.useEffect(() => {
    if (addedRoomId || addedRoomId === 0) {
      history.push(`/r/${addedRoomId}`);
    }
  });

  const handleClickMyAccount = () => {
    if (!currentUser.email) return claimAccountModal.open();
    history.push('/account');
  };

  const handleCreateRoom = () => {
    addRoom();
  };

  return (
    <>
      <StyledSideNavbar>
        <div className="user">
          {getCurrentUserQuery.loading ? (
            'loading'
          ) : (
            <>
              <img
                style={{ borderRadius: '50%' }}
                src={getCurrentUserQuery.data.currentUser.avatar}
                alt="avatar"
              />
              <p>{getCurrentUserQuery.data.currentUser.username}</p>
            </>
          )}
        </div>
        <ul>
          <li>
            <Button
              basic
              onClick={handleCreateRoom}
              data-testid="create-room-button"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
                  fill="#AEB3C8"
                />
              </svg>
              {getCurrentUserQuery.loading || addRoomMutation.loading
                ? 'Loading...'
                : 'create room'}
            </Button>
          </li>
          <li>
            <Button basic onClick={handleClickMyAccount}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.14 12.936C19.176 12.636 19.2 12.324 19.2 12C19.2 11.676 19.176 11.364 19.128 11.064L21.156 9.48002C21.336 9.33602 21.384 9.07202 21.276 8.86802L19.356 5.54402C19.236 5.32802 18.984 5.25602 18.768 5.32802L16.38 6.28802C15.876 5.90402 15.348 5.59202 14.76 5.35202L14.4 2.80802C14.364 2.56802 14.16 2.40002 13.92 2.40002H10.08C9.83998 2.40002 9.64799 2.56802 9.61199 2.80802L9.25199 5.35202C8.66398 5.59202 8.12399 5.91602 7.63199 6.28802L5.24398 5.32802C5.02798 5.24402 4.77598 5.32802 4.65598 5.54402L2.73598 8.86802C2.61598 9.08402 2.66398 9.33602 2.85598 9.48002L4.88398 11.064C4.83598 11.364 4.79998 11.688 4.79998 12C4.79998 12.312 4.82398 12.636 4.87198 12.936L2.84398 14.52C2.66398 14.664 2.61598 14.928 2.72398 15.132L4.64398 18.456C4.76398 18.672 5.01598 18.744 5.23198 18.672L7.61998 17.712C8.12398 18.096 8.65198 18.408 9.23998 18.648L9.59999 21.192C9.64798 21.432 9.83998 21.6 10.08 21.6H13.92C14.16 21.6 14.364 21.432 14.388 21.192L14.748 18.648C15.336 18.408 15.876 18.084 16.368 17.712L18.756 18.672C18.972 18.756 19.224 18.672 19.344 18.456L21.264 15.132C21.384 14.916 21.336 14.664 21.144 14.52L19.14 12.936ZM12 15.6C10.02 15.6 8.39998 13.98 8.39998 12C8.39998 10.02 10.02 8.40002 12 8.40002C13.98 8.40002 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z"
                  fill="#AEB3C8"
                />
              </svg>
              account
            </Button>
          </li>
          <li>
            <Button
              basic
              onClick={logout as React.MouseEventHandler<HTMLButtonElement>}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 1.01L8 1C6.9 1 6 1.9 6 3V6H8V5H18V19H8V18H6V21C6 22.1 6.9 23 8 23H18C19.1 23 20 22.1 20 21V3C20 1.9 19.1 1.01 18 1.01ZM10 15H12V8H5V10H8.59L3 15.59L4.41 17L10 11.41V15Z"
                  fill="#AEB3C8"
                />
              </svg>
              logout
            </Button>
          </li>
        </ul>
      </StyledSideNavbar>
      <Modal
        isOpen={claimAccountModal.isOpen}
        onRequestClose={claimAccountModal.close}
      >
        <ClaimAccountForm onSubmit={variables => claimAccount({ variables })}>
          <Button type="submit" disabled={claimAccountMutation.loading}>
            Submit
          </Button>
        </ClaimAccountForm>
      </Modal>
    </>
  );
};

export default SideNavbar;
