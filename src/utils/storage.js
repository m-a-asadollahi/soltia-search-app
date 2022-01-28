import { currentDate, currentTime } from "./dateFactory";

//* Define a key for word list on Localstorage.
const historyListKey = "SSA_HistoryList";
//* Define a key for maximum word count .
const historyListCount = "SSA_HistoryCount";
//* Define a key for suggestion count .
const suggestionCount = "SSA_SuggestionCount";
//* Define a key for history on auto list count .
const historyOnListCount = "SSA_HistoryOnListCount";

//* Setting default value .
export const initStorage = () => {
  if (!localStorage.getItem(historyListCount))
    localStorage.setItem(historyListCount, 20);

  if (!localStorage.getItem(suggestionCount))
    localStorage.setItem(suggestionCount, 10);

  if (!localStorage.getItem(historyOnListCount))
    localStorage.setItem(historyOnListCount, 5);
};

//* Set count values .
export const saveAllCountValue = (
  suggestionCountValue,
  historyCountValue,
  historyOnListCountValue
) => {
  localStorage.setItem(historyListCount, historyCountValue);
  localStorage.setItem(suggestionCount, suggestionCountValue);
  localStorage.setItem(historyOnListCount, historyOnListCountValue);
};

//* Return maximum word count.
export const getHistoryCount = () => {
  return parseInt(localStorage.getItem(historyListCount));
};

//* Return suggestion count.
export const getSuggestionCount = () => {
  return parseInt(localStorage.getItem(suggestionCount));
};

//* Return suggestion count.
export const getHistoryOnListCount = () => {
  return parseInt(localStorage.getItem(historyOnListCount));
};

//* Return unique id.
const generateId = (term) => {
  return (
    Math.floor(Math.random() * 1000 + term.length) * new Date().getSeconds()
  );
};

//* Save a word in history.
export const saveHistory = (term) => {
  let history = getHistory();

  const newTerm = {
    id: generateId(term),
    word: term,
    date: currentDate(),
    time: currentTime(),
  };

  if (history) {
    if (history.length === getHistoryCount()) history.shift();
    history.push(newTerm);
  } else history = [{ ...newTerm }];
  localStorage.setItem(historyListKey, JSON.stringify(history));
};

//* Return word list which is saved in localstorage.
export const getHistory = () => {
  return JSON.parse(localStorage.getItem(historyListKey));
};

//* Delete a word from history.
export const deleteItem = (deleteItem) => {
  return new Promise((resolve, reject) => {
    try {
      const history = getHistory().filter((item) => item.id !== deleteItem.id);
      localStorage.setItem(historyListKey, JSON.stringify(history));
      resolve(true);
    } catch (ex) {
      reject(false);
    }
  });
};

//* Delete all data
export const deleteAll = () => {
  return new Promise((resolve, reject) => {
    try {
      const history = getHistory();
      history.length = 0;
      localStorage.setItem(historyListKey, JSON.stringify(history));
      resolve(true);
    } catch (ex) {
      reject(false);
    }
  });
};
