angular.module('app').factory('countriesService', ['$http', function($http) {
    var countryURL = "http://services.groupkt.com/country/search";

    return {
        getCountries: function(searchText) {
            return $http.get(countryURL, {
                params: {
                    text: searchText
                }
            }).then(function(response) {
                return response.data.RestResponse.result.map(function(item) {
                    return item.name;
                });
            });
        },
        getCountry: function(searchText) {
            return $http.get(countryURL, {
                params: {
                    text: searchText
                }
            });
        }
    };
}]);
