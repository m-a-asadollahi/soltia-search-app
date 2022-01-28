import "./searchHistory.css";
const SearchHistory = ({ history, onDeleteHistoryItem, onDeleteAll }) => {
  return (
    <>
      {history && history.length > 0 && (
        <div className="searchHistory">
          <div className="searchHistory-header">
            <h5>Search history</h5>
            <div className="searchHistory-header-tools">
              <span onClick={onDeleteAll}>
                <i className="fa fa-trash delete-all-history"></i>
              </span>
            </div>
          </div>
          <ul className="searchHistory-list">
            {history.map((item) => (
              <li className="searchHistory-list-item" key={item.id}>
                <span className="searchHistory-item-word">{item.word}</span>
                <div className="searchHistory-item-details">
                  <span className="searchHistory-item-date">{`${item.date} - ${item.time}`}</span>
                  <span
                    className="searchHistory-item-icon-container"
                    onClick={() => onDeleteHistoryItem(item)}
                  >
                    <i className="fa fa-times" />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchHistory;
