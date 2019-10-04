import { useField } from './useField';

const useResetPasswordForm = () => {
  const passwordField = useField();

  const repeatPasswordField = useField();

  return {
    password: passwordField.value,
    onChangePassword: passwordField.onChange,
    repeatPassword: repeatPasswordField.value,
    onChangeRepeatPassword: repeatPasswordField.onChange,
  };
};

export { useResetPasswordForm };
