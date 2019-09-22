type LocalStorageParser = (text: string) => any;

const getLocalStorageValue = (
  key: string,
  parser: LocalStorageParser = JSON.parse
) => {
  const value = localStorage.getItem(key);
  if (value === 'undefined') return undefined;

  return parser ? parser(value || '') : value;
};

const setLocalStorage = (key: string, value: any) =>
  localStorage.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  );

const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { getLocalStorageValue, setLocalStorage, removeFromLocalStorage };