(function() {
  var CONST = {
    DEFAULT_HEIGHT : "420",
    DEFAULT_WIDTH : "400",
    MIN_WIDTH : "220",
    MIN_HEIGHT : "0",
    DEFAULT_THEME: "dark",
    SERVER: "http://ccwidget.codelight.eu/widget.html"
  };

  function getWidgetParams(node) {
    var params = {
      "id": node.getAttribute("data-id"),
      "theme": node.getAttribute('data-theme') || CONST.DEFAULT_THEME,
      "width": node.getAttribute('data-width') || CONST.DEFAULT_WIDTH,
      "height": node.getAttribute('data-height') || CONST.DEFAULT_HEIGHT
    };
    return params;
  }

  function getIframe(params) {
    var iframe = document.createElement("iframe");
    var src = getServerUrl(params);
    iframe.setAttribute("src", src);
    //iframe.setAttribute("width", params.width);
    iframe.setAttribute("height", params.height);
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute('frameborder', '0');
    return iframe;
  };

  function getServerUrl(params) {
    // TODO: Need to read in params from paramsObject and modify URL
    var courseID = "#/";
    var url = CONST.SERVER + courseID;
    return url;
  };


  /* draws all widgets in the page */
  function drawWidgets() {
    var reviewNodes = document.getElementsByClassName('classcentral-review');
    for (var i = 0; i < reviewNodes.length; i++) {
      var node = reviewNodes[i];
      var params = getWidgetParams(node);
      var iframe = getIframe(params);
      node.parentNode.replaceChild(iframe, node);
    }
  }

  drawWidgets();
})();
