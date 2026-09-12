/**
 * ElementsPlus Admin - IframeBridge 客户端原生脚本
 */
(function (global) {
  function IframeBridgeClient(targetOrigin) {
    this.targetOrigin = targetOrigin || '*';
    this.listeners = {};
    var self = this;

    window.addEventListener('message', function (event) {
      var data = event.data;
      if (!data || typeof data !== 'object' || !data.type) return;
      var handlers = self.listeners[data.type];
      if (handlers) {
        for (var i = 0; i < handlers.length; i++) {
          handlers[i](data.payload);
        }
      }
    });
  }

  IframeBridgeClient.prototype.send = function (type, payload) {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: type,
        payload: payload,
        source: 'sub-app',
        timestamp: Date.now()
      }, this.targetOrigin);
    } else {
      console.warn('[IframeBridgeClient] 当前不在 iframe 环境中运行');
    }
  };

  IframeBridgeClient.prototype.on = function (type, callback) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
    var self = this;
    return function () {
      var list = self.listeners[type] || [];
      var idx = list.indexOf(callback);
      if (idx > -1) list.splice(idx, 1);
    };
  };

  IframeBridgeClient.prototype.showMessage = function (message, type, duration) {
    this.send('SHOW_MESSAGE', {
      message: message,
      type: type || 'info',
      duration: duration || 3000
    });
  };

  IframeBridgeClient.prototype.showNotification = function (title, message, type, duration) {
    this.send('SHOW_NOTIFICATION', {
      title: title,
      message: message,
      type: type || 'info',
      duration: duration || 4500
    });
  };

  IframeBridgeClient.prototype.setTabTitle = function (title, path) {
    this.send('SET_TAB_TITLE', { title: title, path: path });
  };

  IframeBridgeClient.prototype.navigate = function (path) {
    this.send('NAVIGATE', { path: path });
  };

  IframeBridgeClient.prototype.openTab = function (title, path, iframeUrl) {
    this.send('OPEN_TAB', { title: title, path: path, iframeUrl: iframeUrl });
  };

  IframeBridgeClient.prototype.closeCurrentTab = function (path) {
    this.send('CLOSE_CURRENT_TAB', { path: path });
  };

  IframeBridgeClient.prototype.refreshSelf = function () {
    this.send('REFRESH_CURRENT_IFRAME');
  };

  IframeBridgeClient.prototype.onThemeChange = function (callback) {
    return this.on('THEME_CHANGED', callback);
  };

  global.IframeBridgeClient = IframeBridgeClient;
  global.bridgeClient = new IframeBridgeClient();
})(typeof window !== 'undefined' ? window : this);
