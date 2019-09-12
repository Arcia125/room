const getThemeSpacing = props =>
  props.theme.spacing[
    !props.padding && props.padding !== 0 ? 1 : props.padding
  ];

export { getThemeSpacing };
