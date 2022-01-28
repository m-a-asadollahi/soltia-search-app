import { useState, useEffect } from "react";
import SearchHistory from "./SearchHistory/searchHistory";
import SearchPanel from "./SearchPanel/searchPanel";
import {
  deleteAll,
  deleteItem,
  getHistory,
  initStorage,
  saveHistory,
} from "../utils/storage";
import { Helmet } from "react-helmet";
const SearchApp = () => {
  //* State and Setter for Search history
  const [historyList, setHistoryList] = useState(getHistory());

  //* Delete function for removing an item from search history
  const handleDeleteHistoryItem = (item) => {
    deleteItem(item).then(setHistoryList(getHistory()));
  };

  //* Add new Item in Search history then get new history
  const handleAddNewHistoryItem = (item) => {
    saveHistory(item);
    setHistoryList(getHistory());
  };

  //* Clear all history
  const handleDeleteAllHistory = () => {
    deleteAll().then(setHistoryList(getHistory()));
  };

  //* Set some default value in local storage after all components rendered
  useEffect(() => {
    initStorage();
  }, []);

  return (
    <>
      <Helmet>
        <title>Simple Search | AutoComplete</title>
      </Helmet>
      <SearchPanel
        onAddHistoryItem={handleAddNewHistoryItem}
        onDeleteHistoryItem={handleDeleteHistoryItem}
      />
      <SearchHistory
        history={historyList}
        onDeleteHistoryItem={handleDeleteHistoryItem}
        onDeleteAll={handleDeleteAllHistory}
      />
    </>
  );
};

export default SearchApp;
