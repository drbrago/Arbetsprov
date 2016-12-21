var Utils = (function () {
  return {
    getDateString:function() {
      var date = new Date();
      return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() +
        " " + date.getHours() + ":" + date.getMinutes();
    },
    removeAllChildrenFromElement:function (node) {
      while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
      }
    }
  }
})();
