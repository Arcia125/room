import { adjectives } from "./adjectives";
import { pluralNouns } from "./nouns";
import { getRandomItem } from "./getRandomItem";

const createRandomRoomName = () => {
  return `${getRandomItem(adjectives)}${getRandomItem(pluralNouns)}`.replace(
    /\s/gi,
    "_"
  );
};

export { createRandomRoomName };
