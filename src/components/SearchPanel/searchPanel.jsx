import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { useDebounce } from "../../hooks/useDebounce";
import { findWord } from "../../service/wordService";

import { getHistory, getHistoryOnListCount } from "../../utils/storage";
import SearchVoiceBox from "../VoiceSearch/searchVoiceBox";
import AutoCompleteList from "../AutoCompleteList/autoCompleteList";

import "./searchPanel.css";

const SearchPanel = ({ onAddHistoryItem, onDeleteHistoryItem }) => {
  //* State and Setter for searchTerm.
  //* searchTerm : use for holding a term that user want search.
  const [searchTerm, setSearchTerm] = useState("");

  //* State and Setter for isSearching.
  //* isSearching : use for figuring out app is on search mode or not.
  const [isSearching, setIsSearching] = useState(false);

  //* State and Setter for wordList.
  //* wordList : use for showing data searched information or history.
  const [wordList, setWordList] = useState();

  //* State and Setter for wordListIcon.
  //* wordListIcon : use for changing icon in word list (searched or history).
  const [wordListIcon, setWordListIcon] = useState("fa-search");

  //* Use debouncedSearchTerm which is a custome hook that holds the term for 500 ms
  //* then if user doesn't type or say anything ,sends the term to API for searching.

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  //* State and Setter for searchLoading.
  //* searchLoading : use for activing or disactiving loading.
  const [searchLoading, setSearchLoading] = useState(false);

  //* State and Setter for activedIndex.
  //* activedIndex :  The item on word list which is selected.
  const [activedIndex, setActivedIndex] = useState(0);

  //* Use useRef hook for set a ref for elements
  const currentFocus = useRef(null);
  const searchPanel = useRef(null);

  //* Focus Input box after page rendered.
  useEffect(() => {
    currentFocus.current.focus();
  }, []);

  //* Every time a user types or says a phrase, it invokes search.
  useEffect(() => {
    search(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  //* Every time a user says a phrase, it invokes search.
  const searchVoiceTerm = (term) => {
    setSearchTerm(term);
  };

  //* Selecting an item from searched words
  const handleListItemClick = (term) => {
    onAddHistoryItem(term);
    setSearchTerm("");
    currentFocus.current.focus();
  };

  //* Handle Actions when a user clicks on input box
  const handleSearchClick = (value) => {
    if (value) {
      search(value);
    } else {
      const history = getHistory();
      if (history && history.length > 0) {
        setIsSearching(true);
        setWordList(history.slice(0, getHistoryOnListCount()));
        setWordListIcon("fa-history");
      }
    }
  };

  //* Handle Actions when a user presses on input box
  const handleKeyDown = (e) => {
    if (e.key === "Enter") search(e.target.value);
    else if (e.keyCode === 38) {
      if (activedIndex === 0) {
        return;
      }
      setActivedIndex(activedIndex - 1);
      setSearchTerm(wordList[activedIndex - 1].word);
    } else if (e.keyCode === 40) {
      if (activedIndex - 1 === wordList.length) {
        return;
      }
      if (!isSearching) {
        handleSearchClick(null);
      }
      if (activedIndex < wordList.length - 1) {
        setActivedIndex(activedIndex + 1);
        setSearchTerm(wordList[activedIndex + 1].word);
      }
    }
  };

  //---------------------------------------------
  //For search and suggestions in Auto-Complete component used datamuse’s API.
  //Get a suggestion list by API
  //Using datamuse’s API
  //Input parameter: searchTerm: the search item / suggestionsItemsCount: Count of items for result
  //Output parameter: data
  //---------------------------------------------
  const search = async (searchTerm) => {
    if (searchTerm) {
      try {
        setSearchLoading(true);
        setIsSearching(true);
        setWordList([]);
        const { data } = await findWord(searchTerm);
        setWordList(data);
        setWordListIcon("fa-search");
        setSearchLoading(false);
        setActivedIndex(0);
      } catch (ex) {
        setIsSearching(false);
        setWordList([]);
        toast.error(ex.meesage);
        setSearchLoading(false);
      }
    } else {
      setIsSearching(false);
      setWordList([]);
    }
  };

  return (
    <div
      className={isSearching ? "search-box-open" : "search-box-close"}
      onBlur={() => setIsSearching(false)}
    >
      <div className="search-panel" ref={searchPanel}>
        <span className="search-icon-wrraper">
          <i className="fa fa-search search-icon"></i>
        </span>

        <input
          ref={currentFocus}
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={(e) => handleSearchClick(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for..."
        />
        <BeatLoader
          loading={searchLoading}
          css="width:5rem;text-align:right"
          color={"#bb7db2"}
          size={7}
        />
        <SearchVoiceBox onSearchTerm={searchVoiceTerm} />
      </div>
      <AutoCompleteList
        isSearching={isSearching}
        wordList={wordList}
        wordListIcon={wordListIcon}
        onItemClick={handleListItemClick}
        onDeleteHistoryItem={onDeleteHistoryItem}
        inputValue={searchTerm}
        activeIndex={activedIndex}
      />
    </div>
  );
};

export default SearchPanel;
