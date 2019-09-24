import { adjectives } from "./adjectives";
import { nouns } from "./nouns";
import { getRandomItem } from "./getRandomItem";

const createRandomUsername = () => {
  return `${getRandomItem(adjectives)}${getRandomItem(nouns)}`.replace(
    /\s/gi,
    '_'
  );
};

export { createRandomUsername };
