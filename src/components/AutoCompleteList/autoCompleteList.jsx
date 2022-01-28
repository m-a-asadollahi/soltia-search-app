import "./autoCompleteListStyle.css";
const AutoCompleteList = ({
  isSearching,
  wordList,
  wordListIcon,
  onItemClick,
  onDeleteHistoryItem,
  inputValue,
  activeIndex,
}) => {
  return (
    <>
      {isSearching && (
        <ul className="autoCompleteList">
          {wordList.map((item, index) => (
            <li
              className={
                activeIndex === index ? "autoList-item-active" : "autoList-item"
              }
              key={index}
            >
              <div
                className="autoList-data"
                onMouseDown={() => onItemClick(item.word)}
              >
                <span className="autoList-icon-container">
                  <i className={`fa ${wordListIcon}`} aria-hidden="true" />
                </span>
                {item.word.substr(0, inputValue.length) === inputValue ? (
                  <span className="autoList-word">
                    <span className="suggestion-text">
                      {item.word.substr(0, inputValue.length)}
                    </span>
                    {item.word.substr(inputValue.length, item.word.length)}
                  </span>
                ) : (
                  <span className="autoList-word">{item.word}</span>
                )}
              </div>
              <span
                className="autoList-delete"
                onMouseDown={() => onDeleteHistoryItem(item)}
              >
                <i className="fa fa-times" />
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AutoCompleteList;
