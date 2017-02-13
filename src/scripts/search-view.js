/**
  Module that handles the search input field and the partial results list.
  Also gets data from the rest api when typing in the text field.
*/
define(['jquery-all', 'history-state', 'util/utils'],
    function($, historyState, utils) {

    /**
      Fetches gui items and initializes the modules.
    */
    var $partialResultsContainer = $("#partial-results"),
        $textInput = $("#search-input"),
        xmlhttp = undefined;

    function clearPartialSearchResultsAndHideElement() {
        removePartialResultsContainerHandlers();
        $partialResultsContainer.empty();
    }

    function performSearchAndDisplayPartialSearchResults(searchTerm) {
        if (xmlhttp !== undefined) {
            xmlhttp.abort();
        }
        xmlhttp = new XMLHttpRequest();
        var url = "http://services.groupkt.com/country/search?text=" + searchTerm;
        xmlhttp.onreadystatechange = partialSearchResultsReadyHandler;
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    function parsePartialSearchTextAndAddToView(responseText) {
        var json = JSON.parse(responseText);
        var results = json.RestResponse.result;
        var resultsToShow = Math.min(5, results.length);
        $partialResultsContainer.empty();
        for (var i = 0; i < resultsToShow; i++) {
            var result = results[i];
            $partialResultsContainer.addPartialSearchItem(result.name);
        }

        if (resultsToShow > 0) {
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
        historyState.addSearchTerm(searchTerm);
    }

    function setupTextInputHandlers() {
        $textInput.keyup(keyUpHandler);
    }

    function addPartialResultsContainerHandlers() {
        document.addEventListener("click", clearPartialSearchResultsAndHideElement);
        $partialResultsContainer.bind("click", partialResultsContainerClickHandler);
    }

    function removePartialResultsContainerHandlers() {
        document.removeEventListener("click", clearPartialSearchResultsAndHideElement);
        $partialResultsContainer.unbind("click", partialResultsContainerClickHandler);
    }

    function partialResultsContainerClickHandler(event) {
        event.stopPropagation();
        $textInput.val(event.target.innerText);
        $textInput.focus();
        // textInput.select();
        clearPartialSearchResultsAndHideElement();
    }

    function keyUpHandler(event) {
        var value = event.target.value;

        if (value.length == 0) {
            clearPartialSearchResultsAndHideElement();
            return;
        }

        if (event.key === "Enter") {
            performSearchAndAddToSearchHistory(value);
        } else {
            performSearchAndDisplayPartialSearchResults(value);
        }
    }

    var view = {
        init: utils.once(function() {
            setupTextInputHandlers();
        })
    }

    return view;
});
