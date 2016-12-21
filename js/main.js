(function () {
  /**
    Fetches gui items and initializes the modules.
  */
  var partialResultsElement = document.getElementById("partialResults");
  var textInput = document.getElementById("searchInput");
  var searchHistoryTable = document.getElementById("searchHistoryTable");

  SearchField.init(textInput, partialResultsElement);
  SearchHistory.init(searchHistoryTable);
})();
