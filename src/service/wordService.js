import { getSuggestionCount } from "../utils/storage";
import word from "./httpServer";

// import { wordEndPoint } from "./config.json";

export const findWord = (key) => {
  //const url = "https://api.datamuse.com/sug?s=" + key;
  const url = `https://api.datamuse.com/sug?s=${key}*&max=${getSuggestionCount()}`;
  console.log(url);
  return word.get(url);
};
