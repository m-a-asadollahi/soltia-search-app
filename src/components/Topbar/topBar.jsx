import { useState, useEffect } from "react";
import {
  getHistoryCount,
  getHistoryOnListCount,
  getSuggestionCount,
  initStorage,
  saveAllCountValue,
} from "../../utils/storage";
import "./topBar.css";

const TopBar = () => {
  const [searchedItemCount, setsearchedItemCount] = useState(0);
  const [historyItemCount, setHistoryItemCount] = useState(0);
  const [historyItemOnListCount, setHistoryItemOnListCount] = useState(0);

  useEffect(() => {
    initStorage();
    setHistoryItemCount(getHistoryCount());
    setsearchedItemCount(getSuggestionCount());
    setHistoryItemOnListCount(getHistoryOnListCount());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveAllCountValue(
      searchedItemCount,
      historyItemCount,
      historyItemOnListCount
    );
  };

  return (
    <div className="topbar">
      <form className="form-inline" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Searched item count </label>
          <input
            required
            type="number"
            id="inputSearchedItemCount"
            placeholder="Searched item count"
            name="searchedItemCount"
            value={searchedItemCount}
            onChange={(e) => setsearchedItemCount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>History count </label>
          <input
            required
            type="number"
            id="inputHistoryCount"
            placeholder="History count"
            name="historyCount"
            value={historyItemCount}
            onChange={(e) => setHistoryItemCount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>History count on list </label>
          <input
            required
            type="number"
            id="inputHistoryCountOnList"
            placeholder="History count on list"
            name="historyCountOnList"
            value={historyItemOnListCount}
            onChange={(e) => setHistoryItemOnListCount(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TopBar;
