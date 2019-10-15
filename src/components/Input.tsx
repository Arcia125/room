import React from 'react';

export type BaseInputProps = React.HTMLAttributes<HTMLDivElement>;

const BaseInput: React.FunctionComponent<BaseInputProps> = props => {
  return <input type="text" {...props} />;
};

export type InputWrapperProps = React.ComponentProps<'div'>;

const InputWrapper: React.FunctionComponent<InputWrapperProps> = ({
  className,
  children,
  ...restProps
}) => (
  <div {...restProps} className={className}>
    {children}
  </div>
);

export interface InputProps extends React.ComponentProps<'input'> {
  label: string;
}

const Input: React.FunctionComponent<InputProps> = ({
  className,
  label,
  id,
  children,
  ...restProps
}) => {
  return (
    <InputWrapper className={className}>
      <label htmlFor={id}>{label}</label>
      <BaseInput id={id} {...restProps}></BaseInput>
      {children}
    </InputWrapper>
  );
};

export { BaseInput, Input, InputWrapper };
