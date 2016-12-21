var SearchField = (function () {
  var textInput, partialResultsContainer;

  function init (input, partialContainer) {
    textInput = input;
    partialResultsContainer = partialContainer;

    setupTextInputHandlers();
  }

  function clearPartialSearchResultsAndHideElement() {
    Utils.removeAllChildrenFromElement(partialResultsContainer);
  }

  function performSearchAndDisplayPartialSearchResults(searchTerm) {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://services.groupkt.com/country/search?text="+searchTerm;
    xmlhttp.onreadystatechange = partialSearchResultsReadyHandler;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  function parsePartialSearchTextAndAddToView(responseText) {
    var json = JSON.parse(responseText);
    var results = json.RestResponse.result;
    var resultsToShow = Math.min(5, results.length);
    Utils.removeAllChildrenFromElement(partialResultsContainer);
    for (var i = 0; i < resultsToShow; i++) {
      var result = results[i];
      var item = document.createElement("div");
      item.innerText = result.name;
      partialResultsContainer.appendChild(item);
    }
  }

  var partialSearchResultsReadyHandler = function(event) {
    if (this.readyState == 4 && this.status == 200) {
      parsePartialSearchTextAndAddToView(this.responseText);
    }
  }

  var performSearchAndAddToSearchHistory = function(searchTerm) {
    SearchHistory.addSearchToHistory(searchTerm);
  }

  function keyUpHandler(event) {
    var value = event.target.value;

    if (value.length == 0)
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

  function setupTextInputHandlers() {
    textInput.onkeyup = keyUpHandler;
  }

  return {
    init:init
  };
})();
