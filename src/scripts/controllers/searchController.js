angular.module('app').controller('searchCtrl', function($scope, countriesService) {
    $scope.searchText = '';
    $scope.partialSearchResult = [];
    $scope.searchHistory = [];
    $scope.partialSearch = countriesService.getCountries;
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
