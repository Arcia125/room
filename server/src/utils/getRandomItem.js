export const getRandomItem = list => {
  var i = Math.floor(Math.random() * list.length);
  return list[i];
};
