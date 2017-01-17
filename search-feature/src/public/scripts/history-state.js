define(['ventage'], function(Ventage) {
    var state = Ventage.create({
        addSearchTerm: function(searchTerm) {
            state.trigger('history:addSearchTerm', searchTerm);
        }
    });

    return state;
});
