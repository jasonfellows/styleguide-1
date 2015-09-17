'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsViewActions = require('../actions/view-actions');

var _actionsViewActions2 = _interopRequireDefault(_actionsViewActions);

var ViewStore = (function () {
  function ViewStore() {
    _classCallCheck(this, ViewStore);

    this.loading = false;
    this.bars = {
      action: {
        use: false,
        title: null,
        subtitle: null,
        description: null,
        actions: [],
        visible: false,
        scroll: {
          elem: document.body,
          enter: 500,
          exit: 250,
          height: 0,
          top: 0
        }
      }
    };

    this.bindActions(_actionsViewActions2['default']);
  }

  _createClass(ViewStore, [{
    key: 'onSetDimensions',
    value: function onSetDimensions() {
      var innerHeight = window.innerHeight;

      this.bars.action.scroll.height = innerHeight;
    }
  }, {
    key: 'onScrollWatch',
    value: function onScrollWatch(bool) {
      var _bars$action = this.bars.action;
      var use = _bars$action.use;
      var scroll = _bars$action.scroll;

      if (use) {

        if (bool) {

          scroll.elem.addEventListener('scroll', _actionsViewActions2['default'].scrolling);
          window.addEventListener('resize', _actionsViewActions2['default'].setDimensions);
          _actionsViewActions2['default'].setDimensions.defer();
          _actionsViewActions2['default'].scrolling.defer();
        } else {

          scroll.elem.removeEventListener('scroll', _actionsViewActions2['default'].scrolling);
          window.removeEventListener('resize', _actionsViewActions2['default'].setDimensions);
        }
      } else {
        scroll.elem.removeEventListener('scroll', _actionsViewActions2['default'].scrolling);
      }
    }
  }, {
    key: 'onScrolling',
    value: function onScrolling() {
      var _bars$action$scroll = this.bars.action.scroll;
      var elem = _bars$action$scroll.elem;
      var enter = _bars$action$scroll.enter;
      var exit = _bars$action$scroll.exit;
      var height = _bars$action$scroll.height;
      var scrollHeight = elem.scrollHeight;
      var scrollTop = elem.scrollTop;

      if (scrollTop > enter && !(scrollHeight - height - exit < scrollTop)) {

        _actionsViewActions2['default'].showActionBar.defer(true);
      } else {

        _actionsViewActions2['default'].showActionBar.defer(false);
      }
    }
  }, {
    key: 'onCreateActionBar',
    value: function onCreateActionBar(obj) {

      for (var key in obj) {

        if (obj.hasOwnProperty(key)) {
          this.bars.action[key] = obj[key];
          this.bars.action.use = true;
        }
      }

      _actionsViewActions2['default'].scrollWatch.defer(true);
    }
  }, {
    key: 'onShowActionBar',
    value: function onShowActionBar(bool) {
      this.bars.action.visible = bool;
    }
  }, {
    key: 'onScrollListenTo',
    value: function onScrollListenTo(elem) {
      this.bars.action.scroll.elem = elem;
    }
  }, {
    key: 'onToggleActionBar',
    value: function onToggleActionBar() {
      this.bars.action.use = !this.bars.action.use;
      _actionsViewActions2['default'].scrollWatch.defer(this.bars.action.use);
    }
  }, {
    key: 'onLoading',
    value: function onLoading(bool) {
      this.loading = bool;
    }
  }, {
    key: 'onFlush',
    value: function onFlush() {
      _alt2['default'].flush();
    }
  }, {
    key: 'onActionBarEnter',
    value: function onActionBarEnter(int) {
      this.bars.action.scroll.enter = int;
    }
  }, {
    key: 'onActionBarExit',
    value: function onActionBarExit(int) {
      this.bars.action.scroll.exit = int;
    }
  }]);

  return ViewStore;
})();

module.exports = _alt2['default'].createStore(ViewStore, 'ViewStore');