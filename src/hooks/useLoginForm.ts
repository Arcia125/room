import { useField } from './useField';

const defaultLoginOpts = { initialUsername: '', initialPassword: '' };

const useLoginForm = ({
  initialUsername = '',
  initialPassword = ''
} = defaultLoginOpts) => {
  const usernameField = useField({ initialValue: initialUsername });
  const passwordField = useField({ initialValue: initialPassword });

  return {
    username: usernameField.value,
    password: passwordField.value,
    onChangeUsername: usernameField.onChange,
    onChangePassword: passwordField.onChange
  };
};

export { useLoginForm };
