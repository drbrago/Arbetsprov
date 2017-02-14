angular.module('app').controller('searchCtrl', function($scope, countriesService) {
    $scope.searchText = '';
    $scope.partialSearchResult = [];
    $scope.searchHistory = [{
        text: "Alabama",
        date: Date.now()
    }, {
        text: "Alabama",
        date: Date.now()
    }, {
        text: "Alabama",
        date: Date.now()
    }];
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
});
