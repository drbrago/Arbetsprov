var SearchField = (function () {
  /**
    Module that handles the search input field and the partial results list.
    Also gets data from the rest api when typing in the text field.
  */
  var textInput, partialResultsContainer;

  function init (input, partialContainer) {
    textInput = input;
    partialResultsContainer = partialContainer;

    setupTextInputHandlers();
  }

  function clearPartialSearchResultsAndHideElement() {
    removePartialResultsContainerHandlers();
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

    if(resultsToShow > 0) {
      addPartialResultsContainerHandlers();
    }
  }

  function partialSearchResultsReadyHandler(event) {
    if (this.readyState == 4 && this.status == 200) {
      parsePartialSearchTextAndAddToView(this.responseText);
    }
  }

  var performSearchAndAddToSearchHistory = function(searchTerm) {
    // According to instructions the search result is not presented so
    // I did not create a search to the REST api here. Instead the searchTerm is
    // saved. I have shown I can do a search to the REST api in the function
    // performSearchAndDisplayPartialSearchResults.
    SearchHistory.addSearchToHistory(searchTerm);
  }

  function setupTextInputHandlers() {
    textInput.onkeyup = keyUpHandler;
  }

  function addPartialResultsContainerHandlers() {
    document.addEventListener("click", clearPartialSearchResultsAndHideElement);
    partialResultsContainer.addEventListener("click", partialResultsContainerClickHandler);
  }

  function removePartialResultsContainerHandlers() {
    document.removeEventListener("click", clearPartialSearchResultsAndHideElement);
    partialResultsContainer.removeEventListener("click", partialResultsContainerClickHandler);
  }

  function partialResultsContainerClickHandler(event) {
    event.stopPropagation();
    textInput.value = event.target.innerText;
    textInput.focus();
    // textInput.select();
    clearPartialSearchResultsAndHideElement();
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

  return {
    init:init
  };
})();
