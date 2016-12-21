var SearchHistory = (function () {
  /**
    Module that handles the search history table.
  */
  var searchHistoryTable;

  function init(table) {
    searchHistoryTable = table;
  }

  function searchItemRemoveClickHandler(event) {
    searchHistoryTable.deleteRow(event.target.searchItem.rowIndex);
  }

  function searchItemClickHandler(event) {
    var rows = searchHistoryTable.rows;
    for(var i = 0; i < rows.length; i++) {
      var searchItem = rows[i];
      searchItem.className = "search-item";
    }

    var selectedRow = event.target.parentElement;
    if(event.target.tagName === "tr") {
      selectedRow = event.target;
    }
    selectedRow.className += " selected";
  }

  function createSearchItem(searchTerm) {
    var tableRow = document.createElement("tr");
    var searchTermColumn = document.createElement("td");
    var dateColumn = document.createElement("td");
    var removeColumn = document.createElement("td");
    var removeButton = document.createElement("button");
    removeButton.onclick = searchItemRemoveClickHandler;
    searchTermColumn.onclick = searchItemClickHandler;
    dateColumn.onclick = searchItemClickHandler;

    searchTermColumn.innerText = searchTerm;
    dateColumn.innerText = Utils.getDateString();
    removeButton.innerText = "x";
    removeButton.searchItem = tableRow;

    removeColumn.appendChild(removeButton);

    tableRow.appendChild(searchTermColumn);
    tableRow.appendChild(dateColumn);
    tableRow.appendChild(removeColumn);

    tableRow.className = "search-item";

    return tableRow;
  }

  function addSearchToHistory(searchTerm) {
    var searchItem = createSearchItem(searchTerm);
    if(searchHistoryTable.rows.length === 0) {
      searchItem.className += " selected";
    }
    searchHistoryTable.appendChild(searchItem);
  }

  return {
    init: init,
    addSearchToHistory: addSearchToHistory
  };
})();
