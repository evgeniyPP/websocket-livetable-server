const WORDS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
sunt in culpa qui officia deserunt mollit anim id est laborum.`.split(/\W+/);

export function getRandomSentence() {
  const word1Idx = Math.floor(Math.random() * WORDS.length);
  const word2Idx = Math.floor(Math.random() * WORDS.length);
  const word3Idx = Math.floor(Math.random() * WORDS.length);

  return `${WORDS[word1Idx]} ${WORDS[word2Idx]} ${WORDS[word3Idx]}`;
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
