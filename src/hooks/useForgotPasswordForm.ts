import { useField } from './useField';

const defaultLoginOpts = { initialEmail: '' };

const useForgotPasswordForm = ({ initialEmail = '' } = defaultLoginOpts) => {
  const emailField = useField({ initialValue: initialEmail });

  return {
    email: emailField.value,
    onChangeEmail: emailField.onChange,
  };
};

export { useForgotPasswordForm };
