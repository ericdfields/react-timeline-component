'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./TimelineComponent.css');

var moment = require('moment');
var _ = require('lodash');

var SVG_WIDTH = 1000;
var SVG_HEIGHT = 40;
var SVG_VERTICAL_PADDING = 80;
var SVG_WORKING_WIDTH = SVG_WIDTH - SVG_VERTICAL_PADDING * 2;

function dateToLabel(date) {
  return moment(date).format('MMM DD YYYY').toUpperCase();
}

function sortDataByDates(dates) {
  return _.sortBy(dates, 'date');
}

function diffMonthsBetweenDates(firstDate, lastDate) {
  return moment(lastDate).diff(moment(firstDate), 'months');
}

function transformTranslate(x, y) {
  return 'translate(' + x + ',' + y + ')';
}

function labelGroupPos(dataArray, groupIndex) {

  var widthInterval = SVG_WORKING_WIDTH / diffMonthsBetweenDates(dataArray[0].date, dataArray[dataArray.length - 1].date);

  if (dataArray[groupIndex - 1] === undefined) {
    return -26;
  } else {
    var totalMonthsSoFar = diffMonthsBetweenDates(dataArray[0].date, dataArray[groupIndex - 1].date);
    var monthsBetweenThisDateAndLast = diffMonthsBetweenDates(dataArray[groupIndex - 1].date, dataArray[groupIndex].date);
    return (totalMonthsSoFar + monthsBetweenThisDateAndLast) * widthInterval - 26;
  }
}

var Circle = function Circle(_ref) {
  var x = _ref.x;
  var y = _ref.y;
  return _react2['default'].createElement('path', { transform: transformTranslate(x, y), d: 'M7 12c2.76 0 5-2.24 5-5S9.76 2 7 2 2 4.24 2 7s2.24 5 5 5z',
    strokeOpacity: '.492', stroke: '#2A2A2A', strokeWidth: '.5', fill: '#fff', fillRule: 'evenodd' });
};

Circle.props = {
  x: 0,
  y: 0
};

var Label = function Label(_ref2) {
  var value = _ref2.value;
  return _react2['default'].createElement(
    'text',
    { x: 0, y: 30,
      fontFamily: 'Verdana',
      fontSize: '9',
      width: '100%' },
    dateToLabel(value)
  );
};

var TimelineComponent = (function (_React$Component) {
  _inherits(TimelineComponent, _React$Component);

  function TimelineComponent(props) {
    _classCallCheck(this, TimelineComponent);

    _get(Object.getPrototypeOf(TimelineComponent.prototype), 'constructor', this).call(this, props);
    this.state = {
      showingPopover: false
    };
  }

  _createClass(TimelineComponent, [{
    key: 'showPopover',
    value: function showPopover(index) {
      this.setState({
        showingPopover: index
      });
    }
  }, {
    key: 'hidePopover',
    value: function hidePopover() {
      this.setState({
        showingPopover: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var sortedData = sortDataByDates(this.props.data);
      var sortedDataUniqByDate = _.uniq(sortedData, 'date');

      function translateX(x) {
        return 'translate(' + x + ',0)';
      }

      var monthMarkers = [];
      var monthsBetweenExtremes = diffMonthsBetweenDates(sortedData[0].date, sortedData[sortedData.length - 1].date);
      for (var i = -1; i < monthsBetweenExtremes; i++) {
        if (monthsBetweenExtremes != 0) {
          monthMarkers.push(_react2['default'].createElement('rect', { width: 1, height: 5, y: 0, fill: '#000000',
            x: SVG_WORKING_WIDTH / monthsBetweenExtremes * (i + 1),
            key: i }));
        }
      }

      return _react2['default'].createElement(
        'div',
        { style: { position: 'relative', height: '90px' } },
        _react2['default'].createElement(
          'svg',
          { width: SVG_WIDTH, height: SVG_HEIGHT },
          _react2['default'].createElement(
            'g',
            { transform: translateX(SVG_VERTICAL_PADDING) },
            _react2['default'].createElement('rect', { width: SVG_WORKING_WIDTH, height: 1 }),
            sortedDataUniqByDate.map(function (date, index) {
              return _react2['default'].createElement(
                'g',
                { transform: translateX(labelGroupPos(sortedDataUniqByDate, index)),
                  key: index,
                  onMouseOver: _this.showPopover.bind(_this, index),
                  onMouseOut: _this.hidePopover.bind(_this),
                  style: { cursor: 'pointer' } },
                _react2['default'].createElement(Circle, { x: 20, y: 4 }),
                _react2['default'].createElement(Label, { value: date.date, index: index, uniqueLabelsCount: sortedDataUniqByDate.length })
              );
            }),
            monthMarkers
          )
        ),
        _react2['default'].createElement(Popovers, { data: sortedData, showingPopover: this.state.showingPopover })
      );
    }
  }]);

  return TimelineComponent;
})(_react2['default'].Component);

exports['default'] = TimelineComponent;

var Popovers = (function (_React$Component2) {
  _inherits(Popovers, _React$Component2);

  function Popovers() {
    _classCallCheck(this, Popovers);

    _get(Object.getPrototypeOf(Popovers.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Popovers, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var data = _props.data;
      var showingPopover = _props.showingPopover;

      var style = {
        fontFamily: 'sans-serif',
        font: 'caption',
        fontWeight: 400,
        fontSize: 11,
        position: 'relative',
        left: SVG_VERTICAL_PADDING - 25 + 'px'
      };

      return _react2['default'].createElement(
        'div',
        { style: style },
        _.uniq(data, 'date').map(function (date, index) {
          return _react2['default'].createElement(Popover, {
            data: data,
            date: date,
            offset: index,
            visible: showingPopover === index,
            key: index });
        })
      );
    }
  }]);

  return Popovers;
})(_react2['default'].Component);

var Popover = (function (_React$Component3) {
  _inherits(Popover, _React$Component3);

  function Popover() {
    _classCallCheck(this, Popover);

    _get(Object.getPrototypeOf(Popover.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Popover, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var showingPopover = _props2.showingPopover;
      var offset = _props2.offset;
      var data = _props2.data;
      var date = _props2.date;

      var styles = {
        position: 'absolute',
        left: labelGroupPos(_.uniq(data, 'date'), offset) - 4 + 'px',
        border: '2px solid #979797',
        backgroundColor: 'white',
        padding: '.5em',
        borderRadius: '6px',
        width: '100px',
        minHeight: '2em',
        display: this.props.visible ? 'block' : 'none',
        zIndex: 1
      };
      return _react2['default'].createElement(
        'div',
        { className: 'timelineComponentPopover', style: styles },
        _.where(data, { date: date.date }).map(function (item, itemIndex) {
          var textStyles = {
            margin: '0 0 .5em 0'
          };
          return _react2['default'].createElement(
            'div',
            { style: textStyles, key: itemIndex },
            item.name
          );
        })
      );
    }
  }]);

  return Popover;
})(_react2['default'].Component);

module.exports = exports['default'];

