var getDateString = function() {
  var date = new Date();
  return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() +
    " " + date.getHours() + ":" + date.getMinutes();
}

var removeAllChildrenFromElement = function (node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

var searchItemRemoveClickHandler = function (event) {
  var searchHistoryTable = document.getElementById("searchHistoryTable");
  searchHistoryTable.deleteRow(event.target.searchItem.rowIndex);
}

var searchItemClickHandler = function (event) {
  var searchHistoryTable = document.getElementById("searchHistoryTable");
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

var createSearchItem = function(searchTerm) {
  var tableRow = document.createElement("tr");
  var searchTermColumn = document.createElement("td");
  var dateColumn = document.createElement("td");
  var removeColumn = document.createElement("td");
  var removeButton = document.createElement("button");
  removeButton.onclick = searchItemRemoveClickHandler;
  searchTermColumn.onclick = searchItemClickHandler;
  dateColumn.onclick = searchItemClickHandler;

  searchTermColumn.innerText = searchTerm;
  dateColumn.innerText = getDateString();
  removeButton.innerText = "x";
  removeButton.searchItem = tableRow;

  removeColumn.appendChild(removeButton);

  tableRow.appendChild(searchTermColumn);
  tableRow.appendChild(dateColumn);
  tableRow.appendChild(removeColumn);

  tableRow.className = "search-item";

  return tableRow;
}

var performSearchAndAddToSearchHistory = function(searchTerm) {
  var searchItem = createSearchItem(searchTerm);
  var searchHistoryTable = document.getElementById("searchHistoryTable");
  if(searchHistoryTable.rows.length === 0) {
    searchItem.className += " selected";
  }
  searchHistoryTable.appendChild(searchItem);
}

var parsePartialSearchTextAndAddToView = function (responseText) {
  var json = JSON.parse(responseText);
  var results = json.RestResponse.result;
  var resultsToShow = Math.min(5, results.length);
  var partialResultsElement = document.getElementById("partialResults");
  removeAllChildrenFromElement(partialResultsElement);
  for (var i = 0; i < resultsToShow; i++) {
    var result = results[i];
    var item = document.createElement("div");
    item.innerText = result.name;
    partialResultsElement.appendChild(item);
  }
}

var clearPartialSearchResultsAndHideElement = function () {
  var partialResultsElement = document.getElementById("partialResults");
  removeAllChildrenFromElement(partialResultsElement);
}

var partialSearchResultsReadyHandler = function(event) {
  if (this.readyState == 4 && this.status == 200) {
    parsePartialSearchTextAndAddToView(this.responseText);
  }
}

var performSearchAndDisplayPartialSearchResults = function(searchTerm) {
  var xmlhttp = new XMLHttpRequest();
  var url = "http://services.groupkt.com/country/search?text="+searchTerm;
  xmlhttp.onreadystatechange = partialSearchResultsReadyHandler;
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

var keyUpHandler = function (event) {
  var value = event.target.value;

  if (value.length == 0)
    //No need to do anything if no text is supplied.
  {
    clearPartialSearchResultsAndHideElement();
    return;
  }

  if(event.key === "Enter") {
    performSearchAndAddToSearchHistory(value);
  } else {
    performSearchAndDisplayPartialSearchResults(value);
  }
}

var setupTextInputHandlers = function(textInput) {
  textInput.onkeyup = keyUpHandler;
};

document.addEventListener("DOMContentLoaded", function() {
    // this function runs when the DOM is ready, i.e. when the document has been parsed
    var textInput = document.getElementById("searchInput");
    setupTextInputHandlers(textInput);
});
