angular.module('app').factory('Countries', function($resource) {
    var countryURL = "http://services.groupkt.com/country/search";

    return $resource(countryURL, {
        text: ''
    });
});
