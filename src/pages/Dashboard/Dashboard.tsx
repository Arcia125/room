import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';

import { GET_CURRENT_USER } from '../../graphql/getCurrentUser';
import { ADD_ROOM } from '../../graphql/addRoom';
import { Button } from '../../components/styles/Button';
import { ClaimAccountForm } from '../../components/ClaimAccountForm';
import { CLAIM_ACCOUNT } from '../../graphql/claimAccount';
import Modal from '../../components/Modal';
import { SAVE_USER } from '../../graphql/saveUser';

const roomNames = ['test1', 'test2'];

const useModalState = (
  { initialIsOpen = false } = { initialIsOpen: false }
) => {
  const [isOpen, setIsOpen] = React.useState(initialIsOpen);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close
  };
};

const Dashboard: React.FunctionComponent<RouteComponentProps> = ({
  history
}) => {
  const getCurrentUserQuery = useQuery(GET_CURRENT_USER);

  const claimAccountModal = useModalState();

  const [saveUser, saveUserMutation] = useMutation(SAVE_USER);

  const [claimAccount, claimAccountMutation] = useMutation(CLAIM_ACCOUNT, {
    update: (client, mutResult) => {
      const variables = {
        ...mutResult.data.claimAccount.user,
        token: mutResult.data.claimAccount.token
      };

      console.log('saving user ', variables);

      saveUser({
        variables
      });

      window.location.reload();
    }
  });

  const [addRoom, addRoomMutation] = useMutation(ADD_ROOM, {
    variables: { name: roomNames[Math.random() > 0.5 ? 0 : 1] }
  });

  const addedRoomId = addRoomMutation.data && addRoomMutation.data.addRoom.id;

  React.useEffect(() => {
    if (addedRoomId || addedRoomId === 0) {
      history.push(`/r/${addedRoomId}`);
    }
  });

  if (getCurrentUserQuery.loading) return <div>'Loading...'</div>;
  if (getCurrentUserQuery.error)
    return <div>{getCurrentUserQuery.error.message}</div>;

  const currentUser =
    getCurrentUserQuery.data && getCurrentUserQuery.data.currentUser;

  const handleCreateRoom = () => {
    addRoom();
  };

  const handleClickMyAccount = () => {
    if (!currentUser.email) return claimAccountModal.open();
    history.push('/account');
  };

  return (
    <div>
      <h1>
        {getCurrentUserQuery.data &&
          getCurrentUserQuery.data.currentUser &&
          getCurrentUserQuery.data.currentUser.username}
        's dashboard
      </h1>
      <p>Create a room to get started</p>
      <Button color="primary" padding="2" onClick={handleCreateRoom}>
        {getCurrentUserQuery.loading || addRoomMutation.loading
          ? 'loading...'
          : 'create a room'}
      </Button>

      <Button color="primary" padding="2" onClick={handleClickMyAccount}>
        My Account
      </Button>

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
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
