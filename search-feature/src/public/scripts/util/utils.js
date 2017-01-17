/**
  Utility module.
*/
define([], function() {
    return {
        getDateString: function() {
            var date = new Date();
            return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() +
                " " + date.getHours() + ":" + date.getMinutes();
        },
        removeAllChildrenFromElement: function(node) {
            while (node.hasChildNodes()) {
                node.removeChild(node.lastChild);
            }
        },
        once: function(fn, context) {
            var hasBeenCalled = false;
            return function onceProxy() {
                if (!hasBeenCalled) {
                    hasBeenCalled = true;
                    fn.apply(context || null, arguments);
                }
            };
        }
    }
});
