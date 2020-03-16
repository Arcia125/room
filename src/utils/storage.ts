// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LocalStorageParser = (text: string) => any;

const getLocalStorageValue = (
  key: string,
  parser: LocalStorageParser | null = JSON.parse
) => {
  const value = localStorage.getItem(key);
  if (value === null) return undefined;
  // if (value === 'undefined') return undefined;
  return parser && value ? parser(value) : value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setLocalStorage = (key: string, value: any) =>
  localStorage.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  );

const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { getLocalStorageValue, setLocalStorage, removeFromLocalStorage };
