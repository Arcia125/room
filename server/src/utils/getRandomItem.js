export const getRandomItem = list => {
  const i = Math.floor(Math.random() * list.length);
  return list[i];
};
