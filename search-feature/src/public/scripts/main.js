// Configuration
requirejs.config({
    baseUrl: '/scripts',
    paths: {
        jquery: 'vendor/jquery/jquery-2.1.3.min',
        'jquery-all': 'util/jquery-all',
        ventage: 'vendor/ventage/ventage'
    }
});

// Application start
requirejs(["jquery-all", "search-view", "history-view"],
    function($, searchView) {
        $(function() {
            searchView.init();
        });
    });
