(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("createSharedState", ["exports", "react"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.createSharedState = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _react) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = createSharedState;
  _react = _interopRequireDefault(_react);
  function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
  function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  function resolveValue(value, prevValue) {
    return typeof value === 'function' ? value(prevValue) : value;
  }
  function createSharedState(initialValue) {
    var stateRef = {
      value: resolveValue(initialValue),
      subscribers: new Set()
    };
    var sharedState = {
      use: function use() {
        var value = stateRef.value,
          subscribers = stateRef.subscribers;
        var _React$useState = _react["default"].useState(value),
          _React$useState2 = _slicedToArray(_React$useState, 2),
          stateValue = _React$useState2[0],
          setStateValue = _React$useState2[1];
        _react["default"].useEffect(function () {
          subscribers.add(setStateValue);
          return function () {
            subscribers["delete"](setStateValue);
          };
        }, []);
        var updateState = function updateState(newValue) {
          stateRef.value = resolveValue(newValue, stateRef.value);
          var _iterator = _createForOfIteratorHelper(subscribers),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var subscriber = _step.value;
              subscriber(stateRef.value);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        };
        return [stateValue, updateState];
      },
      setValue: function setValue(value) {
        stateRef.value = resolveValue(value, stateRef.value);
        var _iterator2 = _createForOfIteratorHelper(stateRef.subscribers),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var setter = _step2.value;
            setter(stateRef.value);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      },
      getValue: function getValue() {
        return stateRef.value;
      }
    };
    sharedState.useValue = function () {
      return sharedState.use()[0];
    };
    return sharedState;
  }
});

