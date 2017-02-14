angular.module('app').factory('countriesService', function($http, $q) {
    var url = "http://services.groupkt.com/country/search";

    return {
        searchForCountry: function(searchTerm) {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: url,
                    data: {
                        text: searchTerm
                    }
                })
                .success(function(data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    defer.reject(status);
                });

            return defer.promise;
        }
    };
});
