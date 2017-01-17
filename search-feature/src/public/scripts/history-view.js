/**
  Module that handles the search history table.
*/
define(['jquery-all', 'history-state', 'util/utils'],
function($, historyState, utils) {
    var $searchHistoryTable = $("#search-history");

    function searchItemRemoveClickHandler(event) {
        $(event.target).parents("tr").remove();
    }

    function searchItemClickHandler(event) {
        $searchHistoryTable.find(".selected").removeClass("selected");
        $(event.currentTarget).addClass("selected");
    }

    function addSearchToHistory(searchTerm) {
        var currentDate = utils.getDateString();
        var $tr = $searchHistoryTable.addSearchItem(
          searchTerm,
          currentDate
        );
        $tr.click(searchItemClickHandler);
        $tr.find("button").click(searchItemRemoveClickHandler);
        return $tr;
    }

    historyState.on('history:addSearchTerm', addSearchToHistory);

    return {
        addSearchToHistory: addSearchToHistory
    };
});
