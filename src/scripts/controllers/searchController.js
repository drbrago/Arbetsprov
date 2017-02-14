angular.module('app').controller('searchCtrl', function($scope, Countries) {
    $scope.searchText = '';
    $scope.partialSearchResult = [];
    $scope.searchHistory = [];
    $scope.partialSearch = function() {
        Countries.get({
            text: $scope.searchText
        }, function(data) {
            $scope.partialSearchResult = data.RestResponse.result;
        });
    };
    $scope.search = function() {
        var promise = Countries.get({
            text: $scope.searchText
        }, function(data) {
            $scope.searchResult = data;
            $scope.searchHistory.push({
                text: $scope.searchText,
                date: Date.now()
            });
        });
    };
});
