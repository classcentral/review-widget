(function() {

  function getWidgetParams(node) {
    var params = {
      "course-id"   : node.getAttribute("data-courseid"),
      "course-code" : node.getAttribute("data-coursecode"),
      "course-name" : node.getAttribute("data-course-name"),
      "provider-name": node.getAttribute("data-provider-name") ,
      "provider-courseurl" : node.getAttribute("data-provider-courseurl"),
      "provider-courseid": node.getAttribute("data-provider-courseid")

    };
    return params;
  }

  function getIframe(params) {
    var iframe = document.createElement("iframe");
    var src = getServerUrl(params);
    iframe.setAttribute("title", "Class Central Student Ratings");
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
        courseName = params['course-name'],
        providerName = params['provider-name'],
        providerCourseUrl = params['provider-courseurl'],
        providerCourseId = params['provider-courseid'],
        url;
    if (courseID) {
      url = cc_config.BASE_URL + "/reviews/widget?course-id=" + courseID;
    } else {
      url = cc_config.BASE_URL + "/reviews/widget?course-code=" + coursecode;
    }

    if(courseName){
      url += '&course-name=' + courseName;
    }

    if(providerName){
      url += '&provider-name=' + providerName;
    }

    if(providerCourseUrl){
      url +=  '&provider-course-url=' + providerCourseUrl;
    }

    if(providerCourseId){
      url += '&provider-course-id=' + providerCourseId;
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
