const getLocalStorageValue = (key, parser = JSON.parse) => {
  const value = localStorage.getItem(key);
  if (value === 'undefined') return undefined;

  return parser ? parser(value) : value;
};

const setLocalStorage = (key, value) =>
  localStorage.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  );

export { getLocalStorageValue, setLocalStorage };
