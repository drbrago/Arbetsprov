define(['jquery'], function($) {

    $.fn.addSearchItem = function(searchTerm, date) {
        var firstItem = false;
        if (this.children().length === 0) {
            firstItem = true;
        }

        var $tr = $('<tr></tr>')
            .addClass('search-item')
            .appendTo(this);

        if (firstItem) {
            $tr.addClass("selected");
        }

        $('<td></td>')
            .addClass('search-term-td')
            .text(searchTerm)
            .appendTo($tr);

        $('<td></td>')
            .text(date)
            .addClass('date-td')
            .appendTo($tr);

        var $removeColumn = $('<td></td>')
            .addClass('remove-td')
            .appendTo($tr);

        var $removeButton = $('<button></button>')
            .text('x')
            .appendTo($removeColumn);

        return $tr;
    };

    $.fn.addPartialSearchItem = function(text) {
        var $div = $('<div></div>')
            .text(text)
            .appendTo(this);

        return $div;
    };

    return $;
});
