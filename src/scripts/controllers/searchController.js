angular.module('app').controller('searchCtrl', function($scope, countriesService) {
    $scope.searchText = '';
    $scope.partialSearchResult = [];
    $scope.searchHistory = [];
    $scope.partialSearch = countriesService.getCountries;
    $scope.search = function(searchText) {
        countriesService.getCountry(searchText).then(function(response) {
            if (response.data.RestResponse.result.length > 0) {
                var name = response.data.RestResponse.result[0].name;
                $scope.searchHistory.push({
                    text: name,
                    date: Date.now()
                });
            }
        });
    };
    $scope.removeSearchHistoryItem = function(item) {
        var index = $scope.searchHistory.indexOf(item);
        if (index > -1) {
            $scope.searchHistory.splice(index, 1);
        }
    };
});
