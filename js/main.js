var getDateString = function() {
  var date = new Date();
  return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() +
    " " + date.getHours() + ":" + date.getMinutes();
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

var onKeyUpHandler = function (event) {
  if(event.key === "Enter") {
    performSearchAndAddToSearchHistory(event.target.value);
  } else {

  }
  console.log(event.target.value);
}

var setupTextInputHandlers = function(textInput) {
  textInput.onkeyup = onKeyUpHandler;
};

document.addEventListener("DOMContentLoaded", function() {
    // this function runs when the DOM is ready, i.e. when the document has been parsed
    var textInput = document.getElementById("searchInput");
    setupTextInputHandlers(textInput);
});
