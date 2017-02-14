angular.module('app').controller('searchCtrl', function($scope, countriesService) {
    $scope.searchText = '';
    $scope.partialSearchResult = [];
    $scope.searchHistory = [];
    $scope.partialSearch = function() {
        var promise = countriesService.searchForCountry($scope.searchText);
        promise.then(function(data) {
            $scope.partialSearchResult = data;
        }, function(error) {
            console.log(error);
        });
    };
    $scope.search = function() {
        var promise = countriesService.searchForCountry($scope.searchText);
        promise.then(function(data) {
            $scope.searchResult = data;
            $scope.searchHistory.push({
                text: $scope.searchText,
                date: Date.now()
            });
        }, function(error) {
            console.log(error);
        });
    };
});
