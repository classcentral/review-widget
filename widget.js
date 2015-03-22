(function() {
  var CONST = {   
    SERVER: "https://dev.classcentral.io/reviews/widget?"
  };

  function getWidgetParams(node) {
    var params = {
      "course-id"   : node.getAttribute("data-courseid"),
      "course-code" : node.getAttribute("data-coursecode"),      
    };
    return params;
  }

  function getIframe(params) {
    var iframe = document.createElement("iframe");
    var src = getServerUrl(params);
    iframe.setAttribute("src", src);    
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "0px"); // 0 px to account for blank page in case of error    
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute('frameborder', '0');
    return iframe;
  };

  function getServerUrl(params) {
    var courseID = params["course-id"],
        coursecode = params["course-code"],
        url;
    if (courseID) {
      url = CONST.SERVER + "course-id=" + courseID;
    } else {
      url = CONST.SERVER + "course-code=" + coursecode;
    }
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
      iFrameResize({
        scrollCallback: function(){ return false; },   
      },iframe);
    }
  }

  drawWidgets();
})();
