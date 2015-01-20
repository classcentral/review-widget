!function t(d, n, format) {
  /**
   * @param {string} name
   * @param {?} context
   * @return {?}
   */
  function r(name, context) {
    if (!n[name]) {
      if (!d[name]) {
        var ondata = "function" == typeof require && require;
        if (!context && ondata) {
          return ondata(name, true);
        }
        if (trimDots) {
          return trimDots(name, true);
        }
        /** @type {Error} */
        var err = new Error("Cannot find module '" + name + "'");
        throw err.code = "MODULE_NOT_FOUND", err;
      }
      var module_ = n[name] = {
        exports : {}
      };
      d[name][0].call(module_.exports, function(word) {
        var i = d[name][1][word];
        return r(i ? i : word);
      }, module_, module_.exports, t, d, n, format);
    }
    return n[name].exports;
  }
  var trimDots = "function" == typeof require && require;
  /** @type {number} */
  var i = 0;
  for (;i < format.length;i++) {
    r(format[i]);
  }
  return r;
}({
  1 : [function(require) {
    !function() {
      /** @type {function (this:Function, (Object|null|undefined), ...[*]): Function} */
      var _tryInitOnFocus = Function && (Function.prototype && Function.prototype.bind);
      /** @type {boolean} */
      var _isFocused = /MSIE [678]/.test(window.navigator.userAgent);
      if (_tryInitOnFocus && !_isFocused) {
        var Block = require("tfw/util/article");
        var getActual = require("util/domready");
        var request = require("util/logger");
        var dom = require("performance/perf-timers");
        var settings = require("tfw/widget/base");
        var nodes = require("tfw/widget/follow");
        var helper = require("tfw/widget/tweetbutton");
        var inspect = require("tfw/widget/embed");
        var selfClosing = require("tfw/widget/timeline");
        var assert = require("tfw/widget/video");
        var b = require("tfw/widget/intent");
        var meta = require("tfw/factories");
        var config = require("util/events");
        var $ = require("util/util");
        var Base = require("tfw/hub/client");
        if (window.twttr = window.twttr || {}, twttr.host = twttr.host || "platform.twitter.com", dom.start("widgets-js-load"), Block.requestArticleUrl(), twttr.widgets && twttr.widgets.loaded) {
          return twttr.widgets.load(), false;
        }
        if (twttr.init) {
          return false;
        }
        /** @type {boolean} */
        twttr.init = true;
        twttr._e = twttr._e || [];
        twttr.ready = twttr.ready || function(fun) {
          if (twttr.widgets && twttr.widgets.loaded) {
            fun(twttr);
          } else {
            twttr._e.push(fun);
          }
        };
        /** @type {Array} */
        var tests = [];
        twttr.events = {
          /**
           * @param {string} type
           * @param {Function} fn
           * @return {?}
           */
          bind : function(type, fn) {
            return tests.push([type, fn]);
          }
        };
        getActual(function() {
          /**
           * @return {undefined}
           */
          function reset() {
            twttr.events.hub = Base.init();
            Base.init(true);
          }
          var bind;
          var node = {
            "a.twitter-share-button" : helper,
            "a.twitter-mention-button" : helper,
            "a.twitter-hashtag-button" : helper,
            "a.twitter-follow-button" : nodes,
            "blockquote.twitter-tweet" : inspect,
            "a.twitter-timeline" : selfClosing,
            "div.twitter-timeline" : selfClosing,
            "blockquote.twitter-video" : assert,
            body : b
          };
          var dataName = twttr.events && twttr.events.hub ? twttr.events : {};
          twttr.widgets = twttr.widgets || {};
          $.aug(twttr.widgets, meta, {
            /**
             * @param {Object} data
             * @return {undefined}
             */
            load : function(data) {
              request.time("load");
              settings.init(node);
              settings.embed(data);
              /** @type {boolean} */
              twttr.widgets.loaded = true;
            }
          });
          $.aug(twttr.events, dataName, config.Emitter);
          /** @type {function (string, Function): undefined} */
          bind = twttr.events.bind;
          /**
           * @param {string} type
           * @param {Function} callback
           * @return {undefined}
           */
          twttr.events.bind = function(type, callback) {
            reset();
            this.bind = bind;
            this.bind(type, callback);
          };
          tests.forEach(function(events) {
            twttr.events.bind(events[0], events[1]);
          });
          twttr._e.forEach(function($sanitize) {
            $.async(function() {
              $sanitize(twttr);
            });
          });
          /**
           * @param {?} handler
           * @return {undefined}
           */
          twttr.ready = function(handler) {
            $.async(function() {
              handler(twttr);
            });
          };
          twttr.widgets.load();
        });
      }
    }();
  }, {
    "performance/perf-timers" : 8,
    "tfw/factories" : 18,
    "tfw/hub/client" : 19,
    "tfw/util/article" : 20,
    "tfw/widget/base" : 27,
    "tfw/widget/embed" : 28,
    "tfw/widget/follow" : 29,
    "tfw/widget/intent" : 30,
    "tfw/widget/timeline" : 32,
    "tfw/widget/tweetbutton" : 33,
    "tfw/widget/video" : 34,
    "util/domready" : 38,
    "util/events" : 41,
    "util/logger" : 44,
    "util/util" : 52
  }],
  2 : [function(dataAndEvents, $) {
    /**
     * @param {Function} callback
     * @param {Object} win
     * @return {?}
     */
    function requestAnimationFrame(callback, win) {
      var i;
      return win = win || window, (i = win.requestAnimationFrame || (win.webkitRequestAnimationFrame || (win.mozRequestAnimationFrame || (win.msRequestAnimationFrame || (win.oRequestAnimationFrame || function() {
        win.setTimeout(function() {
          callback(+new Date);
        }, 1E3 / 60);
      })))))(callback);
    }
    /**
     * @param {number} dataAndEvents
     * @param {number} conversion
     * @return {?}
     */
    function _opacityVariator(dataAndEvents, conversion) {
      return Math.sin(Math.PI / 2 * conversion) * dataAndEvents;
    }
    /**
     * @param {Function} prop
     * @param {number} item
     * @param {number} index
     * @param {boolean} fn
     * @param {Object} element
     * @return {undefined}
     */
    function animate(prop, item, index, fn, element) {
      /**
       * @return {undefined}
       */
      function step() {
        /** @type {number} */
        var i = +new Date;
        /** @type {number} */
        var j = i - startIndex;
        /** @type {number} */
        var opts = Math.min(j / index, 1);
        var propName = fn ? fn(item, opts) : item * opts;
        /** @type {boolean} */
        var r20 = 1 == opts;
        prop(propName, r20);
        if (!r20) {
          requestAnimationFrame(step, element);
        }
      }
      /** @type {number} */
      var startIndex = +new Date;
      requestAnimationFrame(step);
    }
    $.exports = {
      /** @type {function (Function, number, number, boolean, Object): undefined} */
      animate : animate,
      /** @type {function (Function, Object): ?} */
      requestAnimationFrame : requestAnimationFrame,
      /** @type {function (number, number): ?} */
      easeOut : _opacityVariator
    };
  }, {}],
  3 : [function(dataAndEvents, module) {
    /**
     * @param {string} keepData
     * @return {?}
     */
    function classRE(keepData) {
      return new RegExp("\\b" + keepData + "\\b", "g");
    }
    /**
     * @param {Element} element
     * @param {string} name
     * @return {?}
     */
    function addClass(element, name) {
      return element.classList ? void element.classList.add(name) : void(classRE(name).test(element.className) || (element.className += " " + name));
    }
    /**
     * @param {Element} node
     * @param {string} name
     * @return {?}
     */
    function remove(node, name) {
      return node.classList ? void node.classList.remove(name) : void(node.className = node.className.replace(classRE(name), " "));
    }
    /**
     * @param {Element} node
     * @param {string} name
     * @param {number} value
     * @return {?}
     */
    function toggle(node, name, value) {
      return void 0 === value && (node.classList && node.classList.toggle) ? node.classList.toggle(name, value) : (value ? addClass(node, name) : remove(node, name), value);
    }
    /**
     * @param {Element} el
     * @param {string} name
     * @param {string} className
     * @return {?}
     */
    function initialize(el, name, className) {
      return el.classList && hasClass(el, name) ? (remove(el, name), void addClass(el, className)) : void(el.className = el.className.replace(classRE(name), className));
    }
    /**
     * @param {Element} node
     * @param {string} name
     * @return {?}
     */
    function hasClass(node, name) {
      return node.classList ? node.classList.contains(name) : classRE(name).test(node.className);
    }
    module.exports = {
      /** @type {function (Element, string): ?} */
      add : addClass,
      /** @type {function (Element, string): ?} */
      remove : remove,
      /** @type {function (Element, string, string): ?} */
      replace : initialize,
      /** @type {function (Element, string, number): ?} */
      toggle : toggle,
      /** @type {function (Element, string): ?} */
      present : hasClass
    };
  }, {}],
  4 : [function(dataAndEvents, $) {
    /**
     * @param {Object} node
     * @return {?}
     */
    function getDataId(node) {
      var firstByIndex = node.getAttribute("data-twitter-event-id");
      return firstByIndex ? firstByIndex : (node.setAttribute("data-twitter-event-id", ++_zipIdx), _zipIdx);
    }
    /**
     * @param {?} collection
     * @param {Object} object
     * @param {Event} obj
     * @return {undefined}
     */
    function toArray(collection, object, obj) {
      /** @type {number} */
      var idx = 0;
      var eolIdx = collection && collection.length || 0;
      /** @type {number} */
      idx = 0;
      for (;eolIdx > idx;idx++) {
        collection[idx].call(object, obj);
      }
    }
    /**
     * @param {Event} e
     * @param {?} options
     * @param {(Document|string)} dataObj
     * @return {undefined}
     */
    function func(e, options, dataObj) {
      var child = dataObj || (e.target || e.srcElement);
      var employees = child.className.split(" ");
      /** @type {number} */
      var i = 0;
      var l = employees.length;
      for (;l > i;i++) {
        toArray(options["." + employees[i]], child, e);
      }
      toArray(options[child.tagName], child, e);
      if (!e.cease) {
        if (child !== this) {
          func.call(this, e, options, child.parentElement || child.parentNode);
        }
      }
    }
    /**
     * @param {Object} value
     * @param {string} key
     * @param {Object} y
     * @param {?} success
     * @return {undefined}
     */
    function fn(value, key, y, success) {
      /**
       * @param {?} params
       * @return {undefined}
       */
      function handler(params) {
        func.call(value, params, y[key]);
      }
      callback(value, handler, key, success);
      value.addEventListener(key, handler, false);
    }
    /**
     * @param {Object} n
     * @param {Function} fn
     * @param {string} _
     * @param {?} success
     * @return {undefined}
     */
    function callback(n, fn, _, success) {
      if (n.id) {
        sources[n.id] = sources[n.id] || [];
        sources[n.id].push({
          el : n,
          /** @type {Function} */
          listener : fn,
          type : _,
          rootId : success
        });
      }
    }
    /**
     * @param {?} id
     * @return {undefined}
     */
    function onComplete(id) {
      var src = sources[id];
      if (src) {
        src.forEach(function(self) {
          self.el.removeEventListener(self.type, self.listener, false);
          delete done[self.rootId];
        });
        delete sources[id];
      }
    }
    /**
     * @param {Object} node
     * @param {string} type
     * @param {string} key
     * @param {Function} callback
     * @return {undefined}
     */
    function del(node, type, key, callback) {
      var id = getDataId(node);
      done[id] = done[id] || {};
      if (!done[id][type]) {
        done[id][type] = {};
        fn(node, type, done[id], id);
      }
      done[id][type][key] = done[id][type][key] || [];
      done[id][type][key].push(callback);
    }
    /**
     * @param {?} key
     * @param {Object} node
     * @param {Object} list
     * @return {undefined}
     */
    function getData(key, node, list) {
      var id = getDataId(node);
      var obj = done[id] && done[id];
      func.call(node, {
        target : list
      }, obj[key]);
    }
    /**
     * @param {Object} e
     * @return {?}
     */
    function stop(e) {
      return stopPropagation(e), preventDefault(e), false;
    }
    /**
     * @param {Object} ev
     * @return {undefined}
     */
    function preventDefault(ev) {
      if (ev && ev.preventDefault) {
        ev.preventDefault();
      } else {
        /** @type {boolean} */
        ev.returnValue = false;
      }
    }
    /**
     * @param {Function} e
     * @return {undefined}
     */
    function stopPropagation(e) {
      if (e && ((e.cease = true) && e.stopPropagation)) {
        e.stopPropagation();
      } else {
        /** @type {boolean} */
        e.cancelBubble = true;
      }
    }
    var done = {};
    /** @type {number} */
    var _zipIdx = -1;
    var sources = {};
    $.exports = {
      /** @type {function (Object): ?} */
      stop : stop,
      /** @type {function (Function): undefined} */
      stopPropagation : stopPropagation,
      /** @type {function (Object): undefined} */
      preventDefault : preventDefault,
      /** @type {function (Object, string, string, Function): undefined} */
      delegate : del,
      /** @type {function (?, Object, Object): undefined} */
      simulate : getData,
      /** @type {function (?): undefined} */
      removeDelegatesForWidget : onComplete
    };
  }, {}],
  5 : [function(dataAndEvents, module) {
    /**
     * @param {string} tag
     * @param {Object} node
     * @param {Node} context
     * @return {?}
     */
    function select(tag, node, context) {
      context = context || node && node.ownerDocument;
      var excludes;
      var cur = node && node.parentNode;
      if (cur && cur !== context) {
        return cur.tagName == tag ? cur : (excludes = cur.className.split(" "), 0 === tag.indexOf(".") && ~excludes.indexOf(tag.slice(1)) ? cur : select(tag, cur, context));
      }
    }
    module.exports = {
      /** @type {function (string, Object, Node): ?} */
      ancestor : select
    };
  }, {}],
  6 : [function(dataAndEvents, module) {
    /**
     * @param {Object} elem
     * @return {?}
     */
    function getText(elem) {
      return elem && 1 === elem.nodeType ? elem.offsetWidth || getText(elem.parentNode) : 0;
    }
    module.exports = {
      /** @type {function (Object): ?} */
      effectiveWidth : getText
    };
  }, {}],
  7 : [function(dataAndEvents, module) {
    /**
     * @param {string} style
     * @param {string} name
     * @param {Array} target
     * @return {?}
     */
    function normalize(style, name, target) {
      var src;
      /** @type {Array} */
      var comp = [];
      /** @type {number} */
      var t = 0;
      for (;src = target[t];t++) {
        comp.push(src[0]);
        comp.push(src[1]);
      }
      return style + name + comp.join(":");
    }
    /**
     * @param {string} target
     * @return {?}
     */
    function _(target) {
      var result = target || "";
      return result.replace(/([A-Z])/g, function(m3) {
        return "-" + m3.toLowerCase();
      });
    }
    var keys = {};
    /**
     * @param {string} style
     * @param {string} prefix
     * @param {Array} results
     * @return {?}
     */
    module.exports = function(style, prefix, results) {
      var item;
      /** @type {Element} */
      var el = document.createElement("span");
      var key = {};
      /** @type {string} */
      var value = "";
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var root = 0;
      /** @type {Array} */
      var tagNameArr = [];
      if (results = results || [], prefix = prefix || "", value = normalize(style, prefix, results), keys[value]) {
        return keys[value];
      }
      /** @type {string} */
      el.className = prefix + " twitter-measurement";
      try {
        for (;item = results[i];i++) {
          el.style[item[0]] = item[1];
        }
      } catch (f) {
        for (;item = results[root];root++) {
          tagNameArr.push(_(item[0]) + ":" + item[1]);
        }
        el.setAttribute("style", tagNameArr.join(";") + ";");
      }
      return el.innerHTML = style, document.body.appendChild(el), key.width = el.clientWidth || el.offsetWidth, key.height = el.clientHeight || el.offsetHeight, document.body.removeChild(el), el = null, keys[value] = key;
    };
  }, {}],
  8 : [function(require, module) {
    /**
     * @param {string} type
     * @return {undefined}
     */
    function now(type) {
      /** @type {number} */
      special[type] = +new Date;
    }
    /**
     * @param {string} type
     * @return {?}
     */
    function Event(type) {
      return special[type] ? +new Date - special[type] : null;
    }
    /**
     * @param {string} args
     * @param {string} type
     * @param {string} element
     * @param {Object} callback
     * @param {number} ui
     * @return {undefined}
     */
    function start(args, type, element, callback, ui) {
      var selector = Event(type);
      if (selector) {
        add(args, element, callback, selector, ui);
      }
    }
    /**
     * @param {string} args
     * @param {string} child
     * @param {Object} items
     * @param {?} selector
     * @param {number} e
     * @return {undefined}
     */
    function add(args, child, items, selector, e) {
      var attributes;
      var method = void 0 === e ? create : e;
      if (!(100 * Math.random() > method)) {
        items = Block.aug(items || {}, {
          duration_ms : selector
        });
        attributes = {
          page : child,
          component : "performance",
          action : args
        };
        Base.clientEvent(attributes, items, true);
      }
    }
    var Base = require("scribe/pixel");
    var Block = require("util/util");
    var special = {};
    /** @type {number} */
    var create = 1;
    module.exports = {
      /** @type {function (string): undefined} */
      start : now,
      /** @type {function (string): ?} */
      end : Event,
      /** @type {function (string, string, Object, ?, number): undefined} */
      track : add,
      /** @type {function (string, string, string, Object, number): undefined} */
      endAndTrack : start
    };
  }, {
    "scribe/pixel" : 16,
    "util/util" : 52
  }],
  9 : [function(Event, module) {
    /**
     * @return {undefined}
     */
    function Map() {
      this.registry = {};
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function convert(value) {
      return Assert.isType("string", value) ? JSON.parse(value) : value;
    }
    /**
     * @param {Object} data
     * @return {?}
     */
    function fn(data) {
      var e;
      var isIE;
      var strict;
      return Assert.isObject(data) ? (e = data.jsonrpc === success, isIE = Assert.isType("string", data.method), strict = !("id" in data) || stringify(data.id), e && (isIE && strict)) : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function stringify(value) {
      var ret;
      var result;
      var groupResult;
      return ret = Assert.isType("string", value), result = Assert.isType("number", value), groupResult = null === value, ret || (result || groupResult);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function cb(value) {
      return Assert.isObject(value) && !Assert.isType("function", value);
    }
    /**
     * @param {string} raw
     * @param {Object} a
     * @return {?}
     */
    function c(raw, a) {
      return{
        jsonrpc : success,
        id : raw,
        result : a
      };
    }
    /**
     * @param {Object} id
     * @param {Function} value
     * @return {?}
     */
    function callback(id, value) {
      return{
        jsonrpc : success,
        id : stringify(id) ? id : null,
        /** @type {Function} */
        error : value
      };
    }
    /**
     * @param {?} args
     * @return {?}
     */
    function read(args) {
      return self.every.apply(self, args).then(function(errors) {
        return errors = errors.filter(function(dataAndEvents) {
          return void 0 !== dataAndEvents;
        }), errors.length ? errors : void 0;
      });
    }
    var Assert = Event("util/util");
    var self = Event("util/promise");
    /** @type {string} */
    var success = "2.0";
    var error = {
      code : -32700,
      message : "Parse error"
    };
    var host = {
      code : -32600,
      message : "Invalid Request"
    };
    var data = {
      code : -32602,
      message : "Invalid params"
    };
    var status = {
      code : -32601,
      message : "Method not found"
    };
    var ex = {
      code : -32603,
      message : "Internal error"
    };
    /**
     * @param {Object} action
     * @param {Object} location
     * @return {?}
     */
    Map.prototype._invoke = function(action, location) {
      var fulfilled;
      var array;
      var result;
      fulfilled = this.registry[action.method];
      array = action.params || [];
      array = Assert.isType("array", array) ? array : [array];
      try {
        result = fulfilled.apply(location.source || null, array);
      } catch (e) {
        result = self.reject(e.message);
      }
      return self.isThenable(result) ? result : self.fulfill(result);
    };
    /**
     * @param {Object} msg
     * @param {Object} buffer
     * @return {?}
     */
    Map.prototype._processRequest = function(msg, buffer) {
      /**
       * @param {Object} i
       * @return {?}
       */
      function resolved(i) {
        return c(msg.id, i);
      }
      /**
       * @return {?}
       */
      function onError() {
        return callback(msg.id, ex);
      }
      var e;
      return fn(msg) ? (e = "params" in msg && !cb(msg.params) ? self.fulfill(callback(msg.id, data)) : this.registry[msg.method] ? this._invoke(msg, {
        source : buffer
      }).then(resolved, onError) : self.fulfill(callback(msg.id, status)), null != msg.id ? e : self.fulfill()) : self.fulfill(callback(msg.id, host));
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Map.prototype.attachListener = function(element) {
      return element.attachTo(this), this;
    };
    /**
     * @param {string} type
     * @param {Function} callback
     * @return {?}
     */
    Map.prototype.bind = function(type, callback) {
      return this.registry[type] = callback, this;
    };
    /**
     * @param {Object} value
     * @param {string} data
     * @return {?}
     */
    Map.prototype.receive = function(value, data) {
      var r;
      var v;
      var args;
      var logger = this;
      try {
        value = convert(value);
      } catch (a) {
        return self.fulfill(callback(null, error));
      }
      return data = data || null, r = Assert.isType("array", value), v = r ? value : [value], args = v.map(function(errmsg) {
        return logger._processRequest(errmsg, data);
      }), r ? read(args) : args[0];
    };
    /** @type {function (): undefined} */
    module.exports = Map;
  }, {
    "util/promise" : 46,
    "util/util" : 52
  }],
  10 : [function(require, module) {
    /**
     * @param {?} channel
     * @param {?} message
     * @return {undefined}
     */
    function callback(channel, message) {
      if (channel) {
        if (channel.postMessage) {
          message = subs ? JSON.stringify(message) : message;
          channel.postMessage(message, "*");
        }
      }
    }
    /**
     * @param {HTMLElement} win
     * @return {undefined}
     */
    function init(win) {
      var doc = win.document;
      /** @type {null} */
      this.server = null;
      this.isTwitterFrame = should.isTwitterURL(doc.location.href);
      win.addEventListener("message", this._onMessage.bind(this), false);
    }
    /**
     * @param {string} target
     * @return {undefined}
     */
    function constructor(target) {
      this.pending = {};
      /** @type {string} */
      this.target = target;
      this.isTwitterHost = should.isTwitterURL(document.location.href);
      window.addEventListener("message", this._onMessage.bind(this), false);
    }
    /**
     * @param {?} failing_message
     * @return {?}
     */
    function report(failing_message) {
      return arguments.length > 0 && (subs = !!failing_message), subs;
    }
    var dojo = require("util/util");
    var Block = require("util/env");
    var should = require("util/twitter");
    var Event = require("util/promise");
    var subs = Block.ie9();
    dojo.aug(init.prototype, {
      /**
       * @param {Object} e
       * @return {undefined}
       */
      _onMessage : function(e) {
        if (this.server) {
          if (!this.isTwitterFrame || should.isTwitterURL(e.origin)) {
            this.server.receive(e.data, e.source).then(function(output) {
              if (output) {
                callback(e.source, output);
              }
            });
          }
        }
      },
      /**
       * @param {string} dataAndEvents
       * @return {undefined}
       */
      attachTo : function(dataAndEvents) {
        /** @type {string} */
        this.server = dataAndEvents;
      },
      /**
       * @return {undefined}
       */
      detach : function() {
        /** @type {null} */
        this.server = null;
      }
    });
    dojo.aug(constructor.prototype, {
      /**
       * @param {Object} data
       * @return {undefined}
       */
      _processResponse : function(data) {
        var ret = this.pending[data.id];
        if (ret) {
          ret.fulfill(data);
          delete this.pending[data.id];
        }
      },
      /**
       * @param {MessageEvent} e
       * @return {undefined}
       */
      _onMessage : function(e) {
        var value = e.data;
        if (!this.isTwitterHost || should.isTwitterURL(e.origin)) {
          if (dojo.isType("string", value)) {
            try {
              /** @type {*} */
              value = JSON.parse(value);
            } catch (i) {
              return;
            }
          }
          /** @type {*} */
          value = dojo.isType("array", value) ? value : [value];
          value.forEach(this._processResponse.bind(this));
        }
      },
      /**
       * @param {Object} data
       * @return {?}
       */
      send : function(data) {
        var done;
        var pending = this.pending;
        return done = data.id ? new Event(function(c) {
          pending[data.id] = c;
        }) : Event.fulfill(), callback(this.target, data), done;
      }
    });
    module.exports = {
      /** @type {function (HTMLElement): undefined} */
      Listener : init,
      /** @type {function (string): undefined} */
      Transport : constructor,
      /** @type {function (?): ?} */
      _stringifyPayload : report
    };
  }, {
    "util/env" : 40,
    "util/promise" : 46,
    "util/twitter" : 49,
    "util/util" : 52
  }],
  11 : [function(require, module) {
    /**
     * @param {Object} eventName
     * @param {Object} rows
     * @param {Function} delta
     * @param {Function} firstTime
     * @return {undefined}
     */
    function render(eventName, rows, delta, firstTime) {
      var me;
      var info = this;
      this.readyPromise = new Dom(function(resolver) {
        info.resolver = resolver;
      });
      this.attrs = eventName || {};
      this.styles = rows || {};
      this.appender = delta || function(object) {
        document.body.appendChild(object);
      };
      this.layout = firstTime || function(fn) {
        return new Dom(function(r) {
          return r.fulfill(fn());
        });
      };
      this.frame = me = each(this.attrs, this.styles);
      me.onreadystatechange = me.onload = this.getCallback(this.onLoad);
      this.layout(function() {
        info.appender(me);
      });
    }
    var Block = require("util/env");
    var each = require("util/iframe");
    var Dom = require("util/promise");
    /** @type {number} */
    var callback_counter = 0;
    window.twttr = window.twttr || {};
    window.twttr.sandbox = window.twttr.sandbox || {};
    /**
     * @param {Function} fn
     * @return {?}
     */
    render.prototype.getCallback = function(fn) {
      var elems = this;
      /** @type {boolean} */
      var i = false;
      return function() {
        if (!i) {
          /** @type {boolean} */
          i = true;
          fn.call(elems);
        }
      };
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    render.prototype.registerCallback = function(fn) {
      /** @type {string} */
      var name = "cb" + callback_counter++;
      return window.twttr.sandbox[name] = fn, name;
    };
    /**
     * @return {?}
     */
    render.prototype.onLoad = function() {
      try {
        this.document = this.frame.contentWindow.document;
      } catch (t) {
        return void this.setDocDomain();
      }
      this.writeStandardsDoc();
      this.resolver.fulfill(this);
    };
    /**
     * @return {?}
     */
    render.prototype.ready = function() {
      return this.readyPromise;
    };
    /**
     * @return {undefined}
     */
    render.prototype.setDocDomain = function() {
      var self = this;
      var frame = each(this.attrs, this.styles);
      var registerCallback = this.registerCallback(this.getCallback(this.onLoad));
      /** @type {string} */
      frame.src = ["javascript:", 'document.write("");', "try { window.parent.document; }", "catch (e) {", 'document.domain="' + document.domain + '";', "}", 'window.parent.twttr.sandbox["' + registerCallback + '"]();'].join("");
      this.layout(function() {
        self.frame.parentNode.removeChild(this.thisBaseFrame);
        /** @type {null} */
        self.frame = null;
        if (self.appender) {
          self.appender(frame);
        } else {
          document.body.appendChild(frame);
        }
        self.frame = frame;
      });
    };
    /**
     * @return {undefined}
     */
    render.prototype.writeStandardsDoc = function() {
      if (Block.anyIE() && !Block.cspEnabled()) {
        /** @type {string} */
        var cmd = ["<!DOCTYPE html>", "<html>", "<head>", "<scr", "ipt>", "try { window.parent.document; }", 'catch (e) {document.domain="' + document.domain + '";}', "</scr", "ipt>", "</head>", "<body></body>", "</html>"].join("");
        this.document.write(cmd);
        this.document.close();
      }
    };
    /** @type {function (Object, Object, Function, Function): undefined} */
    module.exports = render;
  }, {
    "util/env" : 40,
    "util/iframe" : 42,
    "util/promise" : 46
  }],
  12 : [function(require, s) {
    /**
     * @return {undefined}
     */
    function onMouseMove() {
      var mat;
      var expr;
      imageSizes = {};
      if (!o) {
        /** @type {number} */
        mat = document.body.offsetHeight;
        /** @type {number} */
        expr = document.body.offsetWidth;
        if (mat != dest || expr != old) {
          filenames.forEach(function(assert) {
            assert.dispatchFrameResize(old, dest);
          });
          /** @type {number} */
          dest = mat;
          /** @type {number} */
          old = expr;
        }
      }
    }
    /**
     * @param {Element} options
     * @return {?}
     */
    function ready(options) {
      var res;
      return options.id ? options.id : (res = options.getAttribute("data-twttr-id")) ? res : (res = "twttr-sandbox-" + twttr_sandbox_++, options.setAttribute("data-twttr-id", res), res);
    }
    /**
     * @param {Object} ev
     * @param {?} api
     * @return {undefined}
     */
    function handler(ev, api) {
      var dispatchFrameResize = this;
      fn.apply(this, [ev, api]);
      /** @type {Array} */
      this._resizeHandlers = [];
      filenames = filenames.filter(function(d) {
        var parentElement = d._frame.parentElement;
        return parentElement || $.async(function() {
          assert.removeDelegatesForWidget(d._frame.id);
        }), parentElement;
      });
      filenames.push(this);
      this._win.addEventListener("resize", function() {
        dispatchFrameResize.dispatchFrameResize();
      }, false);
    }
    var o;
    var Model = require("sandbox/baseframe");
    var fn = require("sandbox/minimal");
    var config = require("util/env");
    var RSVP = require("util/promise");
    var $ = require("util/util");
    var assert = require("dom/delegate");
    /** @type {number} */
    var twttr_sandbox_ = 0;
    /** @type {Array} */
    var filenames = [];
    var imageSizes = {};
    /** @type {number} */
    var old = 0;
    /** @type {number} */
    var dest = 0;
    window.addEventListener("resize", onMouseMove, false);
    handler.prototype = new fn;
    $.aug(handler.prototype, {
      /**
       * @return {undefined}
       */
      dispatchFrameResize : function() {
        var pn = this._frame.parentNode;
        var src = ready(pn);
        var img = imageSizes[src];
        /** @type {boolean} */
        o = true;
        if (this._resizeHandlers.length) {
          if (!img) {
            img = imageSizes[src] = {
              w : this._frame.offsetWidth,
              h : this._frame.offsetHeight
            };
          }
          if (this._frameWidth != img.w || this._frameHeight != img.h) {
            this._frameWidth = img.w;
            this._frameHeight = img.h;
            this._resizeHandlers.forEach(function(resize) {
              resize(img.w, img.h);
            });
            window.setTimeout(function() {
              imageSizes = {};
            }, 50);
          }
        }
      },
      /**
       * @param {?} url
       * @return {?}
       */
      appendStyleSheet : function(url) {
        var self = this;
        var link = this._doc.createElement("link");
        return link.type = "text/css", link.rel = "stylesheet", link.href = url, this.layout(function() {
          return self._head.appendChild(link);
        });
      },
      /**
       * @param {string} text
       * @return {?}
       */
      appendCss : function(text) {
        var style;
        var self = this;
        return config.cspEnabled() ? RSVP.reject("CSP enabled; cannot embed inline styles.") : (style = this._doc.createElement("style"), style.type = "text/css", style.styleSheet ? style.styleSheet.cssText = text : style.appendChild(this._doc.createTextNode(text)), this.layout(function() {
          return self._head.appendChild(style);
        }));
      },
      /**
       * @param {string} expectedHashCode
       * @return {?}
       */
      style : function(expectedHashCode) {
        var instance = this;
        return this.layout(function() {
          $.forIn(expectedHashCode, function(name, region) {
            /** @type {string} */
            instance._frame.style[name] = region;
          });
        });
      },
      /**
       * @param {?} spaceName
       * @return {undefined}
       */
      onresize : function(spaceName) {
        this._resizeHandlers.push(spaceName);
      },
      /**
       * @param {string} expectedHashCode
       * @return {?}
       */
      width : function(expectedHashCode) {
        return void 0 !== expectedHashCode && (this._frame.style.width = expectedHashCode + "px"), config.ios() ? Math.min(this._frame.parentNode.offsetWidth, this._frame.offsetWidth) : this._frame.offsetWidth;
      },
      /**
       * @param {string} expectedHashCode
       * @return {?}
       */
      height : function(expectedHashCode) {
        return void 0 !== expectedHashCode && (this._frame.height = expectedHashCode), this._frame.offsetHeight;
      }
    });
    /**
     * @param {?} opt_attributes
     * @param {?} options
     * @param {Function} colLabels
     * @param {?} $goKey
     * @return {?}
     */
    handler.createSandbox = function(opt_attributes, options, colLabels, $goKey) {
      var model = new Model(opt_attributes, options, colLabels, $goKey);
      return model.ready().then(function(settings) {
        return new handler(settings.frame, settings.layout);
      });
    };
    /** @type {function (Object, ?): undefined} */
    s.exports = handler;
  }, {
    "dom/delegate" : 4,
    "sandbox/baseframe" : 11,
    "sandbox/minimal" : 13,
    "util/env" : 40,
    "util/promise" : 46,
    "util/util" : 52
  }],
  13 : [function(require, module) {
    /**
     * @param {Object} fn
     * @param {string} allBindingsAccessor
     * @return {undefined}
     */
    function init(fn, allBindingsAccessor) {
      if (fn) {
        /** @type {Object} */
        this._frame = fn;
        this._win = fn.contentWindow;
        this._doc = this._win.document;
        this._body = this._doc.body;
        this._head = this._body.parentNode.children[0];
        /** @type {string} */
        this.layout = allBindingsAccessor;
      }
    }
    var Model = require("sandbox/baseframe");
    var assert = require("util/util");
    assert.aug(init.prototype, {
      /**
       * @param {string} nodeName
       * @return {?}
       */
      createElement : function(nodeName) {
        return this._doc.createElement(nodeName);
      },
      /**
       * @return {?}
       */
      createDocumentFragment : function() {
        return this._doc.createDocumentFragment();
      },
      /**
       * @param {(Range|TextRange)} element
       * @return {?}
       */
      appendChild : function(element) {
        var that = this;
        return this.layout(function() {
          return that._body.appendChild(element);
        });
      },
      /**
       * @param {Object} opt_target
       * @return {?}
       */
      setBaseTarget : function(opt_target) {
        var self = this;
        var elements = this._doc.createElement("base");
        return elements.target = opt_target, this.layout(function() {
          return self._head.appendChild(elements);
        });
      },
      /**
       * @param {string} title
       * @return {undefined}
       */
      setTitle : function(title) {
        if (title) {
          /** @type {string} */
          this._frame.title = title;
        }
      },
      /**
       * @return {?}
       */
      element : function() {
        return this._frame;
      },
      /**
       * @return {?}
       */
      document : function() {
        return this._doc;
      }
    });
    /**
     * @param {?} opt_attributes
     * @param {?} options
     * @param {Function} colLabels
     * @param {?} $goKey
     * @return {?}
     */
    init.createSandbox = function(opt_attributes, options, colLabels, $goKey) {
      var model = new Model(opt_attributes, options, colLabels, $goKey);
      return model.ready().then(function(settings) {
        return new init(settings.frame, settings.layout);
      });
    };
    /** @type {function (Object, string): undefined} */
    module.exports = init;
  }, {
    "sandbox/baseframe" : 11,
    "util/util" : 52
  }],
  14 : [function(require, module) {
    /**
     * @return {?}
     */
    function isA() {
      return router.formatGenericEventData("syndicated_impression", {});
    }
    /**
     * @return {undefined}
     */
    function get() {
      $("tweet");
    }
    /**
     * @return {undefined}
     */
    function addRow() {
      $("timeline");
    }
    /**
     * @return {undefined}
     */
    function acornPlayer() {
      $("video");
    }
    /**
     * @return {undefined}
     */
    function set() {
      $("customtweet");
    }
    /**
     * @param {string} id
     * @return {undefined}
     */
    function $(id) {
      if (!nodes.isHostPageSensitive()) {
        if (!done[id]) {
          /** @type {boolean} */
          done[id] = true;
          Block.scribe(router.formatClientEventNamespace({
            page : id,
            action : "impression"
          }), isA(), router.AUDIENCE_ENDPOINT);
        }
      }
    }
    var Block = require("scribe/pixel");
    var router = require("scribe/util");
    var nodes = require("util/tld");
    var done = {};
    module.exports = {
      /** @type {function (): undefined} */
      scribeCustomTweetAudienceImpression : set,
      /** @type {function (): undefined} */
      scribeTweetAudienceImpression : get,
      /** @type {function (): undefined} */
      scribeTimelineAudienceImpression : addRow,
      /** @type {function (): undefined} */
      scribeVideoAudienceImpression : acornPlayer,
      /**
       * @return {undefined}
       */
      resetTracking : function() {
        done = {};
      }
    };
  }, {
    "scribe/pixel" : 16,
    "scribe/util" : 17,
    "util/tld" : 48
  }],
  15 : [function(require, Class) {
    /**
     * @return {?}
     */
    function init() {
      return escape ? _ : (nodes.createSandbox({
        id : "rufous-sandbox"
      }, {
        display : "none"
      }).then(function(_d) {
        /** @type {Element} */
        d = _d;
        frame = createFrame();
        value = callback();
        result.fulfill([frame, value]);
      }), escape = true, _);
    }
    /**
     * @param {string} doc
     * @param {?} params
     * @return {undefined}
     */
    function update(doc, params) {
      var x;
      var node;
      var object;
      if (assert.isObject(doc)) {
        if (assert.isObject(params)) {
          object = options.flattenClientEventPayload(doc, params);
          x = frame.firstChild;
          /** @type {number} */
          x.value = +(+x.value || (object.dnt || 0));
          node = d.createElement("input");
          /** @type {string} */
          node.type = "hidden";
          /** @type {string} */
          node.name = "l";
          node.value = options.stringify(object);
          frame.appendChild(node);
        }
      }
    }
    /**
     * @param {?} opt_attributes
     * @param {Object} key
     * @param {boolean} deepDataAndEvents
     * @return {undefined}
     */
    function walk(opt_attributes, key, deepDataAndEvents) {
      /** @type {boolean} */
      var r = !assert.isObject(opt_attributes);
      /** @type {boolean} */
      var id = key ? !assert.isObject(key) : false;
      if (!r) {
        if (!id) {
          _.then(function() {
            update(options.formatClientEventNamespace(opt_attributes), options.formatClientEventData(key, deepDataAndEvents));
          });
        }
      }
    }
    /**
     * @return {?}
     */
    function load() {
      return _.then(function() {
        if (frame.children.length <= 2) {
          return list.reject();
        }
        var t = list.every(d.appendChild(frame), d.appendChild(value)).then(function(json) {
          var data = json[0];
          var tag = json[1];
          return tag.addEventListener("load", function() {
            template(data, tag)();
            twttr.events.trigger("logFlushed");
          }), data.submit(), json;
        });
        return frame = createFrame(), value = callback(), t;
      });
    }
    /**
     * @param {Node} node
     * @param {?} text
     * @return {?}
     */
    function template(node, text) {
      return function() {
        var pn = node.parentNode;
        if (pn) {
          pn.removeChild(node);
          pn.removeChild(text);
        }
      };
    }
    /**
     * @return {?}
     */
    function createFrame() {
      var form = d.createElement("form");
      var field = d.createElement("input");
      var input = d.createElement("input");
      return id++, form.action = options.CLIENT_EVENT_ENDPOINT, form.method = "POST", form.target = type + id, form.id = id_prefix + id, field.type = "hidden", field.name = "dnt", field.value = mod.enabled(), input.type = "hidden", input.name = "tfw_redirect", input.value = options.RUFOUS_REDIRECT, form.appendChild(field), form.appendChild(input), form;
    }
    /**
     * @return {?}
     */
    function callback() {
      var key = type + id;
      return next({
        id : key,
        name : key,
        width : 0,
        height : 0,
        border : 0
      }, {
        display : "none"
      }, d.document());
    }
    var frame;
    var value;
    var d;
    var result;
    var next = require("util/iframe");
    var mod = require("util/donottrack");
    var nodes = require("sandbox/minimal");
    var list = require("util/promise");
    var options = require("scribe/util");
    var assert = require("util/util");
    /** @type {string} */
    var base = Math.floor(1E3 * Math.random()) + "_";
    /** @type {string} */
    var type = "rufous-frame-" + base + "-";
    /** @type {string} */
    var id_prefix = "rufous-form-" + base + "-";
    /** @type {number} */
    var id = 0;
    /** @type {boolean} */
    var escape = false;
    var _ = new list(function(subKey) {
      result = subKey;
    });
    Class.exports = {
      /** @type {function (?, Object, boolean): undefined} */
      clientEvent : walk,
      /** @type {function (): ?} */
      flush : load,
      /** @type {function (): ?} */
      init : init
    };
  }, {
    "sandbox/minimal" : 13,
    "scribe/util" : 17,
    "util/donottrack" : 39,
    "util/iframe" : 42,
    "util/promise" : 46,
    "util/util" : 52
  }],
  16 : [function(require, module) {
    /**
     * @param {(Error|string)} attributes
     * @param {Object} data
     * @param {boolean} deepDataAndEvents
     * @return {?}
     */
    function clone(attributes, data, deepDataAndEvents) {
      return success(attributes, data, deepDataAndEvents, 2);
    }
    /**
     * @param {?} opt_attributes
     * @param {Object} data
     * @param {boolean} deepDataAndEvents
     * @param {number} json
     * @return {undefined}
     */
    function success(opt_attributes, data, deepDataAndEvents, json) {
      /** @type {boolean} */
      var r = !assert.isObject(opt_attributes);
      /** @type {boolean} */
      var hash = data ? !assert.isObject(data) : false;
      if (!r) {
        if (!hash) {
          save(options.formatClientEventNamespace(opt_attributes), options.formatClientEventData(data, deepDataAndEvents, json), options.CLIENT_EVENT_ENDPOINT);
        }
      }
    }
    /**
     * @param {Event} event
     * @param {Object} a
     * @param {boolean} deepDataAndEvents
     * @param {string} eventName
     * @return {undefined}
     */
    function listener(event, a, deepDataAndEvents, eventName) {
      var attributes = options.extractTermsFromDOM(event.target || event.srcElement);
      attributes.action = eventName || "click";
      success(attributes, a, deepDataAndEvents);
    }
    /**
     * @param {string} obj
     * @param {?} key
     * @param {string} value
     * @return {undefined}
     */
    function save(obj, key, value) {
      var data;
      var name;
      if (value) {
        if (assert.isObject(obj)) {
          if (assert.isObject(key)) {
            data = options.flattenClientEventPayload(obj, key);
            name = {
              l : options.stringify(data)
            };
            if (data.dnt) {
              /** @type {number} */
              name.dnt = 1;
            }
            callback(jQuery.url(value, name));
          }
        }
      }
    }
    /**
     * @param {Object} a
     * @param {Object} key
     * @param {boolean} deepDataAndEvents
     * @param {number} buffer
     * @return {?}
     */
    function inject(a, key, deepDataAndEvents, buffer) {
      var r20;
      /** @type {boolean} */
      var computed = !assert.isObject(a);
      /** @type {boolean} */
      var value = key ? !assert.isObject(key) : false;
      if (!computed && !value) {
        return r20 = options.flattenClientEventPayload(options.formatClientEventNamespace(a), options.formatClientEventData(key, deepDataAndEvents, buffer)), replace(r20);
      }
    }
    /**
     * @param {?} regex
     * @return {?}
     */
    function replace(regex) {
      return data.push(regex), data;
    }
    /**
     * @return {?}
     */
    function init() {
      var arr;
      var mod;
      var sel = jQuery.url(options.CLIENT_EVENT_ENDPOINT, {
        dnt : 0,
        l : ""
      });
      /** @type {number} */
      var totalSize = encodeURIComponent(sel).length;
      return data.length > 1 && inject({
        page : "widgets_js",
        component : "scribe_pixel",
        action : "batch_log"
      }, {}), arr = data, data = [], mod = arr.reduce(function(a, event, l) {
        var sel;
        var px;
        var al = a.length;
        var data = al && a[al - 1];
        /** @type {boolean} */
        var u = l + 1 == arr.length;
        return u && (event.event_namespace && ("batch_log" == event.event_namespace.action && (event.message = ["entries:" + l, "requests:" + al].join("/")))), sel = options.stringify(event), px = encodeURIComponent(sel).length + 3, totalSize + px > MAX_ATTACHMENT_SIZE ? a : ((!data || data.urlLength + px > MAX_ATTACHMENT_SIZE) && (data = {
          urlLength : totalSize,
          items : []
        }, a.push(data)), data.urlLength += px, data.items.push(sel), a);
      }, []), mod.map(function(c) {
        var name = {
          l : c.items
        };
        return mod.enabled() && (name.dnt = 1), callback(jQuery.url(options.CLIENT_EVENT_ENDPOINT, name));
      });
    }
    /**
     * @param {?} frame
     * @return {?}
     */
    function callback(frame) {
      /** @type {Image} */
      var image = new Image;
      return image.src = frame;
    }
    var mod = require("util/donottrack");
    var jQuery = require("util/querystring");
    var options = require("scribe/util");
    var assert = require("util/util");
    /** @type {number} */
    var MAX_ATTACHMENT_SIZE = 2083;
    /** @type {Array} */
    var data = [];
    module.exports = {
      /** @type {function (?): ?} */
      _enqueueRawObject : replace,
      /** @type {function (string, ?, string): undefined} */
      scribe : save,
      /** @type {function (?, Object, boolean, number): undefined} */
      clientEvent : success,
      /** @type {function ((Error|string), Object, boolean): ?} */
      clientEvent2 : clone,
      /** @type {function (Object, Object, boolean, number): ?} */
      enqueueClientEvent : inject,
      /** @type {function (): ?} */
      flushClientEvents : init,
      /** @type {function (Event, Object, boolean, string): undefined} */
      interaction : listener
    };
  }, {
    "scribe/util" : 17,
    "util/donottrack" : 39,
    "util/querystring" : 47,
    "util/util" : 52
  }],
  17 : [function(require, module) {
    /**
     * @param {Object} c
     * @param {Object} className
     * @return {?}
     */
    function removeClass(c, className) {
      var uHostName;
      return className = className || {}, c && c.nodeType === Node.ELEMENT_NODE ? ((uHostName = c.getAttribute("data-scribe")) && uHostName.split(" ").forEach(function(buf) {
        var owner = buf.trim().split(":");
        var unlock = owner[0];
        var data = owner[1];
        if (unlock) {
          if (data) {
            if (!className[unlock]) {
              className[unlock] = data;
            }
          }
        }
      }), removeClass(c.parentNode, className)) : className;
    }
    /**
     * @param {Object} opt_attributes
     * @return {?}
     */
    function createDom(opt_attributes) {
      return jQuery.aug({
        client : "tfw"
      }, opt_attributes || {});
    }
    /**
     * @param {Object} doc
     * @param {boolean} deepDataAndEvents
     * @param {number} data
     * @return {?}
     */
    function emit(doc, deepDataAndEvents, data) {
      var collection = doc && doc.widget_origin || document.referrer;
      return doc = callback("tfw_client_event", doc, collection), doc.client_version = html, doc.format_version = void 0 !== data ? data : 1, deepDataAndEvents || (doc.widget_origin = collection), doc;
    }
    /**
     * @param {string} __
     * @param {Object} doc
     * @param {Object} key
     * @return {?}
     */
    function callback(__, doc, key) {
      return doc = doc || {}, jQuery.aug(doc, {
        _category_ : __,
        triggered_on : doc.triggered_on || +new Date,
        dnt : options.enabled(key)
      });
    }
    /**
     * @param {string} var_args
     * @param {?} b
     * @return {?}
     */
    function extend(var_args, b) {
      return jQuery.aug({}, b, {
        event_namespace : var_args
      });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function stringify(value) {
      var isFunction;
      /** @type {function (this:Object, string=): *} */
      var toJSON = Array.prototype.toJSON;
      return delete Array.prototype.toJSON, isFunction = JSON.stringify(value), toJSON && (Array.prototype.toJSON = toJSON), isFunction;
    }
    var options = require("util/donottrack");
    var jQuery = require("util/util");
    /** @type {string} */
    var html = "30a3086d4fc9d794a5ec6b977234b90a9b946f5d:1421268029183";
    /** @type {string} */
    var guess = "https://syndication.twitter.com/i/jot";
    /** @type {string} */
    var realType = "https://syndication.twitter.com/i/jot/syndication";
    /** @type {string} */
    var dep = "https://platform.twitter.com/jot.html";
    window.twttr = window.twttr || {};
    if (twttr.widgets) {
      if (twttr.widgets.endpoints) {
        guess = twttr.widgets.endpoints.rufous || guess;
        realType = twttr.widgets.endpoints.rufous || realType;
        dep = twttr.widgets.endpoints.rufousRedirect || dep;
      }
    }
    module.exports = {
      /** @type {function (Object, Object): ?} */
      extractTermsFromDOM : removeClass,
      /** @type {function (string, ?): ?} */
      flattenClientEventPayload : extend,
      /** @type {function (string, Object, Object): ?} */
      formatGenericEventData : callback,
      /** @type {function (Object, boolean, number): ?} */
      formatClientEventData : emit,
      /** @type {function (Object): ?} */
      formatClientEventNamespace : createDom,
      /** @type {function (?): ?} */
      stringify : stringify,
      AUDIENCE_ENDPOINT : realType,
      CLIENT_EVENT_ENDPOINT : guess,
      RUFOUS_REDIRECT : dep
    };
  }, {
    "util/donottrack" : 39,
    "util/util" : 52
  }],
  18 : [function($, module) {
    /**
     * @param {Array} opt_attributes
     * @param {Function} obj
     * @param {?} replacementHash
     * @param {?} func
     * @return {?}
     */
    function bind(opt_attributes, obj, replacementHash, func) {
      return opt_attributes = opt_attributes || [], replacementHash = replacementHash || {}, function() {
        var callback;
        var type;
        var doc;
        var res;
        /** @type {Array.<?>} */
        var args = Array.prototype.slice.apply(arguments, [0, opt_attributes.length]);
        /** @type {Array.<?>} */
        var resolveValues = Array.prototype.slice.apply(arguments, [opt_attributes.length]);
        return resolveValues.forEach(function(value) {
          return value ? 1 === value.nodeType ? void(doc = value) : el.isType("function", value) ? void(callback = value) : void(el.isType("object", value) && (type = value)) : void 0;
        }), args.length != opt_attributes.length || 0 === resolveValues.length ? (callback && el.async(function() {
          callback(false);
        }), $q.reject("Not enough parameters")) : doc ? (type = el.aug(type || {}, replacementHash), type.targetEl = doc, opt_attributes.forEach(function(capture) {
          type[capture] = args.shift();
        }), res = new obj(type), west.doLayout(), res.render(), func && func(), callback && res.completed().then(callback, function() {
          callback(false);
        }), res.completed()) : (callback && el.async(function() {
          callback(false);
        }), $q.reject("No target specified"));
      };
    }
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function update(options) {
      var t;
      options.linkColor = options.linkColor || options.previewParams.link_color;
      options.theme = options.theme || options.previewParams.theme;
      options.height = options.height || options.previewParams.height;
      t = new object(options);
      this.render = t.render.bind(t);
      this.completed = t.completed.bind(t);
    }
    var el = $("util/util");
    var $q = $("util/promise");
    var t = $("util/twitter");
    var west = $("tfw/widget/base");
    var self = $("tfw/widget/tweetbutton");
    var type = $("tfw/widget/follow");
    var suiteView = $("tfw/widget/embed");
    var d = $("tfw/widget/video");
    var object = $("tfw/widget/timeline");
    var result = bind(["url"], self, {
      type : "share"
    });
    var wrappedCallback = bind(["hashtag"], self, {
      type : "hashtag"
    });
    var addMessageText = bind(["screenName"], self, {
      type : "mention"
    });
    var q = bind(["screenName"], type);
    var mousemove = bind(["tweetId"], suiteView, {}, suiteView.fetchAndRender);
    var v = bind(["tweetId"], d, {}, d.fetchAndRender);
    var obj = bind(["widgetId"], object);
    var prototype = bind(["previewParams"], update);
    var Type = {
      createShareButton : result,
      createMentionButton : addMessageText,
      createHashtagButton : wrappedCallback,
      createFollowButton : q,
      createTweet : mousemove,
      createVideo : v,
      createTweetEmbed : mousemove,
      createTimeline : obj
    };
    if (t.isTwitterURL(window.location.href)) {
      Type.createTimelinePreview = prototype;
    }
    module.exports = Type;
  }, {
    "tfw/widget/base" : 27,
    "tfw/widget/embed" : 28,
    "tfw/widget/follow" : 29,
    "tfw/widget/timeline" : 32,
    "tfw/widget/tweetbutton" : 33,
    "tfw/widget/video" : 34,
    "util/promise" : 46,
    "util/twitter" : 49,
    "util/util" : 52
  }],
  19 : [function(get, module) {
    /**
     * @param {string} obj
     * @param {string} target
     * @return {?}
     */
    function defer(obj, target) {
      var failuresLink = router.connect({
        src : obj,
        iframe : {
          name : target,
          style : "position:absolute;top:-9999em;width:10px;height:10px"
        }
      });
      return on(failuresLink).expose({
        /**
         * @param {string} type
         * @param {Object} opt_attributes
         * @param {?} target
         * @return {undefined}
         */
        trigger : function(type, opt_attributes, target) {
          opt_attributes = opt_attributes || {};
          var region = opt_attributes.region;
          delete opt_attributes.region;
          twttr.events.trigger(type, {
            target : handler.find(target),
            data : opt_attributes,
            region : region,
            type : type
          });
        },
        /**
         * @return {undefined}
         */
        initXPHub : function() {
          ready(true);
        }
      }), failuresLink;
    }
    /**
     * @param {boolean} selector
     * @return {?}
     */
    function jQuery(selector) {
      return selector ? special.secureHubId : special.contextualHubId;
    }
    /**
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    function ready(dataAndEvents) {
      var suiteView = parent.base(dataAndEvents) + "/widgets/hub.dab02f671b49f4efe4238b9ed55a65b5.html";
      var target = jQuery(dataAndEvents);
      if (!document.getElementById(target)) {
        return defer(suiteView, target);
      }
    }
    /**
     * @param {string} res
     * @param {Object} target
     * @return {undefined}
     */
    function create(res, target) {
      var failuresLink = router.connect({
        window : {
          width : 550,
          height : 450
        },
        src : res
      });
      on(failuresLink).expose({
        /**
         * @param {string} type
         * @param {Object} opt_attributes
         * @return {undefined}
         */
        trigger : function(type, opt_attributes) {
          twttr.events.trigger(type, {
            target : target,
            region : "intent",
            type : type,
            data : opt_attributes
          });
        }
      });
    }
    var parent = get("tfw/util/assets");
    var router = get("xd/parent");
    var on = get("xd/jsonrpc");
    var handler = get("tfw/widget/base");
    var special = get("util/widgetrpc");
    module.exports = {
      /** @type {function (boolean): ?} */
      init : ready,
      /** @type {function (string, Object): undefined} */
      openIntent : create
    };
  }, {
    "tfw/util/assets" : 21,
    "tfw/widget/base" : 27,
    "util/widgetrpc" : 53,
    "xd/jsonrpc" : 57,
    "xd/parent" : 58
  }],
  20 : [function(iterator, module) {
    /**
     * @param {Object} win
     * @return {?}
     */
    function init(win) {
      return win = win || window, win.top.postMessage ? win === win.top ? void win.addEventListener("message", function(event) {
        var symbol;
        if (!event.data || "{" == event.data[0]) {
          try {
            /** @type {*} */
            symbol = JSON.parse(event.data);
          } catch (i) {
          }
          if (symbol) {
            if ("twttr:private:requestArticleUrl" == symbol.name) {
              event.source.postMessage(JSON.stringify({
                name : "twttr:private:provideArticleUrl",
                data : {
                  url : rquery.rootDocumentLocation(),
                  dnt : key.enabled()
                }
              }), "*");
            }
          }
        }
      }, false) : (win.addEventListener("message", function(event) {
        var messageEvent;
        if (!event.data || "{" == event.data[0]) {
          try {
            /** @type {*} */
            messageEvent = JSON.parse(event.data);
          } catch (i) {
          }
          if (messageEvent && "twttr:private:provideArticleUrl" == messageEvent.name) {
            if (!messageEvent.data) {
              return;
            }
            rquery.rootDocumentLocation(messageEvent.data.url);
            if (messageEvent.data.dnt) {
              key.setOn();
            }
          }
        }
      }, false), void win.top.postMessage(JSON.stringify({
        name : "twttr:private:requestArticleUrl"
      }), "*")) : void 0;
    }
    var rquery = iterator("util/document");
    var key = iterator("util/donottrack");
    module.exports = {
      /** @type {function (Object): ?} */
      requestArticleUrl : init
    };
  }, {
    "util/document" : 37,
    "util/donottrack" : 39
  }],
  21 : [function(require, module) {
    /**
     * @param {string} id
     * @param {Object} one
     * @return {?}
     */
    function on(id, one) {
      var i;
      var group = done[id];
      return "embed/timeline.css" === id && ~location.href.indexOf("localhost.twitter.com") ? "components/syndication-templates/lib/css/index.css" : (i = sketch.retina() ? "2x" : "default", one && (i += ".rtl"), handler() + "/" + group[i]);
    }
    /**
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    function handler(dataAndEvents) {
      var host = twttr.host;
      return fix(dataAndEvents) + "://" + host;
    }
    var sketch = require("util/env");
    var done = {
      "embed/timeline.css" : {
        "default" : "embed/timeline.3fb0c4c981cd3f8f8dfb6b0ab93d6a9e.default.css",
        "2x" : "embed/timeline.3fb0c4c981cd3f8f8dfb6b0ab93d6a9e.2x.css",
        gif : "embed/timeline.3fb0c4c981cd3f8f8dfb6b0ab93d6a9e.gif.css",
        "default.rtl" : "embed/timeline.3fb0c4c981cd3f8f8dfb6b0ab93d6a9e.default.rtl.css",
        "2x.rtl" : "embed/timeline.3fb0c4c981cd3f8f8dfb6b0ab93d6a9e.2x.rtl.css",
        "gif.rtl" : "embed/timeline.3fb0c4c981cd3f8f8dfb6b0ab93d6a9e.gif.rtl.css"
      }
    };
    var fix = function() {
      return/^http\:$/.test(window.location.protocol) ? function(secure) {
        return secure ? "https" : "http";
      } : function() {
        return "https";
      };
    }();
    module.exports = {
      /** @type {function (string, Object): ?} */
      builtUrl : on,
      /** @type {function (boolean): ?} */
      base : handler
    };
  }, {
    "util/env" : 40
  }],
  22 : [function(String, module) {
    /**
     * @param {Object} params
     * @return {?}
     */
    function callback(params) {
      return function(response) {
        if (response.error) {
          if (params.error) {
            params.error(response);
          }
        } else {
          if (response.headers && 200 != response.headers.status) {
            if (params.error) {
              params.error(response);
            }
            content.warn(response.headers.message);
          } else {
            if (params.success) {
              params.success(response);
            }
          }
        }
        if (params.complete) {
          params.complete(response);
        }
        init(params);
      };
    }
    /**
     * @param {Object} request
     * @return {undefined}
     */
    function init(request) {
      var script = request.script;
      if (script) {
        /** @type {null} */
        script.onload = script.onreadystatechange = null;
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        request.script = void 0;
        script = void 0;
      }
      if (request.callbackName) {
        if (twttr.tfw.callbacks[request.callbackName]) {
          delete twttr.tfw.callbacks[request.callbackName];
        }
      }
    }
    /**
     * @param {Object} args
     * @return {?}
     */
    function require(args) {
      var options = {};
      return args.success && (t.isType("function", args.success) && (options.success = args.success)), args.error && (t.isType("function", args.error) && (options.error = args.error)), args.complete && (t.isType("function", args.complete) && (options.complete = args.complete)), options;
    }
    var content = String("util/logger");
    var t = String("util/util");
    var self = String("util/querystring");
    window.twttr = window.twttr || {};
    twttr.tfw = twttr.tfw || {};
    twttr.tfw.callbacks = twttr.tfw.callbacks || {};
    /** @type {string} */
    var prefix = "twttr.tfw.callbacks";
    var callbacks = twttr.tfw.callbacks;
    /** @type {string} */
    var type = "cb";
    /** @type {number} */
    var d = 0;
    /** @type {boolean} */
    var scope = false;
    var $ = {};
    var data = {
      tweets : "https://syndication.twitter.com/tweets.json",
      timeline : "https://cdn.syndication.twimg.com/widgets/timelines/",
      timelinePoll : "https://syndication.twitter.com/widgets/timelines/paged/",
      timelinePreview : "https://syndication.twitter.com/widgets/timelines/preview/",
      videos : "https://syndication.twitter.com/widgets/video/"
    };
    if (twttr.widgets) {
      if (twttr.widgets.endpoints) {
        t.aug(data, twttr.widgets.endpoints);
      }
    }
    /**
     * @param {string} url
     * @param {Object} params
     * @param {string} method
     * @return {undefined}
     */
    $.jsonp = function(url, params, method) {
      var i = method || type + d;
      /** @type {string} */
      var tapCallback = prefix + "." + i;
      /** @type {Element} */
      var script = document.createElement("script");
      var data = {
        callback : tapCallback,
        suppress_response_codes : true
      };
      callbacks[i] = callback(params);
      if (scope || !/^https?\:$/.test(window.location.protocol)) {
        url = url.replace(/^\/\//, "https://");
      }
      script.src = self.url(url, data);
      /** @type {string} */
      script.async = "async";
      document.body.appendChild(script);
      /** @type {Element} */
      params.script = script;
      params.callbackName = i;
      if (!method) {
        d++;
      }
    };
    /**
     * @param {?} o
     * @return {undefined}
     */
    $.config = function(o) {
      if (o.forceSSL === true || o.forceSSL === false) {
        scope = o.forceSSL;
      }
    };
    /**
     * @param {Object} options
     * @return {undefined}
     */
    $.tweets = function(options) {
      var app = require(options);
      var url = {
        ids : options.ids.join(","),
        lang : options.lang
      };
      var safeUrl = self.url(data.tweets, url);
      this.jsonp(safeUrl, app);
    };
    /**
     * @param {Object} options
     * @return {undefined}
     */
    $.videos = function(options) {
      var app = require(options);
      var url = {
        ids : options.ids.join(","),
        lang : options.lang
      };
      var safeUrl = self.url(data.videos, url);
      this.jsonp(safeUrl, app);
    };
    /**
     * @param {Object} params
     * @return {undefined}
     */
    $.timeline = function(params) {
      var instance;
      var qs = require(params);
      /** @type {number} */
      var ns = 9E5;
      /** @type {number} */
      var pY = Math.floor(+new Date / ns);
      var options = {
        lang : params.lang,
        t : pY,
        domain : window.location.host,
        dnt : params.dnt,
        override_type : params.overrideType,
        override_id : params.overrideId,
        override_name : params.overrideName,
        override_owner_id : params.overrideOwnerId,
        override_owner_name : params.overrideOwnerName,
        with_replies : params.withReplies
      };
      t.compact(options);
      instance = self.url(data.timeline + params.id, options);
      this.jsonp(instance, qs, "tl_" + params.id + "_" + params.instanceId);
    };
    /**
     * @param {Object} options
     * @return {undefined}
     */
    $.timelinePoll = function(options) {
      var ret;
      var app = require(options);
      var value = {
        lang : options.lang,
        since_id : options.sinceId,
        max_id : options.maxId,
        min_position : options.minPosition,
        max_position : options.maxPosition,
        domain : window.location.host,
        dnt : options.dnt,
        override_type : options.overrideType,
        override_id : options.overrideId,
        override_name : options.overrideName,
        override_owner_id : options.overrideOwnerId,
        override_owner_name : options.overrideOwnerName,
        with_replies : options.withReplies
      };
      t.compact(value);
      ret = self.url(data.timelinePoll + options.id, value);
      this.jsonp(ret, app, "tlPoll_" + options.id + "_" + options.instanceId + "_" + (options.sinceId || (options.maxId || (options.maxPosition || options.minPosition))));
    };
    /**
     * @param {Object} req
     * @return {undefined}
     */
    $.timelinePreview = function(req) {
      var url = require(req);
      var options = req.params;
      var normalized = self.url(data.timelinePreview, options);
      this.jsonp(normalized, url);
    };
    module.exports = $;
  }, {
    "util/logger" : 44,
    "util/querystring" : 47,
    "util/util" : 52
  }],
  23 : [function($sanitize, module) {
    /**
     * @return {?}
     */
    function run() {
      /** @type {number} */
      var timenonjit = 36E5;
      var s = test.combined(document.location)._;
      return void 0 !== actual ? actual : (actual = false, s && (/^\d+$/.test(s) && (actual = +new Date - parseInt(s) < timenonjit)), actual);
    }
    var actual;
    var test = $sanitize("util/params");
    module.exports = {
      /** @type {function (): ?} */
      isDynamicWidget : run
    };
  }, {
    "util/params" : 45
  }],
  24 : [function(dataAndEvents, module) {
    /**
     * @param {Object} doc
     * @return {undefined}
     */
    function init(doc) {
      var employees;
      var e;
      var id;
      /** @type {number} */
      var i = 0;
      done = {};
      doc = doc || document;
      employees = doc.getElementsByTagName("meta");
      for (;e = employees[i];i++) {
        if (/^twitter:/.test(e.name)) {
          id = e.name.replace(/^twitter:/, "");
          done[id] = e.content;
        }
      }
    }
    /**
     * @param {string} id
     * @return {?}
     */
    function text(id) {
      return done[id];
    }
    var done;
    init();
    module.exports = {
      /** @type {function (Object): undefined} */
      init : init,
      /** @type {function (string): ?} */
      val : text
    };
  }, {}],
  25 : [function(require, module) {
    /**
     * @param {number} nType
     * @param {?} dataAndEvents
     * @return {?}
     */
    function thumbSource(nType, dataAndEvents) {
      return 2 == nType || 3 == nType && 0 === +dataAndEvents;
    }
    /**
     * @param {string} elements
     * @return {undefined}
     */
    function search(elements) {
      var split = elements.split(" ");
      /** @type {string} */
      this.url = decodeURIComponent(split[0].trim());
      /** @type {number} */
      this.width = +split[1].replace(/w$/, "").trim();
    }
    /**
     * @param {number} width
     * @param {string} rows
     * @param {?} src
     * @return {?}
     */
    function render(width, rows, src) {
      var item;
      var list;
      var viewportSize;
      var i;
      if (width = window.devicePixelRatio ? width * window.devicePixelRatio : width, list = rows.split(",").map(function(dataAndEvents) {
        return new search(dataAndEvents);
      }), src) {
        /** @type {number} */
        i = 0;
        for (;i < list.length;i++) {
          if (list[i].url === src) {
            item = list[i];
          }
        }
      }
      return viewportSize = list.reduce(function(c, p) {
        return p.width < c.width && p.width >= width ? p : c;
      }, list[0]), item && item.width > viewportSize.width ? item : viewportSize;
    }
    /**
     * @param {Element} el
     * @param {number} value
     * @return {undefined}
     */
    function fn(el, value) {
      var result;
      var results = el.getAttribute("data-srcset");
      var body = el.src;
      if (results) {
        result = render(value, results, body);
        el.src = result.url;
      }
    }
    /**
     * @param {Element} context
     * @param {string} loadingLang
     * @return {undefined}
     */
    function load(context, loadingLang) {
      loadingLang = void 0 !== loadingLang ? !!loadingLang : data.retina();
      if (loadingLang) {
        i.toRealArray(context.getElementsByTagName("IMG")).forEach(function(el) {
          var path = el.getAttribute("data-src-2x");
          if (path) {
            el.src = path;
          }
        });
      }
    }
    /**
     * @param {Object} context
     * @param {number} selector
     * @param {number} y
     * @param {?} done
     * @return {?}
     */
    function init(context, selector, y, done) {
      /** @type {number} */
      var max = 0;
      var elem = context.querySelector(".multi-photo");
      var nType = elem && +elem.getAttribute("data-photo-count");
      if (context) {
        return i.toRealArray(context.querySelectorAll(".autosized-media")).forEach(function(div) {
          var f = handler(div.getAttribute("data-width"), div.getAttribute("data-height"), selector, y);
          done(function() {
            fn(div, selector);
            div.width = f.width;
            div.height = f.height;
            create(div, f);
          });
          max = f.height > max ? f.height : max;
        }), i.toRealArray(context.querySelectorAll("img.cropped-media")).forEach(function(div) {
          var dmx;
          var val;
          var self;
          /** @type {number} */
          var canvas_height = selector - 12;
          var html = div.parentNode;
          var width = div.getAttribute("data-crop-x") || 0;
          var i = div.getAttribute("data-crop-y") || 0;
          var href = thumbSource(nType, div.getAttribute("data-image-index"));
          /** @type {number} */
          var x = Math.floor(canvas_height / 2 - size);
          /** @type {number} */
          var height = Math.floor(x / (href ? motionMax : text));
          if (!href) {
            height -= size / 2;
          }
          self = handler(div.getAttribute("data-width"), div.getAttribute("data-height"), x, y, x, height);
          /** @type {number} */
          dmx = self.width - x - width;
          /** @type {number} */
          val = self.height - height - i;
          if (0 > dmx) {
            Math.max(0, width += dmx);
          }
          if (0 > val) {
            Math.max(0, i += val);
          }
          done(function() {
            fn(div, x);
            div.width = self.width;
            div.height = self.height;
            /** @type {string} */
            html.style.width = x - 1 + "px";
            html.style.height = height + "px";
            if (width) {
              /** @type {string} */
              div.style.marginLeft = "-" + Math.floor(self.width * width / 100) + "px";
            }
            if (i) {
              /** @type {string} */
              div.style.marginTop = "-" + Math.floor(self.height * i / 100) + "px";
            }
          });
          max = self.height * (href ? 2 : 1) > max ? self.height : max;
        }), max;
      }
    }
    /**
     * @param {number} b
     * @param {number} index
     * @param {number} a
     * @param {number} end
     * @param {number} c
     * @param {number} start
     * @return {?}
     */
    function handler(b, index, a, end, c, start) {
      return a = a || b, end = end || index, c = c || 0, start = start || 0, b > a && (index *= a / b, b = a), index > end && (b *= end / index, index = end), c > b && (index *= c / b, b = c), start > index && (b *= start / index, index = start), {
        width : Math.floor(b),
        height : Math.floor(index)
      };
    }
    /**
     * @param {Element} node
     * @param {?} var_args
     * @return {undefined}
     */
    function create(node, var_args) {
      /**
       * @return {undefined}
       */
      function success() {
        var cmd = {
          name : "tfw:resize",
          dimensions : var_args
        };
        win.postMessage(cmd, "*");
      }
      var opera;
      var win;
      var o;
      var s;
      var title;
      if (node) {
        win = node.contentWindow;
        opera = node.ownerDocument && node.ownerDocument.defaultView;
        o = data.ios() || data.android();
        s = jQuery.isTwitterURL(node.src);
        title = win && data.canPostMessage(win);
        if (o) {
          if (s) {
            if (title) {
              success();
              if (opera) {
                opera.addEventListener("message", function(messageEvent) {
                  if ("tfw:requestsize" === messageEvent.data) {
                    success();
                  }
                }, false);
              }
            }
          }
        }
      }
    }
    var i = require("util/util");
    var data = require("util/env");
    var jQuery = require("util/twitter");
    /** @type {number} */
    var size = 6;
    /** @type {number} */
    var motionMax = 8 / 9;
    /** @type {number} */
    var text = 16 / 9;
    module.exports = {
      /** @type {function (number, number, number, number, number, number): ?} */
      scaleDimensions : handler,
      /** @type {function (Element, string): undefined} */
      retinize : load,
      /** @type {function (Object, number, number, ?): ?} */
      constrainMedia : init,
      /** @type {function (Element, number): undefined} */
      __setSrcFromSet : fn
    };
  }, {
    "util/env" : 40,
    "util/twitter" : 49,
    "util/util" : 52
  }],
  26 : [function(require, module) {
    var $ = require("util/querystring");
    var t = require("util/twitter");
    /**
     * @param {Object} object
     * @param {Function} handler
     * @return {?}
     */
    module.exports = function(object, handler) {
      return function(element) {
        var iterable;
        var key;
        /** @type {string} */
        var name = "data-tw-params";
        if (element && (t.isTwitterURL(element.href) && !element.getAttribute(name))) {
          if (element.setAttribute(name, true), "function" == typeof handler) {
            iterable = handler.call(this, element);
            for (key in iterable) {
              if (iterable.hasOwnProperty(key)) {
                object[key] = iterable[key];
              }
            }
          }
          element.href = $.url(element.href, object);
        }
      };
    };
  }, {
    "util/querystring" : 47,
    "util/twitter" : 49
  }],
  27 : [function(require, module) {
    /**
     * @param {Node} elem
     * @return {undefined}
     */
    function render(elem) {
      var params;
      var o = this;
      if (elem) {
        if (elem.ownerDocument) {
          /** @type {Node} */
          this.srcEl = elem;
          this.classAttr = elem.className.split(" ");
        } else {
          /** @type {Node} */
          this.srcOb = elem;
          /** @type {Array} */
          this.classAttr = [];
        }
        params = this.params();
        this.id = this.generateId();
        this.setLanguage();
        this.related = params.related || this.dataAttr("related");
        this.partner = params.partner || (this.dataAttr("partner") || content.val("partner"));
        /** @type {Array} */
        this.styleAttr = [];
        this.targetEl = elem.targetEl;
        if (assert.asBoolean(params.dnt || this.dataAttr("dnt"))) {
          nodes.setOn();
        }
        data[this.id] = this;
        this.completePromise = new promise(function(lvl) {
          o.completeResolver = lvl;
        });
        this.completed().then(function(item) {
          if (item) {
            if (item != document.body) {
              twttr.events.trigger("rendered", {
                target : item
              });
            }
          }
        });
      }
    }
    /**
     * @return {undefined}
     */
    function build() {
      fns.forEach(function(done) {
        done();
      });
      render.doLayout();
    }
    /**
     * @param {Object} elem
     * @return {?}
     */
    function empty(elem) {
      return elem ? elem.lang ? elem.lang : empty(elem.parentNode) : void 0;
    }
    var which;
    var ret = require("tfw/util/assets");
    var view = require("performance/perf-timers");
    var extend = require("util/iframe");
    var TaskClient = require("util/layout");
    var promise = require("util/promise");
    var format = require("util/querystring");
    var assert = require("util/typevalidator");
    var _ = require("util/util");
    var content = require("tfw/util/globals");
    var nodes = require("util/donottrack");
    var console = require("util/logger");
    var Block = require("util/document");
    /** @type {number} */
    var twitter_widget_ = 0;
    var data = {};
    /** @type {Array} */
    var fns = [];
    var task = new TaskClient;
    /** @type {string} */
    var name = "data-twttr-rendered";
    var value = {
      ar : {
        "%{followers_count} followers" : "\u0639\u062f\u062f \u0627\u0644\u0645\u062a\u0627\u0628\u0639\u064a\u0646 %{followers_count}",
        "100K+" : "+100 \u0623\u0644\u0641",
        "10k unit" : "10 \u0622\u0644\u0627\u0641 \u0648\u062d\u062f\u0629",
        Follow : "\u062a\u0627\u0628\u0650\u0639",
        "Follow %{screen_name}" : "\u062a\u0627\u0628\u0650\u0639 %{screen_name}",
        K : "\u0623\u0644\u0641",
        M : "\u0645",
        Tweet : "\u063a\u0631\u0650\u0651\u062f",
        "Tweet %{hashtag}" : "\u063a\u0631\u0650\u0651\u062f %{hashtag}",
        "Tweet to %{name}" : "\u063a\u0631\u0650\u0651\u062f \u0644\u0640 %{name}"
      },
      bn : {
        "Follow %{screen_name}" : "%{screen_name}-\u0995\u09c7 \u0985\u09a8\u09c1\u09b8\u09b0\u09a3 \u0995\u09b0\u09c1\u09a8"
      },
      cs : {
        "Follow %{screen_name}" : "Sledovat u\u017eivatele %{screen_name}"
      },
      da : {
        "%{followers_count} followers" : "%{followers_count} f\u00f8lgere",
        "10k unit" : "10k enhed",
        Follow : "F\u00f8lg",
        "Follow %{screen_name}" : "F\u00f8lg %{screen_name}",
        "Tweet to %{name}" : "Tweet til %{name}"
      },
      de : {
        "%{followers_count} followers" : "%{followers_count} Follower",
        "100K+" : "100Tsd+",
        "10k unit" : "10tsd-Einheit",
        Follow : "Folgen",
        "Follow %{screen_name}" : "%{screen_name} folgen",
        K : "Tsd",
        Tweet : "Twittern",
        "Tweet to %{name}" : "Tweet an %{name}"
      },
      es : {
        "%{followers_count} followers" : "%{followers_count} seguidores",
        "10k unit" : "unidad de 10 mil",
        Follow : "Seguir",
        "Follow %{screen_name}" : "Seguir a %{screen_name}",
        Tweet : "Twittear",
        "Tweet %{hashtag}" : "Twittear %{hashtag}",
        "Tweet to %{name}" : "Twittear a %{name}"
      },
      fa : {
        "%{followers_count} followers" : "%{followers_count} \u062f\u0646\u0628\u0627\u0644\u200c\u06a9\u0646\u0646\u062f\u0647",
        "100K+" : ">\u06f1\u06f0\u06f0\u0647\u0632\u0627\u0631",
        "10k unit" : "\u06f1\u06f0\u0647\u0632\u0627\u0631 \u0648\u0627\u062d\u062f",
        Follow : "\u062f\u0646\u0628\u0627\u0644 \u06a9\u0631\u062f\u0646",
        "Follow %{screen_name}" : "\u062f\u0646\u0628\u0627\u0644 \u06a9\u0631\u062f\u0646 %{screen_name}",
        K : "\u0647\u0632\u0627\u0631",
        M : "\u0645\u06cc\u0644\u06cc\u0648\u0646",
        Tweet : "\u062a\u0648\u06cc\u06cc\u062a",
        "Tweet %{hashtag}" : "\u062a\u0648\u06cc\u06cc\u062a \u06a9\u0631\u062f\u0646 %{hashtag}",
        "Tweet to %{name}" : "\u0628\u0647 %{name} \u062a\u0648\u06cc\u06cc\u062a \u06a9\u0646\u06cc\u062f"
      },
      fi : {
        "%{followers_count} followers" : "%{followers_count} seuraajaa",
        "100K+" : "100 000+",
        "10k unit" : "10 000 yksikk\u00f6\u00e4",
        Follow : "Seuraa",
        "Follow %{screen_name}" : "Seuraa k\u00e4ytt\u00e4j\u00e4\u00e4 %{screen_name}",
        K : "tuhatta",
        M : "milj.",
        Tweet : "Twiittaa",
        "Tweet %{hashtag}" : "Twiittaa %{hashtag}",
        "Tweet to %{name}" : "Twiittaa k\u00e4ytt\u00e4j\u00e4lle %{name}"
      },
      fil : {
        "%{followers_count} followers" : "%{followers_count} mga tagasunod",
        "10k unit" : "10k yunit",
        Follow : "Sundan",
        "Follow %{screen_name}" : "Sundan si %{screen_name}",
        Tweet : "I-tweet",
        "Tweet %{hashtag}" : "I-tweet ang %{hashtag}",
        "Tweet to %{name}" : "Mag-Tweet kay %{name}"
      },
      fr : {
        "%{followers_count} followers" : "%{followers_count} abonn\u00e9s",
        "10k unit" : "unit\u00e9 de 10k",
        Follow : "Suivre",
        "Follow %{screen_name}" : "Suivre %{screen_name}",
        Tweet : "Tweeter",
        "Tweet %{hashtag}" : "Tweeter %{hashtag}",
        "Tweet to %{name}" : "Tweeter \u00e0 %{name}"
      },
      he : {
        "%{followers_count} followers" : "%{followers_count} \u05e2\u05d5\u05e7\u05d1\u05d9\u05dd",
        "100K+" : "\u05de\u05d0\u05d5\u05ea \u05d0\u05dc\u05e4\u05d9\u05dd",
        "10k unit" : "\u05e2\u05e9\u05e8\u05d5\u05ea \u05d0\u05dc\u05e4\u05d9\u05dd",
        Follow : "\u05de\u05e2\u05e7\u05d1",
        "Follow %{screen_name}" : "\u05dc\u05e2\u05e7\u05d5\u05d1 \u05d0\u05d7\u05e8 %{screen_name}",
        K : "\u05d0\u05dc\u05e3",
        M : "\u05de\u05d9\u05dc\u05d9\u05d5\u05df",
        Tweet : "\u05e6\u05d9\u05d5\u05e5",
        "Tweet %{hashtag}" : "\u05e6\u05d9\u05d9\u05e6\u05d5 %{hashtag}",
        "Tweet to %{name}" : "\u05e6\u05d9\u05d5\u05e5 \u05d0\u05dc %{name}"
      },
      hi : {
        "%{followers_count} followers" : "%{followers_count} \u092b\u093c\u0949\u0932\u094b\u0905\u0930\u094d\u0938",
        "100K+" : "1 \u0932\u093e\u0916 \u0938\u0947 \u0905\u0927\u093f\u0915",
        "10k unit" : "10 \u0939\u091c\u093e\u0930 \u0907\u0915\u093e\u0908\u092f\u093e\u0902",
        Follow : "\u092b\u093c\u0949\u0932\u094b",
        "Follow %{screen_name}" : "%{screen_name} \u0915\u094b \u092b\u093c\u0949\u0932\u094b \u0915\u0930\u0947\u0902",
        K : "\u0939\u091c\u093e\u0930",
        M : "\u092e\u093f\u0932\u093f\u092f\u0928",
        Tweet : "\u091f\u094d\u0935\u0940\u091f",
        "Tweet %{hashtag}" : "\u091f\u094d\u0935\u0940\u091f %{hashtag}",
        "Tweet to %{name}" : "%{name} \u0915\u0947 \u092a\u094d\u0930\u0924\u093f \u091f\u094d\u0935\u0940\u091f \u0915\u0930\u0947\u0902"
      },
      hu : {
        "%{followers_count} followers" : "%{followers_count} k\u00f6vet\u0151",
        "100K+" : "100E+",
        "10k unit" : "10E+",
        Follow : "K\u00f6vet\u00e9s",
        "Follow %{screen_name}" : "%{screen_name} k\u00f6vet\u00e9se",
        K : "E",
        "Tweet %{hashtag}" : "%{hashtag} tweetel\u00e9se",
        "Tweet to %{name}" : "Tweet k\u00fcld\u00e9se neki: %{name}"
      },
      id : {
        "%{followers_count} followers" : "%{followers_count} pengikut",
        "100K+" : "100 ribu+",
        "10k unit" : "10 ribu unit",
        Follow : "Ikuti",
        "Follow %{screen_name}" : "Ikuti %{screen_name}",
        K : "&nbsp;ribu",
        M : "&nbsp;juta",
        "Tweet to %{name}" : "Tweet ke %{name}"
      },
      it : {
        "%{followers_count} followers" : "%{followers_count} follower",
        "10k unit" : "10k unit\u00e0",
        Follow : "Segui",
        "Follow %{screen_name}" : "Segui %{screen_name}",
        "Tweet %{hashtag}" : "Twitta %{hashtag}",
        "Tweet to %{name}" : "Twitta a %{name}"
      },
      ja : {
        "%{followers_count} followers" : "%{followers_count}\u4eba\u306e\u30d5\u30a9\u30ed\u30ef\u30fc",
        "100K+" : "100K\u4ee5\u4e0a",
        "10k unit" : "\u4e07",
        Follow : "\u30d5\u30a9\u30ed\u30fc\u3059\u308b",
        "Follow %{screen_name}" : "%{screen_name}\u3055\u3093\u3092\u30d5\u30a9\u30ed\u30fc",
        Tweet : "\u30c4\u30a4\u30fc\u30c8",
        "Tweet %{hashtag}" : "%{hashtag} \u3092\u30c4\u30a4\u30fc\u30c8\u3059\u308b",
        "Tweet to %{name}" : "%{name}\u3055\u3093\u3078\u30c4\u30a4\u30fc\u30c8\u3059\u308b"
      },
      ko : {
        "%{followers_count} followers" : "%{followers_count}\uba85\uc758 \ud314\ub85c\uc6cc",
        "100K+" : "100\ub9cc \uc774\uc0c1",
        "10k unit" : "\ub9cc \ub2e8\uc704",
        Follow : "\ud314\ub85c\uc6b0",
        "Follow %{screen_name}" : "%{screen_name} \ub2d8 \ud314\ub85c\uc6b0\ud558\uae30",
        K : "\ucc9c",
        M : "\ubc31\ub9cc",
        Tweet : "\ud2b8\uc717",
        "Tweet %{hashtag}" : "%{hashtag} \uad00\ub828 \ud2b8\uc717\ud558\uae30",
        "Tweet to %{name}" : "%{name} \ub2d8\uc5d0\uac8c \ud2b8\uc717\ud558\uae30"
      },
      msa : {
        "%{followers_count} followers" : "%{followers_count} pengikut",
        "100K+" : "100 ribu+",
        "10k unit" : "10 ribu unit",
        Follow : "Ikut",
        "Follow %{screen_name}" : "Ikut %{screen_name}",
        K : "ribu",
        M : "juta",
        "Tweet to %{name}" : "Tweet kepada %{name}"
      },
      nl : {
        "%{followers_count} followers" : "%{followers_count} volgers",
        "100K+" : "100k+",
        "10k unit" : "10k-eenheid",
        Follow : "Volgen",
        "Follow %{screen_name}" : "%{screen_name} volgen",
        K : "k",
        M : " mln.",
        Tweet : "Tweeten",
        "Tweet %{hashtag}" : "%{hashtag} tweeten",
        "Tweet to %{name}" : "Tweeten naar %{name}"
      },
      no : {
        "%{followers_count} followers" : "%{followers_count} f\u00f8lgere",
        "100K+" : "100 K+",
        "10k unit" : "10-K-enhet",
        Follow : "F\u00f8lg",
        "Follow %{screen_name}" : "F\u00f8lg %{screen_name}",
        "Tweet to %{name}" : "Send en tweet til %{name}"
      },
      pl : {
        "%{followers_count} followers" : "%{followers_count} obserwuj\u0105cych",
        "100K+" : "100 tys.+",
        "10k unit" : "10 tys.",
        Follow : "Obserwuj",
        "Follow %{screen_name}" : "Obserwuj %{screen_name}",
        K : "tys.",
        M : "mln",
        Tweet : "Tweetnij",
        "Tweet %{hashtag}" : "Tweetnij %{hashtag}",
        "Tweet to %{name}" : "Tweetnij do %{name}"
      },
      pt : {
        "%{followers_count} followers" : "%{followers_count} seguidores",
        "100K+" : "+100 mil",
        "10k unit" : "10 mil unidades",
        Follow : "Seguir",
        "Follow %{screen_name}" : "Seguir %{screen_name}",
        K : "Mil",
        Tweet : "Tweetar",
        "Tweet %{hashtag}" : "Tweetar %{hashtag}",
        "Tweet to %{name}" : "Tweetar para %{name}"
      },
      ro : {
        "Follow %{screen_name}" : "Urm\u0103re\u015fte pe %{screen_name}"
      },
      ru : {
        "%{followers_count} followers" : "\u0427\u0438\u0442\u0430\u0442\u0435\u043b\u0438: %{followers_count} ",
        "100K+" : "100 \u0442\u044b\u0441.+",
        "10k unit" : "\u0431\u043b\u043e\u043a 10k",
        Follow : "\u0427\u0438\u0442\u0430\u0442\u044c",
        "Follow %{screen_name}" : "\u0427\u0438\u0442\u0430\u0442\u044c %{screen_name}",
        K : "\u0442\u044b\u0441.",
        M : "\u043c\u043b\u043d.",
        Tweet : "\u0422\u0432\u0438\u0442\u043d\u0443\u0442\u044c",
        "Tweet %{hashtag}" : "\u0422\u0432\u0438\u0442\u043d\u0443\u0442\u044c %{hashtag}",
        "Tweet to %{name}" : "\u0422\u0432\u0438\u0442\u043d\u0443\u0442\u044c %{name}"
      },
      sv : {
        "%{followers_count} followers" : "%{followers_count} f\u00f6ljare",
        "10k unit" : "10k",
        Follow : "F\u00f6lj",
        "Follow %{screen_name}" : "F\u00f6lj %{screen_name}",
        Tweet : "Tweeta",
        "Tweet %{hashtag}" : "Tweeta %{hashtag}",
        "Tweet to %{name}" : "Tweeta till %{name}"
      },
      th : {
        "%{followers_count} followers" : "%{followers_count} \u0e1c\u0e39\u0e49\u0e15\u0e34\u0e14\u0e15\u0e32\u0e21",
        "100K+" : "100\u0e1e\u0e31\u0e19+",
        "10k unit" : "\u0e2b\u0e19\u0e48\u0e27\u0e22 10\u0e1e\u0e31\u0e19",
        Follow : "\u0e15\u0e34\u0e14\u0e15\u0e32\u0e21",
        "Follow %{screen_name}" : "\u0e15\u0e34\u0e14\u0e15\u0e32\u0e21 %{screen_name}",
        M : "\u0e25\u0e49\u0e32\u0e19",
        Tweet : "\u0e17\u0e27\u0e35\u0e15",
        "Tweet %{hashtag}" : "\u0e17\u0e27\u0e35\u0e15 %{hashtag}",
        "Tweet to %{name}" : "\u0e17\u0e27\u0e35\u0e15\u0e16\u0e36\u0e07 %{name}"
      },
      tr : {
        "%{followers_count} followers" : "%{followers_count} takip\u00e7i",
        "100K+" : "+100 bin",
        "10k unit" : "10 bin birim",
        Follow : "Takip et",
        "Follow %{screen_name}" : "Takip et: %{screen_name}",
        K : "bin",
        M : "milyon",
        Tweet : "Tweetle",
        "Tweet %{hashtag}" : "Tweetle: %{hashtag}",
        "Tweet to %{name}" : "Tweetle: %{name}"
      },
      uk : {
        "Follow %{screen_name}" : "\u0427\u0438\u0442\u0430\u0442\u0438 %{screen_name}"
      },
      ur : {
        "%{followers_count} followers" : "%{followers_count} \u0641\u0627\u0644\u0648\u0631\u0632",
        "100K+" : "\u0627\u06cc\u06a9 \u0644\u0627\u06a9\u06be \u0633\u06d2 \u0632\u06cc\u0627\u062f\u06c1",
        "10k unit" : "\u062f\u0633 \u06c1\u0632\u0627\u0631 \u06cc\u0648\u0646\u0679",
        Follow : "\u0641\u0627\u0644\u0648 \u06a9\u0631\u06cc\u06ba",
        "Follow %{screen_name}" : "%{screen_name} \u06a9\u0648 \u0641\u0627\u0644\u0648 \u06a9\u0631\u06cc\u06ba",
        K : "\u06c1\u0632\u0627\u0631",
        M : "\u0645\u0644\u06cc\u0646",
        Tweet : "\u0679\u0648\u06cc\u0679 \u06a9\u0631\u06cc\u06ba",
        "Tweet %{hashtag}" : "%{hashtag} \u0679\u0648\u06cc\u0679 \u06a9\u0631\u06cc\u06ba",
        "Tweet to %{name}" : "%{name} \u06a9\u0648 \u0679\u0648\u06cc\u0679 \u06a9\u0631\u06cc\u06ba"
      },
      vi : {
        "Follow %{screen_name}" : "Theo d\u00f5i %{screen_name}"
      },
      "zh-cn" : {
        "%{followers_count} followers" : "%{followers_count} \u5173\u6ce8\u8005",
        "100K+" : "10\u4e07+",
        "10k unit" : "1\u4e07\u5355\u5143",
        Follow : "\u5173\u6ce8",
        "Follow %{screen_name}" : "\u5173\u6ce8 %{screen_name}",
        K : "\u5343",
        M : "\u767e\u4e07",
        Tweet : "\u53d1\u63a8",
        "Tweet %{hashtag}" : "\u4ee5 %{hashtag} \u53d1\u63a8",
        "Tweet to %{name}" : "\u53d1\u63a8\u7ed9 %{name}"
      },
      "zh-tw" : {
        "%{followers_count} followers" : "%{followers_count} \u4f4d\u8ddf\u96a8\u8005",
        "100K+" : "\u8d85\u904e\u5341\u842c",
        "10k unit" : "1\u842c \u55ae\u4f4d",
        Follow : "\u8ddf\u96a8",
        "Follow %{screen_name}" : "\u8ddf\u96a8 %{screen_name}",
        K : "\u5343",
        M : "\u767e\u842c",
        Tweet : "\u63a8\u6587",
        "Tweet %{hashtag}" : "\u63a8\u6587%{hashtag}",
        "Tweet to %{name}" : "\u63a8\u6587\u7d66%{name}"
      }
    };
    _.aug(render.prototype, {
      /**
       * @param {string} key
       * @return {?}
       */
      setLanguage : function(key) {
        var lang;
        return key || (key = this.params().lang || (this.dataAttr("lang") || empty(this.srcEl))), (key = key && key.toLowerCase()) ? value[key] ? this.lang = key : (lang = key.replace(/[\-_].*/, ""), value[lang] ? this.lang = lang : void(this.lang = "en")) : this.lang = "en";
      },
      /**
       * @param {string} key
       * @param {Object} opt_attributes
       * @return {?}
       */
      _ : function(key, opt_attributes) {
        var lang = this.lang;
        return opt_attributes = opt_attributes || {}, lang && value.hasOwnProperty(lang) || (lang = this.lang = "en"), key = value[lang] && value[lang][key] || key, this.ringo(key, opt_attributes, /%\{([\w_]+)\}/g);
      },
      /**
       * @param {string} name
       * @param {Object} opt_attributes
       * @param {RegExp} re
       * @return {?}
       */
      ringo : function(name, opt_attributes, re) {
        return re = re || /\{\{([\w_]+)\}\}/g, name.replace(re, function(dataAndEvents, timeoutKey) {
          return void 0 !== opt_attributes[timeoutKey] ? opt_attributes[timeoutKey] : dataAndEvents;
        });
      },
      /**
       * @return {?}
       */
      makeIframeSource : function() {
        if (this.iframeSource) {
          var path = format.encode(this.widgetUrlParams());
          return[ret.base(), "/", this.ringo(this.iframeSource, {
            lang : this.lang
          }), "#", path].join("");
        }
      },
      /**
       * @param {Element} id
       * @return {undefined}
       */
      add : function(id) {
        /** @type {Element} */
        data[this.id] = id;
      },
      /**
       * @param {string} template
       * @param {?} settings
       * @param {Object} options
       * @return {?}
       */
      create : function(template, settings, options) {
        var value;
        var d = this;
        return options[name] = true, value = extend(_.aug({
          id : this.id,
          src : template,
          "class" : this.classAttr.join(" ")
        }, options), settings, this.targetEl && this.targetEl.ownerDocument), this.srcEl ? this.layout(function() {
          return d.srcEl.parentNode.replaceChild(value, d.srcEl), d.completeResolver.fulfill(value), value;
        }) : this.targetEl ? this.layout(function() {
          return d.targetEl.appendChild(value), d.completeResolver.fulfill(value), value;
        }) : promise.reject("Did not append widget");
      },
      /**
       * @return {?}
       */
      params : function() {
        var a;
        var result;
        return this.srcOb ? result = this.srcOb : (a = this.srcEl && (this.srcEl.href && this.srcEl.href.split("?")[1]), result = a ? format.decode(a) : {}), this.params = function() {
          return result;
        }, result;
      },
      /**
       * @return {?}
       */
      widgetUrlParams : function() {
        return{};
      },
      /**
       * @param {string} name
       * @return {?}
       */
      dataAttr : function(name) {
        return this.srcEl && this.srcEl.getAttribute("data-" + name);
      },
      /**
       * @param {string} value
       * @return {?}
       */
      attr : function(value) {
        return this.srcEl && this.srcEl.getAttribute(value);
      },
      /**
       * @param {Function} e
       * @return {?}
       */
      layout : function(e) {
        return task.enqueue(e);
      },
      styles : {
        base : [["font", "normal normal normal 11px/18px 'Helvetica Neue', Arial, sans-serif"], ["margin", "0"], ["padding", "0"], ["whiteSpace", "nowrap"]],
        button : [["fontWeight", "bold"], ["textShadow", "0 1px 0 rgba(255,255,255,.5)"]],
        large : [["fontSize", "13px"], ["lineHeight", "26px"]],
        vbubble : [["fontSize", "16px"]]
      },
      /**
       * @return {?}
       */
      width : function() {
        throw new Error(name + " not implemented");
      },
      /**
       * @return {?}
       */
      height : function() {
        return "m" == this.size ? 20 : 28;
      },
      /**
       * @return {undefined}
       */
      minWidth : function() {
      },
      /**
       * @return {undefined}
       */
      maxWidth : function() {
      },
      /**
       * @return {undefined}
       */
      minHeight : function() {
      },
      /**
       * @return {undefined}
       */
      maxHeight : function() {
      },
      /**
       * @return {?}
       */
      dimensions : function() {
        /**
         * @param {number} obj
         * @return {?}
         */
        function bind(obj) {
          switch(typeof obj) {
            case "string":
              return obj;
            case "undefined":
              return;
            default:
              return obj + "px";
          }
        }
        var obj = {
          width : this.width(),
          height : this.height()
        };
        return this.minWidth() && (obj["min-width"] = this.minWidth()), this.maxWidth() && (obj["max-width"] = this.maxWidth()), this.minHeight() && (obj["min-height"] = this.minHeight()), this.maxHeight() && (obj["max-height"] = this.maxHeight()), _.forIn(obj, function(key, val) {
          obj[key] = bind(val);
        }), obj;
      },
      /**
       * @return {?}
       */
      generateId : function() {
        return this.srcEl && this.srcEl.id || "twitter-widget-" + twitter_widget_++;
      },
      /**
       * @return {?}
       */
      completed : function() {
        return this.completePromise;
      }
    });
    /**
     * @param {Function} fn
     * @return {undefined}
     */
    render.afterLoad = function(fn) {
      fns.push(fn);
    };
    /**
     * @return {undefined}
     */
    render.doLayout = function() {
      task.exec();
    };
    /**
     * @return {undefined}
     */
    render.doLayoutAsync = function() {
      task.delayedExec();
    };
    /**
     * @param {boolean} dataAndEvents
     * @return {undefined}
     */
    render.init = function(dataAndEvents) {
      /** @type {boolean} */
      which = dataAndEvents;
    };
    /**
     * @return {undefined}
     */
    render.reset = function() {
      data = {};
    };
    /**
     * @param {?} id
     * @return {?}
     */
    render.find = function(id) {
      return id && data[id] ? data[id].element : null;
    };
    /**
     * @param {Object} d
     * @return {undefined}
     */
    render.embed = function(d) {
      /** @type {Array} */
      var ary = [];
      /** @type {Array} */
      var deferreds = [];
      /** @type {Array} */
      var args = [];
      if (!assert.isArray(d)) {
        /** @type {Array} */
        d = [d || document];
      }
      console.time("sandboxes");
      d.forEach(function(div) {
        _.forIn(which, function(i, Item) {
          var proto = div.querySelectorAll(i);
          _.toRealArray(proto).forEach(function(elem) {
            var obj;
            if (!elem.getAttribute(name)) {
              elem.setAttribute(name, "true");
              obj = new Item(elem);
              ary.push(obj);
              args.push(obj.sandboxCreated);
            }
          });
        });
      });
      promise.every.apply(null, args).then(function() {
        console.timeEnd("sandboxes");
      });
      render.doLayout();
      ary.forEach(function(todo) {
        deferreds.push(todo.completed());
        todo.render();
      });
      promise.every.apply(null, deferreds).then(function(decEndpoints) {
        decEndpoints = decEndpoints.filter(function(dataAndEvents) {
          return dataAndEvents;
        });
        if (decEndpoints.length) {
          twttr.events.trigger("loaded", {
            widgets : decEndpoints
          });
          console.timeEnd("load");
        }
      }).then(render.trackRender);
      render.doLayoutAsync();
      build();
    };
    /**
     * @return {undefined}
     */
    render.trackRender = function() {
      view.endAndTrack("render", "widgets-js-load", "page", {
        widget_origin : Block.rootDocumentLocation(),
        widget_frame : Block.isFramed() && Block.currentDocumentLocation()
      });
    };
    window.setInterval(function() {
      render.doLayout();
    }, 500);
    /** @type {function (Node): undefined} */
    module.exports = render;
  }, {
    "performance/perf-timers" : 8,
    "tfw/util/assets" : 21,
    "tfw/util/globals" : 24,
    "util/document" : 37,
    "util/donottrack" : 39,
    "util/iframe" : 42,
    "util/layout" : 43,
    "util/logger" : 44,
    "util/promise" : 46,
    "util/querystring" : 47,
    "util/typevalidator" : 50,
    "util/util" : 52
  }],
  28 : [function(require, module) {
    /**
     * @param {Object} button
     * @param {?} range
     * @return {undefined}
     */
    function fn(button, range) {
      var elem = button.querySelector("blockquote.subject");
      var l = button.querySelector("blockquote.reply");
      var id = elem && elem.getAttribute("data-tweet-id");
      var p = l && l.getAttribute("data-tweet-id");
      var done = {};
      var paramNames = {};
      if (id) {
        done[id] = {
          item_type : 0
        };
        _self.clientEvent({
          page : "tweet",
          section : "subject",
          component : "tweet",
          action : "results"
        }, _.aug({}, range, {
          item_ids : [id],
          item_details : done
        }), true);
        helper.scribeTweetAudienceImpression();
        if (p) {
          paramNames[p] = {
            item_type : 0
          };
          _self.clientEvent({
            page : "tweet",
            section : "conversation",
            component : "tweet",
            action : "results"
          }, _.aug({}, range, {
            item_ids : [p],
            item_details : paramNames,
            associations : {
              4 : {
                association_id : id,
                association_type : 4
              }
            }
          }), true);
        }
      }
    }
    /**
     * @param {?} key
     * @param {string} output
     * @return {undefined}
     */
    function callback(key, output) {
      var $cookies = {};
      if (key) {
        $cookies[key] = {
          item_type : 0
        };
        _self.clientEvent({
          page : "tweet",
          section : "subject",
          component : "rawembedcode",
          action : "no_results"
        }, {
          widget_origin : Block.rootDocumentLocation(),
          widget_frame : Block.isFramed() && Block.currentDocumentLocation(),
          message : output,
          item_ids : [key],
          item_details : $cookies
        }, true);
        helper.scribeTweetAudienceImpression();
      }
    }
    /**
     * @param {?} list
     * @param {string} array
     * @param {string} isSorted
     * @param {Function} callback
     * @return {undefined}
     */
    function uniq(list, array, isSorted, callback) {
      collisions[list] = collisions[list] || [];
      collisions[list].push({
        s : isSorted,
        /** @type {Function} */
        f : callback,
        lang : array
      });
    }
    /**
     * @return {undefined}
     */
    function refresh() {
      if (memory.length) {
        twttr.widgets.load(memory);
      }
    }
    /**
     * @param {Object} elem
     * @return {undefined}
     */
    function init(elem) {
      if (elem) {
        var instance;
        var cs;
        var result;
        f.apply(this, [elem]);
        instance = this.params();
        cs = this.srcEl && this.srcEl.getElementsByTagName("A");
        result = cs && cs[cs.length - 1];
        /** @type {(boolean|number)} */
        this.hideThread = "none" == (instance.conversation || this.dataAttr("conversation")) || ~this.classAttr.indexOf("tw-hide-thread");
        /** @type {(boolean|number)} */
        this.hideCard = "hidden" == (instance.cards || this.dataAttr("cards")) || ~this.classAttr.indexOf("tw-hide-media");
        if ("left" == (instance.align || this.attr("align")) || ~this.classAttr.indexOf("tw-align-left")) {
          /** @type {string} */
          this.align = "left";
        } else {
          if ("right" == (instance.align || this.attr("align")) || ~this.classAttr.indexOf("tw-align-right")) {
            /** @type {string} */
            this.align = "right";
          } else {
            if ("center" == (instance.align || this.attr("align")) || ~this.classAttr.indexOf("tw-align-center")) {
              /** @type {string} */
              this.align = "center";
              if (this.containerWidth > this.dimensions.MIN_WIDTH * (1 / 0.7)) {
                if (this.width > 0.7 * this.containerWidth) {
                  /** @type {number} */
                  this.width = 0.7 * this.containerWidth;
                }
              }
            }
          }
        }
        this.narrow = instance.narrow || this.width <= this.dimensions.NARROW_WIDTH;
        if (this.narrow) {
          this.classAttr.push("var-narrow");
        }
        this.tweetId = instance.tweetId || result && path.status(result.href);
      }
    }
    var assert = require("tfw/widget/base");
    var f = require("tfw/widget/syndicatedbase");
    var nodes = require("util/datetime");
    var indexOf = require("tfw/util/params");
    var spec = require("dom/classname");
    var target = require("dom/get");
    var Dom = require("performance/perf-timers");
    var array = require("util/promise");
    var _ = require("util/util");
    var path = require("util/twitter");
    var db = require("tfw/util/data");
    var helper = require("scribe/audience");
    var _self = require("scribe/frame");
    var toString = require("tfw/util/media");
    var Block = require("util/document");
    /** @type {string} */
    var tw_p = "tweetembed";
    var collisions = {};
    /** @type {Array} */
    var deferreds = [];
    /** @type {Array} */
    var memory = [];
    init.prototype = new f;
    _.aug(init.prototype, {
      renderedClassNames : "twitter-tweet twitter-tweet-rendered",
      dimensions : {
        DEFAULT_HEIGHT : "0",
        DEFAULT_WIDTH : "500",
        NARROW_WIDTH : "350",
        maxHeight : "375",
        FULL_BLEED_PHOTO_MAX_HEIGHT : "600",
        MIN_WIDTH : "220",
        MIN_HEIGHT : "0",
        WIDE_MEDIA_PADDING : 32,
        NARROW_MEDIA_PADDING : 32,
        BORDERS : 0
      },
      /**
       * @param {string} template
       * @return {?}
       */
      create : function(template) {
        var item;
        var promise;
        var data = this;
        var container = this.sandbox.createElement("div");
        return container.innerHTML = template, (item = container.children[0] || false) ? ("dark" == this.theme && this.classAttr.push("thm-dark"), this.linkColor && this.addSiteStyles(), spec.present(item, "media-forward") && (this.fullBleedPhoto = true, this.dimensions.maxHeight = this.dimensions.FULL_BLEED_PHOTO_MAX_HEIGHT), this.augmentWidgets(item), toString.retinize(item), item.id = this.id, item.className += " " + this.classAttr.join(" "), item.lang = this.lang, this.sandbox.setTitle(item.getAttribute("data-iframe-title") || 
        "Tweet"), this.sandbox.appendChild(item).then(function() {
          data.renderResolver.fulfill(data.sandbox);
        }), this.sandbox.style({
          cssText : "",
          display : "block",
          maxWidth : "99%",
          minWidth : this.dimensions.MIN_WIDTH + "px",
          padding : "0",
          borderRadius : "5px",
          margin : "10px 0",
          border : "#ddd 1px solid",
          borderTopColor : "#eee",
          borderBottomColor : "#bbb",
          boxShadow : "0 1px 3px rgba(0,0,0,0.15)",
          position : "absolute",
          visibility : "hidden"
        }), promise = this.layout(function() {
          data.predefinedWidth = data.width;
          data.width = data.sandbox.width(data.width);
          data.collapseRegions();
        }), promise.then(function() {
          data.constrainMedia(item, data.contentWidth(data.width));
          data.setNarrow().then(function() {
            data.layout(function() {
              data.completeResolver.fulfill(data.sandbox.element());
            });
          });
        }), fn(item, this.baseScribeData(), this.partner), item) : void 0;
      },
      /**
       * @return {?}
       */
      render : function() {
        var self = this;
        /** @type {string} */
        var tagName = "";
        var result = this.tweetId;
        return result ? (this.hideCard && (tagName += "c"), this.hideThread && (tagName += "t"), tagName && (result += "-" + tagName), this.rendered().then(function(el) {
          var editor = self.srcEl;
          if (editor) {
            if (editor.parentNode) {
              self.layout(function() {
                if (editor) {
                  if (editor.parentNode) {
                    editor.parentNode.removeChild(editor);
                  }
                }
              });
            }
          }
          if ("center" == self.align) {
            el.style({
              margin : "7px auto",
              cssFloat : "none"
            });
          } else {
            if (self.align) {
              if (self.width == self.dimensions.DEFAULT_WIDTH) {
                self.predefinedWidth = self.width = self.dimensions.NARROW_WIDTH;
              }
              el.style({
                cssFloat : self.align
              });
            }
          }
          self.layout(function() {
            self.height = self.sandbox.height(self.element.offsetHeight);
          }).then(function() {
            return assert.doLayoutAsync(), self.layout(function() {
              self.height = self.sandbox.height(self.element.offsetHeight);
            });
          }).then(function() {
            el.onresize(self.handleResize.bind(self));
          });
          el.style({
            position : "static",
            visibility : "visible"
          });
          assert.doLayoutAsync();
        }), uniq(result, this.lang, function(response) {
          self.ready().then(function() {
            self.element = self.create(response);
            self.readTimestampTranslations();
            self.updateTimeStamps();
            self.bindIntentHandlers();
            assert.doLayoutAsync();
          });
        }, function() {
          callback(self.tweetId, self.partner);
          self.completeResolver.fulfill(self.srcEl);
        }), deferreds.push(this.completed()), this.completed().then(this.scribePerformance.bind(this)), this.completed()) : (this.completeResolver.fulfill(this.srcEl), this.completed());
      },
      /**
       * @return {undefined}
       */
      scribePerformance : function() {
        Dom.endAndTrack("render", "widgets-js-load", "tweet", this.baseScribeData());
      },
      /**
       * @param {Object} keepActiveItem
       * @return {undefined}
       */
      augmentWidgets : function(keepActiveItem) {
        var node = keepActiveItem.querySelector("a.twitter-follow-button");
        if (node) {
          node.setAttribute("data-related", this.related);
          node.setAttribute("data-partner", this.partner);
          node.setAttribute("data-show-screen-name", "false");
          memory.push(node.parentNode);
        }
      },
      /**
       * @param {?} dataAndEvents
       * @return {?}
       */
      addUrlParams : function(dataAndEvents) {
        var i = this;
        var dontCloseTags = {
          related : this.related,
          partner : this.partner,
          original_referer : Block.rootDocumentLocation(),
          tw_p : tw_p
        };
        return this.addUrlParams = indexOf(dontCloseTags, function(fn) {
          var r = target.ancestor(".tweet", fn, i.element);
          return{
            tw_i : r.getAttribute("data-tweet-id")
          };
        }), this.addUrlParams(dataAndEvents);
      },
      /**
       * @return {?}
       */
      baseScribeData : function() {
        return{
          widget_origin : Block.rootDocumentLocation(),
          widget_frame : Block.isFramed() && Block.currentDocumentLocation(),
          message : this.partner
        };
      },
      /**
       * @param {undefined} pixelWidth
       * @return {undefined}
       */
      handleResize : function(pixelWidth) {
        var self = this;
        if (pixelWidth != this.width) {
          this.width = pixelWidth;
          this.setNarrow();
          this.constrainMedia(this.element, this.contentWidth(pixelWidth));
          this.collapseRegions();
          this.layout(function() {
            self.height = self.sandbox.height(self.element.offsetHeight);
            twttr.events.trigger("resize", {
              target : self.sandbox.element()
            });
          });
          assert.doLayoutAsync();
        }
      },
      /**
       * @return {undefined}
       */
      readTimestampTranslations : function() {
        var input = this.element;
        /** @type {string} */
        var i = "data-dt-";
        var oldClasses = input.getAttribute(i + "months") || "";
        this.datetime = new nodes(_.compact({
          phrases : {
            AM : input.getAttribute(i + "am"),
            PM : input.getAttribute(i + "pm")
          },
          months : oldClasses.split("|"),
          formats : {
            full : input.getAttribute(i + "full")
          }
        }));
      },
      /**
       * @return {undefined}
       */
      updateTimeStamps : function() {
        var div = this.element.querySelector(".long-permalink");
        var attrValue = div.getAttribute("data-datetime");
        var html = attrValue && this.datetime.localTimeStamp(attrValue);
        var el = div.getElementsByTagName("TIME")[0];
        if (html) {
          this.layout(function() {
            return el && el.innerHTML ? void(el.innerHTML = html) : void(div.innerHTML = html);
          }, "Update Timestamp");
          assert.doLayoutAsync();
        }
      }
    });
    /**
     * @return {undefined}
     */
    init.fetchAndRender = function() {
      var k;
      var lang;
      var item = collisions;
      /** @type {Array} */
      var keys = [];
      if (collisions = {}, item.keys) {
        keys = item.keys();
      } else {
        for (k in item) {
          if (item.hasOwnProperty(k)) {
            keys.push(k);
          }
        }
      }
      if (keys.length) {
        _self.init();
        lang = item[keys[0]][0].lang;
        db.tweets({
          ids : keys.sort(),
          lang : lang,
          /**
           * @param {Object} result
           * @return {undefined}
           */
          complete : function(result) {
            _.forIn(result, function(name, mapper) {
              var set = item[name];
              set.forEach(function(h) {
                if (h.s) {
                  h.s.call(this, mapper);
                }
              });
              delete item[name];
            });
            assert.doLayout();
            _.forIn(item, function(mapper, failures) {
              failures.forEach(function(entry) {
                if (entry.f) {
                  entry.f.call(this, mapper);
                }
              });
            });
            assert.doLayout();
          }
        });
        array.every.apply(null, deferreds).then(function() {
          refresh();
          _self.flush();
        });
        /** @type {Array} */
        deferreds = [];
      }
    };
    assert.afterLoad(init.fetchAndRender);
    /** @type {function (Object): undefined} */
    module.exports = init;
  }, {
    "dom/classname" : 3,
    "dom/get" : 5,
    "performance/perf-timers" : 8,
    "scribe/audience" : 14,
    "scribe/frame" : 15,
    "tfw/util/data" : 22,
    "tfw/util/media" : 25,
    "tfw/util/params" : 26,
    "tfw/widget/base" : 27,
    "tfw/widget/syndicatedbase" : 31,
    "util/datetime" : 36,
    "util/document" : 37,
    "util/promise" : 46,
    "util/twitter" : 49,
    "util/util" : 52
  }],
  29 : [function(require, module) {
    /**
     * @param {Object} obj
     * @return {undefined}
     */
    function Collection(obj) {
      if (obj) {
        var options;
        var sweep;
        var n;
        var cursor;
        f.apply(this, [obj]);
        options = this.params();
        sweep = options.size || this.dataAttr("size");
        n = options.showScreenName || this.dataAttr("show-screen-name");
        cursor = options.count || this.dataAttr("count");
        this.classAttr.push("twitter-follow-button");
        /** @type {boolean} */
        this.showScreenName = "false" != n;
        /** @type {boolean} */
        this.showCount = !(options.showCount === false || "false" == this.dataAttr("show-count"));
        if ("none" == cursor) {
          /** @type {boolean} */
          this.showCount = false;
        }
        this.explicitWidth = options.width || (this.dataAttr("width") || "");
        this.screenName = options.screen_name || (options.screenName || $.screenName(this.attr("href")));
        this.preview = options.preview || (this.dataAttr("preview") || "");
        this.align = options.align || (this.dataAttr("align") || "");
        /** @type {string} */
        this.size = "large" == sweep ? "l" : "m";
      }
    }
    var mod = require("util/donottrack");
    var _ = require("util/util");
    var f = require("tfw/widget/base");
    var $ = require("util/twitter");
    var RSVP = require("util/promise");
    var fn = require("dom/textsize");
    Collection.prototype = new f;
    _.aug(Collection.prototype, {
      iframeSource : "widgets/follow_button.331904cc91ddebde387d36578bfb9deb.{{lang}}.html",
      /**
       * @return {?}
       */
      widgetUrlParams : function() {
        return _.compact({
          screen_name : this.screenName,
          lang : this.lang,
          show_count : this.showCount,
          show_screen_name : this.showScreenName,
          align : this.align,
          id : this.id,
          preview : this.preview,
          size : this.size,
          partner : this.partner,
          dnt : mod.enabled(),
          _ : +new Date
        });
      },
      /**
       * @return {?}
       */
      width : function() {
        if (this.calculatedWidth) {
          return this.calculatedWidth;
        }
        if (this.explicitWidth) {
          return this.explicitWidth;
        }
        var padding;
        var rightBits;
        var info = {
          cnt : 13,
          btn : 24,
          xlcnt : 22,
          xlbtn : 38
        };
        /** @type {string} */
        var camelKey = this.showScreenName ? "Follow %{screen_name}" : "Follow";
        var msg = this._(camelKey, {
          screen_name : "@" + this.screenName
        });
        var _ = this._(~["ja", "ko"].indexOf(this.lang) ? "10k unit" : "M");
        var buf = this._("%{followers_count} followers", {
          followers_count : "88888" + _
        });
        /** @type {number} */
        var codeHeight = 0;
        /** @type {number} */
        var px = 0;
        var xs = this.styles.base;
        return "l" == this.size ? (xs = xs.concat(this.styles.large), padding = info.xlbtn, rightBits = info.xlcnt) : (padding = info.btn, rightBits = info.cnt), this.showCount && (px = fn(buf, "", xs).width + rightBits), codeHeight = fn(msg, "", xs.concat(this.styles.button)).width + padding, this.calculatedWidth = codeHeight + px;
      },
      /**
       * @return {?}
       */
      render : function() {
        if (!this.screenName) {
          return RSVP.reject("Missing Screen Name");
        }
        var a = this;
        var content = this.makeIframeSource();
        var ee = this.create(content, this.dimensions(), {
          title : this._("Twitter Follow Button")
        }).then(function(e) {
          return a.element = e;
        });
        return ee;
      }
    });
    /** @type {function (Object): undefined} */
    module.exports = Collection;
  }, {
    "dom/textsize" : 7,
    "tfw/widget/base" : 27,
    "util/donottrack" : 39,
    "util/promise" : 46,
    "util/twitter" : 49,
    "util/util" : 52
  }],
  30 : [function(require, module) {
    /**
     * @param {string} path
     * @return {undefined}
     */
    function readFile(path) {
      /** @type {number} */
      var e = Math.round(winWidth / 2 - width / 2);
      /** @type {number} */
      var i = 0;
      if (winHeight > height) {
        /** @type {number} */
        i = Math.round(winHeight / 2 - height / 2);
      }
      window.open(path, void 0, [ret, "width=" + width, "height=" + height, "left=" + e, "top=" + i].join(","));
    }
    /**
     * @param {string} name
     * @param {Object} arg
     * @return {undefined}
     */
    function func(name, arg) {
      var helper = require("tfw/hub/client");
      helper.openIntent(name, arg);
    }
    /**
     * @param {string} key
     * @return {?}
     */
    function callback(key) {
      /** @type {string} */
      var file = ~location.host.indexOf("poptip.com") ? "https://poptip.com" : location.href;
      /** @type {string} */
      var path = "original_referer=" + file;
      return[key, path].join(-1 == key.indexOf("?") ? "?" : "&");
    }
    /**
     * @param {Event} e
     * @return {undefined}
     */
    function handler(e) {
      var node;
      var nDigit;
      var nextCode;
      if (e = e || window.event, node = e.target || e.srcElement, !(e.altKey || (e.metaKey || e.shiftKey))) {
        for (;node && !~["A", "AREA"].indexOf(node.nodeName);) {
          node = node.parentNode;
        }
        if (node) {
          if (node.href) {
            nDigit = node.href.match(cDigit);
            if (nDigit) {
              nextCode = callback(node.href);
              nextCode = nextCode.replace(/^http[:]/, "https:");
              nextCode = nextCode.replace(/^\/\//, "https://");
              open(nextCode, node);
              /** @type {boolean} */
              e.returnValue = false;
              if (e.preventDefault) {
                e.preventDefault();
              }
            }
          }
        }
      }
    }
    /**
     * @param {string} name
     * @param {Object} id
     * @return {undefined}
     */
    function open(name, id) {
      if (selfClosing.isTwitterURL(name)) {
        if (twttr.events.hub && id) {
          var img = new Node(Event.generateId(), id);
          Event.add(img);
          func(name, id);
          twttr.events.trigger("click", {
            target : id,
            region : "intent",
            type : "click",
            data : {}
          });
        } else {
          readFile(name);
        }
      }
    }
    /**
     * @param {?} id
     * @param {?} element
     * @return {undefined}
     */
    function Node(id, element) {
      this.id = id;
      this.element = this.srcEl = element;
    }
    /**
     * @param {string} el
     * @return {undefined}
     */
    function constructor(el) {
      /** @type {Array} */
      this.srcEl = [];
      /** @type {string} */
      this.element = el;
    }
    var Event;
    var Attrs = require("tfw/widget/base");
    var lang = require("util/util");
    var test = require("util/promise");
    var selfClosing = require("util/twitter");
    /** @type {RegExp} */
    var cDigit = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/;
    /** @type {string} */
    var ret = "scrollbars=yes,resizable=yes,toolbar=no,location=yes";
    /** @type {number} */
    var width = 550;
    /** @type {number} */
    var height = 520;
    var winHeight = screen.height;
    var winWidth = screen.width;
    constructor.prototype = new Attrs;
    lang.aug(constructor.prototype, {
      /**
       * @return {?}
       */
      render : function() {
        return Event = this, window.twttr.__twitterIntentHandler || (document.addEventListener("click", handler, false), window.twttr.__twitterIntentHandler = true), test.fulfill(document.body);
      }
    });
    /** @type {function (string, Object): undefined} */
    constructor.open = open;
    /** @type {function (string): undefined} */
    module.exports = constructor;
  }, {
    "tfw/hub/client" : 19,
    "tfw/widget/base" : 27,
    "util/promise" : 46,
    "util/twitter" : 49,
    "util/util" : 52
  }],
  31 : [function(require, module) {
    /**
     * @return {undefined}
     */
    function query() {
      /** @type {(boolean|string)} */
      linkColor = init.VALID_COLOR.test(lang.val("widgets:link-color")) && RegExp.$1;
      /** @type {(boolean|string)} */
      borderColor = init.VALID_COLOR.test(lang.val("widgets:border-color")) && RegExp.$1;
      alarm = lang.val("widgets:theme");
    }
    /**
     * @param {Object} doc
     * @return {undefined}
     */
    function init(doc) {
      if (doc) {
        var options;
        var self = this;
        this.readyPromise = new Promise(function(theTitle) {
          self.readyResolver = theTitle;
        });
        this.renderedPromise = new Promise(function(theTitle) {
          self.renderResolver = theTitle;
        });
        fn.apply(this, [doc]);
        options = this.params();
        this.targetEl = this.srcEl && this.srcEl.parentNode || (options.targetEl || document.body);
        /** @type {(boolean|string)} */
        this.predefinedWidth = init.VALID_UNIT.test(options.width || this.attr("width")) && RegExp.$1;
        this.layout(function() {
          return self.containerWidth = helper.effectiveWidth(self.targetEl);
        }).then(function(dataAndEvents) {
          var baseval = self.predefinedWidth || (dataAndEvents || self.dimensions.DEFAULT_WIDTH);
          /** @type {(boolean|string)} */
          self.height = init.VALID_UNIT.test(options.height || self.attr("height")) && RegExp.$1;
          /** @type {number} */
          self.width = Math.max(self.dimensions.MIN_WIDTH, Math.min(baseval, self.dimensions.DEFAULT_WIDTH));
        });
        this.linkColor = init.VALID_COLOR.test(options.linkColor || this.dataAttr("link-color")) ? RegExp.$1 : linkColor;
        this.borderColor = init.VALID_COLOR.test(options.borderColor || this.dataAttr("border-color")) ? RegExp.$1 : borderColor;
        this.theme = options.theme || (this.attr("data-theme") || alarm);
        this.theme = /(dark|light)/.test(this.theme) ? this.theme : "";
        this.classAttr.push(config.touch() ? "is-touch" : "not-touch");
        if (config.ie9()) {
          this.classAttr.push("ie9");
        }
        this.sandboxCreated = $.createSandbox({
          "class" : this.renderedClassNames,
          id : this.id,
          allowfullscreen : ""
        }, {
          width : "1px",
          height : "0px",
          border : "none",
          position : "absolute",
          visibility : "hidden"
        }, function(styleSheet) {
          if (self.srcEl) {
            self.targetEl.insertBefore(styleSheet, self.srcEl);
          } else {
            self.targetEl.appendChild(styleSheet);
          }
        }, this.layout).then(function(isXML) {
          self.setupSandbox(isXML);
          new Repo(isXML.element().contentWindow);
        });
      }
    }
    /**
     * @param {number} sum
     * @param {number} value
     * @return {?}
     */
    function reversed(sum, value) {
      return sum + value;
    }
    var linkColor;
    var alarm;
    var borderColor;
    var fn = require("tfw/widget/base");
    var report = require("tfw/widget/intent");
    var Block = require("tfw/util/assets");
    var lang = require("tfw/util/globals");
    var angular = require("tfw/util/media");
    var assert = require("scribe/pixel");
    var Repo = require("video/video_post_message_interface");
    var Dom = require("dom/classname");
    var dom = require("dom/get");
    var Event = require("dom/delegate");
    var helper = require("dom/size");
    var $ = require("sandbox/frame");
    var config = require("util/env");
    var Promise = require("util/promise");
    var common = require("util/twitter");
    var nodes = require("util/typevalidator");
    var _ = require("util/util");
    /** @type {Array} */
    var mod = [".customisable", ".customisable:link", ".customisable:visited", ".customisable:hover", ".customisable:focus", ".customisable:active", ".customisable-highlight:hover", ".customisable-highlight:focus", "a:hover .customisable-highlight", "a:focus .customisable-highlight"];
    /** @type {Array} */
    var paths = ["a:hover .ic-mask", "a:focus .ic-mask"];
    /** @type {Array} */
    var cookies = [".customisable-border"];
    /** @type {Array} */
    var parents = [".timeline-header h1.summary", ".timeline-header h1.summary a:link", ".timeline-header h1.summary a:visited"];
    var TWEET = {
      TWEET : 0,
      RETWEET : 10
    };
    init.prototype = new fn;
    _.aug(init.prototype, {
      /**
       * @param {Object} isXML
       * @return {undefined}
       */
      setupSandbox : function(isXML) {
        var self = this;
        /** @type {Object} */
        this.sandbox = isXML;
        Promise.some(isXML.appendCss("body{display:none}"), isXML.setBaseTarget("_blank"), isXML.appendStyleSheet(Block.builtUrl("embed/timeline.css"))).then(function() {
          self.readyResolver.fulfill(isXML);
        });
      },
      /**
       * @return {?}
       */
      ready : function() {
        return this.readyPromise;
      },
      /**
       * @return {?}
       */
      rendered : function() {
        return this.renderedPromise;
      },
      /**
       * @param {Node} width
       * @return {?}
       */
      contentWidth : function(width) {
        var dimensions = this.dimensions;
        var arr = this.borderless ? 0 : dimensions.BORDERS;
        var inner = this.fullBleedPhoto ? 0 : this.chromeless && this.narrow ? dimensions.NARROW_MEDIA_PADDING_CL : this.chromeless ? dimensions.WIDE_MEDIA_PADDING_CL : this.narrow ? dimensions.NARROW_MEDIA_PADDING : dimensions.WIDE_MEDIA_PADDING;
        return(width || this.width) - (inner + arr);
      },
      /**
       * @return {?}
       */
      addSiteStyles : function() {
        /**
         * @param {string} code
         * @return {?}
         */
        function a(code) {
          return("dark" == theme.theme ? ".thm-dark " : "") + code;
        }
        var theme = this;
        /** @type {Array} */
        var handles = [];
        return this.headingStyle && handles.push(parents.map(a).join(",") + "{" + this.headingStyle + "}"), this.linkColor && (handles.push(mod.map(a).join(",") + "{color:" + this.linkColor + "}"), handles.push(paths.map(a).join(",") + "{background-color:" + this.linkColor + "}")), this.borderColor && handles.push(cookies.map(a).concat("dark" == this.theme ? [".thm-dark.customisable-border"] : []).join(",") + "{border-color:" + this.borderColor + "}"), handles.length ? this.sandbox.appendCss(handles.join("")) : 
        void 0;
      },
      /**
       * @return {?}
       */
      setNarrow : function() {
        var cfg = this;
        var narrow = this.narrow;
        return this.narrow = this.width < this.dimensions.NARROW_WIDTH, narrow != this.narrow ? this.layout(function() {
          return Dom.toggle(cfg.element, "var-narrow", cfg.narrow);
        }) : Promise.fulfill(this.narrow);
      },
      /**
       * @return {undefined}
       */
      bindIntentHandlers : function() {
        /**
         * @param {Event} event
         * @return {undefined}
         */
        function handler(event) {
          var expectationResult = dom.ancestor(".tweet", this, container);
          var config = _.aug({}, options.baseScribeData(), {
            item_ids : [],
            item_details : options.extractTweetScribeDetails(expectationResult)
          });
          _.forIn(config.item_details, function(spaceName) {
            config.item_ids.push(spaceName);
          });
          assert.interaction(event, config, true);
        }
        var options = this;
        var container = this.element;
        Event.delegate(container, "click", "A", handler);
        Event.delegate(container, "click", "BUTTON", handler);
        Event.delegate(container, "click", ".profile", function() {
          options.addUrlParams(this);
        });
        Event.delegate(container, "click", ".follow-button", function(ev) {
          var e;
          if (!ev.altKey) {
            if (!ev.metaKey) {
              if (!ev.shiftKey) {
                if (!config.ios()) {
                  if (!config.android()) {
                    if (!nodes.asBoolean(this.getAttribute("data-age-gate"))) {
                      e = common.intentForFollowURL(this.href, true);
                      if (e) {
                        report.open(e, options.sandbox.element());
                        Event.preventDefault(ev);
                      }
                    }
                  }
                }
              }
            }
          }
        });
        Event.delegate(container, "click", ".web-intent", function(ev) {
          options.addUrlParams(this);
          if (!ev.altKey) {
            if (!ev.metaKey) {
              if (!ev.shiftKey) {
                report.open(this.href, options.sandbox.element());
                Event.preventDefault(ev);
              }
            }
          }
        });
      },
      /**
       * @return {?}
       */
      baseScribeData : function() {
        return{};
      },
      /**
       * @param {Element} result
       * @return {?}
       */
      extractTweetScribeDetails : function(result) {
        var last;
        var i;
        var failed = {};
        return result ? (last = result.getAttribute("data-tweet-id"), i = result.getAttribute("data-rendered-tweet-id") || last, i == last ? failed[i] = {
          item_type : TWEET.TWEET
        } : last && (failed[i] = {
          item_type : TWEET.RETWEET,
          target_type : TWEET.TWEET,
          target_id : last
        }), failed) : failed;
      },
      /**
       * @param {string} element
       * @param {(Object|boolean|number|string)} opts
       * @return {?}
       */
      constrainMedia : function(element, opts) {
        return angular.constrainMedia(element || this.element, opts || this.contentWidth(), this.dimensions.maxHeight, this.layout);
      },
      /**
       * @return {undefined}
       */
      collapseRegions : function() {
        var d = this;
        _.toRealArray(this.element.querySelectorAll(".collapsible-container")).forEach(function(target) {
          var b;
          var attrName;
          var children = _.toRealArray(target.children);
          var a = children.length && target.offsetWidth;
          var child = children.length && children.map(function(div) {
            return div.offsetWidth;
          });
          var l = children.length;
          if (children.length) {
            for (;l > 0;) {
              if (l--, b = child.reduce(reversed, 0), !a || !b) {
                return;
              }
              if (a > b) {
                return;
              }
              attrName = children[l].getAttribute("data-collapsed-class");
              if (attrName) {
                Dom.add(d.element, attrName);
                child[l] = children[l].offsetWidth;
              }
            }
          }
        });
      }
    });
    /** @type {RegExp} */
    init.VALID_UNIT = /^([0-9]+)( ?px)?$/;
    /** @type {RegExp} */
    init.VALID_COLOR = /^(#(?:[0-9a-f]{3}|[0-9a-f]{6}))$/i;
    query();
    /** @type {function (Object): undefined} */
    module.exports = init;
  }, {
    "dom/classname" : 3,
    "dom/delegate" : 4,
    "dom/get" : 5,
    "dom/size" : 6,
    "sandbox/frame" : 12,
    "scribe/pixel" : 16,
    "tfw/util/assets" : 21,
    "tfw/util/globals" : 24,
    "tfw/util/media" : 25,
    "tfw/widget/base" : 27,
    "tfw/widget/intent" : 30,
    "util/env" : 40,
    "util/promise" : 46,
    "util/twitter" : 49,
    "util/typevalidator" : 50,
    "util/util" : 52,
    "video/video_post_message_interface" : 54
  }],
  32 : [function(require, module) {
    /**
     * @param {Object} token
     * @return {undefined}
     */
    function handler(token) {
      if (token) {
        var options;
        var dt;
        var borderless;
        var width;
        var height;
        var match;
        var nline;
        var overrideId;
        helper.apply(this, [token]);
        options = this.params();
        dt = (options.chrome || (this.dataAttr("chrome") || "")).split(" ");
        this.preview = options.previewParams;
        this.widgetId = options.widgetId || this.dataAttr("widget-id");
        /** @type {number} */
        this.instanceId = ++instanceId;
        this.cursors = {
          maxPosition : 0,
          minPosition : 0
        };
        /** @type {({overrideId: ?, overrideName: ?, overrideOwnerId: ?, overrideOwnerName: ?, overrideType: string}|{overrideId: ?, overrideName: ?, overrideType: string, withReplies: string}|{overrideId: ?, overrideName: ?, overrideType: string}|{overrideId: ??, overrideType: string}|{})} */
        this.override = (width = options.screenName || this.dataAttr("screen-name")) || (height = options.userId || this.dataAttr("user-id")) ? {
          overrideType : "user",
          overrideId : height,
          overrideName : width,
          withReplies : nodes.asBoolean(options.showReplies || this.dataAttr("show-replies")) ? "true" : "false"
        } : (width = options.favoritesScreenName || this.dataAttr("favorites-screen-name")) || (height = options.favoritesUserId || this.dataAttr("favorites-user-id")) ? {
          overrideType : "favorites",
          overrideId : height,
          overrideName : width
        } : ((width = options.listOwnerScreenName || this.dataAttr("list-owner-screen-name")) || (height = options.listOwnerId || this.dataAttr("list-owner-id"))) && ((match = options.listId || this.dataAttr("list-id")) || (nline = options.listSlug || this.dataAttr("list-slug"))) ? {
          overrideType : "list",
          overrideOwnerId : height,
          overrideOwnerName : width,
          overrideId : match,
          overrideName : nline
        } : (overrideId = options.customTimelineId || this.dataAttr("custom-timeline-id")) ? {
          overrideType : "custom",
          overrideId : overrideId
        } : {};
        this.tweetLimit = nodes.asInt(options.tweetLimit || this.dataAttr("tweet-limit"));
        /** @type {boolean} */
        this.staticTimeline = this.tweetLimit > 0;
        if (dt.length) {
          /** @type {number} */
          borderless = ~dt.indexOf("none");
          /** @type {number} */
          this.chromeless = borderless || ~dt.indexOf("transparent");
          /** @type {number} */
          this.headerless = borderless || ~dt.indexOf("noheader");
          /** @type {number} */
          this.footerless = borderless || ~dt.indexOf("nofooter");
          /** @type {number} */
          this.borderless = borderless || ~dt.indexOf("noborders");
          /** @type {number} */
          this.noscrollbar = ~dt.indexOf("noscrollbar");
        }
        this.headingStyle = filter.sanitize(options.headingStyle || this.dataAttr("heading-style"), void 0, true);
        this.classAttr.push("twitter-timeline-rendered");
        this.ariaPolite = options.ariaPolite || this.dataAttr("aria-polite");
      }
    }
    var layout = require("tfw/widget/base");
    var helper = require("tfw/widget/syndicatedbase");
    var datetime = require("util/datetime");
    var options = require("anim/transition");
    var Dom = require("performance/perf-timers");
    var p = require("tfw/util/data");
    var toString = require("tfw/util/media");
    var inspect = require("scribe/audience");
    var data_user = require("scribe/frame");
    var indexOf = require("tfw/util/params");
    var filter = require("util/css");
    var config = require("util/env");
    var nodes = require("util/typevalidator");
    var $ = require("util/util");
    var event = require("dom/delegate");
    var utils = require("dom/classname");
    var dom = require("dom/get");
    var mod = require("util/donottrack");
    var Block = require("util/document");
    var CLIENT_SIDE_USER = {
      CLIENT_SIDE_USER : 0,
      CLIENT_SIDE_APP : 2
    };
    /** @type {string} */
    var camelKey = ".timeline";
    /** @type {string} */
    var value = ".new-tweets-bar";
    /** @type {string} */
    var fragment = ".timeline-header";
    /** @type {string} */
    var d = ".timeline-footer";
    /** @type {string} */
    var option = ".stream";
    /** @type {string} */
    var sel = ".h-feed";
    /** @type {string} */
    var selector = ".tweet";
    /** @type {string} */
    var img = ".detail-expander";
    /** @type {string} */
    var node = ".expand";
    /** @type {string} */
    var s = ".permalink";
    /** @type {string} */
    var id = ".twitter-follow-button";
    /** @type {string} */
    var classSelector = ".no-more-pane";
    /** @type {string} */
    var name = "expanded";
    /** @type {string} */
    var className = "pending-scroll-in";
    /** @type {string} */
    var type = "pending-new-tweet-display";
    /** @type {string} */
    var res = "pending-new-tweet";
    /** @type {number} */
    var instanceId = 0;
    handler.prototype = new helper;
    $.aug(handler.prototype, {
      renderedClassNames : "twitter-timeline twitter-timeline-rendered",
      dimensions : {
        DEFAULT_HEIGHT : "600",
        DEFAULT_WIDTH : "520",
        NARROW_WIDTH : "320",
        maxHeight : "375",
        MIN_WIDTH : "180",
        MIN_HEIGHT : "200",
        WIDE_MEDIA_PADDING : 81,
        NARROW_MEDIA_PADDING : 16,
        WIDE_MEDIA_PADDING_CL : 60,
        NARROW_MEDIA_PADDING_CL : 12,
        BORDERS : 2
      },
      /**
       * @param {Object} response
       * @return {?}
       */
      create : function(response) {
        var item;
        var temp;
        var camelKey;
        var events;
        var self = this;
        var result = this.sandbox.createElement("div");
        /** @type {Array} */
        var configList = [];
        return result.innerHTML = response.body, (item = result.children[0] || false) ? (this.reconfigure(response.config), this.discardStaticOverflow(item), this.sandbox.setTitle(item.getAttribute("data-iframe-title") || "Timeline"), toString.retinize(item), this.constrainMedia(item), this.searchQuery = item.getAttribute("data-search-query"), this.profileId = item.getAttribute("data-profile-id"), this.timelineType = item.getAttribute("data-timeline-type"), events = this.getTweetDetails(result.querySelector(sel)), 
        $.forIn(events, function(name) {
          configList.push(name);
        }), camelKey = this.baseScribeData(), camelKey.item_ids = configList, camelKey.item_details = events, this.timelineType && data_user.clientEvent({
          page : this.timelineType + "_timeline",
          component : "timeline",
          element : "initial",
          action : configList.length ? "results" : "no_results"
        }, camelKey, true), data_user.clientEvent({
          page : "timeline",
          component : "timeline",
          element : "initial",
          action : configList.length ? "results" : "no_results"
        }, camelKey, true), inspect.scribeTimelineAudienceImpression(), data_user.flush(), "assertive" == this.ariaPolite && (temp = item.querySelector(value), temp.setAttribute("aria-polite", "assertive")), item.id = this.id, item.className += " " + this.classAttr.join(" "), item.lang = this.lang, this.augmentWidgets(item), this.ready().then(function($) {
          $.appendChild(item).then(function() {
            self.renderResolver.fulfill(self.sandbox);
          });
          $.style({
            cssText : "",
            border : "none",
            maxWidth : "100%",
            minWidth : self.dimensions.MIN_WIDTH + "px"
          });
          self.layout(function() {
            if (self.srcEl) {
              if (self.srcEl.parentNode) {
                self.srcEl.parentNode.removeChild(self.srcEl);
              }
            }
            self.predefinedWidth = self.width;
            self.predefinedHeight = self.height;
            self.width = $.width(self.width);
            self.height = $.height(self.height);
          }).then(function() {
            self.setNarrow();
            self.sandbox.onresize(self.handleResize.bind(self));
            self.completeResolver.fulfill(self.sandbox.element());
          });
        }), item) : void 0;
      },
      /**
       * @return {?}
       */
      render : function() {
        var c = this;
        return this.preview || this.widgetId ? (this.rendered().then(this.staticTimeline ? function(readBuffer) {
          c.layout(function() {
            readBuffer.height(c.height = c.element.offsetHeight);
          });
          layout.doLayoutAsync();
        } : function() {
          c.recalculateStreamHeight();
          layout.doLayoutAsync();
        }), this.preview ? this.getPreviewTimeline() : this.getTimeline(), this.completed().then(this.scribePerformance.bind(this)), this.completed()) : (this.completeResolver.reject(400), this.completed());
      },
      /**
       * @return {undefined}
       */
      scribePerformance : function() {
        Dom.endAndTrack("render", "widgets-js-load", "timeline", this.baseScribeData());
      },
      /**
       * @return {undefined}
       */
      getPreviewTimeline : function() {
        var self = this;
        p.timelinePreview({
          /**
           * @param {Object} response
           * @return {undefined}
           */
          success : function(response) {
            self.ready().then(function() {
              self.element = self.create(response);
              self.readTranslations();
              self.bindInteractions();
              self.updateCursors(response.headers, {
                initial : true
              });
              layout.doLayoutAsync();
            });
          },
          /**
           * @param {Object} response
           * @return {?}
           */
          error : function(response) {
            return response && response.headers ? void self.completeResolver.reject(response.headers.status) : void self.completeResolver.fulfill(self.srcEl);
          },
          params : this.preview
        });
      },
      /**
       * @return {undefined}
       */
      getTimeline : function() {
        var self = this;
        data_user.init();
        p.timeline($.aug({
          id : this.widgetId,
          instanceId : this.instanceId,
          dnt : mod.enabled(),
          lang : this.lang,
          /**
           * @param {Object} response
           * @return {undefined}
           */
          success : function(response) {
            self.ready().then(function() {
              self.element = self.create(response);
              self.readTranslations();
              self.bindInteractions();
              self.updateTimeStamps();
              self.updateCursors(response.headers, {
                initial : true
              });
              if (response.headers.xPolling) {
                if (/\d/.test(response.headers.xPolling)) {
                  /** @type {number} */
                  self.pollInterval = 1E3 * response.headers.xPolling;
                }
              }
              if (!self.staticTimeline) {
                self.schedulePolling();
              }
              layout.doLayoutAsync();
            });
          },
          /**
           * @param {Object} response
           * @return {?}
           */
          error : function(response) {
            return response && response.headers ? void self.completeResolver.reject(response.headers.status) : void self.completeResolver.fulfill(self.srcEl);
          }
        }, this.override));
      },
      /**
       * @param {Object} config
       * @return {undefined}
       */
      reconfigure : function(config) {
        this.lang = config.lang;
        if (!this.theme) {
          this.theme = config.theme;
        }
        if ("dark" == this.theme) {
          this.classAttr.push("thm-dark");
        }
        if (this.chromeless) {
          this.classAttr.push("var-chromeless");
        }
        if (this.borderless) {
          this.classAttr.push("var-borderless");
        }
        if (this.headerless) {
          this.classAttr.push("var-headerless");
        }
        if (this.footerless) {
          this.classAttr.push("var-footerless");
        }
        if (this.staticTimeline) {
          this.classAttr.push("var-static");
        }
        if (!this.linkColor) {
          if (config.linkColor) {
            if (helper.VALID_COLOR.test(config.linkColor)) {
              /** @type {string} */
              this.linkColor = RegExp.$1;
            }
          }
        }
        if (!this.height) {
          if (helper.VALID_UNIT.test(config.height)) {
            /** @type {string} */
            this.height = RegExp.$1;
          }
        }
        /** @type {number} */
        this.height = Math.max(this.dimensions.MIN_HEIGHT, this.height ? this.height : this.dimensions.DEFAULT_HEIGHT);
        if (this.preview) {
          this.classAttr.push("var-preview");
        }
        /** @type {boolean} */
        this.narrow = this.width <= this.dimensions.NARROW_WIDTH;
        if (this.narrow) {
          this.classAttr.push("var-narrow");
        }
        this.addSiteStyles();
      },
      /**
       * @param {Array} parentNode
       * @return {?}
       */
      getTweetDetails : function(parentNode) {
        var terms;
        var nv = this;
        var attributes = {};
        return terms = parentNode && parentNode.children || [], $.toRealArray(terms).forEach(function(v) {
          $.aug(attributes, nv.extractTweetScribeDetails(v));
        }), attributes;
      },
      /**
       * @return {?}
       */
      baseScribeData : function() {
        return{
          widget_id : this.widgetId,
          widget_origin : Block.rootDocumentLocation(),
          widget_frame : Block.isFramed() && Block.currentDocumentLocation(),
          message : this.partner,
          query : this.searchQuery,
          profile_id : this.profileId
        };
      },
      /**
       * @return {undefined}
       */
      bindInteractions : function() {
        var self = this;
        var container = this.element;
        /** @type {boolean} */
        var i = true;
        this.bindIntentHandlers();
        event.delegate(container, "click", ".load-tweets", function(evt) {
          if (i) {
            /** @type {boolean} */
            i = false;
            self.forceLoad();
            event.stop(evt);
          }
        });
        event.delegate(container, "click", ".display-sensitive-image", function(evt) {
          self.showNSFW(dom.ancestor(selector, this, container));
          event.stop(evt);
        });
        event.delegate(container, "mouseover", camelKey, function() {
          /** @type {boolean} */
          self.mouseOver = true;
        });
        event.delegate(container, "mouseout", camelKey, function() {
          /** @type {boolean} */
          self.mouseOver = false;
        });
        event.delegate(container, "mouseover", value, function() {
          /** @type {boolean} */
          self.mouseOverNotifier = true;
        });
        event.delegate(container, "mouseout", value, function() {
          /** @type {boolean} */
          self.mouseOverNotifier = false;
          window.setTimeout(function() {
            self.hideNewTweetNotifier();
          }, 3E3);
        });
        if (!this.staticTimeline) {
          event.delegate(container, "click", node, function(e) {
            if (!e.altKey) {
              if (!e.metaKey) {
                if (!e.shiftKey) {
                  self.toggleExpando(dom.ancestor(selector, this, container));
                  event.stop(e);
                }
              }
            }
          });
          event.delegate(container, "click", "A", function(e) {
            event.stopPropagation(e);
          });
          event.delegate(container, "click", ".with-expansion", function(evt) {
            self.toggleExpando(this);
            event.stop(evt);
          });
          event.delegate(container, "click", ".load-more", function() {
            self.loadMore();
          });
          event.delegate(container, "click", value, function() {
            self.scrollToTop();
            self.hideNewTweetNotifier(true);
          });
        }
      },
      /**
       * @return {undefined}
       */
      scrollToTop : function() {
        var options = this.element.querySelector(option);
        /** @type {number} */
        options.scrollTop = 0;
        options.focus();
      },
      /**
       * @return {undefined}
       */
      update : function() {
        var handler = this;
        var content = this.element.querySelector(sel);
        var elem = content && content.children[0];
        var nType = elem && elem.getAttribute("data-tweet-id");
        this.updateTimeStamps();
        this.requestTweets(nType, true, function(fragment) {
          if (fragment.childNodes.length > 0) {
            handler.insertNewTweets(fragment);
          }
        });
      },
      /**
       * @return {undefined}
       */
      loadMore : function() {
        var self = this;
        var elem = $.toRealArray(this.element.querySelectorAll(selector)).pop();
        var nType = elem && elem.getAttribute("data-tweet-id");
        this.requestTweets(nType, false, function(ul) {
          var marginDiv = self.element.querySelector(classSelector);
          var li = ul.childNodes[0];
          return marginDiv.style.cssText = "", li && (li.getAttribute("data-tweet-id") == nType && ul.removeChild(li)), ul.childNodes.length > 0 ? void self.appendTweets(ul) : (utils.add(self.element, "no-more"), void marginDiv.focus());
        });
      },
      /**
       * @return {undefined}
       */
      forceLoad : function() {
        var self = this;
        /** @type {boolean} */
        var state = !!this.element.querySelectorAll(sel).length;
        this.requestTweets(1, true, function(arg) {
          if (arg.childNodes.length) {
            self[state ? "insertNewTweets" : "appendTweets"](arg);
            utils.add(self.element, "has-tweets");
          }
        });
      },
      /**
       * @param {number} quietMillis
       * @return {undefined}
       */
      schedulePolling : function(quietMillis) {
        var vec = this;
        if (null !== this.pollInterval) {
          quietMillis = twttr.widgets.poll || (quietMillis || (this.pollInterval || 1E4));
          if (quietMillis > -1) {
            window.setTimeout(function() {
              if (!vec.isUpdating) {
                vec.update();
              }
              vec.schedulePolling();
            }, quietMillis);
          }
        }
      },
      /**
       * @param {?} s
       * @param {?} opt_attributes
       * @return {undefined}
       */
      updateCursors : function(s, opt_attributes) {
        if ((opt_attributes || {}).initial) {
          this.cursors.maxPosition = s.maxPosition;
          this.cursors.minPosition = s.minPosition;
        } else {
          if ((opt_attributes || {}).newer) {
            this.cursors.maxPosition = s.maxPosition || this.cursors.maxPosition;
          } else {
            this.cursors.minPosition = s.minPosition || this.cursors.minPosition;
          }
        }
      },
      /**
       * @param {?} str
       * @param {boolean} recurring
       * @param {Function} process
       * @return {undefined}
       */
      requestTweets : function(str, recurring, process) {
        var self = this;
        var settings = {
          id : this.widgetId,
          instanceId : this.instanceId,
          screenName : this.widgetScreenName,
          userId : this.widgetUserId,
          withReplies : this.widgetShowReplies,
          dnt : mod.enabled(),
          lang : this.lang
        };
        if (recurring && this.cursors.maxPosition) {
          settings.minPosition = this.cursors.maxPosition;
        } else {
          if (!recurring && this.cursors.minPosition) {
            settings.maxPosition = this.cursors.minPosition;
          } else {
            if (recurring) {
              settings.sinceId = str;
            } else {
              settings.maxId = str;
            }
          }
        }
        /**
         * @return {undefined}
         */
        settings.complete = function() {
          /** @type {boolean} */
          self.isUpdating = false;
        };
        /**
         * @param {Object} response
         * @return {?}
         */
        settings.error = function(response) {
          if (response && response.headers) {
            if ("404" == response.headers.status) {
              return void(self.pollInterval = null);
            }
            if ("503" == response.headers.status) {
              return void(self.pollInterval *= 1.5);
            }
          }
        };
        /**
         * @param {Object} response
         * @return {undefined}
         */
        settings.success = function(response) {
          var camelKey;
          var events;
          var last = self.sandbox.createDocumentFragment();
          var clone = self.sandbox.createElement("ol");
          /** @type {Array} */
          var configList = [];
          if (self.updateCursors(response.headers, {
            newer : recurring
          }), response && (response.headers && (response.headers.xPolling && (/\d+/.test(response.headers.xPolling) && (self.pollInterval = 1E3 * response.headers.xPolling)))), response && void 0 !== response.body) {
            if (clone.innerHTML = response.body, clone.children[0] && "LI" != clone.children[0].tagName) {
              return;
            }
            events = self.getTweetDetails(clone);
            $.forIn(events, function(name) {
              configList.push(name);
            });
            if (configList.length) {
              camelKey = self.baseScribeData();
              /** @type {Array} */
              camelKey.item_ids = configList;
              camelKey.item_details = events;
              /** @type {number} */
              camelKey.event_initiator = recurring ? CLIENT_SIDE_USER.CLIENT_SIDE_APP : CLIENT_SIDE_USER.CLIENT_SIDE_USER;
              if (self.timelineType) {
                data_user.clientEvent({
                  page : self.timelineType + "_timeline",
                  component : "timeline",
                  element : "initial",
                  action : configList.length ? "results" : "no_results"
                }, camelKey, true);
              }
              data_user.clientEvent({
                page : "timeline",
                component : "timeline",
                element : recurring ? "newer" : "older",
                action : "results"
              }, camelKey, true);
              data_user.flush();
            }
            toString.retinize(clone);
            self.constrainMedia(clone);
            for (;clone.children[0];) {
              last.appendChild(clone.children[0]);
            }
            process(last);
          }
        };
        p.timelinePoll($.aug(settings, this.override));
      },
      /**
       * @param {(Node|string)} context
       * @return {?}
       */
      insertNewTweets : function(context) {
        var value;
        var ev = this;
        var node = this.element.querySelector(option);
        var content = node.querySelector(sel);
        var height = content.offsetHeight;
        return content.insertBefore(context, content.firstChild), value = content.offsetHeight - height, twttr.events.trigger("timelineUpdated", {
          target : this.sandbox.element(),
          region : "newer"
        }), node.scrollTop > 40 || this.mouseIsOver() ? (node.scrollTop = node.scrollTop + value, this.updateTimeStamps(), void this.showNewTweetNotifier()) : (utils.remove(this.element, className), content.style.cssText = "margin-top: -" + value + "px", window.setTimeout(function() {
          /** @type {number} */
          node.scrollTop = 0;
          utils.add(ev.element, className);
          if (config.cssTransitions()) {
            /** @type {string} */
            content.style.cssText = "";
          } else {
            options.animate(function(maxTop) {
              /** @type {string} */
              content.style.cssText = value > maxTop ? "margin-top: -" + (value - maxTop) + "px" : "";
            }, value, 500, options.easeOut);
          }
        }, 500), this.updateTimeStamps(), void("custom" != this.timelineType && this.gcTweets(50)));
      },
      /**
       * @param {Node} child
       * @return {undefined}
       */
      appendTweets : function(child) {
        var el = this.element.querySelector(sel);
        el.appendChild(child);
        this.updateTimeStamps();
        twttr.events.trigger("timelineUpdated", {
          target : this.sandbox.element(),
          region : "older"
        });
      },
      /**
       * @param {number} max
       * @return {undefined}
       */
      gcTweets : function(max) {
        var that;
        var target = this.element.querySelector(sel);
        var len = target.children.length;
        max = max || 50;
        for (;len > max && (that = target.children[len - 1]);len--) {
          target.removeChild(that);
        }
      },
      /**
       * @return {undefined}
       */
      showNewTweetNotifier : function() {
        var ev = this;
        var obj = this.element.querySelector(value);
        var textNode = obj.children[0];
        /** @type {string} */
        obj.style.cssText = "";
        obj.removeChild(textNode);
        obj.appendChild(textNode);
        utils.add(this.element, type);
        window.setTimeout(function() {
          utils.add(ev.element, res);
        }, 10);
        /** @type {number} */
        this.newNoticeDisplayTime = +new Date;
        window.setTimeout(function() {
          ev.hideNewTweetNotifier();
        }, 5E3);
      },
      /**
       * @param {boolean} dataAndEvents
       * @return {undefined}
       */
      hideNewTweetNotifier : function(dataAndEvents) {
        var ev = this;
        if (dataAndEvents || !this.mouseOverNotifier) {
          utils.remove(this.element, res);
          window.setTimeout(function() {
            utils.remove(ev.element, type);
          }, 500);
        }
      },
      /**
       * @param {Object} s
       * @return {undefined}
       */
      augmentWidgets : function(s) {
        var e = s.querySelector("a" + id);
        if (e) {
          e.setAttribute("data-related", this.related);
          e.setAttribute("data-partner", this.partner);
          e.setAttribute("data-search-query", this.searchQuery);
          e.setAttribute("data-profile-id", this.profileId);
          if (this.width < 250) {
            e.setAttribute("data-show-screen-name", "false");
          }
          twttr.widgets.load(e.parentNode);
        }
      },
      /**
       * @param {Object} parent
       * @return {undefined}
       */
      discardStaticOverflow : function(parent) {
        var testElement;
        var r = parent.querySelector(sel);
        if (this.staticTimeline) {
          /** @type {number} */
          this.height = 0;
          for (;testElement = r.children[this.tweetLimit];) {
            r.removeChild(testElement);
          }
        }
      },
      /**
       * @return {undefined}
       */
      hideStreamScrollBar : function() {
        var margin;
        var marginDiv = this.element.querySelector(option);
        var elem = this.element.querySelector(sel);
        /** @type {string} */
        marginDiv.style.width = "";
        /** @type {number} */
        margin = this.element.offsetWidth - elem.offsetWidth;
        if (margin > 0) {
          /** @type {string} */
          marginDiv.style.width = this.element.offsetWidth + margin + "px";
        }
      },
      /**
       * @return {undefined}
       */
      readTranslations : function() {
        var ctx = this.element;
        /** @type {string} */
        var i = "data-dt-";
        this.datetime = new datetime($.compact({
          phrases : {
            now : ctx.getAttribute(i + "now"),
            s : ctx.getAttribute(i + "s"),
            m : ctx.getAttribute(i + "m"),
            h : ctx.getAttribute(i + "h"),
            second : ctx.getAttribute(i + "second"),
            seconds : ctx.getAttribute(i + "seconds"),
            minute : ctx.getAttribute(i + "minute"),
            minutes : ctx.getAttribute(i + "minutes"),
            hour : ctx.getAttribute(i + "hour"),
            hours : ctx.getAttribute(i + "hours")
          },
          months : ctx.getAttribute(i + "months").split("|"),
          formats : {
            abbr : ctx.getAttribute(i + "abbr"),
            shortdate : ctx.getAttribute(i + "short"),
            longdate : ctx.getAttribute(i + "long")
          }
        }));
      },
      /**
       * @return {undefined}
       */
      updateTimeStamps : function() {
        var root;
        var el;
        var oldconfig;
        var node;
        var parts = this.element.querySelectorAll(s);
        /** @type {number} */
        var part = 0;
        for (;root = parts[part];part++) {
          oldconfig = root.getAttribute("data-datetime");
          node = oldconfig && this.datetime.timeAgo(oldconfig, this.i18n);
          el = root.getElementsByTagName("TIME")[0];
          if (node) {
            if (el && el.innerHTML) {
              el.innerHTML = node;
            } else {
              root.innerHTML = node;
            }
          }
        }
      },
      /**
       * @return {?}
       */
      mouseIsOver : function() {
        return this.mouseOver;
      },
      /**
       * @param {?} dataAndEvents
       * @return {?}
       */
      addUrlParams : function(dataAndEvents) {
        var self = this;
        var dontCloseTags = {
          tw_w : this.widgetId,
          related : this.related,
          partner : this.partner,
          query : this.searchQuery,
          profile_id : this.profileId,
          original_referer : Block.rootDocumentLocation(),
          tw_p : "embeddedtimeline"
        };
        return this.addUrlParams = indexOf(dontCloseTags, function(name) {
          var elem = dom.ancestor(selector, name, self.element);
          return elem && {
            tw_i : elem.getAttribute("data-tweet-id")
          };
        }), this.addUrlParams(dataAndEvents);
      },
      /**
       * @param {Element} container
       * @return {undefined}
       */
      showNSFW : function(container) {
        var r;
        var pos;
        var html;
        var path;
        var el;
        var t;
        var node = container.querySelector(".nsfw");
        /** @type {number} */
        var marginTop = 0;
        if (node) {
          pos = toString.scaleDimensions(node.getAttribute("data-width"), node.getAttribute("data-height"), this.contentWidth(), node.getAttribute("data-height"));
          /** @type {boolean} */
          r = !!(path = node.getAttribute("data-player"));
          if (r) {
            el = this.sandbox.createElement("iframe");
          } else {
            el = this.sandbox.createElement("img");
            path = node.getAttribute(config.retina() ? "data-image-2x" : "data-image");
            el.alt = node.getAttribute("data-alt");
            t = this.sandbox.createElement("a");
            t.href = node.getAttribute("data-href");
            t.appendChild(el);
          }
          el.title = node.getAttribute("data-title");
          el.src = path;
          el.width = pos.width;
          el.height = pos.height;
          html = dom.ancestor(img, node, container);
          /** @type {number} */
          marginTop = pos.height - node.offsetHeight;
          node.parentNode.replaceChild(r ? el : t, node);
          /** @type {string} */
          html.style.cssText = "height:" + (html.offsetHeight + marginTop) + "px";
        }
      },
      /**
       * @param {Element} container
       * @return {?}
       */
      toggleExpando : function(container) {
        var clone;
        var ud;
        var inner = container.querySelector(img);
        var element = inner && inner.children[0];
        var compiled = element && element.getAttribute("data-expanded-media");
        /** @type {number} */
        var rh = 0;
        var list = container.querySelector(node);
        var hiddenPre = list && list.getElementsByTagName("B")[0];
        var cx = hiddenPre && (hiddenPre.innerText || hiddenPre.textContent);
        if (hiddenPre) {
          if (this.layout(function() {
            hiddenPre.innerHTML = list.getAttribute("data-toggled-text");
            list.setAttribute("data-toggled-text", cx);
          }), utils.present(container, name)) {
            return this.layout(function() {
              utils.remove(container, name);
            }), inner ? (this.layout(function() {
              /** @type {string} */
              inner.style.cssText = "";
              /** @type {string} */
              element.innerHTML = "";
            }), void layout.doLayout()) : void layout.doLayout();
          }
          if (compiled) {
            clone = this.sandbox.createElement("DIV");
            clone.innerHTML = compiled;
            toString.retinize(clone);
            rh = this.constrainMedia(clone);
            this.layout(function() {
              element.appendChild(clone);
            });
          }
          if (inner) {
            this.layout(function() {
              /** @type {number} */
              ud = Math.max(element.offsetHeight, rh);
              /** @type {string} */
              inner.style.cssText = "height:" + ud + "px";
            });
          }
          this.layout(function() {
            utils.add(container, name);
          });
          layout.doLayout();
        }
      },
      /**
       * @param {Array} deepDataAndEvents
       * @return {undefined}
       */
      recalculateStreamHeight : function(deepDataAndEvents) {
        var opts = this;
        var node = this.element.querySelector(fragment);
        var connected = this.element.querySelector(d);
        var marginDiv = this.element.querySelector(option);
        this.layout(function() {
          var b = node.offsetHeight + (connected ? connected.offsetHeight : 0);
          var a = deepDataAndEvents || opts.sandbox.height();
          /** @type {string} */
          marginDiv.style.cssText = "height:" + (a - b - 2) + "px";
          if (opts.noscrollbar) {
            opts.hideStreamScrollBar();
          }
        });
      },
      /**
       * @param {?} offsetY
       * @param {?} deepDataAndEvents
       * @return {undefined}
       */
      handleResize : function(offsetY, deepDataAndEvents) {
        var options = this;
        /** @type {number} */
        var dim = Math.min(this.dimensions.DEFAULT_WIDTH, Math.max(this.dimensions.MIN_WIDTH, Math.min(this.predefinedWidth || this.dimensions.DEFAULT_WIDTH, offsetY)));
        if (dim != this.width || deepDataAndEvents != this.height) {
          /** @type {number} */
          this.width = dim;
          this.height = deepDataAndEvents;
          this.setNarrow();
          this.constrainMedia(this.element, this.contentWidth(dim));
          if (this.staticTimeline) {
            this.layout(function() {
              options.height = options.element.offsetHeight;
              options.sandbox.height(options.height);
              twttr.events.trigger("resize", {
                target : options.sandbox.element()
              });
            });
          } else {
            this.recalculateStreamHeight(deepDataAndEvents);
            twttr.events.trigger("resize", {
              target : this.sandbox.element()
            });
          }
          layout.doLayoutAsync();
        }
      }
    });
    /** @type {function (Object): undefined} */
    module.exports = handler;
  }, {
    "anim/transition" : 2,
    "dom/classname" : 3,
    "dom/delegate" : 4,
    "dom/get" : 5,
    "performance/perf-timers" : 8,
    "scribe/audience" : 14,
    "scribe/frame" : 15,
    "tfw/util/data" : 22,
    "tfw/util/media" : 25,
    "tfw/util/params" : 26,
    "tfw/widget/base" : 27,
    "tfw/widget/syndicatedbase" : 31,
    "util/css" : 35,
    "util/datetime" : 36,
    "util/document" : 37,
    "util/donottrack" : 39,
    "util/env" : 40,
    "util/typevalidator" : 50,
    "util/util" : 52
  }],
  33 : [function(require, context) {
    /**
     * @param {Object} elem
     * @return {undefined}
     */
    function next(elem) {
      f.apply(this, [elem]);
      var params = this.params();
      var lastMove = params.count || this.dataAttr("count");
      var sweep = params.size || this.dataAttr("size");
      var related = Block.getScreenNameFromPage();
      var source = "" + (params.shareWithRetweet || (this.dataAttr("share-with-retweet") || lang.val("share-with-retweet")));
      this.classAttr.push("twitter-tweet-button");
      if ("hashtag" == params.type || ~this.classAttr.indexOf("twitter-hashtag-button")) {
        /** @type {string} */
        this.type = "hashtag";
        this.classAttr.push("twitter-hashtag-button");
      } else {
        if ("mention" == params.type || ~this.classAttr.indexOf("twitter-mention-button")) {
          /** @type {string} */
          this.type = "mention";
          this.classAttr.push("twitter-mention-button");
        } else {
          this.classAttr.push("twitter-share-button");
        }
      }
      this.text = params.text || this.dataAttr("text");
      if (this.text) {
        if (/\+/.test(this.text)) {
          if (!/ /.test(this.text)) {
            this.text = this.text.replace(/\+/g, " ");
          }
        }
      }
      this.counturl = params.counturl || this.dataAttr("counturl");
      this.searchlink = params.searchlink || this.dataAttr("searchlink");
      this.button_hashtag = user.hashTag(params.button_hashtag || (params.hashtag || this.dataAttr("button-hashtag")), false);
      /** @type {string} */
      this.size = "large" == sweep ? "l" : "m";
      this.align = params.align || (this.dataAttr("align") || "");
      this.via = params.via || this.dataAttr("via");
      this.hashtags = params.hashtags || this.dataAttr("hashtags");
      this.screen_name = user.screenName(params.screen_name || (params.screenName || this.dataAttr("button-screen-name")));
      this.url = params.url || this.dataAttr("url");
      if (this.type) {
        /** @type {string} */
        this.count = "none";
        /** @type {string} */
        this.shareWithRetweet = "never";
        if (related) {
          this.related = this.related ? related + "," + this.related : related;
        }
      } else {
        this.text = this.text || text;
        this.url = this.url || (Block.getCanonicalURL() || myUrl);
        this.count = ~directions.indexOf(lastMove) ? lastMove : "horizontal";
        this.count = "vertical" == this.count && "l" == this.size ? "none" : this.count;
        this.via = this.via || related;
        if (source) {
          if (~file.indexOf(source)) {
            this.shareWithRetweet = source.replace("-", "_");
          }
        }
      }
    }
    var f = require("tfw/widget/base");
    var lang = require("tfw/util/globals");
    var $ = require("util/util");
    var Block = require("util/uri");
    var user = require("util/twitter");
    var expect = require("dom/textsize");
    var mod = require("util/donottrack");
    /** @type {string} */
    var text = document.title;
    /** @type {string} */
    var myUrl = location.href;
    /** @type {Array} */
    var directions = ["vertical", "horizontal", "none"];
    /** @type {Array} */
    var file = ["never", "publisher-first", "publisher-only", "author-first", "author-only"];
    next.prototype = new f;
    $.aug(next.prototype, {
      iframeSource : "widgets/tweet_button.214e3d3b0c5437701f749bab582597f0.{{lang}}.html",
      /**
       * @return {?}
       */
      widgetUrlParams : function() {
        return $.compact({
          text : this.text,
          url : this.url,
          via : this.via,
          related : this.related,
          count : this.count,
          lang : this.lang,
          counturl : this.counturl,
          searchlink : this.searchlink,
          placeid : this.placeid,
          original_referer : location.href,
          id : this.id,
          size : this.size,
          type : this.type,
          screen_name : this.screen_name,
          share_with_retweet : this.shareWithRetweet,
          button_hashtag : this.button_hashtag,
          hashtags : this.hashtags,
          align : this.align,
          partner : this.partner,
          dnt : mod.enabled(),
          _ : +new Date
        });
      },
      /**
       * @return {?}
       */
      height : function() {
        return "vertical" == this.count ? 62 : "m" == this.size ? 20 : 28;
      },
      /**
       * @return {?}
       */
      width : function() {
        var opts = {
          ver : 8,
          cnt : 14,
          btn : 24,
          xlcnt : 18,
          xlbtn : 38
        };
        /** @type {boolean} */
        var inverted = "vertical" == this.count;
        /** @type {string} */
        var camelKey = "hashtag" == this.type && this.button_hashtag ? "Tweet %{hashtag}" : "mention" == this.type && this.screen_name ? "Tweet to %{name}" : "Tweet";
        var msg = this._(camelKey, {
          name : "@" + this.screen_name,
          hashtag : "#" + this.button_hashtag
        });
        var actual = this._("K");
        var b = this._("100K+");
        /** @type {string} */
        var a = (inverted ? "8888" : "88888") + actual;
        /** @type {number} */
        var right = 0;
        /** @type {number} */
        var left = 0;
        /** @type {number} */
        var width = 0;
        /** @type {number} */
        var x = 0;
        var node = this.styles.base;
        var element = node;
        return~["ja", "ko"].indexOf(this.lang) ? a += this._("10k unit") : a = a.length > b.length ? a : b, inverted ? (element = node.concat(this.styles.vbubble), x = opts.ver, width = opts.btn) : "l" == this.size ? (node = element = node.concat(this.styles.large), width = opts.xlbtn, x = opts.xlcnt) : (width = opts.btn, x = opts.cnt), "none" != this.count && (left = expect(a, "", element).width + x), right = expect(msg, "", node.concat(this.styles.button)).width + width, inverted ? right > left ? 
        right : left : this.calculatedWidth = right + left;
      },
      /**
       * @return {?}
       */
      render : function() {
        var t;
        var a = this;
        var content = this.makeIframeSource();
        return this.count && this.classAttr.push("twitter-count-" + this.count), t = this.create(content, this.dimensions(), {
          title : this._("Twitter Tweet Button")
        }).then(function(e) {
          return a.element = e;
        });
      }
    });
    /** @type {function (Object): undefined} */
    context.exports = next;
  }, {
    "dom/textsize" : 7,
    "tfw/util/globals" : 24,
    "tfw/widget/base" : 27,
    "util/donottrack" : 39,
    "util/twitter" : 49,
    "util/uri" : 51,
    "util/util" : 52
  }],
  34 : [function(require, module) {
    /**
     * @param {?} axis
     * @param {string} lang
     * @param {string} scale
     * @param {Function} x
     * @return {undefined}
     */
    function translate(axis, lang, scale, x) {
      result[axis] = result[axis] || [];
      result[axis].push({
        s : scale,
        /** @type {Function} */
        f : x,
        lang : lang
      });
    }
    /**
     * @param {?} index
     * @param {?} start
     * @return {undefined}
     */
    function play(index, start) {
      var viewItems = {};
      viewItems[index] = {
        item_type : 0
      };
      utils.clientEvent({
        page : "video",
        component : "tweet",
        action : "results"
      }, _.aug({}, start, {
        item_ids : [index],
        item_details : viewItems
      }), true);
      helper.scribeVideoAudienceImpression();
    }
    /**
     * @param {?} key
     * @param {string} msg
     * @return {undefined}
     */
    function fn(key, msg) {
      var $cookies = {};
      $cookies[key] = {
        item_type : 0
      };
      utils.clientEvent({
        page : "video",
        component : "rawembedcode",
        action : "no_results"
      }, {
        widget_origin : Block.rootDocumentLocation(),
        widget_frame : Block.isFramed() && Block.currentDocumentLocation(),
        message : msg,
        item_ids : [key],
        item_details : $cookies
      }, true);
      helper.scribeVideoAudienceImpression();
    }
    /**
     * @param {Object} object
     * @return {undefined}
     */
    function init(object) {
      if (object) {
        handler.apply(this, [object]);
        var params = this.params();
        /** @type {boolean} */
        this.hideStatus = "hidden" === (params.status || this.dataAttr("status"));
        this.tweetId = params.tweetId || this.dataAttr("tweet-id");
      }
    }
    var assert = require("tfw/widget/base");
    var handler = require("tfw/widget/syndicatedbase");
    var nodes = require("util/datetime");
    var array = require("util/promise");
    var _ = require("util/util");
    var Block = require("util/document");
    var db = require("tfw/util/data");
    var helper = require("scribe/audience");
    var utils = require("scribe/frame");
    var result = {};
    /** @type {Array} */
    var newArguments = [];
    init.prototype = new handler;
    _.aug(init.prototype, {
      renderedClassNames : "twitter-video twitter-video-rendered",
      videoPlayer : true,
      dimensions : {
        DEFAULT_HEIGHT : "360",
        DEFAULT_WIDTH : "640",
        maxHeight : "1080",
        MIN_WIDTH : "320",
        MIN_HEIGHT : "180",
        WIDE_MEDIA_PADDING : 0,
        NARROW_MEDIA_PADDING : 0,
        BORDERS : 0
      },
      /**
       * @param {string} template
       * @return {?}
       */
      create : function(template) {
        var object;
        var data = this;
        var container = this.sandbox.createElement("div");
        return container.innerHTML = template, (object = container.children[0]) ? (this.playerConfig = JSON.parse(object.getAttribute("data-player-config")), this.sandbox.setTitle(object.getAttribute("data-iframe-title") || "Video"), this.sandbox.style({
          cssText : "",
          display : "block",
          width : "99%",
          minWidth : this.dimensions.MIN_WIDTH + "px",
          maxWidth : "99%",
          padding : "0",
          margin : "10px 0",
          position : "absolute",
          visibility : "hidden"
        }), this.sandbox.appendChild(object).then(function() {
          data.renderResolver.fulfill(data.sandbox);
        }), this.layout(function() {
          data.predefinedWidth = data.width;
          data.width = data.sandbox.width(data.width);
          data.constrainMedia(object, data.contentWidth(data.width));
          data.completeResolver.fulfill(data.sandbox.element());
        }), play(this.tweetId, this.baseScribeData()), object) : void 0;
      },
      /**
       * @return {?}
       */
      render : function() {
        var self = this;
        return this.tweetId ? (this.rendered().then(function(element) {
          var editor = self.srcEl;
          if (editor) {
            if (editor.parentNode) {
              self.layout(function() {
                if (editor) {
                  if (editor.parentNode) {
                    editor.parentNode.removeChild(editor);
                  }
                }
              });
            }
          }
          self.layout(function() {
            self.height = self.sandbox.height(self.element.offsetHeight);
          }).then(function() {
            element.onresize(self.handleResize.bind(self));
          });
          element.style({
            position : "static",
            visibility : "visible"
          });
          assert.doLayoutAsync();
        }), translate(this.tweetId, this.lang, function(response) {
          self.ready().then(function() {
            self.element = self.create(response);
            self.readTimestampTranslations();
            self.writePlayerConfig();
            assert.doLayoutAsync();
          });
        }, function() {
          fn(self.tweetId, self.partner);
          self.completeResolver.fulfill(self.srcEl);
        }), newArguments.push(this.completed()), this.completed()) : (this.completeResolver.fulfill(this.srcEl), this.completed());
      },
      /**
       * @param {?} dim
       * @return {undefined}
       */
      handleResize : function(dim) {
        var self = this;
        if (dim != this.width) {
          this.width = dim;
          this.constrainMedia(this.element, this.contentWidth(this.width));
          this.layout(function() {
            self.height = self.sandbox.height(self.element.offsetHeight);
            twttr.events.trigger("resize", {
              target : self.sandbox.element()
            });
          });
          assert.doLayoutAsync();
        }
      },
      /**
       * @return {?}
       */
      baseScribeData : function() {
        return{
          widget_origin : Block.rootDocumentLocation(),
          widget_frame : Block.isFramed() && Block.currentDocumentLocation(),
          message : this.partner
        };
      },
      /**
       * @return {undefined}
       */
      readTimestampTranslations : function() {
        var input = this.element;
        /** @type {string} */
        var i = "data-dt-";
        var oldClasses = input.getAttribute(i + "months") || "";
        this.datetime = new nodes(_.compact({
          phrases : {
            AM : input.getAttribute(i + "am"),
            PM : input.getAttribute(i + "pm")
          },
          months : oldClasses.split("|"),
          formats : {
            full : input.getAttribute(i + "full")
          }
        }));
      },
      /**
       * @return {?}
       */
      getTimestamp : function() {
        var b = this.element.getAttribute("data-datetime");
        var bup = b && this.datetime.localTimeStamp(b);
        return{
          local : bup
        };
      },
      /**
       * @return {undefined}
       */
      writePlayerConfig : function() {
        this.playerConfig.statusTimestamp = this.getTimestamp();
        this.playerConfig.hideStatus = this.hideStatus;
        this.element.setAttribute("data-player-config", JSON.stringify(this.playerConfig));
      }
    });
    /**
     * @return {undefined}
     */
    init.fetchAndRender = function() {
      var seen = result;
      /** @type {Array} */
      var bucket = [];
      result = {};
      var value;
      for (value in seen) {
        if (seen.hasOwnProperty(value)) {
          bucket.push(value);
        }
      }
      if (bucket.length) {
        db.videos({
          ids : bucket.sort(),
          lang : seen[bucket[0]][0].lang,
          /**
           * @param {Object} result
           * @return {undefined}
           */
          complete : function(result) {
            _.forIn(result, function(index, mapper) {
              var s = seen[index];
              s.forEach(function(h) {
                if (h.s) {
                  h.s.call(this, mapper);
                }
              });
              delete seen[index];
            });
            assert.doLayout();
            _.forIn(seen, function(mapper, failures) {
              failures.forEach(function(entry) {
                if (entry.f) {
                  entry.f.call(this, mapper);
                }
              });
            });
            assert.doLayout();
          }
        });
        array.every.apply(null, newArguments);
        /** @type {Array} */
        newArguments = [];
      }
    };
    assert.afterLoad(init.fetchAndRender);
    /** @type {function (Object): undefined} */
    module.exports = init;
  }, {
    "scribe/audience" : 14,
    "scribe/frame" : 15,
    "tfw/util/data" : 22,
    "tfw/widget/base" : 27,
    "tfw/widget/syndicatedbase" : 31,
    "util/datetime" : 36,
    "util/document" : 37,
    "util/promise" : 46,
    "util/util" : 52
  }],
  35 : [function(dataAndEvents, module) {
    module.exports = {
      /**
       * @param {string} param
       * @param {RegExp} term
       * @param {boolean} state
       * @return {?}
       */
      sanitize : function(param, term, state) {
        var row;
        /** @type {RegExp} */
        var typePattern = /^[\w ,%\/"'\-_#]+$/;
        var inDef = param && param.split(";").map(function(pair) {
          return pair.split(":").slice(0, 2).map(function(buf) {
            return buf.trim();
          });
        });
        /** @type {number} */
        var i = 0;
        /** @type {Array} */
        var assigns = [];
        /** @type {string} */
        var vvar = state ? "!important" : "";
        term = term || /^(font|text\-|letter\-|color|line\-)[\w\-]*$/;
        for (;inDef && (row = inDef[i]);i++) {
          if (row[0].match(term)) {
            if (row[1].match(typePattern)) {
              assigns.push(row.join(":") + vvar);
            }
          }
        }
        return assigns.join(";");
      }
    };
  }, {}],
  36 : [function(dataAndEvents, module) {
    /**
     * @param {number} v
     * @return {?}
     */
    function toInt(v) {
      return 10 > v ? "0" + v : v;
    }
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function format(options) {
      /**
       * @param {string} object
       * @param {?} opt_attributes
       * @return {?}
       */
      function extend(object, opt_attributes) {
        return data && (data[object] && (object = data[object])), object.replace(/%\{([\w_]+)\}/g, function(dataAndEvents, timeoutKey) {
          return void 0 !== opt_attributes[timeoutKey] ? opt_attributes[timeoutKey] : dataAndEvents;
        });
      }
      var data = options && options.phrases;
      var methods = options && options.months || months;
      var item = options && options.formats || defaultValidator;
      /**
       * @param {string} b
       * @return {?}
       */
      this.timeAgo = function(b) {
        var lc;
        var result = format.parseDate(b);
        /** @type {number} */
        var firstDayOfWeekOfYear = +new Date;
        /** @type {number} */
        var end = firstDayOfWeekOfYear - result;
        return result ? isNaN(end) || 2 * h > end ? extend("now") : p > end ? (lc = Math.floor(end / h), extend(item.abbr, {
          number : lc,
          symbol : extend(me, {
            abbr : extend("s"),
            expanded : extend(lc > 1 ? "seconds" : "second")
          })
        })) : time > end ? (lc = Math.floor(end / p), extend(item.abbr, {
          number : lc,
          symbol : extend(me, {
            abbr : extend("m"),
            expanded : extend(lc > 1 ? "minutes" : "minute")
          })
        })) : x > end ? (lc = Math.floor(end / time), extend(item.abbr, {
          number : lc,
          symbol : extend(me, {
            abbr : extend("h"),
            expanded : extend(lc > 1 ? "hours" : "hour")
          })
        })) : 365 * x > end ? extend(item.shortdate, {
          day : result.getDate(),
          month : extend(methods[result.getMonth()])
        }) : extend(item.longdate, {
          day : result.getDate(),
          month : extend(methods[result.getMonth()]),
          year : result.getFullYear().toString().slice(2)
        }) : "";
      };
      /**
       * @param {string} str
       * @return {?}
       */
      this.localTimeStamp = function(str) {
        var input = format.parseDate(str);
        var value = input && input.getHours();
        return input ? extend(item.full, {
          day : input.getDate(),
          month : extend(methods[input.getMonth()]),
          year : input.getFullYear(),
          hours24 : toInt(value),
          hours12 : 13 > value ? value ? value : "12" : value - 12,
          minutes : toInt(input.getMinutes()),
          seconds : toInt(input.getSeconds()),
          amPm : extend(12 > value ? "AM" : "PM")
        }) : "";
      };
    }
    /** @type {RegExp} */
    var valuePattern = /(\d{4})-?(\d{2})-?(\d{2})T(\d{2}):?(\d{2}):?(\d{2})(Z|[\+\-]\d{2}:?\d{2})/;
    /** @type {RegExp} */
    var core_rnotwhite = /[a-z]{3,4} ([a-z]{3}) (\d{1,2}) (\d{1,2}):(\d{2}):(\d{2}) ([\+\-]\d{2}:?\d{2}) (\d{4})/i;
    /** @type {RegExp} */
    var rchecked = /^\d+$/;
    /** @type {Array} */
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var defaultValidator = {
      abbr : "%{number}%{symbol}",
      shortdate : "%{day} %{month}",
      longdate : "%{day} %{month} %{year}",
      full : "%{hours12}:%{minutes} %{amPm} - %{day} %{month} %{year}"
    };
    /** @type {number} */
    var h = 1E3;
    /** @type {number} */
    var p = 60 * h;
    /** @type {number} */
    var time = 60 * p;
    /** @type {number} */
    var x = 24 * time;
    /** @type {string} */
    var me = '<abbr title="%{expanded}">%{abbr}</abbr>';
    /**
     * @param {string} string
     * @return {?}
     */
    format.parseDate = function(string) {
      var year;
      var iterDate;
      var str = string || "";
      var value = str.toString();
      return(year = function() {
        var m;
        return rchecked.test(value) ? parseInt(value, 10) : (m = value.match(core_rnotwhite)) ? Date.UTC(m[7], months.indexOf(m[1]), m[2], m[3], m[4], m[5]) : (m = value.match(valuePattern)) ? Date.UTC(m[1], m[2] - 1, m[3], m[4], m[5], m[6]) : void 0;
      }()) ? (iterDate = new Date(year), !isNaN(iterDate.getTime()) && iterDate) : false;
    };
    /** @type {function (Object): undefined} */
    module.exports = format;
  }, {}],
  37 : [function(require, module) {
    /**
     * @param {?} value
     * @return {?}
     */
    function format(value) {
      return value && (node.isType("string", value) && (mode = value)), mode;
    }
    /**
     * @return {?}
     */
    function map() {
      return m;
    }
    /**
     * @return {?}
     */
    function isFramed() {
      return mode !== m;
    }
    var Block = require("util/uri");
    var node = require("util/util");
    var mode = Block.getCanonicalURL() || document.location.href;
    var m = mode;
    module.exports = {
      /** @type {function (): ?} */
      isFramed : isFramed,
      /** @type {function (?): ?} */
      rootDocumentLocation : format,
      /** @type {function (): ?} */
      currentDocumentLocation : map
    };
  }, {
    "util/uri" : 51,
    "util/util" : 52
  }],
  38 : [function(dataAndEvents, module) {
    /**
     * @return {undefined}
     */
    function removeEventListener() {
      /** @type {number} */
      s = 1;
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var l = fns.length;
      for (;l > i;i++) {
        fns[i]();
      }
    }
    var fn;
    var completed;
    var one;
    /** @type {number} */
    var s = 0;
    /** @type {Array} */
    var fns = [];
    /** @type {boolean} */
    var useCapture = false;
    /** @type {Element} */
    var testEl = document.createElement("a");
    if (/^loade|c/.test(document.readyState)) {
      /** @type {number} */
      s = 1;
    }
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", completed = function() {
        document.removeEventListener("DOMContentLoaded", completed, useCapture);
        removeEventListener();
      }, useCapture);
    }
    if (testEl.doScroll) {
      document.attachEvent("onreadystatechange", fn = function() {
        if (/^c/.test(document.readyState)) {
          document.detachEvent("onreadystatechange", fn);
          removeEventListener();
        }
      });
    }
    /** @type {function (Object): undefined} */
    one = testEl.doScroll ? function(fn) {
      if (window.self != window.top) {
        if (s) {
          fn();
        } else {
          fns.push(fn);
        }
      } else {
        !function() {
          try {
            testEl.doScroll("left");
          } catch (e) {
            return setTimeout(function() {
              one(fn);
            }, 50);
          }
          fn();
        }();
      }
    } : function(fn) {
      if (s) {
        fn();
      } else {
        fns.push(fn);
      }
    };
    /** @type {function (Object): undefined} */
    module.exports = one;
  }, {}],
  39 : [function(require, module) {
    /**
     * @return {undefined}
     */
    function setOn() {
      /** @type {boolean} */
      l = true;
    }
    /**
     * @param {Object} node
     * @param {string} host
     * @return {?}
     */
    function handler(node, host) {
      return l ? true : Block.asBoolean(lang.val("dnt")) ? true : document.navigator && 1 == document.navigator.doNotTrack ? true : !navigator || 1 != navigator.doNotTrack && 1 != navigator.msDoNotTrack ? nodes.isUrlSensitive(host || document.location.host) ? true : helper.isFramed() && nodes.isUrlSensitive(helper.rootDocumentLocation()) ? true : (node = rchecked.test(node || document.referrer) && RegExp.$1, node && nodes.isUrlSensitive(node) ? true : false) : true;
    }
    var helper = require("util/document");
    var nodes = require("util/tld");
    var Block = require("util/typevalidator");
    var lang = require("tfw/util/globals");
    /** @type {boolean} */
    var l = false;
    /** @type {RegExp} */
    var rchecked = /https?:\/\/([^\/]+).*/i;
    module.exports = {
      /** @type {function (): undefined} */
      setOn : setOn,
      /** @type {function (Object, string): ?} */
      enabled : handler
    };
  }, {
    "tfw/util/globals" : 24,
    "util/document" : 37,
    "util/tld" : 48,
    "util/typevalidator" : 50
  }],
  40 : [function(require, $) {
    /**
     * @param {Object} win
     * @return {?}
     */
    function isHiDPI(win) {
      return win = win || window, win.devicePixelRatio ? win.devicePixelRatio >= 1.5 : win.matchMedia ? win.matchMedia("only screen and (min-resolution: 144dpi)").matches : false;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    function isConditionalComment(text) {
      return text = text || Undefined, /(Trident|MSIE \d)/.test(text);
    }
    /**
     * @param {?} qualifier
     * @return {?}
     */
    function winnow(qualifier) {
      return qualifier = qualifier || Undefined, /MSIE 9/.test(qualifier);
    }
    /**
     * @param {?} text
     * @return {?}
     */
    function trim(text) {
      return text = text || Undefined, /(iPad|iPhone|iPod)/.test(text);
    }
    /**
     * @param {?} text
     * @return {?}
     */
    function template(text) {
      return text = text || Undefined, /^Mozilla\/5\.0 \(Linux; (U; )?Android/.test(text);
    }
    /**
     * @return {?}
     */
    function restoreScript() {
      return elem;
    }
    /**
     * @param {Object} win
     * @param {?} text
     * @return {?}
     */
    function init(win, text) {
      return win = win || window, text = text || Undefined, win.postMessage && !(isConditionalComment(text) && win.opener);
    }
    /**
     * @param {(Object|boolean|number|string)} config
     * @return {?}
     */
    function initialize(config) {
      config = config || navigator;
      try {
        return!!config.plugins["Shockwave Flash"] || !!new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
      } catch (e) {
        return false;
      }
    }
    /**
     * @param {Object} win
     * @param {(Object|boolean|number|string)} time
     * @param {?} text
     * @return {?}
     */
    function execute(win, time, text) {
      return win = win || window, time = time || navigator, text = text || Undefined, "ontouchstart" in win || (/Opera Mini/.test(text) || time.msMaxTouchPoints > 0);
    }
    /**
     * @return {?}
     */
    function showBlock() {
      /** @type {(CSSStyleDeclaration|null)} */
      var bodyStyle = document.body.style;
      return void 0 !== bodyStyle.transition || (void 0 !== bodyStyle.webkitTransition || (void 0 !== bodyStyle.mozTransition || (void 0 !== bodyStyle.oTransition || void 0 !== bodyStyle.msTransition)));
    }
    var getActual = require("util/domready");
    var Block = require("util/typevalidator");
    var utils = require("util/logger");
    var lang = require("tfw/util/globals");
    /** @type {string} */
    var Undefined = window.navigator.userAgent;
    /** @type {boolean} */
    var elem = false;
    /** @type {boolean} */
    var v = false;
    /** @type {string} */
    var id = "twitter-csp-test";
    window.twttr = window.twttr || {};
    /**
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    twttr.verifyCSP = function(dataAndEvents) {
      /** @type {(HTMLElement|null)} */
      var obj = document.getElementById(id);
      /** @type {boolean} */
      v = true;
      /** @type {boolean} */
      elem = !!dataAndEvents;
      if (obj) {
        obj.parentNode.removeChild(obj);
      }
    };
    getActual(function() {
      var script;
      return Block.asBoolean(lang.val("widgets:csp")) ? elem = true : (script = document.createElement("script"), script.id = id, script.text = "twttr.verifyCSP(false);", document.body.appendChild(script), void window.setTimeout(function() {
        if (!v) {
          utils.warn('TWITTER: Content Security Policy restrictions may be applied to your site. Add <meta name="twitter:widgets:csp" content="on"> to supress this warning.');
          utils.warn("TWITTER: Please note: Not all embedded timeline and embedded Tweet functionality is supported when CSP is applied.");
        }
      }, 5E3));
    });
    $.exports = {
      /** @type {function (Object): ?} */
      retina : isHiDPI,
      /** @type {function (?): ?} */
      anyIE : isConditionalComment,
      /** @type {function (?): ?} */
      ie9 : winnow,
      /** @type {function (?): ?} */
      ios : trim,
      /** @type {function (?): ?} */
      android : template,
      /** @type {function (): ?} */
      cspEnabled : restoreScript,
      /** @type {function ((Object|boolean|number|string)): ?} */
      flashEnabled : initialize,
      /** @type {function (Object, ?): ?} */
      canPostMessage : init,
      /** @type {function (Object, (Object|boolean|number|string), ?): ?} */
      touch : execute,
      /** @type {function (): ?} */
      cssTransitions : showBlock
    };
  }, {
    "tfw/util/globals" : 24,
    "util/domready" : 38,
    "util/logger" : 44,
    "util/typevalidator" : 50
  }],
  41 : [function(matches, module) {
    var options = matches("util/util");
    var mousetrap = {
      /**
       * @param {string} type
       * @param {Function} callback
       * @return {?}
       */
      bind : function(type, callback) {
        return this._handlers = this._handlers || {}, this._handlers[type] = this._handlers[type] || [], this._handlers[type].push(callback);
      },
      /**
       * @param {string} type
       * @param {?} callback
       * @return {undefined}
       */
      unbind : function(type, callback) {
        if (this._handlers[type]) {
          if (callback) {
            var idx = this._handlers[type].indexOf(callback);
            if (idx >= 0) {
              this._handlers[type].splice(idx, 1);
            }
          } else {
            /** @type {Array} */
            this._handlers[type] = [];
          }
        }
      },
      /**
       * @param {string} type
       * @param {Object} opt_attributes
       * @return {undefined}
       */
      trigger : function(type, opt_attributes) {
        var handlers = this._handlers && this._handlers[type];
        opt_attributes = opt_attributes || {};
        /** @type {string} */
        opt_attributes.type = type;
        if (handlers) {
          handlers.forEach(function($swipe) {
            options.async($swipe.bind(this, opt_attributes));
          });
        }
      }
    };
    module.exports = {
      Emitter : mousetrap
    };
  }, {
    "util/util" : 52
  }],
  42 : [function(Constructor, module) {
    var object = Constructor("util/util");
    /**
     * @param {Object} self
     * @param {Object} events
     * @param {Object} doc
     * @return {?}
     */
    module.exports = function(self, events, doc) {
      var iframe;
      if (doc = doc || document, self = self || {}, events = events || {}, self.name) {
        try {
          iframe = doc.createElement('<iframe name="' + self.name + '"></iframe>');
        } catch (o) {
          iframe = doc.createElement("iframe");
          iframe.name = self.name;
        }
        delete self.name;
      } else {
        iframe = doc.createElement("iframe");
      }
      return self.id && (iframe.id = self.id, delete self.id), iframe.allowtransparency = "true", iframe.scrolling = "no", iframe.setAttribute("frameBorder", 0), iframe.setAttribute("allowTransparency", true), object.forIn(self, function(name, suite) {
        iframe.setAttribute(name, suite);
      }), object.forIn(events, function(name, region) {
        /** @type {string} */
        iframe.style[name] = region;
      }), iframe;
    };
  }, {
    "util/util" : 52
  }],
  43 : [function(require, module) {
    /**
     * @return {undefined}
     */
    function constructor() {
    }
    var timeoutTimer;
    var Block = require("util/promise");
    /** @type {Array} */
    var gotoStateActions = [];
    /**
     * @param {string} args
     * @param {string} event
     * @return {?}
     */
    constructor.prototype.enqueue = function(args, event) {
      return new Block(function(resolver) {
        gotoStateActions.push({
          action : args,
          resolver : resolver,
          note : event
        });
      });
    };
    /**
     * @return {undefined}
     */
    constructor.prototype.exec = function() {
      var self;
      var pathConfig = gotoStateActions;
      if (pathConfig.length) {
        /** @type {Array} */
        gotoStateActions = [];
        for (;pathConfig.length;) {
          self = pathConfig.shift();
          if (self && self.action) {
            self.resolver.fulfill(self.action());
          } else {
            self.resolver.reject();
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    constructor.prototype.delayedExec = function() {
      if (timeoutTimer) {
        window.clearTimeout(timeoutTimer);
      }
      /** @type {number} */
      timeoutTimer = window.setTimeout(this.exec, 100);
    };
    /** @type {function (): undefined} */
    module.exports = constructor;
  }, {
    "util/promise" : 46
  }],
  44 : [function(defer, res) {
    /**
     * @return {undefined}
     */
    function info() {
      log("info", deferred.toRealArray(arguments));
    }
    /**
     * @return {undefined}
     */
    function warn() {
      log("warn", deferred.toRealArray(arguments));
    }
    /**
     * @return {undefined}
     */
    function err() {
      log("error", deferred.toRealArray(arguments));
    }
    /**
     * @param {string} types
     * @return {undefined}
     */
    function start(types) {
      if (h) {
        options[types] = timestamp();
      }
    }
    /**
     * @param {string} message
     * @return {undefined}
     */
    function success(message) {
      var now;
      if (h) {
        if (options[message]) {
          now = timestamp();
          info("_twitter", message, now - options[message]);
        } else {
          err("timeEnd() called before time() for id: ", message);
        }
      }
    }
    /**
     * @return {?}
     */
    function timestamp() {
      return window.performance && +window.performance.now() || +new Date;
    }
    /**
     * @param {string} method
     * @param {Array} args
     * @return {undefined}
     */
    function log(method, args) {
      if (window[plugin] && window[plugin][method]) {
        switch(args.length) {
          case 1:
            window[plugin][method](args[0]);
            break;
          case 2:
            window[plugin][method](args[0], args[1]);
            break;
          case 3:
            window[plugin][method](args[0], args[1], args[2]);
            break;
          case 4:
            window[plugin][method](args[0], args[1], args[2], args[3]);
            break;
          case 5:
            window[plugin][method](args[0], args[1], args[2], args[3], args[4]);
            break;
          default:
            if (0 !== args.length) {
              if (window[plugin].warn) {
                window[plugin].warn("too many params passed to logger." + method);
              }
            }
          ;
        }
      }
    }
    var deferred = defer("util/util");
    /** @type {string} */
    var plugin = ["con", "sole"].join("");
    var options = {};
    /** @type {boolean} */
    var h = !!~location.href.indexOf("tw_debug=true");
    res.exports = {
      /** @type {function (): undefined} */
      info : info,
      /** @type {function (): undefined} */
      warn : warn,
      /** @type {function (): undefined} */
      error : err,
      /** @type {function (string): undefined} */
      time : start,
      /** @type {function (string): undefined} */
      timeEnd : success
    };
  }, {
    "util/util" : 52
  }],
  45 : [function(inspect, module) {
    var parse;
    var parseURL;
    var get;
    var str = inspect("util/querystring");
    /**
     * @param {string} parts
     * @return {?}
     */
    parse = function(parts) {
      var s = parts.search.substr(1);
      return str.decode(s);
    };
    /**
     * @param {(Object|string)} url
     * @return {?}
     */
    parseURL = function(url) {
      var path = url.href;
      var lastSlash = path.indexOf("#");
      var s = 0 > lastSlash ? "" : path.substring(lastSlash + 1);
      return str.decode(s);
    };
    /**
     * @param {string} url
     * @return {?}
     */
    get = function(url) {
      var prop;
      var target = {};
      var obj = parse(url);
      var source = parseURL(url);
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          target[prop] = obj[prop];
        }
      }
      for (prop in source) {
        if (source.hasOwnProperty(prop)) {
          target[prop] = source[prop];
        }
      }
      return target;
    };
    module.exports = {
      /** @type {function (string): ?} */
      combined : get,
      /** @type {function (string): ?} */
      fromQuery : parse,
      /** @type {function ((Object|string)): ?} */
      fromFragment : parseURL
    };
  }, {
    "util/querystring" : 47
  }],
  46 : [function(require, module) {
    var Y = require("util/util");
    /**
     * @param {?} object
     * @return {?}
     */
    var isPromise = function(object) {
      try {
        var length = object.then;
        if ("function" == typeof length) {
          return true;
        }
      } catch (i) {
      }
      return false;
    };
    /**
     * @param {?} reason
     * @return {undefined}
     */
    var error = function(reason) {
      Error.call(this, reason);
    };
    /** @type {Object} */
    error.prototype = Object.create(Error.prototype);
    /**
     * @return {?}
     */
    var Set = function() {
      /** @type {Array} */
      var keys = [];
      return keys.pump = function(resolvedValue) {
        Y.async(function() {
          /** @type {number} */
          var len = keys.length;
          /** @type {number} */
          var maxAllowed = 0;
          for (;len > maxAllowed;) {
            maxAllowed++;
            keys.shift()(resolvedValue);
          }
        });
      }, keys;
    };
    /**
     * @param {?} opt_scope
     * @param {?} func
     * @param {?} $templateCache
     * @param {?} yes
     * @param {?} no
     * @param {?} call
     * @return {undefined}
     */
    var Deferred = function(opt_scope, func, $templateCache, yes, no, call) {
      /** @type {boolean} */
      var l = false;
      var deferred = this;
      /**
       * @param {?} value
       * @return {undefined}
       */
      var resolve = function(value) {
        Y.async(function() {
          call("fulfilled");
          yes(value);
          func.pump(value);
        });
      };
      /**
       * @param {?} value
       * @return {undefined}
       */
      var reject = function(value) {
        Y.async(function() {
          call("rejected");
          no(value);
          $templateCache.pump(value);
        });
      };
      /**
       * @param {?} value
       * @return {?}
       */
      var fulfill = function(value) {
        return isPromise(value) ? void value.then(fulfill, reject) : void resolve(value);
      };
      /**
       * @param {Function} fn
       * @return {?}
       */
      var __bind = function(fn) {
        return function(err) {
          if (!l) {
            /** @type {boolean} */
            l = true;
            fn(err);
          }
        };
      };
      this.resolve = __bind(fulfill, "resolve");
      this.fulfill = __bind(resolve, "fulfill");
      this.reject = __bind(reject, "reject");
      /**
       * @return {undefined}
       */
      this.cancel = function() {
        deferred.reject(new Error("Cancel"));
      };
      /**
       * @return {undefined}
       */
      this.timeout = function() {
        deferred.reject(new Error("Timeout"));
      };
      call("pending");
    };
    /**
     * @param {Object} fn
     * @return {undefined}
     */
    var Promise = function(fn) {
      var resolvedValue;
      var value;
      var sorted = new Set;
      var seen = new Set;
      /** @type {string} */
      var text = "pending";
      /**
       * @param {?} key
       * @return {undefined}
       */
      this._addAcceptCallback = function(key) {
        sorted.push(key);
        if ("fulfilled" == text) {
          sorted.pump(resolvedValue);
        }
      };
      /**
       * @param {Function} computed
       * @return {undefined}
       */
      this._addRejectCallback = function(computed) {
        seen.push(computed);
        if ("rejected" == text) {
          seen.pump(value);
        }
      };
      var deferred = new Deferred(this, sorted, seen, function(translation) {
        resolvedValue = translation;
      }, function(_value) {
        value = _value;
      }, function(textAlt) {
        /** @type {string} */
        text = textAlt;
      });
      try {
        if (fn) {
          fn(deferred);
        }
      } catch (exception) {
        deferred.reject(exception);
      }
    };
    /**
     * @param {Function} arg
     * @return {?}
     */
    var isObject = function(arg) {
      return "function" == typeof arg;
    };
    /**
     * @param {Function} path
     * @param {Object} deferred
     * @param {string} method
     * @return {?}
     */
    var bind = function(path, deferred, method) {
      return isObject(path) ? function() {
        try {
          var response = path.apply(null, arguments);
          deferred.resolve(response);
        } catch (exception) {
          deferred.reject(exception);
        }
      } : deferred[method].bind(deferred);
    };
    /**
     * @param {?} key
     * @param {Function} value
     * @param {?} regex
     * @return {?}
     */
    var ok = function(key, value, regex) {
      return isObject(key) && regex._addAcceptCallback(key), isObject(value) && regex._addRejectCallback(value), regex;
    };
    Y.aug(Promise.prototype, {
      /**
       * @param {Function} resolved
       * @param {Function} error
       * @return {?}
       */
      then : function(resolved, error) {
        var r20 = this;
        return new Promise(function(d) {
          ok(bind(resolved, d, "resolve"), bind(error, d, "reject"), r20);
        });
      },
      /**
       * @param {Function} error
       * @return {?}
       */
      "catch" : function(error) {
        var r20 = this;
        return new Promise(function(d) {
          ok(null, bind(error, d, "reject"), r20);
        });
      }
    });
    /** @type {function (?): ?} */
    Promise.isThenable = isPromise;
    /**
     * @param {Object} args
     * @return {?}
     */
    var fn = function(args) {
      return Y.toRealArray(args).map(Promise.resolve);
    };
    /**
     * @return {?}
     */
    Promise.any = function() {
      var properties = fn(arguments);
      return new Promise(function($q) {
        if (properties.length) {
          /** @type {boolean} */
          var i = false;
          /**
           * @param {Array} value
           * @return {undefined}
           */
          var resolved = function(value) {
            if (!i) {
              /** @type {boolean} */
              i = true;
              $q.resolve(value);
            }
          };
          /**
           * @param {string} reason
           * @return {undefined}
           */
          var reject = function(reason) {
            if (!i) {
              /** @type {boolean} */
              i = true;
              $q.reject(reason);
            }
          };
          properties.forEach(function(promise) {
            promise.then(resolved, reject);
          });
        } else {
          $q.reject("No futures passed to Promize.any()");
        }
      });
    };
    /**
     * @return {?}
     */
    Promise.every = function() {
      var args = fn(arguments);
      return new Promise(function(resolver) {
        if (args.length) {
          /** @type {Array} */
          var data = new Array(args.length);
          /** @type {number} */
          var rv = 0;
          /**
           * @param {number} option
           * @param {?} value
           * @return {undefined}
           */
          var list = function(option, value) {
            rv++;
            data[option] = value;
            if (rv == args.length) {
              resolver.resolve(data);
            }
          };
          args.forEach(function(thenable, sqlt) {
            thenable.then(list.bind(null, sqlt), resolver.reject);
          });
        } else {
          resolver.reject("No futures passed to Promize.every()");
        }
      });
    };
    /**
     * @return {?}
     */
    Promise.some = function() {
      var segments = fn(arguments);
      return new Promise(function(deferred) {
        if (segments.length) {
          /** @type {number} */
          var pos = 0;
          /**
           * @return {undefined}
           */
          var reject = function() {
            pos++;
            if (pos == segments.length) {
              deferred.reject();
            }
          };
          segments.forEach(function(promise) {
            promise.then(deferred.resolve, reject);
          });
        } else {
          deferred.reject("No futures passed to Promize.some()");
        }
      });
    };
    /**
     * @param {Object} value
     * @return {?}
     */
    Promise.fulfill = function(value) {
      return new Promise(function(result) {
        result.fulfill(value);
      });
    };
    /**
     * @param {Array} value
     * @return {?}
     */
    Promise.resolve = function(value) {
      return new Promise(function(dfd) {
        dfd.resolve(value);
      });
    };
    /**
     * @param {string} reason
     * @return {?}
     */
    Promise.reject = function(reason) {
      return new Promise(function($q) {
        $q.reject(reason);
      });
    };
    /** @type {function (Object): undefined} */
    module.exports = Promise;
  }, {
    "util/util" : 52
  }],
  47 : [function(format, u) {
    /**
     * @param {?} x
     * @return {?}
     */
    function makePath(x) {
      return encodeURIComponent(x).replace(/\+/g, "%2B").replace(/'/g, "%27");
    }
    /**
     * @param {?} expression
     * @return {?}
     */
    function expr(expression) {
      return decodeURIComponent(expression);
    }
    /**
     * @param {Object} o
     * @return {?}
     */
    function encode(o) {
      /** @type {Array} */
      var bProperties = [];
      return f.forIn(o, function(callback, path) {
        var cb = makePath(callback);
        if (!f.isType("array", path)) {
          /** @type {Array} */
          path = [path];
        }
        path.forEach(function(func) {
          if (void 0 !== func) {
            bProperties.push(cb + "=" + makePath(func));
          }
        });
      }), bProperties.sort().join("&");
    }
    /**
     * @param {Object} object
     * @return {?}
     */
    function fn(object) {
      var asserterNames;
      var arr2 = {};
      return object ? (asserterNames = object.split("&"), asserterNames.forEach(function(pair) {
        var codeSegments = pair.split("=");
        var i = expr(codeSegments[0]);
        var e = expr(codeSegments[1]);
        return 2 == codeSegments.length ? f.isType("array", arr2[i]) ? void arr2[i].push(e) : i in arr2 ? (arr2[i] = [arr2[i]], void arr2[i].push(e)) : void(arr2[i] = e) : void 0;
      }), arr2) : {};
    }
    /**
     * @param {string} expectedHashCode
     * @param {?} val
     * @return {?}
     */
    function include(expectedHashCode, val) {
      var text = encode(val);
      return text.length > 0 ? expectedHashCode.indexOf("?") >= 0 ? expectedHashCode + "&" + encode(val) : expectedHashCode + "?" + encode(val) : expectedHashCode;
    }
    /**
     * @param {string} options
     * @return {?}
     */
    function runTest(options) {
      var context = options && options.split("?");
      return 2 == context.length ? fn(context[1]) : {};
    }
    var f = format("util/util");
    u.exports = {
      /** @type {function (string, ?): ?} */
      url : include,
      /** @type {function (string): ?} */
      decodeURL : runTest,
      /** @type {function (Object): ?} */
      decode : fn,
      /** @type {function (Object): ?} */
      encode : encode,
      /** @type {function (?): ?} */
      encodePart : makePath,
      /** @type {function (?): ?} */
      decodePart : expr
    };
  }, {
    "util/util" : 52
  }],
  48 : [function(dataAndEvents, module) {
    /**
     * @param {string} name
     * @return {?}
     */
    function next(name) {
      return name in params ? params[name] : params[name] = exclude.test(name);
    }
    /**
     * @return {?}
     */
    function refresh() {
      return next(document.location.host);
    }
    /** @type {RegExp} */
    var exclude = /^[^#?]*\.(gov|mil)(:\d+)?([#?].*)?$/i;
    var params = {};
    module.exports = {
      /** @type {function (string): ?} */
      isUrlSensitive : next,
      /** @type {function (): ?} */
      isHostPageSensitive : refresh
    };
  }, {}],
  49 : [function(proceed, module) {
    /**
     * @param {?} name
     * @return {?}
     */
    function load(name) {
      return "string" == typeof name && (exclude.test(name) && RegExp.$1.length <= 20);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    function parse(url) {
      return load(url) ? RegExp.$1 : void 0;
    }
    /**
     * @param {string} url
     * @param {boolean} username
     * @return {?}
     */
    function init(url, username) {
      var options = value.decodeURL(url);
      return username = username || false, options.screen_name = parse(url), options.screen_name ? value.url("https://twitter.com/intent/" + (username ? "follow" : "user"), options) : void 0;
    }
    /**
     * @param {string} root
     * @return {?}
     */
    function $(root) {
      return init(root, true);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    function fire(name) {
      return "string" == typeof name && rparentsprev.test(name);
    }
    /**
     * @param {?} args
     * @param {boolean} value
     * @return {?}
     */
    function repeat(args, value) {
      return value = void 0 === value ? true : value, fire(args) ? (value ? "#" : "") + RegExp.$1 : void 0;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    function parser(type) {
      return "string" == typeof type && manipulation_rcheckableType.test(type);
    }
    /**
     * @param {?} html
     * @return {?}
     */
    function fragment(html) {
      return parser(html) && RegExp.$1;
    }
    /**
     * @param {string} value
     * @return {?}
     */
    function contains(value) {
      return rchecked.test(value);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    function hidden(data) {
      return rbrace.test(data);
    }
    var value = proceed("util/querystring");
    /** @type {RegExp} */
    var exclude = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?(?:\/intent\/(?:follow|user)\/?\?screen_name=|(?:\/#!)?\/))@?([\w]+)(?:\?|&|$)/i;
    /** @type {RegExp} */
    var manipulation_rcheckableType = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i;
    /** @type {RegExp} */
    var rchecked = /^http(s?):\/\/(\w+\.)*twitter\.com([\:\/]|$)/i;
    /** @type {RegExp} */
    var rbrace = /^http(s?):\/\/pbs\.twimg\.com\//;
    /** @type {RegExp} */
    var rparentsprev = /^#?([^.,<>!\s\/#\-\(\)\'\"]+)$/;
    module.exports = {
      /** @type {function (?): ?} */
      isHashTag : fire,
      /** @type {function (?, boolean): ?} */
      hashTag : repeat,
      /** @type {function (?): ?} */
      isScreenName : load,
      /** @type {function (?): ?} */
      screenName : parse,
      /** @type {function (?): ?} */
      isStatus : parser,
      /** @type {function (?): ?} */
      status : fragment,
      /** @type {function (string, boolean): ?} */
      intentForProfileURL : init,
      /** @type {function (string): ?} */
      intentForFollowURL : $,
      /** @type {function (string): ?} */
      isTwitterURL : contains,
      /** @type {function (?): ?} */
      isTwimgURL : hidden,
      regexen : {
        profile : exclude
      }
    };
  }, {
    "util/querystring" : 47
  }],
  50 : [function($sanitize, module) {
    /**
     * @param {Object} ch
     * @return {?}
     */
    function log(ch) {
      return void 0 !== ch && (null !== ch && "" !== ch);
    }
    /**
     * @param {Object} num
     * @return {?}
     */
    function isInt(num) {
      return isNumber(num) && num % 1 === 0;
    }
    /**
     * @param {Object} val
     * @return {?}
     */
    function isObject(val) {
      return isNumber(val) && !isInt(val);
    }
    /**
     * @param {Object} str
     * @return {?}
     */
    function isNumber(str) {
      return log(str) && !isNaN(str);
    }
    /**
     * @param {Object} data
     * @return {?}
     */
    function _processData(data) {
      return log(data) && "array" == $$.toType(data);
    }
    /**
     * @param {Object} str
     * @return {?}
     */
    function show(str) {
      if (!log(str)) {
        return false;
      }
      switch(str) {
        case "on":
        ;
        case "ON":
        ;
        case "true":
        ;
        case "TRUE":
          return true;
        case "off":
        ;
        case "OFF":
        ;
        case "false":
        ;
        case "FALSE":
          return false;
        default:
          return!!str;
      }
    }
    /**
     * @param {Object} selector
     * @return {?}
     */
    function add(selector) {
      return isNumber(selector) ? selector : void 0;
    }
    /**
     * @param {Object} object
     * @return {?}
     */
    function seal(object) {
      return isObject(object) ? object : void 0;
    }
    /**
     * @param {Object} number
     * @return {?}
     */
    function toString(number) {
      return isInt(number) ? number : void 0;
    }
    var $$ = $sanitize("util/util");
    module.exports = {
      /** @type {function (Object): ?} */
      hasValue : log,
      /** @type {function (Object): ?} */
      isInt : isInt,
      /** @type {function (Object): ?} */
      isFloat : isObject,
      /** @type {function (Object): ?} */
      isNumber : isNumber,
      /** @type {function (Object): ?} */
      isArray : _processData,
      /** @type {function (Object): ?} */
      asInt : toString,
      /** @type {function (Object): ?} */
      asFloat : seal,
      /** @type {function (Object): ?} */
      asNumber : add,
      /** @type {function (Object): ?} */
      asBoolean : show
    };
  }, {
    "util/util" : 52
  }],
  51 : [function(XRegExp, module) {
    /**
     * @param {string} url
     * @param {Object} options
     * @return {?}
     */
    function expand(url, options) {
      var querystring;
      var route;
      return options = options || location, /^https?:\/\//.test(url) ? url : /^\/\//.test(url) ? options.protocol + url : (querystring = options.host + (options.port.length ? ":" + options.port : ""), 0 !== url.indexOf("/") && (route = options.pathname.split("/"), route.pop(), route.push(url), url = "/" + route.join("/")), [options.protocol, "//", querystring, url].join(""));
    }
    /**
     * @return {?}
     */
    function addLink() {
      var elem;
      /** @type {NodeList} */
      var elems = document.getElementsByTagName("link");
      /** @type {number} */
      var i = 0;
      for (;elem = elems[i];i++) {
        if ("canonical" == elem.rel) {
          return expand(elem.href);
        }
      }
    }
    /**
     * @return {?}
     */
    function filter() {
      var elems;
      var elem;
      var event;
      /** @type {NodeList} */
      var ap = document.getElementsByTagName("a");
      /** @type {NodeList} */
      var links = document.getElementsByTagName("link");
      /** @type {Array} */
      var pollQueue = [ap, links];
      /** @type {number} */
      var screenEvent = 0;
      /** @type {number} */
      var i = 0;
      /** @type {RegExp} */
      var rinputs = /\bme\b/;
      for (;elems = pollQueue[screenEvent];screenEvent++) {
        /** @type {number} */
        i = 0;
        for (;elem = elems[i];i++) {
          if (rinputs.test(elem.rel) && (event = regex.screenName(elem.href))) {
            return event;
          }
        }
      }
    }
    var regex = XRegExp("util/twitter");
    module.exports = {
      /** @type {function (string, Object): ?} */
      absolutize : expand,
      /** @type {function (): ?} */
      getCanonicalURL : addLink,
      /** @type {function (): ?} */
      getScreenNameFromPage : filter
    };
  }, {
    "util/twitter" : 49
  }],
  52 : [function(dataAndEvents, $) {
    /**
     * @param {?} opt_attributes
     * @return {?}
     */
    function insert(opt_attributes) {
      return toArray(arguments).forEach(function(elems) {
        each(elems, function(i, offsetPosition) {
          opt_attributes[i] = offsetPosition;
        });
      }), opt_attributes;
    }
    /**
     * @param {Object} replacementHash
     * @return {?}
     */
    function applyReplacement(replacementHash) {
      return each(replacementHash, function(timeoutKey, value) {
        if (isObject(value)) {
          applyReplacement(value);
          if (isEmptyObject(value)) {
            delete replacementHash[timeoutKey];
          }
        }
        if (void 0 === value || (null === value || "" === value)) {
          delete replacementHash[timeoutKey];
        }
      }), replacementHash;
    }
    /**
     * @param {Object} object
     * @param {Function} fn
     * @return {?}
     */
    function each(object, fn) {
      var property;
      for (property in object) {
        if (!object.hasOwnProperty || object.hasOwnProperty(property)) {
          fn(property, object[property]);
        }
      }
      return object;
    }
    /**
     * @param {Object} obj
     * @return {?}
     */
    function typeOf(obj) {
      return{}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }
    /**
     * @param {string} type
     * @param {?} xs
     * @return {?}
     */
    function isType(type, xs) {
      return type == typeOf(xs);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function isObject(obj) {
      return obj === Object(obj);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function isEmptyObject(obj) {
      if (!isObject(obj)) {
        return false;
      }
      if (Object.keys) {
        return!Object.keys(obj).length;
      }
      var member;
      for (member in obj) {
        if (obj.hasOwnProperty(member)) {
          return false;
        }
      }
      return true;
    }
    /**
     * @param {Function} fn
     * @param {string} opt_scope
     * @return {undefined}
     */
    function listen(fn, opt_scope) {
      window.setTimeout(function() {
        fn.call(opt_scope || null);
      }, 0);
    }
    /**
     * @param {Object} obj
     * @return {?}
     */
    function toArray(obj) {
      return Array.prototype.slice.call(obj);
    }
    /**
     * @param {string} name
     * @param {?} separator
     * @return {?}
     */
    function contains(name, separator) {
      return name && name.indexOf ? name.indexOf(separator) > -1 : false;
    }
    $.exports = {
      /** @type {function (?): ?} */
      aug : insert,
      /** @type {function (Function, string): undefined} */
      async : listen,
      /** @type {function (Object): ?} */
      compact : applyReplacement,
      /** @type {function (string, ?): ?} */
      contains : contains,
      /** @type {function (Object, Function): ?} */
      forIn : each,
      /** @type {function (?): ?} */
      isObject : isObject,
      /** @type {function (?): ?} */
      isEmptyObject : isEmptyObject,
      /** @type {function (Object): ?} */
      toType : typeOf,
      /** @type {function (string, ?): ?} */
      isType : isType,
      /** @type {function (Object): ?} */
      toRealArray : toArray
    };
  }, {}],
  53 : [function(require, module) {
    /**
     * @return {?}
     */
    function freeze() {
      if (object) {
        return object;
      }
      if (Block.isDynamicWidget()) {
        var val;
        /** @type {number} */
        var key = 0;
        var cnl = parent.frames.length;
        try {
          if (object = parent.frames[index]) {
            return object;
          }
        } catch (n) {
        }
        if (nodes.anyIE()) {
          for (;cnl > key;key++) {
            try {
              if (val = parent.frames[key], val && "function" == typeof val.openIntent) {
                return object = val;
              }
            } catch (n) {
            }
          }
        }
      }
    }
    /**
     * @return {?}
     */
    function ajax() {
      var callback;
      var timeout;
      var xmlHttp;
      var onComplete;
      var ind;
      var model;
      var options = {};
      if ("function" === (typeof arguments[0]).toLowerCase() ? options.success = arguments[0] : options = arguments[0], callback = options.success || function() {
      }, timeout = options.timeout || function() {
      }, xmlHttp = options.nohub || function() {
      }, onComplete = options.complete || function() {
      }, ind = void 0 !== options.attempt ? options.attempt : i, !Block.isDynamicWidget() || o) {
        return xmlHttp(), onComplete(), false;
      }
      model = freeze();
      ind--;
      try {
        if (model && model.trigger) {
          return callback(model), void onComplete();
        }
      } catch (m) {
      }
      return 0 >= ind ? (o = true, timeout(), void onComplete()) : +new Date - c > t * i ? (o = true, void xmlHttp()) : void window.setTimeout(function() {
        ajax({
          success : callback,
          timeout : timeout,
          nohub : xmlHttp,
          attempt : ind,
          complete : onComplete
        });
      }, t);
    }
    var object;
    var o;
    var Block = require("tfw/util/env");
    var nodes = require("util/env");
    /** @type {string} */
    var tag = "twttrHubFrameSecure";
    /** @type {string} */
    var index = "http:" == document.location.protocol ? "twttrHubFrame" : tag;
    /** @type {number} */
    var c = +new Date;
    /** @type {number} */
    var t = 100;
    /** @type {number} */
    var i = 20;
    module.exports = {
      /** @type {function (): ?} */
      withHub : ajax,
      contextualHubId : index,
      secureHubId : tag
    };
  }, {
    "tfw/util/env" : 23,
    "util/env" : 40
  }],
  54 : [function(require, module) {
    /**
     * @param {Object} element
     * @param {string} data
     * @return {?}
     */
    function getData(element, data) {
      return element && element.getAttribute ? element.getAttribute("data-" + data) : void 0;
    }
    /**
     * @param {Object} message
     * @param {Error} callback
     * @return {?}
     */
    function callback(message, callback) {
      return{
        element : message.element || spec,
        action : message.action || action,
        page : requestAnimFrame(callback) ? "video" : void 0
      };
    }
    /**
     * @param {Object} fn
     * @return {?}
     */
    function requestAnimFrame(fn) {
      return jQuery.ancestor(".embedded-video", fn);
    }
    /**
     * @param {Object} callback
     * @return {?}
     */
    function loop(callback) {
      return JSON.parse(getData(requestAnimFrame(callback), "player-config"));
    }
    /**
     * @param {?} e
     * @param {Object} callback
     * @return {?}
     */
    function refresh(e, callback) {
      var toolbar;
      var activeClassName;
      var request;
      var id = requestAnimFrame(callback);
      return id ? toolbar = t.aug({
        item_type : item_type,
        id : getData(id, "tweet-id"),
        card_name : getData(id, "card-name"),
        publisher_id : getData(id, "publisher-id"),
        content_id : getData(id, "video-content-id")
      }, e.itemData || {}) : (activeClassName = jQuery.ancestor(".cards-multimedia", callback), request = jQuery.ancestor(".tweet", callback), toolbar = t.aug({
        item_type : item_type,
        id : getData(request, "tweet-id"),
        card_name : getData(activeClassName, "card-name"),
        publisher_id : getData(activeClassName, "publisher-id"),
        content_id : getData(activeClassName, "video-content-id")
      }, e.itemData || {})), {
        items : [toolbar]
      };
    }
    /**
     * @param {Object} listener
     * @return {undefined}
     */
    function Server(listener) {
      var d = this;
      /** @type {Object} */
      this.global = listener;
      this.server = (new Pack).attachListener(new Cucumber.Listener(listener)).bind("scribe", function(walkers) {
        d.scribe(walkers, this);
      }).bind("requestPlayerConfig", function() {
        return d.requestPlayerConfig(this);
      }).bind("intent", function(v) {
        return d.intent(v, this);
      });
    }
    var t = require("util/util");
    var jQuery = require("dom/get");
    var nodes = require("scribe/pixel");
    var Pack = require("rpc/jsonrpc_server");
    var Cucumber = require("rpc/postmessage");
    var path = require("tfw/widget/intent");
    /** @type {number} */
    var item_type = 0;
    /** @type {string} */
    var spec = "amplify_player";
    /** @type {string} */
    var action = "undefined";
    /**
     * @param {?} opt_context
     * @return {?}
     */
    Server.prototype.findIframeByWindow = function(opt_context) {
      var frame = this.global.document.getElementsByTagName("iframe");
      var l = frame.length;
      /** @type {number} */
      var i = 0;
      for (;l > i;i++) {
        if (frame[i].contentWindow == opt_context) {
          return frame[i];
        }
      }
    };
    /**
     * @param {Object} event
     * @param {?} opt_context
     * @return {undefined}
     */
    Server.prototype.intent = function(event, opt_context) {
      var filename = this.findIframeByWindow(opt_context);
      var type = event && event.url;
      if (type) {
        if (filename) {
          path.open(type, filename);
        }
      }
    };
    /**
     * @param {?} opt_context
     * @return {?}
     */
    Server.prototype.requestPlayerConfig = function(opt_context) {
      var restoreScript = this.findIframeByWindow(opt_context);
      if (restoreScript) {
        return loop(restoreScript);
      }
    };
    /**
     * @param {(Node|string)} obj
     * @param {?} opt_context
     * @return {undefined}
     */
    Server.prototype.scribe = function(obj, opt_context) {
      var data;
      var scripts;
      var value;
      var pdataCur;
      data = obj && obj.customScribe;
      scripts = this.findIframeByWindow(opt_context);
      if (data) {
        if (scripts) {
          value = callback(data, scripts);
          pdataCur = refresh(data, scripts);
          nodes.clientEvent2(value, pdataCur, true);
        }
      }
    };
    /** @type {function (Object): undefined} */
    module.exports = Server;
  }, {
    "dom/get" : 5,
    "rpc/jsonrpc_server" : 9,
    "rpc/postmessage" : 10,
    "scribe/pixel" : 16,
    "tfw/widget/intent" : 30,
    "util/util" : 52
  }],
  55 : [function(require, module) {
    /**
     * @return {undefined}
     */
    function Connection() {
    }
    var Emitter = require("util/util");
    var Particles = require("util/events");
    Emitter.aug(Connection.prototype, Particles.Emitter, {
      transportMethod : "",
      /**
       * @return {undefined}
       */
      init : function() {
      },
      /**
       * @param {string} serviceName
       * @return {undefined}
       */
      send : function(serviceName) {
        var restoreScript;
        if (this._ready) {
          this._performSend(serviceName);
        } else {
          restoreScript = this.bind("ready", function() {
            this.unbind("ready", restoreScript);
            this._performSend(serviceName);
          });
        }
      },
      /**
       * @return {undefined}
       */
      ready : function() {
        this.trigger("ready", this);
        /** @type {boolean} */
        this._ready = true;
      },
      /**
       * @return {?}
       */
      isReady : function() {
        return!!this._ready;
      },
      /**
       * @param {Object} attributes
       * @return {undefined}
       */
      receive : function(attributes) {
        this.trigger("message", attributes);
      }
    });
    module.exports = {
      /** @type {function (): undefined} */
      Connection : Connection
    };
  }, {
    "util/events" : 41,
    "util/util" : 52
  }],
  56 : [function(dataAndEvents, module) {
    /**
     * @param {string} dt
     * @param {number} ctx
     * @return {?}
     */
    function tick(dt, ctx) {
      var context = ctx || Math.floor(100 * Math.random());
      /** @type {string} */
      var changed = ['<object id="xdflashshim' + context + '" name="xdflashshim' + context + '"', 'type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"', 'width="1" height="1" style="position:absolute;left:-9999px;top:-9999px;">', '<param name="movie" value="' + dt + "&debug=" + window.__XDDEBUG__ + '">', '<param name="wmode" value="window">', '<param name="allowscriptaccess" value="always">', "</object>"].join(" ");
      return changed;
    }
    module.exports = {
      /** @type {function (string, number): ?} */
      object : tick
    };
  }, {}],
  57 : [function(require, module) {
    /**
     * @param {Object} str
     * @return {?}
     */
    function request(str) {
      return(JSON.parse || JSON.decode)(str);
    }
    /**
     * @param {Object} d
     * @return {undefined}
     */
    function b(d) {
      /** @type {Object} */
      this.con = d;
    }
    /**
     * @return {undefined}
     */
    function filter() {
      /** @type {number} */
      this.id = filter.id++;
    }
    var $ = require("util/util");
    var evt = require("util/events");
    $.aug(b.prototype, {
      /**
       * @param {Object} handler
       * @return {undefined}
       */
      expose : function(handler) {
        this.con.bind("message", this._handleRequest(handler));
      },
      /**
       * @param {Object} callback
       * @return {?}
       */
      call : function(callback) {
        var req;
        var self = this;
        return this._requests || (this._requests = {}, this.con.bind("message", function(attributes) {
          var output;
          try {
            attributes = request(attributes);
          } catch (r) {
            return;
          }
          if (attributes.callback) {
            if ("number" == typeof attributes.id) {
              if (output = self._requests[attributes.id]) {
                if (attributes.error) {
                  output.trigger("error", attributes);
                } else {
                  output.trigger("success", attributes);
                }
                delete self._requests[attributes.id];
              }
            }
          }
        })), req = new filter, this._requests[req.id] = req, req.send(this.con, callback, Array.prototype.slice.call(arguments, 1));
      },
      /**
       * @param {Object} handler
       * @return {?}
       */
      _handleRequest : function(handler) {
        var url = this;
        return function(req) {
          var pos;
          var otherArgs;
          try {
            req = request(req);
          } catch (s) {
            return;
          }
          if (!req.callback) {
            if ("number" == typeof req.id) {
              if ("function" == typeof handler[req.method]) {
                otherArgs = url._responseCallbacks(req.id);
                pos = handler[req.method].apply(handler, req.params.concat(otherArgs));
                if ("undefined" != typeof pos) {
                  otherArgs[0](pos);
                }
              }
            }
          }
        };
      },
      /**
       * @param {number} term
       * @return {?}
       */
      _responseCallbacks : function(term) {
        var res = this.con;
        return[function(a) {
          res.send(JSON.stringify({
            id : term,
            result : a,
            callback : true
          }));
        }, function onFailure(callback) {
          res.send(JSON.stringify({
            id : term,
            /** @type {function (Function): undefined} */
            error : onFailure,
            /** @type {Function} */
            callback : callback
          }));
        }];
      }
    });
    /** @type {number} */
    filter.id = 0;
    $.aug(filter.prototype, evt.Emitter, {
      /**
       * @param {string} service
       * @param {string} callback
       * @param {Array} evt
       * @return {?}
       */
      send : function(service, callback, evt) {
        return service.send(JSON.stringify({
          id : this.id,
          method : callback,
          params : evt
        })), this;
      },
      /**
       * @param {?} callback
       * @return {?}
       */
      success : function(callback) {
        return this.bind("success", callback), this;
      },
      /**
       * @param {Function} callback
       * @return {?}
       */
      error : function(callback) {
        return this.bind("error", callback), this;
      }
    });
    /**
     * @param {string} program
     * @return {?}
     */
    module.exports = function(program) {
      return new b(program);
    };
  }, {
    "util/events" : 41,
    "util/util" : 52
  }],
  58 : [function(require, module) {
    /**
     * @param {Object} obj
     * @return {?}
     */
    function open(obj) {
      /** @type {Array} */
      var string = [];
      return $.forIn(obj, function(specArea, json) {
        string.push(specArea + "=" + json);
      }), string.join(",");
    }
    /**
     * @return {undefined}
     */
    function f() {
    }
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function ctor(options) {
      /** @type {string} */
      this.transportMethod = "PostMessage";
      /** @type {Object} */
      this.options = options;
      this._createChild();
    }
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function next(options) {
      /** @type {string} */
      this.transportMethod = "Flash";
      /** @type {Object} */
      this.options = options;
      /** @type {string} */
      this.token = Math.random().toString(16).substring(2);
      this._setup();
    }
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function handler(options) {
      /** @type {string} */
      this.transportMethod = "Fallback";
      /** @type {Object} */
      this.options = options;
      this._createChild();
    }
    var node;
    var mysql = require("xd/base");
    var $ = require("util/util");
    var config = require("util/env");
    /** @type {string} */
    var id = "__ready__";
    /** @type {number} */
    var _xd_ = 0;
    f.prototype = new mysql.Connection;
    $.aug(f.prototype, {
      /**
       * @return {undefined}
       */
      _createChild : function() {
        if (this.options.window) {
          this._createWindow();
        } else {
          this._createIframe();
        }
      },
      /**
       * @return {undefined}
       */
      _createIframe : function() {
        /**
         * @return {undefined}
         */
        function onload() {
          self.child = iframe.contentWindow;
          if (!self._ready) {
            self.init();
          }
        }
        var iframe;
        var el;
        var text;
        var state;
        var self = this;
        var result = {
          allowTransparency : true,
          frameBorder : "0",
          scrolling : "no",
          tabIndex : "0",
          name : this._name()
        };
        var settings = $.aug($.aug({}, result), this.options.iframe);
        if (window.postMessage) {
          if (!node) {
            /** @type {Element} */
            node = document.createElement("iframe");
          }
          /** @type {Element} */
          iframe = node.cloneNode(false);
        } else {
          /** @type {Element} */
          iframe = document.createElement('<iframe name="' + settings.name + '">');
        }
        iframe.id = settings.name;
        $.forIn(settings, function(name, suite) {
          if ("style" != name) {
            iframe.setAttribute(name, suite);
          }
        });
        state = iframe.getAttribute("style");
        if (state && "undefined" != typeof state.cssText) {
          state.cssText = settings.style;
        } else {
          iframe.style.cssText = settings.style;
        }
        iframe.addEventListener("load", onload, false);
        iframe.src = this._source();
        if (el = this.options.appendTo) {
          el.appendChild(iframe);
        } else {
          if (text = this.options.replace) {
            el = text.parentNode;
            if (el) {
              el.replaceChild(iframe, text);
            }
          } else {
            document.body.insertBefore(iframe, document.body.firstChild);
          }
        }
      },
      /**
       * @return {undefined}
       */
      _createWindow : function() {
        var child;
        var options = {
          width : 550,
          height : 450,
          personalbar : "0",
          toolbar : "0",
          scrollbars : "1",
          resizable : "1"
        };
        var obj = $.aug($.aug({}, options), this.options.window);
        var winWidth = screen.width;
        var height = screen.height;
        var name = this._name();
        obj.left = obj.left || Math.round(winWidth / 2 - obj.width / 2);
        obj.top = obj.top || Math.round(height / 2 - obj.height / 2);
        if (height < obj.height) {
          /** @type {number} */
          obj.top = 0;
          obj.height = height;
        }
        /** @type {(Window|null)} */
        child = window.open(this._source(), name, open(obj));
        if (child) {
          child.focus();
        }
        /** @type {(Window|null)} */
        this.child = child;
        this.init();
      },
      /**
       * @return {?}
       */
      _source : function() {
        return this.options.src;
      },
      /**
       * @return {?}
       */
      _name : function() {
        /** @type {string} */
        var suffix = "_xd_" + _xd_++;
        return window.parent && (window.parent != window && (window.name && (suffix = window.name + suffix))), suffix;
      }
    });
    ctor.prototype = new f;
    $.aug(ctor.prototype, {
      /**
       * @return {undefined}
       */
      init : function() {
        /**
         * @param {Object} e
         * @return {undefined}
         */
        function completed(e) {
          if (e.source === self.child) {
            if (self._ready || e.data !== id) {
              self.receive(e.data);
            } else {
              self.ready();
            }
          }
        }
        var self = this;
        window.addEventListener("message", completed, false);
      },
      /**
       * @param {string} name
       * @return {undefined}
       */
      _performSend : function(name) {
        this.child.postMessage(name, this.options.src);
      }
    });
    next.prototype = new f;
    $.aug(next.prototype, {
      /**
       * @return {undefined}
       */
      _setup : function() {
        var self = this;
        var util = require("xd/flash");
        window["__xdcb" + self.token] = {
          /**
           * @param {Object} name
           * @return {undefined}
           */
          receive : function(name) {
            if (self._ready || name !== id) {
              self.receive(name);
            } else {
              self.ready();
            }
          },
          /**
           * @return {undefined}
           */
          loaded : function() {
          }
        };
        /** @type {Element} */
        var newNode = document.createElement("div");
        newNode.innerHTML = util.object("https://platform.twitter.com/xd/ft.swf?&token=" + self.token + "&parent=true&callback=__xdcb" + self.token + "&xdomain=" + self._host(), self.token);
        document.body.insertBefore(newNode, document.body.firstChild);
        /** @type {(Node|null)} */
        self.proxy = newNode.firstChild;
        self._createChild();
      },
      /**
       * @return {undefined}
       */
      init : function() {
      },
      /**
       * @param {string} serviceName
       * @return {undefined}
       */
      _performSend : function(serviceName) {
        this.proxy.send(serviceName);
      },
      /**
       * @return {?}
       */
      _host : function() {
        return this.options.src.replace(/https?:\/\//, "").split(/(:|\/)/)[0];
      },
      /**
       * @return {?}
       */
      _source : function() {
        return this.options.src + (this.options.src.match(/\?/) ? "&" : "?") + "xd_token=" + window.escape(this.token);
      }
    });
    handler.prototype = new f;
    $.aug(handler.prototype, {
      /**
       * @return {undefined}
       */
      init : function() {
      },
      /**
       * @return {undefined}
       */
      _performSend : function() {
      }
    });
    module.exports = {
      /**
       * @param {?} params
       * @return {?}
       */
      connect : function(params) {
        return!config.canPostMessage() || config.anyIE() && params.window ? config.anyIE() && config.flashEnabled() ? new next(params) : new handler(params) : new ctor(params);
      }
    };
  }, {
    "util/env" : 40,
    "util/util" : 52,
    "xd/base" : 55,
    "xd/flash" : 56
  }]
}, {}, [1]);
