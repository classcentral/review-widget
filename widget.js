(function() {
  var CONST = {
    DEFAULT_HEIGHT : "320",
    DEFAULT_WIDTH : "400",
    MIN_WIDTH : "220",
    MIN_HEIGHT : "0",
    DEFAULT_THEME: "dark",
    SERVER: "https://www.class-central.com/mooc/"
  };

  function getWidgetParams(node) {
    var params = {
      "id": node.getAttribute("data-id"),
      "theme": node.getAttribute('data-theme') || CONST.DEFAULT_THEME
    };
    return params;
  }

  function getIframe(src) {
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", src);
    iframe.setAttribute("width", CONST.DEFAULT_WIDTH);
    iframe.setAttribute("height", CONST.DEFAULT_HEIGHT);
    iframe.setAttribute('frameborder', '0');
    return iframe;
  };

  function getServerUrl(params) {
    // TODO: Need to read in params from paramsObject and modify URL
    var courseID = "835/coursera-machine-learning#course-all-reviews";
    var url = CONST.SERVER + courseID;
    return url;
  };


  /* draws all widgets in the page */
  function drawWidgets() {
    var reviewNodes = document.getElementsByClassName('classcentral-review');
    for (var i = 0; i < reviewNodes.length; i++) {
      var node = reviewNodes[i];
      var params = getWidgetParams(node);
      var iframe = getIframe(getServerUrl(params));
      node.parentNode.replaceChild(iframe, node);
    }
  }

  drawWidgets();
})();
