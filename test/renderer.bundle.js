/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/renderer/test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/assertion-error/index.js":
/*!***********************************************!*\
  !*** ./node_modules/assertion-error/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */

function exclude () {
  var excludes = [].slice.call(arguments);

  function excludeProps (res, obj) {
    Object.keys(obj).forEach(function (key) {
      if (!~excludes.indexOf(key)) res[key] = obj[key];
    });
  }

  return function extendExclude () {
    var args = [].slice.call(arguments)
      , i = 0
      , res = {};

    for (; i < args.length; i++) {
      excludeProps(res, args[i]);
    }

    return res;
  };
};

/*!
 * Primary Exports
 */

module.exports = AssertionError;

/**
 * ### AssertionError
 *
 * An extension of the JavaScript `Error` constructor for
 * assertion and validation scenarios.
 *
 * @param {String} message
 * @param {Object} properties to include (optional)
 * @param {callee} start stack function (optional)
 */

function AssertionError (message, _props, ssf) {
  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
    , props = extend(_props || {});

  // default values
  this.message = message || 'Unspecified AssertionError';
  this.showDiff = false;

  // copy from properties
  for (var key in props) {
    this[key] = props[key];
  }

  // capture stack trace
  ssf = ssf || AssertionError;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ssf);
  } else {
    try {
      throw new Error();
    } catch(e) {
      this.stack = e.stack;
    }
  }
}

/*!
 * Inherit from Error.prototype
 */

AssertionError.prototype = Object.create(Error.prototype);

/*!
 * Statically set name
 */

AssertionError.prototype.name = 'AssertionError';

/*!
 * Ensure correct constructor
 */

AssertionError.prototype.constructor = AssertionError;

/**
 * Allow errors to be converted to JSON for static transfer.
 *
 * @param {Boolean} include stack (default: `true`)
 * @return {Object} object that can be `JSON.stringify`
 */

AssertionError.prototype.toJSON = function (stack) {
  var extend = exclude('constructor', 'toJSON', 'stack')
    , props = extend({ name: this.name }, this);

  // include stack if exists and not turned off
  if (false !== stack && this.stack) {
    props.stack = this.stack;
  }

  return props;
};


/***/ }),

/***/ "./node_modules/chai/index.js":
/*!************************************!*\
  !*** ./node_modules/chai/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/chai */ "./node_modules/chai/lib/chai.js");


/***/ }),

/***/ "./node_modules/chai/lib/chai.js":
/*!***************************************!*\
  !*** ./node_modules/chai/lib/chai.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var used = [];

/*!
 * Chai version
 */

exports.version = '4.2.0';

/*!
 * Assertion Error
 */

exports.AssertionError = __webpack_require__(/*! assertion-error */ "./node_modules/assertion-error/index.js");

/*!
 * Utils for plugins (not exported)
 */

var util = __webpack_require__(/*! ./chai/utils */ "./node_modules/chai/lib/chai/utils/index.js");

/**
 * # .use(function)
 *
 * Provides a way to extend the internals of Chai.
 *
 * @param {Function}
 * @returns {this} for chaining
 * @api public
 */

exports.use = function (fn) {
  if (!~used.indexOf(fn)) {
    fn(exports, util);
    used.push(fn);
  }

  return exports;
};

/*!
 * Utility Functions
 */

exports.util = util;

/*!
 * Configuration
 */

var config = __webpack_require__(/*! ./chai/config */ "./node_modules/chai/lib/chai/config.js");
exports.config = config;

/*!
 * Primary `Assertion` prototype
 */

var assertion = __webpack_require__(/*! ./chai/assertion */ "./node_modules/chai/lib/chai/assertion.js");
exports.use(assertion);

/*!
 * Core Assertions
 */

var core = __webpack_require__(/*! ./chai/core/assertions */ "./node_modules/chai/lib/chai/core/assertions.js");
exports.use(core);

/*!
 * Expect interface
 */

var expect = __webpack_require__(/*! ./chai/interface/expect */ "./node_modules/chai/lib/chai/interface/expect.js");
exports.use(expect);

/*!
 * Should interface
 */

var should = __webpack_require__(/*! ./chai/interface/should */ "./node_modules/chai/lib/chai/interface/should.js");
exports.use(should);

/*!
 * Assert interface
 */

var assert = __webpack_require__(/*! ./chai/interface/assert */ "./node_modules/chai/lib/chai/interface/assert.js");
exports.use(assert);


/***/ }),

/***/ "./node_modules/chai/lib/chai/assertion.js":
/*!*************************************************!*\
  !*** ./node_modules/chai/lib/chai/assertion.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var config = __webpack_require__(/*! ./config */ "./node_modules/chai/lib/chai/config.js");

module.exports = function (_chai, util) {
  /*!
   * Module dependencies.
   */

  var AssertionError = _chai.AssertionError
    , flag = util.flag;

  /*!
   * Module export.
   */

  _chai.Assertion = Assertion;

  /*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * `Assertion` objects contain metadata in the form of flags. Three flags can
   * be assigned during instantiation by passing arguments to this constructor:
   *
   * - `object`: This flag contains the target of the assertion. For example, in
   *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
   *   contain `numKittens` so that the `equal` assertion can reference it when
   *   needed.
   *
   * - `message`: This flag contains an optional custom error message to be
   *   prepended to the error message that's generated by the assertion when it
   *   fails.
   *
   * - `ssfi`: This flag stands for "start stack function indicator". It
   *   contains a function reference that serves as the starting point for
   *   removing frames from the stack trace of the error that's created by the
   *   assertion when it fails. The goal is to provide a cleaner stack trace to
   *   end users by removing Chai's internal functions. Note that it only works
   *   in environments that support `Error.captureStackTrace`, and only when
   *   `Chai.config.includeStack` hasn't been set to `false`.
   *
   * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
   *   should retain its current value, even as assertions are chained off of
   *   this object. This is usually set to `true` when creating a new assertion
   *   from within another assertion. It's also temporarily set to `true` before
   *   an overwritten assertion gets called by the overwriting assertion.
   *
   * @param {Mixed} obj target of the assertion
   * @param {String} msg (optional) custom error message
   * @param {Function} ssfi (optional) starting point for removing stack frames
   * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
   * @api private
   */

  function Assertion (obj, msg, ssfi, lockSsfi) {
    flag(this, 'ssfi', ssfi || Assertion);
    flag(this, 'lockSsfi', lockSsfi);
    flag(this, 'object', obj);
    flag(this, 'message', msg);

    return util.proxify(this);
  }

  Object.defineProperty(Assertion, 'includeStack', {
    get: function() {
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
      return config.includeStack;
    },
    set: function(value) {
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
      config.includeStack = value;
    }
  });

  Object.defineProperty(Assertion, 'showDiff', {
    get: function() {
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
      return config.showDiff;
    },
    set: function(value) {
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
      config.showDiff = value;
    }
  });

  Assertion.addProperty = function (name, fn) {
    util.addProperty(this.prototype, name, fn);
  };

  Assertion.addMethod = function (name, fn) {
    util.addMethod(this.prototype, name, fn);
  };

  Assertion.addChainableMethod = function (name, fn, chainingBehavior) {
    util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  Assertion.overwriteProperty = function (name, fn) {
    util.overwriteProperty(this.prototype, name, fn);
  };

  Assertion.overwriteMethod = function (name, fn) {
    util.overwriteMethod(this.prototype, name, fn);
  };

  Assertion.overwriteChainableMethod = function (name, fn, chainingBehavior) {
    util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  /**
   * ### .assert(expression, message, negateMessage, expected, actual, showDiff)
   *
   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
   *
   * @name assert
   * @param {Philosophical} expression to be tested
   * @param {String|Function} message or function that returns message to display if expression fails
   * @param {String|Function} negatedMessage or function that returns negatedMessage to display if negated expression fails
   * @param {Mixed} expected value (remember to check for negation)
   * @param {Mixed} actual (optional) will default to `this.obj`
   * @param {Boolean} showDiff (optional) when set to `true`, assert will display a diff in addition to the message if expression fails
   * @api private
   */

  Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
    var ok = util.test(this, arguments);
    if (false !== showDiff) showDiff = true;
    if (undefined === expected && undefined === _actual) showDiff = false;
    if (true !== config.showDiff) showDiff = false;

    if (!ok) {
      msg = util.getMessage(this, arguments);
      var actual = util.getActual(this, arguments);
      throw new AssertionError(msg, {
          actual: actual
        , expected: expected
        , showDiff: showDiff
      }, (config.includeStack) ? this.assert : flag(this, 'ssfi'));
    }
  };

  /*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   */

  Object.defineProperty(Assertion.prototype, '_obj',
    { get: function () {
        return flag(this, 'object');
      }
    , set: function (val) {
        flag(this, 'object', val);
      }
  });
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/config.js":
/*!**********************************************!*\
  !*** ./node_modules/chai/lib/chai/config.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {

  /**
   * ### config.includeStack
   *
   * User configurable property, influences whether stack trace
   * is included in Assertion error message. Default of false
   * suppresses stack trace in the error message.
   *
   *     chai.config.includeStack = true;  // enable stack on error
   *
   * @param {Boolean}
   * @api public
   */

  includeStack: false,

  /**
   * ### config.showDiff
   *
   * User configurable property, influences whether or not
   * the `showDiff` flag should be included in the thrown
   * AssertionErrors. `false` will always be `false`; `true`
   * will be true when the assertion has requested a diff
   * be shown.
   *
   * @param {Boolean}
   * @api public
   */

  showDiff: true,

  /**
   * ### config.truncateThreshold
   *
   * User configurable property, sets length threshold for actual and
   * expected values in assertion errors. If this threshold is exceeded, for
   * example for large data structures, the value is replaced with something
   * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
   *
   * Set it to zero if you want to disable truncating altogether.
   *
   * This is especially userful when doing assertions on arrays: having this
   * set to a reasonable large value makes the failure messages readily
   * inspectable.
   *
   *     chai.config.truncateThreshold = 0;  // disable truncating
   *
   * @param {Number}
   * @api public
   */

  truncateThreshold: 40,

  /**
   * ### config.useProxy
   *
   * User configurable property, defines if chai will use a Proxy to throw
   * an error when a non-existent property is read, which protects users
   * from typos when using property-based assertions.
   *
   * Set it to false if you want to disable this feature.
   *
   *     chai.config.useProxy = false;  // disable use of Proxy
   *
   * This feature is automatically disabled regardless of this config value
   * in environments that don't support proxies.
   *
   * @param {Boolean}
   * @api public
   */

  useProxy: true,

  /**
   * ### config.proxyExcludedKeys
   *
   * User configurable property, defines which properties should be ignored
   * instead of throwing an error if they do not exist on the assertion.
   * This is only applied if the environment Chai is running in supports proxies and
   * if the `useProxy` configuration setting is enabled.
   * By default, `then` and `inspect` will not throw an error if they do not exist on the
   * assertion object because the `.inspect` property is read by `util.inspect` (for example, when
   * using `console.log` on the assertion object) and `.then` is necessary for promise type-checking.
   *
   *     // By default these keys will not throw an error if they do not exist on the assertion object
   *     chai.config.proxyExcludedKeys = ['then', 'inspect'];
   *
   * @param {Array}
   * @api public
   */

  proxyExcludedKeys: ['then', 'catch', 'inspect', 'toJSON']
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/core/assertions.js":
/*!*******************************************************!*\
  !*** ./node_modules/chai/lib/chai/core/assertions.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, _) {
  var Assertion = chai.Assertion
    , AssertionError = chai.AssertionError
    , flag = _.flag;

  /**
   * ### Language Chains
   *
   * The following are provided as chainable getters to improve the readability
   * of your assertions.
   *
   * **Chains**
   *
   * - to
   * - be
   * - been
   * - is
   * - that
   * - which
   * - and
   * - has
   * - have
   * - with
   * - at
   * - of
   * - same
   * - but
   * - does
   * - still
   *
   * @name language chains
   * @namespace BDD
   * @api public
   */

  [ 'to', 'be', 'been', 'is'
  , 'and', 'has', 'have', 'with'
  , 'that', 'which', 'at', 'of'
  , 'same', 'but', 'does', 'still' ].forEach(function (chain) {
    Assertion.addProperty(chain);
  });

  /**
   * ### .not
   *
   * Negates all assertions that follow in the chain.
   *
   *     expect(function () {}).to.not.throw();
   *     expect({a: 1}).to.not.have.property('b');
   *     expect([1, 2]).to.be.an('array').that.does.not.include(3);
   *
   * Just because you can negate any assertion with `.not` doesn't mean you
   * should. With great power comes great responsibility. It's often best to
   * assert that the one expected output was produced, rather than asserting
   * that one of countless unexpected outputs wasn't produced. See individual
   * assertions for specific guidance.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.equal(1); // Not recommended
   *
   * @name not
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('not', function () {
    flag(this, 'negate', true);
  });

  /**
   * ### .deep
   *
   * Causes all `.equal`, `.include`, `.members`, `.keys`, and `.property`
   * assertions that follow in the chain to use deep equality instead of strict
   * (`===`) equality. See the `deep-eql` project page for info on the deep
   * equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) equals `{a: 1}`
   *     expect({a: 1}).to.deep.equal({a: 1});
   *     expect({a: 1}).to.not.equal({a: 1});
   *
   *     // Target array deeply (but not strictly) includes `{a: 1}`
   *     expect([{a: 1}]).to.deep.include({a: 1});
   *     expect([{a: 1}]).to.not.include({a: 1});
   *
   *     // Target object deeply (but not strictly) includes `x: {a: 1}`
   *     expect({x: {a: 1}}).to.deep.include({x: {a: 1}});
   *     expect({x: {a: 1}}).to.not.include({x: {a: 1}});
   *
   *     // Target array deeply (but not strictly) has member `{a: 1}`
   *     expect([{a: 1}]).to.have.deep.members([{a: 1}]);
   *     expect([{a: 1}]).to.not.have.members([{a: 1}]);
   *
   *     // Target set deeply (but not strictly) has key `{a: 1}`
   *     expect(new Set([{a: 1}])).to.have.deep.keys([{a: 1}]);
   *     expect(new Set([{a: 1}])).to.not.have.keys([{a: 1}]);
   *
   *     // Target object deeply (but not strictly) has property `x: {a: 1}`
   *     expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});
   *     expect({x: {a: 1}}).to.not.have.property('x', {a: 1});
   *
   * @name deep
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('deep', function () {
    flag(this, 'deep', true);
  });

  /**
   * ### .nested
   *
   * Enables dot- and bracket-notation in all `.property` and `.include`
   * assertions that follow in the chain.
   *
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
   *     expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 'x'}}).to.have.nested.property('\\.a.\\[b\\]');
   *     expect({'.a': {'[b]': 'x'}}).to.nested.include({'\\.a.\\[b\\]': 'x'});
   *
   * `.nested` cannot be combined with `.own`.
   *
   * @name nested
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('nested', function () {
    flag(this, 'nested', true);
  });

  /**
   * ### .own
   *
   * Causes all `.property` and `.include` assertions that follow in the chain
   * to ignore inherited properties.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.have.own.property('a');
   *     expect({a: 1}).to.have.property('b');
   *     expect({a: 1}).to.not.have.own.property('b');
   *
   *     expect({a: 1}).to.own.include({a: 1});
   *     expect({a: 1}).to.include({b: 2}).but.not.own.include({b: 2});
   *
   * `.own` cannot be combined with `.nested`.
   *
   * @name own
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('own', function () {
    flag(this, 'own', true);
  });

  /**
   * ### .ordered
   *
   * Causes all `.members` assertions that follow in the chain to require that
   * members be in the same order.
   *
   *     expect([1, 2]).to.have.ordered.members([1, 2])
   *       .but.not.have.ordered.members([2, 1]);
   *
   * When `.include` and `.ordered` are combined, the ordering begins at the
   * start of both arrays.
   *
   *     expect([1, 2, 3]).to.include.ordered.members([1, 2])
   *       .but.not.include.ordered.members([2, 3]);
   *
   * @name ordered
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('ordered', function () {
    flag(this, 'ordered', true);
  });

  /**
   * ### .any
   *
   * Causes all `.keys` assertions that follow in the chain to only require that
   * the target have at least one of the given keys. This is the opposite of
   * `.all`, which requires that the target have all of the given keys.
   *
   *     expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
   *
   * See the `.keys` doc for guidance on when to use `.any` or `.all`.
   *
   * @name any
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('any', function () {
    flag(this, 'any', true);
    flag(this, 'all', false);
  });

  /**
   * ### .all
   *
   * Causes all `.keys` assertions that follow in the chain to require that the
   * target have all of the given keys. This is the opposite of `.any`, which
   * only requires that the target have at least one of the given keys.
   *
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *
   * Note that `.all` is used by default when neither `.all` nor `.any` are
   * added earlier in the chain. However, it's often best to add `.all` anyway
   * because it improves readability.
   *
   * See the `.keys` doc for guidance on when to use `.any` or `.all`.
   *
   * @name all
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('all', function () {
    flag(this, 'all', true);
    flag(this, 'any', false);
  });

  /**
   * ### .a(type[, msg])
   *
   * Asserts that the target's type is equal to the given string `type`. Types
   * are case insensitive. See the `type-detect` project page for info on the
   * type detection algorithm: https://github.com/chaijs/type-detect.
   *
   *     expect('foo').to.be.a('string');
   *     expect({a: 1}).to.be.an('object');
   *     expect(null).to.be.a('null');
   *     expect(undefined).to.be.an('undefined');
   *     expect(new Error).to.be.an('error');
   *     expect(Promise.resolve()).to.be.a('promise');
   *     expect(new Float32Array).to.be.a('float32array');
   *     expect(Symbol()).to.be.a('symbol');
   *
   * `.a` supports objects that have a custom type set via `Symbol.toStringTag`.
   *
   *     var myObj = {
   *       [Symbol.toStringTag]: 'myCustomType'
   *     };
   *
   *     expect(myObj).to.be.a('myCustomType').but.not.an('object');
   *
   * It's often best to use `.a` to check a target's type before making more
   * assertions on the same target. That way, you avoid unexpected behavior from
   * any assertion that does different things based on the target's type.
   *
   *     expect([1, 2, 3]).to.be.an('array').that.includes(2);
   *     expect([]).to.be.an('array').that.is.empty;
   *
   * Add `.not` earlier in the chain to negate `.a`. However, it's often best to
   * assert that the target is the expected type, rather than asserting that it
   * isn't one of many unexpected types.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.an('array'); // Not recommended
   *
   * `.a` accepts an optional `msg` argument which is a custom error message to
   * show when the assertion fails. The message can also be given as the second
   * argument to `expect`.
   *
   *     expect(1).to.be.a('string', 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.a('string');
   *
   * `.a` can also be used as a language chain to improve the readability of
   * your assertions.
   *
   *     expect({b: 2}).to.have.a.property('b');
   *
   * The alias `.an` can be used interchangeably with `.a`.
   *
   * @name a
   * @alias an
   * @param {String} type
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function an (type, msg) {
    if (msg) flag(this, 'message', msg);
    type = type.toLowerCase();
    var obj = flag(this, 'object')
      , article = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(type.charAt(0)) ? 'an ' : 'a ';

    this.assert(
        type === _.type(obj).toLowerCase()
      , 'expected #{this} to be ' + article + type
      , 'expected #{this} not to be ' + article + type
    );
  }

  Assertion.addChainableMethod('an', an);
  Assertion.addChainableMethod('a', an);

  /**
   * ### .include(val[, msg])
   *
   * When the target is a string, `.include` asserts that the given string `val`
   * is a substring of the target.
   *
   *     expect('foobar').to.include('foo');
   *
   * When the target is an array, `.include` asserts that the given `val` is a
   * member of the target.
   *
   *     expect([1, 2, 3]).to.include(2);
   *
   * When the target is an object, `.include` asserts that the given object
   * `val`'s properties are a subset of the target's properties.
   *
   *     expect({a: 1, b: 2, c: 3}).to.include({a: 1, b: 2});
   *
   * When the target is a Set or WeakSet, `.include` asserts that the given `val` is a
   * member of the target. SameValueZero equality algorithm is used.
   *
   *     expect(new Set([1, 2])).to.include(2);
   *
   * When the target is a Map, `.include` asserts that the given `val` is one of
   * the values of the target. SameValueZero equality algorithm is used.
   *
   *     expect(new Map([['a', 1], ['b', 2]])).to.include(2);
   *
   * Because `.include` does different things based on the target's type, it's
   * important to check the target's type before using `.include`. See the `.a`
   * doc for info on testing a target's type.
   *
   *     expect([1, 2, 3]).to.be.an('array').that.includes(2);
   *
   * By default, strict (`===`) equality is used to compare array members and
   * object properties. Add `.deep` earlier in the chain to use deep equality
   * instead (WeakSet targets are not supported). See the `deep-eql` project
   * page for info on the deep equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target array deeply (but not strictly) includes `{a: 1}`
   *     expect([{a: 1}]).to.deep.include({a: 1});
   *     expect([{a: 1}]).to.not.include({a: 1});
   *
   *     // Target object deeply (but not strictly) includes `x: {a: 1}`
   *     expect({x: {a: 1}}).to.deep.include({x: {a: 1}});
   *     expect({x: {a: 1}}).to.not.include({x: {a: 1}});
   *
   * By default, all of the target's properties are searched when working with
   * objects. This includes properties that are inherited and/or non-enumerable.
   * Add `.own` earlier in the chain to exclude the target's inherited
   * properties from the search.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.own.include({a: 1});
   *     expect({a: 1}).to.include({b: 2}).but.not.own.include({b: 2});
   *
   * Note that a target object is always only searched for `val`'s own
   * enumerable properties.
   *
   * `.deep` and `.own` can be combined.
   *
   *     expect({a: {b: 2}}).to.deep.own.include({a: {b: 2}});
   *
   * Add `.nested` earlier in the chain to enable dot- and bracket-notation when
   * referencing nested properties.
   *
   *     expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 2}}).to.nested.include({'\\.a.\\[b\\]': 2});
   *
   * `.deep` and `.nested` can be combined.
   *
   *     expect({a: {b: [{c: 3}]}}).to.deep.nested.include({'a.b[0]': {c: 3}});
   *
   * `.own` and `.nested` cannot be combined.
   *
   * Add `.not` earlier in the chain to negate `.include`.
   *
   *     expect('foobar').to.not.include('taco');
   *     expect([1, 2, 3]).to.not.include(4);
   *
   * However, it's dangerous to negate `.include` when the target is an object.
   * The problem is that it creates uncertain expectations by asserting that the
   * target object doesn't have all of `val`'s key/value pairs but may or may
   * not have some of them. It's often best to identify the exact output that's
   * expected, and then write an assertion that only accepts that exact output.
   *
   * When the target object isn't even expected to have `val`'s keys, it's
   * often best to assert exactly that.
   *
   *     expect({c: 3}).to.not.have.any.keys('a', 'b'); // Recommended
   *     expect({c: 3}).to.not.include({a: 1, b: 2}); // Not recommended
   *
   * When the target object is expected to have `val`'s keys, it's often best to
   * assert that each of the properties has its expected value, rather than
   * asserting that each property doesn't have one of many unexpected values.
   *
   *     expect({a: 3, b: 4}).to.include({a: 3, b: 4}); // Recommended
   *     expect({a: 3, b: 4}).to.not.include({a: 1, b: 2}); // Not recommended
   *
   * `.include` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2, 3]).to.include(4, 'nooo why fail??');
   *     expect([1, 2, 3], 'nooo why fail??').to.include(4);
   *
   * `.include` can also be used as a language chain, causing all `.members` and
   * `.keys` assertions that follow in the chain to require the target to be a
   * superset of the expected set, rather than an identical set. Note that
   * `.members` ignores duplicates in the subset when `.include` is added.
   *
   *     // Target object's keys are a superset of ['a', 'b'] but not identical
   *     expect({a: 1, b: 2, c: 3}).to.include.all.keys('a', 'b');
   *     expect({a: 1, b: 2, c: 3}).to.not.have.all.keys('a', 'b');
   *
   *     // Target array is a superset of [1, 2] but not identical
   *     expect([1, 2, 3]).to.include.members([1, 2]);
   *     expect([1, 2, 3]).to.not.have.members([1, 2]);
   *
   *     // Duplicates in the subset are ignored
   *     expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
   *
   * Note that adding `.any` earlier in the chain causes the `.keys` assertion
   * to ignore `.include`.
   *
   *     // Both assertions are identical
   *     expect({a: 1}).to.include.any.keys('a', 'b');
   *     expect({a: 1}).to.have.any.keys('a', 'b');
   *
   * The aliases `.includes`, `.contain`, and `.contains` can be used
   * interchangeably with `.include`.
   *
   * @name include
   * @alias contain
   * @alias includes
   * @alias contains
   * @param {Mixed} val
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function SameValueZero(a, b) {
    return (_.isNaN(a) && _.isNaN(b)) || a === b;
  }

  function includeChainingBehavior () {
    flag(this, 'contains', true);
  }

  function include (val, msg) {
    if (msg) flag(this, 'message', msg);

    var obj = flag(this, 'object')
      , objType = _.type(obj).toLowerCase()
      , flagMsg = flag(this, 'message')
      , negate = flag(this, 'negate')
      , ssfi = flag(this, 'ssfi')
      , isDeep = flag(this, 'deep')
      , descriptor = isDeep ? 'deep ' : '';

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    var included = false;

    switch (objType) {
      case 'string':
        included = obj.indexOf(val) !== -1;
        break;

      case 'weakset':
        if (isDeep) {
          throw new AssertionError(
            flagMsg + 'unable to use .deep.include with WeakSet',
            undefined,
            ssfi
          );
        }

        included = obj.has(val);
        break;

      case 'map':
        var isEql = isDeep ? _.eql : SameValueZero;
        obj.forEach(function (item) {
          included = included || isEql(item, val);
        });
        break;

      case 'set':
        if (isDeep) {
          obj.forEach(function (item) {
            included = included || _.eql(item, val);
          });
        } else {
          included = obj.has(val);
        }
        break;

      case 'array':
        if (isDeep) {
          included = obj.some(function (item) {
            return _.eql(item, val);
          })
        } else {
          included = obj.indexOf(val) !== -1;
        }
        break;

      default:
        // This block is for asserting a subset of properties in an object.
        // `_.expectTypes` isn't used here because `.include` should work with
        // objects with a custom `@@toStringTag`.
        if (val !== Object(val)) {
          throw new AssertionError(
            flagMsg + 'object tested must be an array, a map, an object,'
              + ' a set, a string, or a weakset, but ' + objType + ' given',
            undefined,
            ssfi
          );
        }

        var props = Object.keys(val)
          , firstErr = null
          , numErrs = 0;

        props.forEach(function (prop) {
          var propAssertion = new Assertion(obj);
          _.transferFlags(this, propAssertion, true);
          flag(propAssertion, 'lockSsfi', true);

          if (!negate || props.length === 1) {
            propAssertion.property(prop, val[prop]);
            return;
          }

          try {
            propAssertion.property(prop, val[prop]);
          } catch (err) {
            if (!_.checkError.compatibleConstructor(err, AssertionError)) {
              throw err;
            }
            if (firstErr === null) firstErr = err;
            numErrs++;
          }
        }, this);

        // When validating .not.include with multiple properties, we only want
        // to throw an assertion error if all of the properties are included,
        // in which case we throw the first property assertion error that we
        // encountered.
        if (negate && props.length > 1 && numErrs === props.length) {
          throw firstErr;
        }
        return;
    }

    // Assert inclusion in collection or substring in a string.
    this.assert(
      included
      , 'expected #{this} to ' + descriptor + 'include ' + _.inspect(val)
      , 'expected #{this} to not ' + descriptor + 'include ' + _.inspect(val));
  }

  Assertion.addChainableMethod('include', include, includeChainingBehavior);
  Assertion.addChainableMethod('contain', include, includeChainingBehavior);
  Assertion.addChainableMethod('contains', include, includeChainingBehavior);
  Assertion.addChainableMethod('includes', include, includeChainingBehavior);

  /**
   * ### .ok
   *
   * Asserts that the target is a truthy value (considered `true` in boolean context).
   * However, it's often best to assert that the target is strictly (`===`) or
   * deeply equal to its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.ok; // Not recommended
   *
   *     expect(true).to.be.true; // Recommended
   *     expect(true).to.be.ok; // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.ok`.
   *
   *     expect(0).to.equal(0); // Recommended
   *     expect(0).to.not.be.ok; // Not recommended
   *
   *     expect(false).to.be.false; // Recommended
   *     expect(false).to.not.be.ok; // Not recommended
   *
   *     expect(null).to.be.null; // Recommended
   *     expect(null).to.not.be.ok; // Not recommended
   *
   *     expect(undefined).to.be.undefined; // Recommended
   *     expect(undefined).to.not.be.ok; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(false, 'nooo why fail??').to.be.ok;
   *
   * @name ok
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('ok', function () {
    this.assert(
        flag(this, 'object')
      , 'expected #{this} to be truthy'
      , 'expected #{this} to be falsy');
  });

  /**
   * ### .true
   *
   * Asserts that the target is strictly (`===`) equal to `true`.
   *
   *     expect(true).to.be.true;
   *
   * Add `.not` earlier in the chain to negate `.true`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `true`.
   *
   *     expect(false).to.be.false; // Recommended
   *     expect(false).to.not.be.true; // Not recommended
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.true; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(false, 'nooo why fail??').to.be.true;
   *
   * @name true
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('true', function () {
    this.assert(
        true === flag(this, 'object')
      , 'expected #{this} to be true'
      , 'expected #{this} to be false'
      , flag(this, 'negate') ? false : true
    );
  });

  /**
   * ### .false
   *
   * Asserts that the target is strictly (`===`) equal to `false`.
   *
   *     expect(false).to.be.false;
   *
   * Add `.not` earlier in the chain to negate `.false`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to `false`.
   *
   *     expect(true).to.be.true; // Recommended
   *     expect(true).to.not.be.false; // Not recommended
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.false; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(true, 'nooo why fail??').to.be.false;
   *
   * @name false
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('false', function () {
    this.assert(
        false === flag(this, 'object')
      , 'expected #{this} to be false'
      , 'expected #{this} to be true'
      , flag(this, 'negate') ? true : false
    );
  });

  /**
   * ### .null
   *
   * Asserts that the target is strictly (`===`) equal to `null`.
   *
   *     expect(null).to.be.null;
   *
   * Add `.not` earlier in the chain to negate `.null`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `null`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.null; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.null;
   *
   * @name null
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('null', function () {
    this.assert(
        null === flag(this, 'object')
      , 'expected #{this} to be null'
      , 'expected #{this} not to be null'
    );
  });

  /**
   * ### .undefined
   *
   * Asserts that the target is strictly (`===`) equal to `undefined`.
   *
   *     expect(undefined).to.be.undefined;
   *
   * Add `.not` earlier in the chain to negate `.undefined`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to `undefined`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.undefined; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.undefined;
   *
   * @name undefined
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('undefined', function () {
    this.assert(
        undefined === flag(this, 'object')
      , 'expected #{this} to be undefined'
      , 'expected #{this} not to be undefined'
    );
  });

  /**
   * ### .NaN
   *
   * Asserts that the target is exactly `NaN`.
   *
   *     expect(NaN).to.be.NaN;
   *
   * Add `.not` earlier in the chain to negate `.NaN`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `NaN`.
   *
   *     expect('foo').to.equal('foo'); // Recommended
   *     expect('foo').to.not.be.NaN; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.NaN;
   *
   * @name NaN
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('NaN', function () {
    this.assert(
        _.isNaN(flag(this, 'object'))
        , 'expected #{this} to be NaN'
        , 'expected #{this} not to be NaN'
    );
  });

  /**
   * ### .exist
   *
   * Asserts that the target is not strictly (`===`) equal to either `null` or
   * `undefined`. However, it's often best to assert that the target is equal to
   * its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.exist; // Not recommended
   *
   *     expect(0).to.equal(0); // Recommended
   *     expect(0).to.exist; // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.exist`.
   *
   *     expect(null).to.be.null; // Recommended
   *     expect(null).to.not.exist; // Not recommended
   *
   *     expect(undefined).to.be.undefined; // Recommended
   *     expect(undefined).to.not.exist; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(null, 'nooo why fail??').to.exist;
   *
   * @name exist
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('exist', function () {
    var val = flag(this, 'object');
    this.assert(
        val !== null && val !== undefined
      , 'expected #{this} to exist'
      , 'expected #{this} to not exist'
    );
  });

  /**
   * ### .empty
   *
   * When the target is a string or array, `.empty` asserts that the target's
   * `length` property is strictly (`===`) equal to `0`.
   *
   *     expect([]).to.be.empty;
   *     expect('').to.be.empty;
   *
   * When the target is a map or set, `.empty` asserts that the target's `size`
   * property is strictly equal to `0`.
   *
   *     expect(new Set()).to.be.empty;
   *     expect(new Map()).to.be.empty;
   *
   * When the target is a non-function object, `.empty` asserts that the target
   * doesn't have any own enumerable properties. Properties with Symbol-based
   * keys are excluded from the count.
   *
   *     expect({}).to.be.empty;
   *
   * Because `.empty` does different things based on the target's type, it's
   * important to check the target's type before using `.empty`. See the `.a`
   * doc for info on testing a target's type.
   *
   *     expect([]).to.be.an('array').that.is.empty;
   *
   * Add `.not` earlier in the chain to negate `.empty`. However, it's often
   * best to assert that the target contains its expected number of values,
   * rather than asserting that it's not empty.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.not.be.empty; // Not recommended
   *
   *     expect(new Set([1, 2, 3])).to.have.property('size', 3); // Recommended
   *     expect(new Set([1, 2, 3])).to.not.be.empty; // Not recommended
   *
   *     expect(Object.keys({a: 1})).to.have.lengthOf(1); // Recommended
   *     expect({a: 1}).to.not.be.empty; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect([1, 2, 3], 'nooo why fail??').to.be.empty;
   *
   * @name empty
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('empty', function () {
    var val = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , flagMsg = flag(this, 'message')
      , itemsCount;

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    switch (_.type(val).toLowerCase()) {
      case 'array':
      case 'string':
        itemsCount = val.length;
        break;
      case 'map':
      case 'set':
        itemsCount = val.size;
        break;
      case 'weakmap':
      case 'weakset':
        throw new AssertionError(
          flagMsg + '.empty was passed a weak collection',
          undefined,
          ssfi
        );
      case 'function':
        var msg = flagMsg + '.empty was passed a function ' + _.getName(val);
        throw new AssertionError(msg.trim(), undefined, ssfi);
      default:
        if (val !== Object(val)) {
          throw new AssertionError(
            flagMsg + '.empty was passed non-string primitive ' + _.inspect(val),
            undefined,
            ssfi
          );
        }
        itemsCount = Object.keys(val).length;
    }

    this.assert(
        0 === itemsCount
      , 'expected #{this} to be empty'
      , 'expected #{this} not to be empty'
    );
  });

  /**
   * ### .arguments
   *
   * Asserts that the target is an `arguments` object.
   *
   *     function test () {
   *       expect(arguments).to.be.arguments;
   *     }
   *
   *     test();
   *
   * Add `.not` earlier in the chain to negate `.arguments`. However, it's often
   * best to assert which type the target is expected to be, rather than
   * asserting that its not an `arguments` object.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.arguments; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({}, 'nooo why fail??').to.be.arguments;
   *
   * The alias `.Arguments` can be used interchangeably with `.arguments`.
   *
   * @name arguments
   * @alias Arguments
   * @namespace BDD
   * @api public
   */

  function checkArguments () {
    var obj = flag(this, 'object')
      , type = _.type(obj);
    this.assert(
        'Arguments' === type
      , 'expected #{this} to be arguments but got ' + type
      , 'expected #{this} to not be arguments'
    );
  }

  Assertion.addProperty('arguments', checkArguments);
  Assertion.addProperty('Arguments', checkArguments);

  /**
   * ### .equal(val[, msg])
   *
   * Asserts that the target is strictly (`===`) equal to the given `val`.
   *
   *     expect(1).to.equal(1);
   *     expect('foo').to.equal('foo');
   *
   * Add `.deep` earlier in the chain to use deep equality instead. See the
   * `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) equals `{a: 1}`
   *     expect({a: 1}).to.deep.equal({a: 1});
   *     expect({a: 1}).to.not.equal({a: 1});
   *
   *     // Target array deeply (but not strictly) equals `[1, 2]`
   *     expect([1, 2]).to.deep.equal([1, 2]);
   *     expect([1, 2]).to.not.equal([1, 2]);
   *
   * Add `.not` earlier in the chain to negate `.equal`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to one of countless unexpected values.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.equal(2); // Not recommended
   *
   * `.equal` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.equal(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.equal(2);
   *
   * The aliases `.equals` and `eq` can be used interchangeably with `.equal`.
   *
   * @name equal
   * @alias equals
   * @alias eq
   * @param {Mixed} val
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertEqual (val, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'deep')) {
      var prevLockSsfi = flag(this, 'lockSsfi');
      flag(this, 'lockSsfi', true);
      this.eql(val);
      flag(this, 'lockSsfi', prevLockSsfi);
    } else {
      this.assert(
          val === obj
        , 'expected #{this} to equal #{exp}'
        , 'expected #{this} to not equal #{exp}'
        , val
        , this._obj
        , true
      );
    }
  }

  Assertion.addMethod('equal', assertEqual);
  Assertion.addMethod('equals', assertEqual);
  Assertion.addMethod('eq', assertEqual);

  /**
   * ### .eql(obj[, msg])
   *
   * Asserts that the target is deeply equal to the given `obj`. See the
   * `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target object is deeply (but not strictly) equal to {a: 1}
   *     expect({a: 1}).to.eql({a: 1}).but.not.equal({a: 1});
   *
   *     // Target array is deeply (but not strictly) equal to [1, 2]
   *     expect([1, 2]).to.eql([1, 2]).but.not.equal([1, 2]);
   *
   * Add `.not` earlier in the chain to negate `.eql`. However, it's often best
   * to assert that the target is deeply equal to its expected value, rather
   * than not deeply equal to one of countless unexpected values.
   *
   *     expect({a: 1}).to.eql({a: 1}); // Recommended
   *     expect({a: 1}).to.not.eql({b: 2}); // Not recommended
   *
   * `.eql` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect({a: 1}).to.eql({b: 2}, 'nooo why fail??');
   *     expect({a: 1}, 'nooo why fail??').to.eql({b: 2});
   *
   * The alias `.eqls` can be used interchangeably with `.eql`.
   *
   * The `.deep.equal` assertion is almost identical to `.eql` but with one
   * difference: `.deep.equal` causes deep equality comparisons to also be used
   * for any other assertions that follow in the chain.
   *
   * @name eql
   * @alias eqls
   * @param {Mixed} obj
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertEql(obj, msg) {
    if (msg) flag(this, 'message', msg);
    this.assert(
        _.eql(obj, flag(this, 'object'))
      , 'expected #{this} to deeply equal #{exp}'
      , 'expected #{this} to not deeply equal #{exp}'
      , obj
      , this._obj
      , true
    );
  }

  Assertion.addMethod('eql', assertEql);
  Assertion.addMethod('eqls', assertEql);

  /**
   * ### .above(n[, msg])
   *
   * Asserts that the target is a number or a date greater than the given number or date `n` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.above(1); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is greater than the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.above(2); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.above(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.above`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(1).to.not.be.above(2); // Not recommended
   *
   * `.above` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.above(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.above(2);
   *
   * The aliases `.gt` and `.greaterThan` can be used interchangeably with
   * `.above`.
   *
   * @name above
   * @alias gt
   * @alias greaterThan
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertAbove (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , errorMessage
      , shouldThrow = true;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to above must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to above must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount > n
        , 'expected #{this} to have a ' + descriptor + ' above #{exp} but got #{act}'
        , 'expected #{this} to not have a ' + descriptor + ' above #{exp}'
        , n
        , itemsCount
      );
    } else {
      this.assert(
          obj > n
        , 'expected #{this} to be above #{exp}'
        , 'expected #{this} to be at most #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('above', assertAbove);
  Assertion.addMethod('gt', assertAbove);
  Assertion.addMethod('greaterThan', assertAbove);

  /**
   * ### .least(n[, msg])
   *
   * Asserts that the target is a number or a date greater than or equal to the given
   * number or date `n` respectively. However, it's often best to assert that the target is equal to
   * its expected value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.at.least(1); // Not recommended
   *     expect(2).to.be.at.least(2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is greater than or equal to the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.at.least(2); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.at.least(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.least`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.at.least(2); // Not recommended
   *
   * `.least` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.at.least(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.at.least(2);
   *
   * The alias `.gte` can be used interchangeably with `.least`.
   *
   * @name least
   * @alias gte
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertLeast (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , errorMessage
      , shouldThrow = true;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to least must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to least must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount >= n
        , 'expected #{this} to have a ' + descriptor + ' at least #{exp} but got #{act}'
        , 'expected #{this} to have a ' + descriptor + ' below #{exp}'
        , n
        , itemsCount
      );
    } else {
      this.assert(
          obj >= n
        , 'expected #{this} to be at least #{exp}'
        , 'expected #{this} to be below #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('least', assertLeast);
  Assertion.addMethod('gte', assertLeast);

  /**
   * ### .below(n[, msg])
   *
   * Asserts that the target is a number or a date less than the given number or date `n` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.below(2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is less than the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.below(4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.length(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.below(4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.below`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.be.below(1); // Not recommended
   *
   * `.below` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(2).to.be.below(1, 'nooo why fail??');
   *     expect(2, 'nooo why fail??').to.be.below(1);
   *
   * The aliases `.lt` and `.lessThan` can be used interchangeably with
   * `.below`.
   *
   * @name below
   * @alias lt
   * @alias lessThan
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertBelow (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , errorMessage
      , shouldThrow = true;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to below must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to below must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount < n
        , 'expected #{this} to have a ' + descriptor + ' below #{exp} but got #{act}'
        , 'expected #{this} to not have a ' + descriptor + ' below #{exp}'
        , n
        , itemsCount
      );
    } else {
      this.assert(
          obj < n
        , 'expected #{this} to be below #{exp}'
        , 'expected #{this} to be at least #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('below', assertBelow);
  Assertion.addMethod('lt', assertBelow);
  Assertion.addMethod('lessThan', assertBelow);

  /**
   * ### .most(n[, msg])
   *
   * Asserts that the target is a number or a date less than or equal to the given number
   * or date `n` respectively. However, it's often best to assert that the target is equal to its
   * expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.at.most(2); // Not recommended
   *     expect(1).to.be.at.most(1); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is less than or equal to the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.at.most(4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.at.most(4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.most`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.be.at.most(1); // Not recommended
   *
   * `.most` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(2).to.be.at.most(1, 'nooo why fail??');
   *     expect(2, 'nooo why fail??').to.be.at.most(1);
   *
   * The alias `.lte` can be used interchangeably with `.most`.
   *
   * @name most
   * @alias lte
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertMost (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , errorMessage
      , shouldThrow = true;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to most must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to most must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount <= n
        , 'expected #{this} to have a ' + descriptor + ' at most #{exp} but got #{act}'
        , 'expected #{this} to have a ' + descriptor + ' above #{exp}'
        , n
        , itemsCount
      );
    } else {
      this.assert(
          obj <= n
        , 'expected #{this} to be at most #{exp}'
        , 'expected #{this} to be above #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('most', assertMost);
  Assertion.addMethod('lte', assertMost);

  /**
   * ### .within(start, finish[, msg])
   *
   * Asserts that the target is a number or a date greater than or equal to the given
   * number or date `start`, and less than or equal to the given number or date `finish` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.within(1, 3); // Not recommended
   *     expect(2).to.be.within(2, 3); // Not recommended
   *     expect(2).to.be.within(1, 2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is greater than or equal to the given number `start`, and less
   * than or equal to the given number `finish`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.within(2, 4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.within(2, 4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.within`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.within(2, 4); // Not recommended
   *
   * `.within` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(4).to.be.within(1, 3, 'nooo why fail??');
   *     expect(4, 'nooo why fail??').to.be.within(1, 3);
   *
   * @name within
   * @param {Number} start lower bound inclusive
   * @param {Number} finish upper bound inclusive
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('within', function (start, finish, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , startType = _.type(start).toLowerCase()
      , finishType = _.type(finish).toLowerCase()
      , errorMessage
      , shouldThrow = true
      , range = (startType === 'date' && finishType === 'date')
          ? start.toUTCString() + '..' + finish.toUTCString()
          : start + '..' + finish;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && (startType !== 'date' || finishType !== 'date'))) {
      errorMessage = msgPrefix + 'the arguments to within must be dates';
    } else if ((startType !== 'number' || finishType !== 'number') && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the arguments to within must be numbers';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount >= start && itemsCount <= finish
        , 'expected #{this} to have a ' + descriptor + ' within ' + range
        , 'expected #{this} to not have a ' + descriptor + ' within ' + range
      );
    } else {
      this.assert(
          obj >= start && obj <= finish
        , 'expected #{this} to be within ' + range
        , 'expected #{this} to not be within ' + range
      );
    }
  });

  /**
   * ### .instanceof(constructor[, msg])
   *
   * Asserts that the target is an instance of the given `constructor`.
   *
   *     function Cat () { }
   *
   *     expect(new Cat()).to.be.an.instanceof(Cat);
   *     expect([1, 2]).to.be.an.instanceof(Array);
   *
   * Add `.not` earlier in the chain to negate `.instanceof`.
   *
   *     expect({a: 1}).to.not.be.an.instanceof(Array);
   *
   * `.instanceof` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1).to.be.an.instanceof(Array, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.an.instanceof(Array);
   *
   * Due to limitations in ES5, `.instanceof` may not always work as expected
   * when using a transpiler such as Babel or TypeScript. In particular, it may
   * produce unexpected results when subclassing built-in object such as
   * `Array`, `Error`, and `Map`. See your transpiler's docs for details:
   *
   * - ([Babel](https://babeljs.io/docs/usage/caveats/#classes))
   * - ([TypeScript](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work))
   *
   * The alias `.instanceOf` can be used interchangeably with `.instanceof`.
   *
   * @name instanceof
   * @param {Constructor} constructor
   * @param {String} msg _optional_
   * @alias instanceOf
   * @namespace BDD
   * @api public
   */

  function assertInstanceOf (constructor, msg) {
    if (msg) flag(this, 'message', msg);

    var target = flag(this, 'object')
    var ssfi = flag(this, 'ssfi');
    var flagMsg = flag(this, 'message');

    try {
      var isInstanceOf = target instanceof constructor;
    } catch (err) {
      if (err instanceof TypeError) {
        flagMsg = flagMsg ? flagMsg + ': ' : '';
        throw new AssertionError(
          flagMsg + 'The instanceof assertion needs a constructor but '
            + _.type(constructor) + ' was given.',
          undefined,
          ssfi
        );
      }
      throw err;
    }

    var name = _.getName(constructor);
    if (name === null) {
      name = 'an unnamed constructor';
    }

    this.assert(
        isInstanceOf
      , 'expected #{this} to be an instance of ' + name
      , 'expected #{this} to not be an instance of ' + name
    );
  };

  Assertion.addMethod('instanceof', assertInstanceOf);
  Assertion.addMethod('instanceOf', assertInstanceOf);

  /**
   * ### .property(name[, val[, msg]])
   *
   * Asserts that the target has a property with the given key `name`.
   *
   *     expect({a: 1}).to.have.property('a');
   *
   * When `val` is provided, `.property` also asserts that the property's value
   * is equal to the given `val`.
   *
   *     expect({a: 1}).to.have.property('a', 1);
   *
   * By default, strict (`===`) equality is used. Add `.deep` earlier in the
   * chain to use deep equality instead. See the `deep-eql` project page for
   * info on the deep equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) has property `x: {a: 1}`
   *     expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});
   *     expect({x: {a: 1}}).to.not.have.property('x', {a: 1});
   *
   * The target's enumerable and non-enumerable properties are always included
   * in the search. By default, both own and inherited properties are included.
   * Add `.own` earlier in the chain to exclude inherited properties from the
   * search.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.have.own.property('a');
   *     expect({a: 1}).to.have.own.property('a', 1);
   *     expect({a: 1}).to.have.property('b');
   *     expect({a: 1}).to.not.have.own.property('b');
   *
   * `.deep` and `.own` can be combined.
   *
   *     expect({x: {a: 1}}).to.have.deep.own.property('x', {a: 1});
   *
   * Add `.nested` earlier in the chain to enable dot- and bracket-notation when
   * referencing nested properties.
   *
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]', 'y');
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 'x'}}).to.have.nested.property('\\.a.\\[b\\]');
   *
   * `.deep` and `.nested` can be combined.
   *
   *     expect({a: {b: [{c: 3}]}})
   *       .to.have.deep.nested.property('a.b[0]', {c: 3});
   *
   * `.own` and `.nested` cannot be combined.
   *
   * Add `.not` earlier in the chain to negate `.property`.
   *
   *     expect({a: 1}).to.not.have.property('b');
   *
   * However, it's dangerous to negate `.property` when providing `val`. The
   * problem is that it creates uncertain expectations by asserting that the
   * target either doesn't have a property with the given key `name`, or that it
   * does have a property with the given key `name` but its value isn't equal to
   * the given `val`. It's often best to identify the exact output that's
   * expected, and then write an assertion that only accepts that exact output.
   *
   * When the target isn't expected to have a property with the given key
   * `name`, it's often best to assert exactly that.
   *
   *     expect({b: 2}).to.not.have.property('a'); // Recommended
   *     expect({b: 2}).to.not.have.property('a', 1); // Not recommended
   *
   * When the target is expected to have a property with the given key `name`,
   * it's often best to assert that the property has its expected value, rather
   * than asserting that it doesn't have one of many unexpected values.
   *
   *     expect({a: 3}).to.have.property('a', 3); // Recommended
   *     expect({a: 3}).to.not.have.property('a', 1); // Not recommended
   *
   * `.property` changes the target of any assertions that follow in the chain
   * to be the value of the property from the original target object.
   *
   *     expect({a: 1}).to.have.property('a').that.is.a('number');
   *
   * `.property` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing `val`, only use the
   * second form.
   *
   *     // Recommended
   *     expect({a: 1}).to.have.property('a', 2, 'nooo why fail??');
   *     expect({a: 1}, 'nooo why fail??').to.have.property('a', 2);
   *     expect({a: 1}, 'nooo why fail??').to.have.property('b');
   *
   *     // Not recommended
   *     expect({a: 1}).to.have.property('b', undefined, 'nooo why fail??');
   *
   * The above assertion isn't the same thing as not providing `val`. Instead,
   * it's asserting that the target object has a `b` property that's equal to
   * `undefined`.
   *
   * The assertions `.ownProperty` and `.haveOwnProperty` can be used
   * interchangeably with `.own.property`.
   *
   * @name property
   * @param {String} name
   * @param {Mixed} val (optional)
   * @param {String} msg _optional_
   * @returns value of property for chaining
   * @namespace BDD
   * @api public
   */

  function assertProperty (name, val, msg) {
    if (msg) flag(this, 'message', msg);

    var isNested = flag(this, 'nested')
      , isOwn = flag(this, 'own')
      , flagMsg = flag(this, 'message')
      , obj = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , nameType = typeof name;

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    if (isNested) {
      if (nameType !== 'string') {
        throw new AssertionError(
          flagMsg + 'the argument to property must be a string when using nested syntax',
          undefined,
          ssfi
        );
      }
    } else {
      if (nameType !== 'string' && nameType !== 'number' && nameType !== 'symbol') {
        throw new AssertionError(
          flagMsg + 'the argument to property must be a string, number, or symbol',
          undefined,
          ssfi
        );
      }
    }

    if (isNested && isOwn) {
      throw new AssertionError(
        flagMsg + 'The "nested" and "own" flags cannot be combined.',
        undefined,
        ssfi
      );
    }

    if (obj === null || obj === undefined) {
      throw new AssertionError(
        flagMsg + 'Target cannot be null or undefined.',
        undefined,
        ssfi
      );
    }

    var isDeep = flag(this, 'deep')
      , negate = flag(this, 'negate')
      , pathInfo = isNested ? _.getPathInfo(obj, name) : null
      , value = isNested ? pathInfo.value : obj[name];

    var descriptor = '';
    if (isDeep) descriptor += 'deep ';
    if (isOwn) descriptor += 'own ';
    if (isNested) descriptor += 'nested ';
    descriptor += 'property ';

    var hasProperty;
    if (isOwn) hasProperty = Object.prototype.hasOwnProperty.call(obj, name);
    else if (isNested) hasProperty = pathInfo.exists;
    else hasProperty = _.hasProperty(obj, name);

    // When performing a negated assertion for both name and val, merely having
    // a property with the given name isn't enough to cause the assertion to
    // fail. It must both have a property with the given name, and the value of
    // that property must equal the given val. Therefore, skip this assertion in
    // favor of the next.
    if (!negate || arguments.length === 1) {
      this.assert(
          hasProperty
        , 'expected #{this} to have ' + descriptor + _.inspect(name)
        , 'expected #{this} to not have ' + descriptor + _.inspect(name));
    }

    if (arguments.length > 1) {
      this.assert(
          hasProperty && (isDeep ? _.eql(val, value) : val === value)
        , 'expected #{this} to have ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}'
        , 'expected #{this} to not have ' + descriptor + _.inspect(name) + ' of #{act}'
        , val
        , value
      );
    }

    flag(this, 'object', value);
  }

  Assertion.addMethod('property', assertProperty);

  function assertOwnProperty (name, value, msg) {
    flag(this, 'own', true);
    assertProperty.apply(this, arguments);
  }

  Assertion.addMethod('ownProperty', assertOwnProperty);
  Assertion.addMethod('haveOwnProperty', assertOwnProperty);

  /**
   * ### .ownPropertyDescriptor(name[, descriptor[, msg]])
   *
   * Asserts that the target has its own property descriptor with the given key
   * `name`. Enumerable and non-enumerable properties are included in the
   * search.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a');
   *
   * When `descriptor` is provided, `.ownPropertyDescriptor` also asserts that
   * the property's descriptor is deeply equal to the given `descriptor`. See
   * the `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * Add `.not` earlier in the chain to negate `.ownPropertyDescriptor`.
   *
   *     expect({a: 1}).to.not.have.ownPropertyDescriptor('b');
   *
   * However, it's dangerous to negate `.ownPropertyDescriptor` when providing
   * a `descriptor`. The problem is that it creates uncertain expectations by
   * asserting that the target either doesn't have a property descriptor with
   * the given key `name`, or that it does have a property descriptor with the
   * given key `name` but its not deeply equal to the given `descriptor`. It's
   * often best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to have a property descriptor with the given
   * key `name`, it's often best to assert exactly that.
   *
   *     // Recommended
   *     expect({b: 2}).to.not.have.ownPropertyDescriptor('a');
   *
   *     // Not recommended
   *     expect({b: 2}).to.not.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * When the target is expected to have a property descriptor with the given
   * key `name`, it's often best to assert that the property has its expected
   * descriptor, rather than asserting that it doesn't have one of many
   * unexpected descriptors.
   *
   *     // Recommended
   *     expect({a: 3}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 3,
   *     });
   *
   *     // Not recommended
   *     expect({a: 3}).to.not.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * `.ownPropertyDescriptor` changes the target of any assertions that follow
   * in the chain to be the value of the property descriptor from the original
   * target object.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a')
   *       .that.has.property('enumerable', true);
   *
   * `.ownPropertyDescriptor` accepts an optional `msg` argument which is a
   * custom error message to show when the assertion fails. The message can also
   * be given as the second argument to `expect`. When not providing
   * `descriptor`, only use the second form.
   *
   *     // Recommended
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 2,
   *     }, 'nooo why fail??');
   *
   *     // Recommended
   *     expect({a: 1}, 'nooo why fail??').to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 2,
   *     });
   *
   *     // Recommended
   *     expect({a: 1}, 'nooo why fail??').to.have.ownPropertyDescriptor('b');
   *
   *     // Not recommended
   *     expect({a: 1})
   *       .to.have.ownPropertyDescriptor('b', undefined, 'nooo why fail??');
   *
   * The above assertion isn't the same thing as not providing `descriptor`.
   * Instead, it's asserting that the target object has a `b` property
   * descriptor that's deeply equal to `undefined`.
   *
   * The alias `.haveOwnPropertyDescriptor` can be used interchangeably with
   * `.ownPropertyDescriptor`.
   *
   * @name ownPropertyDescriptor
   * @alias haveOwnPropertyDescriptor
   * @param {String} name
   * @param {Object} descriptor _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertOwnPropertyDescriptor (name, descriptor, msg) {
    if (typeof descriptor === 'string') {
      msg = descriptor;
      descriptor = null;
    }
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
    if (actualDescriptor && descriptor) {
      this.assert(
          _.eql(descriptor, actualDescriptor)
        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to match ' + _.inspect(descriptor) + ', got ' + _.inspect(actualDescriptor)
        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to not match ' + _.inspect(descriptor)
        , descriptor
        , actualDescriptor
        , true
      );
    } else {
      this.assert(
          actualDescriptor
        , 'expected #{this} to have an own property descriptor for ' + _.inspect(name)
        , 'expected #{this} to not have an own property descriptor for ' + _.inspect(name)
      );
    }
    flag(this, 'object', actualDescriptor);
  }

  Assertion.addMethod('ownPropertyDescriptor', assertOwnPropertyDescriptor);
  Assertion.addMethod('haveOwnPropertyDescriptor', assertOwnPropertyDescriptor);

  /**
   * ### .lengthOf(n[, msg])
   *
   * Asserts that the target's `length` or `size` is equal to the given number
   * `n`.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3);
   *     expect('foo').to.have.lengthOf(3);
   *     expect(new Set([1, 2, 3])).to.have.lengthOf(3);
   *     expect(new Map([['a', 1], ['b', 2], ['c', 3]])).to.have.lengthOf(3);
   *
   * Add `.not` earlier in the chain to negate `.lengthOf`. However, it's often
   * best to assert that the target's `length` property is equal to its expected
   * value, rather than not equal to one of many unexpected values.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.not.have.lengthOf(4); // Not recommended
   *
   * `.lengthOf` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(2, 'nooo why fail??');
   *     expect([1, 2, 3], 'nooo why fail??').to.have.lengthOf(2);
   *
   * `.lengthOf` can also be used as a language chain, causing all `.above`,
   * `.below`, `.least`, `.most`, and `.within` assertions that follow in the
   * chain to use the target's `length` property as the target. However, it's
   * often best to assert that the target's `length` property is equal to its
   * expected length, rather than asserting that its `length` property falls
   * within some range of values.
   *
   *     // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf(3);
   *
   *     // Not recommended
   *     expect([1, 2, 3]).to.have.lengthOf.above(2);
   *     expect([1, 2, 3]).to.have.lengthOf.below(4);
   *     expect([1, 2, 3]).to.have.lengthOf.at.least(3);
   *     expect([1, 2, 3]).to.have.lengthOf.at.most(3);
   *     expect([1, 2, 3]).to.have.lengthOf.within(2,4);
   *
   * Due to a compatibility issue, the alias `.length` can't be chained directly
   * off of an uninvoked method such as `.a`. Therefore, `.length` can't be used
   * interchangeably with `.lengthOf` in every situation. It's recommended to
   * always use `.lengthOf` instead of `.length`.
   *
   *     expect([1, 2, 3]).to.have.a.length(3); // incompatible; throws error
   *     expect([1, 2, 3]).to.have.a.lengthOf(3);  // passes as expected
   *
   * @name lengthOf
   * @alias length
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertLengthChain () {
    flag(this, 'doLength', true);
  }

  function assertLength (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , objType = _.type(obj).toLowerCase()
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi')
      , descriptor = 'length'
      , itemsCount;

    switch (objType) {
      case 'map':
      case 'set':
        descriptor = 'size';
        itemsCount = obj.size;
        break;
      default:
        new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
        itemsCount = obj.length;
    }

    this.assert(
        itemsCount == n
      , 'expected #{this} to have a ' + descriptor + ' of #{exp} but got #{act}'
      , 'expected #{this} to not have a ' + descriptor + ' of #{act}'
      , n
      , itemsCount
    );
  }

  Assertion.addChainableMethod('length', assertLength, assertLengthChain);
  Assertion.addChainableMethod('lengthOf', assertLength, assertLengthChain);

  /**
   * ### .match(re[, msg])
   *
   * Asserts that the target matches the given regular expression `re`.
   *
   *     expect('foobar').to.match(/^foo/);
   *
   * Add `.not` earlier in the chain to negate `.match`.
   *
   *     expect('foobar').to.not.match(/taco/);
   *
   * `.match` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect('foobar').to.match(/taco/, 'nooo why fail??');
   *     expect('foobar', 'nooo why fail??').to.match(/taco/);
   *
   * The alias `.matches` can be used interchangeably with `.match`.
   *
   * @name match
   * @alias matches
   * @param {RegExp} re
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */
  function assertMatch(re, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(
        re.exec(obj)
      , 'expected #{this} to match ' + re
      , 'expected #{this} not to match ' + re
    );
  }

  Assertion.addMethod('match', assertMatch);
  Assertion.addMethod('matches', assertMatch);

  /**
   * ### .string(str[, msg])
   *
   * Asserts that the target string contains the given substring `str`.
   *
   *     expect('foobar').to.have.string('bar');
   *
   * Add `.not` earlier in the chain to negate `.string`.
   *
   *     expect('foobar').to.not.have.string('taco');
   *
   * `.string` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect('foobar').to.have.string('taco', 'nooo why fail??');
   *     expect('foobar', 'nooo why fail??').to.have.string('taco');
   *
   * @name string
   * @param {String} str
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('string', function (str, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(obj, flagMsg, ssfi, true).is.a('string');

    this.assert(
        ~obj.indexOf(str)
      , 'expected #{this} to contain ' + _.inspect(str)
      , 'expected #{this} to not contain ' + _.inspect(str)
    );
  });

  /**
   * ### .keys(key1[, key2[, ...]])
   *
   * Asserts that the target object, array, map, or set has the given keys. Only
   * the target's own inherited properties are included in the search.
   *
   * When the target is an object or array, keys can be provided as one or more
   * string arguments, a single array argument, or a single object argument. In
   * the latter case, only the keys in the given object matter; the values are
   * ignored.
   *
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *     expect(['x', 'y']).to.have.all.keys(0, 1);
   *
   *     expect({a: 1, b: 2}).to.have.all.keys(['a', 'b']);
   *     expect(['x', 'y']).to.have.all.keys([0, 1]);
   *
   *     expect({a: 1, b: 2}).to.have.all.keys({a: 4, b: 5}); // ignore 4 and 5
   *     expect(['x', 'y']).to.have.all.keys({0: 4, 1: 5}); // ignore 4 and 5
   *
   * When the target is a map or set, each key must be provided as a separate
   * argument.
   *
   *     expect(new Map([['a', 1], ['b', 2]])).to.have.all.keys('a', 'b');
   *     expect(new Set(['a', 'b'])).to.have.all.keys('a', 'b');
   *
   * Because `.keys` does different things based on the target's type, it's
   * important to check the target's type before using `.keys`. See the `.a` doc
   * for info on testing a target's type.
   *
   *     expect({a: 1, b: 2}).to.be.an('object').that.has.all.keys('a', 'b');
   *
   * By default, strict (`===`) equality is used to compare keys of maps and
   * sets. Add `.deep` earlier in the chain to use deep equality instead. See
   * the `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target set deeply (but not strictly) has key `{a: 1}`
   *     expect(new Set([{a: 1}])).to.have.all.deep.keys([{a: 1}]);
   *     expect(new Set([{a: 1}])).to.not.have.all.keys([{a: 1}]);
   *
   * By default, the target must have all of the given keys and no more. Add
   * `.any` earlier in the chain to only require that the target have at least
   * one of the given keys. Also, add `.not` earlier in the chain to negate
   * `.keys`. It's often best to add `.any` when negating `.keys`, and to use
   * `.all` when asserting `.keys` without negation.
   *
   * When negating `.keys`, `.any` is preferred because `.not.any.keys` asserts
   * exactly what's expected of the output, whereas `.not.all.keys` creates
   * uncertain expectations.
   *
   *     // Recommended; asserts that target doesn't have any of the given keys
   *     expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
   *
   *     // Not recommended; asserts that target doesn't have all of the given
   *     // keys but may or may not have some of them
   *     expect({a: 1, b: 2}).to.not.have.all.keys('c', 'd');
   *
   * When asserting `.keys` without negation, `.all` is preferred because
   * `.all.keys` asserts exactly what's expected of the output, whereas
   * `.any.keys` creates uncertain expectations.
   *
   *     // Recommended; asserts that target has all the given keys
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *
   *     // Not recommended; asserts that target has at least one of the given
   *     // keys but may or may not have more of them
   *     expect({a: 1, b: 2}).to.have.any.keys('a', 'b');
   *
   * Note that `.all` is used by default when neither `.all` nor `.any` appear
   * earlier in the chain. However, it's often best to add `.all` anyway because
   * it improves readability.
   *
   *     // Both assertions are identical
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b'); // Recommended
   *     expect({a: 1, b: 2}).to.have.keys('a', 'b'); // Not recommended
   *
   * Add `.include` earlier in the chain to require that the target's keys be a
   * superset of the expected keys, rather than identical sets.
   *
   *     // Target object's keys are a superset of ['a', 'b'] but not identical
   *     expect({a: 1, b: 2, c: 3}).to.include.all.keys('a', 'b');
   *     expect({a: 1, b: 2, c: 3}).to.not.have.all.keys('a', 'b');
   *
   * However, if `.any` and `.include` are combined, only the `.any` takes
   * effect. The `.include` is ignored in this case.
   *
   *     // Both assertions are identical
   *     expect({a: 1}).to.have.any.keys('a', 'b');
   *     expect({a: 1}).to.include.any.keys('a', 'b');
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.have.key('b');
   *
   * The alias `.key` can be used interchangeably with `.keys`.
   *
   * @name keys
   * @alias key
   * @param {...String|Array|Object} keys
   * @namespace BDD
   * @api public
   */

  function assertKeys (keys) {
    var obj = flag(this, 'object')
      , objType = _.type(obj)
      , keysType = _.type(keys)
      , ssfi = flag(this, 'ssfi')
      , isDeep = flag(this, 'deep')
      , str
      , deepStr = ''
      , actual
      , ok = true
      , flagMsg = flag(this, 'message');

    flagMsg = flagMsg ? flagMsg + ': ' : '';
    var mixedArgsMsg = flagMsg + 'when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments';

    if (objType === 'Map' || objType === 'Set') {
      deepStr = isDeep ? 'deeply ' : '';
      actual = [];

      // Map and Set '.keys' aren't supported in IE 11. Therefore, use .forEach.
      obj.forEach(function (val, key) { actual.push(key) });

      if (keysType !== 'Array') {
        keys = Array.prototype.slice.call(arguments);
      }
    } else {
      actual = _.getOwnEnumerableProperties(obj);

      switch (keysType) {
        case 'Array':
          if (arguments.length > 1) {
            throw new AssertionError(mixedArgsMsg, undefined, ssfi);
          }
          break;
        case 'Object':
          if (arguments.length > 1) {
            throw new AssertionError(mixedArgsMsg, undefined, ssfi);
          }
          keys = Object.keys(keys);
          break;
        default:
          keys = Array.prototype.slice.call(arguments);
      }

      // Only stringify non-Symbols because Symbols would become "Symbol()"
      keys = keys.map(function (val) {
        return typeof val === 'symbol' ? val : String(val);
      });
    }

    if (!keys.length) {
      throw new AssertionError(flagMsg + 'keys required', undefined, ssfi);
    }

    var len = keys.length
      , any = flag(this, 'any')
      , all = flag(this, 'all')
      , expected = keys;

    if (!any && !all) {
      all = true;
    }

    // Has any
    if (any) {
      ok = expected.some(function(expectedKey) {
        return actual.some(function(actualKey) {
          if (isDeep) {
            return _.eql(expectedKey, actualKey);
          } else {
            return expectedKey === actualKey;
          }
        });
      });
    }

    // Has all
    if (all) {
      ok = expected.every(function(expectedKey) {
        return actual.some(function(actualKey) {
          if (isDeep) {
            return _.eql(expectedKey, actualKey);
          } else {
            return expectedKey === actualKey;
          }
        });
      });

      if (!flag(this, 'contains')) {
        ok = ok && keys.length == actual.length;
      }
    }

    // Key string
    if (len > 1) {
      keys = keys.map(function(key) {
        return _.inspect(key);
      });
      var last = keys.pop();
      if (all) {
        str = keys.join(', ') + ', and ' + last;
      }
      if (any) {
        str = keys.join(', ') + ', or ' + last;
      }
    } else {
      str = _.inspect(keys[0]);
    }

    // Form
    str = (len > 1 ? 'keys ' : 'key ') + str;

    // Have / include
    str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;

    // Assertion
    this.assert(
        ok
      , 'expected #{this} to ' + deepStr + str
      , 'expected #{this} to not ' + deepStr + str
      , expected.slice(0).sort(_.compareByInspect)
      , actual.sort(_.compareByInspect)
      , true
    );
  }

  Assertion.addMethod('keys', assertKeys);
  Assertion.addMethod('key', assertKeys);

  /**
   * ### .throw([errorLike], [errMsgMatcher], [msg])
   *
   * When no arguments are provided, `.throw` invokes the target function and
   * asserts that an error is thrown.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw();
   *
   * When one argument is provided, and it's an error constructor, `.throw`
   * invokes the target function and asserts that an error is thrown that's an
   * instance of that error constructor.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(TypeError);
   *
   * When one argument is provided, and it's an error instance, `.throw` invokes
   * the target function and asserts that an error is thrown that's strictly
   * (`===`) equal to that error instance.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(err);
   *
   * When one argument is provided, and it's a string, `.throw` invokes the
   * target function and asserts that an error is thrown with a message that
   * contains that string.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw('salmon');
   *
   * When one argument is provided, and it's a regular expression, `.throw`
   * invokes the target function and asserts that an error is thrown with a
   * message that matches that regular expression.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(/salmon/);
   *
   * When two arguments are provided, and the first is an error instance or
   * constructor, and the second is a string or regular expression, `.throw`
   * invokes the function and asserts that an error is thrown that fulfills both
   * conditions as described above.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(TypeError, 'salmon');
   *     expect(badFn).to.throw(TypeError, /salmon/);
   *     expect(badFn).to.throw(err, 'salmon');
   *     expect(badFn).to.throw(err, /salmon/);
   *
   * Add `.not` earlier in the chain to negate `.throw`.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.not.throw();
   *
   * However, it's dangerous to negate `.throw` when providing any arguments.
   * The problem is that it creates uncertain expectations by asserting that the
   * target either doesn't throw an error, or that it throws an error but of a
   * different type than the given type, or that it throws an error of the given
   * type but with a message that doesn't include the given string. It's often
   * best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to throw an error, it's often best to assert
   * exactly that.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.not.throw(); // Recommended
   *     expect(goodFn).to.not.throw(ReferenceError, 'x'); // Not recommended
   *
   * When the target is expected to throw an error, it's often best to assert
   * that the error is of its expected type, and has a message that includes an
   * expected string, rather than asserting that it doesn't have one of many
   * unexpected types, and doesn't have a message that includes some string.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(TypeError, 'salmon'); // Recommended
   *     expect(badFn).to.not.throw(ReferenceError, 'x'); // Not recommended
   *
   * `.throw` changes the target of any assertions that follow in the chain to
   * be the error object that's thrown.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     err.code = 42;
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(TypeError).with.property('code', 42);
   *
   * `.throw` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`. When not providing two arguments, always use
   * the second form.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.throw(TypeError, 'x', 'nooo why fail??');
   *     expect(goodFn, 'nooo why fail??').to.throw();
   *
   * Due to limitations in ES5, `.throw` may not always work as expected when
   * using a transpiler such as Babel or TypeScript. In particular, it may
   * produce unexpected results when subclassing the built-in `Error` object and
   * then passing the subclassed constructor to `.throw`. See your transpiler's
   * docs for details:
   *
   * - ([Babel](https://babeljs.io/docs/usage/caveats/#classes))
   * - ([TypeScript](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work))
   *
   * Beware of some common mistakes when using the `throw` assertion. One common
   * mistake is to accidentally invoke the function yourself instead of letting
   * the `throw` assertion invoke the function for you. For example, when
   * testing if a function named `fn` throws, provide `fn` instead of `fn()` as
   * the target for the assertion.
   *
   *     expect(fn).to.throw();     // Good! Tests `fn` as desired
   *     expect(fn()).to.throw();   // Bad! Tests result of `fn()`, not `fn`
   *
   * If you need to assert that your function `fn` throws when passed certain
   * arguments, then wrap a call to `fn` inside of another function.
   *
   *     expect(function () { fn(42); }).to.throw();  // Function expression
   *     expect(() => fn(42)).to.throw();             // ES6 arrow function
   *
   * Another common mistake is to provide an object method (or any stand-alone
   * function that relies on `this`) as the target of the assertion. Doing so is
   * problematic because the `this` context will be lost when the function is
   * invoked by `.throw`; there's no way for it to know what `this` is supposed
   * to be. There are two ways around this problem. One solution is to wrap the
   * method or function call inside of another function. Another solution is to
   * use `bind`.
   *
   *     expect(function () { cat.meow(); }).to.throw();  // Function expression
   *     expect(() => cat.meow()).to.throw();             // ES6 arrow function
   *     expect(cat.meow.bind(cat)).to.throw();           // Bind
   *
   * Finally, it's worth mentioning that it's a best practice in JavaScript to
   * only throw `Error` and derivatives of `Error` such as `ReferenceError`,
   * `TypeError`, and user-defined objects that extend `Error`. No other type of
   * value will generate a stack trace when initialized. With that said, the
   * `throw` assertion does technically support any type of value being thrown,
   * not just `Error` and its derivatives.
   *
   * The aliases `.throws` and `.Throw` can be used interchangeably with
   * `.throw`.
   *
   * @name throw
   * @alias throws
   * @alias Throw
   * @param {Error|ErrorConstructor} errorLike
   * @param {String|RegExp} errMsgMatcher error message
   * @param {String} msg _optional_
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @returns error for chaining (null if no error)
   * @namespace BDD
   * @api public
   */

  function assertThrows (errorLike, errMsgMatcher, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , flagMsg = flag(this, 'message')
      , negate = flag(this, 'negate') || false;
    new Assertion(obj, flagMsg, ssfi, true).is.a('function');

    if (errorLike instanceof RegExp || typeof errorLike === 'string') {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    var caughtErr;
    try {
      obj();
    } catch (err) {
      caughtErr = err;
    }

    // If we have the negate flag enabled and at least one valid argument it means we do expect an error
    // but we want it to match a given set of criteria
    var everyArgIsUndefined = errorLike === undefined && errMsgMatcher === undefined;

    // If we've got the negate flag enabled and both args, we should only fail if both aren't compatible
    // See Issue #551 and PR #683@GitHub
    var everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
    var errorLikeFail = false;
    var errMsgMatcherFail = false;

    // Checking if error was thrown
    if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
      // We need this to display results correctly according to their types
      var errorLikeString = 'an error';
      if (errorLike instanceof Error) {
        errorLikeString = '#{exp}';
      } else if (errorLike) {
        errorLikeString = _.checkError.getConstructorName(errorLike);
      }

      this.assert(
          caughtErr
        , 'expected #{this} to throw ' + errorLikeString
        , 'expected #{this} to not throw an error but #{act} was thrown'
        , errorLike && errorLike.toString()
        , (caughtErr instanceof Error ?
            caughtErr.toString() : (typeof caughtErr === 'string' ? caughtErr : caughtErr &&
                                    _.checkError.getConstructorName(caughtErr)))
      );
    }

    if (errorLike && caughtErr) {
      // We should compare instances only if `errorLike` is an instance of `Error`
      if (errorLike instanceof Error) {
        var isCompatibleInstance = _.checkError.compatibleInstance(caughtErr, errorLike);

        if (isCompatibleInstance === negate) {
          // These checks were created to ensure we won't fail too soon when we've got both args and a negate
          // See Issue #551 and PR #683@GitHub
          if (everyArgIsDefined && negate) {
            errorLikeFail = true;
          } else {
            this.assert(
                negate
              , 'expected #{this} to throw #{exp} but #{act} was thrown'
              , 'expected #{this} to not throw #{exp}' + (caughtErr && !negate ? ' but #{act} was thrown' : '')
              , errorLike.toString()
              , caughtErr.toString()
            );
          }
        }
      }

      var isCompatibleConstructor = _.checkError.compatibleConstructor(caughtErr, errorLike);
      if (isCompatibleConstructor === negate) {
        if (everyArgIsDefined && negate) {
            errorLikeFail = true;
        } else {
          this.assert(
              negate
            , 'expected #{this} to throw #{exp} but #{act} was thrown'
            , 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : '')
            , (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike))
            , (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr))
          );
        }
      }
    }

    if (caughtErr && errMsgMatcher !== undefined && errMsgMatcher !== null) {
      // Here we check compatible messages
      var placeholder = 'including';
      if (errMsgMatcher instanceof RegExp) {
        placeholder = 'matching'
      }

      var isCompatibleMessage = _.checkError.compatibleMessage(caughtErr, errMsgMatcher);
      if (isCompatibleMessage === negate) {
        if (everyArgIsDefined && negate) {
            errMsgMatcherFail = true;
        } else {
          this.assert(
            negate
            , 'expected #{this} to throw error ' + placeholder + ' #{exp} but got #{act}'
            , 'expected #{this} to throw error not ' + placeholder + ' #{exp}'
            ,  errMsgMatcher
            ,  _.checkError.getMessage(caughtErr)
          );
        }
      }
    }

    // If both assertions failed and both should've matched we throw an error
    if (errorLikeFail && errMsgMatcherFail) {
      this.assert(
        negate
        , 'expected #{this} to throw #{exp} but #{act} was thrown'
        , 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : '')
        , (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike))
        , (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr))
      );
    }

    flag(this, 'object', caughtErr);
  };

  Assertion.addMethod('throw', assertThrows);
  Assertion.addMethod('throws', assertThrows);
  Assertion.addMethod('Throw', assertThrows);

  /**
   * ### .respondTo(method[, msg])
   *
   * When the target is a non-function object, `.respondTo` asserts that the
   * target has a method with the given name `method`. The method can be own or
   * inherited, and it can be enumerable or non-enumerable.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(new Cat()).to.respondTo('meow');
   *
   * When the target is a function, `.respondTo` asserts that the target's
   * `prototype` property has a method with the given name `method`. Again, the
   * method can be own or inherited, and it can be enumerable or non-enumerable.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(Cat).to.respondTo('meow');
   *
   * Add `.itself` earlier in the chain to force `.respondTo` to treat the
   * target as a non-function object, even if it's a function. Thus, it asserts
   * that the target has a method with the given name `method`, rather than
   * asserting that the target's `prototype` property has a method with the
   * given name `method`.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *     Cat.hiss = function () {};
   *
   *     expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
   *
   * When not adding `.itself`, it's important to check the target's type before
   * using `.respondTo`. See the `.a` doc for info on checking a target's type.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(new Cat()).to.be.an('object').that.respondsTo('meow');
   *
   * Add `.not` earlier in the chain to negate `.respondTo`.
   *
   *     function Dog () {}
   *     Dog.prototype.bark = function () {};
   *
   *     expect(new Dog()).to.not.respondTo('meow');
   *
   * `.respondTo` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect({}).to.respondTo('meow', 'nooo why fail??');
   *     expect({}, 'nooo why fail??').to.respondTo('meow');
   *
   * The alias `.respondsTo` can be used interchangeably with `.respondTo`.
   *
   * @name respondTo
   * @alias respondsTo
   * @param {String} method
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function respondTo (method, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , itself = flag(this, 'itself')
      , context = ('function' === typeof obj && !itself)
        ? obj.prototype[method]
        : obj[method];

    this.assert(
        'function' === typeof context
      , 'expected #{this} to respond to ' + _.inspect(method)
      , 'expected #{this} to not respond to ' + _.inspect(method)
    );
  }

  Assertion.addMethod('respondTo', respondTo);
  Assertion.addMethod('respondsTo', respondTo);

  /**
   * ### .itself
   *
   * Forces all `.respondTo` assertions that follow in the chain to behave as if
   * the target is a non-function object, even if it's a function. Thus, it
   * causes `.respondTo` to assert that the target has a method with the given
   * name, rather than asserting that the target's `prototype` property has a
   * method with the given name.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *     Cat.hiss = function () {};
   *
   *     expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
   *
   * @name itself
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('itself', function () {
    flag(this, 'itself', true);
  });

  /**
   * ### .satisfy(matcher[, msg])
   *
   * Invokes the given `matcher` function with the target being passed as the
   * first argument, and asserts that the value returned is truthy.
   *
   *     expect(1).to.satisfy(function(num) {
   *       return num > 0;
   *     });
   *
   * Add `.not` earlier in the chain to negate `.satisfy`.
   *
   *     expect(1).to.not.satisfy(function(num) {
   *       return num > 2;
   *     });
   *
   * `.satisfy` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1).to.satisfy(function(num) {
   *       return num > 2;
   *     }, 'nooo why fail??');
   *
   *     expect(1, 'nooo why fail??').to.satisfy(function(num) {
   *       return num > 2;
   *     });
   *
   * The alias `.satisfies` can be used interchangeably with `.satisfy`.
   *
   * @name satisfy
   * @alias satisfies
   * @param {Function} matcher
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function satisfy (matcher, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    var result = matcher(obj);
    this.assert(
        result
      , 'expected #{this} to satisfy ' + _.objDisplay(matcher)
      , 'expected #{this} to not satisfy' + _.objDisplay(matcher)
      , flag(this, 'negate') ? false : true
      , result
    );
  }

  Assertion.addMethod('satisfy', satisfy);
  Assertion.addMethod('satisfies', satisfy);

  /**
   * ### .closeTo(expected, delta[, msg])
   *
   * Asserts that the target is a number that's within a given +/- `delta` range
   * of the given number `expected`. However, it's often best to assert that the
   * target is equal to its expected value.
   *
   *     // Recommended
   *     expect(1.5).to.equal(1.5);
   *
   *     // Not recommended
   *     expect(1.5).to.be.closeTo(1, 0.5);
   *     expect(1.5).to.be.closeTo(2, 0.5);
   *     expect(1.5).to.be.closeTo(1, 1);
   *
   * Add `.not` earlier in the chain to negate `.closeTo`.
   *
   *     expect(1.5).to.equal(1.5); // Recommended
   *     expect(1.5).to.not.be.closeTo(3, 1); // Not recommended
   *
   * `.closeTo` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1.5).to.be.closeTo(3, 1, 'nooo why fail??');
   *     expect(1.5, 'nooo why fail??').to.be.closeTo(3, 1);
   *
   * The alias `.approximately` can be used interchangeably with `.closeTo`.
   *
   * @name closeTo
   * @alias approximately
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function closeTo(expected, delta, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');

    new Assertion(obj, flagMsg, ssfi, true).is.a('number');
    if (typeof expected !== 'number' || typeof delta !== 'number') {
      flagMsg = flagMsg ? flagMsg + ': ' : '';
      throw new AssertionError(
          flagMsg + 'the arguments to closeTo or approximately must be numbers',
          undefined,
          ssfi
      );
    }

    this.assert(
        Math.abs(obj - expected) <= delta
      , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
      , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta
    );
  }

  Assertion.addMethod('closeTo', closeTo);
  Assertion.addMethod('approximately', closeTo);

  // Note: Duplicates are ignored if testing for inclusion instead of sameness.
  function isSubsetOf(subset, superset, cmp, contains, ordered) {
    if (!contains) {
      if (subset.length !== superset.length) return false;
      superset = superset.slice();
    }

    return subset.every(function(elem, idx) {
      if (ordered) return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];

      if (!cmp) {
        var matchIdx = superset.indexOf(elem);
        if (matchIdx === -1) return false;

        // Remove match from superset so not counted twice if duplicate in subset.
        if (!contains) superset.splice(matchIdx, 1);
        return true;
      }

      return superset.some(function(elem2, matchIdx) {
        if (!cmp(elem, elem2)) return false;

        // Remove match from superset so not counted twice if duplicate in subset.
        if (!contains) superset.splice(matchIdx, 1);
        return true;
      });
    });
  }

  /**
   * ### .members(set[, msg])
   *
   * Asserts that the target array has the same members as the given array
   * `set`.
   *
   *     expect([1, 2, 3]).to.have.members([2, 1, 3]);
   *     expect([1, 2, 2]).to.have.members([2, 1, 2]);
   *
   * By default, members are compared using strict (`===`) equality. Add `.deep`
   * earlier in the chain to use deep equality instead. See the `deep-eql`
   * project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target array deeply (but not strictly) has member `{a: 1}`
   *     expect([{a: 1}]).to.have.deep.members([{a: 1}]);
   *     expect([{a: 1}]).to.not.have.members([{a: 1}]);
   *
   * By default, order doesn't matter. Add `.ordered` earlier in the chain to
   * require that members appear in the same order.
   *
   *     expect([1, 2, 3]).to.have.ordered.members([1, 2, 3]);
   *     expect([1, 2, 3]).to.have.members([2, 1, 3])
   *       .but.not.ordered.members([2, 1, 3]);
   *
   * By default, both arrays must be the same size. Add `.include` earlier in
   * the chain to require that the target's members be a superset of the
   * expected members. Note that duplicates are ignored in the subset when
   * `.include` is added.
   *
   *     // Target array is a superset of [1, 2] but not identical
   *     expect([1, 2, 3]).to.include.members([1, 2]);
   *     expect([1, 2, 3]).to.not.have.members([1, 2]);
   *
   *     // Duplicates in the subset are ignored
   *     expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
   *
   * `.deep`, `.ordered`, and `.include` can all be combined. However, if
   * `.include` and `.ordered` are combined, the ordering begins at the start of
   * both arrays.
   *
   *     expect([{a: 1}, {b: 2}, {c: 3}])
   *       .to.include.deep.ordered.members([{a: 1}, {b: 2}])
   *       .but.not.include.deep.ordered.members([{b: 2}, {c: 3}]);
   *
   * Add `.not` earlier in the chain to negate `.members`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the target array doesn't have all of the same members as
   * the given array `set` but may or may not have some of them. It's often best
   * to identify the exact output that's expected, and then write an assertion
   * that only accepts that exact output.
   *
   *     expect([1, 2]).to.not.include(3).and.not.include(4); // Recommended
   *     expect([1, 2]).to.not.have.members([3, 4]); // Not recommended
   *
   * `.members` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2]).to.have.members([1, 2, 3], 'nooo why fail??');
   *     expect([1, 2], 'nooo why fail??').to.have.members([1, 2, 3]);
   *
   * @name members
   * @param {Array} set
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('members', function (subset, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');

    new Assertion(obj, flagMsg, ssfi, true).to.be.an('array');
    new Assertion(subset, flagMsg, ssfi, true).to.be.an('array');

    var contains = flag(this, 'contains');
    var ordered = flag(this, 'ordered');

    var subject, failMsg, failNegateMsg;

    if (contains) {
      subject = ordered ? 'an ordered superset' : 'a superset';
      failMsg = 'expected #{this} to be ' + subject + ' of #{exp}';
      failNegateMsg = 'expected #{this} to not be ' + subject + ' of #{exp}';
    } else {
      subject = ordered ? 'ordered members' : 'members';
      failMsg = 'expected #{this} to have the same ' + subject + ' as #{exp}';
      failNegateMsg = 'expected #{this} to not have the same ' + subject + ' as #{exp}';
    }

    var cmp = flag(this, 'deep') ? _.eql : undefined;

    this.assert(
        isSubsetOf(subset, obj, cmp, contains, ordered)
      , failMsg
      , failNegateMsg
      , subset
      , obj
      , true
    );
  });

  /**
   * ### .oneOf(list[, msg])
   *
   * Asserts that the target is a member of the given array `list`. However,
   * it's often best to assert that the target is equal to its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.oneOf([1, 2, 3]); // Not recommended
   *
   * Comparisons are performed using strict (`===`) equality.
   *
   * Add `.not` earlier in the chain to negate `.oneOf`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.oneOf([2, 3, 4]); // Not recommended
   *
   * `.oneOf` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.oneOf([2, 3, 4], 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.oneOf([2, 3, 4]);
   *
   * @name oneOf
   * @param {Array<*>} list
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function oneOf (list, msg) {
    if (msg) flag(this, 'message', msg);
    var expected = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(list, flagMsg, ssfi, true).to.be.an('array');

    this.assert(
        list.indexOf(expected) > -1
      , 'expected #{this} to be one of #{exp}'
      , 'expected #{this} to not be one of #{exp}'
      , list
      , expected
    );
  }

  Assertion.addMethod('oneOf', oneOf);

  /**
   * ### .change(subject[, prop[, msg]])
   *
   * When one argument is provided, `.change` asserts that the given function
   * `subject` returns a different value when it's invoked before the target
   * function compared to when it's invoked afterward. However, it's often best
   * to assert that `subject` is equal to its expected value.
   *
   *     var dots = ''
   *       , addDot = function () { dots += '.'; }
   *       , getDots = function () { return dots; };
   *
   *     // Recommended
   *     expect(getDots()).to.equal('');
   *     addDot();
   *     expect(getDots()).to.equal('.');
   *
   *     // Not recommended
   *     expect(addDot).to.change(getDots);
   *
   * When two arguments are provided, `.change` asserts that the value of the
   * given object `subject`'s `prop` property is different before invoking the
   * target function compared to afterward.
   *
   *     var myObj = {dots: ''}
   *       , addDot = function () { myObj.dots += '.'; };
   *
   *     // Recommended
   *     expect(myObj).to.have.property('dots', '');
   *     addDot();
   *     expect(myObj).to.have.property('dots', '.');
   *
   *     // Not recommended
   *     expect(addDot).to.change(myObj, 'dots');
   *
   * Strict (`===`) equality is used to compare before and after values.
   *
   * Add `.not` earlier in the chain to negate `.change`.
   *
   *     var dots = ''
   *       , noop = function () {}
   *       , getDots = function () { return dots; };
   *
   *     expect(noop).to.not.change(getDots);
   *
   *     var myObj = {dots: ''}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'dots');
   *
   * `.change` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {dots: ''}
   *       , addDot = function () { myObj.dots += '.'; };
   *
   *     expect(addDot).to.not.change(myObj, 'dots', 'nooo why fail??');
   *
   *     var dots = ''
   *       , addDot = function () { dots += '.'; }
   *       , getDots = function () { return dots; };
   *
   *     expect(addDot, 'nooo why fail??').to.not.change(getDots);
   *
   * `.change` also causes all `.by` assertions that follow in the chain to
   * assert how much a numeric subject was increased or decreased by. However,
   * it's dangerous to use `.change.by`. The problem is that it creates
   * uncertain expectations by asserting that the subject either increases by
   * the given delta, or that it decreases by the given delta. It's often best
   * to identify the exact output that's expected, and then write an assertion
   * that only accepts that exact output.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; }
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   * The alias `.changes` can be used interchangeably with `.change`.
   *
   * @name change
   * @alias changes
   * @param {String} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertChanges (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    // This gets flagged because of the .by(delta) assertion
    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'change');
    flag(this, 'realDelta', final !== initial);

    this.assert(
      initial !== final
      , 'expected ' + msgObj + ' to change'
      , 'expected ' + msgObj + ' to not change'
    );
  }

  Assertion.addMethod('change', assertChanges);
  Assertion.addMethod('changes', assertChanges);

  /**
   * ### .increase(subject[, prop[, msg]])
   *
   * When one argument is provided, `.increase` asserts that the given function
   * `subject` returns a greater number when it's invoked after invoking the
   * target function compared to when it's invoked beforehand. `.increase` also
   * causes all `.by` assertions that follow in the chain to assert how much
   * greater of a number is returned. It's often best to assert that the return
   * value increased by the expected amount, rather than asserting it increased
   * by any amount.
   *
   *     var val = 1
   *       , addTwo = function () { val += 2; }
   *       , getVal = function () { return val; };
   *
   *     expect(addTwo).to.increase(getVal).by(2); // Recommended
   *     expect(addTwo).to.increase(getVal); // Not recommended
   *
   * When two arguments are provided, `.increase` asserts that the value of the
   * given object `subject`'s `prop` property is greater after invoking the
   * target function compared to beforehand.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.increase(myObj, 'val'); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.increase`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either decreases, or that it stays the same.
   * It's often best to identify the exact output that's expected, and then
   * write an assertion that only accepts that exact output.
   *
   * When the subject is expected to decrease, it's often best to assert that it
   * decreased by the expected amount.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.not.increase(myObj, 'val'); // Not recommended
   *
   * When the subject is expected to stay the same, it's often best to assert
   * exactly that.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'val'); // Recommended
   *     expect(noop).to.not.increase(myObj, 'val'); // Not recommended
   *
   * `.increase` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.increase(myObj, 'val', 'nooo why fail??');
   *
   *     var val = 1
   *       , noop = function () {}
   *       , getVal = function () { return val; };
   *
   *     expect(noop, 'nooo why fail??').to.increase(getVal);
   *
   * The alias `.increases` can be used interchangeably with `.increase`.
   *
   * @name increase
   * @alias increases
   * @param {String|Function} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertIncreases (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    // Make sure that the target is a number
    new Assertion(initial, flagMsg, ssfi, true).is.a('number');

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'increase');
    flag(this, 'realDelta', final - initial);

    this.assert(
      final - initial > 0
      , 'expected ' + msgObj + ' to increase'
      , 'expected ' + msgObj + ' to not increase'
    );
  }

  Assertion.addMethod('increase', assertIncreases);
  Assertion.addMethod('increases', assertIncreases);

  /**
   * ### .decrease(subject[, prop[, msg]])
   *
   * When one argument is provided, `.decrease` asserts that the given function
   * `subject` returns a lesser number when it's invoked after invoking the
   * target function compared to when it's invoked beforehand. `.decrease` also
   * causes all `.by` assertions that follow in the chain to assert how much
   * lesser of a number is returned. It's often best to assert that the return
   * value decreased by the expected amount, rather than asserting it decreased
   * by any amount.
   *
   *     var val = 1
   *       , subtractTwo = function () { val -= 2; }
   *       , getVal = function () { return val; };
   *
   *     expect(subtractTwo).to.decrease(getVal).by(2); // Recommended
   *     expect(subtractTwo).to.decrease(getVal); // Not recommended
   *
   * When two arguments are provided, `.decrease` asserts that the value of the
   * given object `subject`'s `prop` property is lesser after invoking the
   * target function compared to beforehand.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.decrease(myObj, 'val'); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.decrease`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either increases, or that it stays the same.
   * It's often best to identify the exact output that's expected, and then
   * write an assertion that only accepts that exact output.
   *
   * When the subject is expected to increase, it's often best to assert that it
   * increased by the expected amount.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.not.decrease(myObj, 'val'); // Not recommended
   *
   * When the subject is expected to stay the same, it's often best to assert
   * exactly that.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'val'); // Recommended
   *     expect(noop).to.not.decrease(myObj, 'val'); // Not recommended
   *
   * `.decrease` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.decrease(myObj, 'val', 'nooo why fail??');
   *
   *     var val = 1
   *       , noop = function () {}
   *       , getVal = function () { return val; };
   *
   *     expect(noop, 'nooo why fail??').to.decrease(getVal);
   *
   * The alias `.decreases` can be used interchangeably with `.decrease`.
   *
   * @name decrease
   * @alias decreases
   * @param {String|Function} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertDecreases (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    // Make sure that the target is a number
    new Assertion(initial, flagMsg, ssfi, true).is.a('number');

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'decrease');
    flag(this, 'realDelta', initial - final);

    this.assert(
      final - initial < 0
      , 'expected ' + msgObj + ' to decrease'
      , 'expected ' + msgObj + ' to not decrease'
    );
  }

  Assertion.addMethod('decrease', assertDecreases);
  Assertion.addMethod('decreases', assertDecreases);

  /**
   * ### .by(delta[, msg])
   *
   * When following an `.increase` assertion in the chain, `.by` asserts that
   * the subject of the `.increase` assertion increased by the given `delta`.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2);
   *
   * When following a `.decrease` assertion in the chain, `.by` asserts that the
   * subject of the `.decrease` assertion decreased by the given `delta`.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2);
   *
   * When following a `.change` assertion in the chain, `.by` asserts that the
   * subject of the `.change` assertion either increased or decreased by the
   * given `delta`. However, it's dangerous to use `.change.by`. The problem is
   * that it creates uncertain expectations. It's often best to identify the
   * exact output that's expected, and then write an assertion that only accepts
   * that exact output.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; }
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.by`. However, it's often best
   * to assert that the subject changed by its expected delta, rather than
   * asserting that it didn't change by one of countless unexpected deltas.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     // Recommended
   *     expect(addTwo).to.increase(myObj, 'val').by(2);
   *
   *     // Not recommended
   *     expect(addTwo).to.increase(myObj, 'val').but.not.by(3);
   *
   * `.by` accepts an optional `msg` argument which is a custom error message to
   * show when the assertion fails. The message can also be given as the second
   * argument to `expect`.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(3, 'nooo why fail??');
   *     expect(addTwo, 'nooo why fail??').to.increase(myObj, 'val').by(3);
   *
   * @name by
   * @param {Number} delta
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertDelta(delta, msg) {
    if (msg) flag(this, 'message', msg);

    var msgObj = flag(this, 'deltaMsgObj');
    var initial = flag(this, 'initialDeltaValue');
    var final = flag(this, 'finalDeltaValue');
    var behavior = flag(this, 'deltaBehavior');
    var realDelta = flag(this, 'realDelta');

    var expression;
    if (behavior === 'change') {
      expression = Math.abs(final - initial) === Math.abs(delta);
    } else {
      expression = realDelta === Math.abs(delta);
    }

    this.assert(
      expression
      , 'expected ' + msgObj + ' to ' + behavior + ' by ' + delta
      , 'expected ' + msgObj + ' to not ' + behavior + ' by ' + delta
    );
  }

  Assertion.addMethod('by', assertDelta);

  /**
   * ### .extensible
   *
   * Asserts that the target is extensible, which means that new properties can
   * be added to it. Primitives are never extensible.
   *
   *     expect({a: 1}).to.be.extensible;
   *
   * Add `.not` earlier in the chain to negate `.extensible`.
   *
   *     var nonExtensibleObject = Object.preventExtensions({})
   *       , sealedObject = Object.seal({})
   *       , frozenObject = Object.freeze({});
   *
   *     expect(nonExtensibleObject).to.not.be.extensible;
   *     expect(sealedObject).to.not.be.extensible;
   *     expect(frozenObject).to.not.be.extensible;
   *     expect(1).to.not.be.extensible;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(1, 'nooo why fail??').to.be.extensible;
   *
   * @name extensible
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('extensible', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a non-extensible ordinary object, simply return false.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
    // The following provides ES6 behavior for ES5 environments.

    var isExtensible = obj === Object(obj) && Object.isExtensible(obj);

    this.assert(
      isExtensible
      , 'expected #{this} to be extensible'
      , 'expected #{this} to not be extensible'
    );
  });

  /**
   * ### .sealed
   *
   * Asserts that the target is sealed, which means that new properties can't be
   * added to it, and its existing properties can't be reconfigured or deleted.
   * However, it's possible that its existing properties can still be reassigned
   * to different values. Primitives are always sealed.
   *
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.freeze({});
   *
   *     expect(sealedObject).to.be.sealed;
   *     expect(frozenObject).to.be.sealed;
   *     expect(1).to.be.sealed;
   *
   * Add `.not` earlier in the chain to negate `.sealed`.
   *
   *     expect({a: 1}).to.not.be.sealed;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.be.sealed;
   *
   * @name sealed
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('sealed', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a sealed ordinary object, simply return true.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
    // The following provides ES6 behavior for ES5 environments.

    var isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;

    this.assert(
      isSealed
      , 'expected #{this} to be sealed'
      , 'expected #{this} to not be sealed'
    );
  });

  /**
   * ### .frozen
   *
   * Asserts that the target is frozen, which means that new properties can't be
   * added to it, and its existing properties can't be reassigned to different
   * values, reconfigured, or deleted. Primitives are always frozen.
   *
   *     var frozenObject = Object.freeze({});
   *
   *     expect(frozenObject).to.be.frozen;
   *     expect(1).to.be.frozen;
   *
   * Add `.not` earlier in the chain to negate `.frozen`.
   *
   *     expect({a: 1}).to.not.be.frozen;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.be.frozen;
   *
   * @name frozen
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('frozen', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a frozen ordinary object, simply return true.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
    // The following provides ES6 behavior for ES5 environments.

    var isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;

    this.assert(
      isFrozen
      , 'expected #{this} to be frozen'
      , 'expected #{this} to not be frozen'
    );
  });

  /**
   * ### .finite
   *
   * Asserts that the target is a number, and isn't `NaN` or positive/negative
   * `Infinity`.
   *
   *     expect(1).to.be.finite;
   *
   * Add `.not` earlier in the chain to negate `.finite`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either isn't a number, or that it's `NaN`, or
   * that it's positive `Infinity`, or that it's negative `Infinity`. It's often
   * best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to be a number, it's often best to assert
   * that it's the expected type, rather than asserting that it isn't one of
   * many unexpected types.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.finite; // Not recommended
   *
   * When the target is expected to be `NaN`, it's often best to assert exactly
   * that.
   *
   *     expect(NaN).to.be.NaN; // Recommended
   *     expect(NaN).to.not.be.finite; // Not recommended
   *
   * When the target is expected to be positive infinity, it's often best to
   * assert exactly that.
   *
   *     expect(Infinity).to.equal(Infinity); // Recommended
   *     expect(Infinity).to.not.be.finite; // Not recommended
   *
   * When the target is expected to be negative infinity, it's often best to
   * assert exactly that.
   *
   *     expect(-Infinity).to.equal(-Infinity); // Recommended
   *     expect(-Infinity).to.not.be.finite; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect('foo', 'nooo why fail??').to.be.finite;
   *
   * @name finite
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('finite', function(msg) {
    var obj = flag(this, 'object');

    this.assert(
        typeof obj === 'number' && isFinite(obj)
      , 'expected #{this} to be a finite number'
      , 'expected #{this} to not be a finite number'
    );
  });
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/interface/assert.js":
/*!********************************************************!*\
  !*** ./node_modules/chai/lib/chai/interface/assert.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  /*!
   * Chai dependencies.
   */

  var Assertion = chai.Assertion
    , flag = util.flag;

  /*!
   * Module export.
   */

  /**
   * ### assert(expression, message)
   *
   * Write your own test expressions.
   *
   *     assert('foo' !== 'bar', 'foo is not bar');
   *     assert(Array.isArray([]), 'empty arrays are arrays');
   *
   * @param {Mixed} expression to test for truthiness
   * @param {String} message to display on error
   * @name assert
   * @namespace Assert
   * @api public
   */

  var assert = chai.assert = function (express, errmsg) {
    var test = new Assertion(null, null, chai.assert, true);
    test.assert(
        express
      , errmsg
      , '[ negation message unavailable ]'
    );
  };

  /**
   * ### .fail([message])
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure. Node.js `assert` module-compatible.
   *
   *     assert.fail();
   *     assert.fail("custom error message");
   *     assert.fail(1, 2);
   *     assert.fail(1, 2, "custom error message");
   *     assert.fail(1, 2, "custom error message", ">");
   *     assert.fail(1, 2, undefined, ">");
   *
   * @name fail
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @param {String} operator
   * @namespace Assert
   * @api public
   */

  assert.fail = function (actual, expected, message, operator) {
    if (arguments.length < 2) {
        // Comply with Node's fail([message]) interface

        message = actual;
        actual = undefined;
    }

    message = message || 'assert.fail()';
    throw new chai.AssertionError(message, {
        actual: actual
      , expected: expected
      , operator: operator
    }, assert.fail);
  };

  /**
   * ### .isOk(object, [message])
   *
   * Asserts that `object` is truthy.
   *
   *     assert.isOk('everything', 'everything is ok');
   *     assert.isOk(false, 'this will fail');
   *
   * @name isOk
   * @alias ok
   * @param {Mixed} object to test
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isOk = function (val, msg) {
    new Assertion(val, msg, assert.isOk, true).is.ok;
  };

  /**
   * ### .isNotOk(object, [message])
   *
   * Asserts that `object` is falsy.
   *
   *     assert.isNotOk('everything', 'this will fail');
   *     assert.isNotOk(false, 'this will pass');
   *
   * @name isNotOk
   * @alias notOk
   * @param {Mixed} object to test
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotOk = function (val, msg) {
    new Assertion(val, msg, assert.isNotOk, true).is.not.ok;
  };

  /**
   * ### .equal(actual, expected, [message])
   *
   * Asserts non-strict equality (`==`) of `actual` and `expected`.
   *
   *     assert.equal(3, '3', '== coerces values to strings');
   *
   * @name equal
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.equal = function (act, exp, msg) {
    var test = new Assertion(act, msg, assert.equal, true);

    test.assert(
        exp == flag(test, 'object')
      , 'expected #{this} to equal #{exp}'
      , 'expected #{this} to not equal #{act}'
      , exp
      , act
      , true
    );
  };

  /**
   * ### .notEqual(actual, expected, [message])
   *
   * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
   *
   *     assert.notEqual(3, 4, 'these numbers are not equal');
   *
   * @name notEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notEqual = function (act, exp, msg) {
    var test = new Assertion(act, msg, assert.notEqual, true);

    test.assert(
        exp != flag(test, 'object')
      , 'expected #{this} to not equal #{exp}'
      , 'expected #{this} to equal #{act}'
      , exp
      , act
      , true
    );
  };

  /**
   * ### .strictEqual(actual, expected, [message])
   *
   * Asserts strict equality (`===`) of `actual` and `expected`.
   *
   *     assert.strictEqual(true, true, 'these booleans are strictly equal');
   *
   * @name strictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.strictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.strictEqual, true).to.equal(exp);
  };

  /**
   * ### .notStrictEqual(actual, expected, [message])
   *
   * Asserts strict inequality (`!==`) of `actual` and `expected`.
   *
   *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
   *
   * @name notStrictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.notStrictEqual, true).to.not.equal(exp);
  };

  /**
   * ### .deepEqual(actual, expected, [message])
   *
   * Asserts that `actual` is deeply equal to `expected`.
   *
   *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
   *
   * @name deepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @alias deepStrictEqual
   * @namespace Assert
   * @api public
   */

  assert.deepEqual = assert.deepStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.deepEqual, true).to.eql(exp);
  };

  /**
   * ### .notDeepEqual(actual, expected, [message])
   *
   * Assert that `actual` is not deeply equal to `expected`.
   *
   *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
   *
   * @name notDeepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.notDeepEqual, true).to.not.eql(exp);
  };

   /**
   * ### .isAbove(valueToCheck, valueToBeAbove, [message])
   *
   * Asserts `valueToCheck` is strictly greater than (>) `valueToBeAbove`.
   *
   *     assert.isAbove(5, 2, '5 is strictly greater than 2');
   *
   * @name isAbove
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAbove
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAbove = function (val, abv, msg) {
    new Assertion(val, msg, assert.isAbove, true).to.be.above(abv);
  };

   /**
   * ### .isAtLeast(valueToCheck, valueToBeAtLeast, [message])
   *
   * Asserts `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`.
   *
   *     assert.isAtLeast(5, 2, '5 is greater or equal to 2');
   *     assert.isAtLeast(3, 3, '3 is greater or equal to 3');
   *
   * @name isAtLeast
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAtLeast
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAtLeast = function (val, atlst, msg) {
    new Assertion(val, msg, assert.isAtLeast, true).to.be.least(atlst);
  };

   /**
   * ### .isBelow(valueToCheck, valueToBeBelow, [message])
   *
   * Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`.
   *
   *     assert.isBelow(3, 6, '3 is strictly less than 6');
   *
   * @name isBelow
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeBelow
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isBelow = function (val, blw, msg) {
    new Assertion(val, msg, assert.isBelow, true).to.be.below(blw);
  };

   /**
   * ### .isAtMost(valueToCheck, valueToBeAtMost, [message])
   *
   * Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`.
   *
   *     assert.isAtMost(3, 6, '3 is less than or equal to 6');
   *     assert.isAtMost(4, 4, '4 is less than or equal to 4');
   *
   * @name isAtMost
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAtMost
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAtMost = function (val, atmst, msg) {
    new Assertion(val, msg, assert.isAtMost, true).to.be.most(atmst);
  };

  /**
   * ### .isTrue(value, [message])
   *
   * Asserts that `value` is true.
   *
   *     var teaServed = true;
   *     assert.isTrue(teaServed, 'the tea has been served');
   *
   * @name isTrue
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isTrue = function (val, msg) {
    new Assertion(val, msg, assert.isTrue, true).is['true'];
  };

  /**
   * ### .isNotTrue(value, [message])
   *
   * Asserts that `value` is not true.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotTrue(tea, 'great, time for tea!');
   *
   * @name isNotTrue
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotTrue = function (val, msg) {
    new Assertion(val, msg, assert.isNotTrue, true).to.not.equal(true);
  };

  /**
   * ### .isFalse(value, [message])
   *
   * Asserts that `value` is false.
   *
   *     var teaServed = false;
   *     assert.isFalse(teaServed, 'no tea yet? hmm...');
   *
   * @name isFalse
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFalse = function (val, msg) {
    new Assertion(val, msg, assert.isFalse, true).is['false'];
  };

  /**
   * ### .isNotFalse(value, [message])
   *
   * Asserts that `value` is not false.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotFalse(tea, 'great, time for tea!');
   *
   * @name isNotFalse
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotFalse = function (val, msg) {
    new Assertion(val, msg, assert.isNotFalse, true).to.not.equal(false);
  };

  /**
   * ### .isNull(value, [message])
   *
   * Asserts that `value` is null.
   *
   *     assert.isNull(err, 'there was no error');
   *
   * @name isNull
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNull = function (val, msg) {
    new Assertion(val, msg, assert.isNull, true).to.equal(null);
  };

  /**
   * ### .isNotNull(value, [message])
   *
   * Asserts that `value` is not null.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotNull(tea, 'great, time for tea!');
   *
   * @name isNotNull
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotNull = function (val, msg) {
    new Assertion(val, msg, assert.isNotNull, true).to.not.equal(null);
  };

  /**
   * ### .isNaN
   *
   * Asserts that value is NaN.
   *
   *     assert.isNaN(NaN, 'NaN is NaN');
   *
   * @name isNaN
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNaN = function (val, msg) {
    new Assertion(val, msg, assert.isNaN, true).to.be.NaN;
  };

  /**
   * ### .isNotNaN
   *
   * Asserts that value is not NaN.
   *
   *     assert.isNotNaN(4, '4 is not NaN');
   *
   * @name isNotNaN
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */
  assert.isNotNaN = function (val, msg) {
    new Assertion(val, msg, assert.isNotNaN, true).not.to.be.NaN;
  };

  /**
   * ### .exists
   *
   * Asserts that the target is neither `null` nor `undefined`.
   *
   *     var foo = 'hi';
   *
   *     assert.exists(foo, 'foo is neither `null` nor `undefined`');
   *
   * @name exists
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.exists = function (val, msg) {
    new Assertion(val, msg, assert.exists, true).to.exist;
  };

  /**
   * ### .notExists
   *
   * Asserts that the target is either `null` or `undefined`.
   *
   *     var bar = null
   *       , baz;
   *
   *     assert.notExists(bar);
   *     assert.notExists(baz, 'baz is either null or undefined');
   *
   * @name notExists
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notExists = function (val, msg) {
    new Assertion(val, msg, assert.notExists, true).to.not.exist;
  };

  /**
   * ### .isUndefined(value, [message])
   *
   * Asserts that `value` is `undefined`.
   *
   *     var tea;
   *     assert.isUndefined(tea, 'no tea defined');
   *
   * @name isUndefined
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isUndefined = function (val, msg) {
    new Assertion(val, msg, assert.isUndefined, true).to.equal(undefined);
  };

  /**
   * ### .isDefined(value, [message])
   *
   * Asserts that `value` is not `undefined`.
   *
   *     var tea = 'cup of chai';
   *     assert.isDefined(tea, 'tea has been defined');
   *
   * @name isDefined
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isDefined = function (val, msg) {
    new Assertion(val, msg, assert.isDefined, true).to.not.equal(undefined);
  };

  /**
   * ### .isFunction(value, [message])
   *
   * Asserts that `value` is a function.
   *
   *     function serveTea() { return 'cup of tea'; };
   *     assert.isFunction(serveTea, 'great, we can have tea now');
   *
   * @name isFunction
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFunction = function (val, msg) {
    new Assertion(val, msg, assert.isFunction, true).to.be.a('function');
  };

  /**
   * ### .isNotFunction(value, [message])
   *
   * Asserts that `value` is _not_ a function.
   *
   *     var serveTea = [ 'heat', 'pour', 'sip' ];
   *     assert.isNotFunction(serveTea, 'great, we have listed the steps');
   *
   * @name isNotFunction
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotFunction = function (val, msg) {
    new Assertion(val, msg, assert.isNotFunction, true).to.not.be.a('function');
  };

  /**
   * ### .isObject(value, [message])
   *
   * Asserts that `value` is an object of type 'Object' (as revealed by `Object.prototype.toString`).
   * _The assertion does not match subclassed objects._
   *
   *     var selection = { name: 'Chai', serve: 'with spices' };
   *     assert.isObject(selection, 'tea selection is an object');
   *
   * @name isObject
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isObject = function (val, msg) {
    new Assertion(val, msg, assert.isObject, true).to.be.a('object');
  };

  /**
   * ### .isNotObject(value, [message])
   *
   * Asserts that `value` is _not_ an object of type 'Object' (as revealed by `Object.prototype.toString`).
   *
   *     var selection = 'chai'
   *     assert.isNotObject(selection, 'tea selection is not an object');
   *     assert.isNotObject(null, 'null is not an object');
   *
   * @name isNotObject
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotObject = function (val, msg) {
    new Assertion(val, msg, assert.isNotObject, true).to.not.be.a('object');
  };

  /**
   * ### .isArray(value, [message])
   *
   * Asserts that `value` is an array.
   *
   *     var menu = [ 'green', 'chai', 'oolong' ];
   *     assert.isArray(menu, 'what kind of tea do we want?');
   *
   * @name isArray
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isArray = function (val, msg) {
    new Assertion(val, msg, assert.isArray, true).to.be.an('array');
  };

  /**
   * ### .isNotArray(value, [message])
   *
   * Asserts that `value` is _not_ an array.
   *
   *     var menu = 'green|chai|oolong';
   *     assert.isNotArray(menu, 'what kind of tea do we want?');
   *
   * @name isNotArray
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotArray = function (val, msg) {
    new Assertion(val, msg, assert.isNotArray, true).to.not.be.an('array');
  };

  /**
   * ### .isString(value, [message])
   *
   * Asserts that `value` is a string.
   *
   *     var teaOrder = 'chai';
   *     assert.isString(teaOrder, 'order placed');
   *
   * @name isString
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isString = function (val, msg) {
    new Assertion(val, msg, assert.isString, true).to.be.a('string');
  };

  /**
   * ### .isNotString(value, [message])
   *
   * Asserts that `value` is _not_ a string.
   *
   *     var teaOrder = 4;
   *     assert.isNotString(teaOrder, 'order placed');
   *
   * @name isNotString
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotString = function (val, msg) {
    new Assertion(val, msg, assert.isNotString, true).to.not.be.a('string');
  };

  /**
   * ### .isNumber(value, [message])
   *
   * Asserts that `value` is a number.
   *
   *     var cups = 2;
   *     assert.isNumber(cups, 'how many cups');
   *
   * @name isNumber
   * @param {Number} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNumber = function (val, msg) {
    new Assertion(val, msg, assert.isNumber, true).to.be.a('number');
  };

  /**
   * ### .isNotNumber(value, [message])
   *
   * Asserts that `value` is _not_ a number.
   *
   *     var cups = '2 cups please';
   *     assert.isNotNumber(cups, 'how many cups');
   *
   * @name isNotNumber
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotNumber = function (val, msg) {
    new Assertion(val, msg, assert.isNotNumber, true).to.not.be.a('number');
  };

   /**
   * ### .isFinite(value, [message])
   *
   * Asserts that `value` is a finite number. Unlike `.isNumber`, this will fail for `NaN` and `Infinity`.
   *
   *     var cups = 2;
   *     assert.isFinite(cups, 'how many cups');
   *
   *     assert.isFinite(NaN); // throws
   *
   * @name isFinite
   * @param {Number} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFinite = function (val, msg) {
    new Assertion(val, msg, assert.isFinite, true).to.be.finite;
  };

  /**
   * ### .isBoolean(value, [message])
   *
   * Asserts that `value` is a boolean.
   *
   *     var teaReady = true
   *       , teaServed = false;
   *
   *     assert.isBoolean(teaReady, 'is the tea ready');
   *     assert.isBoolean(teaServed, 'has tea been served');
   *
   * @name isBoolean
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isBoolean = function (val, msg) {
    new Assertion(val, msg, assert.isBoolean, true).to.be.a('boolean');
  };

  /**
   * ### .isNotBoolean(value, [message])
   *
   * Asserts that `value` is _not_ a boolean.
   *
   *     var teaReady = 'yep'
   *       , teaServed = 'nope';
   *
   *     assert.isNotBoolean(teaReady, 'is the tea ready');
   *     assert.isNotBoolean(teaServed, 'has tea been served');
   *
   * @name isNotBoolean
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotBoolean = function (val, msg) {
    new Assertion(val, msg, assert.isNotBoolean, true).to.not.be.a('boolean');
  };

  /**
   * ### .typeOf(value, name, [message])
   *
   * Asserts that `value`'s type is `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
   *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
   *     assert.typeOf('tea', 'string', 'we have a string');
   *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
   *     assert.typeOf(null, 'null', 'we have a null');
   *     assert.typeOf(undefined, 'undefined', 'we have an undefined');
   *
   * @name typeOf
   * @param {Mixed} value
   * @param {String} name
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.typeOf = function (val, type, msg) {
    new Assertion(val, msg, assert.typeOf, true).to.be.a(type);
  };

  /**
   * ### .notTypeOf(value, name, [message])
   *
   * Asserts that `value`'s type is _not_ `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
   *
   * @name notTypeOf
   * @param {Mixed} value
   * @param {String} typeof name
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notTypeOf = function (val, type, msg) {
    new Assertion(val, msg, assert.notTypeOf, true).to.not.be.a(type);
  };

  /**
   * ### .instanceOf(object, constructor, [message])
   *
   * Asserts that `value` is an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new Tea('chai');
   *
   *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
   *
   * @name instanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.instanceOf = function (val, type, msg) {
    new Assertion(val, msg, assert.instanceOf, true).to.be.instanceOf(type);
  };

  /**
   * ### .notInstanceOf(object, constructor, [message])
   *
   * Asserts `value` is not an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new String('chai');
   *
   *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
   *
   * @name notInstanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notInstanceOf = function (val, type, msg) {
    new Assertion(val, msg, assert.notInstanceOf, true)
      .to.not.be.instanceOf(type);
  };

  /**
   * ### .include(haystack, needle, [message])
   *
   * Asserts that `haystack` includes `needle`. Can be used to assert the
   * inclusion of a value in an array, a substring in a string, or a subset of
   * properties in an object.
   *
   *     assert.include([1,2,3], 2, 'array contains value');
   *     assert.include('foobar', 'foo', 'string contains substring');
   *     assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property');
   *
   * Strict equality (===) is used. When asserting the inclusion of a value in
   * an array, the array is searched for an element that's strictly equal to the
   * given value. When asserting a subset of properties in an object, the object
   * is searched for the given property keys, checking that each one is present
   * and strictly equal to the given property value. For instance:
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.include([obj1, obj2], obj1);
   *     assert.include({foo: obj1, bar: obj2}, {foo: obj1});
   *     assert.include({foo: obj1, bar: obj2}, {foo: obj1, bar: obj2});
   *
   * @name include
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.include = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.include, true).include(inc);
  };

  /**
   * ### .notInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` does not include `needle`. Can be used to assert
   * the absence of a value in an array, a substring in a string, or a subset of
   * properties in an object.
   *
   *     assert.notInclude([1,2,3], 4, "array doesn't contain value");
   *     assert.notInclude('foobar', 'baz', "string doesn't contain substring");
   *     assert.notInclude({ foo: 'bar', hello: 'universe' }, { foo: 'baz' }, 'object doesn't contain property');
   *
   * Strict equality (===) is used. When asserting the absence of a value in an
   * array, the array is searched to confirm the absence of an element that's
   * strictly equal to the given value. When asserting a subset of properties in
   * an object, the object is searched to confirm that at least one of the given
   * property keys is either not present or not strictly equal to the given
   * property value. For instance:
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.notInclude([obj1, obj2], {a: 1});
   *     assert.notInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
   *     assert.notInclude({foo: obj1, bar: obj2}, {foo: obj1, bar: {b: 2}});
   *
   * @name notInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notInclude, true).not.include(inc);
  };

  /**
   * ### .deepInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` includes `needle`. Can be used to assert the
   * inclusion of a value in an array or a subset of properties in an object.
   * Deep equality is used.
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.deepInclude([obj1, obj2], {a: 1});
   *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
   *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 2}});
   *
   * @name deepInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.deepInclude, true).deep.include(inc);
  };

  /**
   * ### .notDeepInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` does not include `needle`. Can be used to assert
   * the absence of a value in an array or a subset of properties in an object.
   * Deep equality is used.
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.notDeepInclude([obj1, obj2], {a: 9});
   *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 9}});
   *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 9}});
   *
   * @name notDeepInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepInclude, true).not.deep.include(inc);
  };

  /**
   * ### .nestedInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an
   * object.
   * Enables the use of dot- and bracket-notation for referencing nested
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   *
   *     assert.nestedInclude({'.a': {'b': 'x'}}, {'\\.a.[b]': 'x'});
   *     assert.nestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'x'});
   *
   * @name nestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.nestedInclude, true).nested.include(inc);
  };

  /**
   * ### .notNestedInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' does not include 'needle'.
   * Can be used to assert the absence of a subset of properties in an
   * object.
   * Enables the use of dot- and bracket-notation for referencing nested
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   *
   *     assert.notNestedInclude({'.a': {'b': 'x'}}, {'\\.a.b': 'y'});
   *     assert.notNestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'y'});
   *
   * @name notNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notNestedInclude, true)
      .not.nested.include(inc);
  };

  /**
   * ### .deepNestedInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an
   * object while checking for deep equality.
   * Enables the use of dot- and bracket-notation for referencing nested
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   *
   *     assert.deepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {x: 1}});
   *     assert.deepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {x: 1}});
   *
   * @name deepNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepNestedInclude, true)
      .deep.nested.include(inc);
  };

  /**
   * ### .notDeepNestedInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' does not include 'needle'.
   * Can be used to assert the absence of a subset of properties in an
   * object while checking for deep equality.
   * Enables the use of dot- and bracket-notation for referencing nested
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   *
   *     assert.notDeepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {y: 1}})
   *     assert.notDeepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {y: 2}});
   *
   * @name notDeepNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepNestedInclude, true)
      .not.deep.nested.include(inc);
  };

  /**
   * ### .ownInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an
   * object while ignoring inherited properties.
   *
   *     assert.ownInclude({ a: 1 }, { a: 1 });
   *
   * @name ownInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.ownInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.ownInclude, true).own.include(inc);
  };

  /**
   * ### .notOwnInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the absence of a subset of properties in an
   * object while ignoring inherited properties.
   *
   *     Object.prototype.b = 2;
   *
   *     assert.notOwnInclude({ a: 1 }, { b: 2 });
   *
   * @name notOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notOwnInclude, true).not.own.include(inc);
  };

  /**
   * ### .deepOwnInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an
   * object while ignoring inherited properties and checking for deep equality.
   *
   *      assert.deepOwnInclude({a: {b: 2}}, {a: {b: 2}});
   *
   * @name deepOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepOwnInclude, true)
      .deep.own.include(inc);
  };

   /**
   * ### .notDeepOwnInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the absence of a subset of properties in an
   * object while ignoring inherited properties and checking for deep equality.
   *
   *      assert.notDeepOwnInclude({a: {b: 2}}, {a: {c: 3}});
   *
   * @name notDeepOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepOwnInclude, true)
      .not.deep.own.include(inc);
  };

  /**
   * ### .match(value, regexp, [message])
   *
   * Asserts that `value` matches the regular expression `regexp`.
   *
   *     assert.match('foobar', /^foo/, 'regexp matches');
   *
   * @name match
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.match = function (exp, re, msg) {
    new Assertion(exp, msg, assert.match, true).to.match(re);
  };

  /**
   * ### .notMatch(value, regexp, [message])
   *
   * Asserts that `value` does not match the regular expression `regexp`.
   *
   *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
   *
   * @name notMatch
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notMatch = function (exp, re, msg) {
    new Assertion(exp, msg, assert.notMatch, true).to.not.match(re);
  };

  /**
   * ### .property(object, property, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property`.
   *
   *     assert.property({ tea: { green: 'matcha' }}, 'tea');
   *     assert.property({ tea: { green: 'matcha' }}, 'toString');
   *
   * @name property
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.property = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.property, true).to.have.property(prop);
  };

  /**
   * ### .notProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property`.
   *
   *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
   *
   * @name notProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notProperty, true)
      .to.not.have.property(prop);
  };

  /**
   * ### .propertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property` with a value given by `value`. Uses a strict equality check
   * (===).
   *
   *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
   *
   * @name propertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.propertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.propertyVal, true)
      .to.have.property(prop, val);
  };

  /**
   * ### .notPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property` with value given by `value`. Uses a strict equality check
   * (===).
   *
   *     assert.notPropertyVal({ tea: 'is good' }, 'tea', 'is bad');
   *     assert.notPropertyVal({ tea: 'is good' }, 'coffee', 'is good');
   *
   * @name notPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notPropertyVal, true)
      .to.not.have.property(prop, val);
  };

  /**
   * ### .deepPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property` with a value given by `value`. Uses a deep equality check.
   *
   *     assert.deepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
   *
   * @name deepPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.deepPropertyVal, true)
      .to.have.deep.property(prop, val);
  };

  /**
   * ### .notDeepPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property` with value given by `value`. Uses a deep equality check.
   *
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
   *
   * @name notDeepPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notDeepPropertyVal, true)
      .to.not.have.deep.property(prop, val);
  };

  /**
   * ### .ownProperty(object, property, [message])
   *
   * Asserts that `object` has a direct property named by `property`. Inherited
   * properties aren't checked.
   *
   *     assert.ownProperty({ tea: { green: 'matcha' }}, 'tea');
   *
   * @name ownProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.ownProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.ownProperty, true)
      .to.have.own.property(prop);
  };

  /**
   * ### .notOwnProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by
   * `property`. Inherited properties aren't checked.
   *
   *     assert.notOwnProperty({ tea: { green: 'matcha' }}, 'coffee');
   *     assert.notOwnProperty({}, 'toString');
   *
   * @name notOwnProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.notOwnProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notOwnProperty, true)
      .to.not.have.own.property(prop);
  };

  /**
   * ### .ownPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct property named by `property` and a value
   * equal to the provided `value`. Uses a strict equality check (===).
   * Inherited properties aren't checked.
   *
   *     assert.ownPropertyVal({ coffee: 'is good'}, 'coffee', 'is good');
   *
   * @name ownPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.ownPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.ownPropertyVal, true)
      .to.have.own.property(prop, value);
  };

  /**
   * ### .notOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by `property`
   * with a value equal to the provided `value`. Uses a strict equality check
   * (===). Inherited properties aren't checked.
   *
   *     assert.notOwnPropertyVal({ tea: 'is better'}, 'tea', 'is worse');
   *     assert.notOwnPropertyVal({}, 'toString', Object.prototype.toString);
   *
   * @name notOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.notOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.notOwnPropertyVal, true)
      .to.not.have.own.property(prop, value);
  };

  /**
   * ### .deepOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct property named by `property` and a value
   * equal to the provided `value`. Uses a deep equality check. Inherited
   * properties aren't checked.
   *
   *     assert.deepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
   *
   * @name deepOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.deepOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.deepOwnPropertyVal, true)
      .to.have.deep.own.property(prop, value);
  };

  /**
   * ### .notDeepOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by `property`
   * with a value equal to the provided `value`. Uses a deep equality check.
   * Inherited properties aren't checked.
   *
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
   *     assert.notDeepOwnPropertyVal({}, 'toString', Object.prototype.toString);
   *
   * @name notDeepOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.notDeepOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.notDeepOwnPropertyVal, true)
      .to.not.have.deep.own.property(prop, value);
  };

  /**
   * ### .nestedProperty(object, property, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property`, which can be a string using dot- and bracket-notation for
   * nested reference.
   *
   *     assert.nestedProperty({ tea: { green: 'matcha' }}, 'tea.green');
   *
   * @name nestedProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.nestedProperty, true)
      .to.have.nested.property(prop);
  };

  /**
   * ### .notNestedProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property`, which
   * can be a string using dot- and bracket-notation for nested reference. The
   * property cannot exist on the object nor anywhere in its prototype chain.
   *
   *     assert.notNestedProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
   *
   * @name notNestedProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notNestedProperty, true)
      .to.not.have.nested.property(prop);
  };

  /**
   * ### .nestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with value given
   * by `value`. `property` can use dot- and bracket-notation for nested
   * reference. Uses a strict equality check (===).
   *
   *     assert.nestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
   *
   * @name nestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.nestedPropertyVal, true)
      .to.have.nested.property(prop, val);
  };

  /**
   * ### .notNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property` with
   * value given by `value`. `property` can use dot- and bracket-notation for
   * nested reference. Uses a strict equality check (===).
   *
   *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
   *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'coffee.green', 'matcha');
   *
   * @name notNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notNestedPropertyVal, true)
      .to.not.have.nested.property(prop, val);
  };

  /**
   * ### .deepNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with a value given
   * by `value`. `property` can use dot- and bracket-notation for nested
   * reference. Uses a deep equality check.
   *
   *     assert.deepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yum' });
   *
   * @name deepNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.deepNestedPropertyVal, true)
      .to.have.deep.nested.property(prop, val);
  };

  /**
   * ### .notDeepNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property` with
   * value given by `value`. `property` can use dot- and bracket-notation for
   * nested reference. Uses a deep equality check.
   *
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { oolong: 'yum' });
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yuck' });
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.black', { matcha: 'yum' });
   *
   * @name notDeepNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notDeepNestedPropertyVal, true)
      .to.not.have.deep.nested.property(prop, val);
  }

  /**
   * ### .lengthOf(object, length, [message])
   *
   * Asserts that `object` has a `length` or `size` with the expected value.
   *
   *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
   *     assert.lengthOf('foobar', 6, 'string has length of 6');
   *     assert.lengthOf(new Set([1,2,3]), 3, 'set has size of 3');
   *     assert.lengthOf(new Map([['a',1],['b',2],['c',3]]), 3, 'map has size of 3');
   *
   * @name lengthOf
   * @param {Mixed} object
   * @param {Number} length
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.lengthOf = function (exp, len, msg) {
    new Assertion(exp, msg, assert.lengthOf, true).to.have.lengthOf(len);
  };

  /**
   * ### .hasAnyKeys(object, [keys], [message])
   *
   * Asserts that `object` has at least one of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'iDontExist', 'baz']);
   *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, iDontExist: 99, baz: 1337});
   *     assert.hasAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.hasAnyKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
   *
   * @name hasAnyKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAnyKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAnyKeys, true).to.have.any.keys(keys);
  }

  /**
   * ### .hasAllKeys(object, [keys], [message])
   *
   * Asserts that `object` has all and only all of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
   *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337]);
   *     assert.hasAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.hasAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
   *
   * @name hasAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAllKeys, true).to.have.all.keys(keys);
  }

  /**
   * ### .containsAllKeys(object, [keys], [message])
   *
   * Asserts that `object` has all of the `keys` provided but may have more keys not listed.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'baz']);
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, baz: 1337});
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337});
   *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}]);
   *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}]);
   *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
   *
   * @name containsAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.containsAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.containsAllKeys, true)
      .to.contain.all.keys(keys);
  }

  /**
   * ### .doesNotHaveAnyKeys(object, [keys], [message])
   *
   * Asserts that `object` has none of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
   *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
   *     assert.doesNotHaveAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
   *     assert.doesNotHaveAnyKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
   *
   * @name doesNotHaveAnyKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAnyKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAnyKeys, true)
      .to.not.have.any.keys(keys);
  }

  /**
   * ### .doesNotHaveAllKeys(object, [keys], [message])
   *
   * Asserts that `object` does not have at least one of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
   *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
   *     assert.doesNotHaveAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
   *     assert.doesNotHaveAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
   *
   * @name doesNotHaveAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAllKeys, true)
      .to.not.have.all.keys(keys);
  }

  /**
   * ### .hasAnyDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has at least one of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {three: 'three'}]);
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name doesNotHaveAllKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAnyDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAnyDeepKeys, true)
      .to.have.any.deep.keys(keys);
  }

 /**
   * ### .hasAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has all and only all of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne']]), {one: 'one'});
   *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAllDeepKeys(new Set([{one: 'one'}]), {one: 'one'});
   *     assert.hasAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name hasAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAllDeepKeys, true)
      .to.have.all.deep.keys(keys);
  }

 /**
   * ### .containsAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` contains all of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
   *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
   *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name containsAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.containsAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.containsAllDeepKeys, true)
      .to.contain.all.deep.keys(keys);
  }

 /**
   * ### .doesNotHaveAnyDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has none of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
   *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
   *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
   *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
   *
   * @name doesNotHaveAnyDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAnyDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAnyDeepKeys, true)
      .to.not.have.any.deep.keys(keys);
  }

 /**
   * ### .doesNotHaveAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` does not have at least one of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
   *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {one: 'one'}]);
   *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
   *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {fifty: 'fifty'}]);
   *
   * @name doesNotHaveAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAllDeepKeys, true)
      .to.not.have.all.deep.keys(keys);
  }

 /**
   * ### .throws(fn, [errorLike/string/regexp], [string/regexp], [message])
   *
   * If `errorLike` is an `Error` constructor, asserts that `fn` will throw an error that is an
   * instance of `errorLike`.
   * If `errorLike` is an `Error` instance, asserts that the error thrown is the same
   * instance as `errorLike`.
   * If `errMsgMatcher` is provided, it also asserts that the error thrown will have a
   * message matching `errMsgMatcher`.
   *
   *     assert.throws(fn, 'Error thrown must have this msg');
   *     assert.throws(fn, /Error thrown must have a msg that matches this/);
   *     assert.throws(fn, ReferenceError);
   *     assert.throws(fn, errorInstance);
   *     assert.throws(fn, ReferenceError, 'Error thrown must be a ReferenceError and have this msg');
   *     assert.throws(fn, errorInstance, 'Error thrown must be the same errorInstance and have this msg');
   *     assert.throws(fn, ReferenceError, /Error thrown must be a ReferenceError and match this/);
   *     assert.throws(fn, errorInstance, /Error thrown must be the same errorInstance and match this/);
   *
   * @name throws
   * @alias throw
   * @alias Throw
   * @param {Function} fn
   * @param {ErrorConstructor|Error} errorLike
   * @param {RegExp|String} errMsgMatcher
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @namespace Assert
   * @api public
   */

  assert.throws = function (fn, errorLike, errMsgMatcher, msg) {
    if ('string' === typeof errorLike || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    var assertErr = new Assertion(fn, msg, assert.throws, true)
      .to.throw(errorLike, errMsgMatcher);
    return flag(assertErr, 'object');
  };

  /**
   * ### .doesNotThrow(fn, [errorLike/string/regexp], [string/regexp], [message])
   *
   * If `errorLike` is an `Error` constructor, asserts that `fn` will _not_ throw an error that is an
   * instance of `errorLike`.
   * If `errorLike` is an `Error` instance, asserts that the error thrown is _not_ the same
   * instance as `errorLike`.
   * If `errMsgMatcher` is provided, it also asserts that the error thrown will _not_ have a
   * message matching `errMsgMatcher`.
   *
   *     assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
   *     assert.doesNotThrow(fn, /Any Error thrown must not match this/);
   *     assert.doesNotThrow(fn, Error);
   *     assert.doesNotThrow(fn, errorInstance);
   *     assert.doesNotThrow(fn, Error, 'Error must not have this message');
   *     assert.doesNotThrow(fn, errorInstance, 'Error must not have this message');
   *     assert.doesNotThrow(fn, Error, /Error must not match this/);
   *     assert.doesNotThrow(fn, errorInstance, /Error must not match this/);
   *
   * @name doesNotThrow
   * @param {Function} fn
   * @param {ErrorConstructor} errorLike
   * @param {RegExp|String} errMsgMatcher
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @namespace Assert
   * @api public
   */

  assert.doesNotThrow = function (fn, errorLike, errMsgMatcher, msg) {
    if ('string' === typeof errorLike || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    new Assertion(fn, msg, assert.doesNotThrow, true)
      .to.not.throw(errorLike, errMsgMatcher);
  };

  /**
   * ### .operator(val1, operator, val2, [message])
   *
   * Compares two values using `operator`.
   *
   *     assert.operator(1, '<', 2, 'everything is ok');
   *     assert.operator(1, '>', 2, 'this will fail');
   *
   * @name operator
   * @param {Mixed} val1
   * @param {String} operator
   * @param {Mixed} val2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.operator = function (val, operator, val2, msg) {
    var ok;
    switch(operator) {
      case '==':
        ok = val == val2;
        break;
      case '===':
        ok = val === val2;
        break;
      case '>':
        ok = val > val2;
        break;
      case '>=':
        ok = val >= val2;
        break;
      case '<':
        ok = val < val2;
        break;
      case '<=':
        ok = val <= val2;
        break;
      case '!=':
        ok = val != val2;
        break;
      case '!==':
        ok = val !== val2;
        break;
      default:
        msg = msg ? msg + ': ' : msg;
        throw new chai.AssertionError(
          msg + 'Invalid operator "' + operator + '"',
          undefined,
          assert.operator
        );
    }
    var test = new Assertion(ok, msg, assert.operator, true);
    test.assert(
        true === flag(test, 'object')
      , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)
      , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );
  };

  /**
   * ### .closeTo(actual, expected, delta, [message])
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
   *
   * @name closeTo
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.closeTo = function (act, exp, delta, msg) {
    new Assertion(act, msg, assert.closeTo, true).to.be.closeTo(exp, delta);
  };

  /**
   * ### .approximately(actual, expected, delta, [message])
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     assert.approximately(1.5, 1, 0.5, 'numbers are close');
   *
   * @name approximately
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.approximately = function (act, exp, delta, msg) {
    new Assertion(act, msg, assert.approximately, true)
      .to.be.approximately(exp, delta);
  };

  /**
   * ### .sameMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in any order. Uses a
   * strict equality check (===).
   *
   *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
   *
   * @name sameMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameMembers, true)
      .to.have.same.members(set2);
  }

  /**
   * ### .notSameMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in any order.
   * Uses a strict equality check (===).
   *
   *     assert.notSameMembers([ 1, 2, 3 ], [ 5, 1, 3 ], 'not same members');
   *
   * @name notSameMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameMembers, true)
      .to.not.have.same.members(set2);
  }

  /**
   * ### .sameDeepMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in any order. Uses a
   * deep equality check.
   *
   *     assert.sameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members');
   *
   * @name sameDeepMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameDeepMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameDeepMembers, true)
      .to.have.same.deep.members(set2);
  }

  /**
   * ### .notSameDeepMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in any order.
   * Uses a deep equality check.
   *
   *     assert.notSameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { f: 5 }], 'not same deep members');
   *
   * @name notSameDeepMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameDeepMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameDeepMembers, true)
      .to.not.have.same.deep.members(set2);
  }

  /**
   * ### .sameOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in the same order.
   * Uses a strict equality check (===).
   *
   *     assert.sameOrderedMembers([ 1, 2, 3 ], [ 1, 2, 3 ], 'same ordered members');
   *
   * @name sameOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameOrderedMembers, true)
      .to.have.same.ordered.members(set2);
  }

  /**
   * ### .notSameOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in the same
   * order. Uses a strict equality check (===).
   *
   *     assert.notSameOrderedMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'not same ordered members');
   *
   * @name notSameOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameOrderedMembers, true)
      .to.not.have.same.ordered.members(set2);
  }

  /**
   * ### .sameDeepOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in the same order.
   * Uses a deep equality check.
   *
   * assert.sameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { c: 3 } ], 'same deep ordered members');
   *
   * @name sameDeepOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameDeepOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameDeepOrderedMembers, true)
      .to.have.same.deep.ordered.members(set2);
  }

  /**
   * ### .notSameDeepOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in the same
   * order. Uses a deep equality check.
   *
   * assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { z: 5 } ], 'not same deep ordered members');
   * assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { c: 3 } ], 'not same deep ordered members');
   *
   * @name notSameDeepOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameDeepOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameDeepOrderedMembers, true)
      .to.not.have.same.deep.ordered.members(set2);
  }

  /**
   * ### .includeMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in any order. Uses a
   * strict equality check (===). Duplicates are ignored.
   *
   *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1, 2 ], 'include members');
   *
   * @name includeMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeMembers, true)
      .to.include.members(subset);
  }

  /**
   * ### .notIncludeMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in any order. Uses a
   * strict equality check (===). Duplicates are ignored.
   *
   *     assert.notIncludeMembers([ 1, 2, 3 ], [ 5, 1 ], 'not include members');
   *
   * @name notIncludeMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeMembers, true)
      .to.not.include.members(subset);
  }

  /**
   * ### .includeDeepMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in any order. Uses a deep
   * equality check. Duplicates are ignored.
   *
   *     assert.includeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { b: 2 } ], 'include deep members');
   *
   * @name includeDeepMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeDeepMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeDeepMembers, true)
      .to.include.deep.members(subset);
  }

  /**
   * ### .notIncludeDeepMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in any order. Uses a
   * deep equality check. Duplicates are ignored.
   *
   *     assert.notIncludeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { f: 5 } ], 'not include deep members');
   *
   * @name notIncludeDeepMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeDeepMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeDeepMembers, true)
      .to.not.include.deep.members(subset);
  }

  /**
   * ### .includeOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a strict equality
   * check (===).
   *
   *     assert.includeOrderedMembers([ 1, 2, 3 ], [ 1, 2 ], 'include ordered members');
   *
   * @name includeOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeOrderedMembers, true)
      .to.include.ordered.members(subset);
  }

  /**
   * ### .notIncludeOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a strict equality
   * check (===).
   *
   *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 1 ], 'not include ordered members');
   *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 3 ], 'not include ordered members');
   *
   * @name notIncludeOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeOrderedMembers, true)
      .to.not.include.ordered.members(subset);
  }

  /**
   * ### .includeDeepOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a deep equality
   * check.
   *
   *     assert.includeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 } ], 'include deep ordered members');
   *
   * @name includeDeepOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeDeepOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeDeepOrderedMembers, true)
      .to.include.deep.ordered.members(subset);
  }

  /**
   * ### .notIncludeDeepOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a deep equality
   * check.
   *
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { f: 5 } ], 'not include deep ordered members');
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 } ], 'not include deep ordered members');
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { c: 3 } ], 'not include deep ordered members');
   *
   * @name notIncludeDeepOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeDeepOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeDeepOrderedMembers, true)
      .to.not.include.deep.ordered.members(subset);
  }

  /**
   * ### .oneOf(inList, list, [message])
   *
   * Asserts that non-object, non-array value `inList` appears in the flat array `list`.
   *
   *     assert.oneOf(1, [ 2, 1 ], 'Not found in list');
   *
   * @name oneOf
   * @param {*} inList
   * @param {Array<*>} list
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.oneOf = function (inList, list, msg) {
    new Assertion(inList, msg, assert.oneOf, true).to.be.oneOf(list);
  }

  /**
   * ### .changes(function, object, property, [message])
   *
   * Asserts that a function changes the value of a property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 22 };
   *     assert.changes(fn, obj, 'val');
   *
   * @name changes
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changes = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changes, true).to.change(obj, prop);
  }

   /**
   * ### .changesBy(function, object, property, delta, [message])
   *
   * Asserts that a function changes the value of a property by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 2 };
   *     assert.changesBy(fn, obj, 'val', 2);
   *
   * @name changesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changesBy, true)
      .to.change(obj, prop).by(delta);
  }

   /**
   * ### .doesNotChange(function, object, property, [message])
   *
   * Asserts that a function does not change the value of a property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { console.log('foo'); };
   *     assert.doesNotChange(fn, obj, 'val');
   *
   * @name doesNotChange
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotChange = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotChange, true)
      .to.not.change(obj, prop);
  }

  /**
   * ### .changesButNotBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not change the value of a property or of a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 10 };
   *     assert.changesButNotBy(fn, obj, 'val', 5);
   *
   * @name changesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changesButNotBy, true)
      .to.change(obj, prop).but.not.by(delta);
  }

  /**
   * ### .increases(function, object, property, [message])
   *
   * Asserts that a function increases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 13 };
   *     assert.increases(fn, obj, 'val');
   *
   * @name increases
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increases = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.increases, true)
      .to.increase(obj, prop);
  }

  /**
   * ### .increasesBy(function, object, property, delta, [message])
   *
   * Asserts that a function increases a numeric object property or a function's return value by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 10 };
   *     assert.increasesBy(fn, obj, 'val', 10);
   *
   * @name increasesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increasesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.increasesBy, true)
      .to.increase(obj, prop).by(delta);
  }

  /**
   * ### .doesNotIncrease(function, object, property, [message])
   *
   * Asserts that a function does not increase a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 8 };
   *     assert.doesNotIncrease(fn, obj, 'val');
   *
   * @name doesNotIncrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotIncrease = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotIncrease, true)
      .to.not.increase(obj, prop);
  }

  /**
   * ### .increasesButNotBy(function, object, property, [message])
   *
   * Asserts that a function does not increase a numeric object property or function's return value by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 15 };
   *     assert.increasesButNotBy(fn, obj, 'val', 10);
   *
   * @name increasesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increasesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.increasesButNotBy, true)
      .to.increase(obj, prop).but.not.by(delta);
  }

  /**
   * ### .decreases(function, object, property, [message])
   *
   * Asserts that a function decreases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.decreases(fn, obj, 'val');
   *
   * @name decreases
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreases = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.decreases, true)
      .to.decrease(obj, prop);
  }

  /**
   * ### .decreasesBy(function, object, property, delta, [message])
   *
   * Asserts that a function decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val -= 5 };
   *     assert.decreasesBy(fn, obj, 'val', 5);
   *
   * @name decreasesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreasesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.decreasesBy, true)
      .to.decrease(obj, prop).by(delta);
  }

  /**
   * ### .doesNotDecrease(function, object, property, [message])
   *
   * Asserts that a function does not decreases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 15 };
   *     assert.doesNotDecrease(fn, obj, 'val');
   *
   * @name doesNotDecrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotDecrease = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotDecrease, true)
      .to.not.decrease(obj, prop);
  }

  /**
   * ### .doesNotDecreaseBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.doesNotDecreaseBy(fn, obj, 'val', 1);
   *
   * @name doesNotDecrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotDecreaseBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotDecreaseBy, true)
      .to.not.decrease(obj, prop).by(delta);
  }

  /**
   * ### .decreasesButNotBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.decreasesButNotBy(fn, obj, 'val', 1);
   *
   * @name decreasesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreasesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.decreasesButNotBy, true)
      .to.decrease(obj, prop).but.not.by(delta);
  }

  /*!
   * ### .ifError(object)
   *
   * Asserts if value is not a false value, and throws if it is a true value.
   * This is added to allow for chai to be a drop-in replacement for Node's
   * assert class.
   *
   *     var err = new Error('I am a custom error');
   *     assert.ifError(err); // Rethrows err!
   *
   * @name ifError
   * @param {Object} object
   * @namespace Assert
   * @api public
   */

  assert.ifError = function (val) {
    if (val) {
      throw(val);
    }
  };

  /**
   * ### .isExtensible(object)
   *
   * Asserts that `object` is extensible (can have new properties added to it).
   *
   *     assert.isExtensible({});
   *
   * @name isExtensible
   * @alias extensible
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isExtensible = function (obj, msg) {
    new Assertion(obj, msg, assert.isExtensible, true).to.be.extensible;
  };

  /**
   * ### .isNotExtensible(object)
   *
   * Asserts that `object` is _not_ extensible.
   *
   *     var nonExtensibleObject = Object.preventExtensions({});
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.freeze({});
   *
   *     assert.isNotExtensible(nonExtensibleObject);
   *     assert.isNotExtensible(sealedObject);
   *     assert.isNotExtensible(frozenObject);
   *
   * @name isNotExtensible
   * @alias notExtensible
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotExtensible = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotExtensible, true).to.not.be.extensible;
  };

  /**
   * ### .isSealed(object)
   *
   * Asserts that `object` is sealed (cannot have new properties added to it
   * and its existing properties cannot be removed).
   *
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.seal({});
   *
   *     assert.isSealed(sealedObject);
   *     assert.isSealed(frozenObject);
   *
   * @name isSealed
   * @alias sealed
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isSealed = function (obj, msg) {
    new Assertion(obj, msg, assert.isSealed, true).to.be.sealed;
  };

  /**
   * ### .isNotSealed(object)
   *
   * Asserts that `object` is _not_ sealed.
   *
   *     assert.isNotSealed({});
   *
   * @name isNotSealed
   * @alias notSealed
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotSealed = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotSealed, true).to.not.be.sealed;
  };

  /**
   * ### .isFrozen(object)
   *
   * Asserts that `object` is frozen (cannot have new properties added to it
   * and its existing properties cannot be modified).
   *
   *     var frozenObject = Object.freeze({});
   *     assert.frozen(frozenObject);
   *
   * @name isFrozen
   * @alias frozen
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isFrozen = function (obj, msg) {
    new Assertion(obj, msg, assert.isFrozen, true).to.be.frozen;
  };

  /**
   * ### .isNotFrozen(object)
   *
   * Asserts that `object` is _not_ frozen.
   *
   *     assert.isNotFrozen({});
   *
   * @name isNotFrozen
   * @alias notFrozen
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotFrozen = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotFrozen, true).to.not.be.frozen;
  };

  /**
   * ### .isEmpty(target)
   *
   * Asserts that the target does not contain any values.
   * For arrays and strings, it checks the `length` property.
   * For `Map` and `Set` instances, it checks the `size` property.
   * For non-function objects, it gets the count of own
   * enumerable string keys.
   *
   *     assert.isEmpty([]);
   *     assert.isEmpty('');
   *     assert.isEmpty(new Map);
   *     assert.isEmpty({});
   *
   * @name isEmpty
   * @alias empty
   * @param {Object|Array|String|Map|Set} target
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isEmpty = function(val, msg) {
    new Assertion(val, msg, assert.isEmpty, true).to.be.empty;
  };

  /**
   * ### .isNotEmpty(target)
   *
   * Asserts that the target contains values.
   * For arrays and strings, it checks the `length` property.
   * For `Map` and `Set` instances, it checks the `size` property.
   * For non-function objects, it gets the count of own
   * enumerable string keys.
   *
   *     assert.isNotEmpty([1, 2]);
   *     assert.isNotEmpty('34');
   *     assert.isNotEmpty(new Set([5, 6]));
   *     assert.isNotEmpty({ key: 7 });
   *
   * @name isNotEmpty
   * @alias notEmpty
   * @param {Object|Array|String|Map|Set} target
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotEmpty = function(val, msg) {
    new Assertion(val, msg, assert.isNotEmpty, true).to.not.be.empty;
  };

  /*!
   * Aliases.
   */

  (function alias(name, as){
    assert[as] = assert[name];
    return alias;
  })
  ('isOk', 'ok')
  ('isNotOk', 'notOk')
  ('throws', 'throw')
  ('throws', 'Throw')
  ('isExtensible', 'extensible')
  ('isNotExtensible', 'notExtensible')
  ('isSealed', 'sealed')
  ('isNotSealed', 'notSealed')
  ('isFrozen', 'frozen')
  ('isNotFrozen', 'notFrozen')
  ('isEmpty', 'empty')
  ('isNotEmpty', 'notEmpty');
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/interface/expect.js":
/*!********************************************************!*\
  !*** ./node_modules/chai/lib/chai/interface/expect.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  chai.expect = function (val, message) {
    return new chai.Assertion(val, message);
  };

  /**
   * ### .fail([message])
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure.
   *
   *     expect.fail();
   *     expect.fail("custom error message");
   *     expect.fail(1, 2);
   *     expect.fail(1, 2, "custom error message");
   *     expect.fail(1, 2, "custom error message", ">");
   *     expect.fail(1, 2, undefined, ">");
   *
   * @name fail
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @param {String} operator
   * @namespace BDD
   * @api public
   */

  chai.expect.fail = function (actual, expected, message, operator) {
    if (arguments.length < 2) {
        message = actual;
        actual = undefined;
    }

    message = message || 'expect.fail()';
    throw new chai.AssertionError(message, {
        actual: actual
      , expected: expected
      , operator: operator
    }, chai.expect.fail);
  };
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/interface/should.js":
/*!********************************************************!*\
  !*** ./node_modules/chai/lib/chai/interface/should.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  var Assertion = chai.Assertion;

  function loadShould () {
    // explicitly define this method as function as to have it's name to include as `ssfi`
    function shouldGetter() {
      if (this instanceof String
          || this instanceof Number
          || this instanceof Boolean
          || typeof Symbol === 'function' && this instanceof Symbol) {
        return new Assertion(this.valueOf(), null, shouldGetter);
      }
      return new Assertion(this, null, shouldGetter);
    }
    function shouldSetter(value) {
      // See https://github.com/chaijs/chai/issues/86: this makes
      // `whatever.should = someValue` actually set `someValue`, which is
      // especially useful for `global.should = require('chai').should()`.
      //
      // Note that we have to use [[DefineProperty]] instead of [[Put]]
      // since otherwise we would trigger this very setter!
      Object.defineProperty(this, 'should', {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    }
    // modify Object.prototype to have `should`
    Object.defineProperty(Object.prototype, 'should', {
      set: shouldSetter
      , get: shouldGetter
      , configurable: true
    });

    var should = {};

    /**
     * ### .fail([message])
     * ### .fail(actual, expected, [message], [operator])
     *
     * Throw a failure.
     *
     *     should.fail();
     *     should.fail("custom error message");
     *     should.fail(1, 2);
     *     should.fail(1, 2, "custom error message");
     *     should.fail(1, 2, "custom error message", ">");
     *     should.fail(1, 2, undefined, ">");
     *
     *
     * @name fail
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @param {String} operator
     * @namespace BDD
     * @api public
     */

    should.fail = function (actual, expected, message, operator) {
      if (arguments.length < 2) {
          message = actual;
          actual = undefined;
      }

      message = message || 'should.fail()';
      throw new chai.AssertionError(message, {
          actual: actual
        , expected: expected
        , operator: operator
      }, should.fail);
    };

    /**
     * ### .equal(actual, expected, [message])
     *
     * Asserts non-strict equality (`==`) of `actual` and `expected`.
     *
     *     should.equal(3, '3', '== coerces values to strings');
     *
     * @name equal
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @namespace Should
     * @api public
     */

    should.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.equal(val2);
    };

    /**
     * ### .throw(function, [constructor/string/regexp], [string/regexp], [message])
     *
     * Asserts that `function` will throw an error that is an instance of
     * `constructor`, or alternately that it will throw an error with message
     * matching `regexp`.
     *
     *     should.throw(fn, 'function throws a reference error');
     *     should.throw(fn, /function throws a reference error/);
     *     should.throw(fn, ReferenceError);
     *     should.throw(fn, ReferenceError, 'function throws a reference error');
     *     should.throw(fn, ReferenceError, /function throws a reference error/);
     *
     * @name throw
     * @alias Throw
     * @param {Function} function
     * @param {ErrorConstructor} constructor
     * @param {RegExp} regexp
     * @param {String} message
     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
     * @namespace Should
     * @api public
     */

    should.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.Throw(errt, errs);
    };

    /**
     * ### .exist
     *
     * Asserts that the target is neither `null` nor `undefined`.
     *
     *     var foo = 'hi';
     *
     *     should.exist(foo, 'foo exists');
     *
     * @name exist
     * @namespace Should
     * @api public
     */

    should.exist = function (val, msg) {
      new Assertion(val, msg).to.exist;
    }

    // negation
    should.not = {}

    /**
     * ### .not.equal(actual, expected, [message])
     *
     * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
     *
     *     should.not.equal(3, 4, 'these numbers are not equal');
     *
     * @name not.equal
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @namespace Should
     * @api public
     */

    should.not.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.not.equal(val2);
    };

    /**
     * ### .throw(function, [constructor/regexp], [message])
     *
     * Asserts that `function` will _not_ throw an error that is an instance of
     * `constructor`, or alternately that it will not throw an error with message
     * matching `regexp`.
     *
     *     should.not.throw(fn, Error, 'function does not throw');
     *
     * @name not.throw
     * @alias not.Throw
     * @param {Function} function
     * @param {ErrorConstructor} constructor
     * @param {RegExp} regexp
     * @param {String} message
     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
     * @namespace Should
     * @api public
     */

    should.not.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.not.Throw(errt, errs);
    };

    /**
     * ### .not.exist
     *
     * Asserts that the target is neither `null` nor `undefined`.
     *
     *     var bar = null;
     *
     *     should.not.exist(bar, 'bar does not exist');
     *
     * @name not.exist
     * @namespace Should
     * @api public
     */

    should.not.exist = function (val, msg) {
      new Assertion(val, msg).to.not.exist;
    }

    should['throw'] = should['Throw'];
    should.not['throw'] = should.not['Throw'];

    return should;
  };

  chai.should = loadShould;
  chai.Should = loadShould;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/addChainableMethod.js":
/*!****************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/addChainableMethod.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var addLengthGuard = __webpack_require__(/*! ./addLengthGuard */ "./node_modules/chai/lib/chai/utils/addLengthGuard.js");
var chai = __webpack_require__(/*! ../../chai */ "./node_modules/chai/lib/chai.js");
var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");
var proxify = __webpack_require__(/*! ./proxify */ "./node_modules/chai/lib/chai/utils/proxify.js");
var transferFlags = __webpack_require__(/*! ./transferFlags */ "./node_modules/chai/lib/chai/utils/transferFlags.js");

/*!
 * Module variables
 */

// Check whether `Object.setPrototypeOf` is supported
var canSetPrototype = typeof Object.setPrototypeOf === 'function';

// Without `Object.setPrototypeOf` support, this module will need to add properties to a function.
// However, some of functions' own props are not configurable and should be skipped.
var testFn = function() {};
var excludeNames = Object.getOwnPropertyNames(testFn).filter(function(name) {
  var propDesc = Object.getOwnPropertyDescriptor(testFn, name);

  // Note: PhantomJS 1.x includes `callee` as one of `testFn`'s own properties,
  // but then returns `undefined` as the property descriptor for `callee`. As a
  // workaround, we perform an otherwise unnecessary type-check for `propDesc`,
  // and then filter it out if it's not an object as it should be.
  if (typeof propDesc !== 'object')
    return true;

  return !propDesc.configurable;
});

// Cache `Function` properties
var call  = Function.prototype.call,
    apply = Function.prototype.apply;

/**
 * ### .addChainableMethod(ctx, name, method, chainingBehavior)
 *
 * Adds a method to an object, such that the method can also be chained.
 *
 *     utils.addChainableMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addChainableMethod('foo', fn, chainingBehavior);
 *
 * The result can then be used as both a method assertion, executing both `method` and
 * `chainingBehavior`, or as a language chain, which only executes `chainingBehavior`.
 *
 *     expect(fooStr).to.be.foo('bar');
 *     expect(fooStr).to.be.foo.equal('foo');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for `name`, when called
 * @param {Function} chainingBehavior function to be called every time the property is accessed
 * @namespace Utils
 * @name addChainableMethod
 * @api public
 */

module.exports = function addChainableMethod(ctx, name, method, chainingBehavior) {
  if (typeof chainingBehavior !== 'function') {
    chainingBehavior = function () { };
  }

  var chainableBehavior = {
      method: method
    , chainingBehavior: chainingBehavior
  };

  // save the methods so we can overwrite them later, if we need to.
  if (!ctx.__methods) {
    ctx.__methods = {};
  }
  ctx.__methods[name] = chainableBehavior;

  Object.defineProperty(ctx, name,
    { get: function chainableMethodGetter() {
        chainableBehavior.chainingBehavior.call(this);

        var chainableMethodWrapper = function () {
          // Setting the `ssfi` flag to `chainableMethodWrapper` causes this
          // function to be the starting point for removing implementation
          // frames from the stack trace of a failed assertion.
          //
          // However, we only want to use this function as the starting point if
          // the `lockSsfi` flag isn't set.
          //
          // If the `lockSsfi` flag is set, then this assertion is being
          // invoked from inside of another assertion. In this case, the `ssfi`
          // flag has already been set by the outer assertion.
          //
          // Note that overwriting a chainable method merely replaces the saved
          // methods in `ctx.__methods` instead of completely replacing the
          // overwritten assertion. Therefore, an overwriting assertion won't
          // set the `ssfi` or `lockSsfi` flags.
          if (!flag(this, 'lockSsfi')) {
            flag(this, 'ssfi', chainableMethodWrapper);
          }

          var result = chainableBehavior.method.apply(this, arguments);
          if (result !== undefined) {
            return result;
          }

          var newAssertion = new chai.Assertion();
          transferFlags(this, newAssertion);
          return newAssertion;
        };

        addLengthGuard(chainableMethodWrapper, name, true);

        // Use `Object.setPrototypeOf` if available
        if (canSetPrototype) {
          // Inherit all properties from the object by replacing the `Function` prototype
          var prototype = Object.create(this);
          // Restore the `call` and `apply` methods from `Function`
          prototype.call = call;
          prototype.apply = apply;
          Object.setPrototypeOf(chainableMethodWrapper, prototype);
        }
        // Otherwise, redefine all properties (slow!)
        else {
          var asserterNames = Object.getOwnPropertyNames(ctx);
          asserterNames.forEach(function (asserterName) {
            if (excludeNames.indexOf(asserterName) !== -1) {
              return;
            }

            var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
            Object.defineProperty(chainableMethodWrapper, asserterName, pd);
          });
        }

        transferFlags(this, chainableMethodWrapper);
        return proxify(chainableMethodWrapper);
      }
    , configurable: true
  });
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/addLengthGuard.js":
/*!************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/addLengthGuard.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var fnLengthDesc = Object.getOwnPropertyDescriptor(function () {}, 'length');

/*!
 * Chai - addLengthGuard utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .addLengthGuard(fn, assertionName, isChainable)
 *
 * Define `length` as a getter on the given uninvoked method assertion. The
 * getter acts as a guard against chaining `length` directly off of an uninvoked
 * method assertion, which is a problem because it references `function`'s
 * built-in `length` property instead of Chai's `length` assertion. When the
 * getter catches the user making this mistake, it throws an error with a
 * helpful message.
 *
 * There are two ways in which this mistake can be made. The first way is by
 * chaining the `length` assertion directly off of an uninvoked chainable
 * method. In this case, Chai suggests that the user use `lengthOf` instead. The
 * second way is by chaining the `length` assertion directly off of an uninvoked
 * non-chainable method. Non-chainable methods must be invoked prior to
 * chaining. In this case, Chai suggests that the user consult the docs for the
 * given assertion.
 *
 * If the `length` property of functions is unconfigurable, then return `fn`
 * without modification.
 *
 * Note that in ES6, the function's `length` property is configurable, so once
 * support for legacy environments is dropped, Chai's `length` property can
 * replace the built-in function's `length` property, and this length guard will
 * no longer be necessary. In the mean time, maintaining consistency across all
 * environments is the priority.
 *
 * @param {Function} fn
 * @param {String} assertionName
 * @param {Boolean} isChainable
 * @namespace Utils
 * @name addLengthGuard
 */

module.exports = function addLengthGuard (fn, assertionName, isChainable) {
  if (!fnLengthDesc.configurable) return fn;

  Object.defineProperty(fn, 'length', {
    get: function () {
      if (isChainable) {
        throw Error('Invalid Chai property: ' + assertionName + '.length. Due' +
          ' to a compatibility issue, "length" cannot directly follow "' +
          assertionName + '". Use "' + assertionName + '.lengthOf" instead.');
      }

      throw Error('Invalid Chai property: ' + assertionName + '.length. See' +
        ' docs for proper usage of "' + assertionName + '".');
    }
  });

  return fn;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/addMethod.js":
/*!*******************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/addMethod.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var addLengthGuard = __webpack_require__(/*! ./addLengthGuard */ "./node_modules/chai/lib/chai/utils/addLengthGuard.js");
var chai = __webpack_require__(/*! ../../chai */ "./node_modules/chai/lib/chai.js");
var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");
var proxify = __webpack_require__(/*! ./proxify */ "./node_modules/chai/lib/chai/utils/proxify.js");
var transferFlags = __webpack_require__(/*! ./transferFlags */ "./node_modules/chai/lib/chai/utils/transferFlags.js");

/**
 * ### .addMethod(ctx, name, method)
 *
 * Adds a method to the prototype of an object.
 *
 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(fooStr).to.be.foo('bar');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for name
 * @namespace Utils
 * @name addMethod
 * @api public
 */

module.exports = function addMethod(ctx, name, method) {
  var methodWrapper = function () {
    // Setting the `ssfi` flag to `methodWrapper` causes this function to be the
    // starting point for removing implementation frames from the stack trace of
    // a failed assertion.
    //
    // However, we only want to use this function as the starting point if the
    // `lockSsfi` flag isn't set.
    //
    // If the `lockSsfi` flag is set, then either this assertion has been
    // overwritten by another assertion, or this assertion is being invoked from
    // inside of another assertion. In the first case, the `ssfi` flag has
    // already been set by the overwriting assertion. In the second case, the
    // `ssfi` flag has already been set by the outer assertion.
    if (!flag(this, 'lockSsfi')) {
      flag(this, 'ssfi', methodWrapper);
    }

    var result = method.apply(this, arguments);
    if (result !== undefined)
      return result;

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };

  addLengthGuard(methodWrapper, name, false);
  ctx[name] = proxify(methodWrapper, name);
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/addProperty.js":
/*!*********************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/addProperty.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var chai = __webpack_require__(/*! ../../chai */ "./node_modules/chai/lib/chai.js");
var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");
var isProxyEnabled = __webpack_require__(/*! ./isProxyEnabled */ "./node_modules/chai/lib/chai/utils/isProxyEnabled.js");
var transferFlags = __webpack_require__(/*! ./transferFlags */ "./node_modules/chai/lib/chai/utils/transferFlags.js");

/**
 * ### .addProperty(ctx, name, getter)
 *
 * Adds a property to the prototype of an object.
 *
 *     utils.addProperty(chai.Assertion.prototype, 'foo', function () {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.instanceof(Foo);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.foo;
 *
 * @param {Object} ctx object to which the property is added
 * @param {String} name of property to add
 * @param {Function} getter function to be used for name
 * @namespace Utils
 * @name addProperty
 * @api public
 */

module.exports = function addProperty(ctx, name, getter) {
  getter = getter === undefined ? function () {} : getter;

  Object.defineProperty(ctx, name,
    { get: function propertyGetter() {
        // Setting the `ssfi` flag to `propertyGetter` causes this function to
        // be the starting point for removing implementation frames from the
        // stack trace of a failed assertion.
        //
        // However, we only want to use this function as the starting point if
        // the `lockSsfi` flag isn't set and proxy protection is disabled.
        //
        // If the `lockSsfi` flag is set, then either this assertion has been
        // overwritten by another assertion, or this assertion is being invoked
        // from inside of another assertion. In the first case, the `ssfi` flag
        // has already been set by the overwriting assertion. In the second
        // case, the `ssfi` flag has already been set by the outer assertion.
        //
        // If proxy protection is enabled, then the `ssfi` flag has already been
        // set by the proxy getter.
        if (!isProxyEnabled() && !flag(this, 'lockSsfi')) {
          flag(this, 'ssfi', propertyGetter);
        }

        var result = getter.call(this);
        if (result !== undefined)
          return result;

        var newAssertion = new chai.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }
    , configurable: true
  });
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/compareByInspect.js":
/*!**************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/compareByInspect.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - compareByInspect utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var inspect = __webpack_require__(/*! ./inspect */ "./node_modules/chai/lib/chai/utils/inspect.js");

/**
 * ### .compareByInspect(mixed, mixed)
 *
 * To be used as a compareFunction with Array.prototype.sort. Compares elements
 * using inspect instead of default behavior of using toString so that Symbols
 * and objects with irregular/missing toString can still be sorted without a
 * TypeError.
 *
 * @param {Mixed} first element to compare
 * @param {Mixed} second element to compare
 * @returns {Number} -1 if 'a' should come before 'b'; otherwise 1
 * @name compareByInspect
 * @namespace Utils
 * @api public
 */

module.exports = function compareByInspect(a, b) {
  return inspect(a) < inspect(b) ? -1 : 1;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/expectTypes.js":
/*!*********************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/expectTypes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .expectTypes(obj, types)
 *
 * Ensures that the object being tested against is of a valid type.
 *
 *     utils.expectTypes(this, ['array', 'object', 'string']);
 *
 * @param {Mixed} obj constructed Assertion
 * @param {Array} type A list of allowed types for this assertion
 * @namespace Utils
 * @name expectTypes
 * @api public
 */

var AssertionError = __webpack_require__(/*! assertion-error */ "./node_modules/assertion-error/index.js");
var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");
var type = __webpack_require__(/*! type-detect */ "./node_modules/type-detect/type-detect.js");

module.exports = function expectTypes(obj, types) {
  var flagMsg = flag(obj, 'message');
  var ssfi = flag(obj, 'ssfi');

  flagMsg = flagMsg ? flagMsg + ': ' : '';

  obj = flag(obj, 'object');
  types = types.map(function (t) { return t.toLowerCase(); });
  types.sort();

  // Transforms ['lorem', 'ipsum'] into 'a lorem, or an ipsum'
  var str = types.map(function (t, index) {
    var art = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(t.charAt(0)) ? 'an' : 'a';
    var or = types.length > 1 && index === types.length - 1 ? 'or ' : '';
    return or + art + ' ' + t;
  }).join(', ');

  var objType = type(obj).toLowerCase();

  if (!types.some(function (expected) { return objType === expected; })) {
    throw new AssertionError(
      flagMsg + 'object tested must be ' + str + ', but ' + objType + ' given',
      undefined,
      ssfi
    );
  }
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/flag.js":
/*!**************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/flag.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .flag(object, key, [value])
 *
 * Get or set a flag value on an object. If a
 * value is provided it will be set, else it will
 * return the currently set value or `undefined` if
 * the value is not set.
 *
 *     utils.flag(this, 'foo', 'bar'); // setter
 *     utils.flag(this, 'foo'); // getter, returns `bar`
 *
 * @param {Object} object constructed Assertion
 * @param {String} key
 * @param {Mixed} value (optional)
 * @namespace Utils
 * @name flag
 * @api private
 */

module.exports = function flag(obj, key, value) {
  var flags = obj.__flags || (obj.__flags = Object.create(null));
  if (arguments.length === 3) {
    flags[key] = value;
  } else {
    return flags[key];
  }
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/getActual.js":
/*!*******************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/getActual.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Chai - getActual utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getActual(object, [actual])
 *
 * Returns the `actual` value for an Assertion.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name getActual
 */

module.exports = function getActual(obj, args) {
  return args.length > 4 ? args[4] : obj._obj;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/getEnumerableProperties.js":
/*!*********************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/getEnumerableProperties.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Chai - getEnumerableProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getEnumerableProperties(object)
 *
 * This allows the retrieval of enumerable property names of an object,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getEnumerableProperties
 * @api public
 */

module.exports = function getEnumerableProperties(object) {
  var result = [];
  for (var name in object) {
    result.push(name);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/getMessage.js":
/*!********************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/getMessage.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js")
  , getActual = __webpack_require__(/*! ./getActual */ "./node_modules/chai/lib/chai/utils/getActual.js")
  , objDisplay = __webpack_require__(/*! ./objDisplay */ "./node_modules/chai/lib/chai/utils/objDisplay.js");

/**
 * ### .getMessage(object, message, negateMessage)
 *
 * Construct the error message based on flags
 * and template tags. Template tags will return
 * a stringified inspection of the object referenced.
 *
 * Message template tags:
 * - `#{this}` current asserted object
 * - `#{act}` actual value
 * - `#{exp}` expected value
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name getMessage
 * @api public
 */

module.exports = function getMessage(obj, args) {
  var negate = flag(obj, 'negate')
    , val = flag(obj, 'object')
    , expected = args[3]
    , actual = getActual(obj, args)
    , msg = negate ? args[2] : args[1]
    , flagMsg = flag(obj, 'message');

  if(typeof msg === "function") msg = msg();
  msg = msg || '';
  msg = msg
    .replace(/#\{this\}/g, function () { return objDisplay(val); })
    .replace(/#\{act\}/g, function () { return objDisplay(actual); })
    .replace(/#\{exp\}/g, function () { return objDisplay(expected); });

  return flagMsg ? flagMsg + ': ' + msg : msg;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/getOwnEnumerableProperties.js":
/*!************************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/getOwnEnumerableProperties.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - getOwnEnumerableProperties utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var getOwnEnumerablePropertySymbols = __webpack_require__(/*! ./getOwnEnumerablePropertySymbols */ "./node_modules/chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js");

/**
 * ### .getOwnEnumerableProperties(object)
 *
 * This allows the retrieval of directly-owned enumerable property names and
 * symbols of an object. This function is necessary because Object.keys only
 * returns enumerable property names, not enumerable property symbols.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getOwnEnumerableProperties
 * @api public
 */

module.exports = function getOwnEnumerableProperties(obj) {
  return Object.keys(obj).concat(getOwnEnumerablePropertySymbols(obj));
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Chai - getOwnEnumerablePropertySymbols utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getOwnEnumerablePropertySymbols(object)
 *
 * This allows the retrieval of directly-owned enumerable property symbols of an
 * object. This function is necessary because Object.getOwnPropertySymbols
 * returns both enumerable and non-enumerable property symbols.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getOwnEnumerablePropertySymbols
 * @api public
 */

module.exports = function getOwnEnumerablePropertySymbols(obj) {
  if (typeof Object.getOwnPropertySymbols !== 'function') return [];

  return Object.getOwnPropertySymbols(obj).filter(function (sym) {
    return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
  });
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/getProperties.js":
/*!***********************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/getProperties.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getProperties(object)
 *
 * This allows the retrieval of property names of an object, enumerable or not,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getProperties
 * @api public
 */

module.exports = function getProperties(object) {
  var result = Object.getOwnPropertyNames(object);

  function addProperty(property) {
    if (result.indexOf(property) === -1) {
      result.push(property);
    }
  }

  var proto = Object.getPrototypeOf(object);
  while (proto !== null) {
    Object.getOwnPropertyNames(proto).forEach(addProperty);
    proto = Object.getPrototypeOf(proto);
  }

  return result;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/index.js":
/*!***************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Dependencies that are used for multiple exports are required here only once
 */

var pathval = __webpack_require__(/*! pathval */ "./node_modules/pathval/index.js");

/*!
 * test utility
 */

exports.test = __webpack_require__(/*! ./test */ "./node_modules/chai/lib/chai/utils/test.js");

/*!
 * type utility
 */

exports.type = __webpack_require__(/*! type-detect */ "./node_modules/type-detect/type-detect.js");

/*!
 * expectTypes utility
 */
exports.expectTypes = __webpack_require__(/*! ./expectTypes */ "./node_modules/chai/lib/chai/utils/expectTypes.js");

/*!
 * message utility
 */

exports.getMessage = __webpack_require__(/*! ./getMessage */ "./node_modules/chai/lib/chai/utils/getMessage.js");

/*!
 * actual utility
 */

exports.getActual = __webpack_require__(/*! ./getActual */ "./node_modules/chai/lib/chai/utils/getActual.js");

/*!
 * Inspect util
 */

exports.inspect = __webpack_require__(/*! ./inspect */ "./node_modules/chai/lib/chai/utils/inspect.js");

/*!
 * Object Display util
 */

exports.objDisplay = __webpack_require__(/*! ./objDisplay */ "./node_modules/chai/lib/chai/utils/objDisplay.js");

/*!
 * Flag utility
 */

exports.flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");

/*!
 * Flag transferring utility
 */

exports.transferFlags = __webpack_require__(/*! ./transferFlags */ "./node_modules/chai/lib/chai/utils/transferFlags.js");

/*!
 * Deep equal utility
 */

exports.eql = __webpack_require__(/*! deep-eql */ "./node_modules/deep-eql/index.js");

/*!
 * Deep path info
 */

exports.getPathInfo = pathval.getPathInfo;

/*!
 * Check if a property exists
 */

exports.hasProperty = pathval.hasProperty;

/*!
 * Function name
 */

exports.getName = __webpack_require__(/*! get-func-name */ "./node_modules/get-func-name/index.js");

/*!
 * add Property
 */

exports.addProperty = __webpack_require__(/*! ./addProperty */ "./node_modules/chai/lib/chai/utils/addProperty.js");

/*!
 * add Method
 */

exports.addMethod = __webpack_require__(/*! ./addMethod */ "./node_modules/chai/lib/chai/utils/addMethod.js");

/*!
 * overwrite Property
 */

exports.overwriteProperty = __webpack_require__(/*! ./overwriteProperty */ "./node_modules/chai/lib/chai/utils/overwriteProperty.js");

/*!
 * overwrite Method
 */

exports.overwriteMethod = __webpack_require__(/*! ./overwriteMethod */ "./node_modules/chai/lib/chai/utils/overwriteMethod.js");

/*!
 * Add a chainable method
 */

exports.addChainableMethod = __webpack_require__(/*! ./addChainableMethod */ "./node_modules/chai/lib/chai/utils/addChainableMethod.js");

/*!
 * Overwrite chainable method
 */

exports.overwriteChainableMethod = __webpack_require__(/*! ./overwriteChainableMethod */ "./node_modules/chai/lib/chai/utils/overwriteChainableMethod.js");

/*!
 * Compare by inspect method
 */

exports.compareByInspect = __webpack_require__(/*! ./compareByInspect */ "./node_modules/chai/lib/chai/utils/compareByInspect.js");

/*!
 * Get own enumerable property symbols method
 */

exports.getOwnEnumerablePropertySymbols = __webpack_require__(/*! ./getOwnEnumerablePropertySymbols */ "./node_modules/chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js");

/*!
 * Get own enumerable properties method
 */

exports.getOwnEnumerableProperties = __webpack_require__(/*! ./getOwnEnumerableProperties */ "./node_modules/chai/lib/chai/utils/getOwnEnumerableProperties.js");

/*!
 * Checks error against a given set of criteria
 */

exports.checkError = __webpack_require__(/*! check-error */ "./node_modules/check-error/index.js");

/*!
 * Proxify util
 */

exports.proxify = __webpack_require__(/*! ./proxify */ "./node_modules/chai/lib/chai/utils/proxify.js");

/*!
 * addLengthGuard util
 */

exports.addLengthGuard = __webpack_require__(/*! ./addLengthGuard */ "./node_modules/chai/lib/chai/utils/addLengthGuard.js");

/*!
 * isProxyEnabled helper
 */

exports.isProxyEnabled = __webpack_require__(/*! ./isProxyEnabled */ "./node_modules/chai/lib/chai/utils/isProxyEnabled.js");

/*!
 * isNaN method
 */

exports.isNaN = __webpack_require__(/*! ./isNaN */ "./node_modules/chai/lib/chai/utils/isNaN.js");


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/inspect.js":
/*!*****************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/inspect.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// This is (almost) directly from Node.js utils
// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js

var getName = __webpack_require__(/*! get-func-name */ "./node_modules/get-func-name/index.js");
var getProperties = __webpack_require__(/*! ./getProperties */ "./node_modules/chai/lib/chai/utils/getProperties.js");
var getEnumerableProperties = __webpack_require__(/*! ./getEnumerableProperties */ "./node_modules/chai/lib/chai/utils/getEnumerableProperties.js");
var config = __webpack_require__(/*! ../config */ "./node_modules/chai/lib/chai/config.js");

module.exports = inspect;

/**
 * ### .inspect(obj, [showHidden], [depth], [colors])
 *
 * Echoes the value of a value. Tries to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)
 *    properties of objects. Default is false.
 * @param {Number} depth Depth in which to descend in object. Default is 2.
 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the
 *    output. Default is false (no coloring).
 * @namespace Utils
 * @name inspect
 */
function inspect(obj, showHidden, depth, colors) {
  var ctx = {
    showHidden: showHidden,
    seen: [],
    stylize: function (str) { return str; }
  };
  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
}

// Returns true if object is a DOM element.
var isDOMElement = function (object) {
  if (typeof HTMLElement === 'object') {
    return object instanceof HTMLElement;
  } else {
    return object &&
      typeof object === 'object' &&
      'nodeType' in object &&
      object.nodeType === 1 &&
      typeof object.nodeName === 'string';
  }
};

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (value && typeof value.inspect === 'function' &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (typeof ret !== 'string') {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // If this is a DOM element, try to get the outer HTML.
  if (isDOMElement(value)) {
    if ('outerHTML' in value) {
      return value.outerHTML;
      // This value does not have an outerHTML attribute,
      //   it could still be an XML element
    } else {
      // Attempt to serialize it
      try {
        if (document.xmlVersion) {
          var xmlSerializer = new XMLSerializer();
          return xmlSerializer.serializeToString(value);
        } else {
          // Firefox 11- do not support outerHTML
          //   It does, however, support innerHTML
          //   Use the following to render the element
          var ns = "http://www.w3.org/1999/xhtml";
          var container = document.createElementNS(ns, '_');

          container.appendChild(value.cloneNode(false));
          var html = container.innerHTML
            .replace('><', '>' + value.innerHTML + '<');
          container.innerHTML = '';
          return html;
        }
      } catch (err) {
        // This could be a non-native DOM implementation,
        //   continue with the normal flow:
        //   printing the element as if it is an object.
      }
    }
  }

  // Look up the keys of the object.
  var visibleKeys = getEnumerableProperties(value);
  var keys = ctx.showHidden ? getProperties(value) : visibleKeys;

  var name, nameSuffix;

  // Some type of object without properties can be shortcut.
  // In IE, errors have a single `stack` property, or if they are vanilla `Error`,
  // a `stack` plus `description` property; ignore those for consistency.
  if (keys.length === 0 || (isError(value) && (
      (keys.length === 1 && keys[0] === 'stack') ||
      (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')
     ))) {
    if (typeof value === 'function') {
      name = getName(value);
      nameSuffix = name ? ': ' + name : '';
      return ctx.stylize('[Function' + nameSuffix + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = ''
    , array = false
    , typedArray = false
    , braces = ['{', '}'];

  if (isTypedArray(value)) {
    typedArray = true;
    braces = ['[', ']'];
  }

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (typeof value === 'function') {
    name = getName(value);
    nameSuffix = name ? ': ' + name : '';
    base = ' [Function' + nameSuffix + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    return formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else if (typedArray) {
    return formatTypedArray(value);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  switch (typeof value) {
    case 'undefined':
      return ctx.stylize('undefined', 'undefined');

    case 'string':
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');

    case 'number':
      if (value === 0 && (1/value) === -Infinity) {
        return ctx.stylize('-0', 'number');
      }
      return ctx.stylize('' + value, 'number');

    case 'boolean':
      return ctx.stylize('' + value, 'boolean');

    case 'symbol':
      return ctx.stylize(value.toString(), 'symbol');
  }
  // For some reason typeof null is "object", so special case here.
  if (value === null) {
    return ctx.stylize('null', 'null');
  }
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}

function formatTypedArray(value) {
  var str = '[ ';

  for (var i = 0; i < value.length; ++i) {
    if (str.length >= config.truncateThreshold - 7) {
      str += '...';
      break;
    }
    str += value[i] + ', ';
  }
  str += ' ]';

  // Removing trailing `, ` if the array was not truncated
  if (str.indexOf(',  ]') !== -1) {
    str = str.replace(',  ]', ' ]');
  }

  return str;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name;
  var propDescriptor = Object.getOwnPropertyDescriptor(value, key);
  var str;

  if (propDescriptor) {
    if (propDescriptor.get) {
      if (propDescriptor.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (propDescriptor.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
  }
  if (visibleKeys.indexOf(key) < 0) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(value[key]) < 0) {
      if (recurseTimes === null) {
        str = formatValue(ctx, value[key], null);
      } else {
        str = formatValue(ctx, value[key], recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (typeof name === 'undefined') {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var length = output.reduce(function(prev, cur) {
    return prev + cur.length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

function isTypedArray(ar) {
  // Unfortunately there's no way to check if an object is a TypedArray
  // We have to check if it's one of these types
  return (typeof ar === 'object' && /\w+Array]$/.test(objectToString(ar)));
}

function isArray(ar) {
  return Array.isArray(ar) ||
         (typeof ar === 'object' && objectToString(ar) === '[object Array]');
}

function isRegExp(re) {
  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
}

function isDate(d) {
  return typeof d === 'object' && objectToString(d) === '[object Date]';
}

function isError(e) {
  return typeof e === 'object' && objectToString(e) === '[object Error]';
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/isNaN.js":
/*!***************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/isNaN.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Chai - isNaN utility
 * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
 * MIT Licensed
 */

/**
 * ### .isNaN(value)
 *
 * Checks if the given value is NaN or not.
 *
 *     utils.isNaN(NaN); // true
 *
 * @param {Value} The value which has to be checked if it is NaN
 * @name isNaN
 * @api private
 */

function isNaN(value) {
  // Refer http://www.ecma-international.org/ecma-262/6.0/#sec-isnan-number
  // section's NOTE.
  return value !== value;
}

// If ECMAScript 6's Number.isNaN is present, prefer that.
module.exports = Number.isNaN || isNaN;


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/isProxyEnabled.js":
/*!************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/isProxyEnabled.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(/*! ../config */ "./node_modules/chai/lib/chai/config.js");

/*!
 * Chai - isProxyEnabled helper
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .isProxyEnabled()
 *
 * Helper function to check if Chai's proxy protection feature is enabled. If
 * proxies are unsupported or disabled via the user's Chai config, then return
 * false. Otherwise, return true.
 *
 * @namespace Utils
 * @name isProxyEnabled
 */

module.exports = function isProxyEnabled() {
  return config.useProxy &&
    typeof Proxy !== 'undefined' &&
    typeof Reflect !== 'undefined';
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/objDisplay.js":
/*!********************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/objDisplay.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var inspect = __webpack_require__(/*! ./inspect */ "./node_modules/chai/lib/chai/utils/inspect.js");
var config = __webpack_require__(/*! ../config */ "./node_modules/chai/lib/chai/config.js");

/**
 * ### .objDisplay(object)
 *
 * Determines if an object or an array matches
 * criteria to be inspected in-line for error
 * messages or should be truncated.
 *
 * @param {Mixed} javascript object to inspect
 * @name objDisplay
 * @namespace Utils
 * @api public
 */

module.exports = function objDisplay(obj) {
  var str = inspect(obj)
    , type = Object.prototype.toString.call(obj);

  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
    if (type === '[object Function]') {
      return !obj.name || obj.name === ''
        ? '[Function]'
        : '[Function: ' + obj.name + ']';
    } else if (type === '[object Array]') {
      return '[ Array(' + obj.length + ') ]';
    } else if (type === '[object Object]') {
      var keys = Object.keys(obj)
        , kstr = keys.length > 2
          ? keys.splice(0, 2).join(', ') + ', ...'
          : keys.join(', ');
      return '{ Object (' + kstr + ') }';
    } else {
      return str;
    }
  } else {
    return str;
  }
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/overwriteChainableMethod.js":
/*!**********************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/overwriteChainableMethod.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var chai = __webpack_require__(/*! ../../chai */ "./node_modules/chai/lib/chai.js");
var transferFlags = __webpack_require__(/*! ./transferFlags */ "./node_modules/chai/lib/chai/utils/transferFlags.js");

/**
 * ### .overwriteChainableMethod(ctx, name, method, chainingBehavior)
 *
 * Overwrites an already existing chainable method
 * and provides access to the previous function or
 * property.  Must return functions to be used for
 * name.
 *
 *     utils.overwriteChainableMethod(chai.Assertion.prototype, 'lengthOf',
 *       function (_super) {
 *       }
 *     , function (_super) {
 *       }
 *     );
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteChainableMethod('foo', fn, fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.have.lengthOf(3);
 *     expect(myFoo).to.have.lengthOf.above(3);
 *
 * @param {Object} ctx object whose method / property is to be overwritten
 * @param {String} name of method / property to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @param {Function} chainingBehavior function that returns a function to be used for property
 * @namespace Utils
 * @name overwriteChainableMethod
 * @api public
 */

module.exports = function overwriteChainableMethod(ctx, name, method, chainingBehavior) {
  var chainableBehavior = ctx.__methods[name];

  var _chainingBehavior = chainableBehavior.chainingBehavior;
  chainableBehavior.chainingBehavior = function overwritingChainableMethodGetter() {
    var result = chainingBehavior(_chainingBehavior).call(this);
    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };

  var _method = chainableBehavior.method;
  chainableBehavior.method = function overwritingChainableMethodWrapper() {
    var result = method(_method).apply(this, arguments);
    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/overwriteMethod.js":
/*!*************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/overwriteMethod.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var addLengthGuard = __webpack_require__(/*! ./addLengthGuard */ "./node_modules/chai/lib/chai/utils/addLengthGuard.js");
var chai = __webpack_require__(/*! ../../chai */ "./node_modules/chai/lib/chai.js");
var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");
var proxify = __webpack_require__(/*! ./proxify */ "./node_modules/chai/lib/chai/utils/proxify.js");
var transferFlags = __webpack_require__(/*! ./transferFlags */ "./node_modules/chai/lib/chai/utils/transferFlags.js");

/**
 * ### .overwriteMethod(ctx, name, fn)
 *
 * Overwrites an already existing method and provides
 * access to previous function. Must return function
 * to be used for name.
 *
 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {
 *       return function (str) {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.value).to.equal(str);
 *         } else {
 *           _super.apply(this, arguments);
 *         }
 *       }
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.equal('bar');
 *
 * @param {Object} ctx object whose method is to be overwritten
 * @param {String} name of method to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @namespace Utils
 * @name overwriteMethod
 * @api public
 */

module.exports = function overwriteMethod(ctx, name, method) {
  var _method = ctx[name]
    , _super = function () {
      throw new Error(name + ' is not a function');
    };

  if (_method && 'function' === typeof _method)
    _super = _method;

  var overwritingMethodWrapper = function () {
    // Setting the `ssfi` flag to `overwritingMethodWrapper` causes this
    // function to be the starting point for removing implementation frames from
    // the stack trace of a failed assertion.
    //
    // However, we only want to use this function as the starting point if the
    // `lockSsfi` flag isn't set.
    //
    // If the `lockSsfi` flag is set, then either this assertion has been
    // overwritten by another assertion, or this assertion is being invoked from
    // inside of another assertion. In the first case, the `ssfi` flag has
    // already been set by the overwriting assertion. In the second case, the
    // `ssfi` flag has already been set by the outer assertion.
    if (!flag(this, 'lockSsfi')) {
      flag(this, 'ssfi', overwritingMethodWrapper);
    }

    // Setting the `lockSsfi` flag to `true` prevents the overwritten assertion
    // from changing the `ssfi` flag. By this point, the `ssfi` flag is already
    // set to the correct starting point for this assertion.
    var origLockSsfi = flag(this, 'lockSsfi');
    flag(this, 'lockSsfi', true);
    var result = method(_super).apply(this, arguments);
    flag(this, 'lockSsfi', origLockSsfi);

    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  }

  addLengthGuard(overwritingMethodWrapper, name, false);
  ctx[name] = proxify(overwritingMethodWrapper, name);
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/overwriteProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/overwriteProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var chai = __webpack_require__(/*! ../../chai */ "./node_modules/chai/lib/chai.js");
var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");
var isProxyEnabled = __webpack_require__(/*! ./isProxyEnabled */ "./node_modules/chai/lib/chai/utils/isProxyEnabled.js");
var transferFlags = __webpack_require__(/*! ./transferFlags */ "./node_modules/chai/lib/chai/utils/transferFlags.js");

/**
 * ### .overwriteProperty(ctx, name, fn)
 *
 * Overwrites an already existing property getter and provides
 * access to previous value. Must return function to use as getter.
 *
 *     utils.overwriteProperty(chai.Assertion.prototype, 'ok', function (_super) {
 *       return function () {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.name).to.equal('bar');
 *         } else {
 *           _super.call(this);
 *         }
 *       }
 *     });
 *
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.ok;
 *
 * @param {Object} ctx object whose property is to be overwritten
 * @param {String} name of property to overwrite
 * @param {Function} getter function that returns a getter function to be used for name
 * @namespace Utils
 * @name overwriteProperty
 * @api public
 */

module.exports = function overwriteProperty(ctx, name, getter) {
  var _get = Object.getOwnPropertyDescriptor(ctx, name)
    , _super = function () {};

  if (_get && 'function' === typeof _get.get)
    _super = _get.get

  Object.defineProperty(ctx, name,
    { get: function overwritingPropertyGetter() {
        // Setting the `ssfi` flag to `overwritingPropertyGetter` causes this
        // function to be the starting point for removing implementation frames
        // from the stack trace of a failed assertion.
        //
        // However, we only want to use this function as the starting point if
        // the `lockSsfi` flag isn't set and proxy protection is disabled.
        //
        // If the `lockSsfi` flag is set, then either this assertion has been
        // overwritten by another assertion, or this assertion is being invoked
        // from inside of another assertion. In the first case, the `ssfi` flag
        // has already been set by the overwriting assertion. In the second
        // case, the `ssfi` flag has already been set by the outer assertion.
        //
        // If proxy protection is enabled, then the `ssfi` flag has already been
        // set by the proxy getter.
        if (!isProxyEnabled() && !flag(this, 'lockSsfi')) {
          flag(this, 'ssfi', overwritingPropertyGetter);
        }

        // Setting the `lockSsfi` flag to `true` prevents the overwritten
        // assertion from changing the `ssfi` flag. By this point, the `ssfi`
        // flag is already set to the correct starting point for this assertion.
        var origLockSsfi = flag(this, 'lockSsfi');
        flag(this, 'lockSsfi', true);
        var result = getter(_super).call(this);
        flag(this, 'lockSsfi', origLockSsfi);

        if (result !== undefined) {
          return result;
        }

        var newAssertion = new chai.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }
    , configurable: true
  });
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/proxify.js":
/*!*****************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/proxify.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(/*! ../config */ "./node_modules/chai/lib/chai/config.js");
var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");
var getProperties = __webpack_require__(/*! ./getProperties */ "./node_modules/chai/lib/chai/utils/getProperties.js");
var isProxyEnabled = __webpack_require__(/*! ./isProxyEnabled */ "./node_modules/chai/lib/chai/utils/isProxyEnabled.js");

/*!
 * Chai - proxify utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .proxify(object)
 *
 * Return a proxy of given object that throws an error when a non-existent
 * property is read. By default, the root cause is assumed to be a misspelled
 * property, and thus an attempt is made to offer a reasonable suggestion from
 * the list of existing properties. However, if a nonChainableMethodName is
 * provided, then the root cause is instead a failure to invoke a non-chainable
 * method prior to reading the non-existent property.
 *
 * If proxies are unsupported or disabled via the user's Chai config, then
 * return object without modification.
 *
 * @param {Object} obj
 * @param {String} nonChainableMethodName
 * @namespace Utils
 * @name proxify
 */

var builtins = ['__flags', '__methods', '_obj', 'assert'];

module.exports = function proxify(obj, nonChainableMethodName) {
  if (!isProxyEnabled()) return obj;

  return new Proxy(obj, {
    get: function proxyGetter(target, property) {
      // This check is here because we should not throw errors on Symbol properties
      // such as `Symbol.toStringTag`.
      // The values for which an error should be thrown can be configured using
      // the `config.proxyExcludedKeys` setting.
      if (typeof property === 'string' &&
          config.proxyExcludedKeys.indexOf(property) === -1 &&
          !Reflect.has(target, property)) {
        // Special message for invalid property access of non-chainable methods.
        if (nonChainableMethodName) {
          throw Error('Invalid Chai property: ' + nonChainableMethodName + '.' +
            property + '. See docs for proper usage of "' +
            nonChainableMethodName + '".');
        }

        // If the property is reasonably close to an existing Chai property,
        // suggest that property to the user. Only suggest properties with a
        // distance less than 4.
        var suggestion = null;
        var suggestionDistance = 4;
        getProperties(target).forEach(function(prop) {
          if (
            !Object.prototype.hasOwnProperty(prop) &&
            builtins.indexOf(prop) === -1
          ) {
            var dist = stringDistanceCapped(
              property,
              prop,
              suggestionDistance
            );
            if (dist < suggestionDistance) {
              suggestion = prop;
              suggestionDistance = dist;
            }
          }
        });

        if (suggestion !== null) {
          throw Error('Invalid Chai property: ' + property +
            '. Did you mean "' + suggestion + '"?');
        } else {
          throw Error('Invalid Chai property: ' + property);
        }
      }

      // Use this proxy getter as the starting point for removing implementation
      // frames from the stack trace of a failed assertion. For property
      // assertions, this prevents the proxy getter from showing up in the stack
      // trace since it's invoked before the property getter. For method and
      // chainable method assertions, this flag will end up getting changed to
      // the method wrapper, which is good since this frame will no longer be in
      // the stack once the method is invoked. Note that Chai builtin assertion
      // properties such as `__flags` are skipped since this is only meant to
      // capture the starting point of an assertion. This step is also skipped
      // if the `lockSsfi` flag is set, thus indicating that this assertion is
      // being called from within another assertion. In that case, the `ssfi`
      // flag is already set to the outer assertion's starting point.
      if (builtins.indexOf(property) === -1 && !flag(target, 'lockSsfi')) {
        flag(target, 'ssfi', proxyGetter);
      }

      return Reflect.get(target, property);
    }
  });
};

/**
 * # stringDistanceCapped(strA, strB, cap)
 * Return the Levenshtein distance between two strings, but no more than cap.
 * @param {string} strA
 * @param {string} strB
 * @param {number} number
 * @return {number} min(string distance between strA and strB, cap)
 * @api private
 */

function stringDistanceCapped(strA, strB, cap) {
  if (Math.abs(strA.length - strB.length) >= cap) {
    return cap;
  }

  var memo = [];
  // `memo` is a two-dimensional array containing distances.
  // memo[i][j] is the distance between strA.slice(0, i) and
  // strB.slice(0, j).
  for (var i = 0; i <= strA.length; i++) {
    memo[i] = Array(strB.length + 1).fill(0);
    memo[i][0] = i;
  }
  for (var j = 0; j < strB.length; j++) {
    memo[0][j] = j;
  }

  for (var i = 1; i <= strA.length; i++) {
    var ch = strA.charCodeAt(i - 1);
    for (var j = 1; j <= strB.length; j++) {
      if (Math.abs(i - j) >= cap) {
        memo[i][j] = cap;
        continue;
      }
      memo[i][j] = Math.min(
        memo[i - 1][j] + 1,
        memo[i][j - 1] + 1,
        memo[i - 1][j - 1] +
          (ch === strB.charCodeAt(j - 1) ? 0 : 1)
      );
    }
  }

  return memo[strA.length][strB.length];
}


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/test.js":
/*!**************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/test.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");

/**
 * ### .test(object, expression)
 *
 * Test and object for expression.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name test
 */

module.exports = function test(obj, args) {
  var negate = flag(obj, 'negate')
    , expr = args[0];
  return negate ? !expr : expr;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/transferFlags.js":
/*!***********************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/transferFlags.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .transferFlags(assertion, object, includeAll = true)
 *
 * Transfer all the flags for `assertion` to `object`. If
 * `includeAll` is set to `false`, then the base Chai
 * assertion flags (namely `object`, `ssfi`, `lockSsfi`,
 * and `message`) will not be transferred.
 *
 *
 *     var newAssertion = new Assertion();
 *     utils.transferFlags(assertion, newAssertion);
 *
 *     var anotherAssertion = new Assertion(myObj);
 *     utils.transferFlags(assertion, anotherAssertion, false);
 *
 * @param {Assertion} assertion the assertion to transfer the flags from
 * @param {Object} object the object to transfer the flags to; usually a new assertion
 * @param {Boolean} includeAll
 * @namespace Utils
 * @name transferFlags
 * @api private
 */

module.exports = function transferFlags(assertion, object, includeAll) {
  var flags = assertion.__flags || (assertion.__flags = Object.create(null));

  if (!object.__flags) {
    object.__flags = Object.create(null);
  }

  includeAll = arguments.length === 3 ? includeAll : true;

  for (var flag in flags) {
    if (includeAll ||
        (flag !== 'object' && flag !== 'ssfi' && flag !== 'lockSsfi' && flag != 'message')) {
      object.__flags[flag] = flags[flag];
    }
  }
};


/***/ }),

/***/ "./node_modules/check-error/index.js":
/*!*******************************************!*\
  !*** ./node_modules/check-error/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* !
 * Chai - checkError utility
 * Copyright(c) 2012-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .checkError
 *
 * Checks that an error conforms to a given set of criteria and/or retrieves information about it.
 *
 * @api public
 */

/**
 * ### .compatibleInstance(thrown, errorLike)
 *
 * Checks if two instances are compatible (strict equal).
 * Returns false if errorLike is not an instance of Error, because instances
 * can only be compatible if they're both error instances.
 *
 * @name compatibleInstance
 * @param {Error} thrown error
 * @param {Error|ErrorConstructor} errorLike object to compare against
 * @namespace Utils
 * @api public
 */

function compatibleInstance(thrown, errorLike) {
  return errorLike instanceof Error && thrown === errorLike;
}

/**
 * ### .compatibleConstructor(thrown, errorLike)
 *
 * Checks if two constructors are compatible.
 * This function can receive either an error constructor or
 * an error instance as the `errorLike` argument.
 * Constructors are compatible if they're the same or if one is
 * an instance of another.
 *
 * @name compatibleConstructor
 * @param {Error} thrown error
 * @param {Error|ErrorConstructor} errorLike object to compare against
 * @namespace Utils
 * @api public
 */

function compatibleConstructor(thrown, errorLike) {
  if (errorLike instanceof Error) {
    // If `errorLike` is an instance of any error we compare their constructors
    return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
  } else if (errorLike.prototype instanceof Error || errorLike === Error) {
    // If `errorLike` is a constructor that inherits from Error, we compare `thrown` to `errorLike` directly
    return thrown.constructor === errorLike || thrown instanceof errorLike;
  }

  return false;
}

/**
 * ### .compatibleMessage(thrown, errMatcher)
 *
 * Checks if an error's message is compatible with a matcher (String or RegExp).
 * If the message contains the String or passes the RegExp test,
 * it is considered compatible.
 *
 * @name compatibleMessage
 * @param {Error} thrown error
 * @param {String|RegExp} errMatcher to look for into the message
 * @namespace Utils
 * @api public
 */

function compatibleMessage(thrown, errMatcher) {
  var comparisonString = typeof thrown === 'string' ? thrown : thrown.message;
  if (errMatcher instanceof RegExp) {
    return errMatcher.test(comparisonString);
  } else if (typeof errMatcher === 'string') {
    return comparisonString.indexOf(errMatcher) !== -1; // eslint-disable-line no-magic-numbers
  }

  return false;
}

/**
 * ### .getFunctionName(constructorFn)
 *
 * Returns the name of a function.
 * This also includes a polyfill function if `constructorFn.name` is not defined.
 *
 * @name getFunctionName
 * @param {Function} constructorFn
 * @namespace Utils
 * @api private
 */

var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;
function getFunctionName(constructorFn) {
  var name = '';
  if (typeof constructorFn.name === 'undefined') {
    // Here we run a polyfill if constructorFn.name is not defined
    var match = String(constructorFn).match(functionNameMatch);
    if (match) {
      name = match[1];
    }
  } else {
    name = constructorFn.name;
  }

  return name;
}

/**
 * ### .getConstructorName(errorLike)
 *
 * Gets the constructor name for an Error instance or constructor itself.
 *
 * @name getConstructorName
 * @param {Error|ErrorConstructor} errorLike
 * @namespace Utils
 * @api public
 */

function getConstructorName(errorLike) {
  var constructorName = errorLike;
  if (errorLike instanceof Error) {
    constructorName = getFunctionName(errorLike.constructor);
  } else if (typeof errorLike === 'function') {
    // If `err` is not an instance of Error it is an error constructor itself or another function.
    // If we've got a common function we get its name, otherwise we may need to create a new instance
    // of the error just in case it's a poorly-constructed error. Please see chaijs/chai/issues/45 to know more.
    constructorName = getFunctionName(errorLike).trim() ||
        getFunctionName(new errorLike()); // eslint-disable-line new-cap
  }

  return constructorName;
}

/**
 * ### .getMessage(errorLike)
 *
 * Gets the error message from an error.
 * If `err` is a String itself, we return it.
 * If the error has no message, we return an empty string.
 *
 * @name getMessage
 * @param {Error|String} errorLike
 * @namespace Utils
 * @api public
 */

function getMessage(errorLike) {
  var msg = '';
  if (errorLike && errorLike.message) {
    msg = errorLike.message;
  } else if (typeof errorLike === 'string') {
    msg = errorLike;
  }

  return msg;
}

module.exports = {
  compatibleInstance: compatibleInstance,
  compatibleConstructor: compatibleConstructor,
  compatibleMessage: compatibleMessage,
  getMessage: getMessage,
  getConstructorName: getConstructorName,
};


/***/ }),

/***/ "./node_modules/deep-eql/index.js":
/*!****************************************!*\
  !*** ./node_modules/deep-eql/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* globals Symbol: false, Uint8Array: false, WeakMap: false */
/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var type = __webpack_require__(/*! type-detect */ "./node_modules/type-detect/type-detect.js");
function FakeMap() {
  this._key = 'chai/deep-eql__' + Math.random() + Date.now();
}

FakeMap.prototype = {
  get: function getMap(key) {
    return key[this._key];
  },
  set: function setMap(key, value) {
    if (Object.isExtensible(key)) {
      Object.defineProperty(key, this._key, {
        value: value,
        configurable: true,
      });
    }
  },
};

var MemoizeMap = typeof WeakMap === 'function' ? WeakMap : FakeMap;
/*!
 * Check to see if the MemoizeMap has recorded a result of the two operands
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @returns {Boolean|null} result
*/
function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return null;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    var result = leftHandMap.get(rightHandOperand);
    if (typeof result === 'boolean') {
      return result;
    }
  }
  return null;
}

/*!
 * Set the result of the equality into the MemoizeMap
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @param {Boolean} result
*/
function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    leftHandMap.set(rightHandOperand, result);
  } else {
    leftHandMap = new MemoizeMap();
    leftHandMap.set(rightHandOperand, result);
    memoizeMap.set(leftHandOperand, leftHandMap);
  }
}

/*!
 * Primary Export
 */

module.exports = deepEqual;
module.exports.MemoizeMap = MemoizeMap;

/**
 * Assert deeply nested sameValue equality between two objects of any type.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
 */
function deepEqual(leftHandOperand, rightHandOperand, options) {
  // If we have a comparator, we can't assume anything; so bail to its check first.
  if (options && options.comparator) {
    return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
  }

  var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
  if (simpleResult !== null) {
    return simpleResult;
  }

  // Deeper comparisons are pushed through to a larger function
  return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}

/**
 * Many comparisons can be canceled out early via simple equality or primitive checks.
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @return {Boolean|null} equal match
 */
function simpleEqual(leftHandOperand, rightHandOperand) {
  // Equal references (except for Numbers) can be returned early
  if (leftHandOperand === rightHandOperand) {
    // Handle +-0 cases
    return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
  }

  // handle NaN cases
  if (
    leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
    rightHandOperand !== rightHandOperand // eslint-disable-line no-self-compare
  ) {
    return true;
  }

  // Anything that is not an 'object', i.e. symbols, functions, booleans, numbers,
  // strings, and undefined, can be compared by reference.
  if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    // Easy out b/c it would have passed the first equality check
    return false;
  }
  return null;
}

/*!
 * The main logic of the `deepEqual` function.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
*/
function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
  options = options || {};
  options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
  var comparator = options && options.comparator;

  // Check if a memoized result exists.
  var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
  if (memoizeResultLeft !== null) {
    return memoizeResultLeft;
  }
  var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
  if (memoizeResultRight !== null) {
    return memoizeResultRight;
  }

  // If a comparator is present, use it.
  if (comparator) {
    var comparatorResult = comparator(leftHandOperand, rightHandOperand);
    // Comparators may return null, in which case we want to go back to default behavior.
    if (comparatorResult === false || comparatorResult === true) {
      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
      return comparatorResult;
    }
    // To allow comparators to override *any* behavior, we ran them first. Since it didn't decide
    // what to do, we need to make sure to return the basic tests first before we move on.
    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
    if (simpleResult !== null) {
      // Don't memoize this, it takes longer to set/retrieve than to just compare.
      return simpleResult;
    }
  }

  var leftHandType = type(leftHandOperand);
  if (leftHandType !== type(rightHandOperand)) {
    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
    return false;
  }

  // Temporarily set the operands in the memoize object to prevent blowing the stack
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);

  var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
  return result;
}

function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
  switch (leftHandType) {
    case 'String':
    case 'Number':
    case 'Boolean':
    case 'Date':
      // If these types are their instance types (e.g. `new Number`) then re-deepEqual against their values
      return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
    case 'Promise':
    case 'Symbol':
    case 'function':
    case 'WeakMap':
    case 'WeakSet':
    case 'Error':
      return leftHandOperand === rightHandOperand;
    case 'Arguments':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'Array':
      return iterableEqual(leftHandOperand, rightHandOperand, options);
    case 'RegExp':
      return regexpEqual(leftHandOperand, rightHandOperand);
    case 'Generator':
      return generatorEqual(leftHandOperand, rightHandOperand, options);
    case 'DataView':
      return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
    case 'ArrayBuffer':
      return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
    case 'Set':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    case 'Map':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    default:
      return objectEqual(leftHandOperand, rightHandOperand, options);
  }
}

/*!
 * Compare two Regular Expressions for equality.
 *
 * @param {RegExp} leftHandOperand
 * @param {RegExp} rightHandOperand
 * @return {Boolean} result
 */

function regexpEqual(leftHandOperand, rightHandOperand) {
  return leftHandOperand.toString() === rightHandOperand.toString();
}

/*!
 * Compare two Sets/Maps for equality. Faster than other equality functions.
 *
 * @param {Set} leftHandOperand
 * @param {Set} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function entriesEqual(leftHandOperand, rightHandOperand, options) {
  // IE11 doesn't support Set#entries or Set#@@iterator, so we need manually populate using Set#forEach
  if (leftHandOperand.size !== rightHandOperand.size) {
    return false;
  }
  if (leftHandOperand.size === 0) {
    return true;
  }
  var leftHandItems = [];
  var rightHandItems = [];
  leftHandOperand.forEach(function gatherEntries(key, value) {
    leftHandItems.push([ key, value ]);
  });
  rightHandOperand.forEach(function gatherEntries(key, value) {
    rightHandItems.push([ key, value ]);
  });
  return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
}

/*!
 * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function iterableEqual(leftHandOperand, rightHandOperand, options) {
  var length = leftHandOperand.length;
  if (length !== rightHandOperand.length) {
    return false;
  }
  if (length === 0) {
    return true;
  }
  var index = -1;
  while (++index < length) {
    if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Simple equality for generator objects such as those returned by generator functions.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function generatorEqual(leftHandOperand, rightHandOperand, options) {
  return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
}

/*!
 * Determine if the given object has an @@iterator function.
 *
 * @param {Object} target
 * @return {Boolean} `true` if the object has an @@iterator function.
 */
function hasIteratorFunction(target) {
  return typeof Symbol !== 'undefined' &&
    typeof target === 'object' &&
    typeof Symbol.iterator !== 'undefined' &&
    typeof target[Symbol.iterator] === 'function';
}

/*!
 * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
 * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
 *
 * @param {Object} target
 * @returns {Array} an array of entries from the @@iterator function
 */
function getIteratorEntries(target) {
  if (hasIteratorFunction(target)) {
    try {
      return getGeneratorEntries(target[Symbol.iterator]());
    } catch (iteratorError) {
      return [];
    }
  }
  return [];
}

/*!
 * Gets all entries from a Generator. This will consume the generator - which could have side effects.
 *
 * @param {Generator} target
 * @returns {Array} an array of entries from the Generator.
 */
function getGeneratorEntries(generator) {
  var generatorResult = generator.next();
  var accumulator = [ generatorResult.value ];
  while (generatorResult.done === false) {
    generatorResult = generator.next();
    accumulator.push(generatorResult.value);
  }
  return accumulator;
}

/*!
 * Gets all own and inherited enumerable keys from a target.
 *
 * @param {Object} target
 * @returns {Array} an array of own and inherited enumerable keys from the target.
 */
function getEnumerableKeys(target) {
  var keys = [];
  for (var key in target) {
    keys.push(key);
  }
  return keys;
}

/*!
 * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
 * each key. If any value of the given key is not equal, the function will return false (early).
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */
function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
  var length = keys.length;
  if (length === 0) {
    return true;
  }
  for (var i = 0; i < length; i += 1) {
    if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
 * for each enumerable key in the object.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function objectEqual(leftHandOperand, rightHandOperand, options) {
  var leftHandKeys = getEnumerableKeys(leftHandOperand);
  var rightHandKeys = getEnumerableKeys(rightHandOperand);
  if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
    leftHandKeys.sort();
    rightHandKeys.sort();
    if (iterableEqual(leftHandKeys, rightHandKeys) === false) {
      return false;
    }
    return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
  }

  var leftHandEntries = getIteratorEntries(leftHandOperand);
  var rightHandEntries = getIteratorEntries(rightHandOperand);
  if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
    leftHandEntries.sort();
    rightHandEntries.sort();
    return iterableEqual(leftHandEntries, rightHandEntries, options);
  }

  if (leftHandKeys.length === 0 &&
      leftHandEntries.length === 0 &&
      rightHandKeys.length === 0 &&
      rightHandEntries.length === 0) {
    return true;
  }

  return false;
}

/*!
 * Returns true if the argument is a primitive.
 *
 * This intentionally returns true for all objects that can be compared by reference,
 * including functions and symbols.
 *
 * @param {Mixed} value
 * @return {Boolean} result
 */
function isPrimitive(value) {
  return value === null || typeof value !== 'object';
}


/***/ }),

/***/ "./node_modules/get-func-name/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-func-name/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* !
 * Chai - getFuncName utility
 * Copyright(c) 2012-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getFuncName(constructorFn)
 *
 * Returns the name of a function.
 * When a non-function instance is passed, returns `null`.
 * This also includes a polyfill function if `aFunc.name` is not defined.
 *
 * @name getFuncName
 * @param {Function} funct
 * @namespace Utils
 * @api public
 */

var toString = Function.prototype.toString;
var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
function getFuncName(aFunc) {
  if (typeof aFunc !== 'function') {
    return null;
  }

  var name = '';
  if (typeof Function.prototype.name === 'undefined' && typeof aFunc.name === 'undefined') {
    // Here we run a polyfill if Function does not support the `name` property and if aFunc.name is not defined
    var match = toString.call(aFunc).match(functionNameMatch);
    if (match) {
      name = match[1];
    }
  } else {
    // If we've got a `name` property we just use it
    name = aFunc.name;
  }

  return name;
}

module.exports = getFuncName;


/***/ }),

/***/ "./node_modules/pathval/index.js":
/*!***************************************!*\
  !*** ./node_modules/pathval/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* !
 * Chai - pathval utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * @see https://github.com/logicalparadox/filtr
 * MIT Licensed
 */

/**
 * ### .hasProperty(object, name)
 *
 * This allows checking whether an object has own
 * or inherited from prototype chain named property.
 *
 * Basically does the same thing as the `in`
 * operator but works properly with null/undefined values
 * and other primitives.
 *
 *     var obj = {
 *         arr: ['a', 'b', 'c']
 *       , str: 'Hello'
 *     }
 *
 * The following would be the results.
 *
 *     hasProperty(obj, 'str');  // true
 *     hasProperty(obj, 'constructor');  // true
 *     hasProperty(obj, 'bar');  // false
 *
 *     hasProperty(obj.str, 'length'); // true
 *     hasProperty(obj.str, 1);  // true
 *     hasProperty(obj.str, 5);  // false
 *
 *     hasProperty(obj.arr, 'length');  // true
 *     hasProperty(obj.arr, 2);  // true
 *     hasProperty(obj.arr, 3);  // false
 *
 * @param {Object} object
 * @param {String|Symbol} name
 * @returns {Boolean} whether it exists
 * @namespace Utils
 * @name hasProperty
 * @api public
 */

function hasProperty(obj, name) {
  if (typeof obj === 'undefined' || obj === null) {
    return false;
  }

  // The `in` operator does not work with primitives.
  return name in Object(obj);
}

/* !
 * ## parsePath(path)
 *
 * Helper function used to parse string object
 * paths. Use in conjunction with `internalGetPathValue`.
 *
 *      var parsed = parsePath('myobject.property.subprop');
 *
 * ### Paths:
 *
 * * Can be infinitely deep and nested.
 * * Arrays are also valid using the formal `myobject.document[3].property`.
 * * Literal dots and brackets (not delimiter) must be backslash-escaped.
 *
 * @param {String} path
 * @returns {Object} parsed
 * @api private
 */

function parsePath(path) {
  var str = path.replace(/([^\\])\[/g, '$1.[');
  var parts = str.match(/(\\\.|[^.]+?)+/g);
  return parts.map(function mapMatches(value) {
    var regexp = /^\[(\d+)\]$/;
    var mArr = regexp.exec(value);
    var parsed = null;
    if (mArr) {
      parsed = { i: parseFloat(mArr[1]) };
    } else {
      parsed = { p: value.replace(/\\([.\[\]])/g, '$1') };
    }

    return parsed;
  });
}

/* !
 * ## internalGetPathValue(obj, parsed[, pathDepth])
 *
 * Helper companion function for `.parsePath` that returns
 * the value located at the parsed address.
 *
 *      var value = getPathValue(obj, parsed);
 *
 * @param {Object} object to search against
 * @param {Object} parsed definition from `parsePath`.
 * @param {Number} depth (nesting level) of the property we want to retrieve
 * @returns {Object|Undefined} value
 * @api private
 */

function internalGetPathValue(obj, parsed, pathDepth) {
  var temporaryValue = obj;
  var res = null;
  pathDepth = (typeof pathDepth === 'undefined' ? parsed.length : pathDepth);

  for (var i = 0; i < pathDepth; i++) {
    var part = parsed[i];
    if (temporaryValue) {
      if (typeof part.p === 'undefined') {
        temporaryValue = temporaryValue[part.i];
      } else {
        temporaryValue = temporaryValue[part.p];
      }

      if (i === (pathDepth - 1)) {
        res = temporaryValue;
      }
    }
  }

  return res;
}

/* !
 * ## internalSetPathValue(obj, value, parsed)
 *
 * Companion function for `parsePath` that sets
 * the value located at a parsed address.
 *
 *  internalSetPathValue(obj, 'value', parsed);
 *
 * @param {Object} object to search and define on
 * @param {*} value to use upon set
 * @param {Object} parsed definition from `parsePath`
 * @api private
 */

function internalSetPathValue(obj, val, parsed) {
  var tempObj = obj;
  var pathDepth = parsed.length;
  var part = null;
  // Here we iterate through every part of the path
  for (var i = 0; i < pathDepth; i++) {
    var propName = null;
    var propVal = null;
    part = parsed[i];

    // If it's the last part of the path, we set the 'propName' value with the property name
    if (i === (pathDepth - 1)) {
      propName = typeof part.p === 'undefined' ? part.i : part.p;
      // Now we set the property with the name held by 'propName' on object with the desired val
      tempObj[propName] = val;
    } else if (typeof part.p !== 'undefined' && tempObj[part.p]) {
      tempObj = tempObj[part.p];
    } else if (typeof part.i !== 'undefined' && tempObj[part.i]) {
      tempObj = tempObj[part.i];
    } else {
      // If the obj doesn't have the property we create one with that name to define it
      var next = parsed[i + 1];
      // Here we set the name of the property which will be defined
      propName = typeof part.p === 'undefined' ? part.i : part.p;
      // Here we decide if this property will be an array or a new object
      propVal = typeof next.p === 'undefined' ? [] : {};
      tempObj[propName] = propVal;
      tempObj = tempObj[propName];
    }
  }
}

/**
 * ### .getPathInfo(object, path)
 *
 * This allows the retrieval of property info in an
 * object given a string path.
 *
 * The path info consists of an object with the
 * following properties:
 *
 * * parent - The parent object of the property referenced by `path`
 * * name - The name of the final property, a number if it was an array indexer
 * * value - The value of the property, if it exists, otherwise `undefined`
 * * exists - Whether the property exists or not
 *
 * @param {Object} object
 * @param {String} path
 * @returns {Object} info
 * @namespace Utils
 * @name getPathInfo
 * @api public
 */

function getPathInfo(obj, path) {
  var parsed = parsePath(path);
  var last = parsed[parsed.length - 1];
  var info = {
    parent: parsed.length > 1 ? internalGetPathValue(obj, parsed, parsed.length - 1) : obj,
    name: last.p || last.i,
    value: internalGetPathValue(obj, parsed),
  };
  info.exists = hasProperty(info.parent, info.name);

  return info;
}

/**
 * ### .getPathValue(object, path)
 *
 * This allows the retrieval of values in an
 * object given a string path.
 *
 *     var obj = {
 *         prop1: {
 *             arr: ['a', 'b', 'c']
 *           , str: 'Hello'
 *         }
 *       , prop2: {
 *             arr: [ { nested: 'Universe' } ]
 *           , str: 'Hello again!'
 *         }
 *     }
 *
 * The following would be the results.
 *
 *     getPathValue(obj, 'prop1.str'); // Hello
 *     getPathValue(obj, 'prop1.att[2]'); // b
 *     getPathValue(obj, 'prop2.arr[0].nested'); // Universe
 *
 * @param {Object} object
 * @param {String} path
 * @returns {Object} value or `undefined`
 * @namespace Utils
 * @name getPathValue
 * @api public
 */

function getPathValue(obj, path) {
  var info = getPathInfo(obj, path);
  return info.value;
}

/**
 * ### .setPathValue(object, path, value)
 *
 * Define the value in an object at a given string path.
 *
 * ```js
 * var obj = {
 *     prop1: {
 *         arr: ['a', 'b', 'c']
 *       , str: 'Hello'
 *     }
 *   , prop2: {
 *         arr: [ { nested: 'Universe' } ]
 *       , str: 'Hello again!'
 *     }
 * };
 * ```
 *
 * The following would be acceptable.
 *
 * ```js
 * var properties = require('tea-properties');
 * properties.set(obj, 'prop1.str', 'Hello Universe!');
 * properties.set(obj, 'prop1.arr[2]', 'B');
 * properties.set(obj, 'prop2.arr[0].nested.value', { hello: 'universe' });
 * ```
 *
 * @param {Object} object
 * @param {String} path
 * @param {Mixed} value
 * @api private
 */

function setPathValue(obj, path, val) {
  var parsed = parsePath(path);
  internalSetPathValue(obj, val, parsed);
  return obj;
}

module.exports = {
  hasProperty: hasProperty,
  getPathInfo: getPathInfo,
  getPathValue: getPathValue,
  setPathValue: setPathValue,
};


/***/ }),

/***/ "./node_modules/type-detect/type-detect.js":
/*!*************************************************!*\
  !*** ./node_modules/type-detect/type-detect.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

/* !
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var promiseExists = typeof Promise === 'function';

/* eslint-disable no-undef */
var globalObject = typeof self === 'object' ? self : global; // eslint-disable-line id-blacklist

var symbolExists = typeof Symbol !== 'undefined';
var mapExists = typeof Map !== 'undefined';
var setExists = typeof Set !== 'undefined';
var weakMapExists = typeof WeakMap !== 'undefined';
var weakSetExists = typeof WeakSet !== 'undefined';
var dataViewExists = typeof DataView !== 'undefined';
var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
var toStringLeftSliceLength = 8;
var toStringRightSliceLength = -1;
/**
 * ### typeOf (obj)
 *
 * Uses `Object.prototype.toString` to determine the type of an object,
 * normalising behaviour across engine versions & well optimised.
 *
 * @param {Mixed} object
 * @return {String} object type
 * @api public
 */
function typeDetect(obj) {
  /* ! Speed optimisation
   * Pre:
   *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
   *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
   *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
   *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
   *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
   * Post:
   *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
   *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
   *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
   *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
   *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
   */
  var typeofObj = typeof obj;
  if (typeofObj !== 'object') {
    return typeofObj;
  }

  /* ! Speed optimisation
   * Pre:
   *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
   * Post:
   *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
   */
  if (obj === null) {
    return 'null';
  }

  /* ! Spec Conformance
   * Test: `Object.prototype.toString.call(window)``
   *  - Node === "[object global]"
   *  - Chrome === "[object global]"
   *  - Firefox === "[object Window]"
   *  - PhantomJS === "[object Window]"
   *  - Safari === "[object Window]"
   *  - IE 11 === "[object Window]"
   *  - IE Edge === "[object Window]"
   * Test: `Object.prototype.toString.call(this)``
   *  - Chrome Worker === "[object global]"
   *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
   *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
   *  - IE 11 Worker === "[object WorkerGlobalScope]"
   *  - IE Edge Worker === "[object WorkerGlobalScope]"
   */
  if (obj === globalObject) {
    return 'global';
  }

  /* ! Speed optimisation
   * Pre:
   *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
   * Post:
   *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
   */
  if (
    Array.isArray(obj) &&
    (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))
  ) {
    return 'Array';
  }

  // Not caching existence of `window` and related properties due to potential
  // for `window` to be unset before tests in quasi-browser environments.
  if (typeof window === 'object' && window !== null) {
    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/browsers.html#location)
     * WhatWG HTML$7.7.3 - The `Location` interface
     * Test: `Object.prototype.toString.call(window.location)``
     *  - IE <=11 === "[object Object]"
     *  - IE Edge <=13 === "[object Object]"
     */
    if (typeof window.location === 'object' && obj === window.location) {
      return 'Location';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/#document)
     * WhatWG HTML$3.1.1 - The `Document` object
     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
     *       which suggests that browsers should use HTMLTableCellElement for
     *       both TD and TH elements. WhatWG separates these.
     *       WhatWG HTML states:
     *         > For historical reasons, Window objects must also have a
     *         > writable, configurable, non-enumerable property named
     *         > HTMLDocument whose value is the Document interface object.
     * Test: `Object.prototype.toString.call(document)``
     *  - Chrome === "[object HTMLDocument]"
     *  - Firefox === "[object HTMLDocument]"
     *  - Safari === "[object HTMLDocument]"
     *  - IE <=10 === "[object Document]"
     *  - IE 11 === "[object HTMLDocument]"
     *  - IE Edge <=13 === "[object HTMLDocument]"
     */
    if (typeof window.document === 'object' && obj === window.document) {
      return 'Document';
    }

    if (typeof window.navigator === 'object') {
      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
       * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
       *  - IE <=10 === "[object MSMimeTypesCollection]"
       */
      if (typeof window.navigator.mimeTypes === 'object' &&
          obj === window.navigator.mimeTypes) {
        return 'MimeTypeArray';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
       * Test: `Object.prototype.toString.call(navigator.plugins)``
       *  - IE <=10 === "[object MSPluginsCollection]"
       */
      if (typeof window.navigator.plugins === 'object' &&
          obj === window.navigator.plugins) {
        return 'PluginArray';
      }
    }

    if ((typeof window.HTMLElement === 'function' ||
        typeof window.HTMLElement === 'object') &&
        obj instanceof window.HTMLElement) {
      /* ! Spec Conformance
      * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
      * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
      * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
      *  - IE <=10 === "[object HTMLBlockElement]"
      */
      if (obj.tagName === 'BLOCKQUOTE') {
        return 'HTMLQuoteElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltabledatacellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('td'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TD') {
        return 'HTMLTableDataCellElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltableheadercellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('th'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TH') {
        return 'HTMLTableHeaderCellElement';
      }
    }
  }

  /* ! Speed optimisation
  * Pre:
  *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
  *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
  *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
  *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
  *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
  *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
  *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
  *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
  *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
  * Post:
  *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
  *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
  *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
  *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
  *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
  *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
  *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
  *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
  *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
  */
  var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
  if (typeof stringTag === 'string') {
    return stringTag;
  }

  var objPrototype = Object.getPrototypeOf(obj);
  /* ! Speed optimisation
  * Pre:
  *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
  *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
  * Post:
  *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
  *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
  */
  if (objPrototype === RegExp.prototype) {
    return 'RegExp';
  }

  /* ! Speed optimisation
  * Pre:
  *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
  * Post:
  *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
  */
  if (objPrototype === Date.prototype) {
    return 'Date';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
   * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
   * Test: `Object.prototype.toString.call(Promise.resolve())``
   *  - Chrome <=47 === "[object Object]"
   *  - Edge <=20 === "[object Object]"
   *  - Firefox 29-Latest === "[object Promise]"
   *  - Safari 7.1-Latest === "[object Promise]"
   */
  if (promiseExists && objPrototype === Promise.prototype) {
    return 'Promise';
  }

  /* ! Speed optimisation
  * Pre:
  *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
  * Post:
  *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
  */
  if (setExists && objPrototype === Set.prototype) {
    return 'Set';
  }

  /* ! Speed optimisation
  * Pre:
  *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
  * Post:
  *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
  */
  if (mapExists && objPrototype === Map.prototype) {
    return 'Map';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
  * Post:
  *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
  */
  if (weakSetExists && objPrototype === WeakSet.prototype) {
    return 'WeakSet';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
  * Post:
  *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
  */
  if (weakMapExists && objPrototype === WeakMap.prototype) {
    return 'WeakMap';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
   * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
   * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
   *  - Edge <=13 === "[object Object]"
   */
  if (dataViewExists && objPrototype === DataView.prototype) {
    return 'DataView';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
   * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
   * Test: `Object.prototype.toString.call(new Map().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (mapExists && objPrototype === mapIteratorPrototype) {
    return 'Map Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
   * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
   * Test: `Object.prototype.toString.call(new Set().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (setExists && objPrototype === setIteratorPrototype) {
    return 'Set Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
   * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
   * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
    return 'Array Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
   * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
   * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
    return 'String Iterator';
  }

  /* ! Speed optimisation
  * Pre:
  *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
  * Post:
  *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
  */
  if (objPrototype === null) {
    return 'Object';
  }

  return Object
    .prototype
    .toString
    .call(obj)
    .slice(toStringLeftSliceLength, toStringRightSliceLength);
}

return typeDetect;

})));


/***/ }),

/***/ "./src/renderer/helper.js":
/*!********************************!*\
  !*** ./src/renderer/helper.js ***!
  \********************************/
/*! exports provided: mixinGetHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mixinGetHelper", function() { return mixinGetHelper; });


function escape(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function getIdx(name, prefix) {
  const reg = new RegExp(`^${escape(prefix)}(\\d+)$`);
  const ret = name.match(reg);
  if (ret == null) return -1; // if no index

  return ret[1] || -1; // greater then or equal to 0
}

function getLastIdx(node, prefix) {
  const getIdxWithPre = name => getIdx(name, prefix); //return Object.keys(node).map(key=>getIdxWithPre(key)).reduce(Math.max)


  return Object.keys(node).map(key => getIdxWithPre(key)).reduce((acc, i) => Math.max(acc, i), -1); //Object.keys(node).map(key=>console.log(key))
}

const GetHelperTrait = {
  getLastIdx(prefix) {
    return getLastIdx(this, prefix);
  }

};
function mixinGetHelper(obj) {
  return Object.assign({}, obj, GetHelperTrait);
}

/***/ }),

/***/ "./src/renderer/test.js":
/*!******************************!*\
  !*** ./src/renderer/test.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var chai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chai */ "./node_modules/chai/index.js");
/* harmony import */ var chai__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chai__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/renderer/helper.js");


 //////////////////////////////////////////////////
// helper


describe('helper', function () {
  // dummy node obj
  const node = {
    _node3: {},
    _ch1: {},
    _node1: {},
    _ch2: {},
    _node0: {}
  };
  describe('.mixinGetHelper', function () {
    // mixin
    const tempNode = _helper__WEBPACK_IMPORTED_MODULE_1__["mixinGetHelper"](node);
    it('has getLastIdx', function () {
      chai__WEBPACK_IMPORTED_MODULE_0__["assert"].property(tempNode, 'getLastIdx');
    });
    it('find index least', function () {
      chai__WEBPACK_IMPORTED_MODULE_0__["assert"].equal(tempNode.getLastIdx('_node'), 3);
      chai__WEBPACK_IMPORTED_MODULE_0__["assert"].equal(tempNode.getLastIdx('_ch'), 2);
    });
    it('return -1 if no find index', function () {
      chai__WEBPACK_IMPORTED_MODULE_0__["assert"].equal(tempNode.getLastIdx('_dummy'), -1);
    });
  });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fzc2VydGlvbi1lcnJvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhaS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS9hc3NlcnRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvY29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL2NvcmUvYXNzZXJ0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS9pbnRlcmZhY2UvYXNzZXJ0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL2ludGVyZmFjZS9leHBlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvaW50ZXJmYWNlL3Nob3VsZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9hZGRDaGFpbmFibGVNZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvYWRkTGVuZ3RoR3VhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvYWRkTWV0aG9kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL2FkZFByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL2NvbXBhcmVCeUluc3BlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZXhwZWN0VHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZmxhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9nZXRBY3R1YWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZ2V0RW51bWVyYWJsZVByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZ2V0TWVzc2FnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9nZXRPd25FbnVtZXJhYmxlUHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9nZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL2dldFByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvaW5zcGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9pc05hTi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9pc1Byb3h5RW5hYmxlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9vYmpEaXNwbGF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL292ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9vdmVyd3JpdGVNZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvb3ZlcndyaXRlUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvcHJveGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy90ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL3RyYW5zZmVyRmxhZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NoZWNrLWVycm9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWVwLWVxbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2V0LWZ1bmMtbmFtZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGF0aHZhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdHlwZS1kZXRlY3QvdHlwZS1kZXRlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbmRlcmVyL2hlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyZXIvdGVzdC5qcyJdLCJuYW1lcyI6WyJlc2NhcGUiLCJzIiwicmVwbGFjZSIsImdldElkeCIsIm5hbWUiLCJwcmVmaXgiLCJyZWciLCJSZWdFeHAiLCJyZXQiLCJtYXRjaCIsImdldExhc3RJZHgiLCJub2RlIiwiZ2V0SWR4V2l0aFByZSIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJyZWR1Y2UiLCJhY2MiLCJpIiwiTWF0aCIsIm1heCIsIkdldEhlbHBlclRyYWl0IiwibWl4aW5HZXRIZWxwZXIiLCJvYmoiLCJhc3NpZ24iLCJkZXNjcmliZSIsIl9ub2RlMyIsIl9jaDEiLCJfbm9kZTEiLCJfY2gyIiwiX25vZGUwIiwidGVtcE5vZGUiLCJoZWxwZXIiLCJpdCIsImFzc2VydCIsInByb3BlcnR5IiwiZXF1YWwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVSxpQkFBaUI7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUM7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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixxQkFBcUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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RUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEIsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQiw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQiw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsS0FBSzs7QUFFdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdlhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6QkEsYUFBYSxtQkFBTyxDQUFDLHlEQUFXOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLG1CQUFPLENBQUMsZ0VBQVc7QUFDakMsYUFBYSxtQkFBTyxDQUFDLHlEQUFXOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsd0JBQXdCO0FBQ3ZDLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxtQkFBTyxDQUFDLG1EQUFZO0FBQy9CLG9CQUFvQixtQkFBTyxDQUFDLDRFQUFpQjs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsbUJBQU8sQ0FBQyw4RUFBa0I7QUFDL0MsV0FBVyxtQkFBTyxDQUFDLG1EQUFZO0FBQy9CLFdBQVcsbUJBQU8sQ0FBQywwREFBUTtBQUMzQixjQUFjLG1CQUFPLENBQUMsZ0VBQVc7QUFDakMsb0JBQW9CLG1CQUFPLENBQUMsNEVBQWlCOztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLG1CQUFPLENBQUMsbURBQVk7QUFDL0IsV0FBVyxtQkFBTyxDQUFDLDBEQUFRO0FBQzNCLHFCQUFxQixtQkFBTyxDQUFDLDhFQUFrQjtBQUMvQyxvQkFBb0IsbUJBQU8sQ0FBQyw0RUFBaUI7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7QUMzRkEsYUFBYSxtQkFBTyxDQUFDLHlEQUFXO0FBQ2hDLFdBQVcsbUJBQU8sQ0FBQywwREFBUTtBQUMzQixvQkFBb0IsbUJBQU8sQ0FBQyw0RUFBaUI7QUFDN0MscUJBQXFCLG1CQUFPLENBQUMsOEVBQWtCOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGlCQUFpQjtBQUNsQztBQUNBOztBQUVBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxtQkFBTyxDQUFDLDBEQUFROztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsT0FBTyw0Q0FBNEM7QUFDOUQsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNUNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLHVCQUF1QjtBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsdUJBQXVCO0FBQ2xDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsY0FBYztBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsdURBQXVEO0FBQ3ZEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyx1QkFBdUI7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDM0thO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsbUJBQU8sQ0FBQyw4REFBYTtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsV0FBVztBQUN0QixhQUFhLGFBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE1BQU07QUFDakIsV0FBVyxXQUFXO0FBQ3RCLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsT0FBTztBQUNsQixXQUFXLE1BQU07QUFDakIsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxNQUFNO0FBQ2pCLFlBQVksYUFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE1BQU07QUFDakIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsTUFBTTtBQUNqQixXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsSUFBSTtBQUNmLFdBQVcsSUFBSTtBQUNmLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsTUFBTTtBQUNqQixXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE1BQU07QUFDakIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksUUFBUTtBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0Y2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUMzQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsdUNBQXVDO0FBQ3ZDLCtCQUErQjtBQUMvQjtBQUNBLHNDQUFzQztBQUN0QywrQkFBK0I7QUFDL0IsK0JBQStCO0FBQy9CO0FBQ0Esc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQiwrQkFBK0I7QUFDL0I7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxjQUFjO0FBQ3pCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTCxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLGVBQWU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLEVBQUU7QUFDYixXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGVBQWU7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMseUNBQXlDO0FBQ3pDLGdEQUFnRDtBQUNoRDtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxvQkFBb0I7QUFDekU7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xTQTtBQUNBLENBQUMsS0FBNEQ7QUFDN0QsQ0FBQyxTQUMrQjtBQUNoQyxDQUFDLHFCQUFxQjs7QUFFdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNERBQTREOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFiLEVBQTRDLENBQUMsQ0FBN0M7QUFDRCxLQUZDLENBQUY7QUFHRCxHQWRPLENBQVI7QUFlRCxDQXhCTyxDQUFSLEMiLCJmaWxlIjoicmVuZGVyZXIuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcmVuZGVyZXIvdGVzdC5qc1wiKTtcbiIsIi8qIVxuICogYXNzZXJ0aW9uLWVycm9yXG4gKiBDb3B5cmlnaHQoYykgMjAxMyBKYWtlIEx1ZXIgPGpha2VAcXVhbGlhbmN5LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qIVxuICogUmV0dXJuIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBvbmUgb2JqZWN0IHRvIGFub3RoZXIgZXhjbHVkaW5nIGFueSBvcmlnaW5hbGx5XG4gKiBsaXN0ZWQuIFJldHVybmVkIGZ1bmN0aW9uIHdpbGwgY3JlYXRlIGEgbmV3IGB7fWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV4Y2x1ZGVkIHByb3BlcnRpZXMgLi4uXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuXG5mdW5jdGlvbiBleGNsdWRlICgpIHtcbiAgdmFyIGV4Y2x1ZGVzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gIGZ1bmN0aW9uIGV4Y2x1ZGVQcm9wcyAocmVzLCBvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKCF+ZXhjbHVkZXMuaW5kZXhPZihrZXkpKSByZXNba2V5XSA9IG9ialtrZXldO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGV4dGVuZEV4Y2x1ZGUgKCkge1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgICAsIGkgPSAwXG4gICAgICAsIHJlcyA9IHt9O1xuXG4gICAgZm9yICg7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBleGNsdWRlUHJvcHMocmVzLCBhcmdzW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9O1xufTtcblxuLyohXG4gKiBQcmltYXJ5IEV4cG9ydHNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFzc2VydGlvbkVycm9yO1xuXG4vKipcbiAqICMjIyBBc3NlcnRpb25FcnJvclxuICpcbiAqIEFuIGV4dGVuc2lvbiBvZiB0aGUgSmF2YVNjcmlwdCBgRXJyb3JgIGNvbnN0cnVjdG9yIGZvclxuICogYXNzZXJ0aW9uIGFuZCB2YWxpZGF0aW9uIHNjZW5hcmlvcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXMgdG8gaW5jbHVkZSAob3B0aW9uYWwpXG4gKiBAcGFyYW0ge2NhbGxlZX0gc3RhcnQgc3RhY2sgZnVuY3Rpb24gKG9wdGlvbmFsKVxuICovXG5cbmZ1bmN0aW9uIEFzc2VydGlvbkVycm9yIChtZXNzYWdlLCBfcHJvcHMsIHNzZikge1xuICB2YXIgZXh0ZW5kID0gZXhjbHVkZSgnbmFtZScsICdtZXNzYWdlJywgJ3N0YWNrJywgJ2NvbnN0cnVjdG9yJywgJ3RvSlNPTicpXG4gICAgLCBwcm9wcyA9IGV4dGVuZChfcHJvcHMgfHwge30pO1xuXG4gIC8vIGRlZmF1bHQgdmFsdWVzXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgJ1Vuc3BlY2lmaWVkIEFzc2VydGlvbkVycm9yJztcbiAgdGhpcy5zaG93RGlmZiA9IGZhbHNlO1xuXG4gIC8vIGNvcHkgZnJvbSBwcm9wZXJ0aWVzXG4gIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgIHRoaXNba2V5XSA9IHByb3BzW2tleV07XG4gIH1cblxuICAvLyBjYXB0dXJlIHN0YWNrIHRyYWNlXG4gIHNzZiA9IHNzZiB8fCBBc3NlcnRpb25FcnJvcjtcbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgc3NmKTtcbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICB0aGlzLnN0YWNrID0gZS5zdGFjaztcbiAgICB9XG4gIH1cbn1cblxuLyohXG4gKiBJbmhlcml0IGZyb20gRXJyb3IucHJvdG90eXBlXG4gKi9cblxuQXNzZXJ0aW9uRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuXG4vKiFcbiAqIFN0YXRpY2FsbHkgc2V0IG5hbWVcbiAqL1xuXG5Bc3NlcnRpb25FcnJvci5wcm90b3R5cGUubmFtZSA9ICdBc3NlcnRpb25FcnJvcic7XG5cbi8qIVxuICogRW5zdXJlIGNvcnJlY3QgY29uc3RydWN0b3JcbiAqL1xuXG5Bc3NlcnRpb25FcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBc3NlcnRpb25FcnJvcjtcblxuLyoqXG4gKiBBbGxvdyBlcnJvcnMgdG8gYmUgY29udmVydGVkIHRvIEpTT04gZm9yIHN0YXRpYyB0cmFuc2Zlci5cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGluY2x1ZGUgc3RhY2sgKGRlZmF1bHQ6IGB0cnVlYClcbiAqIEByZXR1cm4ge09iamVjdH0gb2JqZWN0IHRoYXQgY2FuIGJlIGBKU09OLnN0cmluZ2lmeWBcbiAqL1xuXG5Bc3NlcnRpb25FcnJvci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKHN0YWNrKSB7XG4gIHZhciBleHRlbmQgPSBleGNsdWRlKCdjb25zdHJ1Y3RvcicsICd0b0pTT04nLCAnc3RhY2snKVxuICAgICwgcHJvcHMgPSBleHRlbmQoeyBuYW1lOiB0aGlzLm5hbWUgfSwgdGhpcyk7XG5cbiAgLy8gaW5jbHVkZSBzdGFjayBpZiBleGlzdHMgYW5kIG5vdCB0dXJuZWQgb2ZmXG4gIGlmIChmYWxzZSAhPT0gc3RhY2sgJiYgdGhpcy5zdGFjaykge1xuICAgIHByb3BzLnN0YWNrID0gdGhpcy5zdGFjaztcbiAgfVxuXG4gIHJldHVybiBwcm9wcztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2NoYWknKTtcbiIsIi8qIVxuICogY2hhaVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbnZhciB1c2VkID0gW107XG5cbi8qIVxuICogQ2hhaSB2ZXJzaW9uXG4gKi9cblxuZXhwb3J0cy52ZXJzaW9uID0gJzQuMi4wJztcblxuLyohXG4gKiBBc3NlcnRpb24gRXJyb3JcbiAqL1xuXG5leHBvcnRzLkFzc2VydGlvbkVycm9yID0gcmVxdWlyZSgnYXNzZXJ0aW9uLWVycm9yJyk7XG5cbi8qIVxuICogVXRpbHMgZm9yIHBsdWdpbnMgKG5vdCBleHBvcnRlZClcbiAqL1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vY2hhaS91dGlscycpO1xuXG4vKipcbiAqICMgLnVzZShmdW5jdGlvbilcbiAqXG4gKiBQcm92aWRlcyBhIHdheSB0byBleHRlbmQgdGhlIGludGVybmFscyBvZiBDaGFpLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259XG4gKiBAcmV0dXJucyB7dGhpc30gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMudXNlID0gZnVuY3Rpb24gKGZuKSB7XG4gIGlmICghfnVzZWQuaW5kZXhPZihmbikpIHtcbiAgICBmbihleHBvcnRzLCB1dGlsKTtcbiAgICB1c2VkLnB1c2goZm4pO1xuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHM7XG59O1xuXG4vKiFcbiAqIFV0aWxpdHkgRnVuY3Rpb25zXG4gKi9cblxuZXhwb3J0cy51dGlsID0gdXRpbDtcblxuLyohXG4gKiBDb25maWd1cmF0aW9uXG4gKi9cblxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY2hhaS9jb25maWcnKTtcbmV4cG9ydHMuY29uZmlnID0gY29uZmlnO1xuXG4vKiFcbiAqIFByaW1hcnkgYEFzc2VydGlvbmAgcHJvdG90eXBlXG4gKi9cblxudmFyIGFzc2VydGlvbiA9IHJlcXVpcmUoJy4vY2hhaS9hc3NlcnRpb24nKTtcbmV4cG9ydHMudXNlKGFzc2VydGlvbik7XG5cbi8qIVxuICogQ29yZSBBc3NlcnRpb25zXG4gKi9cblxudmFyIGNvcmUgPSByZXF1aXJlKCcuL2NoYWkvY29yZS9hc3NlcnRpb25zJyk7XG5leHBvcnRzLnVzZShjb3JlKTtcblxuLyohXG4gKiBFeHBlY3QgaW50ZXJmYWNlXG4gKi9cblxudmFyIGV4cGVjdCA9IHJlcXVpcmUoJy4vY2hhaS9pbnRlcmZhY2UvZXhwZWN0Jyk7XG5leHBvcnRzLnVzZShleHBlY3QpO1xuXG4vKiFcbiAqIFNob3VsZCBpbnRlcmZhY2VcbiAqL1xuXG52YXIgc2hvdWxkID0gcmVxdWlyZSgnLi9jaGFpL2ludGVyZmFjZS9zaG91bGQnKTtcbmV4cG9ydHMudXNlKHNob3VsZCk7XG5cbi8qIVxuICogQXNzZXJ0IGludGVyZmFjZVxuICovXG5cbnZhciBhc3NlcnQgPSByZXF1aXJlKCcuL2NoYWkvaW50ZXJmYWNlL2Fzc2VydCcpO1xuZXhwb3J0cy51c2UoYXNzZXJ0KTtcbiIsIi8qIVxuICogY2hhaVxuICogaHR0cDovL2NoYWlqcy5jb21cbiAqIENvcHlyaWdodChjKSAyMDExLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX2NoYWksIHV0aWwpIHtcbiAgLyohXG4gICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gICAqL1xuXG4gIHZhciBBc3NlcnRpb25FcnJvciA9IF9jaGFpLkFzc2VydGlvbkVycm9yXG4gICAgLCBmbGFnID0gdXRpbC5mbGFnO1xuXG4gIC8qIVxuICAgKiBNb2R1bGUgZXhwb3J0LlxuICAgKi9cblxuICBfY2hhaS5Bc3NlcnRpb24gPSBBc3NlcnRpb247XG5cbiAgLyohXG4gICAqIEFzc2VydGlvbiBDb25zdHJ1Y3RvclxuICAgKlxuICAgKiBDcmVhdGVzIG9iamVjdCBmb3IgY2hhaW5pbmcuXG4gICAqXG4gICAqIGBBc3NlcnRpb25gIG9iamVjdHMgY29udGFpbiBtZXRhZGF0YSBpbiB0aGUgZm9ybSBvZiBmbGFncy4gVGhyZWUgZmxhZ3MgY2FuXG4gICAqIGJlIGFzc2lnbmVkIGR1cmluZyBpbnN0YW50aWF0aW9uIGJ5IHBhc3NpbmcgYXJndW1lbnRzIHRvIHRoaXMgY29uc3RydWN0b3I6XG4gICAqXG4gICAqIC0gYG9iamVjdGA6IFRoaXMgZmxhZyBjb250YWlucyB0aGUgdGFyZ2V0IG9mIHRoZSBhc3NlcnRpb24uIEZvciBleGFtcGxlLCBpblxuICAgKiAgIHRoZSBhc3NlcnRpb24gYGV4cGVjdChudW1LaXR0ZW5zKS50by5lcXVhbCg3KTtgLCB0aGUgYG9iamVjdGAgZmxhZyB3aWxsXG4gICAqICAgY29udGFpbiBgbnVtS2l0dGVuc2Agc28gdGhhdCB0aGUgYGVxdWFsYCBhc3NlcnRpb24gY2FuIHJlZmVyZW5jZSBpdCB3aGVuXG4gICAqICAgbmVlZGVkLlxuICAgKlxuICAgKiAtIGBtZXNzYWdlYDogVGhpcyBmbGFnIGNvbnRhaW5zIGFuIG9wdGlvbmFsIGN1c3RvbSBlcnJvciBtZXNzYWdlIHRvIGJlXG4gICAqICAgcHJlcGVuZGVkIHRvIHRoZSBlcnJvciBtZXNzYWdlIHRoYXQncyBnZW5lcmF0ZWQgYnkgdGhlIGFzc2VydGlvbiB3aGVuIGl0XG4gICAqICAgZmFpbHMuXG4gICAqXG4gICAqIC0gYHNzZmlgOiBUaGlzIGZsYWcgc3RhbmRzIGZvciBcInN0YXJ0IHN0YWNrIGZ1bmN0aW9uIGluZGljYXRvclwiLiBJdFxuICAgKiAgIGNvbnRhaW5zIGEgZnVuY3Rpb24gcmVmZXJlbmNlIHRoYXQgc2VydmVzIGFzIHRoZSBzdGFydGluZyBwb2ludCBmb3JcbiAgICogICByZW1vdmluZyBmcmFtZXMgZnJvbSB0aGUgc3RhY2sgdHJhY2Ugb2YgdGhlIGVycm9yIHRoYXQncyBjcmVhdGVkIGJ5IHRoZVxuICAgKiAgIGFzc2VydGlvbiB3aGVuIGl0IGZhaWxzLiBUaGUgZ29hbCBpcyB0byBwcm92aWRlIGEgY2xlYW5lciBzdGFjayB0cmFjZSB0b1xuICAgKiAgIGVuZCB1c2VycyBieSByZW1vdmluZyBDaGFpJ3MgaW50ZXJuYWwgZnVuY3Rpb25zLiBOb3RlIHRoYXQgaXQgb25seSB3b3Jrc1xuICAgKiAgIGluIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgYEVycm9yLmNhcHR1cmVTdGFja1RyYWNlYCwgYW5kIG9ubHkgd2hlblxuICAgKiAgIGBDaGFpLmNvbmZpZy5pbmNsdWRlU3RhY2tgIGhhc24ndCBiZWVuIHNldCB0byBgZmFsc2VgLlxuICAgKlxuICAgKiAtIGBsb2NrU3NmaWA6IFRoaXMgZmxhZyBjb250cm9scyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gYHNzZmlgIGZsYWdcbiAgICogICBzaG91bGQgcmV0YWluIGl0cyBjdXJyZW50IHZhbHVlLCBldmVuIGFzIGFzc2VydGlvbnMgYXJlIGNoYWluZWQgb2ZmIG9mXG4gICAqICAgdGhpcyBvYmplY3QuIFRoaXMgaXMgdXN1YWxseSBzZXQgdG8gYHRydWVgIHdoZW4gY3JlYXRpbmcgYSBuZXcgYXNzZXJ0aW9uXG4gICAqICAgZnJvbSB3aXRoaW4gYW5vdGhlciBhc3NlcnRpb24uIEl0J3MgYWxzbyB0ZW1wb3JhcmlseSBzZXQgdG8gYHRydWVgIGJlZm9yZVxuICAgKiAgIGFuIG92ZXJ3cml0dGVuIGFzc2VydGlvbiBnZXRzIGNhbGxlZCBieSB0aGUgb3ZlcndyaXRpbmcgYXNzZXJ0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSBvYmogdGFyZ2V0IG9mIHRoZSBhc3NlcnRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyAob3B0aW9uYWwpIGN1c3RvbSBlcnJvciBtZXNzYWdlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHNzZmkgKG9wdGlvbmFsKSBzdGFydGluZyBwb2ludCBmb3IgcmVtb3Zpbmcgc3RhY2sgZnJhbWVzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbG9ja1NzZmkgKG9wdGlvbmFsKSB3aGV0aGVyIG9yIG5vdCB0aGUgc3NmaSBmbGFnIGlzIGxvY2tlZFxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgZnVuY3Rpb24gQXNzZXJ0aW9uIChvYmosIG1zZywgc3NmaSwgbG9ja1NzZmkpIHtcbiAgICBmbGFnKHRoaXMsICdzc2ZpJywgc3NmaSB8fCBBc3NlcnRpb24pO1xuICAgIGZsYWcodGhpcywgJ2xvY2tTc2ZpJywgbG9ja1NzZmkpO1xuICAgIGZsYWcodGhpcywgJ29iamVjdCcsIG9iaik7XG4gICAgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG5cbiAgICByZXR1cm4gdXRpbC5wcm94aWZ5KHRoaXMpO1xuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFzc2VydGlvbiwgJ2luY2x1ZGVTdGFjaycsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS53YXJuKCdBc3NlcnRpb24uaW5jbHVkZVN0YWNrIGlzIGRlcHJlY2F0ZWQsIHVzZSBjaGFpLmNvbmZpZy5pbmNsdWRlU3RhY2sgaW5zdGVhZC4nKTtcbiAgICAgIHJldHVybiBjb25maWcuaW5jbHVkZVN0YWNrO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgY29uc29sZS53YXJuKCdBc3NlcnRpb24uaW5jbHVkZVN0YWNrIGlzIGRlcHJlY2F0ZWQsIHVzZSBjaGFpLmNvbmZpZy5pbmNsdWRlU3RhY2sgaW5zdGVhZC4nKTtcbiAgICAgIGNvbmZpZy5pbmNsdWRlU3RhY2sgPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBc3NlcnRpb24sICdzaG93RGlmZicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS53YXJuKCdBc3NlcnRpb24uc2hvd0RpZmYgaXMgZGVwcmVjYXRlZCwgdXNlIGNoYWkuY29uZmlnLnNob3dEaWZmIGluc3RlYWQuJyk7XG4gICAgICByZXR1cm4gY29uZmlnLnNob3dEaWZmO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgY29uc29sZS53YXJuKCdBc3NlcnRpb24uc2hvd0RpZmYgaXMgZGVwcmVjYXRlZCwgdXNlIGNoYWkuY29uZmlnLnNob3dEaWZmIGluc3RlYWQuJyk7XG4gICAgICBjb25maWcuc2hvd0RpZmYgPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICAgIHV0aWwuYWRkUHJvcGVydHkodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuKTtcbiAgfTtcblxuICBBc3NlcnRpb24uYWRkTWV0aG9kID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gICAgdXRpbC5hZGRNZXRob2QodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuKTtcbiAgfTtcblxuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kID0gZnVuY3Rpb24gKG5hbWUsIGZuLCBjaGFpbmluZ0JlaGF2aW9yKSB7XG4gICAgdXRpbC5hZGRDaGFpbmFibGVNZXRob2QodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuLCBjaGFpbmluZ0JlaGF2aW9yKTtcbiAgfTtcblxuICBBc3NlcnRpb24ub3ZlcndyaXRlUHJvcGVydHkgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgICB1dGlsLm92ZXJ3cml0ZVByb3BlcnR5KHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbik7XG4gIH07XG5cbiAgQXNzZXJ0aW9uLm92ZXJ3cml0ZU1ldGhvZCA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICAgIHV0aWwub3ZlcndyaXRlTWV0aG9kKHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbik7XG4gIH07XG5cbiAgQXNzZXJ0aW9uLm92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZCA9IGZ1bmN0aW9uIChuYW1lLCBmbiwgY2hhaW5pbmdCZWhhdmlvcikge1xuICAgIHV0aWwub3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kKHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbiwgY2hhaW5pbmdCZWhhdmlvcik7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuYXNzZXJ0KGV4cHJlc3Npb24sIG1lc3NhZ2UsIG5lZ2F0ZU1lc3NhZ2UsIGV4cGVjdGVkLCBhY3R1YWwsIHNob3dEaWZmKVxuICAgKlxuICAgKiBFeGVjdXRlcyBhbiBleHByZXNzaW9uIGFuZCBjaGVjayBleHBlY3RhdGlvbnMuIFRocm93cyBBc3NlcnRpb25FcnJvciBmb3IgcmVwb3J0aW5nIGlmIHRlc3QgZG9lc24ndCBwYXNzLlxuICAgKlxuICAgKiBAbmFtZSBhc3NlcnRcbiAgICogQHBhcmFtIHtQaGlsb3NvcGhpY2FsfSBleHByZXNzaW9uIHRvIGJlIHRlc3RlZFxuICAgKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gbWVzc2FnZSBvciBmdW5jdGlvbiB0aGF0IHJldHVybnMgbWVzc2FnZSB0byBkaXNwbGF5IGlmIGV4cHJlc3Npb24gZmFpbHNcbiAgICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IG5lZ2F0ZWRNZXNzYWdlIG9yIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBuZWdhdGVkTWVzc2FnZSB0byBkaXNwbGF5IGlmIG5lZ2F0ZWQgZXhwcmVzc2lvbiBmYWlsc1xuICAgKiBAcGFyYW0ge01peGVkfSBleHBlY3RlZCB2YWx1ZSAocmVtZW1iZXIgdG8gY2hlY2sgZm9yIG5lZ2F0aW9uKVxuICAgKiBAcGFyYW0ge01peGVkfSBhY3R1YWwgKG9wdGlvbmFsKSB3aWxsIGRlZmF1bHQgdG8gYHRoaXMub2JqYFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHNob3dEaWZmIChvcHRpb25hbCkgd2hlbiBzZXQgdG8gYHRydWVgLCBhc3NlcnQgd2lsbCBkaXNwbGF5IGEgZGlmZiBpbiBhZGRpdGlvbiB0byB0aGUgbWVzc2FnZSBpZiBleHByZXNzaW9uIGZhaWxzXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBBc3NlcnRpb24ucHJvdG90eXBlLmFzc2VydCA9IGZ1bmN0aW9uIChleHByLCBtc2csIG5lZ2F0ZU1zZywgZXhwZWN0ZWQsIF9hY3R1YWwsIHNob3dEaWZmKSB7XG4gICAgdmFyIG9rID0gdXRpbC50ZXN0KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGZhbHNlICE9PSBzaG93RGlmZikgc2hvd0RpZmYgPSB0cnVlO1xuICAgIGlmICh1bmRlZmluZWQgPT09IGV4cGVjdGVkICYmIHVuZGVmaW5lZCA9PT0gX2FjdHVhbCkgc2hvd0RpZmYgPSBmYWxzZTtcbiAgICBpZiAodHJ1ZSAhPT0gY29uZmlnLnNob3dEaWZmKSBzaG93RGlmZiA9IGZhbHNlO1xuXG4gICAgaWYgKCFvaykge1xuICAgICAgbXNnID0gdXRpbC5nZXRNZXNzYWdlKHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB2YXIgYWN0dWFsID0gdXRpbC5nZXRBY3R1YWwodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihtc2csIHtcbiAgICAgICAgICBhY3R1YWw6IGFjdHVhbFxuICAgICAgICAsIGV4cGVjdGVkOiBleHBlY3RlZFxuICAgICAgICAsIHNob3dEaWZmOiBzaG93RGlmZlxuICAgICAgfSwgKGNvbmZpZy5pbmNsdWRlU3RhY2spID8gdGhpcy5hc3NlcnQgOiBmbGFnKHRoaXMsICdzc2ZpJykpO1xuICAgIH1cbiAgfTtcblxuICAvKiFcbiAgICogIyMjIC5fb2JqXG4gICAqXG4gICAqIFF1aWNrIHJlZmVyZW5jZSB0byBzdG9yZWQgYGFjdHVhbGAgdmFsdWUgZm9yIHBsdWdpbiBkZXZlbG9wZXJzLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFzc2VydGlvbi5wcm90b3R5cGUsICdfb2JqJyxcbiAgICB7IGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgICB9XG4gICAgLCBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgZmxhZyh0aGlzLCAnb2JqZWN0JywgdmFsKTtcbiAgICAgIH1cbiAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgLyoqXG4gICAqICMjIyBjb25maWcuaW5jbHVkZVN0YWNrXG4gICAqXG4gICAqIFVzZXIgY29uZmlndXJhYmxlIHByb3BlcnR5LCBpbmZsdWVuY2VzIHdoZXRoZXIgc3RhY2sgdHJhY2VcbiAgICogaXMgaW5jbHVkZWQgaW4gQXNzZXJ0aW9uIGVycm9yIG1lc3NhZ2UuIERlZmF1bHQgb2YgZmFsc2VcbiAgICogc3VwcHJlc3NlcyBzdGFjayB0cmFjZSBpbiB0aGUgZXJyb3IgbWVzc2FnZS5cbiAgICpcbiAgICogICAgIGNoYWkuY29uZmlnLmluY2x1ZGVTdGFjayA9IHRydWU7ICAvLyBlbmFibGUgc3RhY2sgb24gZXJyb3JcbiAgICpcbiAgICogQHBhcmFtIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBpbmNsdWRlU3RhY2s6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiAjIyMgY29uZmlnLnNob3dEaWZmXG4gICAqXG4gICAqIFVzZXIgY29uZmlndXJhYmxlIHByb3BlcnR5LCBpbmZsdWVuY2VzIHdoZXRoZXIgb3Igbm90XG4gICAqIHRoZSBgc2hvd0RpZmZgIGZsYWcgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHRoZSB0aHJvd25cbiAgICogQXNzZXJ0aW9uRXJyb3JzLiBgZmFsc2VgIHdpbGwgYWx3YXlzIGJlIGBmYWxzZWA7IGB0cnVlYFxuICAgKiB3aWxsIGJlIHRydWUgd2hlbiB0aGUgYXNzZXJ0aW9uIGhhcyByZXF1ZXN0ZWQgYSBkaWZmXG4gICAqIGJlIHNob3duLlxuICAgKlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHNob3dEaWZmOiB0cnVlLFxuXG4gIC8qKlxuICAgKiAjIyMgY29uZmlnLnRydW5jYXRlVGhyZXNob2xkXG4gICAqXG4gICAqIFVzZXIgY29uZmlndXJhYmxlIHByb3BlcnR5LCBzZXRzIGxlbmd0aCB0aHJlc2hvbGQgZm9yIGFjdHVhbCBhbmRcbiAgICogZXhwZWN0ZWQgdmFsdWVzIGluIGFzc2VydGlvbiBlcnJvcnMuIElmIHRoaXMgdGhyZXNob2xkIGlzIGV4Y2VlZGVkLCBmb3JcbiAgICogZXhhbXBsZSBmb3IgbGFyZ2UgZGF0YSBzdHJ1Y3R1cmVzLCB0aGUgdmFsdWUgaXMgcmVwbGFjZWQgd2l0aCBzb21ldGhpbmdcbiAgICogbGlrZSBgWyBBcnJheSgzKSBdYCBvciBgeyBPYmplY3QgKHByb3AxLCBwcm9wMikgfWAuXG4gICAqXG4gICAqIFNldCBpdCB0byB6ZXJvIGlmIHlvdSB3YW50IHRvIGRpc2FibGUgdHJ1bmNhdGluZyBhbHRvZ2V0aGVyLlxuICAgKlxuICAgKiBUaGlzIGlzIGVzcGVjaWFsbHkgdXNlcmZ1bCB3aGVuIGRvaW5nIGFzc2VydGlvbnMgb24gYXJyYXlzOiBoYXZpbmcgdGhpc1xuICAgKiBzZXQgdG8gYSByZWFzb25hYmxlIGxhcmdlIHZhbHVlIG1ha2VzIHRoZSBmYWlsdXJlIG1lc3NhZ2VzIHJlYWRpbHlcbiAgICogaW5zcGVjdGFibGUuXG4gICAqXG4gICAqICAgICBjaGFpLmNvbmZpZy50cnVuY2F0ZVRocmVzaG9sZCA9IDA7ICAvLyBkaXNhYmxlIHRydW5jYXRpbmdcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHRydW5jYXRlVGhyZXNob2xkOiA0MCxcblxuICAvKipcbiAgICogIyMjIGNvbmZpZy51c2VQcm94eVxuICAgKlxuICAgKiBVc2VyIGNvbmZpZ3VyYWJsZSBwcm9wZXJ0eSwgZGVmaW5lcyBpZiBjaGFpIHdpbGwgdXNlIGEgUHJveHkgdG8gdGhyb3dcbiAgICogYW4gZXJyb3Igd2hlbiBhIG5vbi1leGlzdGVudCBwcm9wZXJ0eSBpcyByZWFkLCB3aGljaCBwcm90ZWN0cyB1c2Vyc1xuICAgKiBmcm9tIHR5cG9zIHdoZW4gdXNpbmcgcHJvcGVydHktYmFzZWQgYXNzZXJ0aW9ucy5cbiAgICpcbiAgICogU2V0IGl0IHRvIGZhbHNlIGlmIHlvdSB3YW50IHRvIGRpc2FibGUgdGhpcyBmZWF0dXJlLlxuICAgKlxuICAgKiAgICAgY2hhaS5jb25maWcudXNlUHJveHkgPSBmYWxzZTsgIC8vIGRpc2FibGUgdXNlIG9mIFByb3h5XG4gICAqXG4gICAqIFRoaXMgZmVhdHVyZSBpcyBhdXRvbWF0aWNhbGx5IGRpc2FibGVkIHJlZ2FyZGxlc3Mgb2YgdGhpcyBjb25maWcgdmFsdWVcbiAgICogaW4gZW52aXJvbm1lbnRzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBwcm94aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHVzZVByb3h5OiB0cnVlLFxuXG4gIC8qKlxuICAgKiAjIyMgY29uZmlnLnByb3h5RXhjbHVkZWRLZXlzXG4gICAqXG4gICAqIFVzZXIgY29uZmlndXJhYmxlIHByb3BlcnR5LCBkZWZpbmVzIHdoaWNoIHByb3BlcnRpZXMgc2hvdWxkIGJlIGlnbm9yZWRcbiAgICogaW5zdGVhZCBvZiB0aHJvd2luZyBhbiBlcnJvciBpZiB0aGV5IGRvIG5vdCBleGlzdCBvbiB0aGUgYXNzZXJ0aW9uLlxuICAgKiBUaGlzIGlzIG9ubHkgYXBwbGllZCBpZiB0aGUgZW52aXJvbm1lbnQgQ2hhaSBpcyBydW5uaW5nIGluIHN1cHBvcnRzIHByb3hpZXMgYW5kXG4gICAqIGlmIHRoZSBgdXNlUHJveHlgIGNvbmZpZ3VyYXRpb24gc2V0dGluZyBpcyBlbmFibGVkLlxuICAgKiBCeSBkZWZhdWx0LCBgdGhlbmAgYW5kIGBpbnNwZWN0YCB3aWxsIG5vdCB0aHJvdyBhbiBlcnJvciBpZiB0aGV5IGRvIG5vdCBleGlzdCBvbiB0aGVcbiAgICogYXNzZXJ0aW9uIG9iamVjdCBiZWNhdXNlIHRoZSBgLmluc3BlY3RgIHByb3BlcnR5IGlzIHJlYWQgYnkgYHV0aWwuaW5zcGVjdGAgKGZvciBleGFtcGxlLCB3aGVuXG4gICAqIHVzaW5nIGBjb25zb2xlLmxvZ2Agb24gdGhlIGFzc2VydGlvbiBvYmplY3QpIGFuZCBgLnRoZW5gIGlzIG5lY2Vzc2FyeSBmb3IgcHJvbWlzZSB0eXBlLWNoZWNraW5nLlxuICAgKlxuICAgKiAgICAgLy8gQnkgZGVmYXVsdCB0aGVzZSBrZXlzIHdpbGwgbm90IHRocm93IGFuIGVycm9yIGlmIHRoZXkgZG8gbm90IGV4aXN0IG9uIHRoZSBhc3NlcnRpb24gb2JqZWN0XG4gICAqICAgICBjaGFpLmNvbmZpZy5wcm94eUV4Y2x1ZGVkS2V5cyA9IFsndGhlbicsICdpbnNwZWN0J107XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHByb3h5RXhjbHVkZWRLZXlzOiBbJ3RoZW4nLCAnY2F0Y2gnLCAnaW5zcGVjdCcsICd0b0pTT04nXVxufTtcbiIsIi8qIVxuICogY2hhaVxuICogaHR0cDovL2NoYWlqcy5jb21cbiAqIENvcHlyaWdodChjKSAyMDExLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjaGFpLCBfKSB7XG4gIHZhciBBc3NlcnRpb24gPSBjaGFpLkFzc2VydGlvblxuICAgICwgQXNzZXJ0aW9uRXJyb3IgPSBjaGFpLkFzc2VydGlvbkVycm9yXG4gICAgLCBmbGFnID0gXy5mbGFnO1xuXG4gIC8qKlxuICAgKiAjIyMgTGFuZ3VhZ2UgQ2hhaW5zXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgYXJlIHByb3ZpZGVkIGFzIGNoYWluYWJsZSBnZXR0ZXJzIHRvIGltcHJvdmUgdGhlIHJlYWRhYmlsaXR5XG4gICAqIG9mIHlvdXIgYXNzZXJ0aW9ucy5cbiAgICpcbiAgICogKipDaGFpbnMqKlxuICAgKlxuICAgKiAtIHRvXG4gICAqIC0gYmVcbiAgICogLSBiZWVuXG4gICAqIC0gaXNcbiAgICogLSB0aGF0XG4gICAqIC0gd2hpY2hcbiAgICogLSBhbmRcbiAgICogLSBoYXNcbiAgICogLSBoYXZlXG4gICAqIC0gd2l0aFxuICAgKiAtIGF0XG4gICAqIC0gb2ZcbiAgICogLSBzYW1lXG4gICAqIC0gYnV0XG4gICAqIC0gZG9lc1xuICAgKiAtIHN0aWxsXG4gICAqXG4gICAqIEBuYW1lIGxhbmd1YWdlIGNoYWluc1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBbICd0bycsICdiZScsICdiZWVuJywgJ2lzJ1xuICAsICdhbmQnLCAnaGFzJywgJ2hhdmUnLCAnd2l0aCdcbiAgLCAndGhhdCcsICd3aGljaCcsICdhdCcsICdvZidcbiAgLCAnc2FtZScsICdidXQnLCAnZG9lcycsICdzdGlsbCcgXS5mb3JFYWNoKGZ1bmN0aW9uIChjaGFpbikge1xuICAgIEFzc2VydGlvbi5hZGRQcm9wZXJ0eShjaGFpbik7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdFxuICAgKlxuICAgKiBOZWdhdGVzIGFsbCBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpbi5cbiAgICpcbiAgICogICAgIGV4cGVjdChmdW5jdGlvbiAoKSB7fSkudG8ubm90LnRocm93KCk7XG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5ub3QuaGF2ZS5wcm9wZXJ0eSgnYicpO1xuICAgKiAgICAgZXhwZWN0KFsxLCAyXSkudG8uYmUuYW4oJ2FycmF5JykudGhhdC5kb2VzLm5vdC5pbmNsdWRlKDMpO1xuICAgKlxuICAgKiBKdXN0IGJlY2F1c2UgeW91IGNhbiBuZWdhdGUgYW55IGFzc2VydGlvbiB3aXRoIGAubm90YCBkb2Vzbid0IG1lYW4geW91XG4gICAqIHNob3VsZC4gV2l0aCBncmVhdCBwb3dlciBjb21lcyBncmVhdCByZXNwb25zaWJpbGl0eS4gSXQncyBvZnRlbiBiZXN0IHRvXG4gICAqIGFzc2VydCB0aGF0IHRoZSBvbmUgZXhwZWN0ZWQgb3V0cHV0IHdhcyBwcm9kdWNlZCwgcmF0aGVyIHRoYW4gYXNzZXJ0aW5nXG4gICAqIHRoYXQgb25lIG9mIGNvdW50bGVzcyB1bmV4cGVjdGVkIG91dHB1dHMgd2Fzbid0IHByb2R1Y2VkLiBTZWUgaW5kaXZpZHVhbFxuICAgKiBhc3NlcnRpb25zIGZvciBzcGVjaWZpYyBndWlkYW5jZS5cbiAgICpcbiAgICogICAgIGV4cGVjdCgyKS50by5lcXVhbCgyKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgyKS50by5ub3QuZXF1YWwoMSk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBAbmFtZSBub3RcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdub3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgZmxhZyh0aGlzLCAnbmVnYXRlJywgdHJ1ZSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmRlZXBcbiAgICpcbiAgICogQ2F1c2VzIGFsbCBgLmVxdWFsYCwgYC5pbmNsdWRlYCwgYC5tZW1iZXJzYCwgYC5rZXlzYCwgYW5kIGAucHJvcGVydHlgXG4gICAqIGFzc2VydGlvbnMgdGhhdCBmb2xsb3cgaW4gdGhlIGNoYWluIHRvIHVzZSBkZWVwIGVxdWFsaXR5IGluc3RlYWQgb2Ygc3RyaWN0XG4gICAqIChgPT09YCkgZXF1YWxpdHkuIFNlZSB0aGUgYGRlZXAtZXFsYCBwcm9qZWN0IHBhZ2UgZm9yIGluZm8gb24gdGhlIGRlZXBcbiAgICogZXF1YWxpdHkgYWxnb3JpdGhtOiBodHRwczovL2dpdGh1Yi5jb20vY2hhaWpzL2RlZXAtZXFsLlxuICAgKlxuICAgKiAgICAgLy8gVGFyZ2V0IG9iamVjdCBkZWVwbHkgKGJ1dCBub3Qgc3RyaWN0bHkpIGVxdWFscyBge2E6IDF9YFxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uZGVlcC5lcXVhbCh7YTogMX0pO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8ubm90LmVxdWFsKHthOiAxfSk7XG4gICAqXG4gICAqICAgICAvLyBUYXJnZXQgYXJyYXkgZGVlcGx5IChidXQgbm90IHN0cmljdGx5KSBpbmNsdWRlcyBge2E6IDF9YFxuICAgKiAgICAgZXhwZWN0KFt7YTogMX1dKS50by5kZWVwLmluY2x1ZGUoe2E6IDF9KTtcbiAgICogICAgIGV4cGVjdChbe2E6IDF9XSkudG8ubm90LmluY2x1ZGUoe2E6IDF9KTtcbiAgICpcbiAgICogICAgIC8vIFRhcmdldCBvYmplY3QgZGVlcGx5IChidXQgbm90IHN0cmljdGx5KSBpbmNsdWRlcyBgeDoge2E6IDF9YFxuICAgKiAgICAgZXhwZWN0KHt4OiB7YTogMX19KS50by5kZWVwLmluY2x1ZGUoe3g6IHthOiAxfX0pO1xuICAgKiAgICAgZXhwZWN0KHt4OiB7YTogMX19KS50by5ub3QuaW5jbHVkZSh7eDoge2E6IDF9fSk7XG4gICAqXG4gICAqICAgICAvLyBUYXJnZXQgYXJyYXkgZGVlcGx5IChidXQgbm90IHN0cmljdGx5KSBoYXMgbWVtYmVyIGB7YTogMX1gXG4gICAqICAgICBleHBlY3QoW3thOiAxfV0pLnRvLmhhdmUuZGVlcC5tZW1iZXJzKFt7YTogMX1dKTtcbiAgICogICAgIGV4cGVjdChbe2E6IDF9XSkudG8ubm90LmhhdmUubWVtYmVycyhbe2E6IDF9XSk7XG4gICAqXG4gICAqICAgICAvLyBUYXJnZXQgc2V0IGRlZXBseSAoYnV0IG5vdCBzdHJpY3RseSkgaGFzIGtleSBge2E6IDF9YFxuICAgKiAgICAgZXhwZWN0KG5ldyBTZXQoW3thOiAxfV0pKS50by5oYXZlLmRlZXAua2V5cyhbe2E6IDF9XSk7XG4gICAqICAgICBleHBlY3QobmV3IFNldChbe2E6IDF9XSkpLnRvLm5vdC5oYXZlLmtleXMoW3thOiAxfV0pO1xuICAgKlxuICAgKiAgICAgLy8gVGFyZ2V0IG9iamVjdCBkZWVwbHkgKGJ1dCBub3Qgc3RyaWN0bHkpIGhhcyBwcm9wZXJ0eSBgeDoge2E6IDF9YFxuICAgKiAgICAgZXhwZWN0KHt4OiB7YTogMX19KS50by5oYXZlLmRlZXAucHJvcGVydHkoJ3gnLCB7YTogMX0pO1xuICAgKiAgICAgZXhwZWN0KHt4OiB7YTogMX19KS50by5ub3QuaGF2ZS5wcm9wZXJ0eSgneCcsIHthOiAxfSk7XG4gICAqXG4gICAqIEBuYW1lIGRlZXBcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdkZWVwJywgZnVuY3Rpb24gKCkge1xuICAgIGZsYWcodGhpcywgJ2RlZXAnLCB0cnVlKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAubmVzdGVkXG4gICAqXG4gICAqIEVuYWJsZXMgZG90LSBhbmQgYnJhY2tldC1ub3RhdGlvbiBpbiBhbGwgYC5wcm9wZXJ0eWAgYW5kIGAuaW5jbHVkZWBcbiAgICogYXNzZXJ0aW9ucyB0aGF0IGZvbGxvdyBpbiB0aGUgY2hhaW4uXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IHtiOiBbJ3gnLCAneSddfX0pLnRvLmhhdmUubmVzdGVkLnByb3BlcnR5KCdhLmJbMV0nKTtcbiAgICogICAgIGV4cGVjdCh7YToge2I6IFsneCcsICd5J119fSkudG8ubmVzdGVkLmluY2x1ZGUoeydhLmJbMV0nOiAneSd9KTtcbiAgICpcbiAgICogSWYgYC5gIG9yIGBbXWAgYXJlIHBhcnQgb2YgYW4gYWN0dWFsIHByb3BlcnR5IG5hbWUsIHRoZXkgY2FuIGJlIGVzY2FwZWQgYnlcbiAgICogYWRkaW5nIHR3byBiYWNrc2xhc2hlcyBiZWZvcmUgdGhlbS5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7Jy5hJzogeydbYl0nOiAneCd9fSkudG8uaGF2ZS5uZXN0ZWQucHJvcGVydHkoJ1xcXFwuYS5cXFxcW2JcXFxcXScpO1xuICAgKiAgICAgZXhwZWN0KHsnLmEnOiB7J1tiXSc6ICd4J319KS50by5uZXN0ZWQuaW5jbHVkZSh7J1xcXFwuYS5cXFxcW2JcXFxcXSc6ICd4J30pO1xuICAgKlxuICAgKiBgLm5lc3RlZGAgY2Fubm90IGJlIGNvbWJpbmVkIHdpdGggYC5vd25gLlxuICAgKlxuICAgKiBAbmFtZSBuZXN0ZWRcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCduZXN0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgZmxhZyh0aGlzLCAnbmVzdGVkJywgdHJ1ZSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLm93blxuICAgKlxuICAgKiBDYXVzZXMgYWxsIGAucHJvcGVydHlgIGFuZCBgLmluY2x1ZGVgIGFzc2VydGlvbnMgdGhhdCBmb2xsb3cgaW4gdGhlIGNoYWluXG4gICAqIHRvIGlnbm9yZSBpbmhlcml0ZWQgcHJvcGVydGllcy5cbiAgICpcbiAgICogICAgIE9iamVjdC5wcm90b3R5cGUuYiA9IDI7XG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5oYXZlLm93bi5wcm9wZXJ0eSgnYScpO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaGF2ZS5wcm9wZXJ0eSgnYicpO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8ubm90LmhhdmUub3duLnByb3BlcnR5KCdiJyk7XG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5vd24uaW5jbHVkZSh7YTogMX0pO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaW5jbHVkZSh7YjogMn0pLmJ1dC5ub3Qub3duLmluY2x1ZGUoe2I6IDJ9KTtcbiAgICpcbiAgICogYC5vd25gIGNhbm5vdCBiZSBjb21iaW5lZCB3aXRoIGAubmVzdGVkYC5cbiAgICpcbiAgICogQG5hbWUgb3duXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnb3duJywgZnVuY3Rpb24gKCkge1xuICAgIGZsYWcodGhpcywgJ293bicsIHRydWUpO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5vcmRlcmVkXG4gICAqXG4gICAqIENhdXNlcyBhbGwgYC5tZW1iZXJzYCBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpbiB0byByZXF1aXJlIHRoYXRcbiAgICogbWVtYmVycyBiZSBpbiB0aGUgc2FtZSBvcmRlci5cbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwgMl0pLnRvLmhhdmUub3JkZXJlZC5tZW1iZXJzKFsxLCAyXSlcbiAgICogICAgICAgLmJ1dC5ub3QuaGF2ZS5vcmRlcmVkLm1lbWJlcnMoWzIsIDFdKTtcbiAgICpcbiAgICogV2hlbiBgLmluY2x1ZGVgIGFuZCBgLm9yZGVyZWRgIGFyZSBjb21iaW5lZCwgdGhlIG9yZGVyaW5nIGJlZ2lucyBhdCB0aGVcbiAgICogc3RhcnQgb2YgYm90aCBhcnJheXMuXG4gICAqXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5pbmNsdWRlLm9yZGVyZWQubWVtYmVycyhbMSwgMl0pXG4gICAqICAgICAgIC5idXQubm90LmluY2x1ZGUub3JkZXJlZC5tZW1iZXJzKFsyLCAzXSk7XG4gICAqXG4gICAqIEBuYW1lIG9yZGVyZWRcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdvcmRlcmVkJywgZnVuY3Rpb24gKCkge1xuICAgIGZsYWcodGhpcywgJ29yZGVyZWQnLCB0cnVlKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuYW55XG4gICAqXG4gICAqIENhdXNlcyBhbGwgYC5rZXlzYCBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpbiB0byBvbmx5IHJlcXVpcmUgdGhhdFxuICAgKiB0aGUgdGFyZ2V0IGhhdmUgYXQgbGVhc3Qgb25lIG9mIHRoZSBnaXZlbiBrZXlzLiBUaGlzIGlzIHRoZSBvcHBvc2l0ZSBvZlxuICAgKiBgLmFsbGAsIHdoaWNoIHJlcXVpcmVzIHRoYXQgdGhlIHRhcmdldCBoYXZlIGFsbCBvZiB0aGUgZ2l2ZW4ga2V5cy5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMSwgYjogMn0pLnRvLm5vdC5oYXZlLmFueS5rZXlzKCdjJywgJ2QnKTtcbiAgICpcbiAgICogU2VlIHRoZSBgLmtleXNgIGRvYyBmb3IgZ3VpZGFuY2Ugb24gd2hlbiB0byB1c2UgYC5hbnlgIG9yIGAuYWxsYC5cbiAgICpcbiAgICogQG5hbWUgYW55XG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnYW55JywgZnVuY3Rpb24gKCkge1xuICAgIGZsYWcodGhpcywgJ2FueScsIHRydWUpO1xuICAgIGZsYWcodGhpcywgJ2FsbCcsIGZhbHNlKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuYWxsXG4gICAqXG4gICAqIENhdXNlcyBhbGwgYC5rZXlzYCBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpbiB0byByZXF1aXJlIHRoYXQgdGhlXG4gICAqIHRhcmdldCBoYXZlIGFsbCBvZiB0aGUgZ2l2ZW4ga2V5cy4gVGhpcyBpcyB0aGUgb3Bwb3NpdGUgb2YgYC5hbnlgLCB3aGljaFxuICAgKiBvbmx5IHJlcXVpcmVzIHRoYXQgdGhlIHRhcmdldCBoYXZlIGF0IGxlYXN0IG9uZSBvZiB0aGUgZ2l2ZW4ga2V5cy5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMSwgYjogMn0pLnRvLmhhdmUuYWxsLmtleXMoJ2EnLCAnYicpO1xuICAgKlxuICAgKiBOb3RlIHRoYXQgYC5hbGxgIGlzIHVzZWQgYnkgZGVmYXVsdCB3aGVuIG5laXRoZXIgYC5hbGxgIG5vciBgLmFueWAgYXJlXG4gICAqIGFkZGVkIGVhcmxpZXIgaW4gdGhlIGNoYWluLiBIb3dldmVyLCBpdCdzIG9mdGVuIGJlc3QgdG8gYWRkIGAuYWxsYCBhbnl3YXlcbiAgICogYmVjYXVzZSBpdCBpbXByb3ZlcyByZWFkYWJpbGl0eS5cbiAgICpcbiAgICogU2VlIHRoZSBgLmtleXNgIGRvYyBmb3IgZ3VpZGFuY2Ugb24gd2hlbiB0byB1c2UgYC5hbnlgIG9yIGAuYWxsYC5cbiAgICpcbiAgICogQG5hbWUgYWxsXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnYWxsJywgZnVuY3Rpb24gKCkge1xuICAgIGZsYWcodGhpcywgJ2FsbCcsIHRydWUpO1xuICAgIGZsYWcodGhpcywgJ2FueScsIGZhbHNlKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuYSh0eXBlWywgbXNnXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQncyB0eXBlIGlzIGVxdWFsIHRvIHRoZSBnaXZlbiBzdHJpbmcgYHR5cGVgLiBUeXBlc1xuICAgKiBhcmUgY2FzZSBpbnNlbnNpdGl2ZS4gU2VlIHRoZSBgdHlwZS1kZXRlY3RgIHByb2plY3QgcGFnZSBmb3IgaW5mbyBvbiB0aGVcbiAgICogdHlwZSBkZXRlY3Rpb24gYWxnb3JpdGhtOiBodHRwczovL2dpdGh1Yi5jb20vY2hhaWpzL3R5cGUtZGV0ZWN0LlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5iZS5hKCdzdHJpbmcnKTtcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLmJlLmFuKCdvYmplY3QnKTtcbiAgICogICAgIGV4cGVjdChudWxsKS50by5iZS5hKCdudWxsJyk7XG4gICAqICAgICBleHBlY3QodW5kZWZpbmVkKS50by5iZS5hbigndW5kZWZpbmVkJyk7XG4gICAqICAgICBleHBlY3QobmV3IEVycm9yKS50by5iZS5hbignZXJyb3InKTtcbiAgICogICAgIGV4cGVjdChQcm9taXNlLnJlc29sdmUoKSkudG8uYmUuYSgncHJvbWlzZScpO1xuICAgKiAgICAgZXhwZWN0KG5ldyBGbG9hdDMyQXJyYXkpLnRvLmJlLmEoJ2Zsb2F0MzJhcnJheScpO1xuICAgKiAgICAgZXhwZWN0KFN5bWJvbCgpKS50by5iZS5hKCdzeW1ib2wnKTtcbiAgICpcbiAgICogYC5hYCBzdXBwb3J0cyBvYmplY3RzIHRoYXQgaGF2ZSBhIGN1c3RvbSB0eXBlIHNldCB2aWEgYFN5bWJvbC50b1N0cmluZ1RhZ2AuXG4gICAqXG4gICAqICAgICB2YXIgbXlPYmogPSB7XG4gICAqICAgICAgIFtTeW1ib2wudG9TdHJpbmdUYWddOiAnbXlDdXN0b21UeXBlJ1xuICAgKiAgICAgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChteU9iaikudG8uYmUuYSgnbXlDdXN0b21UeXBlJykuYnV0Lm5vdC5hbignb2JqZWN0Jyk7XG4gICAqXG4gICAqIEl0J3Mgb2Z0ZW4gYmVzdCB0byB1c2UgYC5hYCB0byBjaGVjayBhIHRhcmdldCdzIHR5cGUgYmVmb3JlIG1ha2luZyBtb3JlXG4gICAqIGFzc2VydGlvbnMgb24gdGhlIHNhbWUgdGFyZ2V0LiBUaGF0IHdheSwgeW91IGF2b2lkIHVuZXhwZWN0ZWQgYmVoYXZpb3IgZnJvbVxuICAgKiBhbnkgYXNzZXJ0aW9uIHRoYXQgZG9lcyBkaWZmZXJlbnQgdGhpbmdzIGJhc2VkIG9uIHRoZSB0YXJnZXQncyB0eXBlLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uYmUuYW4oJ2FycmF5JykudGhhdC5pbmNsdWRlcygyKTtcbiAgICogICAgIGV4cGVjdChbXSkudG8uYmUuYW4oJ2FycmF5JykudGhhdC5pcy5lbXB0eTtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5hYC4gSG93ZXZlciwgaXQncyBvZnRlbiBiZXN0IHRvXG4gICAqIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQgaXMgdGhlIGV4cGVjdGVkIHR5cGUsIHJhdGhlciB0aGFuIGFzc2VydGluZyB0aGF0IGl0XG4gICAqIGlzbid0IG9uZSBvZiBtYW55IHVuZXhwZWN0ZWQgdHlwZXMuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmJlLmEoJ3N0cmluZycpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5ub3QuYmUuYW4oJ2FycmF5Jyk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBgLmFgIGFjY2VwdHMgYW4gb3B0aW9uYWwgYG1zZ2AgYXJndW1lbnQgd2hpY2ggaXMgYSBjdXN0b20gZXJyb3IgbWVzc2FnZSB0b1xuICAgKiBzaG93IHdoZW4gdGhlIGFzc2VydGlvbiBmYWlscy4gVGhlIG1lc3NhZ2UgY2FuIGFsc28gYmUgZ2l2ZW4gYXMgdGhlIHNlY29uZFxuICAgKiBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5iZS5hKCdzdHJpbmcnLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoMSwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmJlLmEoJ3N0cmluZycpO1xuICAgKlxuICAgKiBgLmFgIGNhbiBhbHNvIGJlIHVzZWQgYXMgYSBsYW5ndWFnZSBjaGFpbiB0byBpbXByb3ZlIHRoZSByZWFkYWJpbGl0eSBvZlxuICAgKiB5b3VyIGFzc2VydGlvbnMuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2I6IDJ9KS50by5oYXZlLmEucHJvcGVydHkoJ2InKTtcbiAgICpcbiAgICogVGhlIGFsaWFzIGAuYW5gIGNhbiBiZSB1c2VkIGludGVyY2hhbmdlYWJseSB3aXRoIGAuYWAuXG4gICAqXG4gICAqIEBuYW1lIGFcbiAgICogQGFsaWFzIGFuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhbiAodHlwZSwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgYXJ0aWNsZSA9IH5bICdhJywgJ2UnLCAnaScsICdvJywgJ3UnIF0uaW5kZXhPZih0eXBlLmNoYXJBdCgwKSkgPyAnYW4gJyA6ICdhICc7XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgdHlwZSA9PT0gXy50eXBlKG9iaikudG9Mb3dlckNhc2UoKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSAnICsgYXJ0aWNsZSArIHR5cGVcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gbm90IHRvIGJlICcgKyBhcnRpY2xlICsgdHlwZVxuICAgICk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKCdhbicsIGFuKTtcbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZCgnYScsIGFuKTtcblxuICAvKipcbiAgICogIyMjIC5pbmNsdWRlKHZhbFssIG1zZ10pXG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBpcyBhIHN0cmluZywgYC5pbmNsdWRlYCBhc3NlcnRzIHRoYXQgdGhlIGdpdmVuIHN0cmluZyBgdmFsYFxuICAgKiBpcyBhIHN1YnN0cmluZyBvZiB0aGUgdGFyZ2V0LlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb29iYXInKS50by5pbmNsdWRlKCdmb28nKTtcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIGFuIGFycmF5LCBgLmluY2x1ZGVgIGFzc2VydHMgdGhhdCB0aGUgZ2l2ZW4gYHZhbGAgaXMgYVxuICAgKiBtZW1iZXIgb2YgdGhlIHRhcmdldC5cbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmluY2x1ZGUoMik7XG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBpcyBhbiBvYmplY3QsIGAuaW5jbHVkZWAgYXNzZXJ0cyB0aGF0IHRoZSBnaXZlbiBvYmplY3RcbiAgICogYHZhbGAncyBwcm9wZXJ0aWVzIGFyZSBhIHN1YnNldCBvZiB0aGUgdGFyZ2V0J3MgcHJvcGVydGllcy5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMSwgYjogMiwgYzogM30pLnRvLmluY2x1ZGUoe2E6IDEsIGI6IDJ9KTtcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIGEgU2V0IG9yIFdlYWtTZXQsIGAuaW5jbHVkZWAgYXNzZXJ0cyB0aGF0IHRoZSBnaXZlbiBgdmFsYCBpcyBhXG4gICAqIG1lbWJlciBvZiB0aGUgdGFyZ2V0LiBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobSBpcyB1c2VkLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KG5ldyBTZXQoWzEsIDJdKSkudG8uaW5jbHVkZSgyKTtcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIGEgTWFwLCBgLmluY2x1ZGVgIGFzc2VydHMgdGhhdCB0aGUgZ2l2ZW4gYHZhbGAgaXMgb25lIG9mXG4gICAqIHRoZSB2YWx1ZXMgb2YgdGhlIHRhcmdldC4gU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG0gaXMgdXNlZC5cbiAgICpcbiAgICogICAgIGV4cGVjdChuZXcgTWFwKFtbJ2EnLCAxXSwgWydiJywgMl1dKSkudG8uaW5jbHVkZSgyKTtcbiAgICpcbiAgICogQmVjYXVzZSBgLmluY2x1ZGVgIGRvZXMgZGlmZmVyZW50IHRoaW5ncyBiYXNlZCBvbiB0aGUgdGFyZ2V0J3MgdHlwZSwgaXQnc1xuICAgKiBpbXBvcnRhbnQgdG8gY2hlY2sgdGhlIHRhcmdldCdzIHR5cGUgYmVmb3JlIHVzaW5nIGAuaW5jbHVkZWAuIFNlZSB0aGUgYC5hYFxuICAgKiBkb2MgZm9yIGluZm8gb24gdGVzdGluZyBhIHRhcmdldCdzIHR5cGUuXG4gICAqXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5iZS5hbignYXJyYXknKS50aGF0LmluY2x1ZGVzKDIpO1xuICAgKlxuICAgKiBCeSBkZWZhdWx0LCBzdHJpY3QgKGA9PT1gKSBlcXVhbGl0eSBpcyB1c2VkIHRvIGNvbXBhcmUgYXJyYXkgbWVtYmVycyBhbmRcbiAgICogb2JqZWN0IHByb3BlcnRpZXMuIEFkZCBgLmRlZXBgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIHVzZSBkZWVwIGVxdWFsaXR5XG4gICAqIGluc3RlYWQgKFdlYWtTZXQgdGFyZ2V0cyBhcmUgbm90IHN1cHBvcnRlZCkuIFNlZSB0aGUgYGRlZXAtZXFsYCBwcm9qZWN0XG4gICAqIHBhZ2UgZm9yIGluZm8gb24gdGhlIGRlZXAgZXF1YWxpdHkgYWxnb3JpdGhtOiBodHRwczovL2dpdGh1Yi5jb20vY2hhaWpzL2RlZXAtZXFsLlxuICAgKlxuICAgKiAgICAgLy8gVGFyZ2V0IGFycmF5IGRlZXBseSAoYnV0IG5vdCBzdHJpY3RseSkgaW5jbHVkZXMgYHthOiAxfWBcbiAgICogICAgIGV4cGVjdChbe2E6IDF9XSkudG8uZGVlcC5pbmNsdWRlKHthOiAxfSk7XG4gICAqICAgICBleHBlY3QoW3thOiAxfV0pLnRvLm5vdC5pbmNsdWRlKHthOiAxfSk7XG4gICAqXG4gICAqICAgICAvLyBUYXJnZXQgb2JqZWN0IGRlZXBseSAoYnV0IG5vdCBzdHJpY3RseSkgaW5jbHVkZXMgYHg6IHthOiAxfWBcbiAgICogICAgIGV4cGVjdCh7eDoge2E6IDF9fSkudG8uZGVlcC5pbmNsdWRlKHt4OiB7YTogMX19KTtcbiAgICogICAgIGV4cGVjdCh7eDoge2E6IDF9fSkudG8ubm90LmluY2x1ZGUoe3g6IHthOiAxfX0pO1xuICAgKlxuICAgKiBCeSBkZWZhdWx0LCBhbGwgb2YgdGhlIHRhcmdldCdzIHByb3BlcnRpZXMgYXJlIHNlYXJjaGVkIHdoZW4gd29ya2luZyB3aXRoXG4gICAqIG9iamVjdHMuIFRoaXMgaW5jbHVkZXMgcHJvcGVydGllcyB0aGF0IGFyZSBpbmhlcml0ZWQgYW5kL29yIG5vbi1lbnVtZXJhYmxlLlxuICAgKiBBZGQgYC5vd25gIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIGV4Y2x1ZGUgdGhlIHRhcmdldCdzIGluaGVyaXRlZFxuICAgKiBwcm9wZXJ0aWVzIGZyb20gdGhlIHNlYXJjaC5cbiAgICpcbiAgICogICAgIE9iamVjdC5wcm90b3R5cGUuYiA9IDI7XG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5vd24uaW5jbHVkZSh7YTogMX0pO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaW5jbHVkZSh7YjogMn0pLmJ1dC5ub3Qub3duLmluY2x1ZGUoe2I6IDJ9KTtcbiAgICpcbiAgICogTm90ZSB0aGF0IGEgdGFyZ2V0IG9iamVjdCBpcyBhbHdheXMgb25seSBzZWFyY2hlZCBmb3IgYHZhbGAncyBvd25cbiAgICogZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBgLmRlZXBgIGFuZCBgLm93bmAgY2FuIGJlIGNvbWJpbmVkLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiB7YjogMn19KS50by5kZWVwLm93bi5pbmNsdWRlKHthOiB7YjogMn19KTtcbiAgICpcbiAgICogQWRkIGAubmVzdGVkYCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBlbmFibGUgZG90LSBhbmQgYnJhY2tldC1ub3RhdGlvbiB3aGVuXG4gICAqIHJlZmVyZW5jaW5nIG5lc3RlZCBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiB7YjogWyd4JywgJ3knXX19KS50by5uZXN0ZWQuaW5jbHVkZSh7J2EuYlsxXSc6ICd5J30pO1xuICAgKlxuICAgKiBJZiBgLmAgb3IgYFtdYCBhcmUgcGFydCBvZiBhbiBhY3R1YWwgcHJvcGVydHkgbmFtZSwgdGhleSBjYW4gYmUgZXNjYXBlZCBieVxuICAgKiBhZGRpbmcgdHdvIGJhY2tzbGFzaGVzIGJlZm9yZSB0aGVtLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHsnLmEnOiB7J1tiXSc6IDJ9fSkudG8ubmVzdGVkLmluY2x1ZGUoeydcXFxcLmEuXFxcXFtiXFxcXF0nOiAyfSk7XG4gICAqXG4gICAqIGAuZGVlcGAgYW5kIGAubmVzdGVkYCBjYW4gYmUgY29tYmluZWQuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IHtiOiBbe2M6IDN9XX19KS50by5kZWVwLm5lc3RlZC5pbmNsdWRlKHsnYS5iWzBdJzoge2M6IDN9fSk7XG4gICAqXG4gICAqIGAub3duYCBhbmQgYC5uZXN0ZWRgIGNhbm5vdCBiZSBjb21iaW5lZC5cbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5pbmNsdWRlYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vYmFyJykudG8ubm90LmluY2x1ZGUoJ3RhY28nKTtcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLm5vdC5pbmNsdWRlKDQpO1xuICAgKlxuICAgKiBIb3dldmVyLCBpdCdzIGRhbmdlcm91cyB0byBuZWdhdGUgYC5pbmNsdWRlYCB3aGVuIHRoZSB0YXJnZXQgaXMgYW4gb2JqZWN0LlxuICAgKiBUaGUgcHJvYmxlbSBpcyB0aGF0IGl0IGNyZWF0ZXMgdW5jZXJ0YWluIGV4cGVjdGF0aW9ucyBieSBhc3NlcnRpbmcgdGhhdCB0aGVcbiAgICogdGFyZ2V0IG9iamVjdCBkb2Vzbid0IGhhdmUgYWxsIG9mIGB2YWxgJ3Mga2V5L3ZhbHVlIHBhaXJzIGJ1dCBtYXkgb3IgbWF5XG4gICAqIG5vdCBoYXZlIHNvbWUgb2YgdGhlbS4gSXQncyBvZnRlbiBiZXN0IHRvIGlkZW50aWZ5IHRoZSBleGFjdCBvdXRwdXQgdGhhdCdzXG4gICAqIGV4cGVjdGVkLCBhbmQgdGhlbiB3cml0ZSBhbiBhc3NlcnRpb24gdGhhdCBvbmx5IGFjY2VwdHMgdGhhdCBleGFjdCBvdXRwdXQuXG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBvYmplY3QgaXNuJ3QgZXZlbiBleHBlY3RlZCB0byBoYXZlIGB2YWxgJ3Mga2V5cywgaXQnc1xuICAgKiBvZnRlbiBiZXN0IHRvIGFzc2VydCBleGFjdGx5IHRoYXQuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2M6IDN9KS50by5ub3QuaGF2ZS5hbnkua2V5cygnYScsICdiJyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2M6IDN9KS50by5ub3QuaW5jbHVkZSh7YTogMSwgYjogMn0pOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IG9iamVjdCBpcyBleHBlY3RlZCB0byBoYXZlIGB2YWxgJ3Mga2V5cywgaXQncyBvZnRlbiBiZXN0IHRvXG4gICAqIGFzc2VydCB0aGF0IGVhY2ggb2YgdGhlIHByb3BlcnRpZXMgaGFzIGl0cyBleHBlY3RlZCB2YWx1ZSwgcmF0aGVyIHRoYW5cbiAgICogYXNzZXJ0aW5nIHRoYXQgZWFjaCBwcm9wZXJ0eSBkb2Vzbid0IGhhdmUgb25lIG9mIG1hbnkgdW5leHBlY3RlZCB2YWx1ZXMuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDMsIGI6IDR9KS50by5pbmNsdWRlKHthOiAzLCBiOiA0fSk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2E6IDMsIGI6IDR9KS50by5ub3QuaW5jbHVkZSh7YTogMSwgYjogMn0pOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogYC5pbmNsdWRlYCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yXG4gICAqIG1lc3NhZ2UgdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzXG4gICAqIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5pbmNsdWRlKDQsICdub29vIHdoeSBmYWlsPz8nKTtcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10sICdub29vIHdoeSBmYWlsPz8nKS50by5pbmNsdWRlKDQpO1xuICAgKlxuICAgKiBgLmluY2x1ZGVgIGNhbiBhbHNvIGJlIHVzZWQgYXMgYSBsYW5ndWFnZSBjaGFpbiwgY2F1c2luZyBhbGwgYC5tZW1iZXJzYCBhbmRcbiAgICogYC5rZXlzYCBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpbiB0byByZXF1aXJlIHRoZSB0YXJnZXQgdG8gYmUgYVxuICAgKiBzdXBlcnNldCBvZiB0aGUgZXhwZWN0ZWQgc2V0LCByYXRoZXIgdGhhbiBhbiBpZGVudGljYWwgc2V0LiBOb3RlIHRoYXRcbiAgICogYC5tZW1iZXJzYCBpZ25vcmVzIGR1cGxpY2F0ZXMgaW4gdGhlIHN1YnNldCB3aGVuIGAuaW5jbHVkZWAgaXMgYWRkZWQuXG4gICAqXG4gICAqICAgICAvLyBUYXJnZXQgb2JqZWN0J3Mga2V5cyBhcmUgYSBzdXBlcnNldCBvZiBbJ2EnLCAnYiddIGJ1dCBub3QgaWRlbnRpY2FsXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDIsIGM6IDN9KS50by5pbmNsdWRlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICogICAgIGV4cGVjdCh7YTogMSwgYjogMiwgYzogM30pLnRvLm5vdC5oYXZlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICpcbiAgICogICAgIC8vIFRhcmdldCBhcnJheSBpcyBhIHN1cGVyc2V0IG9mIFsxLCAyXSBidXQgbm90IGlkZW50aWNhbFxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaW5jbHVkZS5tZW1iZXJzKFsxLCAyXSk7XG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5ub3QuaGF2ZS5tZW1iZXJzKFsxLCAyXSk7XG4gICAqXG4gICAqICAgICAvLyBEdXBsaWNhdGVzIGluIHRoZSBzdWJzZXQgYXJlIGlnbm9yZWRcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmluY2x1ZGUubWVtYmVycyhbMSwgMiwgMiwgMl0pO1xuICAgKlxuICAgKiBOb3RlIHRoYXQgYWRkaW5nIGAuYW55YCBlYXJsaWVyIGluIHRoZSBjaGFpbiBjYXVzZXMgdGhlIGAua2V5c2AgYXNzZXJ0aW9uXG4gICAqIHRvIGlnbm9yZSBgLmluY2x1ZGVgLlxuICAgKlxuICAgKiAgICAgLy8gQm90aCBhc3NlcnRpb25zIGFyZSBpZGVudGljYWxcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLmluY2x1ZGUuYW55LmtleXMoJ2EnLCAnYicpO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaGF2ZS5hbnkua2V5cygnYScsICdiJyk7XG4gICAqXG4gICAqIFRoZSBhbGlhc2VzIGAuaW5jbHVkZXNgLCBgLmNvbnRhaW5gLCBhbmQgYC5jb250YWluc2AgY2FuIGJlIHVzZWRcbiAgICogaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5pbmNsdWRlYC5cbiAgICpcbiAgICogQG5hbWUgaW5jbHVkZVxuICAgKiBAYWxpYXMgY29udGFpblxuICAgKiBAYWxpYXMgaW5jbHVkZXNcbiAgICogQGFsaWFzIGNvbnRhaW5zXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gU2FtZVZhbHVlWmVybyhhLCBiKSB7XG4gICAgcmV0dXJuIChfLmlzTmFOKGEpICYmIF8uaXNOYU4oYikpIHx8IGEgPT09IGI7XG4gIH1cblxuICBmdW5jdGlvbiBpbmNsdWRlQ2hhaW5pbmdCZWhhdmlvciAoKSB7XG4gICAgZmxhZyh0aGlzLCAnY29udGFpbnMnLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluY2x1ZGUgKHZhbCwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG5cbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgb2JqVHlwZSA9IF8udHlwZShvYmopLnRvTG93ZXJDYXNlKClcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBuZWdhdGUgPSBmbGFnKHRoaXMsICduZWdhdGUnKVxuICAgICAgLCBzc2ZpID0gZmxhZyh0aGlzLCAnc3NmaScpXG4gICAgICAsIGlzRGVlcCA9IGZsYWcodGhpcywgJ2RlZXAnKVxuICAgICAgLCBkZXNjcmlwdG9yID0gaXNEZWVwID8gJ2RlZXAgJyA6ICcnO1xuXG4gICAgZmxhZ01zZyA9IGZsYWdNc2cgPyBmbGFnTXNnICsgJzogJyA6ICcnO1xuXG4gICAgdmFyIGluY2x1ZGVkID0gZmFsc2U7XG5cbiAgICBzd2l0Y2ggKG9ialR5cGUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIGluY2x1ZGVkID0gb2JqLmluZGV4T2YodmFsKSAhPT0gLTE7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICd3ZWFrc2V0JzpcbiAgICAgICAgaWYgKGlzRGVlcCkge1xuICAgICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgICAgIGZsYWdNc2cgKyAndW5hYmxlIHRvIHVzZSAuZGVlcC5pbmNsdWRlIHdpdGggV2Vha1NldCcsXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICBzc2ZpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluY2x1ZGVkID0gb2JqLmhhcyh2YWwpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbWFwJzpcbiAgICAgICAgdmFyIGlzRXFsID0gaXNEZWVwID8gXy5lcWwgOiBTYW1lVmFsdWVaZXJvO1xuICAgICAgICBvYmouZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIGluY2x1ZGVkID0gaW5jbHVkZWQgfHwgaXNFcWwoaXRlbSwgdmFsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdzZXQnOlxuICAgICAgICBpZiAoaXNEZWVwKSB7XG4gICAgICAgICAgb2JqLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGluY2x1ZGVkID0gaW5jbHVkZWQgfHwgXy5lcWwoaXRlbSwgdmFsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbmNsdWRlZCA9IG9iai5oYXModmFsKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICBpZiAoaXNEZWVwKSB7XG4gICAgICAgICAgaW5jbHVkZWQgPSBvYmouc29tZShmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIF8uZXFsKGl0ZW0sIHZhbCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbmNsdWRlZCA9IG9iai5pbmRleE9mKHZhbCkgIT09IC0xO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBUaGlzIGJsb2NrIGlzIGZvciBhc3NlcnRpbmcgYSBzdWJzZXQgb2YgcHJvcGVydGllcyBpbiBhbiBvYmplY3QuXG4gICAgICAgIC8vIGBfLmV4cGVjdFR5cGVzYCBpc24ndCB1c2VkIGhlcmUgYmVjYXVzZSBgLmluY2x1ZGVgIHNob3VsZCB3b3JrIHdpdGhcbiAgICAgICAgLy8gb2JqZWN0cyB3aXRoIGEgY3VzdG9tIGBAQHRvU3RyaW5nVGFnYC5cbiAgICAgICAgaWYgKHZhbCAhPT0gT2JqZWN0KHZhbCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgICAgICBmbGFnTXNnICsgJ29iamVjdCB0ZXN0ZWQgbXVzdCBiZSBhbiBhcnJheSwgYSBtYXAsIGFuIG9iamVjdCwnXG4gICAgICAgICAgICAgICsgJyBhIHNldCwgYSBzdHJpbmcsIG9yIGEgd2Vha3NldCwgYnV0ICcgKyBvYmpUeXBlICsgJyBnaXZlbicsXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICBzc2ZpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwcm9wcyA9IE9iamVjdC5rZXlzKHZhbClcbiAgICAgICAgICAsIGZpcnN0RXJyID0gbnVsbFxuICAgICAgICAgICwgbnVtRXJycyA9IDA7XG5cbiAgICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgIHZhciBwcm9wQXNzZXJ0aW9uID0gbmV3IEFzc2VydGlvbihvYmopO1xuICAgICAgICAgIF8udHJhbnNmZXJGbGFncyh0aGlzLCBwcm9wQXNzZXJ0aW9uLCB0cnVlKTtcbiAgICAgICAgICBmbGFnKHByb3BBc3NlcnRpb24sICdsb2NrU3NmaScsIHRydWUpO1xuXG4gICAgICAgICAgaWYgKCFuZWdhdGUgfHwgcHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBwcm9wQXNzZXJ0aW9uLnByb3BlcnR5KHByb3AsIHZhbFtwcm9wXSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHByb3BBc3NlcnRpb24ucHJvcGVydHkocHJvcCwgdmFsW3Byb3BdKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGlmICghXy5jaGVja0Vycm9yLmNvbXBhdGlibGVDb25zdHJ1Y3RvcihlcnIsIEFzc2VydGlvbkVycm9yKSkge1xuICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3RFcnIgPT09IG51bGwpIGZpcnN0RXJyID0gZXJyO1xuICAgICAgICAgICAgbnVtRXJycysrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgLy8gV2hlbiB2YWxpZGF0aW5nIC5ub3QuaW5jbHVkZSB3aXRoIG11bHRpcGxlIHByb3BlcnRpZXMsIHdlIG9ubHkgd2FudFxuICAgICAgICAvLyB0byB0aHJvdyBhbiBhc3NlcnRpb24gZXJyb3IgaWYgYWxsIG9mIHRoZSBwcm9wZXJ0aWVzIGFyZSBpbmNsdWRlZCxcbiAgICAgICAgLy8gaW4gd2hpY2ggY2FzZSB3ZSB0aHJvdyB0aGUgZmlyc3QgcHJvcGVydHkgYXNzZXJ0aW9uIGVycm9yIHRoYXQgd2VcbiAgICAgICAgLy8gZW5jb3VudGVyZWQuXG4gICAgICAgIGlmIChuZWdhdGUgJiYgcHJvcHMubGVuZ3RoID4gMSAmJiBudW1FcnJzID09PSBwcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBmaXJzdEVycjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXNzZXJ0IGluY2x1c2lvbiBpbiBjb2xsZWN0aW9uIG9yIHN1YnN0cmluZyBpbiBhIHN0cmluZy5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGluY2x1ZGVkXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvICcgKyBkZXNjcmlwdG9yICsgJ2luY2x1ZGUgJyArIF8uaW5zcGVjdCh2YWwpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCAnICsgZGVzY3JpcHRvciArICdpbmNsdWRlICcgKyBfLmluc3BlY3QodmFsKSk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKCdpbmNsdWRlJywgaW5jbHVkZSwgaW5jbHVkZUNoYWluaW5nQmVoYXZpb3IpO1xuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKCdjb250YWluJywgaW5jbHVkZSwgaW5jbHVkZUNoYWluaW5nQmVoYXZpb3IpO1xuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKCdjb250YWlucycsIGluY2x1ZGUsIGluY2x1ZGVDaGFpbmluZ0JlaGF2aW9yKTtcbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZCgnaW5jbHVkZXMnLCBpbmNsdWRlLCBpbmNsdWRlQ2hhaW5pbmdCZWhhdmlvcik7XG5cbiAgLyoqXG4gICAqICMjIyAub2tcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgYSB0cnV0aHkgdmFsdWUgKGNvbnNpZGVyZWQgYHRydWVgIGluIGJvb2xlYW4gY29udGV4dCkuXG4gICAqIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnQgdGhhdCB0aGUgdGFyZ2V0IGlzIHN0cmljdGx5IChgPT09YCkgb3JcbiAgICogZGVlcGx5IGVxdWFsIHRvIGl0cyBleHBlY3RlZCB2YWx1ZS5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5lcXVhbCgxKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgxKS50by5iZS5vazsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqICAgICBleHBlY3QodHJ1ZSkudG8uYmUudHJ1ZTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCh0cnVlKS50by5iZS5vazsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAub2tgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDApLnRvLmVxdWFsKDApOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDApLnRvLm5vdC5iZS5vazsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqICAgICBleHBlY3QoZmFsc2UpLnRvLmJlLmZhbHNlOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KGZhbHNlKS50by5ub3QuYmUub2s7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiAgICAgZXhwZWN0KG51bGwpLnRvLmJlLm51bGw7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QobnVsbCkudG8ubm90LmJlLm9rOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogICAgIGV4cGVjdCh1bmRlZmluZWQpLnRvLmJlLnVuZGVmaW5lZDsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCh1bmRlZmluZWQpLnRvLm5vdC5iZS5vazsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UgY2FuIGJlIGdpdmVuIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoZmFsc2UsICdub29vIHdoeSBmYWlsPz8nKS50by5iZS5vaztcbiAgICpcbiAgICogQG5hbWUgb2tcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdvaycsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgdHJ1dGh5J1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBmYWxzeScpO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC50cnVlXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIHN0cmljdGx5IChgPT09YCkgZXF1YWwgdG8gYHRydWVgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHRydWUpLnRvLmJlLnRydWU7XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAudHJ1ZWAuIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW4gYmVzdFxuICAgKiB0byBhc3NlcnQgdGhhdCB0aGUgdGFyZ2V0IGlzIGVxdWFsIHRvIGl0cyBleHBlY3RlZCB2YWx1ZSwgcmF0aGVyIHRoYW4gbm90XG4gICAqIGVxdWFsIHRvIGB0cnVlYC5cbiAgICpcbiAgICogICAgIGV4cGVjdChmYWxzZSkudG8uYmUuZmFsc2U7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoZmFsc2UpLnRvLm5vdC5iZS50cnVlOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5lcXVhbCgxKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgxKS50by5ub3QuYmUudHJ1ZTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UgY2FuIGJlIGdpdmVuIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoZmFsc2UsICdub29vIHdoeSBmYWlsPz8nKS50by5iZS50cnVlO1xuICAgKlxuICAgKiBAbmFtZSB0cnVlXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgndHJ1ZScsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgdHJ1ZSA9PT0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgdHJ1ZSdcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgZmFsc2UnXG4gICAgICAsIGZsYWcodGhpcywgJ25lZ2F0ZScpID8gZmFsc2UgOiB0cnVlXG4gICAgKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuZmFsc2VcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgc3RyaWN0bHkgKGA9PT1gKSBlcXVhbCB0byBgZmFsc2VgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KGZhbHNlKS50by5iZS5mYWxzZTtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5mYWxzZWAuIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW5cbiAgICogYmVzdCB0byBhc3NlcnQgdGhhdCB0aGUgdGFyZ2V0IGlzIGVxdWFsIHRvIGl0cyBleHBlY3RlZCB2YWx1ZSwgcmF0aGVyIHRoYW5cbiAgICogbm90IGVxdWFsIHRvIGBmYWxzZWAuXG4gICAqXG4gICAqICAgICBleHBlY3QodHJ1ZSkudG8uYmUudHJ1ZTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCh0cnVlKS50by5ub3QuYmUuZmFsc2U7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmVxdWFsKDEpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEpLnRvLm5vdC5iZS5mYWxzZTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UgY2FuIGJlIGdpdmVuIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QodHJ1ZSwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmJlLmZhbHNlO1xuICAgKlxuICAgKiBAbmFtZSBmYWxzZVxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ2ZhbHNlJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBmYWxzZSA9PT0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgZmFsc2UnXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIHRydWUnXG4gICAgICAsIGZsYWcodGhpcywgJ25lZ2F0ZScpID8gdHJ1ZSA6IGZhbHNlXG4gICAgKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAubnVsbFxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBzdHJpY3RseSAoYD09PWApIGVxdWFsIHRvIGBudWxsYC5cbiAgICpcbiAgICogICAgIGV4cGVjdChudWxsKS50by5iZS5udWxsO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLm51bGxgLiBIb3dldmVyLCBpdCdzIG9mdGVuIGJlc3RcbiAgICogdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCB0byBpdHMgZXhwZWN0ZWQgdmFsdWUsIHJhdGhlciB0aGFuIG5vdFxuICAgKiBlcXVhbCB0byBgbnVsbGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8uZXF1YWwoMSk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMSkudG8ubm90LmJlLm51bGw7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBIGN1c3RvbSBlcnJvciBtZXNzYWdlIGNhbiBiZSBnaXZlbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDQyLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUubnVsbDtcbiAgICpcbiAgICogQG5hbWUgbnVsbFxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ251bGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIG51bGwgPT09IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIG51bGwnXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSBudWxsJ1xuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLnVuZGVmaW5lZFxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBzdHJpY3RseSAoYD09PWApIGVxdWFsIHRvIGB1bmRlZmluZWRgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHVuZGVmaW5lZCkudG8uYmUudW5kZWZpbmVkO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLnVuZGVmaW5lZGAuIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW5cbiAgICogYmVzdCB0byBhc3NlcnQgdGhhdCB0aGUgdGFyZ2V0IGlzIGVxdWFsIHRvIGl0cyBleHBlY3RlZCB2YWx1ZSwgcmF0aGVyIHRoYW5cbiAgICogbm90IGVxdWFsIHRvIGB1bmRlZmluZWRgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmVxdWFsKDEpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEpLnRvLm5vdC5iZS51bmRlZmluZWQ7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBIGN1c3RvbSBlcnJvciBtZXNzYWdlIGNhbiBiZSBnaXZlbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDQyLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUudW5kZWZpbmVkO1xuICAgKlxuICAgKiBAbmFtZSB1bmRlZmluZWRcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCd1bmRlZmluZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIHVuZGVmaW5lZCA9PT0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgdW5kZWZpbmVkJ1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgdW5kZWZpbmVkJ1xuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLk5hTlxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBleGFjdGx5IGBOYU5gLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KE5hTikudG8uYmUuTmFOO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLk5hTmAuIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW4gYmVzdFxuICAgKiB0byBhc3NlcnQgdGhhdCB0aGUgdGFyZ2V0IGlzIGVxdWFsIHRvIGl0cyBleHBlY3RlZCB2YWx1ZSwgcmF0aGVyIHRoYW4gbm90XG4gICAqIGVxdWFsIHRvIGBOYU5gLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5lcXVhbCgnZm9vJyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLm5vdC5iZS5OYU47IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBIGN1c3RvbSBlcnJvciBtZXNzYWdlIGNhbiBiZSBnaXZlbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDQyLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUuTmFOO1xuICAgKlxuICAgKiBAbmFtZSBOYU5cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdOYU4nLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIF8uaXNOYU4oZmxhZyh0aGlzLCAnb2JqZWN0JykpXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgTmFOJ1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSBOYU4nXG4gICAgKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuZXhpc3RcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgbm90IHN0cmljdGx5IChgPT09YCkgZXF1YWwgdG8gZWl0aGVyIGBudWxsYCBvclxuICAgKiBgdW5kZWZpbmVkYC4gSG93ZXZlciwgaXQncyBvZnRlbiBiZXN0IHRvIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQgaXMgZXF1YWwgdG9cbiAgICogaXRzIGV4cGVjdGVkIHZhbHVlLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmVxdWFsKDEpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmV4aXN0OyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogICAgIGV4cGVjdCgwKS50by5lcXVhbCgwKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgwKS50by5leGlzdDsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuZXhpc3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KG51bGwpLnRvLmJlLm51bGw7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QobnVsbCkudG8ubm90LmV4aXN0OyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogICAgIGV4cGVjdCh1bmRlZmluZWQpLnRvLmJlLnVuZGVmaW5lZDsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCh1bmRlZmluZWQpLnRvLm5vdC5leGlzdDsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UgY2FuIGJlIGdpdmVuIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QobnVsbCwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmV4aXN0O1xuICAgKlxuICAgKiBAbmFtZSBleGlzdFxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ2V4aXN0JywgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWwgPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgdmFsICE9PSBudWxsICYmIHZhbCAhPT0gdW5kZWZpbmVkXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGV4aXN0J1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgZXhpc3QnXG4gICAgKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuZW1wdHlcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIGEgc3RyaW5nIG9yIGFycmF5LCBgLmVtcHR5YCBhc3NlcnRzIHRoYXQgdGhlIHRhcmdldCdzXG4gICAqIGBsZW5ndGhgIHByb3BlcnR5IGlzIHN0cmljdGx5IChgPT09YCkgZXF1YWwgdG8gYDBgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFtdKS50by5iZS5lbXB0eTtcbiAgICogICAgIGV4cGVjdCgnJykudG8uYmUuZW1wdHk7XG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBpcyBhIG1hcCBvciBzZXQsIGAuZW1wdHlgIGFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0J3MgYHNpemVgXG4gICAqIHByb3BlcnR5IGlzIHN0cmljdGx5IGVxdWFsIHRvIGAwYC5cbiAgICpcbiAgICogICAgIGV4cGVjdChuZXcgU2V0KCkpLnRvLmJlLmVtcHR5O1xuICAgKiAgICAgZXhwZWN0KG5ldyBNYXAoKSkudG8uYmUuZW1wdHk7XG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBpcyBhIG5vbi1mdW5jdGlvbiBvYmplY3QsIGAuZW1wdHlgIGFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0XG4gICAqIGRvZXNuJ3QgaGF2ZSBhbnkgb3duIGVudW1lcmFibGUgcHJvcGVydGllcy4gUHJvcGVydGllcyB3aXRoIFN5bWJvbC1iYXNlZFxuICAgKiBrZXlzIGFyZSBleGNsdWRlZCBmcm9tIHRoZSBjb3VudC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7fSkudG8uYmUuZW1wdHk7XG4gICAqXG4gICAqIEJlY2F1c2UgYC5lbXB0eWAgZG9lcyBkaWZmZXJlbnQgdGhpbmdzIGJhc2VkIG9uIHRoZSB0YXJnZXQncyB0eXBlLCBpdCdzXG4gICAqIGltcG9ydGFudCB0byBjaGVjayB0aGUgdGFyZ2V0J3MgdHlwZSBiZWZvcmUgdXNpbmcgYC5lbXB0eWAuIFNlZSB0aGUgYC5hYFxuICAgKiBkb2MgZm9yIGluZm8gb24gdGVzdGluZyBhIHRhcmdldCdzIHR5cGUuXG4gICAqXG4gICAqICAgICBleHBlY3QoW10pLnRvLmJlLmFuKCdhcnJheScpLnRoYXQuaXMuZW1wdHk7XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuZW1wdHlgLiBIb3dldmVyLCBpdCdzIG9mdGVuXG4gICAqIGJlc3QgdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCBjb250YWlucyBpdHMgZXhwZWN0ZWQgbnVtYmVyIG9mIHZhbHVlcyxcbiAgICogcmF0aGVyIHRoYW4gYXNzZXJ0aW5nIHRoYXQgaXQncyBub3QgZW1wdHkuXG4gICAqXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5oYXZlLmxlbmd0aE9mKDMpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8ubm90LmJlLmVtcHR5OyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogICAgIGV4cGVjdChuZXcgU2V0KFsxLCAyLCAzXSkpLnRvLmhhdmUucHJvcGVydHkoJ3NpemUnLCAzKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChuZXcgU2V0KFsxLCAyLCAzXSkpLnRvLm5vdC5iZS5lbXB0eTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqICAgICBleHBlY3QoT2JqZWN0LmtleXMoe2E6IDF9KSkudG8uaGF2ZS5sZW5ndGhPZigxKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLm5vdC5iZS5lbXB0eTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UgY2FuIGJlIGdpdmVuIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUuZW1wdHk7XG4gICAqXG4gICAqIEBuYW1lIGVtcHR5XG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnZW1wdHknLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbCA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIHNzZmkgPSBmbGFnKHRoaXMsICdzc2ZpJylcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBpdGVtc0NvdW50O1xuXG4gICAgZmxhZ01zZyA9IGZsYWdNc2cgPyBmbGFnTXNnICsgJzogJyA6ICcnO1xuXG4gICAgc3dpdGNoIChfLnR5cGUodmFsKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBpdGVtc0NvdW50ID0gdmFsLmxlbmd0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtYXAnOlxuICAgICAgY2FzZSAnc2V0JzpcbiAgICAgICAgaXRlbXNDb3VudCA9IHZhbC5zaXplO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dlYWttYXAnOlxuICAgICAgY2FzZSAnd2Vha3NldCc6XG4gICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgICBmbGFnTXNnICsgJy5lbXB0eSB3YXMgcGFzc2VkIGEgd2VhayBjb2xsZWN0aW9uJyxcbiAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgc3NmaVxuICAgICAgICApO1xuICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICB2YXIgbXNnID0gZmxhZ01zZyArICcuZW1wdHkgd2FzIHBhc3NlZCBhIGZ1bmN0aW9uICcgKyBfLmdldE5hbWUodmFsKTtcbiAgICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKG1zZy50cmltKCksIHVuZGVmaW5lZCwgc3NmaSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAodmFsICE9PSBPYmplY3QodmFsKSkge1xuICAgICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgICAgIGZsYWdNc2cgKyAnLmVtcHR5IHdhcyBwYXNzZWQgbm9uLXN0cmluZyBwcmltaXRpdmUgJyArIF8uaW5zcGVjdCh2YWwpLFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgc3NmaVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbXNDb3VudCA9IE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoO1xuICAgIH1cblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAwID09PSBpdGVtc0NvdW50XG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGVtcHR5J1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgZW1wdHknXG4gICAgKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuYXJndW1lbnRzXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAgICpcbiAgICogICAgIGZ1bmN0aW9uIHRlc3QgKCkge1xuICAgKiAgICAgICBleHBlY3QoYXJndW1lbnRzKS50by5iZS5hcmd1bWVudHM7XG4gICAqICAgICB9XG4gICAqXG4gICAqICAgICB0ZXN0KCk7XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuYXJndW1lbnRzYC4gSG93ZXZlciwgaXQncyBvZnRlblxuICAgKiBiZXN0IHRvIGFzc2VydCB3aGljaCB0eXBlIHRoZSB0YXJnZXQgaXMgZXhwZWN0ZWQgdG8gYmUsIHJhdGhlciB0aGFuXG4gICAqIGFzc2VydGluZyB0aGF0IGl0cyBub3QgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5iZS5hKCdzdHJpbmcnKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8ubm90LmJlLmFyZ3VtZW50czsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UgY2FuIGJlIGdpdmVuIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe30sICdub29vIHdoeSBmYWlsPz8nKS50by5iZS5hcmd1bWVudHM7XG4gICAqXG4gICAqIFRoZSBhbGlhcyBgLkFyZ3VtZW50c2AgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5hcmd1bWVudHNgLlxuICAgKlxuICAgKiBAbmFtZSBhcmd1bWVudHNcbiAgICogQGFsaWFzIEFyZ3VtZW50c1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBjaGVja0FyZ3VtZW50cyAoKSB7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIHR5cGUgPSBfLnR5cGUob2JqKTtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgJ0FyZ3VtZW50cycgPT09IHR5cGVcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYXJndW1lbnRzIGJ1dCBnb3QgJyArIHR5cGVcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIGFyZ3VtZW50cydcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdhcmd1bWVudHMnLCBjaGVja0FyZ3VtZW50cyk7XG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnQXJndW1lbnRzJywgY2hlY2tBcmd1bWVudHMpO1xuXG4gIC8qKlxuICAgKiAjIyMgLmVxdWFsKHZhbFssIG1zZ10pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIHN0cmljdGx5IChgPT09YCkgZXF1YWwgdG8gdGhlIGdpdmVuIGB2YWxgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmVxdWFsKDEpO1xuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5lcXVhbCgnZm9vJyk7XG4gICAqXG4gICAqIEFkZCBgLmRlZXBgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIHVzZSBkZWVwIGVxdWFsaXR5IGluc3RlYWQuIFNlZSB0aGVcbiAgICogYGRlZXAtZXFsYCBwcm9qZWN0IHBhZ2UgZm9yIGluZm8gb24gdGhlIGRlZXAgZXF1YWxpdHkgYWxnb3JpdGhtOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vY2hhaWpzL2RlZXAtZXFsLlxuICAgKlxuICAgKiAgICAgLy8gVGFyZ2V0IG9iamVjdCBkZWVwbHkgKGJ1dCBub3Qgc3RyaWN0bHkpIGVxdWFscyBge2E6IDF9YFxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uZGVlcC5lcXVhbCh7YTogMX0pO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8ubm90LmVxdWFsKHthOiAxfSk7XG4gICAqXG4gICAqICAgICAvLyBUYXJnZXQgYXJyYXkgZGVlcGx5IChidXQgbm90IHN0cmljdGx5KSBlcXVhbHMgYFsxLCAyXWBcbiAgICogICAgIGV4cGVjdChbMSwgMl0pLnRvLmRlZXAuZXF1YWwoWzEsIDJdKTtcbiAgICogICAgIGV4cGVjdChbMSwgMl0pLnRvLm5vdC5lcXVhbChbMSwgMl0pO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLmVxdWFsYC4gSG93ZXZlciwgaXQncyBvZnRlblxuICAgKiBiZXN0IHRvIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQgaXMgZXF1YWwgdG8gaXRzIGV4cGVjdGVkIHZhbHVlLCByYXRoZXIgdGhhblxuICAgKiBub3QgZXF1YWwgdG8gb25lIG9mIGNvdW50bGVzcyB1bmV4cGVjdGVkIHZhbHVlcy5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5lcXVhbCgxKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgxKS50by5ub3QuZXF1YWwoMik7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBgLmVxdWFsYCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yIG1lc3NhZ2VcbiAgICogdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzIHRoZVxuICAgKiBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8uZXF1YWwoMiwgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKiAgICAgZXhwZWN0KDEsICdub29vIHdoeSBmYWlsPz8nKS50by5lcXVhbCgyKTtcbiAgICpcbiAgICogVGhlIGFsaWFzZXMgYC5lcXVhbHNgIGFuZCBgZXFgIGNhbiBiZSB1c2VkIGludGVyY2hhbmdlYWJseSB3aXRoIGAuZXF1YWxgLlxuICAgKlxuICAgKiBAbmFtZSBlcXVhbFxuICAgKiBAYWxpYXMgZXF1YWxzXG4gICAqIEBhbGlhcyBlcVxuICAgKiBAcGFyYW0ge01peGVkfSB2YWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydEVxdWFsICh2YWwsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcbiAgICBpZiAoZmxhZyh0aGlzLCAnZGVlcCcpKSB7XG4gICAgICB2YXIgcHJldkxvY2tTc2ZpID0gZmxhZyh0aGlzLCAnbG9ja1NzZmknKTtcbiAgICAgIGZsYWcodGhpcywgJ2xvY2tTc2ZpJywgdHJ1ZSk7XG4gICAgICB0aGlzLmVxbCh2YWwpO1xuICAgICAgZmxhZyh0aGlzLCAnbG9ja1NzZmknLCBwcmV2TG9ja1NzZmkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICB2YWwgPT09IG9ialxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGVxdWFsICN7ZXhwfSdcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgZXF1YWwgI3tleHB9J1xuICAgICAgICAsIHZhbFxuICAgICAgICAsIHRoaXMuX29ialxuICAgICAgICAsIHRydWVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZXF1YWwnLCBhc3NlcnRFcXVhbCk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2VxdWFscycsIGFzc2VydEVxdWFsKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZXEnLCBhc3NlcnRFcXVhbCk7XG5cbiAgLyoqXG4gICAqICMjIyAuZXFsKG9ialssIG1zZ10pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGRlZXBseSBlcXVhbCB0byB0aGUgZ2l2ZW4gYG9iamAuIFNlZSB0aGVcbiAgICogYGRlZXAtZXFsYCBwcm9qZWN0IHBhZ2UgZm9yIGluZm8gb24gdGhlIGRlZXAgZXF1YWxpdHkgYWxnb3JpdGhtOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vY2hhaWpzL2RlZXAtZXFsLlxuICAgKlxuICAgKiAgICAgLy8gVGFyZ2V0IG9iamVjdCBpcyBkZWVwbHkgKGJ1dCBub3Qgc3RyaWN0bHkpIGVxdWFsIHRvIHthOiAxfVxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uZXFsKHthOiAxfSkuYnV0Lm5vdC5lcXVhbCh7YTogMX0pO1xuICAgKlxuICAgKiAgICAgLy8gVGFyZ2V0IGFycmF5IGlzIGRlZXBseSAoYnV0IG5vdCBzdHJpY3RseSkgZXF1YWwgdG8gWzEsIDJdXG4gICAqICAgICBleHBlY3QoWzEsIDJdKS50by5lcWwoWzEsIDJdKS5idXQubm90LmVxdWFsKFsxLCAyXSk7XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuZXFsYC4gSG93ZXZlciwgaXQncyBvZnRlbiBiZXN0XG4gICAqIHRvIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQgaXMgZGVlcGx5IGVxdWFsIHRvIGl0cyBleHBlY3RlZCB2YWx1ZSwgcmF0aGVyXG4gICAqIHRoYW4gbm90IGRlZXBseSBlcXVhbCB0byBvbmUgb2YgY291bnRsZXNzIHVuZXhwZWN0ZWQgdmFsdWVzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uZXFsKHthOiAxfSk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5ub3QuZXFsKHtiOiAyfSk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBgLmVxbGAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvciBtZXNzYWdlXG4gICAqIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhcyB0aGVcbiAgICogc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uZXFsKHtiOiAyfSwgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmVxbCh7YjogMn0pO1xuICAgKlxuICAgKiBUaGUgYWxpYXMgYC5lcWxzYCBjYW4gYmUgdXNlZCBpbnRlcmNoYW5nZWFibHkgd2l0aCBgLmVxbGAuXG4gICAqXG4gICAqIFRoZSBgLmRlZXAuZXF1YWxgIGFzc2VydGlvbiBpcyBhbG1vc3QgaWRlbnRpY2FsIHRvIGAuZXFsYCBidXQgd2l0aCBvbmVcbiAgICogZGlmZmVyZW5jZTogYC5kZWVwLmVxdWFsYCBjYXVzZXMgZGVlcCBlcXVhbGl0eSBjb21wYXJpc29ucyB0byBhbHNvIGJlIHVzZWRcbiAgICogZm9yIGFueSBvdGhlciBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpbi5cbiAgICpcbiAgICogQG5hbWUgZXFsXG4gICAqIEBhbGlhcyBlcWxzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IG9ialxuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0RXFsKG9iaiwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIF8uZXFsKG9iaiwgZmxhZyh0aGlzLCAnb2JqZWN0JykpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGRlZXBseSBlcXVhbCAje2V4cH0nXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBkZWVwbHkgZXF1YWwgI3tleHB9J1xuICAgICAgLCBvYmpcbiAgICAgICwgdGhpcy5fb2JqXG4gICAgICAsIHRydWVcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZXFsJywgYXNzZXJ0RXFsKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZXFscycsIGFzc2VydEVxbCk7XG5cbiAgLyoqXG4gICAqICMjIyAuYWJvdmUoblssIG1zZ10pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGEgbnVtYmVyIG9yIGEgZGF0ZSBncmVhdGVyIHRoYW4gdGhlIGdpdmVuIG51bWJlciBvciBkYXRlIGBuYCByZXNwZWN0aXZlbHkuXG4gICAqIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnQgdGhhdCB0aGUgdGFyZ2V0IGlzIGVxdWFsIHRvIGl0cyBleHBlY3RlZFxuICAgKiB2YWx1ZS5cbiAgICpcbiAgICogICAgIGV4cGVjdCgyKS50by5lcXVhbCgyKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgyKS50by5iZS5hYm92ZSgxKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEFkZCBgLmxlbmd0aE9mYCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBhc3NlcnQgdGhhdCB0aGUgdGFyZ2V0J3MgYGxlbmd0aGBcbiAgICogb3IgYHNpemVgIGlzIGdyZWF0ZXIgdGhhbiB0aGUgZ2l2ZW4gbnVtYmVyIGBuYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uaGF2ZS5sZW5ndGhPZigzKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uaGF2ZS5sZW5ndGhPZi5hYm92ZSgyKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5oYXZlLmxlbmd0aE9mKDMpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGhPZi5hYm92ZSgyKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuYWJvdmVgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDIpLnRvLmVxdWFsKDIpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEpLnRvLm5vdC5iZS5hYm92ZSgyKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIGAuYWJvdmVgIGFjY2VwdHMgYW4gb3B0aW9uYWwgYG1zZ2AgYXJndW1lbnQgd2hpY2ggaXMgYSBjdXN0b20gZXJyb3IgbWVzc2FnZVxuICAgKiB0byBzaG93IHdoZW4gdGhlIGFzc2VydGlvbiBmYWlscy4gVGhlIG1lc3NhZ2UgY2FuIGFsc28gYmUgZ2l2ZW4gYXMgdGhlXG4gICAqIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5iZS5hYm92ZSgyLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoMSwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmJlLmFib3ZlKDIpO1xuICAgKlxuICAgKiBUaGUgYWxpYXNlcyBgLmd0YCBhbmQgYC5ncmVhdGVyVGhhbmAgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGhcbiAgICogYC5hYm92ZWAuXG4gICAqXG4gICAqIEBuYW1lIGFib3ZlXG4gICAqIEBhbGlhcyBndFxuICAgKiBAYWxpYXMgZ3JlYXRlclRoYW5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydEFib3ZlIChuLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgZG9MZW5ndGggPSBmbGFnKHRoaXMsICdkb0xlbmd0aCcpXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJylcbiAgICAgICwgbXNnUHJlZml4ID0gKChmbGFnTXNnKSA/IGZsYWdNc2cgKyAnOiAnIDogJycpXG4gICAgICAsIHNzZmkgPSBmbGFnKHRoaXMsICdzc2ZpJylcbiAgICAgICwgb2JqVHlwZSA9IF8udHlwZShvYmopLnRvTG93ZXJDYXNlKClcbiAgICAgICwgblR5cGUgPSBfLnR5cGUobikudG9Mb3dlckNhc2UoKVxuICAgICAgLCBlcnJvck1lc3NhZ2VcbiAgICAgICwgc2hvdWxkVGhyb3cgPSB0cnVlO1xuXG4gICAgaWYgKGRvTGVuZ3RoICYmIG9ialR5cGUgIT09ICdtYXAnICYmIG9ialR5cGUgIT09ICdzZXQnKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uaGF2ZS5wcm9wZXJ0eSgnbGVuZ3RoJyk7XG4gICAgfVxuXG4gICAgaWYgKCFkb0xlbmd0aCAmJiAob2JqVHlwZSA9PT0gJ2RhdGUnICYmIG5UeXBlICE9PSAnZGF0ZScpKSB7XG4gICAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyAndGhlIGFyZ3VtZW50IHRvIGFib3ZlIG11c3QgYmUgYSBkYXRlJztcbiAgICB9IGVsc2UgaWYgKG5UeXBlICE9PSAnbnVtYmVyJyAmJiAoZG9MZW5ndGggfHwgb2JqVHlwZSA9PT0gJ251bWJlcicpKSB7XG4gICAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyAndGhlIGFyZ3VtZW50IHRvIGFib3ZlIG11c3QgYmUgYSBudW1iZXInO1xuICAgIH0gZWxzZSBpZiAoIWRvTGVuZ3RoICYmIChvYmpUeXBlICE9PSAnZGF0ZScgJiYgb2JqVHlwZSAhPT0gJ251bWJlcicpKSB7XG4gICAgICB2YXIgcHJpbnRPYmogPSAob2JqVHlwZSA9PT0gJ3N0cmluZycpID8gXCInXCIgKyBvYmogKyBcIidcIiA6IG9iajtcbiAgICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArICdleHBlY3RlZCAnICsgcHJpbnRPYmogKyAnIHRvIGJlIGEgbnVtYmVyIG9yIGEgZGF0ZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3VsZFRocm93ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoZXJyb3JNZXNzYWdlLCB1bmRlZmluZWQsIHNzZmkpO1xuICAgIH1cblxuICAgIGlmIChkb0xlbmd0aCkge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSAnbGVuZ3RoJ1xuICAgICAgICAsIGl0ZW1zQ291bnQ7XG4gICAgICBpZiAob2JqVHlwZSA9PT0gJ21hcCcgfHwgb2JqVHlwZSA9PT0gJ3NldCcpIHtcbiAgICAgICAgZGVzY3JpcHRvciA9ICdzaXplJztcbiAgICAgICAgaXRlbXNDb3VudCA9IG9iai5zaXplO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbXNDb3VudCA9IG9iai5sZW5ndGg7XG4gICAgICB9XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBpdGVtc0NvdW50ID4gblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSAnICsgZGVzY3JpcHRvciArICcgYWJvdmUgI3tleHB9IGJ1dCBnb3QgI3thY3R9J1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIGEgJyArIGRlc2NyaXB0b3IgKyAnIGFib3ZlICN7ZXhwfSdcbiAgICAgICAgLCBuXG4gICAgICAgICwgaXRlbXNDb3VudFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgb2JqID4gblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGFib3ZlICN7ZXhwfSdcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhdCBtb3N0ICN7ZXhwfSdcbiAgICAgICAgLCBuXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2Fib3ZlJywgYXNzZXJ0QWJvdmUpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdndCcsIGFzc2VydEFib3ZlKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZ3JlYXRlclRoYW4nLCBhc3NlcnRBYm92ZSk7XG5cbiAgLyoqXG4gICAqICMjIyAubGVhc3QoblssIG1zZ10pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGEgbnVtYmVyIG9yIGEgZGF0ZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIGdpdmVuXG4gICAqIG51bWJlciBvciBkYXRlIGBuYCByZXNwZWN0aXZlbHkuIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnQgdGhhdCB0aGUgdGFyZ2V0IGlzIGVxdWFsIHRvXG4gICAqIGl0cyBleHBlY3RlZCB2YWx1ZS5cbiAgICpcbiAgICogICAgIGV4cGVjdCgyKS50by5lcXVhbCgyKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgyKS50by5iZS5hdC5sZWFzdCgxKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMikudG8uYmUuYXQubGVhc3QoMik7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBZGQgYC5sZW5ndGhPZmAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCdzIGBsZW5ndGhgXG4gICAqIG9yIGBzaXplYCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIGdpdmVuIG51bWJlciBgbmAuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoT2YoMyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoT2YuYXQubGVhc3QoMik7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGhPZigzKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoT2YuYXQubGVhc3QoMik7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLmxlYXN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5lcXVhbCgxKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgxKS50by5ub3QuYmUuYXQubGVhc3QoMik7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBgLmxlYXN0YCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yIG1lc3NhZ2VcbiAgICogdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzIHRoZVxuICAgKiBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8uYmUuYXQubGVhc3QoMiwgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKiAgICAgZXhwZWN0KDEsICdub29vIHdoeSBmYWlsPz8nKS50by5iZS5hdC5sZWFzdCgyKTtcbiAgICpcbiAgICogVGhlIGFsaWFzIGAuZ3RlYCBjYW4gYmUgdXNlZCBpbnRlcmNoYW5nZWFibHkgd2l0aCBgLmxlYXN0YC5cbiAgICpcbiAgICogQG5hbWUgbGVhc3RcbiAgICogQGFsaWFzIGd0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gblxuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0TGVhc3QgKG4sIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCBkb0xlbmd0aCA9IGZsYWcodGhpcywgJ2RvTGVuZ3RoJylcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBtc2dQcmVmaXggPSAoKGZsYWdNc2cpID8gZmxhZ01zZyArICc6ICcgOiAnJylcbiAgICAgICwgc3NmaSA9IGZsYWcodGhpcywgJ3NzZmknKVxuICAgICAgLCBvYmpUeXBlID0gXy50eXBlKG9iaikudG9Mb3dlckNhc2UoKVxuICAgICAgLCBuVHlwZSA9IF8udHlwZShuKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIGVycm9yTWVzc2FnZVxuICAgICAgLCBzaG91bGRUaHJvdyA9IHRydWU7XG5cbiAgICBpZiAoZG9MZW5ndGggJiYgb2JqVHlwZSAhPT0gJ21hcCcgJiYgb2JqVHlwZSAhPT0gJ3NldCcpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICB9XG5cbiAgICBpZiAoIWRvTGVuZ3RoICYmIChvYmpUeXBlID09PSAnZGF0ZScgJiYgblR5cGUgIT09ICdkYXRlJykpIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArICd0aGUgYXJndW1lbnQgdG8gbGVhc3QgbXVzdCBiZSBhIGRhdGUnO1xuICAgIH0gZWxzZSBpZiAoblR5cGUgIT09ICdudW1iZXInICYmIChkb0xlbmd0aCB8fCBvYmpUeXBlID09PSAnbnVtYmVyJykpIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArICd0aGUgYXJndW1lbnQgdG8gbGVhc3QgbXVzdCBiZSBhIG51bWJlcic7XG4gICAgfSBlbHNlIGlmICghZG9MZW5ndGggJiYgKG9ialR5cGUgIT09ICdkYXRlJyAmJiBvYmpUeXBlICE9PSAnbnVtYmVyJykpIHtcbiAgICAgIHZhciBwcmludE9iaiA9IChvYmpUeXBlID09PSAnc3RyaW5nJykgPyBcIidcIiArIG9iaiArIFwiJ1wiIDogb2JqO1xuICAgICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgJ2V4cGVjdGVkICcgKyBwcmludE9iaiArICcgdG8gYmUgYSBudW1iZXIgb3IgYSBkYXRlJztcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvdWxkVGhyb3cgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihlcnJvck1lc3NhZ2UsIHVuZGVmaW5lZCwgc3NmaSk7XG4gICAgfVxuXG4gICAgaWYgKGRvTGVuZ3RoKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9ICdsZW5ndGgnXG4gICAgICAgICwgaXRlbXNDb3VudDtcbiAgICAgIGlmIChvYmpUeXBlID09PSAnbWFwJyB8fCBvYmpUeXBlID09PSAnc2V0Jykge1xuICAgICAgICBkZXNjcmlwdG9yID0gJ3NpemUnO1xuICAgICAgICBpdGVtc0NvdW50ID0gb2JqLnNpemU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtc0NvdW50ID0gb2JqLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIGl0ZW1zQ291bnQgPj0gblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSAnICsgZGVzY3JpcHRvciArICcgYXQgbGVhc3QgI3tleHB9IGJ1dCBnb3QgI3thY3R9J1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSAnICsgZGVzY3JpcHRvciArICcgYmVsb3cgI3tleHB9J1xuICAgICAgICAsIG5cbiAgICAgICAgLCBpdGVtc0NvdW50XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBvYmogPj0gblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGF0IGxlYXN0ICN7ZXhwfSdcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBiZWxvdyAje2V4cH0nXG4gICAgICAgICwgblxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdsZWFzdCcsIGFzc2VydExlYXN0KTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZ3RlJywgYXNzZXJ0TGVhc3QpO1xuXG4gIC8qKlxuICAgKiAjIyMgLmJlbG93KG5bLCBtc2ddKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBhIG51bWJlciBvciBhIGRhdGUgbGVzcyB0aGFuIHRoZSBnaXZlbiBudW1iZXIgb3IgZGF0ZSBgbmAgcmVzcGVjdGl2ZWx5LlxuICAgKiBIb3dldmVyLCBpdCdzIG9mdGVuIGJlc3QgdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCB0byBpdHMgZXhwZWN0ZWRcbiAgICogdmFsdWUuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8uZXF1YWwoMSk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMSkudG8uYmUuYmVsb3coMik7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBZGQgYC5sZW5ndGhPZmAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCdzIGBsZW5ndGhgXG4gICAqIG9yIGBzaXplYCBpcyBsZXNzIHRoYW4gdGhlIGdpdmVuIG51bWJlciBgbmAuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoT2YoMyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoT2YuYmVsb3coNCk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGgoMyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5oYXZlLmxlbmd0aE9mLmJlbG93KDQpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5iZWxvd2AuXG4gICAqXG4gICAqICAgICBleHBlY3QoMikudG8uZXF1YWwoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMikudG8ubm90LmJlLmJlbG93KDEpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogYC5iZWxvd2AgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvciBtZXNzYWdlXG4gICAqIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhcyB0aGVcbiAgICogc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDIpLnRvLmJlLmJlbG93KDEsICdub29vIHdoeSBmYWlsPz8nKTtcbiAgICogICAgIGV4cGVjdCgyLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUuYmVsb3coMSk7XG4gICAqXG4gICAqIFRoZSBhbGlhc2VzIGAubHRgIGFuZCBgLmxlc3NUaGFuYCBjYW4gYmUgdXNlZCBpbnRlcmNoYW5nZWFibHkgd2l0aFxuICAgKiBgLmJlbG93YC5cbiAgICpcbiAgICogQG5hbWUgYmVsb3dcbiAgICogQGFsaWFzIGx0XG4gICAqIEBhbGlhcyBsZXNzVGhhblxuICAgKiBAcGFyYW0ge051bWJlcn0gblxuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0QmVsb3cgKG4sIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCBkb0xlbmd0aCA9IGZsYWcodGhpcywgJ2RvTGVuZ3RoJylcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBtc2dQcmVmaXggPSAoKGZsYWdNc2cpID8gZmxhZ01zZyArICc6ICcgOiAnJylcbiAgICAgICwgc3NmaSA9IGZsYWcodGhpcywgJ3NzZmknKVxuICAgICAgLCBvYmpUeXBlID0gXy50eXBlKG9iaikudG9Mb3dlckNhc2UoKVxuICAgICAgLCBuVHlwZSA9IF8udHlwZShuKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIGVycm9yTWVzc2FnZVxuICAgICAgLCBzaG91bGRUaHJvdyA9IHRydWU7XG5cbiAgICBpZiAoZG9MZW5ndGggJiYgb2JqVHlwZSAhPT0gJ21hcCcgJiYgb2JqVHlwZSAhPT0gJ3NldCcpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICB9XG5cbiAgICBpZiAoIWRvTGVuZ3RoICYmIChvYmpUeXBlID09PSAnZGF0ZScgJiYgblR5cGUgIT09ICdkYXRlJykpIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArICd0aGUgYXJndW1lbnQgdG8gYmVsb3cgbXVzdCBiZSBhIGRhdGUnO1xuICAgIH0gZWxzZSBpZiAoblR5cGUgIT09ICdudW1iZXInICYmIChkb0xlbmd0aCB8fCBvYmpUeXBlID09PSAnbnVtYmVyJykpIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArICd0aGUgYXJndW1lbnQgdG8gYmVsb3cgbXVzdCBiZSBhIG51bWJlcic7XG4gICAgfSBlbHNlIGlmICghZG9MZW5ndGggJiYgKG9ialR5cGUgIT09ICdkYXRlJyAmJiBvYmpUeXBlICE9PSAnbnVtYmVyJykpIHtcbiAgICAgIHZhciBwcmludE9iaiA9IChvYmpUeXBlID09PSAnc3RyaW5nJykgPyBcIidcIiArIG9iaiArIFwiJ1wiIDogb2JqO1xuICAgICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgJ2V4cGVjdGVkICcgKyBwcmludE9iaiArICcgdG8gYmUgYSBudW1iZXIgb3IgYSBkYXRlJztcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvdWxkVGhyb3cgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihlcnJvck1lc3NhZ2UsIHVuZGVmaW5lZCwgc3NmaSk7XG4gICAgfVxuXG4gICAgaWYgKGRvTGVuZ3RoKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9ICdsZW5ndGgnXG4gICAgICAgICwgaXRlbXNDb3VudDtcbiAgICAgIGlmIChvYmpUeXBlID09PSAnbWFwJyB8fCBvYmpUeXBlID09PSAnc2V0Jykge1xuICAgICAgICBkZXNjcmlwdG9yID0gJ3NpemUnO1xuICAgICAgICBpdGVtc0NvdW50ID0gb2JqLnNpemU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtc0NvdW50ID0gb2JqLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIGl0ZW1zQ291bnQgPCBuXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhICcgKyBkZXNjcmlwdG9yICsgJyBiZWxvdyAje2V4cH0gYnV0IGdvdCAje2FjdH0nXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgYSAnICsgZGVzY3JpcHRvciArICcgYmVsb3cgI3tleHB9J1xuICAgICAgICAsIG5cbiAgICAgICAgLCBpdGVtc0NvdW50XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBvYmogPCBuXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYmVsb3cgI3tleHB9J1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGF0IGxlYXN0ICN7ZXhwfSdcbiAgICAgICAgLCBuXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2JlbG93JywgYXNzZXJ0QmVsb3cpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdsdCcsIGFzc2VydEJlbG93KTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnbGVzc1RoYW4nLCBhc3NlcnRCZWxvdyk7XG5cbiAgLyoqXG4gICAqICMjIyAubW9zdChuWywgbXNnXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgYSBudW1iZXIgb3IgYSBkYXRlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgZ2l2ZW4gbnVtYmVyXG4gICAqIG9yIGRhdGUgYG5gIHJlc3BlY3RpdmVseS4gSG93ZXZlciwgaXQncyBvZnRlbiBiZXN0IHRvIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQgaXMgZXF1YWwgdG8gaXRzXG4gICAqIGV4cGVjdGVkIHZhbHVlLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmVxdWFsKDEpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmJlLmF0Lm1vc3QoMik7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmJlLmF0Lm1vc3QoMSk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBZGQgYC5sZW5ndGhPZmAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCdzIGBsZW5ndGhgXG4gICAqIG9yIGBzaXplYCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIGdpdmVuIG51bWJlciBgbmAuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoT2YoMyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoT2YuYXQubW9zdCg0KTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5oYXZlLmxlbmd0aE9mKDMpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGhPZi5hdC5tb3N0KDQpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5tb3N0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgyKS50by5lcXVhbCgyKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgyKS50by5ub3QuYmUuYXQubW9zdCgxKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIGAubW9zdGAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvciBtZXNzYWdlXG4gICAqIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhcyB0aGVcbiAgICogc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDIpLnRvLmJlLmF0Lm1vc3QoMSwgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKiAgICAgZXhwZWN0KDIsICdub29vIHdoeSBmYWlsPz8nKS50by5iZS5hdC5tb3N0KDEpO1xuICAgKlxuICAgKiBUaGUgYWxpYXMgYC5sdGVgIGNhbiBiZSB1c2VkIGludGVyY2hhbmdlYWJseSB3aXRoIGAubW9zdGAuXG4gICAqXG4gICAqIEBuYW1lIG1vc3RcbiAgICogQGFsaWFzIGx0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gblxuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0TW9zdCAobiwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIGRvTGVuZ3RoID0gZmxhZyh0aGlzLCAnZG9MZW5ndGgnKVxuICAgICAgLCBmbGFnTXNnID0gZmxhZyh0aGlzLCAnbWVzc2FnZScpXG4gICAgICAsIG1zZ1ByZWZpeCA9ICgoZmxhZ01zZykgPyBmbGFnTXNnICsgJzogJyA6ICcnKVxuICAgICAgLCBzc2ZpID0gZmxhZyh0aGlzLCAnc3NmaScpXG4gICAgICAsIG9ialR5cGUgPSBfLnR5cGUob2JqKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIG5UeXBlID0gXy50eXBlKG4pLnRvTG93ZXJDYXNlKClcbiAgICAgICwgZXJyb3JNZXNzYWdlXG4gICAgICAsIHNob3VsZFRocm93ID0gdHJ1ZTtcblxuICAgIGlmIChkb0xlbmd0aCAmJiBvYmpUeXBlICE9PSAnbWFwJyAmJiBvYmpUeXBlICE9PSAnc2V0Jykge1xuICAgICAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmhhdmUucHJvcGVydHkoJ2xlbmd0aCcpO1xuICAgIH1cblxuICAgIGlmICghZG9MZW5ndGggJiYgKG9ialR5cGUgPT09ICdkYXRlJyAmJiBuVHlwZSAhPT0gJ2RhdGUnKSkge1xuICAgICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgJ3RoZSBhcmd1bWVudCB0byBtb3N0IG11c3QgYmUgYSBkYXRlJztcbiAgICB9IGVsc2UgaWYgKG5UeXBlICE9PSAnbnVtYmVyJyAmJiAoZG9MZW5ndGggfHwgb2JqVHlwZSA9PT0gJ251bWJlcicpKSB7XG4gICAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyAndGhlIGFyZ3VtZW50IHRvIG1vc3QgbXVzdCBiZSBhIG51bWJlcic7XG4gICAgfSBlbHNlIGlmICghZG9MZW5ndGggJiYgKG9ialR5cGUgIT09ICdkYXRlJyAmJiBvYmpUeXBlICE9PSAnbnVtYmVyJykpIHtcbiAgICAgIHZhciBwcmludE9iaiA9IChvYmpUeXBlID09PSAnc3RyaW5nJykgPyBcIidcIiArIG9iaiArIFwiJ1wiIDogb2JqO1xuICAgICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgJ2V4cGVjdGVkICcgKyBwcmludE9iaiArICcgdG8gYmUgYSBudW1iZXIgb3IgYSBkYXRlJztcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvdWxkVGhyb3cgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihlcnJvck1lc3NhZ2UsIHVuZGVmaW5lZCwgc3NmaSk7XG4gICAgfVxuXG4gICAgaWYgKGRvTGVuZ3RoKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9ICdsZW5ndGgnXG4gICAgICAgICwgaXRlbXNDb3VudDtcbiAgICAgIGlmIChvYmpUeXBlID09PSAnbWFwJyB8fCBvYmpUeXBlID09PSAnc2V0Jykge1xuICAgICAgICBkZXNjcmlwdG9yID0gJ3NpemUnO1xuICAgICAgICBpdGVtc0NvdW50ID0gb2JqLnNpemU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtc0NvdW50ID0gb2JqLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIGl0ZW1zQ291bnQgPD0gblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSAnICsgZGVzY3JpcHRvciArICcgYXQgbW9zdCAje2V4cH0gYnV0IGdvdCAje2FjdH0nXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhICcgKyBkZXNjcmlwdG9yICsgJyBhYm92ZSAje2V4cH0nXG4gICAgICAgICwgblxuICAgICAgICAsIGl0ZW1zQ291bnRcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIG9iaiA8PSBuXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYXQgbW9zdCAje2V4cH0nXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYWJvdmUgI3tleHB9J1xuICAgICAgICAsIG5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnbW9zdCcsIGFzc2VydE1vc3QpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdsdGUnLCBhc3NlcnRNb3N0KTtcblxuICAvKipcbiAgICogIyMjIC53aXRoaW4oc3RhcnQsIGZpbmlzaFssIG1zZ10pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGEgbnVtYmVyIG9yIGEgZGF0ZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIGdpdmVuXG4gICAqIG51bWJlciBvciBkYXRlIGBzdGFydGAsIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIGdpdmVuIG51bWJlciBvciBkYXRlIGBmaW5pc2hgIHJlc3BlY3RpdmVseS5cbiAgICogSG93ZXZlciwgaXQncyBvZnRlbiBiZXN0IHRvIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQgaXMgZXF1YWwgdG8gaXRzIGV4cGVjdGVkXG4gICAqIHZhbHVlLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDIpLnRvLmVxdWFsKDIpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDIpLnRvLmJlLndpdGhpbigxLCAzKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMikudG8uYmUud2l0aGluKDIsIDMpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgyKS50by5iZS53aXRoaW4oMSwgMik7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBZGQgYC5sZW5ndGhPZmAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gYXNzZXJ0IHRoYXQgdGhlIHRhcmdldCdzIGBsZW5ndGhgXG4gICAqIG9yIGBzaXplYCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIGdpdmVuIG51bWJlciBgc3RhcnRgLCBhbmQgbGVzc1xuICAgKiB0aGFuIG9yIGVxdWFsIHRvIHRoZSBnaXZlbiBudW1iZXIgYGZpbmlzaGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoT2YoMyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoT2Yud2l0aGluKDIsIDQpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoT2YoMyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5oYXZlLmxlbmd0aE9mLndpdGhpbigyLCA0KTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAud2l0aGluYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5lcXVhbCgxKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgxKS50by5ub3QuYmUud2l0aGluKDIsIDQpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogYC53aXRoaW5gIGFjY2VwdHMgYW4gb3B0aW9uYWwgYG1zZ2AgYXJndW1lbnQgd2hpY2ggaXMgYSBjdXN0b20gZXJyb3JcbiAgICogbWVzc2FnZSB0byBzaG93IHdoZW4gdGhlIGFzc2VydGlvbiBmYWlscy4gVGhlIG1lc3NhZ2UgY2FuIGFsc28gYmUgZ2l2ZW4gYXNcbiAgICogdGhlIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCg0KS50by5iZS53aXRoaW4oMSwgMywgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKiAgICAgZXhwZWN0KDQsICdub29vIHdoeSBmYWlsPz8nKS50by5iZS53aXRoaW4oMSwgMyk7XG4gICAqXG4gICAqIEBuYW1lIHdpdGhpblxuICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnQgbG93ZXIgYm91bmQgaW5jbHVzaXZlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmaW5pc2ggdXBwZXIgYm91bmQgaW5jbHVzaXZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCd3aXRoaW4nLCBmdW5jdGlvbiAoc3RhcnQsIGZpbmlzaCwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIGRvTGVuZ3RoID0gZmxhZyh0aGlzLCAnZG9MZW5ndGgnKVxuICAgICAgLCBmbGFnTXNnID0gZmxhZyh0aGlzLCAnbWVzc2FnZScpXG4gICAgICAsIG1zZ1ByZWZpeCA9ICgoZmxhZ01zZykgPyBmbGFnTXNnICsgJzogJyA6ICcnKVxuICAgICAgLCBzc2ZpID0gZmxhZyh0aGlzLCAnc3NmaScpXG4gICAgICAsIG9ialR5cGUgPSBfLnR5cGUob2JqKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIHN0YXJ0VHlwZSA9IF8udHlwZShzdGFydCkudG9Mb3dlckNhc2UoKVxuICAgICAgLCBmaW5pc2hUeXBlID0gXy50eXBlKGZpbmlzaCkudG9Mb3dlckNhc2UoKVxuICAgICAgLCBlcnJvck1lc3NhZ2VcbiAgICAgICwgc2hvdWxkVGhyb3cgPSB0cnVlXG4gICAgICAsIHJhbmdlID0gKHN0YXJ0VHlwZSA9PT0gJ2RhdGUnICYmIGZpbmlzaFR5cGUgPT09ICdkYXRlJylcbiAgICAgICAgICA/IHN0YXJ0LnRvVVRDU3RyaW5nKCkgKyAnLi4nICsgZmluaXNoLnRvVVRDU3RyaW5nKClcbiAgICAgICAgICA6IHN0YXJ0ICsgJy4uJyArIGZpbmlzaDtcblxuICAgIGlmIChkb0xlbmd0aCAmJiBvYmpUeXBlICE9PSAnbWFwJyAmJiBvYmpUeXBlICE9PSAnc2V0Jykge1xuICAgICAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmhhdmUucHJvcGVydHkoJ2xlbmd0aCcpO1xuICAgIH1cblxuICAgIGlmICghZG9MZW5ndGggJiYgKG9ialR5cGUgPT09ICdkYXRlJyAmJiAoc3RhcnRUeXBlICE9PSAnZGF0ZScgfHwgZmluaXNoVHlwZSAhPT0gJ2RhdGUnKSkpIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArICd0aGUgYXJndW1lbnRzIHRvIHdpdGhpbiBtdXN0IGJlIGRhdGVzJztcbiAgICB9IGVsc2UgaWYgKChzdGFydFR5cGUgIT09ICdudW1iZXInIHx8IGZpbmlzaFR5cGUgIT09ICdudW1iZXInKSAmJiAoZG9MZW5ndGggfHwgb2JqVHlwZSA9PT0gJ251bWJlcicpKSB7XG4gICAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyAndGhlIGFyZ3VtZW50cyB0byB3aXRoaW4gbXVzdCBiZSBudW1iZXJzJztcbiAgICB9IGVsc2UgaWYgKCFkb0xlbmd0aCAmJiAob2JqVHlwZSAhPT0gJ2RhdGUnICYmIG9ialR5cGUgIT09ICdudW1iZXInKSkge1xuICAgICAgdmFyIHByaW50T2JqID0gKG9ialR5cGUgPT09ICdzdHJpbmcnKSA/IFwiJ1wiICsgb2JqICsgXCInXCIgOiBvYmo7XG4gICAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyAnZXhwZWN0ZWQgJyArIHByaW50T2JqICsgJyB0byBiZSBhIG51bWJlciBvciBhIGRhdGUnO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaG91bGRUaHJvdyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRUaHJvdykge1xuICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKGVycm9yTWVzc2FnZSwgdW5kZWZpbmVkLCBzc2ZpKTtcbiAgICB9XG5cbiAgICBpZiAoZG9MZW5ndGgpIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gJ2xlbmd0aCdcbiAgICAgICAgLCBpdGVtc0NvdW50O1xuICAgICAgaWYgKG9ialR5cGUgPT09ICdtYXAnIHx8IG9ialR5cGUgPT09ICdzZXQnKSB7XG4gICAgICAgIGRlc2NyaXB0b3IgPSAnc2l6ZSc7XG4gICAgICAgIGl0ZW1zQ291bnQgPSBvYmouc2l6ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW1zQ291bnQgPSBvYmoubGVuZ3RoO1xuICAgICAgfVxuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgaXRlbXNDb3VudCA+PSBzdGFydCAmJiBpdGVtc0NvdW50IDw9IGZpbmlzaFxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSAnICsgZGVzY3JpcHRvciArICcgd2l0aGluICcgKyByYW5nZVxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIGEgJyArIGRlc2NyaXB0b3IgKyAnIHdpdGhpbiAnICsgcmFuZ2VcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIG9iaiA+PSBzdGFydCAmJiBvYmogPD0gZmluaXNoXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgd2l0aGluICcgKyByYW5nZVxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSB3aXRoaW4gJyArIHJhbmdlXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuaW5zdGFuY2VvZihjb25zdHJ1Y3RvclssIG1zZ10pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGFuIGluc3RhbmNlIG9mIHRoZSBnaXZlbiBgY29uc3RydWN0b3JgLlxuICAgKlxuICAgKiAgICAgZnVuY3Rpb24gQ2F0ICgpIHsgfVxuICAgKlxuICAgKiAgICAgZXhwZWN0KG5ldyBDYXQoKSkudG8uYmUuYW4uaW5zdGFuY2VvZihDYXQpO1xuICAgKiAgICAgZXhwZWN0KFsxLCAyXSkudG8uYmUuYW4uaW5zdGFuY2VvZihBcnJheSk7XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuaW5zdGFuY2VvZmAuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5ub3QuYmUuYW4uaW5zdGFuY2VvZihBcnJheSk7XG4gICAqXG4gICAqIGAuaW5zdGFuY2VvZmAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvclxuICAgKiBtZXNzYWdlIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhc1xuICAgKiB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmJlLmFuLmluc3RhbmNlb2YoQXJyYXksICdub29vIHdoeSBmYWlsPz8nKTtcbiAgICogICAgIGV4cGVjdCgxLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUuYW4uaW5zdGFuY2VvZihBcnJheSk7XG4gICAqXG4gICAqIER1ZSB0byBsaW1pdGF0aW9ucyBpbiBFUzUsIGAuaW5zdGFuY2VvZmAgbWF5IG5vdCBhbHdheXMgd29yayBhcyBleHBlY3RlZFxuICAgKiB3aGVuIHVzaW5nIGEgdHJhbnNwaWxlciBzdWNoIGFzIEJhYmVsIG9yIFR5cGVTY3JpcHQuIEluIHBhcnRpY3VsYXIsIGl0IG1heVxuICAgKiBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0cyB3aGVuIHN1YmNsYXNzaW5nIGJ1aWx0LWluIG9iamVjdCBzdWNoIGFzXG4gICAqIGBBcnJheWAsIGBFcnJvcmAsIGFuZCBgTWFwYC4gU2VlIHlvdXIgdHJhbnNwaWxlcidzIGRvY3MgZm9yIGRldGFpbHM6XG4gICAqXG4gICAqIC0gKFtCYWJlbF0oaHR0cHM6Ly9iYWJlbGpzLmlvL2RvY3MvdXNhZ2UvY2F2ZWF0cy8jY2xhc3NlcykpXG4gICAqIC0gKFtUeXBlU2NyaXB0XShodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvd2lraS9CcmVha2luZy1DaGFuZ2VzI2V4dGVuZGluZy1idWlsdC1pbnMtbGlrZS1lcnJvci1hcnJheS1hbmQtbWFwLW1heS1uby1sb25nZXItd29yaykpXG4gICAqXG4gICAqIFRoZSBhbGlhcyBgLmluc3RhbmNlT2ZgIGNhbiBiZSB1c2VkIGludGVyY2hhbmdlYWJseSB3aXRoIGAuaW5zdGFuY2VvZmAuXG4gICAqXG4gICAqIEBuYW1lIGluc3RhbmNlb2ZcbiAgICogQHBhcmFtIHtDb25zdHJ1Y3Rvcn0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBhbGlhcyBpbnN0YW5jZU9mXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydEluc3RhbmNlT2YgKGNvbnN0cnVjdG9yLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcblxuICAgIHZhciB0YXJnZXQgPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgIHZhciBzc2ZpID0gZmxhZyh0aGlzLCAnc3NmaScpO1xuICAgIHZhciBmbGFnTXNnID0gZmxhZyh0aGlzLCAnbWVzc2FnZScpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHZhciBpc0luc3RhbmNlT2YgPSB0YXJnZXQgaW5zdGFuY2VvZiBjb25zdHJ1Y3RvcjtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBUeXBlRXJyb3IpIHtcbiAgICAgICAgZmxhZ01zZyA9IGZsYWdNc2cgPyBmbGFnTXNnICsgJzogJyA6ICcnO1xuICAgICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgICAgZmxhZ01zZyArICdUaGUgaW5zdGFuY2VvZiBhc3NlcnRpb24gbmVlZHMgYSBjb25zdHJ1Y3RvciBidXQgJ1xuICAgICAgICAgICAgKyBfLnR5cGUoY29uc3RydWN0b3IpICsgJyB3YXMgZ2l2ZW4uJyxcbiAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgc3NmaVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cblxuICAgIHZhciBuYW1lID0gXy5nZXROYW1lKGNvbnN0cnVjdG9yKTtcbiAgICBpZiAobmFtZSA9PT0gbnVsbCkge1xuICAgICAgbmFtZSA9ICdhbiB1bm5hbWVkIGNvbnN0cnVjdG9yJztcbiAgICB9XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgaXNJbnN0YW5jZU9mXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGFuIGluc3RhbmNlIG9mICcgKyBuYW1lXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBhbiBpbnN0YW5jZSBvZiAnICsgbmFtZVxuICAgICk7XG4gIH07XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnaW5zdGFuY2VvZicsIGFzc2VydEluc3RhbmNlT2YpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdpbnN0YW5jZU9mJywgYXNzZXJ0SW5zdGFuY2VPZik7XG5cbiAgLyoqXG4gICAqICMjIyAucHJvcGVydHkobmFtZVssIHZhbFssIG1zZ11dKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBoYXMgYSBwcm9wZXJ0eSB3aXRoIHRoZSBnaXZlbiBrZXkgYG5hbWVgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaGF2ZS5wcm9wZXJ0eSgnYScpO1xuICAgKlxuICAgKiBXaGVuIGB2YWxgIGlzIHByb3ZpZGVkLCBgLnByb3BlcnR5YCBhbHNvIGFzc2VydHMgdGhhdCB0aGUgcHJvcGVydHkncyB2YWx1ZVxuICAgKiBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gYHZhbGAuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5oYXZlLnByb3BlcnR5KCdhJywgMSk7XG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHN0cmljdCAoYD09PWApIGVxdWFsaXR5IGlzIHVzZWQuIEFkZCBgLmRlZXBgIGVhcmxpZXIgaW4gdGhlXG4gICAqIGNoYWluIHRvIHVzZSBkZWVwIGVxdWFsaXR5IGluc3RlYWQuIFNlZSB0aGUgYGRlZXAtZXFsYCBwcm9qZWN0IHBhZ2UgZm9yXG4gICAqIGluZm8gb24gdGhlIGRlZXAgZXF1YWxpdHkgYWxnb3JpdGhtOiBodHRwczovL2dpdGh1Yi5jb20vY2hhaWpzL2RlZXAtZXFsLlxuICAgKlxuICAgKiAgICAgLy8gVGFyZ2V0IG9iamVjdCBkZWVwbHkgKGJ1dCBub3Qgc3RyaWN0bHkpIGhhcyBwcm9wZXJ0eSBgeDoge2E6IDF9YFxuICAgKiAgICAgZXhwZWN0KHt4OiB7YTogMX19KS50by5oYXZlLmRlZXAucHJvcGVydHkoJ3gnLCB7YTogMX0pO1xuICAgKiAgICAgZXhwZWN0KHt4OiB7YTogMX19KS50by5ub3QuaGF2ZS5wcm9wZXJ0eSgneCcsIHthOiAxfSk7XG4gICAqXG4gICAqIFRoZSB0YXJnZXQncyBlbnVtZXJhYmxlIGFuZCBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGFyZSBhbHdheXMgaW5jbHVkZWRcbiAgICogaW4gdGhlIHNlYXJjaC4gQnkgZGVmYXVsdCwgYm90aCBvd24gYW5kIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGFyZSBpbmNsdWRlZC5cbiAgICogQWRkIGAub3duYCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBleGNsdWRlIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGZyb20gdGhlXG4gICAqIHNlYXJjaC5cbiAgICpcbiAgICogICAgIE9iamVjdC5wcm90b3R5cGUuYiA9IDI7XG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5oYXZlLm93bi5wcm9wZXJ0eSgnYScpO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaGF2ZS5vd24ucHJvcGVydHkoJ2EnLCAxKTtcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLmhhdmUucHJvcGVydHkoJ2InKTtcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLm5vdC5oYXZlLm93bi5wcm9wZXJ0eSgnYicpO1xuICAgKlxuICAgKiBgLmRlZXBgIGFuZCBgLm93bmAgY2FuIGJlIGNvbWJpbmVkLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHt4OiB7YTogMX19KS50by5oYXZlLmRlZXAub3duLnByb3BlcnR5KCd4Jywge2E6IDF9KTtcbiAgICpcbiAgICogQWRkIGAubmVzdGVkYCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBlbmFibGUgZG90LSBhbmQgYnJhY2tldC1ub3RhdGlvbiB3aGVuXG4gICAqIHJlZmVyZW5jaW5nIG5lc3RlZCBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiB7YjogWyd4JywgJ3knXX19KS50by5oYXZlLm5lc3RlZC5wcm9wZXJ0eSgnYS5iWzFdJyk7XG4gICAqICAgICBleHBlY3Qoe2E6IHtiOiBbJ3gnLCAneSddfX0pLnRvLmhhdmUubmVzdGVkLnByb3BlcnR5KCdhLmJbMV0nLCAneScpO1xuICAgKlxuICAgKiBJZiBgLmAgb3IgYFtdYCBhcmUgcGFydCBvZiBhbiBhY3R1YWwgcHJvcGVydHkgbmFtZSwgdGhleSBjYW4gYmUgZXNjYXBlZCBieVxuICAgKiBhZGRpbmcgdHdvIGJhY2tzbGFzaGVzIGJlZm9yZSB0aGVtLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHsnLmEnOiB7J1tiXSc6ICd4J319KS50by5oYXZlLm5lc3RlZC5wcm9wZXJ0eSgnXFxcXC5hLlxcXFxbYlxcXFxdJyk7XG4gICAqXG4gICAqIGAuZGVlcGAgYW5kIGAubmVzdGVkYCBjYW4gYmUgY29tYmluZWQuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IHtiOiBbe2M6IDN9XX19KVxuICAgKiAgICAgICAudG8uaGF2ZS5kZWVwLm5lc3RlZC5wcm9wZXJ0eSgnYS5iWzBdJywge2M6IDN9KTtcbiAgICpcbiAgICogYC5vd25gIGFuZCBgLm5lc3RlZGAgY2Fubm90IGJlIGNvbWJpbmVkLlxuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLnByb3BlcnR5YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLm5vdC5oYXZlLnByb3BlcnR5KCdiJyk7XG4gICAqXG4gICAqIEhvd2V2ZXIsIGl0J3MgZGFuZ2Vyb3VzIHRvIG5lZ2F0ZSBgLnByb3BlcnR5YCB3aGVuIHByb3ZpZGluZyBgdmFsYC4gVGhlXG4gICAqIHByb2JsZW0gaXMgdGhhdCBpdCBjcmVhdGVzIHVuY2VydGFpbiBleHBlY3RhdGlvbnMgYnkgYXNzZXJ0aW5nIHRoYXQgdGhlXG4gICAqIHRhcmdldCBlaXRoZXIgZG9lc24ndCBoYXZlIGEgcHJvcGVydHkgd2l0aCB0aGUgZ2l2ZW4ga2V5IGBuYW1lYCwgb3IgdGhhdCBpdFxuICAgKiBkb2VzIGhhdmUgYSBwcm9wZXJ0eSB3aXRoIHRoZSBnaXZlbiBrZXkgYG5hbWVgIGJ1dCBpdHMgdmFsdWUgaXNuJ3QgZXF1YWwgdG9cbiAgICogdGhlIGdpdmVuIGB2YWxgLiBJdCdzIG9mdGVuIGJlc3QgdG8gaWRlbnRpZnkgdGhlIGV4YWN0IG91dHB1dCB0aGF0J3NcbiAgICogZXhwZWN0ZWQsIGFuZCB0aGVuIHdyaXRlIGFuIGFzc2VydGlvbiB0aGF0IG9ubHkgYWNjZXB0cyB0aGF0IGV4YWN0IG91dHB1dC5cbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzbid0IGV4cGVjdGVkIHRvIGhhdmUgYSBwcm9wZXJ0eSB3aXRoIHRoZSBnaXZlbiBrZXlcbiAgICogYG5hbWVgLCBpdCdzIG9mdGVuIGJlc3QgdG8gYXNzZXJ0IGV4YWN0bHkgdGhhdC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YjogMn0pLnRvLm5vdC5oYXZlLnByb3BlcnR5KCdhJyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2I6IDJ9KS50by5ub3QuaGF2ZS5wcm9wZXJ0eSgnYScsIDEpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIGV4cGVjdGVkIHRvIGhhdmUgYSBwcm9wZXJ0eSB3aXRoIHRoZSBnaXZlbiBrZXkgYG5hbWVgLFxuICAgKiBpdCdzIG9mdGVuIGJlc3QgdG8gYXNzZXJ0IHRoYXQgdGhlIHByb3BlcnR5IGhhcyBpdHMgZXhwZWN0ZWQgdmFsdWUsIHJhdGhlclxuICAgKiB0aGFuIGFzc2VydGluZyB0aGF0IGl0IGRvZXNuJ3QgaGF2ZSBvbmUgb2YgbWFueSB1bmV4cGVjdGVkIHZhbHVlcy5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogM30pLnRvLmhhdmUucHJvcGVydHkoJ2EnLCAzKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCh7YTogM30pLnRvLm5vdC5oYXZlLnByb3BlcnR5KCdhJywgMSk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBgLnByb3BlcnR5YCBjaGFuZ2VzIHRoZSB0YXJnZXQgb2YgYW55IGFzc2VydGlvbnMgdGhhdCBmb2xsb3cgaW4gdGhlIGNoYWluXG4gICAqIHRvIGJlIHRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgZnJvbSB0aGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLmhhdmUucHJvcGVydHkoJ2EnKS50aGF0LmlzLmEoJ251bWJlcicpO1xuICAgKlxuICAgKiBgLnByb3BlcnR5YCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yXG4gICAqIG1lc3NhZ2UgdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzXG4gICAqIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuIFdoZW4gbm90IHByb3ZpZGluZyBgdmFsYCwgb25seSB1c2UgdGhlXG4gICAqIHNlY29uZCBmb3JtLlxuICAgKlxuICAgKiAgICAgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLmhhdmUucHJvcGVydHkoJ2EnLCAyLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3Qoe2E6IDF9LCAnbm9vbyB3aHkgZmFpbD8/JykudG8uaGF2ZS5wcm9wZXJ0eSgnYScsIDIpO1xuICAgKiAgICAgZXhwZWN0KHthOiAxfSwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmhhdmUucHJvcGVydHkoJ2InKTtcbiAgICpcbiAgICogICAgIC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaGF2ZS5wcm9wZXJ0eSgnYicsIHVuZGVmaW5lZCwgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKlxuICAgKiBUaGUgYWJvdmUgYXNzZXJ0aW9uIGlzbid0IHRoZSBzYW1lIHRoaW5nIGFzIG5vdCBwcm92aWRpbmcgYHZhbGAuIEluc3RlYWQsXG4gICAqIGl0J3MgYXNzZXJ0aW5nIHRoYXQgdGhlIHRhcmdldCBvYmplY3QgaGFzIGEgYGJgIHByb3BlcnR5IHRoYXQncyBlcXVhbCB0b1xuICAgKiBgdW5kZWZpbmVkYC5cbiAgICpcbiAgICogVGhlIGFzc2VydGlvbnMgYC5vd25Qcm9wZXJ0eWAgYW5kIGAuaGF2ZU93blByb3BlcnR5YCBjYW4gYmUgdXNlZFxuICAgKiBpbnRlcmNoYW5nZWFibHkgd2l0aCBgLm93bi5wcm9wZXJ0eWAuXG4gICAqXG4gICAqIEBuYW1lIHByb3BlcnR5XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbCAob3B0aW9uYWwpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgX29wdGlvbmFsX1xuICAgKiBAcmV0dXJucyB2YWx1ZSBvZiBwcm9wZXJ0eSBmb3IgY2hhaW5pbmdcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0UHJvcGVydHkgKG5hbWUsIHZhbCwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG5cbiAgICB2YXIgaXNOZXN0ZWQgPSBmbGFnKHRoaXMsICduZXN0ZWQnKVxuICAgICAgLCBpc093biA9IGZsYWcodGhpcywgJ293bicpXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJylcbiAgICAgICwgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgc3NmaSA9IGZsYWcodGhpcywgJ3NzZmknKVxuICAgICAgLCBuYW1lVHlwZSA9IHR5cGVvZiBuYW1lO1xuXG4gICAgZmxhZ01zZyA9IGZsYWdNc2cgPyBmbGFnTXNnICsgJzogJyA6ICcnO1xuXG4gICAgaWYgKGlzTmVzdGVkKSB7XG4gICAgICBpZiAobmFtZVR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgICBmbGFnTXNnICsgJ3RoZSBhcmd1bWVudCB0byBwcm9wZXJ0eSBtdXN0IGJlIGEgc3RyaW5nIHdoZW4gdXNpbmcgbmVzdGVkIHN5bnRheCcsXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHNzZmlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5hbWVUeXBlICE9PSAnc3RyaW5nJyAmJiBuYW1lVHlwZSAhPT0gJ251bWJlcicgJiYgbmFtZVR5cGUgIT09ICdzeW1ib2wnKSB7XG4gICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgICBmbGFnTXNnICsgJ3RoZSBhcmd1bWVudCB0byBwcm9wZXJ0eSBtdXN0IGJlIGEgc3RyaW5nLCBudW1iZXIsIG9yIHN5bWJvbCcsXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHNzZmlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNOZXN0ZWQgJiYgaXNPd24pIHtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgZmxhZ01zZyArICdUaGUgXCJuZXN0ZWRcIiBhbmQgXCJvd25cIiBmbGFncyBjYW5ub3QgYmUgY29tYmluZWQuJyxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICBzc2ZpXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgZmxhZ01zZyArICdUYXJnZXQgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkLicsXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgc3NmaVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgaXNEZWVwID0gZmxhZyh0aGlzLCAnZGVlcCcpXG4gICAgICAsIG5lZ2F0ZSA9IGZsYWcodGhpcywgJ25lZ2F0ZScpXG4gICAgICAsIHBhdGhJbmZvID0gaXNOZXN0ZWQgPyBfLmdldFBhdGhJbmZvKG9iaiwgbmFtZSkgOiBudWxsXG4gICAgICAsIHZhbHVlID0gaXNOZXN0ZWQgPyBwYXRoSW5mby52YWx1ZSA6IG9ialtuYW1lXTtcblxuICAgIHZhciBkZXNjcmlwdG9yID0gJyc7XG4gICAgaWYgKGlzRGVlcCkgZGVzY3JpcHRvciArPSAnZGVlcCAnO1xuICAgIGlmIChpc093bikgZGVzY3JpcHRvciArPSAnb3duICc7XG4gICAgaWYgKGlzTmVzdGVkKSBkZXNjcmlwdG9yICs9ICduZXN0ZWQgJztcbiAgICBkZXNjcmlwdG9yICs9ICdwcm9wZXJ0eSAnO1xuXG4gICAgdmFyIGhhc1Byb3BlcnR5O1xuICAgIGlmIChpc093bikgaGFzUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBuYW1lKTtcbiAgICBlbHNlIGlmIChpc05lc3RlZCkgaGFzUHJvcGVydHkgPSBwYXRoSW5mby5leGlzdHM7XG4gICAgZWxzZSBoYXNQcm9wZXJ0eSA9IF8uaGFzUHJvcGVydHkob2JqLCBuYW1lKTtcblxuICAgIC8vIFdoZW4gcGVyZm9ybWluZyBhIG5lZ2F0ZWQgYXNzZXJ0aW9uIGZvciBib3RoIG5hbWUgYW5kIHZhbCwgbWVyZWx5IGhhdmluZ1xuICAgIC8vIGEgcHJvcGVydHkgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBpc24ndCBlbm91Z2ggdG8gY2F1c2UgdGhlIGFzc2VydGlvbiB0b1xuICAgIC8vIGZhaWwuIEl0IG11c3QgYm90aCBoYXZlIGEgcHJvcGVydHkgd2l0aCB0aGUgZ2l2ZW4gbmFtZSwgYW5kIHRoZSB2YWx1ZSBvZlxuICAgIC8vIHRoYXQgcHJvcGVydHkgbXVzdCBlcXVhbCB0aGUgZ2l2ZW4gdmFsLiBUaGVyZWZvcmUsIHNraXAgdGhpcyBhc3NlcnRpb24gaW5cbiAgICAvLyBmYXZvciBvZiB0aGUgbmV4dC5cbiAgICBpZiAoIW5lZ2F0ZSB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBoYXNQcm9wZXJ0eVxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgJyArIGRlc2NyaXB0b3IgKyBfLmluc3BlY3QobmFtZSlcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSAnICsgZGVzY3JpcHRvciArIF8uaW5zcGVjdChuYW1lKSk7XG4gICAgfVxuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBoYXNQcm9wZXJ0eSAmJiAoaXNEZWVwID8gXy5lcWwodmFsLCB2YWx1ZSkgOiB2YWwgPT09IHZhbHVlKVxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgJyArIGRlc2NyaXB0b3IgKyBfLmluc3BlY3QobmFtZSkgKyAnIG9mICN7ZXhwfSwgYnV0IGdvdCAje2FjdH0nXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgJyArIGRlc2NyaXB0b3IgKyBfLmluc3BlY3QobmFtZSkgKyAnIG9mICN7YWN0fSdcbiAgICAgICAgLCB2YWxcbiAgICAgICAgLCB2YWx1ZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmbGFnKHRoaXMsICdvYmplY3QnLCB2YWx1ZSk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdwcm9wZXJ0eScsIGFzc2VydFByb3BlcnR5KTtcblxuICBmdW5jdGlvbiBhc3NlcnRPd25Qcm9wZXJ0eSAobmFtZSwgdmFsdWUsIG1zZykge1xuICAgIGZsYWcodGhpcywgJ293bicsIHRydWUpO1xuICAgIGFzc2VydFByb3BlcnR5LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdvd25Qcm9wZXJ0eScsIGFzc2VydE93blByb3BlcnR5KTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnaGF2ZU93blByb3BlcnR5JywgYXNzZXJ0T3duUHJvcGVydHkpO1xuXG4gIC8qKlxuICAgKiAjIyMgLm93blByb3BlcnR5RGVzY3JpcHRvcihuYW1lWywgZGVzY3JpcHRvclssIG1zZ11dKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBoYXMgaXRzIG93biBwcm9wZXJ0eSBkZXNjcmlwdG9yIHdpdGggdGhlIGdpdmVuIGtleVxuICAgKiBgbmFtZWAuIEVudW1lcmFibGUgYW5kIG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXMgYXJlIGluY2x1ZGVkIGluIHRoZVxuICAgKiBzZWFyY2guXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5oYXZlLm93blByb3BlcnR5RGVzY3JpcHRvcignYScpO1xuICAgKlxuICAgKiBXaGVuIGBkZXNjcmlwdG9yYCBpcyBwcm92aWRlZCwgYC5vd25Qcm9wZXJ0eURlc2NyaXB0b3JgIGFsc28gYXNzZXJ0cyB0aGF0XG4gICAqIHRoZSBwcm9wZXJ0eSdzIGRlc2NyaXB0b3IgaXMgZGVlcGx5IGVxdWFsIHRvIHRoZSBnaXZlbiBgZGVzY3JpcHRvcmAuIFNlZVxuICAgKiB0aGUgYGRlZXAtZXFsYCBwcm9qZWN0IHBhZ2UgZm9yIGluZm8gb24gdGhlIGRlZXAgZXF1YWxpdHkgYWxnb3JpdGhtOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vY2hhaWpzL2RlZXAtZXFsLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaGF2ZS5vd25Qcm9wZXJ0eURlc2NyaXB0b3IoJ2EnLCB7XG4gICAqICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICogICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICogICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAqICAgICAgIHZhbHVlOiAxLFxuICAgKiAgICAgfSk7XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAub3duUHJvcGVydHlEZXNjcmlwdG9yYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLm5vdC5oYXZlLm93blByb3BlcnR5RGVzY3JpcHRvcignYicpO1xuICAgKlxuICAgKiBIb3dldmVyLCBpdCdzIGRhbmdlcm91cyB0byBuZWdhdGUgYC5vd25Qcm9wZXJ0eURlc2NyaXB0b3JgIHdoZW4gcHJvdmlkaW5nXG4gICAqIGEgYGRlc2NyaXB0b3JgLiBUaGUgcHJvYmxlbSBpcyB0aGF0IGl0IGNyZWF0ZXMgdW5jZXJ0YWluIGV4cGVjdGF0aW9ucyBieVxuICAgKiBhc3NlcnRpbmcgdGhhdCB0aGUgdGFyZ2V0IGVpdGhlciBkb2Vzbid0IGhhdmUgYSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHdpdGhcbiAgICogdGhlIGdpdmVuIGtleSBgbmFtZWAsIG9yIHRoYXQgaXQgZG9lcyBoYXZlIGEgcHJvcGVydHkgZGVzY3JpcHRvciB3aXRoIHRoZVxuICAgKiBnaXZlbiBrZXkgYG5hbWVgIGJ1dCBpdHMgbm90IGRlZXBseSBlcXVhbCB0byB0aGUgZ2l2ZW4gYGRlc2NyaXB0b3JgLiBJdCdzXG4gICAqIG9mdGVuIGJlc3QgdG8gaWRlbnRpZnkgdGhlIGV4YWN0IG91dHB1dCB0aGF0J3MgZXhwZWN0ZWQsIGFuZCB0aGVuIHdyaXRlIGFuXG4gICAqIGFzc2VydGlvbiB0aGF0IG9ubHkgYWNjZXB0cyB0aGF0IGV4YWN0IG91dHB1dC5cbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzbid0IGV4cGVjdGVkIHRvIGhhdmUgYSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHdpdGggdGhlIGdpdmVuXG4gICAqIGtleSBgbmFtZWAsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnQgZXhhY3RseSB0aGF0LlxuICAgKlxuICAgKiAgICAgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCh7YjogMn0pLnRvLm5vdC5oYXZlLm93blByb3BlcnR5RGVzY3JpcHRvcignYScpO1xuICAgKlxuICAgKiAgICAgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2I6IDJ9KS50by5ub3QuaGF2ZS5vd25Qcm9wZXJ0eURlc2NyaXB0b3IoJ2EnLCB7XG4gICAqICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICogICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICogICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAqICAgICAgIHZhbHVlOiAxLFxuICAgKiAgICAgfSk7XG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBpcyBleHBlY3RlZCB0byBoYXZlIGEgcHJvcGVydHkgZGVzY3JpcHRvciB3aXRoIHRoZSBnaXZlblxuICAgKiBrZXkgYG5hbWVgLCBpdCdzIG9mdGVuIGJlc3QgdG8gYXNzZXJ0IHRoYXQgdGhlIHByb3BlcnR5IGhhcyBpdHMgZXhwZWN0ZWRcbiAgICogZGVzY3JpcHRvciwgcmF0aGVyIHRoYW4gYXNzZXJ0aW5nIHRoYXQgaXQgZG9lc24ndCBoYXZlIG9uZSBvZiBtYW55XG4gICAqIHVuZXhwZWN0ZWQgZGVzY3JpcHRvcnMuXG4gICAqXG4gICAqICAgICAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KHthOiAzfSkudG8uaGF2ZS5vd25Qcm9wZXJ0eURlc2NyaXB0b3IoJ2EnLCB7XG4gICAqICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICogICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICogICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAqICAgICAgIHZhbHVlOiAzLFxuICAgKiAgICAgfSk7XG4gICAqXG4gICAqICAgICAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCh7YTogM30pLnRvLm5vdC5oYXZlLm93blByb3BlcnR5RGVzY3JpcHRvcignYScsIHtcbiAgICogICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgKiAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgKiAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICogICAgICAgdmFsdWU6IDEsXG4gICAqICAgICB9KTtcbiAgICpcbiAgICogYC5vd25Qcm9wZXJ0eURlc2NyaXB0b3JgIGNoYW5nZXMgdGhlIHRhcmdldCBvZiBhbnkgYXNzZXJ0aW9ucyB0aGF0IGZvbGxvd1xuICAgKiBpbiB0aGUgY2hhaW4gdG8gYmUgdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZyb20gdGhlIG9yaWdpbmFsXG4gICAqIHRhcmdldCBvYmplY3QuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5oYXZlLm93blByb3BlcnR5RGVzY3JpcHRvcignYScpXG4gICAqICAgICAgIC50aGF0Lmhhcy5wcm9wZXJ0eSgnZW51bWVyYWJsZScsIHRydWUpO1xuICAgKlxuICAgKiBgLm93blByb3BlcnR5RGVzY3JpcHRvcmAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhXG4gICAqIGN1c3RvbSBlcnJvciBtZXNzYWdlIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzb1xuICAgKiBiZSBnaXZlbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLiBXaGVuIG5vdCBwcm92aWRpbmdcbiAgICogYGRlc2NyaXB0b3JgLCBvbmx5IHVzZSB0aGUgc2Vjb25kIGZvcm0uXG4gICAqXG4gICAqICAgICAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaGF2ZS5vd25Qcm9wZXJ0eURlc2NyaXB0b3IoJ2EnLCB7XG4gICAqICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICogICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICogICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAqICAgICAgIHZhbHVlOiAyLFxuICAgKiAgICAgfSwgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKlxuICAgKiAgICAgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCh7YTogMX0sICdub29vIHdoeSBmYWlsPz8nKS50by5oYXZlLm93blByb3BlcnR5RGVzY3JpcHRvcignYScsIHtcbiAgICogICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgKiAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgKiAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICogICAgICAgdmFsdWU6IDIsXG4gICAqICAgICB9KTtcbiAgICpcbiAgICogICAgIC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoe2E6IDF9LCAnbm9vbyB3aHkgZmFpbD8/JykudG8uaGF2ZS5vd25Qcm9wZXJ0eURlc2NyaXB0b3IoJ2InKTtcbiAgICpcbiAgICogICAgIC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KHthOiAxfSlcbiAgICogICAgICAgLnRvLmhhdmUub3duUHJvcGVydHlEZXNjcmlwdG9yKCdiJywgdW5kZWZpbmVkLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqXG4gICAqIFRoZSBhYm92ZSBhc3NlcnRpb24gaXNuJ3QgdGhlIHNhbWUgdGhpbmcgYXMgbm90IHByb3ZpZGluZyBgZGVzY3JpcHRvcmAuXG4gICAqIEluc3RlYWQsIGl0J3MgYXNzZXJ0aW5nIHRoYXQgdGhlIHRhcmdldCBvYmplY3QgaGFzIGEgYGJgIHByb3BlcnR5XG4gICAqIGRlc2NyaXB0b3IgdGhhdCdzIGRlZXBseSBlcXVhbCB0byBgdW5kZWZpbmVkYC5cbiAgICpcbiAgICogVGhlIGFsaWFzIGAuaGF2ZU93blByb3BlcnR5RGVzY3JpcHRvcmAgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGhcbiAgICogYC5vd25Qcm9wZXJ0eURlc2NyaXB0b3JgLlxuICAgKlxuICAgKiBAbmFtZSBvd25Qcm9wZXJ0eURlc2NyaXB0b3JcbiAgICogQGFsaWFzIGhhdmVPd25Qcm9wZXJ0eURlc2NyaXB0b3JcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IGRlc2NyaXB0b3IgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0T3duUHJvcGVydHlEZXNjcmlwdG9yIChuYW1lLCBkZXNjcmlwdG9yLCBtc2cpIHtcbiAgICBpZiAodHlwZW9mIGRlc2NyaXB0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtc2cgPSBkZXNjcmlwdG9yO1xuICAgICAgZGVzY3JpcHRvciA9IG51bGw7XG4gICAgfVxuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcbiAgICB2YXIgYWN0dWFsRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0KG9iaiksIG5hbWUpO1xuICAgIGlmIChhY3R1YWxEZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IpIHtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIF8uZXFsKGRlc2NyaXB0b3IsIGFjdHVhbERlc2NyaXB0b3IpXG4gICAgICAgICwgJ2V4cGVjdGVkIHRoZSBvd24gcHJvcGVydHkgZGVzY3JpcHRvciBmb3IgJyArIF8uaW5zcGVjdChuYW1lKSArICcgb24gI3t0aGlzfSB0byBtYXRjaCAnICsgXy5pbnNwZWN0KGRlc2NyaXB0b3IpICsgJywgZ290ICcgKyBfLmluc3BlY3QoYWN0dWFsRGVzY3JpcHRvcilcbiAgICAgICAgLCAnZXhwZWN0ZWQgdGhlIG93biBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZvciAnICsgXy5pbnNwZWN0KG5hbWUpICsgJyBvbiAje3RoaXN9IHRvIG5vdCBtYXRjaCAnICsgXy5pbnNwZWN0KGRlc2NyaXB0b3IpXG4gICAgICAgICwgZGVzY3JpcHRvclxuICAgICAgICAsIGFjdHVhbERlc2NyaXB0b3JcbiAgICAgICAgLCB0cnVlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBhY3R1YWxEZXNjcmlwdG9yXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhbiBvd24gcHJvcGVydHkgZGVzY3JpcHRvciBmb3IgJyArIF8uaW5zcGVjdChuYW1lKVxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIGFuIG93biBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZvciAnICsgXy5pbnNwZWN0KG5hbWUpXG4gICAgICApO1xuICAgIH1cbiAgICBmbGFnKHRoaXMsICdvYmplY3QnLCBhY3R1YWxEZXNjcmlwdG9yKTtcbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ293blByb3BlcnR5RGVzY3JpcHRvcicsIGFzc2VydE93blByb3BlcnR5RGVzY3JpcHRvcik7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2hhdmVPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCBhc3NlcnRPd25Qcm9wZXJ0eURlc2NyaXB0b3IpO1xuXG4gIC8qKlxuICAgKiAjIyMgLmxlbmd0aE9mKG5bLCBtc2ddKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCdzIGBsZW5ndGhgIG9yIGBzaXplYCBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gbnVtYmVyXG4gICAqIGBuYC5cbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoT2YoMyk7XG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoT2YoMyk7XG4gICAqICAgICBleHBlY3QobmV3IFNldChbMSwgMiwgM10pKS50by5oYXZlLmxlbmd0aE9mKDMpO1xuICAgKiAgICAgZXhwZWN0KG5ldyBNYXAoW1snYScsIDFdLCBbJ2InLCAyXSwgWydjJywgM11dKSkudG8uaGF2ZS5sZW5ndGhPZigzKTtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5sZW5ndGhPZmAuIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW5cbiAgICogYmVzdCB0byBhc3NlcnQgdGhhdCB0aGUgdGFyZ2V0J3MgYGxlbmd0aGAgcHJvcGVydHkgaXMgZXF1YWwgdG8gaXRzIGV4cGVjdGVkXG4gICAqIHZhbHVlLCByYXRoZXIgdGhhbiBub3QgZXF1YWwgdG8gb25lIG9mIG1hbnkgdW5leHBlY3RlZCB2YWx1ZXMuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoT2YoMyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLm5vdC5oYXZlLmxlbmd0aE9mKDQpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogYC5sZW5ndGhPZmAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvclxuICAgKiBtZXNzYWdlIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhc1xuICAgKiB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGhPZigyLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uaGF2ZS5sZW5ndGhPZigyKTtcbiAgICpcbiAgICogYC5sZW5ndGhPZmAgY2FuIGFsc28gYmUgdXNlZCBhcyBhIGxhbmd1YWdlIGNoYWluLCBjYXVzaW5nIGFsbCBgLmFib3ZlYCxcbiAgICogYC5iZWxvd2AsIGAubGVhc3RgLCBgLm1vc3RgLCBhbmQgYC53aXRoaW5gIGFzc2VydGlvbnMgdGhhdCBmb2xsb3cgaW4gdGhlXG4gICAqIGNoYWluIHRvIHVzZSB0aGUgdGFyZ2V0J3MgYGxlbmd0aGAgcHJvcGVydHkgYXMgdGhlIHRhcmdldC4gSG93ZXZlciwgaXQnc1xuICAgKiBvZnRlbiBiZXN0IHRvIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQncyBgbGVuZ3RoYCBwcm9wZXJ0eSBpcyBlcXVhbCB0byBpdHNcbiAgICogZXhwZWN0ZWQgbGVuZ3RoLCByYXRoZXIgdGhhbiBhc3NlcnRpbmcgdGhhdCBpdHMgYGxlbmd0aGAgcHJvcGVydHkgZmFsbHNcbiAgICogd2l0aGluIHNvbWUgcmFuZ2Ugb2YgdmFsdWVzLlxuICAgKlxuICAgKiAgICAgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoT2YoMyk7XG4gICAqXG4gICAqICAgICAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoT2YuYWJvdmUoMik7XG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5oYXZlLmxlbmd0aE9mLmJlbG93KDQpO1xuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGhPZi5hdC5sZWFzdCgzKTtcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoT2YuYXQubW9zdCgzKTtcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubGVuZ3RoT2Yud2l0aGluKDIsNCk7XG4gICAqXG4gICAqIER1ZSB0byBhIGNvbXBhdGliaWxpdHkgaXNzdWUsIHRoZSBhbGlhcyBgLmxlbmd0aGAgY2FuJ3QgYmUgY2hhaW5lZCBkaXJlY3RseVxuICAgKiBvZmYgb2YgYW4gdW5pbnZva2VkIG1ldGhvZCBzdWNoIGFzIGAuYWAuIFRoZXJlZm9yZSwgYC5sZW5ndGhgIGNhbid0IGJlIHVzZWRcbiAgICogaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5sZW5ndGhPZmAgaW4gZXZlcnkgc2l0dWF0aW9uLiBJdCdzIHJlY29tbWVuZGVkIHRvXG4gICAqIGFsd2F5cyB1c2UgYC5sZW5ndGhPZmAgaW5zdGVhZCBvZiBgLmxlbmd0aGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5oYXZlLmEubGVuZ3RoKDMpOyAvLyBpbmNvbXBhdGlibGU7IHRocm93cyBlcnJvclxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5hLmxlbmd0aE9mKDMpOyAgLy8gcGFzc2VzIGFzIGV4cGVjdGVkXG4gICAqXG4gICAqIEBuYW1lIGxlbmd0aE9mXG4gICAqIEBhbGlhcyBsZW5ndGhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydExlbmd0aENoYWluICgpIHtcbiAgICBmbGFnKHRoaXMsICdkb0xlbmd0aCcsIHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXNzZXJ0TGVuZ3RoIChuLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgb2JqVHlwZSA9IF8udHlwZShvYmopLnRvTG93ZXJDYXNlKClcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBzc2ZpID0gZmxhZyh0aGlzLCAnc3NmaScpXG4gICAgICAsIGRlc2NyaXB0b3IgPSAnbGVuZ3RoJ1xuICAgICAgLCBpdGVtc0NvdW50O1xuXG4gICAgc3dpdGNoIChvYmpUeXBlKSB7XG4gICAgICBjYXNlICdtYXAnOlxuICAgICAgY2FzZSAnc2V0JzpcbiAgICAgICAgZGVzY3JpcHRvciA9ICdzaXplJztcbiAgICAgICAgaXRlbXNDb3VudCA9IG9iai5zaXplO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICAgICAgaXRlbXNDb3VudCA9IG9iai5sZW5ndGg7XG4gICAgfVxuXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIGl0ZW1zQ291bnQgPT0gblxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgJyArIGRlc2NyaXB0b3IgKyAnIG9mICN7ZXhwfSBidXQgZ290ICN7YWN0fSdcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgYSAnICsgZGVzY3JpcHRvciArICcgb2YgI3thY3R9J1xuICAgICAgLCBuXG4gICAgICAsIGl0ZW1zQ291bnRcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZCgnbGVuZ3RoJywgYXNzZXJ0TGVuZ3RoLCBhc3NlcnRMZW5ndGhDaGFpbik7XG4gIEFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QoJ2xlbmd0aE9mJywgYXNzZXJ0TGVuZ3RoLCBhc3NlcnRMZW5ndGhDaGFpbik7XG5cbiAgLyoqXG4gICAqICMjIyAubWF0Y2gocmVbLCBtc2ddKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBtYXRjaGVzIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24gYHJlYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vYmFyJykudG8ubWF0Y2goL15mb28vKTtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5tYXRjaGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2Zvb2JhcicpLnRvLm5vdC5tYXRjaCgvdGFjby8pO1xuICAgKlxuICAgKiBgLm1hdGNoYCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yIG1lc3NhZ2VcbiAgICogdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzIHRoZVxuICAgKiBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2Zvb2JhcicpLnRvLm1hdGNoKC90YWNvLywgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKiAgICAgZXhwZWN0KCdmb29iYXInLCAnbm9vbyB3aHkgZmFpbD8/JykudG8ubWF0Y2goL3RhY28vKTtcbiAgICpcbiAgICogVGhlIGFsaWFzIGAubWF0Y2hlc2AgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5tYXRjaGAuXG4gICAqXG4gICAqIEBuYW1lIG1hdGNoXG4gICAqIEBhbGlhcyBtYXRjaGVzXG4gICAqIEBwYXJhbSB7UmVnRXhwfSByZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG4gIGZ1bmN0aW9uIGFzc2VydE1hdGNoKHJlLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIHJlLmV4ZWMob2JqKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBtYXRjaCAnICsgcmVcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gbm90IHRvIG1hdGNoICcgKyByZVxuICAgICk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdtYXRjaCcsIGFzc2VydE1hdGNoKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnbWF0Y2hlcycsIGFzc2VydE1hdGNoKTtcblxuICAvKipcbiAgICogIyMjIC5zdHJpbmcoc3RyWywgbXNnXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgc3RyaW5nIGNvbnRhaW5zIHRoZSBnaXZlbiBzdWJzdHJpbmcgYHN0cmAuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2Zvb2JhcicpLnRvLmhhdmUuc3RyaW5nKCdiYXInKTtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5zdHJpbmdgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb29iYXInKS50by5ub3QuaGF2ZS5zdHJpbmcoJ3RhY28nKTtcbiAgICpcbiAgICogYC5zdHJpbmdgIGFjY2VwdHMgYW4gb3B0aW9uYWwgYG1zZ2AgYXJndW1lbnQgd2hpY2ggaXMgYSBjdXN0b20gZXJyb3JcbiAgICogbWVzc2FnZSB0byBzaG93IHdoZW4gdGhlIGFzc2VydGlvbiBmYWlscy4gVGhlIG1lc3NhZ2UgY2FuIGFsc28gYmUgZ2l2ZW4gYXNcbiAgICogdGhlIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vYmFyJykudG8uaGF2ZS5zdHJpbmcoJ3RhY28nLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoJ2Zvb2JhcicsICdub29vIHdoeSBmYWlsPz8nKS50by5oYXZlLnN0cmluZygndGFjbycpO1xuICAgKlxuICAgKiBAbmFtZSBzdHJpbmdcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnc3RyaW5nJywgZnVuY3Rpb24gKHN0ciwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJylcbiAgICAgICwgc3NmaSA9IGZsYWcodGhpcywgJ3NzZmknKTtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYSgnc3RyaW5nJyk7XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgfm9iai5pbmRleE9mKHN0cilcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gY29udGFpbiAnICsgXy5pbnNwZWN0KHN0cilcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGNvbnRhaW4gJyArIF8uaW5zcGVjdChzdHIpXG4gICAgKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAua2V5cyhrZXkxWywga2V5MlssIC4uLl1dKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBvYmplY3QsIGFycmF5LCBtYXAsIG9yIHNldCBoYXMgdGhlIGdpdmVuIGtleXMuIE9ubHlcbiAgICogdGhlIHRhcmdldCdzIG93biBpbmhlcml0ZWQgcHJvcGVydGllcyBhcmUgaW5jbHVkZWQgaW4gdGhlIHNlYXJjaC5cbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIGFuIG9iamVjdCBvciBhcnJheSwga2V5cyBjYW4gYmUgcHJvdmlkZWQgYXMgb25lIG9yIG1vcmVcbiAgICogc3RyaW5nIGFyZ3VtZW50cywgYSBzaW5nbGUgYXJyYXkgYXJndW1lbnQsIG9yIGEgc2luZ2xlIG9iamVjdCBhcmd1bWVudC4gSW5cbiAgICogdGhlIGxhdHRlciBjYXNlLCBvbmx5IHRoZSBrZXlzIGluIHRoZSBnaXZlbiBvYmplY3QgbWF0dGVyOyB0aGUgdmFsdWVzIGFyZVxuICAgKiBpZ25vcmVkLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxLCBiOiAyfSkudG8uaGF2ZS5hbGwua2V5cygnYScsICdiJyk7XG4gICAqICAgICBleHBlY3QoWyd4JywgJ3knXSkudG8uaGF2ZS5hbGwua2V5cygwLCAxKTtcbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMSwgYjogMn0pLnRvLmhhdmUuYWxsLmtleXMoWydhJywgJ2InXSk7XG4gICAqICAgICBleHBlY3QoWyd4JywgJ3knXSkudG8uaGF2ZS5hbGwua2V5cyhbMCwgMV0pO1xuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxLCBiOiAyfSkudG8uaGF2ZS5hbGwua2V5cyh7YTogNCwgYjogNX0pOyAvLyBpZ25vcmUgNCBhbmQgNVxuICAgKiAgICAgZXhwZWN0KFsneCcsICd5J10pLnRvLmhhdmUuYWxsLmtleXMoezA6IDQsIDE6IDV9KTsgLy8gaWdub3JlIDQgYW5kIDVcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIGEgbWFwIG9yIHNldCwgZWFjaCBrZXkgbXVzdCBiZSBwcm92aWRlZCBhcyBhIHNlcGFyYXRlXG4gICAqIGFyZ3VtZW50LlxuICAgKlxuICAgKiAgICAgZXhwZWN0KG5ldyBNYXAoW1snYScsIDFdLCBbJ2InLCAyXV0pKS50by5oYXZlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICogICAgIGV4cGVjdChuZXcgU2V0KFsnYScsICdiJ10pKS50by5oYXZlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICpcbiAgICogQmVjYXVzZSBgLmtleXNgIGRvZXMgZGlmZmVyZW50IHRoaW5ncyBiYXNlZCBvbiB0aGUgdGFyZ2V0J3MgdHlwZSwgaXQnc1xuICAgKiBpbXBvcnRhbnQgdG8gY2hlY2sgdGhlIHRhcmdldCdzIHR5cGUgYmVmb3JlIHVzaW5nIGAua2V5c2AuIFNlZSB0aGUgYC5hYCBkb2NcbiAgICogZm9yIGluZm8gb24gdGVzdGluZyBhIHRhcmdldCdzIHR5cGUuXG4gICAqXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDJ9KS50by5iZS5hbignb2JqZWN0JykudGhhdC5oYXMuYWxsLmtleXMoJ2EnLCAnYicpO1xuICAgKlxuICAgKiBCeSBkZWZhdWx0LCBzdHJpY3QgKGA9PT1gKSBlcXVhbGl0eSBpcyB1c2VkIHRvIGNvbXBhcmUga2V5cyBvZiBtYXBzIGFuZFxuICAgKiBzZXRzLiBBZGQgYC5kZWVwYCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byB1c2UgZGVlcCBlcXVhbGl0eSBpbnN0ZWFkLiBTZWVcbiAgICogdGhlIGBkZWVwLWVxbGAgcHJvamVjdCBwYWdlIGZvciBpbmZvIG9uIHRoZSBkZWVwIGVxdWFsaXR5IGFsZ29yaXRobTpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2NoYWlqcy9kZWVwLWVxbC5cbiAgICpcbiAgICogICAgIC8vIFRhcmdldCBzZXQgZGVlcGx5IChidXQgbm90IHN0cmljdGx5KSBoYXMga2V5IGB7YTogMX1gXG4gICAqICAgICBleHBlY3QobmV3IFNldChbe2E6IDF9XSkpLnRvLmhhdmUuYWxsLmRlZXAua2V5cyhbe2E6IDF9XSk7XG4gICAqICAgICBleHBlY3QobmV3IFNldChbe2E6IDF9XSkpLnRvLm5vdC5oYXZlLmFsbC5rZXlzKFt7YTogMX1dKTtcbiAgICpcbiAgICogQnkgZGVmYXVsdCwgdGhlIHRhcmdldCBtdXN0IGhhdmUgYWxsIG9mIHRoZSBnaXZlbiBrZXlzIGFuZCBubyBtb3JlLiBBZGRcbiAgICogYC5hbnlgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG9ubHkgcmVxdWlyZSB0aGF0IHRoZSB0YXJnZXQgaGF2ZSBhdCBsZWFzdFxuICAgKiBvbmUgb2YgdGhlIGdpdmVuIGtleXMuIEFsc28sIGFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlXG4gICAqIGAua2V5c2AuIEl0J3Mgb2Z0ZW4gYmVzdCB0byBhZGQgYC5hbnlgIHdoZW4gbmVnYXRpbmcgYC5rZXlzYCwgYW5kIHRvIHVzZVxuICAgKiBgLmFsbGAgd2hlbiBhc3NlcnRpbmcgYC5rZXlzYCB3aXRob3V0IG5lZ2F0aW9uLlxuICAgKlxuICAgKiBXaGVuIG5lZ2F0aW5nIGAua2V5c2AsIGAuYW55YCBpcyBwcmVmZXJyZWQgYmVjYXVzZSBgLm5vdC5hbnkua2V5c2AgYXNzZXJ0c1xuICAgKiBleGFjdGx5IHdoYXQncyBleHBlY3RlZCBvZiB0aGUgb3V0cHV0LCB3aGVyZWFzIGAubm90LmFsbC5rZXlzYCBjcmVhdGVzXG4gICAqIHVuY2VydGFpbiBleHBlY3RhdGlvbnMuXG4gICAqXG4gICAqICAgICAvLyBSZWNvbW1lbmRlZDsgYXNzZXJ0cyB0aGF0IHRhcmdldCBkb2Vzbid0IGhhdmUgYW55IG9mIHRoZSBnaXZlbiBrZXlzXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDJ9KS50by5ub3QuaGF2ZS5hbnkua2V5cygnYycsICdkJyk7XG4gICAqXG4gICAqICAgICAvLyBOb3QgcmVjb21tZW5kZWQ7IGFzc2VydHMgdGhhdCB0YXJnZXQgZG9lc24ndCBoYXZlIGFsbCBvZiB0aGUgZ2l2ZW5cbiAgICogICAgIC8vIGtleXMgYnV0IG1heSBvciBtYXkgbm90IGhhdmUgc29tZSBvZiB0aGVtXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDJ9KS50by5ub3QuaGF2ZS5hbGwua2V5cygnYycsICdkJyk7XG4gICAqXG4gICAqIFdoZW4gYXNzZXJ0aW5nIGAua2V5c2Agd2l0aG91dCBuZWdhdGlvbiwgYC5hbGxgIGlzIHByZWZlcnJlZCBiZWNhdXNlXG4gICAqIGAuYWxsLmtleXNgIGFzc2VydHMgZXhhY3RseSB3aGF0J3MgZXhwZWN0ZWQgb2YgdGhlIG91dHB1dCwgd2hlcmVhc1xuICAgKiBgLmFueS5rZXlzYCBjcmVhdGVzIHVuY2VydGFpbiBleHBlY3RhdGlvbnMuXG4gICAqXG4gICAqICAgICAvLyBSZWNvbW1lbmRlZDsgYXNzZXJ0cyB0aGF0IHRhcmdldCBoYXMgYWxsIHRoZSBnaXZlbiBrZXlzXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDJ9KS50by5oYXZlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICpcbiAgICogICAgIC8vIE5vdCByZWNvbW1lbmRlZDsgYXNzZXJ0cyB0aGF0IHRhcmdldCBoYXMgYXQgbGVhc3Qgb25lIG9mIHRoZSBnaXZlblxuICAgKiAgICAgLy8ga2V5cyBidXQgbWF5IG9yIG1heSBub3QgaGF2ZSBtb3JlIG9mIHRoZW1cbiAgICogICAgIGV4cGVjdCh7YTogMSwgYjogMn0pLnRvLmhhdmUuYW55LmtleXMoJ2EnLCAnYicpO1xuICAgKlxuICAgKiBOb3RlIHRoYXQgYC5hbGxgIGlzIHVzZWQgYnkgZGVmYXVsdCB3aGVuIG5laXRoZXIgYC5hbGxgIG5vciBgLmFueWAgYXBwZWFyXG4gICAqIGVhcmxpZXIgaW4gdGhlIGNoYWluLiBIb3dldmVyLCBpdCdzIG9mdGVuIGJlc3QgdG8gYWRkIGAuYWxsYCBhbnl3YXkgYmVjYXVzZVxuICAgKiBpdCBpbXByb3ZlcyByZWFkYWJpbGl0eS5cbiAgICpcbiAgICogICAgIC8vIEJvdGggYXNzZXJ0aW9ucyBhcmUgaWRlbnRpY2FsXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDJ9KS50by5oYXZlLmFsbC5rZXlzKCdhJywgJ2InKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCh7YTogMSwgYjogMn0pLnRvLmhhdmUua2V5cygnYScsICdiJyk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBZGQgYC5pbmNsdWRlYCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byByZXF1aXJlIHRoYXQgdGhlIHRhcmdldCdzIGtleXMgYmUgYVxuICAgKiBzdXBlcnNldCBvZiB0aGUgZXhwZWN0ZWQga2V5cywgcmF0aGVyIHRoYW4gaWRlbnRpY2FsIHNldHMuXG4gICAqXG4gICAqICAgICAvLyBUYXJnZXQgb2JqZWN0J3Mga2V5cyBhcmUgYSBzdXBlcnNldCBvZiBbJ2EnLCAnYiddIGJ1dCBub3QgaWRlbnRpY2FsXG4gICAqICAgICBleHBlY3Qoe2E6IDEsIGI6IDIsIGM6IDN9KS50by5pbmNsdWRlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICogICAgIGV4cGVjdCh7YTogMSwgYjogMiwgYzogM30pLnRvLm5vdC5oYXZlLmFsbC5rZXlzKCdhJywgJ2InKTtcbiAgICpcbiAgICogSG93ZXZlciwgaWYgYC5hbnlgIGFuZCBgLmluY2x1ZGVgIGFyZSBjb21iaW5lZCwgb25seSB0aGUgYC5hbnlgIHRha2VzXG4gICAqIGVmZmVjdC4gVGhlIGAuaW5jbHVkZWAgaXMgaWdub3JlZCBpbiB0aGlzIGNhc2UuXG4gICAqXG4gICAqICAgICAvLyBCb3RoIGFzc2VydGlvbnMgYXJlIGlkZW50aWNhbFxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8uaGF2ZS5hbnkua2V5cygnYScsICdiJyk7XG4gICAqICAgICBleHBlY3Qoe2E6IDF9KS50by5pbmNsdWRlLmFueS5rZXlzKCdhJywgJ2InKTtcbiAgICpcbiAgICogQSBjdXN0b20gZXJyb3IgbWVzc2FnZSBjYW4gYmUgZ2l2ZW4gYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0sICdub29vIHdoeSBmYWlsPz8nKS50by5oYXZlLmtleSgnYicpO1xuICAgKlxuICAgKiBUaGUgYWxpYXMgYC5rZXlgIGNhbiBiZSB1c2VkIGludGVyY2hhbmdlYWJseSB3aXRoIGAua2V5c2AuXG4gICAqXG4gICAqIEBuYW1lIGtleXNcbiAgICogQGFsaWFzIGtleVxuICAgKiBAcGFyYW0gey4uLlN0cmluZ3xBcnJheXxPYmplY3R9IGtleXNcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0S2V5cyAoa2V5cykge1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCBvYmpUeXBlID0gXy50eXBlKG9iailcbiAgICAgICwga2V5c1R5cGUgPSBfLnR5cGUoa2V5cylcbiAgICAgICwgc3NmaSA9IGZsYWcodGhpcywgJ3NzZmknKVxuICAgICAgLCBpc0RlZXAgPSBmbGFnKHRoaXMsICdkZWVwJylcbiAgICAgICwgc3RyXG4gICAgICAsIGRlZXBTdHIgPSAnJ1xuICAgICAgLCBhY3R1YWxcbiAgICAgICwgb2sgPSB0cnVlXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJyk7XG5cbiAgICBmbGFnTXNnID0gZmxhZ01zZyA/IGZsYWdNc2cgKyAnOiAnIDogJyc7XG4gICAgdmFyIG1peGVkQXJnc01zZyA9IGZsYWdNc2cgKyAnd2hlbiB0ZXN0aW5nIGtleXMgYWdhaW5zdCBhbiBvYmplY3Qgb3IgYW4gYXJyYXkgeW91IG11c3QgZ2l2ZSBhIHNpbmdsZSBBcnJheXxPYmplY3R8U3RyaW5nIGFyZ3VtZW50IG9yIG11bHRpcGxlIFN0cmluZyBhcmd1bWVudHMnO1xuXG4gICAgaWYgKG9ialR5cGUgPT09ICdNYXAnIHx8IG9ialR5cGUgPT09ICdTZXQnKSB7XG4gICAgICBkZWVwU3RyID0gaXNEZWVwID8gJ2RlZXBseSAnIDogJyc7XG4gICAgICBhY3R1YWwgPSBbXTtcblxuICAgICAgLy8gTWFwIGFuZCBTZXQgJy5rZXlzJyBhcmVuJ3Qgc3VwcG9ydGVkIGluIElFIDExLiBUaGVyZWZvcmUsIHVzZSAuZm9yRWFjaC5cbiAgICAgIG9iai5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkgeyBhY3R1YWwucHVzaChrZXkpIH0pO1xuXG4gICAgICBpZiAoa2V5c1R5cGUgIT09ICdBcnJheScpIHtcbiAgICAgICAga2V5cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdHVhbCA9IF8uZ2V0T3duRW51bWVyYWJsZVByb3BlcnRpZXMob2JqKTtcblxuICAgICAgc3dpdGNoIChrZXlzVHlwZSkge1xuICAgICAgICBjYXNlICdBcnJheSc6XG4gICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IobWl4ZWRBcmdzTXNnLCB1bmRlZmluZWQsIHNzZmkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnT2JqZWN0JzpcbiAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihtaXhlZEFyZ3NNc2csIHVuZGVmaW5lZCwgc3NmaSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhrZXlzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBrZXlzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgLy8gT25seSBzdHJpbmdpZnkgbm9uLVN5bWJvbHMgYmVjYXVzZSBTeW1ib2xzIHdvdWxkIGJlY29tZSBcIlN5bWJvbCgpXCJcbiAgICAgIGtleXMgPSBrZXlzLm1hcChmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3ltYm9sJyA/IHZhbCA6IFN0cmluZyh2YWwpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFrZXlzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKGZsYWdNc2cgKyAna2V5cyByZXF1aXJlZCcsIHVuZGVmaW5lZCwgc3NmaSk7XG4gICAgfVxuXG4gICAgdmFyIGxlbiA9IGtleXMubGVuZ3RoXG4gICAgICAsIGFueSA9IGZsYWcodGhpcywgJ2FueScpXG4gICAgICAsIGFsbCA9IGZsYWcodGhpcywgJ2FsbCcpXG4gICAgICAsIGV4cGVjdGVkID0ga2V5cztcblxuICAgIGlmICghYW55ICYmICFhbGwpIHtcbiAgICAgIGFsbCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gSGFzIGFueVxuICAgIGlmIChhbnkpIHtcbiAgICAgIG9rID0gZXhwZWN0ZWQuc29tZShmdW5jdGlvbihleHBlY3RlZEtleSkge1xuICAgICAgICByZXR1cm4gYWN0dWFsLnNvbWUoZnVuY3Rpb24oYWN0dWFsS2V5KSB7XG4gICAgICAgICAgaWYgKGlzRGVlcCkge1xuICAgICAgICAgICAgcmV0dXJuIF8uZXFsKGV4cGVjdGVkS2V5LCBhY3R1YWxLZXkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwZWN0ZWRLZXkgPT09IGFjdHVhbEtleTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gSGFzIGFsbFxuICAgIGlmIChhbGwpIHtcbiAgICAgIG9rID0gZXhwZWN0ZWQuZXZlcnkoZnVuY3Rpb24oZXhwZWN0ZWRLZXkpIHtcbiAgICAgICAgcmV0dXJuIGFjdHVhbC5zb21lKGZ1bmN0aW9uKGFjdHVhbEtleSkge1xuICAgICAgICAgIGlmIChpc0RlZXApIHtcbiAgICAgICAgICAgIHJldHVybiBfLmVxbChleHBlY3RlZEtleSwgYWN0dWFsS2V5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGV4cGVjdGVkS2V5ID09PSBhY3R1YWxLZXk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWZsYWcodGhpcywgJ2NvbnRhaW5zJykpIHtcbiAgICAgICAgb2sgPSBvayAmJiBrZXlzLmxlbmd0aCA9PSBhY3R1YWwubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEtleSBzdHJpbmdcbiAgICBpZiAobGVuID4gMSkge1xuICAgICAga2V5cyA9IGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICByZXR1cm4gXy5pbnNwZWN0KGtleSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBsYXN0ID0ga2V5cy5wb3AoKTtcbiAgICAgIGlmIChhbGwpIHtcbiAgICAgICAgc3RyID0ga2V5cy5qb2luKCcsICcpICsgJywgYW5kICcgKyBsYXN0O1xuICAgICAgfVxuICAgICAgaWYgKGFueSkge1xuICAgICAgICBzdHIgPSBrZXlzLmpvaW4oJywgJykgKyAnLCBvciAnICsgbGFzdDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gXy5pbnNwZWN0KGtleXNbMF0pO1xuICAgIH1cblxuICAgIC8vIEZvcm1cbiAgICBzdHIgPSAobGVuID4gMSA/ICdrZXlzICcgOiAna2V5ICcpICsgc3RyO1xuXG4gICAgLy8gSGF2ZSAvIGluY2x1ZGVcbiAgICBzdHIgPSAoZmxhZyh0aGlzLCAnY29udGFpbnMnKSA/ICdjb250YWluICcgOiAnaGF2ZSAnKSArIHN0cjtcblxuICAgIC8vIEFzc2VydGlvblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBva1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byAnICsgZGVlcFN0ciArIHN0clxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgJyArIGRlZXBTdHIgKyBzdHJcbiAgICAgICwgZXhwZWN0ZWQuc2xpY2UoMCkuc29ydChfLmNvbXBhcmVCeUluc3BlY3QpXG4gICAgICAsIGFjdHVhbC5zb3J0KF8uY29tcGFyZUJ5SW5zcGVjdClcbiAgICAgICwgdHJ1ZVxuICAgICk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdrZXlzJywgYXNzZXJ0S2V5cyk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2tleScsIGFzc2VydEtleXMpO1xuXG4gIC8qKlxuICAgKiAjIyMgLnRocm93KFtlcnJvckxpa2VdLCBbZXJyTXNnTWF0Y2hlcl0sIFttc2ddKVxuICAgKlxuICAgKiBXaGVuIG5vIGFyZ3VtZW50cyBhcmUgcHJvdmlkZWQsIGAudGhyb3dgIGludm9rZXMgdGhlIHRhcmdldCBmdW5jdGlvbiBhbmRcbiAgICogYXNzZXJ0cyB0aGF0IGFuIGVycm9yIGlzIHRocm93bi5cbiAgICpcbiAgICogICAgIHZhciBiYWRGbiA9IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignSWxsZWdhbCBzYWxtb24hJyk7IH07XG4gICAqXG4gICAqICAgICBleHBlY3QoYmFkRm4pLnRvLnRocm93KCk7XG4gICAqXG4gICAqIFdoZW4gb25lIGFyZ3VtZW50IGlzIHByb3ZpZGVkLCBhbmQgaXQncyBhbiBlcnJvciBjb25zdHJ1Y3RvciwgYC50aHJvd2BcbiAgICogaW52b2tlcyB0aGUgdGFyZ2V0IGZ1bmN0aW9uIGFuZCBhc3NlcnRzIHRoYXQgYW4gZXJyb3IgaXMgdGhyb3duIHRoYXQncyBhblxuICAgKiBpbnN0YW5jZSBvZiB0aGF0IGVycm9yIGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiAgICAgdmFyIGJhZEZuID0gZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbGxlZ2FsIHNhbG1vbiEnKTsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChiYWRGbikudG8udGhyb3coVHlwZUVycm9yKTtcbiAgICpcbiAgICogV2hlbiBvbmUgYXJndW1lbnQgaXMgcHJvdmlkZWQsIGFuZCBpdCdzIGFuIGVycm9yIGluc3RhbmNlLCBgLnRocm93YCBpbnZva2VzXG4gICAqIHRoZSB0YXJnZXQgZnVuY3Rpb24gYW5kIGFzc2VydHMgdGhhdCBhbiBlcnJvciBpcyB0aHJvd24gdGhhdCdzIHN0cmljdGx5XG4gICAqIChgPT09YCkgZXF1YWwgdG8gdGhhdCBlcnJvciBpbnN0YW5jZS5cbiAgICpcbiAgICogICAgIHZhciBlcnIgPSBuZXcgVHlwZUVycm9yKCdJbGxlZ2FsIHNhbG1vbiEnKTtcbiAgICogICAgIHZhciBiYWRGbiA9IGZ1bmN0aW9uICgpIHsgdGhyb3cgZXJyOyB9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGJhZEZuKS50by50aHJvdyhlcnIpO1xuICAgKlxuICAgKiBXaGVuIG9uZSBhcmd1bWVudCBpcyBwcm92aWRlZCwgYW5kIGl0J3MgYSBzdHJpbmcsIGAudGhyb3dgIGludm9rZXMgdGhlXG4gICAqIHRhcmdldCBmdW5jdGlvbiBhbmQgYXNzZXJ0cyB0aGF0IGFuIGVycm9yIGlzIHRocm93biB3aXRoIGEgbWVzc2FnZSB0aGF0XG4gICAqIGNvbnRhaW5zIHRoYXQgc3RyaW5nLlxuICAgKlxuICAgKiAgICAgdmFyIGJhZEZuID0gZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbGxlZ2FsIHNhbG1vbiEnKTsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChiYWRGbikudG8udGhyb3coJ3NhbG1vbicpO1xuICAgKlxuICAgKiBXaGVuIG9uZSBhcmd1bWVudCBpcyBwcm92aWRlZCwgYW5kIGl0J3MgYSByZWd1bGFyIGV4cHJlc3Npb24sIGAudGhyb3dgXG4gICAqIGludm9rZXMgdGhlIHRhcmdldCBmdW5jdGlvbiBhbmQgYXNzZXJ0cyB0aGF0IGFuIGVycm9yIGlzIHRocm93biB3aXRoIGFcbiAgICogbWVzc2FnZSB0aGF0IG1hdGNoZXMgdGhhdCByZWd1bGFyIGV4cHJlc3Npb24uXG4gICAqXG4gICAqICAgICB2YXIgYmFkRm4gPSBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0lsbGVnYWwgc2FsbW9uIScpOyB9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGJhZEZuKS50by50aHJvdygvc2FsbW9uLyk7XG4gICAqXG4gICAqIFdoZW4gdHdvIGFyZ3VtZW50cyBhcmUgcHJvdmlkZWQsIGFuZCB0aGUgZmlyc3QgaXMgYW4gZXJyb3IgaW5zdGFuY2Ugb3JcbiAgICogY29uc3RydWN0b3IsIGFuZCB0aGUgc2Vjb25kIGlzIGEgc3RyaW5nIG9yIHJlZ3VsYXIgZXhwcmVzc2lvbiwgYC50aHJvd2BcbiAgICogaW52b2tlcyB0aGUgZnVuY3Rpb24gYW5kIGFzc2VydHMgdGhhdCBhbiBlcnJvciBpcyB0aHJvd24gdGhhdCBmdWxmaWxscyBib3RoXG4gICAqIGNvbmRpdGlvbnMgYXMgZGVzY3JpYmVkIGFib3ZlLlxuICAgKlxuICAgKiAgICAgdmFyIGVyciA9IG5ldyBUeXBlRXJyb3IoJ0lsbGVnYWwgc2FsbW9uIScpO1xuICAgKiAgICAgdmFyIGJhZEZuID0gZnVuY3Rpb24gKCkgeyB0aHJvdyBlcnI7IH07XG4gICAqXG4gICAqICAgICBleHBlY3QoYmFkRm4pLnRvLnRocm93KFR5cGVFcnJvciwgJ3NhbG1vbicpO1xuICAgKiAgICAgZXhwZWN0KGJhZEZuKS50by50aHJvdyhUeXBlRXJyb3IsIC9zYWxtb24vKTtcbiAgICogICAgIGV4cGVjdChiYWRGbikudG8udGhyb3coZXJyLCAnc2FsbW9uJyk7XG4gICAqICAgICBleHBlY3QoYmFkRm4pLnRvLnRocm93KGVyciwgL3NhbG1vbi8pO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLnRocm93YC5cbiAgICpcbiAgICogICAgIHZhciBnb29kRm4gPSBmdW5jdGlvbiAoKSB7fTtcbiAgICpcbiAgICogICAgIGV4cGVjdChnb29kRm4pLnRvLm5vdC50aHJvdygpO1xuICAgKlxuICAgKiBIb3dldmVyLCBpdCdzIGRhbmdlcm91cyB0byBuZWdhdGUgYC50aHJvd2Agd2hlbiBwcm92aWRpbmcgYW55IGFyZ3VtZW50cy5cbiAgICogVGhlIHByb2JsZW0gaXMgdGhhdCBpdCBjcmVhdGVzIHVuY2VydGFpbiBleHBlY3RhdGlvbnMgYnkgYXNzZXJ0aW5nIHRoYXQgdGhlXG4gICAqIHRhcmdldCBlaXRoZXIgZG9lc24ndCB0aHJvdyBhbiBlcnJvciwgb3IgdGhhdCBpdCB0aHJvd3MgYW4gZXJyb3IgYnV0IG9mIGFcbiAgICogZGlmZmVyZW50IHR5cGUgdGhhbiB0aGUgZ2l2ZW4gdHlwZSwgb3IgdGhhdCBpdCB0aHJvd3MgYW4gZXJyb3Igb2YgdGhlIGdpdmVuXG4gICAqIHR5cGUgYnV0IHdpdGggYSBtZXNzYWdlIHRoYXQgZG9lc24ndCBpbmNsdWRlIHRoZSBnaXZlbiBzdHJpbmcuIEl0J3Mgb2Z0ZW5cbiAgICogYmVzdCB0byBpZGVudGlmeSB0aGUgZXhhY3Qgb3V0cHV0IHRoYXQncyBleHBlY3RlZCwgYW5kIHRoZW4gd3JpdGUgYW5cbiAgICogYXNzZXJ0aW9uIHRoYXQgb25seSBhY2NlcHRzIHRoYXQgZXhhY3Qgb3V0cHV0LlxuICAgKlxuICAgKiBXaGVuIHRoZSB0YXJnZXQgaXNuJ3QgZXhwZWN0ZWQgdG8gdGhyb3cgYW4gZXJyb3IsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnRcbiAgICogZXhhY3RseSB0aGF0LlxuICAgKlxuICAgKiAgICAgdmFyIGdvb2RGbiA9IGZ1bmN0aW9uICgpIHt9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGdvb2RGbikudG8ubm90LnRocm93KCk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoZ29vZEZuKS50by5ub3QudGhyb3coUmVmZXJlbmNlRXJyb3IsICd4Jyk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBXaGVuIHRoZSB0YXJnZXQgaXMgZXhwZWN0ZWQgdG8gdGhyb3cgYW4gZXJyb3IsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnRcbiAgICogdGhhdCB0aGUgZXJyb3IgaXMgb2YgaXRzIGV4cGVjdGVkIHR5cGUsIGFuZCBoYXMgYSBtZXNzYWdlIHRoYXQgaW5jbHVkZXMgYW5cbiAgICogZXhwZWN0ZWQgc3RyaW5nLCByYXRoZXIgdGhhbiBhc3NlcnRpbmcgdGhhdCBpdCBkb2Vzbid0IGhhdmUgb25lIG9mIG1hbnlcbiAgICogdW5leHBlY3RlZCB0eXBlcywgYW5kIGRvZXNuJ3QgaGF2ZSBhIG1lc3NhZ2UgdGhhdCBpbmNsdWRlcyBzb21lIHN0cmluZy5cbiAgICpcbiAgICogICAgIHZhciBiYWRGbiA9IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignSWxsZWdhbCBzYWxtb24hJyk7IH07XG4gICAqXG4gICAqICAgICBleHBlY3QoYmFkRm4pLnRvLnRocm93KFR5cGVFcnJvciwgJ3NhbG1vbicpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KGJhZEZuKS50by5ub3QudGhyb3coUmVmZXJlbmNlRXJyb3IsICd4Jyk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBgLnRocm93YCBjaGFuZ2VzIHRoZSB0YXJnZXQgb2YgYW55IGFzc2VydGlvbnMgdGhhdCBmb2xsb3cgaW4gdGhlIGNoYWluIHRvXG4gICAqIGJlIHRoZSBlcnJvciBvYmplY3QgdGhhdCdzIHRocm93bi5cbiAgICpcbiAgICogICAgIHZhciBlcnIgPSBuZXcgVHlwZUVycm9yKCdJbGxlZ2FsIHNhbG1vbiEnKTtcbiAgICogICAgIGVyci5jb2RlID0gNDI7XG4gICAqICAgICB2YXIgYmFkRm4gPSBmdW5jdGlvbiAoKSB7IHRocm93IGVycjsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChiYWRGbikudG8udGhyb3coVHlwZUVycm9yKS53aXRoLnByb3BlcnR5KCdjb2RlJywgNDIpO1xuICAgKlxuICAgKiBgLnRocm93YCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yIG1lc3NhZ2VcbiAgICogdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzIHRoZVxuICAgKiBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuIFdoZW4gbm90IHByb3ZpZGluZyB0d28gYXJndW1lbnRzLCBhbHdheXMgdXNlXG4gICAqIHRoZSBzZWNvbmQgZm9ybS5cbiAgICpcbiAgICogICAgIHZhciBnb29kRm4gPSBmdW5jdGlvbiAoKSB7fTtcbiAgICpcbiAgICogICAgIGV4cGVjdChnb29kRm4pLnRvLnRocm93KFR5cGVFcnJvciwgJ3gnLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoZ29vZEZuLCAnbm9vbyB3aHkgZmFpbD8/JykudG8udGhyb3coKTtcbiAgICpcbiAgICogRHVlIHRvIGxpbWl0YXRpb25zIGluIEVTNSwgYC50aHJvd2AgbWF5IG5vdCBhbHdheXMgd29yayBhcyBleHBlY3RlZCB3aGVuXG4gICAqIHVzaW5nIGEgdHJhbnNwaWxlciBzdWNoIGFzIEJhYmVsIG9yIFR5cGVTY3JpcHQuIEluIHBhcnRpY3VsYXIsIGl0IG1heVxuICAgKiBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0cyB3aGVuIHN1YmNsYXNzaW5nIHRoZSBidWlsdC1pbiBgRXJyb3JgIG9iamVjdCBhbmRcbiAgICogdGhlbiBwYXNzaW5nIHRoZSBzdWJjbGFzc2VkIGNvbnN0cnVjdG9yIHRvIGAudGhyb3dgLiBTZWUgeW91ciB0cmFuc3BpbGVyJ3NcbiAgICogZG9jcyBmb3IgZGV0YWlsczpcbiAgICpcbiAgICogLSAoW0JhYmVsXShodHRwczovL2JhYmVsanMuaW8vZG9jcy91c2FnZS9jYXZlYXRzLyNjbGFzc2VzKSlcbiAgICogLSAoW1R5cGVTY3JpcHRdKGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC93aWtpL0JyZWFraW5nLUNoYW5nZXMjZXh0ZW5kaW5nLWJ1aWx0LWlucy1saWtlLWVycm9yLWFycmF5LWFuZC1tYXAtbWF5LW5vLWxvbmdlci13b3JrKSlcbiAgICpcbiAgICogQmV3YXJlIG9mIHNvbWUgY29tbW9uIG1pc3Rha2VzIHdoZW4gdXNpbmcgdGhlIGB0aHJvd2AgYXNzZXJ0aW9uLiBPbmUgY29tbW9uXG4gICAqIG1pc3Rha2UgaXMgdG8gYWNjaWRlbnRhbGx5IGludm9rZSB0aGUgZnVuY3Rpb24geW91cnNlbGYgaW5zdGVhZCBvZiBsZXR0aW5nXG4gICAqIHRoZSBgdGhyb3dgIGFzc2VydGlvbiBpbnZva2UgdGhlIGZ1bmN0aW9uIGZvciB5b3UuIEZvciBleGFtcGxlLCB3aGVuXG4gICAqIHRlc3RpbmcgaWYgYSBmdW5jdGlvbiBuYW1lZCBgZm5gIHRocm93cywgcHJvdmlkZSBgZm5gIGluc3RlYWQgb2YgYGZuKClgIGFzXG4gICAqIHRoZSB0YXJnZXQgZm9yIHRoZSBhc3NlcnRpb24uXG4gICAqXG4gICAqICAgICBleHBlY3QoZm4pLnRvLnRocm93KCk7ICAgICAvLyBHb29kISBUZXN0cyBgZm5gIGFzIGRlc2lyZWRcbiAgICogICAgIGV4cGVjdChmbigpKS50by50aHJvdygpOyAgIC8vIEJhZCEgVGVzdHMgcmVzdWx0IG9mIGBmbigpYCwgbm90IGBmbmBcbiAgICpcbiAgICogSWYgeW91IG5lZWQgdG8gYXNzZXJ0IHRoYXQgeW91ciBmdW5jdGlvbiBgZm5gIHRocm93cyB3aGVuIHBhc3NlZCBjZXJ0YWluXG4gICAqIGFyZ3VtZW50cywgdGhlbiB3cmFwIGEgY2FsbCB0byBgZm5gIGluc2lkZSBvZiBhbm90aGVyIGZ1bmN0aW9uLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KGZ1bmN0aW9uICgpIHsgZm4oNDIpOyB9KS50by50aHJvdygpOyAgLy8gRnVuY3Rpb24gZXhwcmVzc2lvblxuICAgKiAgICAgZXhwZWN0KCgpID0+IGZuKDQyKSkudG8udGhyb3coKTsgICAgICAgICAgICAgLy8gRVM2IGFycm93IGZ1bmN0aW9uXG4gICAqXG4gICAqIEFub3RoZXIgY29tbW9uIG1pc3Rha2UgaXMgdG8gcHJvdmlkZSBhbiBvYmplY3QgbWV0aG9kIChvciBhbnkgc3RhbmQtYWxvbmVcbiAgICogZnVuY3Rpb24gdGhhdCByZWxpZXMgb24gYHRoaXNgKSBhcyB0aGUgdGFyZ2V0IG9mIHRoZSBhc3NlcnRpb24uIERvaW5nIHNvIGlzXG4gICAqIHByb2JsZW1hdGljIGJlY2F1c2UgdGhlIGB0aGlzYCBjb250ZXh0IHdpbGwgYmUgbG9zdCB3aGVuIHRoZSBmdW5jdGlvbiBpc1xuICAgKiBpbnZva2VkIGJ5IGAudGhyb3dgOyB0aGVyZSdzIG5vIHdheSBmb3IgaXQgdG8ga25vdyB3aGF0IGB0aGlzYCBpcyBzdXBwb3NlZFxuICAgKiB0byBiZS4gVGhlcmUgYXJlIHR3byB3YXlzIGFyb3VuZCB0aGlzIHByb2JsZW0uIE9uZSBzb2x1dGlvbiBpcyB0byB3cmFwIHRoZVxuICAgKiBtZXRob2Qgb3IgZnVuY3Rpb24gY2FsbCBpbnNpZGUgb2YgYW5vdGhlciBmdW5jdGlvbi4gQW5vdGhlciBzb2x1dGlvbiBpcyB0b1xuICAgKiB1c2UgYGJpbmRgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KGZ1bmN0aW9uICgpIHsgY2F0Lm1lb3coKTsgfSkudG8udGhyb3coKTsgIC8vIEZ1bmN0aW9uIGV4cHJlc3Npb25cbiAgICogICAgIGV4cGVjdCgoKSA9PiBjYXQubWVvdygpKS50by50aHJvdygpOyAgICAgICAgICAgICAvLyBFUzYgYXJyb3cgZnVuY3Rpb25cbiAgICogICAgIGV4cGVjdChjYXQubWVvdy5iaW5kKGNhdCkpLnRvLnRocm93KCk7ICAgICAgICAgICAvLyBCaW5kXG4gICAqXG4gICAqIEZpbmFsbHksIGl0J3Mgd29ydGggbWVudGlvbmluZyB0aGF0IGl0J3MgYSBiZXN0IHByYWN0aWNlIGluIEphdmFTY3JpcHQgdG9cbiAgICogb25seSB0aHJvdyBgRXJyb3JgIGFuZCBkZXJpdmF0aXZlcyBvZiBgRXJyb3JgIHN1Y2ggYXMgYFJlZmVyZW5jZUVycm9yYCxcbiAgICogYFR5cGVFcnJvcmAsIGFuZCB1c2VyLWRlZmluZWQgb2JqZWN0cyB0aGF0IGV4dGVuZCBgRXJyb3JgLiBObyBvdGhlciB0eXBlIG9mXG4gICAqIHZhbHVlIHdpbGwgZ2VuZXJhdGUgYSBzdGFjayB0cmFjZSB3aGVuIGluaXRpYWxpemVkLiBXaXRoIHRoYXQgc2FpZCwgdGhlXG4gICAqIGB0aHJvd2AgYXNzZXJ0aW9uIGRvZXMgdGVjaG5pY2FsbHkgc3VwcG9ydCBhbnkgdHlwZSBvZiB2YWx1ZSBiZWluZyB0aHJvd24sXG4gICAqIG5vdCBqdXN0IGBFcnJvcmAgYW5kIGl0cyBkZXJpdmF0aXZlcy5cbiAgICpcbiAgICogVGhlIGFsaWFzZXMgYC50aHJvd3NgIGFuZCBgLlRocm93YCBjYW4gYmUgdXNlZCBpbnRlcmNoYW5nZWFibHkgd2l0aFxuICAgKiBgLnRocm93YC5cbiAgICpcbiAgICogQG5hbWUgdGhyb3dcbiAgICogQGFsaWFzIHRocm93c1xuICAgKiBAYWxpYXMgVGhyb3dcbiAgICogQHBhcmFtIHtFcnJvcnxFcnJvckNvbnN0cnVjdG9yfSBlcnJvckxpa2VcbiAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBlcnJNc2dNYXRjaGVyIGVycm9yIG1lc3NhZ2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRXJyb3IjRXJyb3JfdHlwZXNcbiAgICogQHJldHVybnMgZXJyb3IgZm9yIGNoYWluaW5nIChudWxsIGlmIG5vIGVycm9yKVxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnRUaHJvd3MgKGVycm9yTGlrZSwgZXJyTXNnTWF0Y2hlciwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIHNzZmkgPSBmbGFnKHRoaXMsICdzc2ZpJylcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBuZWdhdGUgPSBmbGFnKHRoaXMsICduZWdhdGUnKSB8fCBmYWxzZTtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYSgnZnVuY3Rpb24nKTtcblxuICAgIGlmIChlcnJvckxpa2UgaW5zdGFuY2VvZiBSZWdFeHAgfHwgdHlwZW9mIGVycm9yTGlrZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVyck1zZ01hdGNoZXIgPSBlcnJvckxpa2U7XG4gICAgICBlcnJvckxpa2UgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBjYXVnaHRFcnI7XG4gICAgdHJ5IHtcbiAgICAgIG9iaigpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY2F1Z2h0RXJyID0gZXJyO1xuICAgIH1cblxuICAgIC8vIElmIHdlIGhhdmUgdGhlIG5lZ2F0ZSBmbGFnIGVuYWJsZWQgYW5kIGF0IGxlYXN0IG9uZSB2YWxpZCBhcmd1bWVudCBpdCBtZWFucyB3ZSBkbyBleHBlY3QgYW4gZXJyb3JcbiAgICAvLyBidXQgd2Ugd2FudCBpdCB0byBtYXRjaCBhIGdpdmVuIHNldCBvZiBjcml0ZXJpYVxuICAgIHZhciBldmVyeUFyZ0lzVW5kZWZpbmVkID0gZXJyb3JMaWtlID09PSB1bmRlZmluZWQgJiYgZXJyTXNnTWF0Y2hlciA9PT0gdW5kZWZpbmVkO1xuXG4gICAgLy8gSWYgd2UndmUgZ290IHRoZSBuZWdhdGUgZmxhZyBlbmFibGVkIGFuZCBib3RoIGFyZ3MsIHdlIHNob3VsZCBvbmx5IGZhaWwgaWYgYm90aCBhcmVuJ3QgY29tcGF0aWJsZVxuICAgIC8vIFNlZSBJc3N1ZSAjNTUxIGFuZCBQUiAjNjgzQEdpdEh1YlxuICAgIHZhciBldmVyeUFyZ0lzRGVmaW5lZCA9IEJvb2xlYW4oZXJyb3JMaWtlICYmIGVyck1zZ01hdGNoZXIpO1xuICAgIHZhciBlcnJvckxpa2VGYWlsID0gZmFsc2U7XG4gICAgdmFyIGVyck1zZ01hdGNoZXJGYWlsID0gZmFsc2U7XG5cbiAgICAvLyBDaGVja2luZyBpZiBlcnJvciB3YXMgdGhyb3duXG4gICAgaWYgKGV2ZXJ5QXJnSXNVbmRlZmluZWQgfHwgIWV2ZXJ5QXJnSXNVbmRlZmluZWQgJiYgIW5lZ2F0ZSkge1xuICAgICAgLy8gV2UgbmVlZCB0aGlzIHRvIGRpc3BsYXkgcmVzdWx0cyBjb3JyZWN0bHkgYWNjb3JkaW5nIHRvIHRoZWlyIHR5cGVzXG4gICAgICB2YXIgZXJyb3JMaWtlU3RyaW5nID0gJ2FuIGVycm9yJztcbiAgICAgIGlmIChlcnJvckxpa2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBlcnJvckxpa2VTdHJpbmcgPSAnI3tleHB9JztcbiAgICAgIH0gZWxzZSBpZiAoZXJyb3JMaWtlKSB7XG4gICAgICAgIGVycm9yTGlrZVN0cmluZyA9IF8uY2hlY2tFcnJvci5nZXRDb25zdHJ1Y3Rvck5hbWUoZXJyb3JMaWtlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgY2F1Z2h0RXJyXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgJyArIGVycm9yTGlrZVN0cmluZ1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCB0aHJvdyBhbiBlcnJvciBidXQgI3thY3R9IHdhcyB0aHJvd24nXG4gICAgICAgICwgZXJyb3JMaWtlICYmIGVycm9yTGlrZS50b1N0cmluZygpXG4gICAgICAgICwgKGNhdWdodEVyciBpbnN0YW5jZW9mIEVycm9yID9cbiAgICAgICAgICAgIGNhdWdodEVyci50b1N0cmluZygpIDogKHR5cGVvZiBjYXVnaHRFcnIgPT09ICdzdHJpbmcnID8gY2F1Z2h0RXJyIDogY2F1Z2h0RXJyICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmNoZWNrRXJyb3IuZ2V0Q29uc3RydWN0b3JOYW1lKGNhdWdodEVycikpKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZXJyb3JMaWtlICYmIGNhdWdodEVycikge1xuICAgICAgLy8gV2Ugc2hvdWxkIGNvbXBhcmUgaW5zdGFuY2VzIG9ubHkgaWYgYGVycm9yTGlrZWAgaXMgYW4gaW5zdGFuY2Ugb2YgYEVycm9yYFxuICAgICAgaWYgKGVycm9yTGlrZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHZhciBpc0NvbXBhdGlibGVJbnN0YW5jZSA9IF8uY2hlY2tFcnJvci5jb21wYXRpYmxlSW5zdGFuY2UoY2F1Z2h0RXJyLCBlcnJvckxpa2UpO1xuXG4gICAgICAgIGlmIChpc0NvbXBhdGlibGVJbnN0YW5jZSA9PT0gbmVnYXRlKSB7XG4gICAgICAgICAgLy8gVGhlc2UgY2hlY2tzIHdlcmUgY3JlYXRlZCB0byBlbnN1cmUgd2Ugd29uJ3QgZmFpbCB0b28gc29vbiB3aGVuIHdlJ3ZlIGdvdCBib3RoIGFyZ3MgYW5kIGEgbmVnYXRlXG4gICAgICAgICAgLy8gU2VlIElzc3VlICM1NTEgYW5kIFBSICM2ODNAR2l0SHViXG4gICAgICAgICAgaWYgKGV2ZXJ5QXJnSXNEZWZpbmVkICYmIG5lZ2F0ZSkge1xuICAgICAgICAgICAgZXJyb3JMaWtlRmFpbCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgICAgICAgIG5lZ2F0ZVxuICAgICAgICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIHRocm93ICN7ZXhwfSBidXQgI3thY3R9IHdhcyB0aHJvd24nXG4gICAgICAgICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IHRocm93ICN7ZXhwfScgKyAoY2F1Z2h0RXJyICYmICFuZWdhdGUgPyAnIGJ1dCAje2FjdH0gd2FzIHRocm93bicgOiAnJylcbiAgICAgICAgICAgICAgLCBlcnJvckxpa2UudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAsIGNhdWdodEVyci50b1N0cmluZygpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgaXNDb21wYXRpYmxlQ29uc3RydWN0b3IgPSBfLmNoZWNrRXJyb3IuY29tcGF0aWJsZUNvbnN0cnVjdG9yKGNhdWdodEVyciwgZXJyb3JMaWtlKTtcbiAgICAgIGlmIChpc0NvbXBhdGlibGVDb25zdHJ1Y3RvciA9PT0gbmVnYXRlKSB7XG4gICAgICAgIGlmIChldmVyeUFyZ0lzRGVmaW5lZCAmJiBuZWdhdGUpIHtcbiAgICAgICAgICAgIGVycm9yTGlrZUZhaWwgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgICAgICBuZWdhdGVcbiAgICAgICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgI3tleHB9IGJ1dCAje2FjdH0gd2FzIHRocm93bidcbiAgICAgICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IHRocm93ICN7ZXhwfScgKyAoY2F1Z2h0RXJyID8gJyBidXQgI3thY3R9IHdhcyB0aHJvd24nIDogJycpXG4gICAgICAgICAgICAsIChlcnJvckxpa2UgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yTGlrZS50b1N0cmluZygpIDogZXJyb3JMaWtlICYmIF8uY2hlY2tFcnJvci5nZXRDb25zdHJ1Y3Rvck5hbWUoZXJyb3JMaWtlKSlcbiAgICAgICAgICAgICwgKGNhdWdodEVyciBpbnN0YW5jZW9mIEVycm9yID8gY2F1Z2h0RXJyLnRvU3RyaW5nKCkgOiBjYXVnaHRFcnIgJiYgXy5jaGVja0Vycm9yLmdldENvbnN0cnVjdG9yTmFtZShjYXVnaHRFcnIpKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2F1Z2h0RXJyICYmIGVyck1zZ01hdGNoZXIgIT09IHVuZGVmaW5lZCAmJiBlcnJNc2dNYXRjaGVyICE9PSBudWxsKSB7XG4gICAgICAvLyBIZXJlIHdlIGNoZWNrIGNvbXBhdGlibGUgbWVzc2FnZXNcbiAgICAgIHZhciBwbGFjZWhvbGRlciA9ICdpbmNsdWRpbmcnO1xuICAgICAgaWYgKGVyck1zZ01hdGNoZXIgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcGxhY2Vob2xkZXIgPSAnbWF0Y2hpbmcnXG4gICAgICB9XG5cbiAgICAgIHZhciBpc0NvbXBhdGlibGVNZXNzYWdlID0gXy5jaGVja0Vycm9yLmNvbXBhdGlibGVNZXNzYWdlKGNhdWdodEVyciwgZXJyTXNnTWF0Y2hlcik7XG4gICAgICBpZiAoaXNDb21wYXRpYmxlTWVzc2FnZSA9PT0gbmVnYXRlKSB7XG4gICAgICAgIGlmIChldmVyeUFyZ0lzRGVmaW5lZCAmJiBuZWdhdGUpIHtcbiAgICAgICAgICAgIGVyck1zZ01hdGNoZXJGYWlsID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICAgIG5lZ2F0ZVxuICAgICAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byB0aHJvdyBlcnJvciAnICsgcGxhY2Vob2xkZXIgKyAnICN7ZXhwfSBidXQgZ290ICN7YWN0fSdcbiAgICAgICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgZXJyb3Igbm90ICcgKyBwbGFjZWhvbGRlciArICcgI3tleHB9J1xuICAgICAgICAgICAgLCAgZXJyTXNnTWF0Y2hlclxuICAgICAgICAgICAgLCAgXy5jaGVja0Vycm9yLmdldE1lc3NhZ2UoY2F1Z2h0RXJyKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiBib3RoIGFzc2VydGlvbnMgZmFpbGVkIGFuZCBib3RoIHNob3VsZCd2ZSBtYXRjaGVkIHdlIHRocm93IGFuIGVycm9yXG4gICAgaWYgKGVycm9yTGlrZUZhaWwgJiYgZXJyTXNnTWF0Y2hlckZhaWwpIHtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBuZWdhdGVcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byB0aHJvdyAje2V4cH0gYnV0ICN7YWN0fSB3YXMgdGhyb3duJ1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCB0aHJvdyAje2V4cH0nICsgKGNhdWdodEVyciA/ICcgYnV0ICN7YWN0fSB3YXMgdGhyb3duJyA6ICcnKVxuICAgICAgICAsIChlcnJvckxpa2UgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yTGlrZS50b1N0cmluZygpIDogZXJyb3JMaWtlICYmIF8uY2hlY2tFcnJvci5nZXRDb25zdHJ1Y3Rvck5hbWUoZXJyb3JMaWtlKSlcbiAgICAgICAgLCAoY2F1Z2h0RXJyIGluc3RhbmNlb2YgRXJyb3IgPyBjYXVnaHRFcnIudG9TdHJpbmcoKSA6IGNhdWdodEVyciAmJiBfLmNoZWNrRXJyb3IuZ2V0Q29uc3RydWN0b3JOYW1lKGNhdWdodEVycikpXG4gICAgICApO1xuICAgIH1cblxuICAgIGZsYWcodGhpcywgJ29iamVjdCcsIGNhdWdodEVycik7XG4gIH07XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgndGhyb3cnLCBhc3NlcnRUaHJvd3MpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCd0aHJvd3MnLCBhc3NlcnRUaHJvd3MpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdUaHJvdycsIGFzc2VydFRocm93cyk7XG5cbiAgLyoqXG4gICAqICMjIyAucmVzcG9uZFRvKG1ldGhvZFssIG1zZ10pXG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBpcyBhIG5vbi1mdW5jdGlvbiBvYmplY3QsIGAucmVzcG9uZFRvYCBhc3NlcnRzIHRoYXQgdGhlXG4gICAqIHRhcmdldCBoYXMgYSBtZXRob2Qgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBgbWV0aG9kYC4gVGhlIG1ldGhvZCBjYW4gYmUgb3duIG9yXG4gICAqIGluaGVyaXRlZCwgYW5kIGl0IGNhbiBiZSBlbnVtZXJhYmxlIG9yIG5vbi1lbnVtZXJhYmxlLlxuICAgKlxuICAgKiAgICAgZnVuY3Rpb24gQ2F0ICgpIHt9XG4gICAqICAgICBDYXQucHJvdG90eXBlLm1lb3cgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICpcbiAgICogICAgIGV4cGVjdChuZXcgQ2F0KCkpLnRvLnJlc3BvbmRUbygnbWVvdycpO1xuICAgKlxuICAgKiBXaGVuIHRoZSB0YXJnZXQgaXMgYSBmdW5jdGlvbiwgYC5yZXNwb25kVG9gIGFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0J3NcbiAgICogYHByb3RvdHlwZWAgcHJvcGVydHkgaGFzIGEgbWV0aG9kIHdpdGggdGhlIGdpdmVuIG5hbWUgYG1ldGhvZGAuIEFnYWluLCB0aGVcbiAgICogbWV0aG9kIGNhbiBiZSBvd24gb3IgaW5oZXJpdGVkLCBhbmQgaXQgY2FuIGJlIGVudW1lcmFibGUgb3Igbm9uLWVudW1lcmFibGUuXG4gICAqXG4gICAqICAgICBmdW5jdGlvbiBDYXQgKCkge31cbiAgICogICAgIENhdC5wcm90b3R5cGUubWVvdyA9IGZ1bmN0aW9uICgpIHt9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KENhdCkudG8ucmVzcG9uZFRvKCdtZW93Jyk7XG4gICAqXG4gICAqIEFkZCBgLml0c2VsZmAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gZm9yY2UgYC5yZXNwb25kVG9gIHRvIHRyZWF0IHRoZVxuICAgKiB0YXJnZXQgYXMgYSBub24tZnVuY3Rpb24gb2JqZWN0LCBldmVuIGlmIGl0J3MgYSBmdW5jdGlvbi4gVGh1cywgaXQgYXNzZXJ0c1xuICAgKiB0aGF0IHRoZSB0YXJnZXQgaGFzIGEgbWV0aG9kIHdpdGggdGhlIGdpdmVuIG5hbWUgYG1ldGhvZGAsIHJhdGhlciB0aGFuXG4gICAqIGFzc2VydGluZyB0aGF0IHRoZSB0YXJnZXQncyBgcHJvdG90eXBlYCBwcm9wZXJ0eSBoYXMgYSBtZXRob2Qgd2l0aCB0aGVcbiAgICogZ2l2ZW4gbmFtZSBgbWV0aG9kYC5cbiAgICpcbiAgICogICAgIGZ1bmN0aW9uIENhdCAoKSB7fVxuICAgKiAgICAgQ2F0LnByb3RvdHlwZS5tZW93ID0gZnVuY3Rpb24gKCkge307XG4gICAqICAgICBDYXQuaGlzcyA9IGZ1bmN0aW9uICgpIHt9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KENhdCkuaXRzZWxmLnRvLnJlc3BvbmRUbygnaGlzcycpLmJ1dC5ub3QucmVzcG9uZFRvKCdtZW93Jyk7XG4gICAqXG4gICAqIFdoZW4gbm90IGFkZGluZyBgLml0c2VsZmAsIGl0J3MgaW1wb3J0YW50IHRvIGNoZWNrIHRoZSB0YXJnZXQncyB0eXBlIGJlZm9yZVxuICAgKiB1c2luZyBgLnJlc3BvbmRUb2AuIFNlZSB0aGUgYC5hYCBkb2MgZm9yIGluZm8gb24gY2hlY2tpbmcgYSB0YXJnZXQncyB0eXBlLlxuICAgKlxuICAgKiAgICAgZnVuY3Rpb24gQ2F0ICgpIHt9XG4gICAqICAgICBDYXQucHJvdG90eXBlLm1lb3cgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICpcbiAgICogICAgIGV4cGVjdChuZXcgQ2F0KCkpLnRvLmJlLmFuKCdvYmplY3QnKS50aGF0LnJlc3BvbmRzVG8oJ21lb3cnKTtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5yZXNwb25kVG9gLlxuICAgKlxuICAgKiAgICAgZnVuY3Rpb24gRG9nICgpIHt9XG4gICAqICAgICBEb2cucHJvdG90eXBlLmJhcmsgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICpcbiAgICogICAgIGV4cGVjdChuZXcgRG9nKCkpLnRvLm5vdC5yZXNwb25kVG8oJ21lb3cnKTtcbiAgICpcbiAgICogYC5yZXNwb25kVG9gIGFjY2VwdHMgYW4gb3B0aW9uYWwgYG1zZ2AgYXJndW1lbnQgd2hpY2ggaXMgYSBjdXN0b20gZXJyb3JcbiAgICogbWVzc2FnZSB0byBzaG93IHdoZW4gdGhlIGFzc2VydGlvbiBmYWlscy4gVGhlIG1lc3NhZ2UgY2FuIGFsc28gYmUgZ2l2ZW4gYXNcbiAgICogdGhlIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7fSkudG8ucmVzcG9uZFRvKCdtZW93JywgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKiAgICAgZXhwZWN0KHt9LCAnbm9vbyB3aHkgZmFpbD8/JykudG8ucmVzcG9uZFRvKCdtZW93Jyk7XG4gICAqXG4gICAqIFRoZSBhbGlhcyBgLnJlc3BvbmRzVG9gIGNhbiBiZSB1c2VkIGludGVyY2hhbmdlYWJseSB3aXRoIGAucmVzcG9uZFRvYC5cbiAgICpcbiAgICogQG5hbWUgcmVzcG9uZFRvXG4gICAqIEBhbGlhcyByZXNwb25kc1RvXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlc3BvbmRUbyAobWV0aG9kLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgaXRzZWxmID0gZmxhZyh0aGlzLCAnaXRzZWxmJylcbiAgICAgICwgY29udGV4dCA9ICgnZnVuY3Rpb24nID09PSB0eXBlb2Ygb2JqICYmICFpdHNlbGYpXG4gICAgICAgID8gb2JqLnByb3RvdHlwZVttZXRob2RdXG4gICAgICAgIDogb2JqW21ldGhvZF07XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNvbnRleHRcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gcmVzcG9uZCB0byAnICsgXy5pbnNwZWN0KG1ldGhvZClcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IHJlc3BvbmQgdG8gJyArIF8uaW5zcGVjdChtZXRob2QpXG4gICAgKTtcbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ3Jlc3BvbmRUbycsIHJlc3BvbmRUbyk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ3Jlc3BvbmRzVG8nLCByZXNwb25kVG8pO1xuXG4gIC8qKlxuICAgKiAjIyMgLml0c2VsZlxuICAgKlxuICAgKiBGb3JjZXMgYWxsIGAucmVzcG9uZFRvYCBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpbiB0byBiZWhhdmUgYXMgaWZcbiAgICogdGhlIHRhcmdldCBpcyBhIG5vbi1mdW5jdGlvbiBvYmplY3QsIGV2ZW4gaWYgaXQncyBhIGZ1bmN0aW9uLiBUaHVzLCBpdFxuICAgKiBjYXVzZXMgYC5yZXNwb25kVG9gIHRvIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQgaGFzIGEgbWV0aG9kIHdpdGggdGhlIGdpdmVuXG4gICAqIG5hbWUsIHJhdGhlciB0aGFuIGFzc2VydGluZyB0aGF0IHRoZSB0YXJnZXQncyBgcHJvdG90eXBlYCBwcm9wZXJ0eSBoYXMgYVxuICAgKiBtZXRob2Qgd2l0aCB0aGUgZ2l2ZW4gbmFtZS5cbiAgICpcbiAgICogICAgIGZ1bmN0aW9uIENhdCAoKSB7fVxuICAgKiAgICAgQ2F0LnByb3RvdHlwZS5tZW93ID0gZnVuY3Rpb24gKCkge307XG4gICAqICAgICBDYXQuaGlzcyA9IGZ1bmN0aW9uICgpIHt9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KENhdCkuaXRzZWxmLnRvLnJlc3BvbmRUbygnaGlzcycpLmJ1dC5ub3QucmVzcG9uZFRvKCdtZW93Jyk7XG4gICAqXG4gICAqIEBuYW1lIGl0c2VsZlxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ2l0c2VsZicsIGZ1bmN0aW9uICgpIHtcbiAgICBmbGFnKHRoaXMsICdpdHNlbGYnLCB0cnVlKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuc2F0aXNmeShtYXRjaGVyWywgbXNnXSlcbiAgICpcbiAgICogSW52b2tlcyB0aGUgZ2l2ZW4gYG1hdGNoZXJgIGZ1bmN0aW9uIHdpdGggdGhlIHRhcmdldCBiZWluZyBwYXNzZWQgYXMgdGhlXG4gICAqIGZpcnN0IGFyZ3VtZW50LCBhbmQgYXNzZXJ0cyB0aGF0IHRoZSB2YWx1ZSByZXR1cm5lZCBpcyB0cnV0aHkuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8uc2F0aXNmeShmdW5jdGlvbihudW0pIHtcbiAgICogICAgICAgcmV0dXJuIG51bSA+IDA7XG4gICAqICAgICB9KTtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5zYXRpc2Z5YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5ub3Quc2F0aXNmeShmdW5jdGlvbihudW0pIHtcbiAgICogICAgICAgcmV0dXJuIG51bSA+IDI7XG4gICAqICAgICB9KTtcbiAgICpcbiAgICogYC5zYXRpc2Z5YCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yXG4gICAqIG1lc3NhZ2UgdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzXG4gICAqIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSkudG8uc2F0aXNmeShmdW5jdGlvbihudW0pIHtcbiAgICogICAgICAgcmV0dXJuIG51bSA+IDI7XG4gICAqICAgICB9LCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqXG4gICAqICAgICBleHBlY3QoMSwgJ25vb28gd2h5IGZhaWw/PycpLnRvLnNhdGlzZnkoZnVuY3Rpb24obnVtKSB7XG4gICAqICAgICAgIHJldHVybiBudW0gPiAyO1xuICAgKiAgICAgfSk7XG4gICAqXG4gICAqIFRoZSBhbGlhcyBgLnNhdGlzZmllc2AgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5zYXRpc2Z5YC5cbiAgICpcbiAgICogQG5hbWUgc2F0aXNmeVxuICAgKiBAYWxpYXMgc2F0aXNmaWVzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG1hdGNoZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNhdGlzZnkgKG1hdGNoZXIsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcbiAgICB2YXIgcmVzdWx0ID0gbWF0Y2hlcihvYmopO1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICByZXN1bHRcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gc2F0aXNmeSAnICsgXy5vYmpEaXNwbGF5KG1hdGNoZXIpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBzYXRpc2Z5JyArIF8ub2JqRGlzcGxheShtYXRjaGVyKVxuICAgICAgLCBmbGFnKHRoaXMsICduZWdhdGUnKSA/IGZhbHNlIDogdHJ1ZVxuICAgICAgLCByZXN1bHRcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnc2F0aXNmeScsIHNhdGlzZnkpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdzYXRpc2ZpZXMnLCBzYXRpc2Z5KTtcblxuICAvKipcbiAgICogIyMjIC5jbG9zZVRvKGV4cGVjdGVkLCBkZWx0YVssIG1zZ10pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGEgbnVtYmVyIHRoYXQncyB3aXRoaW4gYSBnaXZlbiArLy0gYGRlbHRhYCByYW5nZVxuICAgKiBvZiB0aGUgZ2l2ZW4gbnVtYmVyIGBleHBlY3RlZGAuIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnQgdGhhdCB0aGVcbiAgICogdGFyZ2V0IGlzIGVxdWFsIHRvIGl0cyBleHBlY3RlZCB2YWx1ZS5cbiAgICpcbiAgICogICAgIC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMS41KS50by5lcXVhbCgxLjUpO1xuICAgKlxuICAgKiAgICAgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoMS41KS50by5iZS5jbG9zZVRvKDEsIDAuNSk7XG4gICAqICAgICBleHBlY3QoMS41KS50by5iZS5jbG9zZVRvKDIsIDAuNSk7XG4gICAqICAgICBleHBlY3QoMS41KS50by5iZS5jbG9zZVRvKDEsIDEpO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLmNsb3NlVG9gLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEuNSkudG8uZXF1YWwoMS41KTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgxLjUpLnRvLm5vdC5iZS5jbG9zZVRvKDMsIDEpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogYC5jbG9zZVRvYCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yXG4gICAqIG1lc3NhZ2UgdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzXG4gICAqIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoMS41KS50by5iZS5jbG9zZVRvKDMsIDEsICdub29vIHdoeSBmYWlsPz8nKTtcbiAgICogICAgIGV4cGVjdCgxLjUsICdub29vIHdoeSBmYWlsPz8nKS50by5iZS5jbG9zZVRvKDMsIDEpO1xuICAgKlxuICAgKiBUaGUgYWxpYXMgYC5hcHByb3hpbWF0ZWx5YCBjYW4gYmUgdXNlZCBpbnRlcmNoYW5nZWFibHkgd2l0aCBgLmNsb3NlVG9gLlxuICAgKlxuICAgKiBAbmFtZSBjbG9zZVRvXG4gICAqIEBhbGlhcyBhcHByb3hpbWF0ZWx5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBleHBlY3RlZFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsdGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNsb3NlVG8oZXhwZWN0ZWQsIGRlbHRhLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBzc2ZpID0gZmxhZyh0aGlzLCAnc3NmaScpO1xuXG4gICAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLmEoJ251bWJlcicpO1xuICAgIGlmICh0eXBlb2YgZXhwZWN0ZWQgIT09ICdudW1iZXInIHx8IHR5cGVvZiBkZWx0YSAhPT0gJ251bWJlcicpIHtcbiAgICAgIGZsYWdNc2cgPSBmbGFnTXNnID8gZmxhZ01zZyArICc6ICcgOiAnJztcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgICBmbGFnTXNnICsgJ3RoZSBhcmd1bWVudHMgdG8gY2xvc2VUbyBvciBhcHByb3hpbWF0ZWx5IG11c3QgYmUgbnVtYmVycycsXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHNzZmlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIE1hdGguYWJzKG9iaiAtIGV4cGVjdGVkKSA8PSBkZWx0YVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBjbG9zZSB0byAnICsgZXhwZWN0ZWQgKyAnICsvLSAnICsgZGVsdGFcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gbm90IHRvIGJlIGNsb3NlIHRvICcgKyBleHBlY3RlZCArICcgKy8tICcgKyBkZWx0YVxuICAgICk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdjbG9zZVRvJywgY2xvc2VUbyk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2FwcHJveGltYXRlbHknLCBjbG9zZVRvKTtcblxuICAvLyBOb3RlOiBEdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGlmIHRlc3RpbmcgZm9yIGluY2x1c2lvbiBpbnN0ZWFkIG9mIHNhbWVuZXNzLlxuICBmdW5jdGlvbiBpc1N1YnNldE9mKHN1YnNldCwgc3VwZXJzZXQsIGNtcCwgY29udGFpbnMsIG9yZGVyZWQpIHtcbiAgICBpZiAoIWNvbnRhaW5zKSB7XG4gICAgICBpZiAoc3Vic2V0Lmxlbmd0aCAhPT0gc3VwZXJzZXQubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBzdXBlcnNldCA9IHN1cGVyc2V0LnNsaWNlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1YnNldC5ldmVyeShmdW5jdGlvbihlbGVtLCBpZHgpIHtcbiAgICAgIGlmIChvcmRlcmVkKSByZXR1cm4gY21wID8gY21wKGVsZW0sIHN1cGVyc2V0W2lkeF0pIDogZWxlbSA9PT0gc3VwZXJzZXRbaWR4XTtcblxuICAgICAgaWYgKCFjbXApIHtcbiAgICAgICAgdmFyIG1hdGNoSWR4ID0gc3VwZXJzZXQuaW5kZXhPZihlbGVtKTtcbiAgICAgICAgaWYgKG1hdGNoSWR4ID09PSAtMSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8vIFJlbW92ZSBtYXRjaCBmcm9tIHN1cGVyc2V0IHNvIG5vdCBjb3VudGVkIHR3aWNlIGlmIGR1cGxpY2F0ZSBpbiBzdWJzZXQuXG4gICAgICAgIGlmICghY29udGFpbnMpIHN1cGVyc2V0LnNwbGljZShtYXRjaElkeCwgMSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3VwZXJzZXQuc29tZShmdW5jdGlvbihlbGVtMiwgbWF0Y2hJZHgpIHtcbiAgICAgICAgaWYgKCFjbXAoZWxlbSwgZWxlbTIpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLy8gUmVtb3ZlIG1hdGNoIGZyb20gc3VwZXJzZXQgc28gbm90IGNvdW50ZWQgdHdpY2UgaWYgZHVwbGljYXRlIGluIHN1YnNldC5cbiAgICAgICAgaWYgKCFjb250YWlucykgc3VwZXJzZXQuc3BsaWNlKG1hdGNoSWR4LCAxKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLm1lbWJlcnMoc2V0WywgbXNnXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgYXJyYXkgaGFzIHRoZSBzYW1lIG1lbWJlcnMgYXMgdGhlIGdpdmVuIGFycmF5XG4gICAqIGBzZXRgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5tZW1iZXJzKFsyLCAxLCAzXSk7XG4gICAqICAgICBleHBlY3QoWzEsIDIsIDJdKS50by5oYXZlLm1lbWJlcnMoWzIsIDEsIDJdKTtcbiAgICpcbiAgICogQnkgZGVmYXVsdCwgbWVtYmVycyBhcmUgY29tcGFyZWQgdXNpbmcgc3RyaWN0IChgPT09YCkgZXF1YWxpdHkuIEFkZCBgLmRlZXBgXG4gICAqIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIHVzZSBkZWVwIGVxdWFsaXR5IGluc3RlYWQuIFNlZSB0aGUgYGRlZXAtZXFsYFxuICAgKiBwcm9qZWN0IHBhZ2UgZm9yIGluZm8gb24gdGhlIGRlZXAgZXF1YWxpdHkgYWxnb3JpdGhtOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vY2hhaWpzL2RlZXAtZXFsLlxuICAgKlxuICAgKiAgICAgLy8gVGFyZ2V0IGFycmF5IGRlZXBseSAoYnV0IG5vdCBzdHJpY3RseSkgaGFzIG1lbWJlciBge2E6IDF9YFxuICAgKiAgICAgZXhwZWN0KFt7YTogMX1dKS50by5oYXZlLmRlZXAubWVtYmVycyhbe2E6IDF9XSk7XG4gICAqICAgICBleHBlY3QoW3thOiAxfV0pLnRvLm5vdC5oYXZlLm1lbWJlcnMoW3thOiAxfV0pO1xuICAgKlxuICAgKiBCeSBkZWZhdWx0LCBvcmRlciBkb2Vzbid0IG1hdHRlci4gQWRkIGAub3JkZXJlZGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG9cbiAgICogcmVxdWlyZSB0aGF0IG1lbWJlcnMgYXBwZWFyIGluIHRoZSBzYW1lIG9yZGVyLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaGF2ZS5vcmRlcmVkLm1lbWJlcnMoWzEsIDIsIDNdKTtcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmhhdmUubWVtYmVycyhbMiwgMSwgM10pXG4gICAqICAgICAgIC5idXQubm90Lm9yZGVyZWQubWVtYmVycyhbMiwgMSwgM10pO1xuICAgKlxuICAgKiBCeSBkZWZhdWx0LCBib3RoIGFycmF5cyBtdXN0IGJlIHRoZSBzYW1lIHNpemUuIEFkZCBgLmluY2x1ZGVgIGVhcmxpZXIgaW5cbiAgICogdGhlIGNoYWluIHRvIHJlcXVpcmUgdGhhdCB0aGUgdGFyZ2V0J3MgbWVtYmVycyBiZSBhIHN1cGVyc2V0IG9mIHRoZVxuICAgKiBleHBlY3RlZCBtZW1iZXJzLiBOb3RlIHRoYXQgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBpbiB0aGUgc3Vic2V0IHdoZW5cbiAgICogYC5pbmNsdWRlYCBpcyBhZGRlZC5cbiAgICpcbiAgICogICAgIC8vIFRhcmdldCBhcnJheSBpcyBhIHN1cGVyc2V0IG9mIFsxLCAyXSBidXQgbm90IGlkZW50aWNhbFxuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8uaW5jbHVkZS5tZW1iZXJzKFsxLCAyXSk7XG4gICAqICAgICBleHBlY3QoWzEsIDIsIDNdKS50by5ub3QuaGF2ZS5tZW1iZXJzKFsxLCAyXSk7XG4gICAqXG4gICAqICAgICAvLyBEdXBsaWNhdGVzIGluIHRoZSBzdWJzZXQgYXJlIGlnbm9yZWRcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmluY2x1ZGUubWVtYmVycyhbMSwgMiwgMiwgMl0pO1xuICAgKlxuICAgKiBgLmRlZXBgLCBgLm9yZGVyZWRgLCBhbmQgYC5pbmNsdWRlYCBjYW4gYWxsIGJlIGNvbWJpbmVkLiBIb3dldmVyLCBpZlxuICAgKiBgLmluY2x1ZGVgIGFuZCBgLm9yZGVyZWRgIGFyZSBjb21iaW5lZCwgdGhlIG9yZGVyaW5nIGJlZ2lucyBhdCB0aGUgc3RhcnQgb2ZcbiAgICogYm90aCBhcnJheXMuXG4gICAqXG4gICAqICAgICBleHBlY3QoW3thOiAxfSwge2I6IDJ9LCB7YzogM31dKVxuICAgKiAgICAgICAudG8uaW5jbHVkZS5kZWVwLm9yZGVyZWQubWVtYmVycyhbe2E6IDF9LCB7YjogMn1dKVxuICAgKiAgICAgICAuYnV0Lm5vdC5pbmNsdWRlLmRlZXAub3JkZXJlZC5tZW1iZXJzKFt7YjogMn0sIHtjOiAzfV0pO1xuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLm1lbWJlcnNgLiBIb3dldmVyLCBpdCdzXG4gICAqIGRhbmdlcm91cyB0byBkbyBzby4gVGhlIHByb2JsZW0gaXMgdGhhdCBpdCBjcmVhdGVzIHVuY2VydGFpbiBleHBlY3RhdGlvbnNcbiAgICogYnkgYXNzZXJ0aW5nIHRoYXQgdGhlIHRhcmdldCBhcnJheSBkb2Vzbid0IGhhdmUgYWxsIG9mIHRoZSBzYW1lIG1lbWJlcnMgYXNcbiAgICogdGhlIGdpdmVuIGFycmF5IGBzZXRgIGJ1dCBtYXkgb3IgbWF5IG5vdCBoYXZlIHNvbWUgb2YgdGhlbS4gSXQncyBvZnRlbiBiZXN0XG4gICAqIHRvIGlkZW50aWZ5IHRoZSBleGFjdCBvdXRwdXQgdGhhdCdzIGV4cGVjdGVkLCBhbmQgdGhlbiB3cml0ZSBhbiBhc3NlcnRpb25cbiAgICogdGhhdCBvbmx5IGFjY2VwdHMgdGhhdCBleGFjdCBvdXRwdXQuXG4gICAqXG4gICAqICAgICBleHBlY3QoWzEsIDJdKS50by5ub3QuaW5jbHVkZSgzKS5hbmQubm90LmluY2x1ZGUoNCk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoWzEsIDJdKS50by5ub3QuaGF2ZS5tZW1iZXJzKFszLCA0XSk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBgLm1lbWJlcnNgIGFjY2VwdHMgYW4gb3B0aW9uYWwgYG1zZ2AgYXJndW1lbnQgd2hpY2ggaXMgYSBjdXN0b20gZXJyb3JcbiAgICogbWVzc2FnZSB0byBzaG93IHdoZW4gdGhlIGFzc2VydGlvbiBmYWlscy4gVGhlIG1lc3NhZ2UgY2FuIGFsc28gYmUgZ2l2ZW4gYXNcbiAgICogdGhlIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwgMl0pLnRvLmhhdmUubWVtYmVycyhbMSwgMiwgM10sICdub29vIHdoeSBmYWlsPz8nKTtcbiAgICogICAgIGV4cGVjdChbMSwgMl0sICdub29vIHdoeSBmYWlsPz8nKS50by5oYXZlLm1lbWJlcnMoWzEsIDIsIDNdKTtcbiAgICpcbiAgICogQG5hbWUgbWVtYmVyc1xuICAgKiBAcGFyYW0ge0FycmF5fSBzZXRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ21lbWJlcnMnLCBmdW5jdGlvbiAoc3Vic2V0LCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgZmxhZ01zZyA9IGZsYWcodGhpcywgJ21lc3NhZ2UnKVxuICAgICAgLCBzc2ZpID0gZmxhZyh0aGlzLCAnc3NmaScpO1xuXG4gICAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmJlLmFuKCdhcnJheScpO1xuICAgIG5ldyBBc3NlcnRpb24oc3Vic2V0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5iZS5hbignYXJyYXknKTtcblxuICAgIHZhciBjb250YWlucyA9IGZsYWcodGhpcywgJ2NvbnRhaW5zJyk7XG4gICAgdmFyIG9yZGVyZWQgPSBmbGFnKHRoaXMsICdvcmRlcmVkJyk7XG5cbiAgICB2YXIgc3ViamVjdCwgZmFpbE1zZywgZmFpbE5lZ2F0ZU1zZztcblxuICAgIGlmIChjb250YWlucykge1xuICAgICAgc3ViamVjdCA9IG9yZGVyZWQgPyAnYW4gb3JkZXJlZCBzdXBlcnNldCcgOiAnYSBzdXBlcnNldCc7XG4gICAgICBmYWlsTXNnID0gJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgJyArIHN1YmplY3QgKyAnIG9mICN7ZXhwfSc7XG4gICAgICBmYWlsTmVnYXRlTXNnID0gJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlICcgKyBzdWJqZWN0ICsgJyBvZiAje2V4cH0nO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWJqZWN0ID0gb3JkZXJlZCA/ICdvcmRlcmVkIG1lbWJlcnMnIDogJ21lbWJlcnMnO1xuICAgICAgZmFpbE1zZyA9ICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgdGhlIHNhbWUgJyArIHN1YmplY3QgKyAnIGFzICN7ZXhwfSc7XG4gICAgICBmYWlsTmVnYXRlTXNnID0gJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgdGhlIHNhbWUgJyArIHN1YmplY3QgKyAnIGFzICN7ZXhwfSc7XG4gICAgfVxuXG4gICAgdmFyIGNtcCA9IGZsYWcodGhpcywgJ2RlZXAnKSA/IF8uZXFsIDogdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIGlzU3Vic2V0T2Yoc3Vic2V0LCBvYmosIGNtcCwgY29udGFpbnMsIG9yZGVyZWQpXG4gICAgICAsIGZhaWxNc2dcbiAgICAgICwgZmFpbE5lZ2F0ZU1zZ1xuICAgICAgLCBzdWJzZXRcbiAgICAgICwgb2JqXG4gICAgICAsIHRydWVcbiAgICApO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5vbmVPZihsaXN0WywgbXNnXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgYSBtZW1iZXIgb2YgdGhlIGdpdmVuIGFycmF5IGBsaXN0YC4gSG93ZXZlcixcbiAgICogaXQncyBvZnRlbiBiZXN0IHRvIGFzc2VydCB0aGF0IHRoZSB0YXJnZXQgaXMgZXF1YWwgdG8gaXRzIGV4cGVjdGVkIHZhbHVlLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmVxdWFsKDEpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KDEpLnRvLmJlLm9uZU9mKFsxLCAyLCAzXSk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBDb21wYXJpc29ucyBhcmUgcGVyZm9ybWVkIHVzaW5nIHN0cmljdCAoYD09PWApIGVxdWFsaXR5LlxuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLm9uZU9mYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5lcXVhbCgxKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgxKS50by5ub3QuYmUub25lT2YoWzIsIDMsIDRdKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIGAub25lT2ZgIGFjY2VwdHMgYW4gb3B0aW9uYWwgYG1zZ2AgYXJndW1lbnQgd2hpY2ggaXMgYSBjdXN0b20gZXJyb3IgbWVzc2FnZVxuICAgKiB0byBzaG93IHdoZW4gdGhlIGFzc2VydGlvbiBmYWlscy4gVGhlIG1lc3NhZ2UgY2FuIGFsc28gYmUgZ2l2ZW4gYXMgdGhlXG4gICAqIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5iZS5vbmVPZihbMiwgMywgNF0sICdub29vIHdoeSBmYWlsPz8nKTtcbiAgICogICAgIGV4cGVjdCgxLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uYmUub25lT2YoWzIsIDMsIDRdKTtcbiAgICpcbiAgICogQG5hbWUgb25lT2ZcbiAgICogQHBhcmFtIHtBcnJheTwqPn0gbGlzdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gb25lT2YgKGxpc3QsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBleHBlY3RlZCA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJylcbiAgICAgICwgc3NmaSA9IGZsYWcodGhpcywgJ3NzZmknKTtcbiAgICBuZXcgQXNzZXJ0aW9uKGxpc3QsIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmJlLmFuKCdhcnJheScpO1xuXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIGxpc3QuaW5kZXhPZihleHBlY3RlZCkgPiAtMVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBvbmUgb2YgI3tleHB9J1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgb25lIG9mICN7ZXhwfSdcbiAgICAgICwgbGlzdFxuICAgICAgLCBleHBlY3RlZFxuICAgICk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdvbmVPZicsIG9uZU9mKTtcblxuICAvKipcbiAgICogIyMjIC5jaGFuZ2Uoc3ViamVjdFssIHByb3BbLCBtc2ddXSlcbiAgICpcbiAgICogV2hlbiBvbmUgYXJndW1lbnQgaXMgcHJvdmlkZWQsIGAuY2hhbmdlYCBhc3NlcnRzIHRoYXQgdGhlIGdpdmVuIGZ1bmN0aW9uXG4gICAqIGBzdWJqZWN0YCByZXR1cm5zIGEgZGlmZmVyZW50IHZhbHVlIHdoZW4gaXQncyBpbnZva2VkIGJlZm9yZSB0aGUgdGFyZ2V0XG4gICAqIGZ1bmN0aW9uIGNvbXBhcmVkIHRvIHdoZW4gaXQncyBpbnZva2VkIGFmdGVyd2FyZC4gSG93ZXZlciwgaXQncyBvZnRlbiBiZXN0XG4gICAqIHRvIGFzc2VydCB0aGF0IGBzdWJqZWN0YCBpcyBlcXVhbCB0byBpdHMgZXhwZWN0ZWQgdmFsdWUuXG4gICAqXG4gICAqICAgICB2YXIgZG90cyA9ICcnXG4gICAqICAgICAgICwgYWRkRG90ID0gZnVuY3Rpb24gKCkgeyBkb3RzICs9ICcuJzsgfVxuICAgKiAgICAgICAsIGdldERvdHMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBkb3RzOyB9O1xuICAgKlxuICAgKiAgICAgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChnZXREb3RzKCkpLnRvLmVxdWFsKCcnKTtcbiAgICogICAgIGFkZERvdCgpO1xuICAgKiAgICAgZXhwZWN0KGdldERvdHMoKSkudG8uZXF1YWwoJy4nKTtcbiAgICpcbiAgICogICAgIC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KGFkZERvdCkudG8uY2hhbmdlKGdldERvdHMpO1xuICAgKlxuICAgKiBXaGVuIHR3byBhcmd1bWVudHMgYXJlIHByb3ZpZGVkLCBgLmNoYW5nZWAgYXNzZXJ0cyB0aGF0IHRoZSB2YWx1ZSBvZiB0aGVcbiAgICogZ2l2ZW4gb2JqZWN0IGBzdWJqZWN0YCdzIGBwcm9wYCBwcm9wZXJ0eSBpcyBkaWZmZXJlbnQgYmVmb3JlIGludm9raW5nIHRoZVxuICAgKiB0YXJnZXQgZnVuY3Rpb24gY29tcGFyZWQgdG8gYWZ0ZXJ3YXJkLlxuICAgKlxuICAgKiAgICAgdmFyIG15T2JqID0ge2RvdHM6ICcnfVxuICAgKiAgICAgICAsIGFkZERvdCA9IGZ1bmN0aW9uICgpIHsgbXlPYmouZG90cyArPSAnLic7IH07XG4gICAqXG4gICAqICAgICAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KG15T2JqKS50by5oYXZlLnByb3BlcnR5KCdkb3RzJywgJycpO1xuICAgKiAgICAgYWRkRG90KCk7XG4gICAqICAgICBleHBlY3QobXlPYmopLnRvLmhhdmUucHJvcGVydHkoJ2RvdHMnLCAnLicpO1xuICAgKlxuICAgKiAgICAgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoYWRkRG90KS50by5jaGFuZ2UobXlPYmosICdkb3RzJyk7XG4gICAqXG4gICAqIFN0cmljdCAoYD09PWApIGVxdWFsaXR5IGlzIHVzZWQgdG8gY29tcGFyZSBiZWZvcmUgYW5kIGFmdGVyIHZhbHVlcy5cbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5jaGFuZ2VgLlxuICAgKlxuICAgKiAgICAgdmFyIGRvdHMgPSAnJ1xuICAgKiAgICAgICAsIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuICAgKiAgICAgICAsIGdldERvdHMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBkb3RzOyB9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KG5vb3ApLnRvLm5vdC5jaGFuZ2UoZ2V0RG90cyk7XG4gICAqXG4gICAqICAgICB2YXIgbXlPYmogPSB7ZG90czogJyd9XG4gICAqICAgICAgICwgbm9vcCA9IGZ1bmN0aW9uICgpIHt9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KG5vb3ApLnRvLm5vdC5jaGFuZ2UobXlPYmosICdkb3RzJyk7XG4gICAqXG4gICAqIGAuY2hhbmdlYCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yXG4gICAqIG1lc3NhZ2UgdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzXG4gICAqIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuIFdoZW4gbm90IHByb3ZpZGluZyB0d28gYXJndW1lbnRzLCBhbHdheXNcbiAgICogdXNlIHRoZSBzZWNvbmQgZm9ybS5cbiAgICpcbiAgICogICAgIHZhciBteU9iaiA9IHtkb3RzOiAnJ31cbiAgICogICAgICAgLCBhZGREb3QgPSBmdW5jdGlvbiAoKSB7IG15T2JqLmRvdHMgKz0gJy4nOyB9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGFkZERvdCkudG8ubm90LmNoYW5nZShteU9iaiwgJ2RvdHMnLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqXG4gICAqICAgICB2YXIgZG90cyA9ICcnXG4gICAqICAgICAgICwgYWRkRG90ID0gZnVuY3Rpb24gKCkgeyBkb3RzICs9ICcuJzsgfVxuICAgKiAgICAgICAsIGdldERvdHMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBkb3RzOyB9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGFkZERvdCwgJ25vb28gd2h5IGZhaWw/PycpLnRvLm5vdC5jaGFuZ2UoZ2V0RG90cyk7XG4gICAqXG4gICAqIGAuY2hhbmdlYCBhbHNvIGNhdXNlcyBhbGwgYC5ieWAgYXNzZXJ0aW9ucyB0aGF0IGZvbGxvdyBpbiB0aGUgY2hhaW4gdG9cbiAgICogYXNzZXJ0IGhvdyBtdWNoIGEgbnVtZXJpYyBzdWJqZWN0IHdhcyBpbmNyZWFzZWQgb3IgZGVjcmVhc2VkIGJ5LiBIb3dldmVyLFxuICAgKiBpdCdzIGRhbmdlcm91cyB0byB1c2UgYC5jaGFuZ2UuYnlgLiBUaGUgcHJvYmxlbSBpcyB0aGF0IGl0IGNyZWF0ZXNcbiAgICogdW5jZXJ0YWluIGV4cGVjdGF0aW9ucyBieSBhc3NlcnRpbmcgdGhhdCB0aGUgc3ViamVjdCBlaXRoZXIgaW5jcmVhc2VzIGJ5XG4gICAqIHRoZSBnaXZlbiBkZWx0YSwgb3IgdGhhdCBpdCBkZWNyZWFzZXMgYnkgdGhlIGdpdmVuIGRlbHRhLiBJdCdzIG9mdGVuIGJlc3RcbiAgICogdG8gaWRlbnRpZnkgdGhlIGV4YWN0IG91dHB1dCB0aGF0J3MgZXhwZWN0ZWQsIGFuZCB0aGVuIHdyaXRlIGFuIGFzc2VydGlvblxuICAgKiB0aGF0IG9ubHkgYWNjZXB0cyB0aGF0IGV4YWN0IG91dHB1dC5cbiAgICpcbiAgICogICAgIHZhciBteU9iaiA9IHt2YWw6IDF9XG4gICAqICAgICAgICwgYWRkVHdvID0gZnVuY3Rpb24gKCkgeyBteU9iai52YWwgKz0gMjsgfVxuICAgKiAgICAgICAsIHN1YnRyYWN0VHdvID0gZnVuY3Rpb24gKCkgeyBteU9iai52YWwgLT0gMjsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChhZGRUd28pLnRvLmluY3JlYXNlKG15T2JqLCAndmFsJykuYnkoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoYWRkVHdvKS50by5jaGFuZ2UobXlPYmosICd2YWwnKS5ieSgyKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqICAgICBleHBlY3Qoc3VidHJhY3RUd28pLnRvLmRlY3JlYXNlKG15T2JqLCAndmFsJykuYnkoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoc3VidHJhY3RUd28pLnRvLmNoYW5nZShteU9iaiwgJ3ZhbCcpLmJ5KDIpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogVGhlIGFsaWFzIGAuY2hhbmdlc2AgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5jaGFuZ2VgLlxuICAgKlxuICAgKiBAbmFtZSBjaGFuZ2VcbiAgICogQGFsaWFzIGNoYW5nZXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN1YmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3AgbmFtZSBfb3B0aW9uYWxfXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnRDaGFuZ2VzIChzdWJqZWN0LCBwcm9wLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgZm4gPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCBmbGFnTXNnID0gZmxhZyh0aGlzLCAnbWVzc2FnZScpXG4gICAgICAsIHNzZmkgPSBmbGFnKHRoaXMsICdzc2ZpJyk7XG4gICAgbmV3IEFzc2VydGlvbihmbiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYSgnZnVuY3Rpb24nKTtcblxuICAgIHZhciBpbml0aWFsO1xuICAgIGlmICghcHJvcCkge1xuICAgICAgbmV3IEFzc2VydGlvbihzdWJqZWN0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKCdmdW5jdGlvbicpO1xuICAgICAgaW5pdGlhbCA9IHN1YmplY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3IEFzc2VydGlvbihzdWJqZWN0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KHByb3ApO1xuICAgICAgaW5pdGlhbCA9IHN1YmplY3RbcHJvcF07XG4gICAgfVxuXG4gICAgZm4oKTtcblxuICAgIHZhciBmaW5hbCA9IHByb3AgPT09IHVuZGVmaW5lZCB8fCBwcm9wID09PSBudWxsID8gc3ViamVjdCgpIDogc3ViamVjdFtwcm9wXTtcbiAgICB2YXIgbXNnT2JqID0gcHJvcCA9PT0gdW5kZWZpbmVkIHx8IHByb3AgPT09IG51bGwgPyBpbml0aWFsIDogJy4nICsgcHJvcDtcblxuICAgIC8vIFRoaXMgZ2V0cyBmbGFnZ2VkIGJlY2F1c2Ugb2YgdGhlIC5ieShkZWx0YSkgYXNzZXJ0aW9uXG4gICAgZmxhZyh0aGlzLCAnZGVsdGFNc2dPYmonLCBtc2dPYmopO1xuICAgIGZsYWcodGhpcywgJ2luaXRpYWxEZWx0YVZhbHVlJywgaW5pdGlhbCk7XG4gICAgZmxhZyh0aGlzLCAnZmluYWxEZWx0YVZhbHVlJywgZmluYWwpO1xuICAgIGZsYWcodGhpcywgJ2RlbHRhQmVoYXZpb3InLCAnY2hhbmdlJyk7XG4gICAgZmxhZyh0aGlzLCAncmVhbERlbHRhJywgZmluYWwgIT09IGluaXRpYWwpO1xuXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBpbml0aWFsICE9PSBmaW5hbFxuICAgICAgLCAnZXhwZWN0ZWQgJyArIG1zZ09iaiArICcgdG8gY2hhbmdlJ1xuICAgICAgLCAnZXhwZWN0ZWQgJyArIG1zZ09iaiArICcgdG8gbm90IGNoYW5nZSdcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnY2hhbmdlJywgYXNzZXJ0Q2hhbmdlcyk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2NoYW5nZXMnLCBhc3NlcnRDaGFuZ2VzKTtcblxuICAvKipcbiAgICogIyMjIC5pbmNyZWFzZShzdWJqZWN0WywgcHJvcFssIG1zZ11dKVxuICAgKlxuICAgKiBXaGVuIG9uZSBhcmd1bWVudCBpcyBwcm92aWRlZCwgYC5pbmNyZWFzZWAgYXNzZXJ0cyB0aGF0IHRoZSBnaXZlbiBmdW5jdGlvblxuICAgKiBgc3ViamVjdGAgcmV0dXJucyBhIGdyZWF0ZXIgbnVtYmVyIHdoZW4gaXQncyBpbnZva2VkIGFmdGVyIGludm9raW5nIHRoZVxuICAgKiB0YXJnZXQgZnVuY3Rpb24gY29tcGFyZWQgdG8gd2hlbiBpdCdzIGludm9rZWQgYmVmb3JlaGFuZC4gYC5pbmNyZWFzZWAgYWxzb1xuICAgKiBjYXVzZXMgYWxsIGAuYnlgIGFzc2VydGlvbnMgdGhhdCBmb2xsb3cgaW4gdGhlIGNoYWluIHRvIGFzc2VydCBob3cgbXVjaFxuICAgKiBncmVhdGVyIG9mIGEgbnVtYmVyIGlzIHJldHVybmVkLiBJdCdzIG9mdGVuIGJlc3QgdG8gYXNzZXJ0IHRoYXQgdGhlIHJldHVyblxuICAgKiB2YWx1ZSBpbmNyZWFzZWQgYnkgdGhlIGV4cGVjdGVkIGFtb3VudCwgcmF0aGVyIHRoYW4gYXNzZXJ0aW5nIGl0IGluY3JlYXNlZFxuICAgKiBieSBhbnkgYW1vdW50LlxuICAgKlxuICAgKiAgICAgdmFyIHZhbCA9IDFcbiAgICogICAgICAgLCBhZGRUd28gPSBmdW5jdGlvbiAoKSB7IHZhbCArPSAyOyB9XG4gICAqICAgICAgICwgZ2V0VmFsID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsOyB9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGFkZFR3bykudG8uaW5jcmVhc2UoZ2V0VmFsKS5ieSgyKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChhZGRUd28pLnRvLmluY3JlYXNlKGdldFZhbCk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBXaGVuIHR3byBhcmd1bWVudHMgYXJlIHByb3ZpZGVkLCBgLmluY3JlYXNlYCBhc3NlcnRzIHRoYXQgdGhlIHZhbHVlIG9mIHRoZVxuICAgKiBnaXZlbiBvYmplY3QgYHN1YmplY3RgJ3MgYHByb3BgIHByb3BlcnR5IGlzIGdyZWF0ZXIgYWZ0ZXIgaW52b2tpbmcgdGhlXG4gICAqIHRhcmdldCBmdW5jdGlvbiBjb21wYXJlZCB0byBiZWZvcmVoYW5kLlxuICAgKlxuICAgKiAgICAgdmFyIG15T2JqID0ge3ZhbDogMX1cbiAgICogICAgICAgLCBhZGRUd28gPSBmdW5jdGlvbiAoKSB7IG15T2JqLnZhbCArPSAyOyB9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGFkZFR3bykudG8uaW5jcmVhc2UobXlPYmosICd2YWwnKS5ieSgyKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChhZGRUd28pLnRvLmluY3JlYXNlKG15T2JqLCAndmFsJyk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBBZGQgYC5ub3RgIGVhcmxpZXIgaW4gdGhlIGNoYWluIHRvIG5lZ2F0ZSBgLmluY3JlYXNlYC4gSG93ZXZlciwgaXQnc1xuICAgKiBkYW5nZXJvdXMgdG8gZG8gc28uIFRoZSBwcm9ibGVtIGlzIHRoYXQgaXQgY3JlYXRlcyB1bmNlcnRhaW4gZXhwZWN0YXRpb25zXG4gICAqIGJ5IGFzc2VydGluZyB0aGF0IHRoZSBzdWJqZWN0IGVpdGhlciBkZWNyZWFzZXMsIG9yIHRoYXQgaXQgc3RheXMgdGhlIHNhbWUuXG4gICAqIEl0J3Mgb2Z0ZW4gYmVzdCB0byBpZGVudGlmeSB0aGUgZXhhY3Qgb3V0cHV0IHRoYXQncyBleHBlY3RlZCwgYW5kIHRoZW5cbiAgICogd3JpdGUgYW4gYXNzZXJ0aW9uIHRoYXQgb25seSBhY2NlcHRzIHRoYXQgZXhhY3Qgb3V0cHV0LlxuICAgKlxuICAgKiBXaGVuIHRoZSBzdWJqZWN0IGlzIGV4cGVjdGVkIHRvIGRlY3JlYXNlLCBpdCdzIG9mdGVuIGJlc3QgdG8gYXNzZXJ0IHRoYXQgaXRcbiAgICogZGVjcmVhc2VkIGJ5IHRoZSBleHBlY3RlZCBhbW91bnQuXG4gICAqXG4gICAqICAgICB2YXIgbXlPYmogPSB7dmFsOiAxfVxuICAgKiAgICAgICAsIHN1YnRyYWN0VHdvID0gZnVuY3Rpb24gKCkgeyBteU9iai52YWwgLT0gMjsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChzdWJ0cmFjdFR3bykudG8uZGVjcmVhc2UobXlPYmosICd2YWwnKS5ieSgyKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChzdWJ0cmFjdFR3bykudG8ubm90LmluY3JlYXNlKG15T2JqLCAndmFsJyk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBXaGVuIHRoZSBzdWJqZWN0IGlzIGV4cGVjdGVkIHRvIHN0YXkgdGhlIHNhbWUsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnRcbiAgICogZXhhY3RseSB0aGF0LlxuICAgKlxuICAgKiAgICAgdmFyIG15T2JqID0ge3ZhbDogMX1cbiAgICogICAgICAgLCBub29wID0gZnVuY3Rpb24gKCkge307XG4gICAqXG4gICAqICAgICBleHBlY3Qobm9vcCkudG8ubm90LmNoYW5nZShteU9iaiwgJ3ZhbCcpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KG5vb3ApLnRvLm5vdC5pbmNyZWFzZShteU9iaiwgJ3ZhbCcpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogYC5pbmNyZWFzZWAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvclxuICAgKiBtZXNzYWdlIHRvIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhc1xuICAgKiB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBleHBlY3RgLiBXaGVuIG5vdCBwcm92aWRpbmcgdHdvIGFyZ3VtZW50cywgYWx3YXlzXG4gICAqIHVzZSB0aGUgc2Vjb25kIGZvcm0uXG4gICAqXG4gICAqICAgICB2YXIgbXlPYmogPSB7dmFsOiAxfVxuICAgKiAgICAgICAsIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICpcbiAgICogICAgIGV4cGVjdChub29wKS50by5pbmNyZWFzZShteU9iaiwgJ3ZhbCcsICdub29vIHdoeSBmYWlsPz8nKTtcbiAgICpcbiAgICogICAgIHZhciB2YWwgPSAxXG4gICAqICAgICAgICwgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG4gICAqICAgICAgICwgZ2V0VmFsID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsOyB9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KG5vb3AsICdub29vIHdoeSBmYWlsPz8nKS50by5pbmNyZWFzZShnZXRWYWwpO1xuICAgKlxuICAgKiBUaGUgYWxpYXMgYC5pbmNyZWFzZXNgIGNhbiBiZSB1c2VkIGludGVyY2hhbmdlYWJseSB3aXRoIGAuaW5jcmVhc2VgLlxuICAgKlxuICAgKiBAbmFtZSBpbmNyZWFzZVxuICAgKiBAYWxpYXMgaW5jcmVhc2VzXG4gICAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBzdWJqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIG5hbWUgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0SW5jcmVhc2VzIChzdWJqZWN0LCBwcm9wLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgZm4gPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCBmbGFnTXNnID0gZmxhZyh0aGlzLCAnbWVzc2FnZScpXG4gICAgICAsIHNzZmkgPSBmbGFnKHRoaXMsICdzc2ZpJyk7XG4gICAgbmV3IEFzc2VydGlvbihmbiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYSgnZnVuY3Rpb24nKTtcblxuICAgIHZhciBpbml0aWFsO1xuICAgIGlmICghcHJvcCkge1xuICAgICAgbmV3IEFzc2VydGlvbihzdWJqZWN0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKCdmdW5jdGlvbicpO1xuICAgICAgaW5pdGlhbCA9IHN1YmplY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3IEFzc2VydGlvbihzdWJqZWN0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KHByb3ApO1xuICAgICAgaW5pdGlhbCA9IHN1YmplY3RbcHJvcF07XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIHRhcmdldCBpcyBhIG51bWJlclxuICAgIG5ldyBBc3NlcnRpb24oaW5pdGlhbCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYSgnbnVtYmVyJyk7XG5cbiAgICBmbigpO1xuXG4gICAgdmFyIGZpbmFsID0gcHJvcCA9PT0gdW5kZWZpbmVkIHx8IHByb3AgPT09IG51bGwgPyBzdWJqZWN0KCkgOiBzdWJqZWN0W3Byb3BdO1xuICAgIHZhciBtc2dPYmogPSBwcm9wID09PSB1bmRlZmluZWQgfHwgcHJvcCA9PT0gbnVsbCA/IGluaXRpYWwgOiAnLicgKyBwcm9wO1xuXG4gICAgZmxhZyh0aGlzLCAnZGVsdGFNc2dPYmonLCBtc2dPYmopO1xuICAgIGZsYWcodGhpcywgJ2luaXRpYWxEZWx0YVZhbHVlJywgaW5pdGlhbCk7XG4gICAgZmxhZyh0aGlzLCAnZmluYWxEZWx0YVZhbHVlJywgZmluYWwpO1xuICAgIGZsYWcodGhpcywgJ2RlbHRhQmVoYXZpb3InLCAnaW5jcmVhc2UnKTtcbiAgICBmbGFnKHRoaXMsICdyZWFsRGVsdGEnLCBmaW5hbCAtIGluaXRpYWwpO1xuXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBmaW5hbCAtIGluaXRpYWwgPiAwXG4gICAgICAsICdleHBlY3RlZCAnICsgbXNnT2JqICsgJyB0byBpbmNyZWFzZSdcbiAgICAgICwgJ2V4cGVjdGVkICcgKyBtc2dPYmogKyAnIHRvIG5vdCBpbmNyZWFzZSdcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnaW5jcmVhc2UnLCBhc3NlcnRJbmNyZWFzZXMpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdpbmNyZWFzZXMnLCBhc3NlcnRJbmNyZWFzZXMpO1xuXG4gIC8qKlxuICAgKiAjIyMgLmRlY3JlYXNlKHN1YmplY3RbLCBwcm9wWywgbXNnXV0pXG4gICAqXG4gICAqIFdoZW4gb25lIGFyZ3VtZW50IGlzIHByb3ZpZGVkLCBgLmRlY3JlYXNlYCBhc3NlcnRzIHRoYXQgdGhlIGdpdmVuIGZ1bmN0aW9uXG4gICAqIGBzdWJqZWN0YCByZXR1cm5zIGEgbGVzc2VyIG51bWJlciB3aGVuIGl0J3MgaW52b2tlZCBhZnRlciBpbnZva2luZyB0aGVcbiAgICogdGFyZ2V0IGZ1bmN0aW9uIGNvbXBhcmVkIHRvIHdoZW4gaXQncyBpbnZva2VkIGJlZm9yZWhhbmQuIGAuZGVjcmVhc2VgIGFsc29cbiAgICogY2F1c2VzIGFsbCBgLmJ5YCBhc3NlcnRpb25zIHRoYXQgZm9sbG93IGluIHRoZSBjaGFpbiB0byBhc3NlcnQgaG93IG11Y2hcbiAgICogbGVzc2VyIG9mIGEgbnVtYmVyIGlzIHJldHVybmVkLiBJdCdzIG9mdGVuIGJlc3QgdG8gYXNzZXJ0IHRoYXQgdGhlIHJldHVyblxuICAgKiB2YWx1ZSBkZWNyZWFzZWQgYnkgdGhlIGV4cGVjdGVkIGFtb3VudCwgcmF0aGVyIHRoYW4gYXNzZXJ0aW5nIGl0IGRlY3JlYXNlZFxuICAgKiBieSBhbnkgYW1vdW50LlxuICAgKlxuICAgKiAgICAgdmFyIHZhbCA9IDFcbiAgICogICAgICAgLCBzdWJ0cmFjdFR3byA9IGZ1bmN0aW9uICgpIHsgdmFsIC09IDI7IH1cbiAgICogICAgICAgLCBnZXRWYWwgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWw7IH07XG4gICAqXG4gICAqICAgICBleHBlY3Qoc3VidHJhY3RUd28pLnRvLmRlY3JlYXNlKGdldFZhbCkuYnkoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoc3VidHJhY3RUd28pLnRvLmRlY3JlYXNlKGdldFZhbCk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBXaGVuIHR3byBhcmd1bWVudHMgYXJlIHByb3ZpZGVkLCBgLmRlY3JlYXNlYCBhc3NlcnRzIHRoYXQgdGhlIHZhbHVlIG9mIHRoZVxuICAgKiBnaXZlbiBvYmplY3QgYHN1YmplY3RgJ3MgYHByb3BgIHByb3BlcnR5IGlzIGxlc3NlciBhZnRlciBpbnZva2luZyB0aGVcbiAgICogdGFyZ2V0IGZ1bmN0aW9uIGNvbXBhcmVkIHRvIGJlZm9yZWhhbmQuXG4gICAqXG4gICAqICAgICB2YXIgbXlPYmogPSB7dmFsOiAxfVxuICAgKiAgICAgICAsIHN1YnRyYWN0VHdvID0gZnVuY3Rpb24gKCkgeyBteU9iai52YWwgLT0gMjsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChzdWJ0cmFjdFR3bykudG8uZGVjcmVhc2UobXlPYmosICd2YWwnKS5ieSgyKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChzdWJ0cmFjdFR3bykudG8uZGVjcmVhc2UobXlPYmosICd2YWwnKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuZGVjcmVhc2VgLiBIb3dldmVyLCBpdCdzXG4gICAqIGRhbmdlcm91cyB0byBkbyBzby4gVGhlIHByb2JsZW0gaXMgdGhhdCBpdCBjcmVhdGVzIHVuY2VydGFpbiBleHBlY3RhdGlvbnNcbiAgICogYnkgYXNzZXJ0aW5nIHRoYXQgdGhlIHN1YmplY3QgZWl0aGVyIGluY3JlYXNlcywgb3IgdGhhdCBpdCBzdGF5cyB0aGUgc2FtZS5cbiAgICogSXQncyBvZnRlbiBiZXN0IHRvIGlkZW50aWZ5IHRoZSBleGFjdCBvdXRwdXQgdGhhdCdzIGV4cGVjdGVkLCBhbmQgdGhlblxuICAgKiB3cml0ZSBhbiBhc3NlcnRpb24gdGhhdCBvbmx5IGFjY2VwdHMgdGhhdCBleGFjdCBvdXRwdXQuXG4gICAqXG4gICAqIFdoZW4gdGhlIHN1YmplY3QgaXMgZXhwZWN0ZWQgdG8gaW5jcmVhc2UsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnQgdGhhdCBpdFxuICAgKiBpbmNyZWFzZWQgYnkgdGhlIGV4cGVjdGVkIGFtb3VudC5cbiAgICpcbiAgICogICAgIHZhciBteU9iaiA9IHt2YWw6IDF9XG4gICAqICAgICAgICwgYWRkVHdvID0gZnVuY3Rpb24gKCkgeyBteU9iai52YWwgKz0gMjsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChhZGRUd28pLnRvLmluY3JlYXNlKG15T2JqLCAndmFsJykuYnkoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoYWRkVHdvKS50by5ub3QuZGVjcmVhc2UobXlPYmosICd2YWwnKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIFdoZW4gdGhlIHN1YmplY3QgaXMgZXhwZWN0ZWQgdG8gc3RheSB0aGUgc2FtZSwgaXQncyBvZnRlbiBiZXN0IHRvIGFzc2VydFxuICAgKiBleGFjdGx5IHRoYXQuXG4gICAqXG4gICAqICAgICB2YXIgbXlPYmogPSB7dmFsOiAxfVxuICAgKiAgICAgICAsIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICpcbiAgICogICAgIGV4cGVjdChub29wKS50by5ub3QuY2hhbmdlKG15T2JqLCAndmFsJyk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qobm9vcCkudG8ubm90LmRlY3JlYXNlKG15T2JqLCAndmFsJyk7IC8vIE5vdCByZWNvbW1lbmRlZFxuICAgKlxuICAgKiBgLmRlY3JlYXNlYCBhY2NlcHRzIGFuIG9wdGlvbmFsIGBtc2dgIGFyZ3VtZW50IHdoaWNoIGlzIGEgY3VzdG9tIGVycm9yXG4gICAqIG1lc3NhZ2UgdG8gc2hvdyB3aGVuIHRoZSBhc3NlcnRpb24gZmFpbHMuIFRoZSBtZXNzYWdlIGNhbiBhbHNvIGJlIGdpdmVuIGFzXG4gICAqIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuIFdoZW4gbm90IHByb3ZpZGluZyB0d28gYXJndW1lbnRzLCBhbHdheXNcbiAgICogdXNlIHRoZSBzZWNvbmQgZm9ybS5cbiAgICpcbiAgICogICAgIHZhciBteU9iaiA9IHt2YWw6IDF9XG4gICAqICAgICAgICwgbm9vcCA9IGZ1bmN0aW9uICgpIHt9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KG5vb3ApLnRvLmRlY3JlYXNlKG15T2JqLCAndmFsJywgJ25vb28gd2h5IGZhaWw/PycpO1xuICAgKlxuICAgKiAgICAgdmFyIHZhbCA9IDFcbiAgICogICAgICAgLCBub29wID0gZnVuY3Rpb24gKCkge31cbiAgICogICAgICAgLCBnZXRWYWwgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWw7IH07XG4gICAqXG4gICAqICAgICBleHBlY3Qobm9vcCwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmRlY3JlYXNlKGdldFZhbCk7XG4gICAqXG4gICAqIFRoZSBhbGlhcyBgLmRlY3JlYXNlc2AgY2FuIGJlIHVzZWQgaW50ZXJjaGFuZ2VhYmx5IHdpdGggYC5kZWNyZWFzZWAuXG4gICAqXG4gICAqIEBuYW1lIGRlY3JlYXNlXG4gICAqIEBhbGlhcyBkZWNyZWFzZXNcbiAgICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHN1YmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3AgbmFtZSBfb3B0aW9uYWxfXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnREZWNyZWFzZXMgKHN1YmplY3QsIHByb3AsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBmbiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIGZsYWdNc2cgPSBmbGFnKHRoaXMsICdtZXNzYWdlJylcbiAgICAgICwgc3NmaSA9IGZsYWcodGhpcywgJ3NzZmknKTtcbiAgICBuZXcgQXNzZXJ0aW9uKGZuLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKCdmdW5jdGlvbicpO1xuXG4gICAgdmFyIGluaXRpYWw7XG4gICAgaWYgKCFwcm9wKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKHN1YmplY3QsIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLmEoJ2Z1bmN0aW9uJyk7XG4gICAgICBpbml0aWFsID0gc3ViamVjdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKHN1YmplY3QsIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmhhdmUucHJvcGVydHkocHJvcCk7XG4gICAgICBpbml0aWFsID0gc3ViamVjdFtwcm9wXTtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgdGFyZ2V0IGlzIGEgbnVtYmVyXG4gICAgbmV3IEFzc2VydGlvbihpbml0aWFsLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKCdudW1iZXInKTtcblxuICAgIGZuKCk7XG5cbiAgICB2YXIgZmluYWwgPSBwcm9wID09PSB1bmRlZmluZWQgfHwgcHJvcCA9PT0gbnVsbCA/IHN1YmplY3QoKSA6IHN1YmplY3RbcHJvcF07XG4gICAgdmFyIG1zZ09iaiA9IHByb3AgPT09IHVuZGVmaW5lZCB8fCBwcm9wID09PSBudWxsID8gaW5pdGlhbCA6ICcuJyArIHByb3A7XG5cbiAgICBmbGFnKHRoaXMsICdkZWx0YU1zZ09iaicsIG1zZ09iaik7XG4gICAgZmxhZyh0aGlzLCAnaW5pdGlhbERlbHRhVmFsdWUnLCBpbml0aWFsKTtcbiAgICBmbGFnKHRoaXMsICdmaW5hbERlbHRhVmFsdWUnLCBmaW5hbCk7XG4gICAgZmxhZyh0aGlzLCAnZGVsdGFCZWhhdmlvcicsICdkZWNyZWFzZScpO1xuICAgIGZsYWcodGhpcywgJ3JlYWxEZWx0YScsIGluaXRpYWwgLSBmaW5hbCk7XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGZpbmFsIC0gaW5pdGlhbCA8IDBcbiAgICAgICwgJ2V4cGVjdGVkICcgKyBtc2dPYmogKyAnIHRvIGRlY3JlYXNlJ1xuICAgICAgLCAnZXhwZWN0ZWQgJyArIG1zZ09iaiArICcgdG8gbm90IGRlY3JlYXNlJ1xuICAgICk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdkZWNyZWFzZScsIGFzc2VydERlY3JlYXNlcyk7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2RlY3JlYXNlcycsIGFzc2VydERlY3JlYXNlcyk7XG5cbiAgLyoqXG4gICAqICMjIyAuYnkoZGVsdGFbLCBtc2ddKVxuICAgKlxuICAgKiBXaGVuIGZvbGxvd2luZyBhbiBgLmluY3JlYXNlYCBhc3NlcnRpb24gaW4gdGhlIGNoYWluLCBgLmJ5YCBhc3NlcnRzIHRoYXRcbiAgICogdGhlIHN1YmplY3Qgb2YgdGhlIGAuaW5jcmVhc2VgIGFzc2VydGlvbiBpbmNyZWFzZWQgYnkgdGhlIGdpdmVuIGBkZWx0YWAuXG4gICAqXG4gICAqICAgICB2YXIgbXlPYmogPSB7dmFsOiAxfVxuICAgKiAgICAgICAsIGFkZFR3byA9IGZ1bmN0aW9uICgpIHsgbXlPYmoudmFsICs9IDI7IH07XG4gICAqXG4gICAqICAgICBleHBlY3QoYWRkVHdvKS50by5pbmNyZWFzZShteU9iaiwgJ3ZhbCcpLmJ5KDIpO1xuICAgKlxuICAgKiBXaGVuIGZvbGxvd2luZyBhIGAuZGVjcmVhc2VgIGFzc2VydGlvbiBpbiB0aGUgY2hhaW4sIGAuYnlgIGFzc2VydHMgdGhhdCB0aGVcbiAgICogc3ViamVjdCBvZiB0aGUgYC5kZWNyZWFzZWAgYXNzZXJ0aW9uIGRlY3JlYXNlZCBieSB0aGUgZ2l2ZW4gYGRlbHRhYC5cbiAgICpcbiAgICogICAgIHZhciBteU9iaiA9IHt2YWw6IDF9XG4gICAqICAgICAgICwgc3VidHJhY3RUd28gPSBmdW5jdGlvbiAoKSB7IG15T2JqLnZhbCAtPSAyOyB9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KHN1YnRyYWN0VHdvKS50by5kZWNyZWFzZShteU9iaiwgJ3ZhbCcpLmJ5KDIpO1xuICAgKlxuICAgKiBXaGVuIGZvbGxvd2luZyBhIGAuY2hhbmdlYCBhc3NlcnRpb24gaW4gdGhlIGNoYWluLCBgLmJ5YCBhc3NlcnRzIHRoYXQgdGhlXG4gICAqIHN1YmplY3Qgb2YgdGhlIGAuY2hhbmdlYCBhc3NlcnRpb24gZWl0aGVyIGluY3JlYXNlZCBvciBkZWNyZWFzZWQgYnkgdGhlXG4gICAqIGdpdmVuIGBkZWx0YWAuIEhvd2V2ZXIsIGl0J3MgZGFuZ2Vyb3VzIHRvIHVzZSBgLmNoYW5nZS5ieWAuIFRoZSBwcm9ibGVtIGlzXG4gICAqIHRoYXQgaXQgY3JlYXRlcyB1bmNlcnRhaW4gZXhwZWN0YXRpb25zLiBJdCdzIG9mdGVuIGJlc3QgdG8gaWRlbnRpZnkgdGhlXG4gICAqIGV4YWN0IG91dHB1dCB0aGF0J3MgZXhwZWN0ZWQsIGFuZCB0aGVuIHdyaXRlIGFuIGFzc2VydGlvbiB0aGF0IG9ubHkgYWNjZXB0c1xuICAgKiB0aGF0IGV4YWN0IG91dHB1dC5cbiAgICpcbiAgICogICAgIHZhciBteU9iaiA9IHt2YWw6IDF9XG4gICAqICAgICAgICwgYWRkVHdvID0gZnVuY3Rpb24gKCkgeyBteU9iai52YWwgKz0gMjsgfVxuICAgKiAgICAgICAsIHN1YnRyYWN0VHdvID0gZnVuY3Rpb24gKCkgeyBteU9iai52YWwgLT0gMjsgfTtcbiAgICpcbiAgICogICAgIGV4cGVjdChhZGRUd28pLnRvLmluY3JlYXNlKG15T2JqLCAndmFsJykuYnkoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoYWRkVHdvKS50by5jaGFuZ2UobXlPYmosICd2YWwnKS5ieSgyKTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqICAgICBleHBlY3Qoc3VidHJhY3RUd28pLnRvLmRlY3JlYXNlKG15T2JqLCAndmFsJykuYnkoMik7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3Qoc3VidHJhY3RUd28pLnRvLmNoYW5nZShteU9iaiwgJ3ZhbCcpLmJ5KDIpOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5ieWAuIEhvd2V2ZXIsIGl0J3Mgb2Z0ZW4gYmVzdFxuICAgKiB0byBhc3NlcnQgdGhhdCB0aGUgc3ViamVjdCBjaGFuZ2VkIGJ5IGl0cyBleHBlY3RlZCBkZWx0YSwgcmF0aGVyIHRoYW5cbiAgICogYXNzZXJ0aW5nIHRoYXQgaXQgZGlkbid0IGNoYW5nZSBieSBvbmUgb2YgY291bnRsZXNzIHVuZXhwZWN0ZWQgZGVsdGFzLlxuICAgKlxuICAgKiAgICAgdmFyIG15T2JqID0ge3ZhbDogMX1cbiAgICogICAgICAgLCBhZGRUd28gPSBmdW5jdGlvbiAoKSB7IG15T2JqLnZhbCArPSAyOyB9O1xuICAgKlxuICAgKiAgICAgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChhZGRUd28pLnRvLmluY3JlYXNlKG15T2JqLCAndmFsJykuYnkoMik7XG4gICAqXG4gICAqICAgICAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdChhZGRUd28pLnRvLmluY3JlYXNlKG15T2JqLCAndmFsJykuYnV0Lm5vdC5ieSgzKTtcbiAgICpcbiAgICogYC5ieWAgYWNjZXB0cyBhbiBvcHRpb25hbCBgbXNnYCBhcmd1bWVudCB3aGljaCBpcyBhIGN1c3RvbSBlcnJvciBtZXNzYWdlIHRvXG4gICAqIHNob3cgd2hlbiB0aGUgYXNzZXJ0aW9uIGZhaWxzLiBUaGUgbWVzc2FnZSBjYW4gYWxzbyBiZSBnaXZlbiBhcyB0aGUgc2Vjb25kXG4gICAqIGFyZ3VtZW50IHRvIGBleHBlY3RgLlxuICAgKlxuICAgKiAgICAgdmFyIG15T2JqID0ge3ZhbDogMX1cbiAgICogICAgICAgLCBhZGRUd28gPSBmdW5jdGlvbiAoKSB7IG15T2JqLnZhbCArPSAyOyB9O1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGFkZFR3bykudG8uaW5jcmVhc2UobXlPYmosICd2YWwnKS5ieSgzLCAnbm9vbyB3aHkgZmFpbD8/Jyk7XG4gICAqICAgICBleHBlY3QoYWRkVHdvLCAnbm9vbyB3aHkgZmFpbD8/JykudG8uaW5jcmVhc2UobXlPYmosICd2YWwnKS5ieSgzKTtcbiAgICpcbiAgICogQG5hbWUgYnlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnREZWx0YShkZWx0YSwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG5cbiAgICB2YXIgbXNnT2JqID0gZmxhZyh0aGlzLCAnZGVsdGFNc2dPYmonKTtcbiAgICB2YXIgaW5pdGlhbCA9IGZsYWcodGhpcywgJ2luaXRpYWxEZWx0YVZhbHVlJyk7XG4gICAgdmFyIGZpbmFsID0gZmxhZyh0aGlzLCAnZmluYWxEZWx0YVZhbHVlJyk7XG4gICAgdmFyIGJlaGF2aW9yID0gZmxhZyh0aGlzLCAnZGVsdGFCZWhhdmlvcicpO1xuICAgIHZhciByZWFsRGVsdGEgPSBmbGFnKHRoaXMsICdyZWFsRGVsdGEnKTtcblxuICAgIHZhciBleHByZXNzaW9uO1xuICAgIGlmIChiZWhhdmlvciA9PT0gJ2NoYW5nZScpIHtcbiAgICAgIGV4cHJlc3Npb24gPSBNYXRoLmFicyhmaW5hbCAtIGluaXRpYWwpID09PSBNYXRoLmFicyhkZWx0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cHJlc3Npb24gPSByZWFsRGVsdGEgPT09IE1hdGguYWJzKGRlbHRhKTtcbiAgICB9XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGV4cHJlc3Npb25cbiAgICAgICwgJ2V4cGVjdGVkICcgKyBtc2dPYmogKyAnIHRvICcgKyBiZWhhdmlvciArICcgYnkgJyArIGRlbHRhXG4gICAgICAsICdleHBlY3RlZCAnICsgbXNnT2JqICsgJyB0byBub3QgJyArIGJlaGF2aW9yICsgJyBieSAnICsgZGVsdGFcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnYnknLCBhc3NlcnREZWx0YSk7XG5cbiAgLyoqXG4gICAqICMjIyAuZXh0ZW5zaWJsZVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBleHRlbnNpYmxlLCB3aGljaCBtZWFucyB0aGF0IG5ldyBwcm9wZXJ0aWVzIGNhblxuICAgKiBiZSBhZGRlZCB0byBpdC4gUHJpbWl0aXZlcyBhcmUgbmV2ZXIgZXh0ZW5zaWJsZS5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0pLnRvLmJlLmV4dGVuc2libGU7XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuZXh0ZW5zaWJsZWAuXG4gICAqXG4gICAqICAgICB2YXIgbm9uRXh0ZW5zaWJsZU9iamVjdCA9IE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSlcbiAgICogICAgICAgLCBzZWFsZWRPYmplY3QgPSBPYmplY3Quc2VhbCh7fSlcbiAgICogICAgICAgLCBmcm96ZW5PYmplY3QgPSBPYmplY3QuZnJlZXplKHt9KTtcbiAgICpcbiAgICogICAgIGV4cGVjdChub25FeHRlbnNpYmxlT2JqZWN0KS50by5ub3QuYmUuZXh0ZW5zaWJsZTtcbiAgICogICAgIGV4cGVjdChzZWFsZWRPYmplY3QpLnRvLm5vdC5iZS5leHRlbnNpYmxlO1xuICAgKiAgICAgZXhwZWN0KGZyb3plbk9iamVjdCkudG8ubm90LmJlLmV4dGVuc2libGU7XG4gICAqICAgICBleHBlY3QoMSkudG8ubm90LmJlLmV4dGVuc2libGU7XG4gICAqXG4gICAqIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UgY2FuIGJlIGdpdmVuIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYGV4cGVjdGAuXG4gICAqXG4gICAqICAgICBleHBlY3QoMSwgJ25vb28gd2h5IGZhaWw/PycpLnRvLmJlLmV4dGVuc2libGU7XG4gICAqXG4gICAqIEBuYW1lIGV4dGVuc2libGVcbiAgICogQG5hbWVzcGFjZSBCRERcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdleHRlbnNpYmxlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpO1xuXG4gICAgLy8gSW4gRVM1LCBpZiB0aGUgYXJndW1lbnQgdG8gdGhpcyBtZXRob2QgaXMgYSBwcmltaXRpdmUsIHRoZW4gaXQgd2lsbCBjYXVzZSBhIFR5cGVFcnJvci5cbiAgICAvLyBJbiBFUzYsIGEgbm9uLW9iamVjdCBhcmd1bWVudCB3aWxsIGJlIHRyZWF0ZWQgYXMgaWYgaXQgd2FzIGEgbm9uLWV4dGVuc2libGUgb3JkaW5hcnkgb2JqZWN0LCBzaW1wbHkgcmV0dXJuIGZhbHNlLlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc0V4dGVuc2libGVcbiAgICAvLyBUaGUgZm9sbG93aW5nIHByb3ZpZGVzIEVTNiBiZWhhdmlvciBmb3IgRVM1IGVudmlyb25tZW50cy5cblxuICAgIHZhciBpc0V4dGVuc2libGUgPSBvYmogPT09IE9iamVjdChvYmopICYmIE9iamVjdC5pc0V4dGVuc2libGUob2JqKTtcblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgaXNFeHRlbnNpYmxlXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGV4dGVuc2libGUnXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBleHRlbnNpYmxlJ1xuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLnNlYWxlZFxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBzZWFsZWQsIHdoaWNoIG1lYW5zIHRoYXQgbmV3IHByb3BlcnRpZXMgY2FuJ3QgYmVcbiAgICogYWRkZWQgdG8gaXQsIGFuZCBpdHMgZXhpc3RpbmcgcHJvcGVydGllcyBjYW4ndCBiZSByZWNvbmZpZ3VyZWQgb3IgZGVsZXRlZC5cbiAgICogSG93ZXZlciwgaXQncyBwb3NzaWJsZSB0aGF0IGl0cyBleGlzdGluZyBwcm9wZXJ0aWVzIGNhbiBzdGlsbCBiZSByZWFzc2lnbmVkXG4gICAqIHRvIGRpZmZlcmVudCB2YWx1ZXMuIFByaW1pdGl2ZXMgYXJlIGFsd2F5cyBzZWFsZWQuXG4gICAqXG4gICAqICAgICB2YXIgc2VhbGVkT2JqZWN0ID0gT2JqZWN0LnNlYWwoe30pO1xuICAgKiAgICAgdmFyIGZyb3plbk9iamVjdCA9IE9iamVjdC5mcmVlemUoe30pO1xuICAgKlxuICAgKiAgICAgZXhwZWN0KHNlYWxlZE9iamVjdCkudG8uYmUuc2VhbGVkO1xuICAgKiAgICAgZXhwZWN0KGZyb3plbk9iamVjdCkudG8uYmUuc2VhbGVkO1xuICAgKiAgICAgZXhwZWN0KDEpLnRvLmJlLnNlYWxlZDtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5zZWFsZWRgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8ubm90LmJlLnNlYWxlZDtcbiAgICpcbiAgICogQSBjdXN0b20gZXJyb3IgbWVzc2FnZSBjYW4gYmUgZ2l2ZW4gYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0sICdub29vIHdoeSBmYWlsPz8nKS50by5iZS5zZWFsZWQ7XG4gICAqXG4gICAqIEBuYW1lIHNlYWxlZFxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ3NlYWxlZCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcblxuICAgIC8vIEluIEVTNSwgaWYgdGhlIGFyZ3VtZW50IHRvIHRoaXMgbWV0aG9kIGlzIGEgcHJpbWl0aXZlLCB0aGVuIGl0IHdpbGwgY2F1c2UgYSBUeXBlRXJyb3IuXG4gICAgLy8gSW4gRVM2LCBhIG5vbi1vYmplY3QgYXJndW1lbnQgd2lsbCBiZSB0cmVhdGVkIGFzIGlmIGl0IHdhcyBhIHNlYWxlZCBvcmRpbmFyeSBvYmplY3QsIHNpbXBseSByZXR1cm4gdHJ1ZS5cbiAgICAvLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzU2VhbGVkXG4gICAgLy8gVGhlIGZvbGxvd2luZyBwcm92aWRlcyBFUzYgYmVoYXZpb3IgZm9yIEVTNSBlbnZpcm9ubWVudHMuXG5cbiAgICB2YXIgaXNTZWFsZWQgPSBvYmogPT09IE9iamVjdChvYmopID8gT2JqZWN0LmlzU2VhbGVkKG9iaikgOiB0cnVlO1xuXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBpc1NlYWxlZFxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBzZWFsZWQnXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBzZWFsZWQnXG4gICAgKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuZnJvemVuXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGZyb3plbiwgd2hpY2ggbWVhbnMgdGhhdCBuZXcgcHJvcGVydGllcyBjYW4ndCBiZVxuICAgKiBhZGRlZCB0byBpdCwgYW5kIGl0cyBleGlzdGluZyBwcm9wZXJ0aWVzIGNhbid0IGJlIHJlYXNzaWduZWQgdG8gZGlmZmVyZW50XG4gICAqIHZhbHVlcywgcmVjb25maWd1cmVkLCBvciBkZWxldGVkLiBQcmltaXRpdmVzIGFyZSBhbHdheXMgZnJvemVuLlxuICAgKlxuICAgKiAgICAgdmFyIGZyb3plbk9iamVjdCA9IE9iamVjdC5mcmVlemUoe30pO1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGZyb3plbk9iamVjdCkudG8uYmUuZnJvemVuO1xuICAgKiAgICAgZXhwZWN0KDEpLnRvLmJlLmZyb3plbjtcbiAgICpcbiAgICogQWRkIGAubm90YCBlYXJsaWVyIGluIHRoZSBjaGFpbiB0byBuZWdhdGUgYC5mcm96ZW5gLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHthOiAxfSkudG8ubm90LmJlLmZyb3plbjtcbiAgICpcbiAgICogQSBjdXN0b20gZXJyb3IgbWVzc2FnZSBjYW4gYmUgZ2l2ZW4gYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCh7YTogMX0sICdub29vIHdoeSBmYWlsPz8nKS50by5iZS5mcm96ZW47XG4gICAqXG4gICAqIEBuYW1lIGZyb3plblxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ2Zyb3plbicsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcblxuICAgIC8vIEluIEVTNSwgaWYgdGhlIGFyZ3VtZW50IHRvIHRoaXMgbWV0aG9kIGlzIGEgcHJpbWl0aXZlLCB0aGVuIGl0IHdpbGwgY2F1c2UgYSBUeXBlRXJyb3IuXG4gICAgLy8gSW4gRVM2LCBhIG5vbi1vYmplY3QgYXJndW1lbnQgd2lsbCBiZSB0cmVhdGVkIGFzIGlmIGl0IHdhcyBhIGZyb3plbiBvcmRpbmFyeSBvYmplY3QsIHNpbXBseSByZXR1cm4gdHJ1ZS5cbiAgICAvLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzRnJvemVuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBwcm92aWRlcyBFUzYgYmVoYXZpb3IgZm9yIEVTNSBlbnZpcm9ubWVudHMuXG5cbiAgICB2YXIgaXNGcm96ZW4gPSBvYmogPT09IE9iamVjdChvYmopID8gT2JqZWN0LmlzRnJvemVuKG9iaikgOiB0cnVlO1xuXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBpc0Zyb3plblxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBmcm96ZW4nXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBmcm96ZW4nXG4gICAgKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqICMjIyAuZmluaXRlXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGEgbnVtYmVyLCBhbmQgaXNuJ3QgYE5hTmAgb3IgcG9zaXRpdmUvbmVnYXRpdmVcbiAgICogYEluZmluaXR5YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxKS50by5iZS5maW5pdGU7XG4gICAqXG4gICAqIEFkZCBgLm5vdGAgZWFybGllciBpbiB0aGUgY2hhaW4gdG8gbmVnYXRlIGAuZmluaXRlYC4gSG93ZXZlciwgaXQnc1xuICAgKiBkYW5nZXJvdXMgdG8gZG8gc28uIFRoZSBwcm9ibGVtIGlzIHRoYXQgaXQgY3JlYXRlcyB1bmNlcnRhaW4gZXhwZWN0YXRpb25zXG4gICAqIGJ5IGFzc2VydGluZyB0aGF0IHRoZSBzdWJqZWN0IGVpdGhlciBpc24ndCBhIG51bWJlciwgb3IgdGhhdCBpdCdzIGBOYU5gLCBvclxuICAgKiB0aGF0IGl0J3MgcG9zaXRpdmUgYEluZmluaXR5YCwgb3IgdGhhdCBpdCdzIG5lZ2F0aXZlIGBJbmZpbml0eWAuIEl0J3Mgb2Z0ZW5cbiAgICogYmVzdCB0byBpZGVudGlmeSB0aGUgZXhhY3Qgb3V0cHV0IHRoYXQncyBleHBlY3RlZCwgYW5kIHRoZW4gd3JpdGUgYW5cbiAgICogYXNzZXJ0aW9uIHRoYXQgb25seSBhY2NlcHRzIHRoYXQgZXhhY3Qgb3V0cHV0LlxuICAgKlxuICAgKiBXaGVuIHRoZSB0YXJnZXQgaXNuJ3QgZXhwZWN0ZWQgdG8gYmUgYSBudW1iZXIsIGl0J3Mgb2Z0ZW4gYmVzdCB0byBhc3NlcnRcbiAgICogdGhhdCBpdCdzIHRoZSBleHBlY3RlZCB0eXBlLCByYXRoZXIgdGhhbiBhc3NlcnRpbmcgdGhhdCBpdCBpc24ndCBvbmUgb2ZcbiAgICogbWFueSB1bmV4cGVjdGVkIHR5cGVzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5iZS5hKCdzdHJpbmcnKTsgLy8gUmVjb21tZW5kZWRcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8ubm90LmJlLmZpbml0ZTsgLy8gTm90IHJlY29tbWVuZGVkXG4gICAqXG4gICAqIFdoZW4gdGhlIHRhcmdldCBpcyBleHBlY3RlZCB0byBiZSBgTmFOYCwgaXQncyBvZnRlbiBiZXN0IHRvIGFzc2VydCBleGFjdGx5XG4gICAqIHRoYXQuXG4gICAqXG4gICAqICAgICBleHBlY3QoTmFOKS50by5iZS5OYU47IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoTmFOKS50by5ub3QuYmUuZmluaXRlOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIGV4cGVjdGVkIHRvIGJlIHBvc2l0aXZlIGluZmluaXR5LCBpdCdzIG9mdGVuIGJlc3QgdG9cbiAgICogYXNzZXJ0IGV4YWN0bHkgdGhhdC5cbiAgICpcbiAgICogICAgIGV4cGVjdChJbmZpbml0eSkudG8uZXF1YWwoSW5maW5pdHkpOyAvLyBSZWNvbW1lbmRlZFxuICAgKiAgICAgZXhwZWN0KEluZmluaXR5KS50by5ub3QuYmUuZmluaXRlOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIGV4cGVjdGVkIHRvIGJlIG5lZ2F0aXZlIGluZmluaXR5LCBpdCdzIG9mdGVuIGJlc3QgdG9cbiAgICogYXNzZXJ0IGV4YWN0bHkgdGhhdC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgtSW5maW5pdHkpLnRvLmVxdWFsKC1JbmZpbml0eSk7IC8vIFJlY29tbWVuZGVkXG4gICAqICAgICBleHBlY3QoLUluZmluaXR5KS50by5ub3QuYmUuZmluaXRlOyAvLyBOb3QgcmVjb21tZW5kZWRcbiAgICpcbiAgICogQSBjdXN0b20gZXJyb3IgbWVzc2FnZSBjYW4gYmUgZ2l2ZW4gYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBgZXhwZWN0YC5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vJywgJ25vb28gd2h5IGZhaWw/PycpLnRvLmJlLmZpbml0ZTtcbiAgICpcbiAgICogQG5hbWUgZmluaXRlXG4gICAqIEBuYW1lc3BhY2UgQkREXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnZmluaXRlJywgZnVuY3Rpb24obXNnKSB7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpO1xuXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIHR5cGVvZiBvYmogPT09ICdudW1iZXInICYmIGlzRmluaXRlKG9iailcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYSBmaW5pdGUgbnVtYmVyJ1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgYSBmaW5pdGUgbnVtYmVyJ1xuICAgICk7XG4gIH0pO1xufTtcbiIsIi8qIVxuICogY2hhaVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNoYWksIHV0aWwpIHtcbiAgLyohXG4gICAqIENoYWkgZGVwZW5kZW5jaWVzLlxuICAgKi9cblxuICB2YXIgQXNzZXJ0aW9uID0gY2hhaS5Bc3NlcnRpb25cbiAgICAsIGZsYWcgPSB1dGlsLmZsYWc7XG5cbiAgLyohXG4gICAqIE1vZHVsZSBleHBvcnQuXG4gICAqL1xuXG4gIC8qKlxuICAgKiAjIyMgYXNzZXJ0KGV4cHJlc3Npb24sIG1lc3NhZ2UpXG4gICAqXG4gICAqIFdyaXRlIHlvdXIgb3duIHRlc3QgZXhwcmVzc2lvbnMuXG4gICAqXG4gICAqICAgICBhc3NlcnQoJ2ZvbycgIT09ICdiYXInLCAnZm9vIGlzIG5vdCBiYXInKTtcbiAgICogICAgIGFzc2VydChBcnJheS5pc0FycmF5KFtdKSwgJ2VtcHR5IGFycmF5cyBhcmUgYXJyYXlzJyk7XG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cHJlc3Npb24gdG8gdGVzdCBmb3IgdHJ1dGhpbmVzc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSB0byBkaXNwbGF5IG9uIGVycm9yXG4gICAqIEBuYW1lIGFzc2VydFxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB2YXIgYXNzZXJ0ID0gY2hhaS5hc3NlcnQgPSBmdW5jdGlvbiAoZXhwcmVzcywgZXJybXNnKSB7XG4gICAgdmFyIHRlc3QgPSBuZXcgQXNzZXJ0aW9uKG51bGwsIG51bGwsIGNoYWkuYXNzZXJ0LCB0cnVlKTtcbiAgICB0ZXN0LmFzc2VydChcbiAgICAgICAgZXhwcmVzc1xuICAgICAgLCBlcnJtc2dcbiAgICAgICwgJ1sgbmVnYXRpb24gbWVzc2FnZSB1bmF2YWlsYWJsZSBdJ1xuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuZmFpbChbbWVzc2FnZV0pXG4gICAqICMjIyAuZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBbbWVzc2FnZV0sIFtvcGVyYXRvcl0pXG4gICAqXG4gICAqIFRocm93IGEgZmFpbHVyZS4gTm9kZS5qcyBgYXNzZXJ0YCBtb2R1bGUtY29tcGF0aWJsZS5cbiAgICpcbiAgICogICAgIGFzc2VydC5mYWlsKCk7XG4gICAqICAgICBhc3NlcnQuZmFpbChcImN1c3RvbSBlcnJvciBtZXNzYWdlXCIpO1xuICAgKiAgICAgYXNzZXJ0LmZhaWwoMSwgMik7XG4gICAqICAgICBhc3NlcnQuZmFpbCgxLCAyLCBcImN1c3RvbSBlcnJvciBtZXNzYWdlXCIpO1xuICAgKiAgICAgYXNzZXJ0LmZhaWwoMSwgMiwgXCJjdXN0b20gZXJyb3IgbWVzc2FnZVwiLCBcIj5cIik7XG4gICAqICAgICBhc3NlcnQuZmFpbCgxLCAyLCB1bmRlZmluZWQsIFwiPlwiKTtcbiAgICpcbiAgICogQG5hbWUgZmFpbFxuICAgKiBAcGFyYW0ge01peGVkfSBhY3R1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gZXhwZWN0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wZXJhdG9yXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5mYWlsID0gZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICAgIC8vIENvbXBseSB3aXRoIE5vZGUncyBmYWlsKFttZXNzYWdlXSkgaW50ZXJmYWNlXG5cbiAgICAgICAgbWVzc2FnZSA9IGFjdHVhbDtcbiAgICAgICAgYWN0dWFsID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIG1lc3NhZ2UgPSBtZXNzYWdlIHx8ICdhc3NlcnQuZmFpbCgpJztcbiAgICB0aHJvdyBuZXcgY2hhaS5Bc3NlcnRpb25FcnJvcihtZXNzYWdlLCB7XG4gICAgICAgIGFjdHVhbDogYWN0dWFsXG4gICAgICAsIGV4cGVjdGVkOiBleHBlY3RlZFxuICAgICAgLCBvcGVyYXRvcjogb3BlcmF0b3JcbiAgICB9LCBhc3NlcnQuZmFpbCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNPayhvYmplY3QsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGlzIHRydXRoeS5cbiAgICpcbiAgICogICAgIGFzc2VydC5pc09rKCdldmVyeXRoaW5nJywgJ2V2ZXJ5dGhpbmcgaXMgb2snKTtcbiAgICogICAgIGFzc2VydC5pc09rKGZhbHNlLCAndGhpcyB3aWxsIGZhaWwnKTtcbiAgICpcbiAgICogQG5hbWUgaXNPa1xuICAgKiBAYWxpYXMgb2tcbiAgICogQHBhcmFtIHtNaXhlZH0gb2JqZWN0IHRvIHRlc3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzT2sgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNPaywgdHJ1ZSkuaXMub2s7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOb3RPayhvYmplY3QsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGlzIGZhbHN5LlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzTm90T2soJ2V2ZXJ5dGhpbmcnLCAndGhpcyB3aWxsIGZhaWwnKTtcbiAgICogICAgIGFzc2VydC5pc05vdE9rKGZhbHNlLCAndGhpcyB3aWxsIHBhc3MnKTtcbiAgICpcbiAgICogQG5hbWUgaXNOb3RPa1xuICAgKiBAYWxpYXMgbm90T2tcbiAgICogQHBhcmFtIHtNaXhlZH0gb2JqZWN0IHRvIHRlc3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTm90T2sgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RPaywgdHJ1ZSkuaXMubm90Lm9rO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyBub24tc3RyaWN0IGVxdWFsaXR5IChgPT1gKSBvZiBgYWN0dWFsYCBhbmQgYGV4cGVjdGVkYC5cbiAgICpcbiAgICogICAgIGFzc2VydC5lcXVhbCgzLCAnMycsICc9PSBjb2VyY2VzIHZhbHVlcyB0byBzdHJpbmdzJyk7XG4gICAqXG4gICAqIEBuYW1lIGVxdWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGFjdHVhbFxuICAgKiBAcGFyYW0ge01peGVkfSBleHBlY3RlZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZXF1YWwgPSBmdW5jdGlvbiAoYWN0LCBleHAsIG1zZykge1xuICAgIHZhciB0ZXN0ID0gbmV3IEFzc2VydGlvbihhY3QsIG1zZywgYXNzZXJ0LmVxdWFsLCB0cnVlKTtcblxuICAgIHRlc3QuYXNzZXJ0KFxuICAgICAgICBleHAgPT0gZmxhZyh0ZXN0LCAnb2JqZWN0JylcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gZXF1YWwgI3tleHB9J1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgZXF1YWwgI3thY3R9J1xuICAgICAgLCBleHBcbiAgICAgICwgYWN0XG4gICAgICAsIHRydWVcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyBub24tc3RyaWN0IGluZXF1YWxpdHkgKGAhPWApIG9mIGBhY3R1YWxgIGFuZCBgZXhwZWN0ZWRgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdEVxdWFsKDMsIDQsICd0aGVzZSBudW1iZXJzIGFyZSBub3QgZXF1YWwnKTtcbiAgICpcbiAgICogQG5hbWUgbm90RXF1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RFcXVhbCA9IGZ1bmN0aW9uIChhY3QsIGV4cCwgbXNnKSB7XG4gICAgdmFyIHRlc3QgPSBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQubm90RXF1YWwsIHRydWUpO1xuXG4gICAgdGVzdC5hc3NlcnQoXG4gICAgICAgIGV4cCAhPSBmbGFnKHRlc3QsICdvYmplY3QnKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgZXF1YWwgI3tleHB9J1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBlcXVhbCAje2FjdH0nXG4gICAgICAsIGV4cFxuICAgICAgLCBhY3RcbiAgICAgICwgdHJ1ZVxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHN0cmljdCBlcXVhbGl0eSAoYD09PWApIG9mIGBhY3R1YWxgIGFuZCBgZXhwZWN0ZWRgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRydWUsIHRydWUsICd0aGVzZSBib29sZWFucyBhcmUgc3RyaWN0bHkgZXF1YWwnKTtcbiAgICpcbiAgICogQG5hbWUgc3RyaWN0RXF1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5zdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIChhY3QsIGV4cCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihhY3QsIG1zZywgYXNzZXJ0LnN0cmljdEVxdWFsLCB0cnVlKS50by5lcXVhbChleHApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyBzdHJpY3QgaW5lcXVhbGl0eSAoYCE9PWApIG9mIGBhY3R1YWxgIGFuZCBgZXhwZWN0ZWRgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKDMsICczJywgJ25vIGNvZXJjaW9uIGZvciBzdHJpY3QgZXF1YWxpdHknKTtcbiAgICpcbiAgICogQG5hbWUgbm90U3RyaWN0RXF1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIChhY3QsIGV4cCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihhY3QsIG1zZywgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsLCB0cnVlKS50by5ub3QuZXF1YWwoZXhwKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYGFjdHVhbGAgaXMgZGVlcGx5IGVxdWFsIHRvIGBleHBlY3RlZGAuXG4gICAqXG4gICAqICAgICBhc3NlcnQuZGVlcEVxdWFsKHsgdGVhOiAnZ3JlZW4nIH0sIHsgdGVhOiAnZ3JlZW4nIH0pO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwRXF1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhbGlhcyBkZWVwU3RyaWN0RXF1YWxcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRlZXBFcXVhbCA9IGFzc2VydC5kZWVwU3RyaWN0RXF1YWwgPSBmdW5jdGlvbiAoYWN0LCBleHAsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oYWN0LCBtc2csIGFzc2VydC5kZWVwRXF1YWwsIHRydWUpLnRvLmVxbChleHApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydCB0aGF0IGBhY3R1YWxgIGlzIG5vdCBkZWVwbHkgZXF1YWwgdG8gYGV4cGVjdGVkYC5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3REZWVwRXF1YWwoeyB0ZWE6ICdncmVlbicgfSwgeyB0ZWE6ICdqYXNtaW5lJyB9KTtcbiAgICpcbiAgICogQG5hbWUgbm90RGVlcEVxdWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGFjdHVhbFxuICAgKiBAcGFyYW0ge01peGVkfSBleHBlY3RlZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90RGVlcEVxdWFsID0gZnVuY3Rpb24gKGFjdCwgZXhwLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQubm90RGVlcEVxdWFsLCB0cnVlKS50by5ub3QuZXFsKGV4cCk7XG4gIH07XG5cbiAgIC8qKlxuICAgKiAjIyMgLmlzQWJvdmUodmFsdWVUb0NoZWNrLCB2YWx1ZVRvQmVBYm92ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIGB2YWx1ZVRvQ2hlY2tgIGlzIHN0cmljdGx5IGdyZWF0ZXIgdGhhbiAoPikgYHZhbHVlVG9CZUFib3ZlYC5cbiAgICpcbiAgICogICAgIGFzc2VydC5pc0Fib3ZlKDUsIDIsICc1IGlzIHN0cmljdGx5IGdyZWF0ZXIgdGhhbiAyJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzQWJvdmVcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVUb0NoZWNrXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlVG9CZUFib3ZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc0Fib3ZlID0gZnVuY3Rpb24gKHZhbCwgYWJ2LCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNBYm92ZSwgdHJ1ZSkudG8uYmUuYWJvdmUoYWJ2KTtcbiAgfTtcblxuICAgLyoqXG4gICAqICMjIyAuaXNBdExlYXN0KHZhbHVlVG9DaGVjaywgdmFsdWVUb0JlQXRMZWFzdCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIGB2YWx1ZVRvQ2hlY2tgIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAoPj0pIGB2YWx1ZVRvQmVBdExlYXN0YC5cbiAgICpcbiAgICogICAgIGFzc2VydC5pc0F0TGVhc3QoNSwgMiwgJzUgaXMgZ3JlYXRlciBvciBlcXVhbCB0byAyJyk7XG4gICAqICAgICBhc3NlcnQuaXNBdExlYXN0KDMsIDMsICczIGlzIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMycpO1xuICAgKlxuICAgKiBAbmFtZSBpc0F0TGVhc3RcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVUb0NoZWNrXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlVG9CZUF0TGVhc3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzQXRMZWFzdCA9IGZ1bmN0aW9uICh2YWwsIGF0bHN0LCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNBdExlYXN0LCB0cnVlKS50by5iZS5sZWFzdChhdGxzdCk7XG4gIH07XG5cbiAgIC8qKlxuICAgKiAjIyMgLmlzQmVsb3codmFsdWVUb0NoZWNrLCB2YWx1ZVRvQmVCZWxvdywgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIGB2YWx1ZVRvQ2hlY2tgIGlzIHN0cmljdGx5IGxlc3MgdGhhbiAoPCkgYHZhbHVlVG9CZUJlbG93YC5cbiAgICpcbiAgICogICAgIGFzc2VydC5pc0JlbG93KDMsIDYsICczIGlzIHN0cmljdGx5IGxlc3MgdGhhbiA2Jyk7XG4gICAqXG4gICAqIEBuYW1lIGlzQmVsb3dcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVUb0NoZWNrXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlVG9CZUJlbG93XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc0JlbG93ID0gZnVuY3Rpb24gKHZhbCwgYmx3LCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNCZWxvdywgdHJ1ZSkudG8uYmUuYmVsb3coYmx3KTtcbiAgfTtcblxuICAgLyoqXG4gICAqICMjIyAuaXNBdE1vc3QodmFsdWVUb0NoZWNrLCB2YWx1ZVRvQmVBdE1vc3QsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyBgdmFsdWVUb0NoZWNrYCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gKDw9KSBgdmFsdWVUb0JlQXRNb3N0YC5cbiAgICpcbiAgICogICAgIGFzc2VydC5pc0F0TW9zdCgzLCA2LCAnMyBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gNicpO1xuICAgKiAgICAgYXNzZXJ0LmlzQXRNb3N0KDQsIDQsICc0IGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byA0Jyk7XG4gICAqXG4gICAqIEBuYW1lIGlzQXRNb3N0XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlVG9DaGVja1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVRvQmVBdE1vc3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzQXRNb3N0ID0gZnVuY3Rpb24gKHZhbCwgYXRtc3QsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0F0TW9zdCwgdHJ1ZSkudG8uYmUubW9zdChhdG1zdCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNUcnVlKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIHRydWUuXG4gICAqXG4gICAqICAgICB2YXIgdGVhU2VydmVkID0gdHJ1ZTtcbiAgICogICAgIGFzc2VydC5pc1RydWUodGVhU2VydmVkLCAndGhlIHRlYSBoYXMgYmVlbiBzZXJ2ZWQnKTtcbiAgICpcbiAgICogQG5hbWUgaXNUcnVlXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc1RydWUgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNUcnVlLCB0cnVlKS5pc1sndHJ1ZSddO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90VHJ1ZSh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBub3QgdHJ1ZS5cbiAgICpcbiAgICogICAgIHZhciB0ZWEgPSAndGFzdHkgY2hhaSc7XG4gICAqICAgICBhc3NlcnQuaXNOb3RUcnVlKHRlYSwgJ2dyZWF0LCB0aW1lIGZvciB0ZWEhJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90VHJ1ZVxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOb3RUcnVlID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90VHJ1ZSwgdHJ1ZSkudG8ubm90LmVxdWFsKHRydWUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzRmFsc2UodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgZmFsc2UuXG4gICAqXG4gICAqICAgICB2YXIgdGVhU2VydmVkID0gZmFsc2U7XG4gICAqICAgICBhc3NlcnQuaXNGYWxzZSh0ZWFTZXJ2ZWQsICdubyB0ZWEgeWV0PyBobW0uLi4nKTtcbiAgICpcbiAgICogQG5hbWUgaXNGYWxzZVxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNGYWxzZSA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0ZhbHNlLCB0cnVlKS5pc1snZmFsc2UnXTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc05vdEZhbHNlKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIG5vdCBmYWxzZS5cbiAgICpcbiAgICogICAgIHZhciB0ZWEgPSAndGFzdHkgY2hhaSc7XG4gICAqICAgICBhc3NlcnQuaXNOb3RGYWxzZSh0ZWEsICdncmVhdCwgdGltZSBmb3IgdGVhIScpO1xuICAgKlxuICAgKiBAbmFtZSBpc05vdEZhbHNlXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdEZhbHNlID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90RmFsc2UsIHRydWUpLnRvLm5vdC5lcXVhbChmYWxzZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOdWxsKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIG51bGwuXG4gICAqXG4gICAqICAgICBhc3NlcnQuaXNOdWxsKGVyciwgJ3RoZXJlIHdhcyBubyBlcnJvcicpO1xuICAgKlxuICAgKiBAbmFtZSBpc051bGxcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTnVsbCA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc051bGwsIHRydWUpLnRvLmVxdWFsKG51bGwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90TnVsbCh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBub3QgbnVsbC5cbiAgICpcbiAgICogICAgIHZhciB0ZWEgPSAndGFzdHkgY2hhaSc7XG4gICAqICAgICBhc3NlcnQuaXNOb3ROdWxsKHRlYSwgJ2dyZWF0LCB0aW1lIGZvciB0ZWEhJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90TnVsbFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOb3ROdWxsID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90TnVsbCwgdHJ1ZSkudG8ubm90LmVxdWFsKG51bGwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTmFOXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB2YWx1ZSBpcyBOYU4uXG4gICAqXG4gICAqICAgICBhc3NlcnQuaXNOYU4oTmFOLCAnTmFOIGlzIE5hTicpO1xuICAgKlxuICAgKiBAbmFtZSBpc05hTlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOYU4gPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOYU4sIHRydWUpLnRvLmJlLk5hTjtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc05vdE5hTlxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdmFsdWUgaXMgbm90IE5hTi5cbiAgICpcbiAgICogICAgIGFzc2VydC5pc05vdE5hTig0LCAnNCBpcyBub3QgTmFOJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90TmFOXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuICBhc3NlcnQuaXNOb3ROYU4gPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3ROYU4sIHRydWUpLm5vdC50by5iZS5OYU47XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuZXhpc3RzXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIG5laXRoZXIgYG51bGxgIG5vciBgdW5kZWZpbmVkYC5cbiAgICpcbiAgICogICAgIHZhciBmb28gPSAnaGknO1xuICAgKlxuICAgKiAgICAgYXNzZXJ0LmV4aXN0cyhmb28sICdmb28gaXMgbmVpdGhlciBgbnVsbGAgbm9yIGB1bmRlZmluZWRgJyk7XG4gICAqXG4gICAqIEBuYW1lIGV4aXN0c1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZXhpc3RzID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmV4aXN0cywgdHJ1ZSkudG8uZXhpc3Q7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90RXhpc3RzXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGVpdGhlciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAuXG4gICAqXG4gICAqICAgICB2YXIgYmFyID0gbnVsbFxuICAgKiAgICAgICAsIGJhejtcbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RFeGlzdHMoYmFyKTtcbiAgICogICAgIGFzc2VydC5ub3RFeGlzdHMoYmF6LCAnYmF6IGlzIGVpdGhlciBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgKlxuICAgKiBAbmFtZSBub3RFeGlzdHNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdEV4aXN0cyA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5ub3RFeGlzdHMsIHRydWUpLnRvLm5vdC5leGlzdDtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc1VuZGVmaW5lZCh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBgdW5kZWZpbmVkYC5cbiAgICpcbiAgICogICAgIHZhciB0ZWE7XG4gICAqICAgICBhc3NlcnQuaXNVbmRlZmluZWQodGVhLCAnbm8gdGVhIGRlZmluZWQnKTtcbiAgICpcbiAgICogQG5hbWUgaXNVbmRlZmluZWRcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzVW5kZWZpbmVkID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzVW5kZWZpbmVkLCB0cnVlKS50by5lcXVhbCh1bmRlZmluZWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzRGVmaW5lZCh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBub3QgYHVuZGVmaW5lZGAuXG4gICAqXG4gICAqICAgICB2YXIgdGVhID0gJ2N1cCBvZiBjaGFpJztcbiAgICogICAgIGFzc2VydC5pc0RlZmluZWQodGVhLCAndGVhIGhhcyBiZWVuIGRlZmluZWQnKTtcbiAgICpcbiAgICogQG5hbWUgaXNEZWZpbmVkXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc0RlZmluZWQgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNEZWZpbmVkLCB0cnVlKS50by5ub3QuZXF1YWwodW5kZWZpbmVkKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc0Z1bmN0aW9uKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIGEgZnVuY3Rpb24uXG4gICAqXG4gICAqICAgICBmdW5jdGlvbiBzZXJ2ZVRlYSgpIHsgcmV0dXJuICdjdXAgb2YgdGVhJzsgfTtcbiAgICogICAgIGFzc2VydC5pc0Z1bmN0aW9uKHNlcnZlVGVhLCAnZ3JlYXQsIHdlIGNhbiBoYXZlIHRlYSBub3cnKTtcbiAgICpcbiAgICogQG5hbWUgaXNGdW5jdGlvblxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0Z1bmN0aW9uLCB0cnVlKS50by5iZS5hKCdmdW5jdGlvbicpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90RnVuY3Rpb24odmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgX25vdF8gYSBmdW5jdGlvbi5cbiAgICpcbiAgICogICAgIHZhciBzZXJ2ZVRlYSA9IFsgJ2hlYXQnLCAncG91cicsICdzaXAnIF07XG4gICAqICAgICBhc3NlcnQuaXNOb3RGdW5jdGlvbihzZXJ2ZVRlYSwgJ2dyZWF0LCB3ZSBoYXZlIGxpc3RlZCB0aGUgc3RlcHMnKTtcbiAgICpcbiAgICogQG5hbWUgaXNOb3RGdW5jdGlvblxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOb3RGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdEZ1bmN0aW9uLCB0cnVlKS50by5ub3QuYmUuYSgnZnVuY3Rpb24nKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc09iamVjdCh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBhbiBvYmplY3Qgb2YgdHlwZSAnT2JqZWN0JyAoYXMgcmV2ZWFsZWQgYnkgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgKS5cbiAgICogX1RoZSBhc3NlcnRpb24gZG9lcyBub3QgbWF0Y2ggc3ViY2xhc3NlZCBvYmplY3RzLl9cbiAgICpcbiAgICogICAgIHZhciBzZWxlY3Rpb24gPSB7IG5hbWU6ICdDaGFpJywgc2VydmU6ICd3aXRoIHNwaWNlcycgfTtcbiAgICogICAgIGFzc2VydC5pc09iamVjdChzZWxlY3Rpb24sICd0ZWEgc2VsZWN0aW9uIGlzIGFuIG9iamVjdCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc09iamVjdFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNPYmplY3QgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNPYmplY3QsIHRydWUpLnRvLmJlLmEoJ29iamVjdCcpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90T2JqZWN0KHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIF9ub3RfIGFuIG9iamVjdCBvZiB0eXBlICdPYmplY3QnIChhcyByZXZlYWxlZCBieSBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2ApLlxuICAgKlxuICAgKiAgICAgdmFyIHNlbGVjdGlvbiA9ICdjaGFpJ1xuICAgKiAgICAgYXNzZXJ0LmlzTm90T2JqZWN0KHNlbGVjdGlvbiwgJ3RlYSBzZWxlY3Rpb24gaXMgbm90IGFuIG9iamVjdCcpO1xuICAgKiAgICAgYXNzZXJ0LmlzTm90T2JqZWN0KG51bGwsICdudWxsIGlzIG5vdCBhbiBvYmplY3QnKTtcbiAgICpcbiAgICogQG5hbWUgaXNOb3RPYmplY3RcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTm90T2JqZWN0ID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90T2JqZWN0LCB0cnVlKS50by5ub3QuYmUuYSgnb2JqZWN0Jyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNBcnJheSh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBhbiBhcnJheS5cbiAgICpcbiAgICogICAgIHZhciBtZW51ID0gWyAnZ3JlZW4nLCAnY2hhaScsICdvb2xvbmcnIF07XG4gICAqICAgICBhc3NlcnQuaXNBcnJheShtZW51LCAnd2hhdCBraW5kIG9mIHRlYSBkbyB3ZSB3YW50PycpO1xuICAgKlxuICAgKiBAbmFtZSBpc0FycmF5XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc0FycmF5ID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzQXJyYXksIHRydWUpLnRvLmJlLmFuKCdhcnJheScpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90QXJyYXkodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgX25vdF8gYW4gYXJyYXkuXG4gICAqXG4gICAqICAgICB2YXIgbWVudSA9ICdncmVlbnxjaGFpfG9vbG9uZyc7XG4gICAqICAgICBhc3NlcnQuaXNOb3RBcnJheShtZW51LCAnd2hhdCBraW5kIG9mIHRlYSBkbyB3ZSB3YW50PycpO1xuICAgKlxuICAgKiBAbmFtZSBpc05vdEFycmF5XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdEFycmF5ID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90QXJyYXksIHRydWUpLnRvLm5vdC5iZS5hbignYXJyYXknKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc1N0cmluZyh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBhIHN0cmluZy5cbiAgICpcbiAgICogICAgIHZhciB0ZWFPcmRlciA9ICdjaGFpJztcbiAgICogICAgIGFzc2VydC5pc1N0cmluZyh0ZWFPcmRlciwgJ29yZGVyIHBsYWNlZCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc1N0cmluZ1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNTdHJpbmcgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNTdHJpbmcsIHRydWUpLnRvLmJlLmEoJ3N0cmluZycpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90U3RyaW5nKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIF9ub3RfIGEgc3RyaW5nLlxuICAgKlxuICAgKiAgICAgdmFyIHRlYU9yZGVyID0gNDtcbiAgICogICAgIGFzc2VydC5pc05vdFN0cmluZyh0ZWFPcmRlciwgJ29yZGVyIHBsYWNlZCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc05vdFN0cmluZ1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOb3RTdHJpbmcgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RTdHJpbmcsIHRydWUpLnRvLm5vdC5iZS5hKCdzdHJpbmcnKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc051bWJlcih2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBhIG51bWJlci5cbiAgICpcbiAgICogICAgIHZhciBjdXBzID0gMjtcbiAgICogICAgIGFzc2VydC5pc051bWJlcihjdXBzLCAnaG93IG1hbnkgY3VwcycpO1xuICAgKlxuICAgKiBAbmFtZSBpc051bWJlclxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTnVtYmVyID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTnVtYmVyLCB0cnVlKS50by5iZS5hKCdudW1iZXInKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc05vdE51bWJlcih2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBfbm90XyBhIG51bWJlci5cbiAgICpcbiAgICogICAgIHZhciBjdXBzID0gJzIgY3VwcyBwbGVhc2UnO1xuICAgKiAgICAgYXNzZXJ0LmlzTm90TnVtYmVyKGN1cHMsICdob3cgbWFueSBjdXBzJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90TnVtYmVyXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdE51bWJlciA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdE51bWJlciwgdHJ1ZSkudG8ubm90LmJlLmEoJ251bWJlcicpO1xuICB9O1xuXG4gICAvKipcbiAgICogIyMjIC5pc0Zpbml0ZSh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBhIGZpbml0ZSBudW1iZXIuIFVubGlrZSBgLmlzTnVtYmVyYCwgdGhpcyB3aWxsIGZhaWwgZm9yIGBOYU5gIGFuZCBgSW5maW5pdHlgLlxuICAgKlxuICAgKiAgICAgdmFyIGN1cHMgPSAyO1xuICAgKiAgICAgYXNzZXJ0LmlzRmluaXRlKGN1cHMsICdob3cgbWFueSBjdXBzJyk7XG4gICAqXG4gICAqICAgICBhc3NlcnQuaXNGaW5pdGUoTmFOKTsgLy8gdGhyb3dzXG4gICAqXG4gICAqIEBuYW1lIGlzRmluaXRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNGaW5pdGUgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNGaW5pdGUsIHRydWUpLnRvLmJlLmZpbml0ZTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc0Jvb2xlYW4odmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgYSBib29sZWFuLlxuICAgKlxuICAgKiAgICAgdmFyIHRlYVJlYWR5ID0gdHJ1ZVxuICAgKiAgICAgICAsIHRlYVNlcnZlZCA9IGZhbHNlO1xuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzQm9vbGVhbih0ZWFSZWFkeSwgJ2lzIHRoZSB0ZWEgcmVhZHknKTtcbiAgICogICAgIGFzc2VydC5pc0Jvb2xlYW4odGVhU2VydmVkLCAnaGFzIHRlYSBiZWVuIHNlcnZlZCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc0Jvb2xlYW5cbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzQm9vbGVhbiA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0Jvb2xlYW4sIHRydWUpLnRvLmJlLmEoJ2Jvb2xlYW4nKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc05vdEJvb2xlYW4odmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgX25vdF8gYSBib29sZWFuLlxuICAgKlxuICAgKiAgICAgdmFyIHRlYVJlYWR5ID0gJ3llcCdcbiAgICogICAgICAgLCB0ZWFTZXJ2ZWQgPSAnbm9wZSc7XG4gICAqXG4gICAqICAgICBhc3NlcnQuaXNOb3RCb29sZWFuKHRlYVJlYWR5LCAnaXMgdGhlIHRlYSByZWFkeScpO1xuICAgKiAgICAgYXNzZXJ0LmlzTm90Qm9vbGVhbih0ZWFTZXJ2ZWQsICdoYXMgdGVhIGJlZW4gc2VydmVkJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90Qm9vbGVhblxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOb3RCb29sZWFuID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90Qm9vbGVhbiwgdHJ1ZSkudG8ubm90LmJlLmEoJ2Jvb2xlYW4nKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC50eXBlT2YodmFsdWUsIG5hbWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAncyB0eXBlIGlzIGBuYW1lYCwgYXMgZGV0ZXJtaW5lZCBieVxuICAgKiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gICAqXG4gICAqICAgICBhc3NlcnQudHlwZU9mKHsgdGVhOiAnY2hhaScgfSwgJ29iamVjdCcsICd3ZSBoYXZlIGFuIG9iamVjdCcpO1xuICAgKiAgICAgYXNzZXJ0LnR5cGVPZihbJ2NoYWknLCAnamFzbWluZSddLCAnYXJyYXknLCAnd2UgaGF2ZSBhbiBhcnJheScpO1xuICAgKiAgICAgYXNzZXJ0LnR5cGVPZigndGVhJywgJ3N0cmluZycsICd3ZSBoYXZlIGEgc3RyaW5nJyk7XG4gICAqICAgICBhc3NlcnQudHlwZU9mKC90ZWEvLCAncmVnZXhwJywgJ3dlIGhhdmUgYSByZWd1bGFyIGV4cHJlc3Npb24nKTtcbiAgICogICAgIGFzc2VydC50eXBlT2YobnVsbCwgJ251bGwnLCAnd2UgaGF2ZSBhIG51bGwnKTtcbiAgICogICAgIGFzc2VydC50eXBlT2YodW5kZWZpbmVkLCAndW5kZWZpbmVkJywgJ3dlIGhhdmUgYW4gdW5kZWZpbmVkJyk7XG4gICAqXG4gICAqIEBuYW1lIHR5cGVPZlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQudHlwZU9mID0gZnVuY3Rpb24gKHZhbCwgdHlwZSwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LnR5cGVPZiwgdHJ1ZSkudG8uYmUuYSh0eXBlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3RUeXBlT2YodmFsdWUsIG5hbWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAncyB0eXBlIGlzIF9ub3RfIGBuYW1lYCwgYXMgZGV0ZXJtaW5lZCBieVxuICAgKiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90VHlwZU9mKCd0ZWEnLCAnbnVtYmVyJywgJ3N0cmluZ3MgYXJlIG5vdCBudW1iZXJzJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdFR5cGVPZlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZW9mIG5hbWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdFR5cGVPZiA9IGZ1bmN0aW9uICh2YWwsIHR5cGUsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5ub3RUeXBlT2YsIHRydWUpLnRvLm5vdC5iZS5hKHR5cGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmluc3RhbmNlT2Yob2JqZWN0LCBjb25zdHJ1Y3RvciwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBhbiBpbnN0YW5jZSBvZiBgY29uc3RydWN0b3JgLlxuICAgKlxuICAgKiAgICAgdmFyIFRlYSA9IGZ1bmN0aW9uIChuYW1lKSB7IHRoaXMubmFtZSA9IG5hbWU7IH1cbiAgICogICAgICAgLCBjaGFpID0gbmV3IFRlYSgnY2hhaScpO1xuICAgKlxuICAgKiAgICAgYXNzZXJ0Lmluc3RhbmNlT2YoY2hhaSwgVGVhLCAnY2hhaSBpcyBhbiBpbnN0YW5jZSBvZiB0ZWEnKTtcbiAgICpcbiAgICogQG5hbWUgaW5zdGFuY2VPZlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7Q29uc3RydWN0b3J9IGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pbnN0YW5jZU9mID0gZnVuY3Rpb24gKHZhbCwgdHlwZSwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0Lmluc3RhbmNlT2YsIHRydWUpLnRvLmJlLmluc3RhbmNlT2YodHlwZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90SW5zdGFuY2VPZihvYmplY3QsIGNvbnN0cnVjdG9yLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgYHZhbHVlYCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgYGNvbnN0cnVjdG9yYC5cbiAgICpcbiAgICogICAgIHZhciBUZWEgPSBmdW5jdGlvbiAobmFtZSkgeyB0aGlzLm5hbWUgPSBuYW1lOyB9XG4gICAqICAgICAgICwgY2hhaSA9IG5ldyBTdHJpbmcoJ2NoYWknKTtcbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RJbnN0YW5jZU9mKGNoYWksIFRlYSwgJ2NoYWkgaXMgbm90IGFuIGluc3RhbmNlIG9mIHRlYScpO1xuICAgKlxuICAgKiBAbmFtZSBub3RJbnN0YW5jZU9mXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtDb25zdHJ1Y3Rvcn0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdEluc3RhbmNlT2YgPSBmdW5jdGlvbiAodmFsLCB0eXBlLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQubm90SW5zdGFuY2VPZiwgdHJ1ZSlcbiAgICAgIC50by5ub3QuYmUuaW5zdGFuY2VPZih0eXBlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pbmNsdWRlKGhheXN0YWNrLCBuZWVkbGUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBoYXlzdGFja2AgaW5jbHVkZXMgYG5lZWRsZWAuIENhbiBiZSB1c2VkIHRvIGFzc2VydCB0aGVcbiAgICogaW5jbHVzaW9uIG9mIGEgdmFsdWUgaW4gYW4gYXJyYXksIGEgc3Vic3RyaW5nIGluIGEgc3RyaW5nLCBvciBhIHN1YnNldCBvZlxuICAgKiBwcm9wZXJ0aWVzIGluIGFuIG9iamVjdC5cbiAgICpcbiAgICogICAgIGFzc2VydC5pbmNsdWRlKFsxLDIsM10sIDIsICdhcnJheSBjb250YWlucyB2YWx1ZScpO1xuICAgKiAgICAgYXNzZXJ0LmluY2x1ZGUoJ2Zvb2JhcicsICdmb28nLCAnc3RyaW5nIGNvbnRhaW5zIHN1YnN0cmluZycpO1xuICAgKiAgICAgYXNzZXJ0LmluY2x1ZGUoeyBmb286ICdiYXInLCBoZWxsbzogJ3VuaXZlcnNlJyB9LCB7IGZvbzogJ2JhcicgfSwgJ29iamVjdCBjb250YWlucyBwcm9wZXJ0eScpO1xuICAgKlxuICAgKiBTdHJpY3QgZXF1YWxpdHkgKD09PSkgaXMgdXNlZC4gV2hlbiBhc3NlcnRpbmcgdGhlIGluY2x1c2lvbiBvZiBhIHZhbHVlIGluXG4gICAqIGFuIGFycmF5LCB0aGUgYXJyYXkgaXMgc2VhcmNoZWQgZm9yIGFuIGVsZW1lbnQgdGhhdCdzIHN0cmljdGx5IGVxdWFsIHRvIHRoZVxuICAgKiBnaXZlbiB2YWx1ZS4gV2hlbiBhc3NlcnRpbmcgYSBzdWJzZXQgb2YgcHJvcGVydGllcyBpbiBhbiBvYmplY3QsIHRoZSBvYmplY3RcbiAgICogaXMgc2VhcmNoZWQgZm9yIHRoZSBnaXZlbiBwcm9wZXJ0eSBrZXlzLCBjaGVja2luZyB0aGF0IGVhY2ggb25lIGlzIHByZXNlbnRcbiAgICogYW5kIHN0cmljdGx5IGVxdWFsIHRvIHRoZSBnaXZlbiBwcm9wZXJ0eSB2YWx1ZS4gRm9yIGluc3RhbmNlOlxuICAgKlxuICAgKiAgICAgdmFyIG9iajEgPSB7YTogMX1cbiAgICogICAgICAgLCBvYmoyID0ge2I6IDJ9O1xuICAgKiAgICAgYXNzZXJ0LmluY2x1ZGUoW29iajEsIG9iajJdLCBvYmoxKTtcbiAgICogICAgIGFzc2VydC5pbmNsdWRlKHtmb286IG9iajEsIGJhcjogb2JqMn0sIHtmb286IG9iajF9KTtcbiAgICogICAgIGFzc2VydC5pbmNsdWRlKHtmb286IG9iajEsIGJhcjogb2JqMn0sIHtmb286IG9iajEsIGJhcjogb2JqMn0pO1xuICAgKlxuICAgKiBAbmFtZSBpbmNsdWRlXG4gICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBoYXlzdGFja1xuICAgKiBAcGFyYW0ge01peGVkfSBuZWVkbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmluY2x1ZGUgPSBmdW5jdGlvbiAoZXhwLCBpbmMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5pbmNsdWRlLCB0cnVlKS5pbmNsdWRlKGluYyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90SW5jbHVkZShoYXlzdGFjaywgbmVlZGxlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgaGF5c3RhY2tgIGRvZXMgbm90IGluY2x1ZGUgYG5lZWRsZWAuIENhbiBiZSB1c2VkIHRvIGFzc2VydFxuICAgKiB0aGUgYWJzZW5jZSBvZiBhIHZhbHVlIGluIGFuIGFycmF5LCBhIHN1YnN0cmluZyBpbiBhIHN0cmluZywgb3IgYSBzdWJzZXQgb2ZcbiAgICogcHJvcGVydGllcyBpbiBhbiBvYmplY3QuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90SW5jbHVkZShbMSwyLDNdLCA0LCBcImFycmF5IGRvZXNuJ3QgY29udGFpbiB2YWx1ZVwiKTtcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlKCdmb29iYXInLCAnYmF6JywgXCJzdHJpbmcgZG9lc24ndCBjb250YWluIHN1YnN0cmluZ1wiKTtcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlKHsgZm9vOiAnYmFyJywgaGVsbG86ICd1bml2ZXJzZScgfSwgeyBmb286ICdiYXonIH0sICdvYmplY3QgZG9lc24ndCBjb250YWluIHByb3BlcnR5Jyk7XG4gICAqXG4gICAqIFN0cmljdCBlcXVhbGl0eSAoPT09KSBpcyB1c2VkLiBXaGVuIGFzc2VydGluZyB0aGUgYWJzZW5jZSBvZiBhIHZhbHVlIGluIGFuXG4gICAqIGFycmF5LCB0aGUgYXJyYXkgaXMgc2VhcmNoZWQgdG8gY29uZmlybSB0aGUgYWJzZW5jZSBvZiBhbiBlbGVtZW50IHRoYXQnc1xuICAgKiBzdHJpY3RseSBlcXVhbCB0byB0aGUgZ2l2ZW4gdmFsdWUuIFdoZW4gYXNzZXJ0aW5nIGEgc3Vic2V0IG9mIHByb3BlcnRpZXMgaW5cbiAgICogYW4gb2JqZWN0LCB0aGUgb2JqZWN0IGlzIHNlYXJjaGVkIHRvIGNvbmZpcm0gdGhhdCBhdCBsZWFzdCBvbmUgb2YgdGhlIGdpdmVuXG4gICAqIHByb3BlcnR5IGtleXMgaXMgZWl0aGVyIG5vdCBwcmVzZW50IG9yIG5vdCBzdHJpY3RseSBlcXVhbCB0byB0aGUgZ2l2ZW5cbiAgICogcHJvcGVydHkgdmFsdWUuIEZvciBpbnN0YW5jZTpcbiAgICpcbiAgICogICAgIHZhciBvYmoxID0ge2E6IDF9XG4gICAqICAgICAgICwgb2JqMiA9IHtiOiAyfTtcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlKFtvYmoxLCBvYmoyXSwge2E6IDF9KTtcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlKHtmb286IG9iajEsIGJhcjogb2JqMn0sIHtmb286IHthOiAxfX0pO1xuICAgKiAgICAgYXNzZXJ0Lm5vdEluY2x1ZGUoe2Zvbzogb2JqMSwgYmFyOiBvYmoyfSwge2Zvbzogb2JqMSwgYmFyOiB7YjogMn19KTtcbiAgICpcbiAgICogQG5hbWUgbm90SW5jbHVkZVxuICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaGF5c3RhY2tcbiAgICogQHBhcmFtIHtNaXhlZH0gbmVlZGxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RJbmNsdWRlID0gZnVuY3Rpb24gKGV4cCwgaW5jLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubm90SW5jbHVkZSwgdHJ1ZSkubm90LmluY2x1ZGUoaW5jKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5kZWVwSW5jbHVkZShoYXlzdGFjaywgbmVlZGxlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgaGF5c3RhY2tgIGluY2x1ZGVzIGBuZWVkbGVgLiBDYW4gYmUgdXNlZCB0byBhc3NlcnQgdGhlXG4gICAqIGluY2x1c2lvbiBvZiBhIHZhbHVlIGluIGFuIGFycmF5IG9yIGEgc3Vic2V0IG9mIHByb3BlcnRpZXMgaW4gYW4gb2JqZWN0LlxuICAgKiBEZWVwIGVxdWFsaXR5IGlzIHVzZWQuXG4gICAqXG4gICAqICAgICB2YXIgb2JqMSA9IHthOiAxfVxuICAgKiAgICAgICAsIG9iajIgPSB7YjogMn07XG4gICAqICAgICBhc3NlcnQuZGVlcEluY2x1ZGUoW29iajEsIG9iajJdLCB7YTogMX0pO1xuICAgKiAgICAgYXNzZXJ0LmRlZXBJbmNsdWRlKHtmb286IG9iajEsIGJhcjogb2JqMn0sIHtmb286IHthOiAxfX0pO1xuICAgKiAgICAgYXNzZXJ0LmRlZXBJbmNsdWRlKHtmb286IG9iajEsIGJhcjogb2JqMn0sIHtmb286IHthOiAxfSwgYmFyOiB7YjogMn19KTtcbiAgICpcbiAgICogQG5hbWUgZGVlcEluY2x1ZGVcbiAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGhheXN0YWNrXG4gICAqIEBwYXJhbSB7TWl4ZWR9IG5lZWRsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZGVlcEluY2x1ZGUgPSBmdW5jdGlvbiAoZXhwLCBpbmMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5kZWVwSW5jbHVkZSwgdHJ1ZSkuZGVlcC5pbmNsdWRlKGluYyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90RGVlcEluY2x1ZGUoaGF5c3RhY2ssIG5lZWRsZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYGhheXN0YWNrYCBkb2VzIG5vdCBpbmNsdWRlIGBuZWVkbGVgLiBDYW4gYmUgdXNlZCB0byBhc3NlcnRcbiAgICogdGhlIGFic2VuY2Ugb2YgYSB2YWx1ZSBpbiBhbiBhcnJheSBvciBhIHN1YnNldCBvZiBwcm9wZXJ0aWVzIGluIGFuIG9iamVjdC5cbiAgICogRGVlcCBlcXVhbGl0eSBpcyB1c2VkLlxuICAgKlxuICAgKiAgICAgdmFyIG9iajEgPSB7YTogMX1cbiAgICogICAgICAgLCBvYmoyID0ge2I6IDJ9O1xuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBJbmNsdWRlKFtvYmoxLCBvYmoyXSwge2E6IDl9KTtcbiAgICogICAgIGFzc2VydC5ub3REZWVwSW5jbHVkZSh7Zm9vOiBvYmoxLCBiYXI6IG9iajJ9LCB7Zm9vOiB7YTogOX19KTtcbiAgICogICAgIGFzc2VydC5ub3REZWVwSW5jbHVkZSh7Zm9vOiBvYmoxLCBiYXI6IG9iajJ9LCB7Zm9vOiB7YTogMX0sIGJhcjoge2I6IDl9fSk7XG4gICAqXG4gICAqIEBuYW1lIG5vdERlZXBJbmNsdWRlXG4gICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBoYXlzdGFja1xuICAgKiBAcGFyYW0ge01peGVkfSBuZWVkbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdERlZXBJbmNsdWRlID0gZnVuY3Rpb24gKGV4cCwgaW5jLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubm90RGVlcEluY2x1ZGUsIHRydWUpLm5vdC5kZWVwLmluY2x1ZGUoaW5jKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5uZXN0ZWRJbmNsdWRlKGhheXN0YWNrLCBuZWVkbGUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0ICdoYXlzdGFjaycgaW5jbHVkZXMgJ25lZWRsZScuXG4gICAqIENhbiBiZSB1c2VkIHRvIGFzc2VydCB0aGUgaW5jbHVzaW9uIG9mIGEgc3Vic2V0IG9mIHByb3BlcnRpZXMgaW4gYW5cbiAgICogb2JqZWN0LlxuICAgKiBFbmFibGVzIHRoZSB1c2Ugb2YgZG90LSBhbmQgYnJhY2tldC1ub3RhdGlvbiBmb3IgcmVmZXJlbmNpbmcgbmVzdGVkXG4gICAqIHByb3BlcnRpZXMuXG4gICAqICdbXScgYW5kICcuJyBpbiBwcm9wZXJ0eSBuYW1lcyBjYW4gYmUgZXNjYXBlZCB1c2luZyBkb3VibGUgYmFja3NsYXNoZXMuXG4gICAqXG4gICAqICAgICBhc3NlcnQubmVzdGVkSW5jbHVkZSh7Jy5hJzogeydiJzogJ3gnfX0sIHsnXFxcXC5hLltiXSc6ICd4J30pO1xuICAgKiAgICAgYXNzZXJ0Lm5lc3RlZEluY2x1ZGUoeydhJzogeydbYl0nOiAneCd9fSwgeydhLlxcXFxbYlxcXFxdJzogJ3gnfSk7XG4gICAqXG4gICAqIEBuYW1lIG5lc3RlZEluY2x1ZGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGhheXN0YWNrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBuZWVkbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5lc3RlZEluY2x1ZGUgPSBmdW5jdGlvbiAoZXhwLCBpbmMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5uZXN0ZWRJbmNsdWRlLCB0cnVlKS5uZXN0ZWQuaW5jbHVkZShpbmMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdE5lc3RlZEluY2x1ZGUoaGF5c3RhY2ssIG5lZWRsZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgJ2hheXN0YWNrJyBkb2VzIG5vdCBpbmNsdWRlICduZWVkbGUnLlxuICAgKiBDYW4gYmUgdXNlZCB0byBhc3NlcnQgdGhlIGFic2VuY2Ugb2YgYSBzdWJzZXQgb2YgcHJvcGVydGllcyBpbiBhblxuICAgKiBvYmplY3QuXG4gICAqIEVuYWJsZXMgdGhlIHVzZSBvZiBkb3QtIGFuZCBicmFja2V0LW5vdGF0aW9uIGZvciByZWZlcmVuY2luZyBuZXN0ZWRcbiAgICogcHJvcGVydGllcy5cbiAgICogJ1tdJyBhbmQgJy4nIGluIHByb3BlcnR5IG5hbWVzIGNhbiBiZSBlc2NhcGVkIHVzaW5nIGRvdWJsZSBiYWNrc2xhc2hlcy5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3ROZXN0ZWRJbmNsdWRlKHsnLmEnOiB7J2InOiAneCd9fSwgeydcXFxcLmEuYic6ICd5J30pO1xuICAgKiAgICAgYXNzZXJ0Lm5vdE5lc3RlZEluY2x1ZGUoeydhJzogeydbYl0nOiAneCd9fSwgeydhLlxcXFxbYlxcXFxdJzogJ3knfSk7XG4gICAqXG4gICAqIEBuYW1lIG5vdE5lc3RlZEluY2x1ZGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGhheXN0YWNrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBuZWVkbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdE5lc3RlZEluY2x1ZGUgPSBmdW5jdGlvbiAoZXhwLCBpbmMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5ub3ROZXN0ZWRJbmNsdWRlLCB0cnVlKVxuICAgICAgLm5vdC5uZXN0ZWQuaW5jbHVkZShpbmMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmRlZXBOZXN0ZWRJbmNsdWRlKGhheXN0YWNrLCBuZWVkbGUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0ICdoYXlzdGFjaycgaW5jbHVkZXMgJ25lZWRsZScuXG4gICAqIENhbiBiZSB1c2VkIHRvIGFzc2VydCB0aGUgaW5jbHVzaW9uIG9mIGEgc3Vic2V0IG9mIHByb3BlcnRpZXMgaW4gYW5cbiAgICogb2JqZWN0IHdoaWxlIGNoZWNraW5nIGZvciBkZWVwIGVxdWFsaXR5LlxuICAgKiBFbmFibGVzIHRoZSB1c2Ugb2YgZG90LSBhbmQgYnJhY2tldC1ub3RhdGlvbiBmb3IgcmVmZXJlbmNpbmcgbmVzdGVkXG4gICAqIHByb3BlcnRpZXMuXG4gICAqICdbXScgYW5kICcuJyBpbiBwcm9wZXJ0eSBuYW1lcyBjYW4gYmUgZXNjYXBlZCB1c2luZyBkb3VibGUgYmFja3NsYXNoZXMuXG4gICAqXG4gICAqICAgICBhc3NlcnQuZGVlcE5lc3RlZEluY2x1ZGUoe2E6IHtiOiBbe3g6IDF9XX19LCB7J2EuYlswXSc6IHt4OiAxfX0pO1xuICAgKiAgICAgYXNzZXJ0LmRlZXBOZXN0ZWRJbmNsdWRlKHsnLmEnOiB7J1tiXSc6IHt4OiAxfX19LCB7J1xcXFwuYS5cXFxcW2JcXFxcXSc6IHt4OiAxfX0pO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwTmVzdGVkSW5jbHVkZVxuICAgKiBAcGFyYW0ge09iamVjdH0gaGF5c3RhY2tcbiAgICogQHBhcmFtIHtPYmplY3R9IG5lZWRsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZGVlcE5lc3RlZEluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0LmRlZXBOZXN0ZWRJbmNsdWRlLCB0cnVlKVxuICAgICAgLmRlZXAubmVzdGVkLmluY2x1ZGUoaW5jKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3REZWVwTmVzdGVkSW5jbHVkZShoYXlzdGFjaywgbmVlZGxlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCAnaGF5c3RhY2snIGRvZXMgbm90IGluY2x1ZGUgJ25lZWRsZScuXG4gICAqIENhbiBiZSB1c2VkIHRvIGFzc2VydCB0aGUgYWJzZW5jZSBvZiBhIHN1YnNldCBvZiBwcm9wZXJ0aWVzIGluIGFuXG4gICAqIG9iamVjdCB3aGlsZSBjaGVja2luZyBmb3IgZGVlcCBlcXVhbGl0eS5cbiAgICogRW5hYmxlcyB0aGUgdXNlIG9mIGRvdC0gYW5kIGJyYWNrZXQtbm90YXRpb24gZm9yIHJlZmVyZW5jaW5nIG5lc3RlZFxuICAgKiBwcm9wZXJ0aWVzLlxuICAgKiAnW10nIGFuZCAnLicgaW4gcHJvcGVydHkgbmFtZXMgY2FuIGJlIGVzY2FwZWQgdXNpbmcgZG91YmxlIGJhY2tzbGFzaGVzLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBOZXN0ZWRJbmNsdWRlKHthOiB7YjogW3t4OiAxfV19fSwgeydhLmJbMF0nOiB7eTogMX19KVxuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBOZXN0ZWRJbmNsdWRlKHsnLmEnOiB7J1tiXSc6IHt4OiAxfX19LCB7J1xcXFwuYS5cXFxcW2JcXFxcXSc6IHt5OiAyfX0pO1xuICAgKlxuICAgKiBAbmFtZSBub3REZWVwTmVzdGVkSW5jbHVkZVxuICAgKiBAcGFyYW0ge09iamVjdH0gaGF5c3RhY2tcbiAgICogQHBhcmFtIHtPYmplY3R9IG5lZWRsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90RGVlcE5lc3RlZEluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm5vdERlZXBOZXN0ZWRJbmNsdWRlLCB0cnVlKVxuICAgICAgLm5vdC5kZWVwLm5lc3RlZC5pbmNsdWRlKGluYyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAub3duSW5jbHVkZShoYXlzdGFjaywgbmVlZGxlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCAnaGF5c3RhY2snIGluY2x1ZGVzICduZWVkbGUnLlxuICAgKiBDYW4gYmUgdXNlZCB0byBhc3NlcnQgdGhlIGluY2x1c2lvbiBvZiBhIHN1YnNldCBvZiBwcm9wZXJ0aWVzIGluIGFuXG4gICAqIG9iamVjdCB3aGlsZSBpZ25vcmluZyBpbmhlcml0ZWQgcHJvcGVydGllcy5cbiAgICpcbiAgICogICAgIGFzc2VydC5vd25JbmNsdWRlKHsgYTogMSB9LCB7IGE6IDEgfSk7XG4gICAqXG4gICAqIEBuYW1lIG93bkluY2x1ZGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGhheXN0YWNrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBuZWVkbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm93bkluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm93bkluY2x1ZGUsIHRydWUpLm93bi5pbmNsdWRlKGluYyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90T3duSW5jbHVkZShoYXlzdGFjaywgbmVlZGxlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCAnaGF5c3RhY2snIGluY2x1ZGVzICduZWVkbGUnLlxuICAgKiBDYW4gYmUgdXNlZCB0byBhc3NlcnQgdGhlIGFic2VuY2Ugb2YgYSBzdWJzZXQgb2YgcHJvcGVydGllcyBpbiBhblxuICAgKiBvYmplY3Qgd2hpbGUgaWdub3JpbmcgaW5oZXJpdGVkIHByb3BlcnRpZXMuXG4gICAqXG4gICAqICAgICBPYmplY3QucHJvdG90eXBlLmIgPSAyO1xuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdE93bkluY2x1ZGUoeyBhOiAxIH0sIHsgYjogMiB9KTtcbiAgICpcbiAgICogQG5hbWUgbm90T3duSW5jbHVkZVxuICAgKiBAcGFyYW0ge09iamVjdH0gaGF5c3RhY2tcbiAgICogQHBhcmFtIHtPYmplY3R9IG5lZWRsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90T3duSW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubm90T3duSW5jbHVkZSwgdHJ1ZSkubm90Lm93bi5pbmNsdWRlKGluYyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuZGVlcE93bkluY2x1ZGUoaGF5c3RhY2ssIG5lZWRsZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgJ2hheXN0YWNrJyBpbmNsdWRlcyAnbmVlZGxlJy5cbiAgICogQ2FuIGJlIHVzZWQgdG8gYXNzZXJ0IHRoZSBpbmNsdXNpb24gb2YgYSBzdWJzZXQgb2YgcHJvcGVydGllcyBpbiBhblxuICAgKiBvYmplY3Qgd2hpbGUgaWdub3JpbmcgaW5oZXJpdGVkIHByb3BlcnRpZXMgYW5kIGNoZWNraW5nIGZvciBkZWVwIGVxdWFsaXR5LlxuICAgKlxuICAgKiAgICAgIGFzc2VydC5kZWVwT3duSW5jbHVkZSh7YToge2I6IDJ9fSwge2E6IHtiOiAyfX0pO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwT3duSW5jbHVkZVxuICAgKiBAcGFyYW0ge09iamVjdH0gaGF5c3RhY2tcbiAgICogQHBhcmFtIHtPYmplY3R9IG5lZWRsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZGVlcE93bkluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0LmRlZXBPd25JbmNsdWRlLCB0cnVlKVxuICAgICAgLmRlZXAub3duLmluY2x1ZGUoaW5jKTtcbiAgfTtcblxuICAgLyoqXG4gICAqICMjIyAubm90RGVlcE93bkluY2x1ZGUoaGF5c3RhY2ssIG5lZWRsZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgJ2hheXN0YWNrJyBpbmNsdWRlcyAnbmVlZGxlJy5cbiAgICogQ2FuIGJlIHVzZWQgdG8gYXNzZXJ0IHRoZSBhYnNlbmNlIG9mIGEgc3Vic2V0IG9mIHByb3BlcnRpZXMgaW4gYW5cbiAgICogb2JqZWN0IHdoaWxlIGlnbm9yaW5nIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGFuZCBjaGVja2luZyBmb3IgZGVlcCBlcXVhbGl0eS5cbiAgICpcbiAgICogICAgICBhc3NlcnQubm90RGVlcE93bkluY2x1ZGUoe2E6IHtiOiAyfX0sIHthOiB7YzogM319KTtcbiAgICpcbiAgICogQG5hbWUgbm90RGVlcE93bkluY2x1ZGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGhheXN0YWNrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBuZWVkbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdERlZXBPd25JbmNsdWRlID0gZnVuY3Rpb24oZXhwLCBpbmMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5ub3REZWVwT3duSW5jbHVkZSwgdHJ1ZSlcbiAgICAgIC5ub3QuZGVlcC5vd24uaW5jbHVkZShpbmMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm1hdGNoKHZhbHVlLCByZWdleHAsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgbWF0Y2hlcyB0aGUgcmVndWxhciBleHByZXNzaW9uIGByZWdleHBgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm1hdGNoKCdmb29iYXInLCAvXmZvby8sICdyZWdleHAgbWF0Y2hlcycpO1xuICAgKlxuICAgKiBAbmFtZSBtYXRjaFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1JlZ0V4cH0gcmVnZXhwXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5tYXRjaCA9IGZ1bmN0aW9uIChleHAsIHJlLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubWF0Y2gsIHRydWUpLnRvLm1hdGNoKHJlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3RNYXRjaCh2YWx1ZSwgcmVnZXhwLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGRvZXMgbm90IG1hdGNoIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gYHJlZ2V4cGAuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90TWF0Y2goJ2Zvb2JhcicsIC9eZm9vLywgJ3JlZ2V4cCBkb2VzIG5vdCBtYXRjaCcpO1xuICAgKlxuICAgKiBAbmFtZSBub3RNYXRjaFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1JlZ0V4cH0gcmVnZXhwXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RNYXRjaCA9IGZ1bmN0aW9uIChleHAsIHJlLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubm90TWF0Y2gsIHRydWUpLnRvLm5vdC5tYXRjaChyZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAucHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGEgZGlyZWN0IG9yIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lZCBieVxuICAgKiBgcHJvcGVydHlgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LnByb3BlcnR5KHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9fSwgJ3RlYScpO1xuICAgKiAgICAgYXNzZXJ0LnByb3BlcnR5KHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9fSwgJ3RvU3RyaW5nJyk7XG4gICAqXG4gICAqIEBuYW1lIHByb3BlcnR5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5wcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIHByb3AsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5wcm9wZXJ0eSwgdHJ1ZSkudG8uaGF2ZS5wcm9wZXJ0eShwcm9wKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3RQcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBkb2VzIF9ub3RfIGhhdmUgYSBkaXJlY3Qgb3IgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVkXG4gICAqIGJ5IGBwcm9wZXJ0eWAuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90UHJvcGVydHkoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH19LCAnY29mZmVlJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdFByb3BlcnR5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIHByb3AsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5ub3RQcm9wZXJ0eSwgdHJ1ZSlcbiAgICAgIC50by5ub3QuaGF2ZS5wcm9wZXJ0eShwcm9wKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5wcm9wZXJ0eVZhbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGEgZGlyZWN0IG9yIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lZCBieVxuICAgKiBgcHJvcGVydHlgIHdpdGggYSB2YWx1ZSBnaXZlbiBieSBgdmFsdWVgLiBVc2VzIGEgc3RyaWN0IGVxdWFsaXR5IGNoZWNrXG4gICAqICg9PT0pLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LnByb3BlcnR5VmFsKHsgdGVhOiAnaXMgZ29vZCcgfSwgJ3RlYScsICdpcyBnb29kJyk7XG4gICAqXG4gICAqIEBuYW1lIHByb3BlcnR5VmFsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5wcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LnByb3BlcnR5VmFsLCB0cnVlKVxuICAgICAgLnRvLmhhdmUucHJvcGVydHkocHJvcCwgdmFsKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3RQcm9wZXJ0eVZhbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgZG9lcyBfbm90XyBoYXZlIGEgZGlyZWN0IG9yIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lZFxuICAgKiBieSBgcHJvcGVydHlgIHdpdGggdmFsdWUgZ2l2ZW4gYnkgYHZhbHVlYC4gVXNlcyBhIHN0cmljdCBlcXVhbGl0eSBjaGVja1xuICAgKiAoPT09KS5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RQcm9wZXJ0eVZhbCh7IHRlYTogJ2lzIGdvb2QnIH0sICd0ZWEnLCAnaXMgYmFkJyk7XG4gICAqICAgICBhc3NlcnQubm90UHJvcGVydHlWYWwoeyB0ZWE6ICdpcyBnb29kJyB9LCAnY29mZmVlJywgJ2lzIGdvb2QnKTtcbiAgICpcbiAgICogQG5hbWUgbm90UHJvcGVydHlWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdFByb3BlcnR5VmFsID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQubm90UHJvcGVydHlWYWwsIHRydWUpXG4gICAgICAudG8ubm90LmhhdmUucHJvcGVydHkocHJvcCwgdmFsKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5kZWVwUHJvcGVydHlWYWwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGhhcyBhIGRpcmVjdCBvciBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZWQgYnlcbiAgICogYHByb3BlcnR5YCB3aXRoIGEgdmFsdWUgZ2l2ZW4gYnkgYHZhbHVlYC4gVXNlcyBhIGRlZXAgZXF1YWxpdHkgY2hlY2suXG4gICAqXG4gICAqICAgICBhc3NlcnQuZGVlcFByb3BlcnR5VmFsKHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9IH0sICd0ZWEnLCB7IGdyZWVuOiAnbWF0Y2hhJyB9KTtcbiAgICpcbiAgICogQG5hbWUgZGVlcFByb3BlcnR5VmFsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5kZWVwUHJvcGVydHlWYWwgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5kZWVwUHJvcGVydHlWYWwsIHRydWUpXG4gICAgICAudG8uaGF2ZS5kZWVwLnByb3BlcnR5KHByb3AsIHZhbCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90RGVlcFByb3BlcnR5VmFsKG9iamVjdCwgcHJvcGVydHksIHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBkb2VzIF9ub3RfIGhhdmUgYSBkaXJlY3Qgb3IgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVkXG4gICAqIGJ5IGBwcm9wZXJ0eWAgd2l0aCB2YWx1ZSBnaXZlbiBieSBgdmFsdWVgLiBVc2VzIGEgZGVlcCBlcXVhbGl0eSBjaGVjay5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3REZWVwUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH0gfSwgJ3RlYScsIHsgYmxhY2s6ICdtYXRjaGEnIH0pO1xuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBQcm9wZXJ0eVZhbCh7IHRlYTogeyBncmVlbjogJ21hdGNoYScgfSB9LCAndGVhJywgeyBncmVlbjogJ29vbG9uZycgfSk7XG4gICAqICAgICBhc3NlcnQubm90RGVlcFByb3BlcnR5VmFsKHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9IH0sICdjb2ZmZWUnLCB7IGdyZWVuOiAnbWF0Y2hhJyB9KTtcbiAgICpcbiAgICogQG5hbWUgbm90RGVlcFByb3BlcnR5VmFsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3REZWVwUHJvcGVydHlWYWwgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5ub3REZWVwUHJvcGVydHlWYWwsIHRydWUpXG4gICAgICAudG8ubm90LmhhdmUuZGVlcC5wcm9wZXJ0eShwcm9wLCB2YWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm93blByb3BlcnR5KG9iamVjdCwgcHJvcGVydHksIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGhhcyBhIGRpcmVjdCBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgLiBJbmhlcml0ZWRcbiAgICogcHJvcGVydGllcyBhcmVuJ3QgY2hlY2tlZC5cbiAgICpcbiAgICogICAgIGFzc2VydC5vd25Qcm9wZXJ0eSh7IHRlYTogeyBncmVlbjogJ21hdGNoYScgfX0sICd0ZWEnKTtcbiAgICpcbiAgICogQG5hbWUgb3duUHJvcGVydHlcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm93blByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lm93blByb3BlcnR5LCB0cnVlKVxuICAgICAgLnRvLmhhdmUub3duLnByb3BlcnR5KHByb3ApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdE93blByb3BlcnR5KG9iamVjdCwgcHJvcGVydHksIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGRvZXMgX25vdF8gaGF2ZSBhIGRpcmVjdCBwcm9wZXJ0eSBuYW1lZCBieVxuICAgKiBgcHJvcGVydHlgLiBJbmhlcml0ZWQgcHJvcGVydGllcyBhcmVuJ3QgY2hlY2tlZC5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RPd25Qcm9wZXJ0eSh7IHRlYTogeyBncmVlbjogJ21hdGNoYScgfX0sICdjb2ZmZWUnKTtcbiAgICogICAgIGFzc2VydC5ub3RPd25Qcm9wZXJ0eSh7fSwgJ3RvU3RyaW5nJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdE93blByb3BlcnR5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RPd25Qcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIHByb3AsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5ub3RPd25Qcm9wZXJ0eSwgdHJ1ZSlcbiAgICAgIC50by5ub3QuaGF2ZS5vd24ucHJvcGVydHkocHJvcCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAub3duUHJvcGVydHlWYWwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGhhcyBhIGRpcmVjdCBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgIGFuZCBhIHZhbHVlXG4gICAqIGVxdWFsIHRvIHRoZSBwcm92aWRlZCBgdmFsdWVgLiBVc2VzIGEgc3RyaWN0IGVxdWFsaXR5IGNoZWNrICg9PT0pLlxuICAgKiBJbmhlcml0ZWQgcHJvcGVydGllcyBhcmVuJ3QgY2hlY2tlZC5cbiAgICpcbiAgICogICAgIGFzc2VydC5vd25Qcm9wZXJ0eVZhbCh7IGNvZmZlZTogJ2lzIGdvb2QnfSwgJ2NvZmZlZScsICdpcyBnb29kJyk7XG4gICAqXG4gICAqIEBuYW1lIG93blByb3BlcnR5VmFsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5vd25Qcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHZhbHVlLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQub3duUHJvcGVydHlWYWwsIHRydWUpXG4gICAgICAudG8uaGF2ZS5vd24ucHJvcGVydHkocHJvcCwgdmFsdWUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdE93blByb3BlcnR5VmFsKG9iamVjdCwgcHJvcGVydHksIHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBkb2VzIF9ub3RfIGhhdmUgYSBkaXJlY3QgcHJvcGVydHkgbmFtZWQgYnkgYHByb3BlcnR5YFxuICAgKiB3aXRoIGEgdmFsdWUgZXF1YWwgdG8gdGhlIHByb3ZpZGVkIGB2YWx1ZWAuIFVzZXMgYSBzdHJpY3QgZXF1YWxpdHkgY2hlY2tcbiAgICogKD09PSkuIEluaGVyaXRlZCBwcm9wZXJ0aWVzIGFyZW4ndCBjaGVja2VkLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdE93blByb3BlcnR5VmFsKHsgdGVhOiAnaXMgYmV0dGVyJ30sICd0ZWEnLCAnaXMgd29yc2UnKTtcbiAgICogICAgIGFzc2VydC5ub3RPd25Qcm9wZXJ0eVZhbCh7fSwgJ3RvU3RyaW5nJywgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdE93blByb3BlcnR5VmFsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RPd25Qcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHZhbHVlLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQubm90T3duUHJvcGVydHlWYWwsIHRydWUpXG4gICAgICAudG8ubm90LmhhdmUub3duLnByb3BlcnR5KHByb3AsIHZhbHVlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5kZWVwT3duUHJvcGVydHlWYWwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGhhcyBhIGRpcmVjdCBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgIGFuZCBhIHZhbHVlXG4gICAqIGVxdWFsIHRvIHRoZSBwcm92aWRlZCBgdmFsdWVgLiBVc2VzIGEgZGVlcCBlcXVhbGl0eSBjaGVjay4gSW5oZXJpdGVkXG4gICAqIHByb3BlcnRpZXMgYXJlbid0IGNoZWNrZWQuXG4gICAqXG4gICAqICAgICBhc3NlcnQuZGVlcE93blByb3BlcnR5VmFsKHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9IH0sICd0ZWEnLCB7IGdyZWVuOiAnbWF0Y2hhJyB9KTtcbiAgICpcbiAgICogQG5hbWUgZGVlcE93blByb3BlcnR5VmFsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5kZWVwT3duUHJvcGVydHlWYWwgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCB2YWx1ZSwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmRlZXBPd25Qcm9wZXJ0eVZhbCwgdHJ1ZSlcbiAgICAgIC50by5oYXZlLmRlZXAub3duLnByb3BlcnR5KHByb3AsIHZhbHVlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3REZWVwT3duUHJvcGVydHlWYWwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGRvZXMgX25vdF8gaGF2ZSBhIGRpcmVjdCBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgXG4gICAqIHdpdGggYSB2YWx1ZSBlcXVhbCB0byB0aGUgcHJvdmlkZWQgYHZhbHVlYC4gVXNlcyBhIGRlZXAgZXF1YWxpdHkgY2hlY2suXG4gICAqIEluaGVyaXRlZCBwcm9wZXJ0aWVzIGFyZW4ndCBjaGVja2VkLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBPd25Qcm9wZXJ0eVZhbCh7IHRlYTogeyBncmVlbjogJ21hdGNoYScgfSB9LCAndGVhJywgeyBibGFjazogJ21hdGNoYScgfSk7XG4gICAqICAgICBhc3NlcnQubm90RGVlcE93blByb3BlcnR5VmFsKHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9IH0sICd0ZWEnLCB7IGdyZWVuOiAnb29sb25nJyB9KTtcbiAgICogICAgIGFzc2VydC5ub3REZWVwT3duUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH0gfSwgJ2NvZmZlZScsIHsgZ3JlZW46ICdtYXRjaGEnIH0pO1xuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBPd25Qcm9wZXJ0eVZhbCh7fSwgJ3RvU3RyaW5nJywgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdERlZXBPd25Qcm9wZXJ0eVZhbFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90RGVlcE93blByb3BlcnR5VmFsID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgdmFsdWUsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5ub3REZWVwT3duUHJvcGVydHlWYWwsIHRydWUpXG4gICAgICAudG8ubm90LmhhdmUuZGVlcC5vd24ucHJvcGVydHkocHJvcCwgdmFsdWUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5lc3RlZFByb3BlcnR5KG9iamVjdCwgcHJvcGVydHksIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGhhcyBhIGRpcmVjdCBvciBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZWQgYnlcbiAgICogYHByb3BlcnR5YCwgd2hpY2ggY2FuIGJlIGEgc3RyaW5nIHVzaW5nIGRvdC0gYW5kIGJyYWNrZXQtbm90YXRpb24gZm9yXG4gICAqIG5lc3RlZCByZWZlcmVuY2UuXG4gICAqXG4gICAqICAgICBhc3NlcnQubmVzdGVkUHJvcGVydHkoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH19LCAndGVhLmdyZWVuJyk7XG4gICAqXG4gICAqIEBuYW1lIG5lc3RlZFByb3BlcnR5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5uZXN0ZWRQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIHByb3AsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5uZXN0ZWRQcm9wZXJ0eSwgdHJ1ZSlcbiAgICAgIC50by5oYXZlLm5lc3RlZC5wcm9wZXJ0eShwcm9wKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3ROZXN0ZWRQcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBkb2VzIF9ub3RfIGhhdmUgYSBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgLCB3aGljaFxuICAgKiBjYW4gYmUgYSBzdHJpbmcgdXNpbmcgZG90LSBhbmQgYnJhY2tldC1ub3RhdGlvbiBmb3IgbmVzdGVkIHJlZmVyZW5jZS4gVGhlXG4gICAqIHByb3BlcnR5IGNhbm5vdCBleGlzdCBvbiB0aGUgb2JqZWN0IG5vciBhbnl3aGVyZSBpbiBpdHMgcHJvdG90eXBlIGNoYWluLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdE5lc3RlZFByb3BlcnR5KHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9fSwgJ3RlYS5vb2xvbmcnKTtcbiAgICpcbiAgICogQG5hbWUgbm90TmVzdGVkUHJvcGVydHlcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdE5lc3RlZFByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lm5vdE5lc3RlZFByb3BlcnR5LCB0cnVlKVxuICAgICAgLnRvLm5vdC5oYXZlLm5lc3RlZC5wcm9wZXJ0eShwcm9wKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5uZXN0ZWRQcm9wZXJ0eVZhbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGEgcHJvcGVydHkgbmFtZWQgYnkgYHByb3BlcnR5YCB3aXRoIHZhbHVlIGdpdmVuXG4gICAqIGJ5IGB2YWx1ZWAuIGBwcm9wZXJ0eWAgY2FuIHVzZSBkb3QtIGFuZCBicmFja2V0LW5vdGF0aW9uIGZvciBuZXN0ZWRcbiAgICogcmVmZXJlbmNlLiBVc2VzIGEgc3RyaWN0IGVxdWFsaXR5IGNoZWNrICg9PT0pLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5lc3RlZFByb3BlcnR5VmFsKHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9fSwgJ3RlYS5ncmVlbicsICdtYXRjaGEnKTtcbiAgICpcbiAgICogQG5hbWUgbmVzdGVkUHJvcGVydHlWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5lc3RlZFByb3BlcnR5VmFsID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQubmVzdGVkUHJvcGVydHlWYWwsIHRydWUpXG4gICAgICAudG8uaGF2ZS5uZXN0ZWQucHJvcGVydHkocHJvcCwgdmFsKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3ROZXN0ZWRQcm9wZXJ0eVZhbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgZG9lcyBfbm90XyBoYXZlIGEgcHJvcGVydHkgbmFtZWQgYnkgYHByb3BlcnR5YCB3aXRoXG4gICAqIHZhbHVlIGdpdmVuIGJ5IGB2YWx1ZWAuIGBwcm9wZXJ0eWAgY2FuIHVzZSBkb3QtIGFuZCBicmFja2V0LW5vdGF0aW9uIGZvclxuICAgKiBuZXN0ZWQgcmVmZXJlbmNlLiBVc2VzIGEgc3RyaWN0IGVxdWFsaXR5IGNoZWNrICg9PT0pLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdE5lc3RlZFByb3BlcnR5VmFsKHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9fSwgJ3RlYS5ncmVlbicsICdrb25hY2hhJyk7XG4gICAqICAgICBhc3NlcnQubm90TmVzdGVkUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH19LCAnY29mZmVlLmdyZWVuJywgJ21hdGNoYScpO1xuICAgKlxuICAgKiBAbmFtZSBub3ROZXN0ZWRQcm9wZXJ0eVZhbFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90TmVzdGVkUHJvcGVydHlWYWwgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5ub3ROZXN0ZWRQcm9wZXJ0eVZhbCwgdHJ1ZSlcbiAgICAgIC50by5ub3QuaGF2ZS5uZXN0ZWQucHJvcGVydHkocHJvcCwgdmFsKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5kZWVwTmVzdGVkUHJvcGVydHlWYWwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGhhcyBhIHByb3BlcnR5IG5hbWVkIGJ5IGBwcm9wZXJ0eWAgd2l0aCBhIHZhbHVlIGdpdmVuXG4gICAqIGJ5IGB2YWx1ZWAuIGBwcm9wZXJ0eWAgY2FuIHVzZSBkb3QtIGFuZCBicmFja2V0LW5vdGF0aW9uIGZvciBuZXN0ZWRcbiAgICogcmVmZXJlbmNlLiBVc2VzIGEgZGVlcCBlcXVhbGl0eSBjaGVjay5cbiAgICpcbiAgICogICAgIGFzc2VydC5kZWVwTmVzdGVkUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46IHsgbWF0Y2hhOiAneXVtJyB9IH0gfSwgJ3RlYS5ncmVlbicsIHsgbWF0Y2hhOiAneXVtJyB9KTtcbiAgICpcbiAgICogQG5hbWUgZGVlcE5lc3RlZFByb3BlcnR5VmFsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5kZWVwTmVzdGVkUHJvcGVydHlWYWwgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5kZWVwTmVzdGVkUHJvcGVydHlWYWwsIHRydWUpXG4gICAgICAudG8uaGF2ZS5kZWVwLm5lc3RlZC5wcm9wZXJ0eShwcm9wLCB2YWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdERlZXBOZXN0ZWRQcm9wZXJ0eVZhbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgZG9lcyBfbm90XyBoYXZlIGEgcHJvcGVydHkgbmFtZWQgYnkgYHByb3BlcnR5YCB3aXRoXG4gICAqIHZhbHVlIGdpdmVuIGJ5IGB2YWx1ZWAuIGBwcm9wZXJ0eWAgY2FuIHVzZSBkb3QtIGFuZCBicmFja2V0LW5vdGF0aW9uIGZvclxuICAgKiBuZXN0ZWQgcmVmZXJlbmNlLiBVc2VzIGEgZGVlcCBlcXVhbGl0eSBjaGVjay5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3REZWVwTmVzdGVkUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46IHsgbWF0Y2hhOiAneXVtJyB9IH0gfSwgJ3RlYS5ncmVlbicsIHsgb29sb25nOiAneXVtJyB9KTtcbiAgICogICAgIGFzc2VydC5ub3REZWVwTmVzdGVkUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46IHsgbWF0Y2hhOiAneXVtJyB9IH0gfSwgJ3RlYS5ncmVlbicsIHsgbWF0Y2hhOiAneXVjaycgfSk7XG4gICAqICAgICBhc3NlcnQubm90RGVlcE5lc3RlZFByb3BlcnR5VmFsKHsgdGVhOiB7IGdyZWVuOiB7IG1hdGNoYTogJ3l1bScgfSB9IH0sICd0ZWEuYmxhY2snLCB7IG1hdGNoYTogJ3l1bScgfSk7XG4gICAqXG4gICAqIEBuYW1lIG5vdERlZXBOZXN0ZWRQcm9wZXJ0eVZhbFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90RGVlcE5lc3RlZFByb3BlcnR5VmFsID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQubm90RGVlcE5lc3RlZFByb3BlcnR5VmFsLCB0cnVlKVxuICAgICAgLnRvLm5vdC5oYXZlLmRlZXAubmVzdGVkLnByb3BlcnR5KHByb3AsIHZhbCk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5sZW5ndGhPZihvYmplY3QsIGxlbmd0aCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGEgYGxlbmd0aGAgb3IgYHNpemVgIHdpdGggdGhlIGV4cGVjdGVkIHZhbHVlLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lmxlbmd0aE9mKFsxLDIsM10sIDMsICdhcnJheSBoYXMgbGVuZ3RoIG9mIDMnKTtcbiAgICogICAgIGFzc2VydC5sZW5ndGhPZignZm9vYmFyJywgNiwgJ3N0cmluZyBoYXMgbGVuZ3RoIG9mIDYnKTtcbiAgICogICAgIGFzc2VydC5sZW5ndGhPZihuZXcgU2V0KFsxLDIsM10pLCAzLCAnc2V0IGhhcyBzaXplIG9mIDMnKTtcbiAgICogICAgIGFzc2VydC5sZW5ndGhPZihuZXcgTWFwKFtbJ2EnLDFdLFsnYicsMl0sWydjJywzXV0pLCAzLCAnbWFwIGhhcyBzaXplIG9mIDMnKTtcbiAgICpcbiAgICogQG5hbWUgbGVuZ3RoT2ZcbiAgICogQHBhcmFtIHtNaXhlZH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lmxlbmd0aE9mID0gZnVuY3Rpb24gKGV4cCwgbGVuLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubGVuZ3RoT2YsIHRydWUpLnRvLmhhdmUubGVuZ3RoT2YobGVuKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5oYXNBbnlLZXlzKG9iamVjdCwgW2tleXNdLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgYXQgbGVhc3Qgb25lIG9mIHRoZSBga2V5c2AgcHJvdmlkZWQuXG4gICAqIFlvdSBjYW4gYWxzbyBwcm92aWRlIGEgc2luZ2xlIG9iamVjdCBpbnN0ZWFkIG9mIGEgYGtleXNgIGFycmF5IGFuZCBpdHMga2V5c1xuICAgKiB3aWxsIGJlIHVzZWQgYXMgdGhlIGV4cGVjdGVkIHNldCBvZiBrZXlzLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lmhhc0FueUtleXMoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9LCBbJ2ZvbycsICdpRG9udEV4aXN0JywgJ2JheiddKTtcbiAgICogICAgIGFzc2VydC5oYXNBbnlLZXlzKHtmb286IDEsIGJhcjogMiwgYmF6OiAzfSwge2ZvbzogMzAsIGlEb250RXhpc3Q6IDk5LCBiYXo6IDEzMzd9KTtcbiAgICogICAgIGFzc2VydC5oYXNBbnlLZXlzKG5ldyBNYXAoW1t7Zm9vOiAxfSwgJ2JhciddLCBbJ2tleScsICd2YWx1ZSddXSksIFt7Zm9vOiAxfSwgJ2tleSddKTtcbiAgICogICAgIGFzc2VydC5oYXNBbnlLZXlzKG5ldyBTZXQoW3tmb286ICdiYXInfSwgJ2Fub3RoZXJLZXknXSksIFt7Zm9vOiAnYmFyJ30sICdhbm90aGVyS2V5J10pO1xuICAgKlxuICAgKiBAbmFtZSBoYXNBbnlLZXlzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IG9iamVjdFxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0ga2V5c1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaGFzQW55S2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5oYXNBbnlLZXlzLCB0cnVlKS50by5oYXZlLmFueS5rZXlzKGtleXMpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuaGFzQWxsS2V5cyhvYmplY3QsIFtrZXlzXSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGFsbCBhbmQgb25seSBhbGwgb2YgdGhlIGBrZXlzYCBwcm92aWRlZC5cbiAgICogWW91IGNhbiBhbHNvIHByb3ZpZGUgYSBzaW5nbGUgb2JqZWN0IGluc3RlYWQgb2YgYSBga2V5c2AgYXJyYXkgYW5kIGl0cyBrZXlzXG4gICAqIHdpbGwgYmUgdXNlZCBhcyB0aGUgZXhwZWN0ZWQgc2V0IG9mIGtleXMuXG4gICAqXG4gICAqICAgICBhc3NlcnQuaGFzQWxsS2V5cyh7Zm9vOiAxLCBiYXI6IDIsIGJhejogM30sIFsnZm9vJywgJ2JhcicsICdiYXonXSk7XG4gICAqICAgICBhc3NlcnQuaGFzQWxsS2V5cyh7Zm9vOiAxLCBiYXI6IDIsIGJhejogM30sIHtmb286IDMwLCBiYXI6IDk5LCBiYXo6IDEzMzddKTtcbiAgICogICAgIGFzc2VydC5oYXNBbGxLZXlzKG5ldyBNYXAoW1t7Zm9vOiAxfSwgJ2JhciddLCBbJ2tleScsICd2YWx1ZSddXSksIFt7Zm9vOiAxfSwgJ2tleSddKTtcbiAgICogICAgIGFzc2VydC5oYXNBbGxLZXlzKG5ldyBTZXQoW3tmb286ICdiYXInfSwgJ2Fub3RoZXJLZXknXSwgW3tmb286ICdiYXInfSwgJ2Fub3RoZXJLZXknXSk7XG4gICAqXG4gICAqIEBuYW1lIGhhc0FsbEtleXNcbiAgICogQHBhcmFtIHtNaXhlZH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nW119IGtleXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lmhhc0FsbEtleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaGFzQWxsS2V5cywgdHJ1ZSkudG8uaGF2ZS5hbGwua2V5cyhrZXlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLmNvbnRhaW5zQWxsS2V5cyhvYmplY3QsIFtrZXlzXSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGFsbCBvZiB0aGUgYGtleXNgIHByb3ZpZGVkIGJ1dCBtYXkgaGF2ZSBtb3JlIGtleXMgbm90IGxpc3RlZC5cbiAgICogWW91IGNhbiBhbHNvIHByb3ZpZGUgYSBzaW5nbGUgb2JqZWN0IGluc3RlYWQgb2YgYSBga2V5c2AgYXJyYXkgYW5kIGl0cyBrZXlzXG4gICAqIHdpbGwgYmUgdXNlZCBhcyB0aGUgZXhwZWN0ZWQgc2V0IG9mIGtleXMuXG4gICAqXG4gICAqICAgICBhc3NlcnQuY29udGFpbnNBbGxLZXlzKHtmb286IDEsIGJhcjogMiwgYmF6OiAzfSwgWydmb28nLCAnYmF6J10pO1xuICAgKiAgICAgYXNzZXJ0LmNvbnRhaW5zQWxsS2V5cyh7Zm9vOiAxLCBiYXI6IDIsIGJhejogM30sIFsnZm9vJywgJ2JhcicsICdiYXonXSk7XG4gICAqICAgICBhc3NlcnQuY29udGFpbnNBbGxLZXlzKHtmb286IDEsIGJhcjogMiwgYmF6OiAzfSwge2ZvbzogMzAsIGJhejogMTMzN30pO1xuICAgKiAgICAgYXNzZXJ0LmNvbnRhaW5zQWxsS2V5cyh7Zm9vOiAxLCBiYXI6IDIsIGJhejogM30sIHtmb286IDMwLCBiYXI6IDk5LCBiYXo6IDEzMzd9KTtcbiAgICogICAgIGFzc2VydC5jb250YWluc0FsbEtleXMobmV3IE1hcChbW3tmb286IDF9LCAnYmFyJ10sIFsna2V5JywgJ3ZhbHVlJ11dKSwgW3tmb286IDF9XSk7XG4gICAqICAgICBhc3NlcnQuY29udGFpbnNBbGxLZXlzKG5ldyBNYXAoW1t7Zm9vOiAxfSwgJ2JhciddLCBbJ2tleScsICd2YWx1ZSddXSksIFt7Zm9vOiAxfSwgJ2tleSddKTtcbiAgICogICAgIGFzc2VydC5jb250YWluc0FsbEtleXMobmV3IFNldChbe2ZvbzogJ2Jhcid9LCAnYW5vdGhlcktleSddLCBbe2ZvbzogJ2Jhcid9XSk7XG4gICAqICAgICBhc3NlcnQuY29udGFpbnNBbGxLZXlzKG5ldyBTZXQoW3tmb286ICdiYXInfSwgJ2Fub3RoZXJLZXknXSwgW3tmb286ICdiYXInfSwgJ2Fub3RoZXJLZXknXSk7XG4gICAqXG4gICAqIEBuYW1lIGNvbnRhaW5zQWxsS2V5c1xuICAgKiBAcGFyYW0ge01peGVkfSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmdbXX0ga2V5c1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuY29udGFpbnNBbGxLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmNvbnRhaW5zQWxsS2V5cywgdHJ1ZSlcbiAgICAgIC50by5jb250YWluLmFsbC5rZXlzKGtleXMpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuZG9lc05vdEhhdmVBbnlLZXlzKG9iamVjdCwgW2tleXNdLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgbm9uZSBvZiB0aGUgYGtleXNgIHByb3ZpZGVkLlxuICAgKiBZb3UgY2FuIGFsc28gcHJvdmlkZSBhIHNpbmdsZSBvYmplY3QgaW5zdGVhZCBvZiBhIGBrZXlzYCBhcnJheSBhbmQgaXRzIGtleXNcbiAgICogd2lsbCBiZSB1c2VkIGFzIHRoZSBleHBlY3RlZCBzZXQgb2Yga2V5cy5cbiAgICpcbiAgICogICAgIGFzc2VydC5kb2VzTm90SGF2ZUFueUtleXMoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9LCBbJ29uZScsICd0d28nLCAnZXhhbXBsZSddKTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90SGF2ZUFueUtleXMoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9LCB7b25lOiAxLCB0d286IDIsIGV4YW1wbGU6ICdmb28nfSk7XG4gICAqICAgICBhc3NlcnQuZG9lc05vdEhhdmVBbnlLZXlzKG5ldyBNYXAoW1t7Zm9vOiAxfSwgJ2JhciddLCBbJ2tleScsICd2YWx1ZSddXSksIFt7b25lOiAndHdvJ30sICdleGFtcGxlJ10pO1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RIYXZlQW55S2V5cyhuZXcgU2V0KFt7Zm9vOiAnYmFyJ30sICdhbm90aGVyS2V5J10sIFt7b25lOiAndHdvJ30sICdleGFtcGxlJ10pO1xuICAgKlxuICAgKiBAbmFtZSBkb2VzTm90SGF2ZUFueUtleXNcbiAgICogQHBhcmFtIHtNaXhlZH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nW119IGtleXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRvZXNOb3RIYXZlQW55S2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5kb2VzTm90SGF2ZUFueUtleXMsIHRydWUpXG4gICAgICAudG8ubm90LmhhdmUuYW55LmtleXMoa2V5cyk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5kb2VzTm90SGF2ZUFsbEtleXMob2JqZWN0LCBba2V5c10sIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGRvZXMgbm90IGhhdmUgYXQgbGVhc3Qgb25lIG9mIHRoZSBga2V5c2AgcHJvdmlkZWQuXG4gICAqIFlvdSBjYW4gYWxzbyBwcm92aWRlIGEgc2luZ2xlIG9iamVjdCBpbnN0ZWFkIG9mIGEgYGtleXNgIGFycmF5IGFuZCBpdHMga2V5c1xuICAgKiB3aWxsIGJlIHVzZWQgYXMgdGhlIGV4cGVjdGVkIHNldCBvZiBrZXlzLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RIYXZlQWxsS2V5cyh7Zm9vOiAxLCBiYXI6IDIsIGJhejogM30sIFsnb25lJywgJ3R3bycsICdleGFtcGxlJ10pO1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RIYXZlQWxsS2V5cyh7Zm9vOiAxLCBiYXI6IDIsIGJhejogM30sIHtvbmU6IDEsIHR3bzogMiwgZXhhbXBsZTogJ2Zvbyd9KTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90SGF2ZUFsbEtleXMobmV3IE1hcChbW3tmb286IDF9LCAnYmFyJ10sIFsna2V5JywgJ3ZhbHVlJ11dKSwgW3tvbmU6ICd0d28nfSwgJ2V4YW1wbGUnXSk7XG4gICAqICAgICBhc3NlcnQuZG9lc05vdEhhdmVBbGxLZXlzKG5ldyBTZXQoW3tmb286ICdiYXInfSwgJ2Fub3RoZXJLZXknXSwgW3tvbmU6ICd0d28nfSwgJ2V4YW1wbGUnXSk7XG4gICAqXG4gICAqIEBuYW1lIGRvZXNOb3RIYXZlQWxsS2V5c1xuICAgKiBAcGFyYW0ge01peGVkfSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmdbXX0ga2V5c1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZG9lc05vdEhhdmVBbGxLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmRvZXNOb3RIYXZlQWxsS2V5cywgdHJ1ZSlcbiAgICAgIC50by5ub3QuaGF2ZS5hbGwua2V5cyhrZXlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLmhhc0FueURlZXBLZXlzKG9iamVjdCwgW2tleXNdLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgYXQgbGVhc3Qgb25lIG9mIHRoZSBga2V5c2AgcHJvdmlkZWQuXG4gICAqIFNpbmNlIFNldHMgYW5kIE1hcHMgY2FuIGhhdmUgb2JqZWN0cyBhcyBrZXlzIHlvdSBjYW4gdXNlIHRoaXMgYXNzZXJ0aW9uIHRvIHBlcmZvcm1cbiAgICogYSBkZWVwIGNvbXBhcmlzb24uXG4gICAqIFlvdSBjYW4gYWxzbyBwcm92aWRlIGEgc2luZ2xlIG9iamVjdCBpbnN0ZWFkIG9mIGEgYGtleXNgIGFycmF5IGFuZCBpdHMga2V5c1xuICAgKiB3aWxsIGJlIHVzZWQgYXMgdGhlIGV4cGVjdGVkIHNldCBvZiBrZXlzLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lmhhc0FueURlZXBLZXlzKG5ldyBNYXAoW1t7b25lOiAnb25lJ30sICd2YWx1ZU9uZSddLCBbMSwgMl1dKSwge29uZTogJ29uZSd9KTtcbiAgICogICAgIGFzc2VydC5oYXNBbnlEZWVwS2V5cyhuZXcgTWFwKFtbe29uZTogJ29uZSd9LCAndmFsdWVPbmUnXSwgWzEsIDJdXSksIFt7b25lOiAnb25lJ30sIHt0d286ICd0d28nfV0pO1xuICAgKiAgICAgYXNzZXJ0Lmhhc0FueURlZXBLZXlzKG5ldyBNYXAoW1t7b25lOiAnb25lJ30sICd2YWx1ZU9uZSddLCBbe3R3bzogJ3R3byd9LCAndmFsdWVUd28nXV0pLCBbe29uZTogJ29uZSd9LCB7dHdvOiAndHdvJ31dKTtcbiAgICogICAgIGFzc2VydC5oYXNBbnlEZWVwS2V5cyhuZXcgU2V0KFt7b25lOiAnb25lJ30sIHt0d286ICd0d28nfV0pLCB7b25lOiAnb25lJ30pO1xuICAgKiAgICAgYXNzZXJ0Lmhhc0FueURlZXBLZXlzKG5ldyBTZXQoW3tvbmU6ICdvbmUnfSwge3R3bzogJ3R3byd9XSksIFt7b25lOiAnb25lJ30sIHt0aHJlZTogJ3RocmVlJ31dKTtcbiAgICogICAgIGFzc2VydC5oYXNBbnlEZWVwS2V5cyhuZXcgU2V0KFt7b25lOiAnb25lJ30sIHt0d286ICd0d28nfV0pLCBbe29uZTogJ29uZSd9LCB7dHdvOiAndHdvJ31dKTtcbiAgICpcbiAgICogQG5hbWUgZG9lc05vdEhhdmVBbGxLZXlzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IG9iamVjdFxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0ga2V5c1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaGFzQW55RGVlcEtleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaGFzQW55RGVlcEtleXMsIHRydWUpXG4gICAgICAudG8uaGF2ZS5hbnkuZGVlcC5rZXlzKGtleXMpO1xuICB9XG5cbiAvKipcbiAgICogIyMjIC5oYXNBbGxEZWVwS2V5cyhvYmplY3QsIFtrZXlzXSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGFsbCBhbmQgb25seSBhbGwgb2YgdGhlIGBrZXlzYCBwcm92aWRlZC5cbiAgICogU2luY2UgU2V0cyBhbmQgTWFwcyBjYW4gaGF2ZSBvYmplY3RzIGFzIGtleXMgeW91IGNhbiB1c2UgdGhpcyBhc3NlcnRpb24gdG8gcGVyZm9ybVxuICAgKiBhIGRlZXAgY29tcGFyaXNvbi5cbiAgICogWW91IGNhbiBhbHNvIHByb3ZpZGUgYSBzaW5nbGUgb2JqZWN0IGluc3RlYWQgb2YgYSBga2V5c2AgYXJyYXkgYW5kIGl0cyBrZXlzXG4gICAqIHdpbGwgYmUgdXNlZCBhcyB0aGUgZXhwZWN0ZWQgc2V0IG9mIGtleXMuXG4gICAqXG4gICAqICAgICBhc3NlcnQuaGFzQWxsRGVlcEtleXMobmV3IE1hcChbW3tvbmU6ICdvbmUnfSwgJ3ZhbHVlT25lJ11dKSwge29uZTogJ29uZSd9KTtcbiAgICogICAgIGFzc2VydC5oYXNBbGxEZWVwS2V5cyhuZXcgTWFwKFtbe29uZTogJ29uZSd9LCAndmFsdWVPbmUnXSwgW3t0d286ICd0d28nfSwgJ3ZhbHVlVHdvJ11dKSwgW3tvbmU6ICdvbmUnfSwge3R3bzogJ3R3byd9XSk7XG4gICAqICAgICBhc3NlcnQuaGFzQWxsRGVlcEtleXMobmV3IFNldChbe29uZTogJ29uZSd9XSksIHtvbmU6ICdvbmUnfSk7XG4gICAqICAgICBhc3NlcnQuaGFzQWxsRGVlcEtleXMobmV3IFNldChbe29uZTogJ29uZSd9LCB7dHdvOiAndHdvJ31dKSwgW3tvbmU6ICdvbmUnfSwge3R3bzogJ3R3byd9XSk7XG4gICAqXG4gICAqIEBuYW1lIGhhc0FsbERlZXBLZXlzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IG9iamVjdFxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0ga2V5c1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaGFzQWxsRGVlcEtleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaGFzQWxsRGVlcEtleXMsIHRydWUpXG4gICAgICAudG8uaGF2ZS5hbGwuZGVlcC5rZXlzKGtleXMpO1xuICB9XG5cbiAvKipcbiAgICogIyMjIC5jb250YWluc0FsbERlZXBLZXlzKG9iamVjdCwgW2tleXNdLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBjb250YWlucyBhbGwgb2YgdGhlIGBrZXlzYCBwcm92aWRlZC5cbiAgICogU2luY2UgU2V0cyBhbmQgTWFwcyBjYW4gaGF2ZSBvYmplY3RzIGFzIGtleXMgeW91IGNhbiB1c2UgdGhpcyBhc3NlcnRpb24gdG8gcGVyZm9ybVxuICAgKiBhIGRlZXAgY29tcGFyaXNvbi5cbiAgICogWW91IGNhbiBhbHNvIHByb3ZpZGUgYSBzaW5nbGUgb2JqZWN0IGluc3RlYWQgb2YgYSBga2V5c2AgYXJyYXkgYW5kIGl0cyBrZXlzXG4gICAqIHdpbGwgYmUgdXNlZCBhcyB0aGUgZXhwZWN0ZWQgc2V0IG9mIGtleXMuXG4gICAqXG4gICAqICAgICBhc3NlcnQuY29udGFpbnNBbGxEZWVwS2V5cyhuZXcgTWFwKFtbe29uZTogJ29uZSd9LCAndmFsdWVPbmUnXSwgWzEsIDJdXSksIHtvbmU6ICdvbmUnfSk7XG4gICAqICAgICBhc3NlcnQuY29udGFpbnNBbGxEZWVwS2V5cyhuZXcgTWFwKFtbe29uZTogJ29uZSd9LCAndmFsdWVPbmUnXSwgW3t0d286ICd0d28nfSwgJ3ZhbHVlVHdvJ11dKSwgW3tvbmU6ICdvbmUnfSwge3R3bzogJ3R3byd9XSk7XG4gICAqICAgICBhc3NlcnQuY29udGFpbnNBbGxEZWVwS2V5cyhuZXcgU2V0KFt7b25lOiAnb25lJ30sIHt0d286ICd0d28nfV0pLCB7b25lOiAnb25lJ30pO1xuICAgKiAgICAgYXNzZXJ0LmNvbnRhaW5zQWxsRGVlcEtleXMobmV3IFNldChbe29uZTogJ29uZSd9LCB7dHdvOiAndHdvJ31dKSwgW3tvbmU6ICdvbmUnfSwge3R3bzogJ3R3byd9XSk7XG4gICAqXG4gICAqIEBuYW1lIGNvbnRhaW5zQWxsRGVlcEtleXNcbiAgICogQHBhcmFtIHtNaXhlZH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBrZXlzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5jb250YWluc0FsbERlZXBLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmNvbnRhaW5zQWxsRGVlcEtleXMsIHRydWUpXG4gICAgICAudG8uY29udGFpbi5hbGwuZGVlcC5rZXlzKGtleXMpO1xuICB9XG5cbiAvKipcbiAgICogIyMjIC5kb2VzTm90SGF2ZUFueURlZXBLZXlzKG9iamVjdCwgW2tleXNdLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgbm9uZSBvZiB0aGUgYGtleXNgIHByb3ZpZGVkLlxuICAgKiBTaW5jZSBTZXRzIGFuZCBNYXBzIGNhbiBoYXZlIG9iamVjdHMgYXMga2V5cyB5b3UgY2FuIHVzZSB0aGlzIGFzc2VydGlvbiB0byBwZXJmb3JtXG4gICAqIGEgZGVlcCBjb21wYXJpc29uLlxuICAgKiBZb3UgY2FuIGFsc28gcHJvdmlkZSBhIHNpbmdsZSBvYmplY3QgaW5zdGVhZCBvZiBhIGBrZXlzYCBhcnJheSBhbmQgaXRzIGtleXNcbiAgICogd2lsbCBiZSB1c2VkIGFzIHRoZSBleHBlY3RlZCBzZXQgb2Yga2V5cy5cbiAgICpcbiAgICogICAgIGFzc2VydC5kb2VzTm90SGF2ZUFueURlZXBLZXlzKG5ldyBNYXAoW1t7b25lOiAnb25lJ30sICd2YWx1ZU9uZSddLCBbMSwgMl1dKSwge3RoaXNEb2VzTm90OiAnZXhpc3QnfSk7XG4gICAqICAgICBhc3NlcnQuZG9lc05vdEhhdmVBbnlEZWVwS2V5cyhuZXcgTWFwKFtbe29uZTogJ29uZSd9LCAndmFsdWVPbmUnXSwgW3t0d286ICd0d28nfSwgJ3ZhbHVlVHdvJ11dKSwgW3t0d2VudHk6ICd0d2VudHknfSwge2ZpZnR5OiAnZmlmdHknfV0pO1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RIYXZlQW55RGVlcEtleXMobmV3IFNldChbe29uZTogJ29uZSd9LCB7dHdvOiAndHdvJ31dKSwge3R3ZW50eTogJ3R3ZW50eSd9KTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90SGF2ZUFueURlZXBLZXlzKG5ldyBTZXQoW3tvbmU6ICdvbmUnfSwge3R3bzogJ3R3byd9XSksIFt7dHdlbnR5OiAndHdlbnR5J30sIHtmaWZ0eTogJ2ZpZnR5J31dKTtcbiAgICpcbiAgICogQG5hbWUgZG9lc05vdEhhdmVBbnlEZWVwS2V5c1xuICAgKiBAcGFyYW0ge01peGVkfSBvYmplY3RcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGtleXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRvZXNOb3RIYXZlQW55RGVlcEtleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuZG9lc05vdEhhdmVBbnlEZWVwS2V5cywgdHJ1ZSlcbiAgICAgIC50by5ub3QuaGF2ZS5hbnkuZGVlcC5rZXlzKGtleXMpO1xuICB9XG5cbiAvKipcbiAgICogIyMjIC5kb2VzTm90SGF2ZUFsbERlZXBLZXlzKG9iamVjdCwgW2tleXNdLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBkb2VzIG5vdCBoYXZlIGF0IGxlYXN0IG9uZSBvZiB0aGUgYGtleXNgIHByb3ZpZGVkLlxuICAgKiBTaW5jZSBTZXRzIGFuZCBNYXBzIGNhbiBoYXZlIG9iamVjdHMgYXMga2V5cyB5b3UgY2FuIHVzZSB0aGlzIGFzc2VydGlvbiB0byBwZXJmb3JtXG4gICAqIGEgZGVlcCBjb21wYXJpc29uLlxuICAgKiBZb3UgY2FuIGFsc28gcHJvdmlkZSBhIHNpbmdsZSBvYmplY3QgaW5zdGVhZCBvZiBhIGBrZXlzYCBhcnJheSBhbmQgaXRzIGtleXNcbiAgICogd2lsbCBiZSB1c2VkIGFzIHRoZSBleHBlY3RlZCBzZXQgb2Yga2V5cy5cbiAgICpcbiAgICogICAgIGFzc2VydC5kb2VzTm90SGF2ZUFsbERlZXBLZXlzKG5ldyBNYXAoW1t7b25lOiAnb25lJ30sICd2YWx1ZU9uZSddLCBbMSwgMl1dKSwge3RoaXNEb2VzTm90OiAnZXhpc3QnfSk7XG4gICAqICAgICBhc3NlcnQuZG9lc05vdEhhdmVBbGxEZWVwS2V5cyhuZXcgTWFwKFtbe29uZTogJ29uZSd9LCAndmFsdWVPbmUnXSwgW3t0d286ICd0d28nfSwgJ3ZhbHVlVHdvJ11dKSwgW3t0d2VudHk6ICd0d2VudHknfSwge29uZTogJ29uZSd9XSk7XG4gICAqICAgICBhc3NlcnQuZG9lc05vdEhhdmVBbGxEZWVwS2V5cyhuZXcgU2V0KFt7b25lOiAnb25lJ30sIHt0d286ICd0d28nfV0pLCB7dHdlbnR5OiAndHdlbnR5J30pO1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RIYXZlQWxsRGVlcEtleXMobmV3IFNldChbe29uZTogJ29uZSd9LCB7dHdvOiAndHdvJ31dKSwgW3tvbmU6ICdvbmUnfSwge2ZpZnR5OiAnZmlmdHknfV0pO1xuICAgKlxuICAgKiBAbmFtZSBkb2VzTm90SGF2ZUFsbERlZXBLZXlzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IG9iamVjdFxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0ga2V5c1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZG9lc05vdEhhdmVBbGxEZWVwS2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5kb2VzTm90SGF2ZUFsbERlZXBLZXlzLCB0cnVlKVxuICAgICAgLnRvLm5vdC5oYXZlLmFsbC5kZWVwLmtleXMoa2V5cyk7XG4gIH1cblxuIC8qKlxuICAgKiAjIyMgLnRocm93cyhmbiwgW2Vycm9yTGlrZS9zdHJpbmcvcmVnZXhwXSwgW3N0cmluZy9yZWdleHBdLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIElmIGBlcnJvckxpa2VgIGlzIGFuIGBFcnJvcmAgY29uc3RydWN0b3IsIGFzc2VydHMgdGhhdCBgZm5gIHdpbGwgdGhyb3cgYW4gZXJyb3IgdGhhdCBpcyBhblxuICAgKiBpbnN0YW5jZSBvZiBgZXJyb3JMaWtlYC5cbiAgICogSWYgYGVycm9yTGlrZWAgaXMgYW4gYEVycm9yYCBpbnN0YW5jZSwgYXNzZXJ0cyB0aGF0IHRoZSBlcnJvciB0aHJvd24gaXMgdGhlIHNhbWVcbiAgICogaW5zdGFuY2UgYXMgYGVycm9yTGlrZWAuXG4gICAqIElmIGBlcnJNc2dNYXRjaGVyYCBpcyBwcm92aWRlZCwgaXQgYWxzbyBhc3NlcnRzIHRoYXQgdGhlIGVycm9yIHRocm93biB3aWxsIGhhdmUgYVxuICAgKiBtZXNzYWdlIG1hdGNoaW5nIGBlcnJNc2dNYXRjaGVyYC5cbiAgICpcbiAgICogICAgIGFzc2VydC50aHJvd3MoZm4sICdFcnJvciB0aHJvd24gbXVzdCBoYXZlIHRoaXMgbXNnJyk7XG4gICAqICAgICBhc3NlcnQudGhyb3dzKGZuLCAvRXJyb3IgdGhyb3duIG11c3QgaGF2ZSBhIG1zZyB0aGF0IG1hdGNoZXMgdGhpcy8pO1xuICAgKiAgICAgYXNzZXJ0LnRocm93cyhmbiwgUmVmZXJlbmNlRXJyb3IpO1xuICAgKiAgICAgYXNzZXJ0LnRocm93cyhmbiwgZXJyb3JJbnN0YW5jZSk7XG4gICAqICAgICBhc3NlcnQudGhyb3dzKGZuLCBSZWZlcmVuY2VFcnJvciwgJ0Vycm9yIHRocm93biBtdXN0IGJlIGEgUmVmZXJlbmNlRXJyb3IgYW5kIGhhdmUgdGhpcyBtc2cnKTtcbiAgICogICAgIGFzc2VydC50aHJvd3MoZm4sIGVycm9ySW5zdGFuY2UsICdFcnJvciB0aHJvd24gbXVzdCBiZSB0aGUgc2FtZSBlcnJvckluc3RhbmNlIGFuZCBoYXZlIHRoaXMgbXNnJyk7XG4gICAqICAgICBhc3NlcnQudGhyb3dzKGZuLCBSZWZlcmVuY2VFcnJvciwgL0Vycm9yIHRocm93biBtdXN0IGJlIGEgUmVmZXJlbmNlRXJyb3IgYW5kIG1hdGNoIHRoaXMvKTtcbiAgICogICAgIGFzc2VydC50aHJvd3MoZm4sIGVycm9ySW5zdGFuY2UsIC9FcnJvciB0aHJvd24gbXVzdCBiZSB0aGUgc2FtZSBlcnJvckluc3RhbmNlIGFuZCBtYXRjaCB0aGlzLyk7XG4gICAqXG4gICAqIEBuYW1lIHRocm93c1xuICAgKiBAYWxpYXMgdGhyb3dcbiAgICogQGFsaWFzIFRocm93XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEBwYXJhbSB7RXJyb3JDb25zdHJ1Y3RvcnxFcnJvcn0gZXJyb3JMaWtlXG4gICAqIEBwYXJhbSB7UmVnRXhwfFN0cmluZ30gZXJyTXNnTWF0Y2hlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Vycm9yI0Vycm9yX3R5cGVzXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC50aHJvd3MgPSBmdW5jdGlvbiAoZm4sIGVycm9yTGlrZSwgZXJyTXNnTWF0Y2hlciwgbXNnKSB7XG4gICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgZXJyb3JMaWtlIHx8IGVycm9yTGlrZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgZXJyTXNnTWF0Y2hlciA9IGVycm9yTGlrZTtcbiAgICAgIGVycm9yTGlrZSA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGFzc2VydEVyciA9IG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LnRocm93cywgdHJ1ZSlcbiAgICAgIC50by50aHJvdyhlcnJvckxpa2UsIGVyck1zZ01hdGNoZXIpO1xuICAgIHJldHVybiBmbGFnKGFzc2VydEVyciwgJ29iamVjdCcpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmRvZXNOb3RUaHJvdyhmbiwgW2Vycm9yTGlrZS9zdHJpbmcvcmVnZXhwXSwgW3N0cmluZy9yZWdleHBdLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIElmIGBlcnJvckxpa2VgIGlzIGFuIGBFcnJvcmAgY29uc3RydWN0b3IsIGFzc2VydHMgdGhhdCBgZm5gIHdpbGwgX25vdF8gdGhyb3cgYW4gZXJyb3IgdGhhdCBpcyBhblxuICAgKiBpbnN0YW5jZSBvZiBgZXJyb3JMaWtlYC5cbiAgICogSWYgYGVycm9yTGlrZWAgaXMgYW4gYEVycm9yYCBpbnN0YW5jZSwgYXNzZXJ0cyB0aGF0IHRoZSBlcnJvciB0aHJvd24gaXMgX25vdF8gdGhlIHNhbWVcbiAgICogaW5zdGFuY2UgYXMgYGVycm9yTGlrZWAuXG4gICAqIElmIGBlcnJNc2dNYXRjaGVyYCBpcyBwcm92aWRlZCwgaXQgYWxzbyBhc3NlcnRzIHRoYXQgdGhlIGVycm9yIHRocm93biB3aWxsIF9ub3RfIGhhdmUgYVxuICAgKiBtZXNzYWdlIG1hdGNoaW5nIGBlcnJNc2dNYXRjaGVyYC5cbiAgICpcbiAgICogICAgIGFzc2VydC5kb2VzTm90VGhyb3coZm4sICdBbnkgRXJyb3IgdGhyb3duIG11c3Qgbm90IGhhdmUgdGhpcyBtZXNzYWdlJyk7XG4gICAqICAgICBhc3NlcnQuZG9lc05vdFRocm93KGZuLCAvQW55IEVycm9yIHRocm93biBtdXN0IG5vdCBtYXRjaCB0aGlzLyk7XG4gICAqICAgICBhc3NlcnQuZG9lc05vdFRocm93KGZuLCBFcnJvcik7XG4gICAqICAgICBhc3NlcnQuZG9lc05vdFRocm93KGZuLCBlcnJvckluc3RhbmNlKTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90VGhyb3coZm4sIEVycm9yLCAnRXJyb3IgbXVzdCBub3QgaGF2ZSB0aGlzIG1lc3NhZ2UnKTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90VGhyb3coZm4sIGVycm9ySW5zdGFuY2UsICdFcnJvciBtdXN0IG5vdCBoYXZlIHRoaXMgbWVzc2FnZScpO1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RUaHJvdyhmbiwgRXJyb3IsIC9FcnJvciBtdXN0IG5vdCBtYXRjaCB0aGlzLyk7XG4gICAqICAgICBhc3NlcnQuZG9lc05vdFRocm93KGZuLCBlcnJvckluc3RhbmNlLCAvRXJyb3IgbXVzdCBub3QgbWF0Y2ggdGhpcy8pO1xuICAgKlxuICAgKiBAbmFtZSBkb2VzTm90VGhyb3dcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHBhcmFtIHtFcnJvckNvbnN0cnVjdG9yfSBlcnJvckxpa2VcbiAgICogQHBhcmFtIHtSZWdFeHB8U3RyaW5nfSBlcnJNc2dNYXRjaGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRXJyb3IjRXJyb3JfdHlwZXNcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRvZXNOb3RUaHJvdyA9IGZ1bmN0aW9uIChmbiwgZXJyb3JMaWtlLCBlcnJNc2dNYXRjaGVyLCBtc2cpIHtcbiAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBlcnJvckxpa2UgfHwgZXJyb3JMaWtlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICBlcnJNc2dNYXRjaGVyID0gZXJyb3JMaWtlO1xuICAgICAgZXJyb3JMaWtlID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5kb2VzTm90VGhyb3csIHRydWUpXG4gICAgICAudG8ubm90LnRocm93KGVycm9yTGlrZSwgZXJyTXNnTWF0Y2hlcik7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAub3BlcmF0b3IodmFsMSwgb3BlcmF0b3IsIHZhbDIsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQ29tcGFyZXMgdHdvIHZhbHVlcyB1c2luZyBgb3BlcmF0b3JgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm9wZXJhdG9yKDEsICc8JywgMiwgJ2V2ZXJ5dGhpbmcgaXMgb2snKTtcbiAgICogICAgIGFzc2VydC5vcGVyYXRvcigxLCAnPicsIDIsICd0aGlzIHdpbGwgZmFpbCcpO1xuICAgKlxuICAgKiBAbmFtZSBvcGVyYXRvclxuICAgKiBAcGFyYW0ge01peGVkfSB2YWwxXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcGVyYXRvclxuICAgKiBAcGFyYW0ge01peGVkfSB2YWwyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5vcGVyYXRvciA9IGZ1bmN0aW9uICh2YWwsIG9wZXJhdG9yLCB2YWwyLCBtc2cpIHtcbiAgICB2YXIgb2s7XG4gICAgc3dpdGNoKG9wZXJhdG9yKSB7XG4gICAgICBjYXNlICc9PSc6XG4gICAgICAgIG9rID0gdmFsID09IHZhbDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnPT09JzpcbiAgICAgICAgb2sgPSB2YWwgPT09IHZhbDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnPic6XG4gICAgICAgIG9rID0gdmFsID4gdmFsMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICc+PSc6XG4gICAgICAgIG9rID0gdmFsID49IHZhbDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnPCc6XG4gICAgICAgIG9rID0gdmFsIDwgdmFsMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICc8PSc6XG4gICAgICAgIG9rID0gdmFsIDw9IHZhbDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnIT0nOlxuICAgICAgICBvayA9IHZhbCAhPSB2YWwyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJyE9PSc6XG4gICAgICAgIG9rID0gdmFsICE9PSB2YWwyO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG1zZyA9IG1zZyA/IG1zZyArICc6ICcgOiBtc2c7XG4gICAgICAgIHRocm93IG5ldyBjaGFpLkFzc2VydGlvbkVycm9yKFxuICAgICAgICAgIG1zZyArICdJbnZhbGlkIG9wZXJhdG9yIFwiJyArIG9wZXJhdG9yICsgJ1wiJyxcbiAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgYXNzZXJ0Lm9wZXJhdG9yXG4gICAgICAgICk7XG4gICAgfVxuICAgIHZhciB0ZXN0ID0gbmV3IEFzc2VydGlvbihvaywgbXNnLCBhc3NlcnQub3BlcmF0b3IsIHRydWUpO1xuICAgIHRlc3QuYXNzZXJ0KFxuICAgICAgICB0cnVlID09PSBmbGFnKHRlc3QsICdvYmplY3QnKVxuICAgICAgLCAnZXhwZWN0ZWQgJyArIHV0aWwuaW5zcGVjdCh2YWwpICsgJyB0byBiZSAnICsgb3BlcmF0b3IgKyAnICcgKyB1dGlsLmluc3BlY3QodmFsMilcbiAgICAgICwgJ2V4cGVjdGVkICcgKyB1dGlsLmluc3BlY3QodmFsKSArICcgdG8gbm90IGJlICcgKyBvcGVyYXRvciArICcgJyArIHV0aWwuaW5zcGVjdCh2YWwyKSApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmNsb3NlVG8oYWN0dWFsLCBleHBlY3RlZCwgZGVsdGEsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgZXF1YWwgYGV4cGVjdGVkYCwgdG8gd2l0aGluIGEgKy8tIGBkZWx0YWAgcmFuZ2UuXG4gICAqXG4gICAqICAgICBhc3NlcnQuY2xvc2VUbygxLjUsIDEsIDAuNSwgJ251bWJlcnMgYXJlIGNsb3NlJyk7XG4gICAqXG4gICAqIEBuYW1lIGNsb3NlVG9cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFjdHVhbFxuICAgKiBAcGFyYW0ge051bWJlcn0gZXhwZWN0ZWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5jbG9zZVRvID0gZnVuY3Rpb24gKGFjdCwgZXhwLCBkZWx0YSwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihhY3QsIG1zZywgYXNzZXJ0LmNsb3NlVG8sIHRydWUpLnRvLmJlLmNsb3NlVG8oZXhwLCBkZWx0YSk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuYXBwcm94aW1hdGVseShhY3R1YWwsIGV4cGVjdGVkLCBkZWx0YSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCBgZXhwZWN0ZWRgLCB0byB3aXRoaW4gYSArLy0gYGRlbHRhYCByYW5nZS5cbiAgICpcbiAgICogICAgIGFzc2VydC5hcHByb3hpbWF0ZWx5KDEuNSwgMSwgMC41LCAnbnVtYmVycyBhcmUgY2xvc2UnKTtcbiAgICpcbiAgICogQG5hbWUgYXBwcm94aW1hdGVseVxuICAgKiBAcGFyYW0ge051bWJlcn0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBleHBlY3RlZFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsdGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmFwcHJveGltYXRlbHkgPSBmdW5jdGlvbiAoYWN0LCBleHAsIGRlbHRhLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQuYXBwcm94aW1hdGVseSwgdHJ1ZSlcbiAgICAgIC50by5iZS5hcHByb3hpbWF0ZWx5KGV4cCwgZGVsdGEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLnNhbWVNZW1iZXJzKHNldDEsIHNldDIsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBzZXQxYCBhbmQgYHNldDJgIGhhdmUgdGhlIHNhbWUgbWVtYmVycyBpbiBhbnkgb3JkZXIuIFVzZXMgYVxuICAgKiBzdHJpY3QgZXF1YWxpdHkgY2hlY2sgKD09PSkuXG4gICAqXG4gICAqICAgICBhc3NlcnQuc2FtZU1lbWJlcnMoWyAxLCAyLCAzIF0sIFsgMiwgMSwgMyBdLCAnc2FtZSBtZW1iZXJzJyk7XG4gICAqXG4gICAqIEBuYW1lIHNhbWVNZW1iZXJzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHNldDFcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0MlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuc2FtZU1lbWJlcnMgPSBmdW5jdGlvbiAoc2V0MSwgc2V0MiwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihzZXQxLCBtc2csIGFzc2VydC5zYW1lTWVtYmVycywgdHJ1ZSlcbiAgICAgIC50by5oYXZlLnNhbWUubWVtYmVycyhzZXQyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLm5vdFNhbWVNZW1iZXJzKHNldDEsIHNldDIsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBzZXQxYCBhbmQgYHNldDJgIGRvbid0IGhhdmUgdGhlIHNhbWUgbWVtYmVycyBpbiBhbnkgb3JkZXIuXG4gICAqIFVzZXMgYSBzdHJpY3QgZXF1YWxpdHkgY2hlY2sgKD09PSkuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90U2FtZU1lbWJlcnMoWyAxLCAyLCAzIF0sIFsgNSwgMSwgMyBdLCAnbm90IHNhbWUgbWVtYmVycycpO1xuICAgKlxuICAgKiBAbmFtZSBub3RTYW1lTWVtYmVyc1xuICAgKiBAcGFyYW0ge0FycmF5fSBzZXQxXG4gICAqIEBwYXJhbSB7QXJyYXl9IHNldDJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdFNhbWVNZW1iZXJzID0gZnVuY3Rpb24gKHNldDEsIHNldDIsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oc2V0MSwgbXNnLCBhc3NlcnQubm90U2FtZU1lbWJlcnMsIHRydWUpXG4gICAgICAudG8ubm90LmhhdmUuc2FtZS5tZW1iZXJzKHNldDIpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuc2FtZURlZXBNZW1iZXJzKHNldDEsIHNldDIsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBzZXQxYCBhbmQgYHNldDJgIGhhdmUgdGhlIHNhbWUgbWVtYmVycyBpbiBhbnkgb3JkZXIuIFVzZXMgYVxuICAgKiBkZWVwIGVxdWFsaXR5IGNoZWNrLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LnNhbWVEZWVwTWVtYmVycyhbIHsgYTogMSB9LCB7IGI6IDIgfSwgeyBjOiAzIH0gXSwgW3sgYjogMiB9LCB7IGE6IDEgfSwgeyBjOiAzIH1dLCAnc2FtZSBkZWVwIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgc2FtZURlZXBNZW1iZXJzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHNldDFcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0MlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuc2FtZURlZXBNZW1iZXJzID0gZnVuY3Rpb24gKHNldDEsIHNldDIsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oc2V0MSwgbXNnLCBhc3NlcnQuc2FtZURlZXBNZW1iZXJzLCB0cnVlKVxuICAgICAgLnRvLmhhdmUuc2FtZS5kZWVwLm1lbWJlcnMoc2V0Mik7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5ub3RTYW1lRGVlcE1lbWJlcnMoc2V0MSwgc2V0MiwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHNldDFgIGFuZCBgc2V0MmAgZG9uJ3QgaGF2ZSB0aGUgc2FtZSBtZW1iZXJzIGluIGFueSBvcmRlci5cbiAgICogVXNlcyBhIGRlZXAgZXF1YWxpdHkgY2hlY2suXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90U2FtZURlZXBNZW1iZXJzKFsgeyBhOiAxIH0sIHsgYjogMiB9LCB7IGM6IDMgfSBdLCBbeyBiOiAyIH0sIHsgYTogMSB9LCB7IGY6IDUgfV0sICdub3Qgc2FtZSBkZWVwIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgbm90U2FtZURlZXBNZW1iZXJzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHNldDFcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0MlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90U2FtZURlZXBNZW1iZXJzID0gZnVuY3Rpb24gKHNldDEsIHNldDIsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oc2V0MSwgbXNnLCBhc3NlcnQubm90U2FtZURlZXBNZW1iZXJzLCB0cnVlKVxuICAgICAgLnRvLm5vdC5oYXZlLnNhbWUuZGVlcC5tZW1iZXJzKHNldDIpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuc2FtZU9yZGVyZWRNZW1iZXJzKHNldDEsIHNldDIsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBzZXQxYCBhbmQgYHNldDJgIGhhdmUgdGhlIHNhbWUgbWVtYmVycyBpbiB0aGUgc2FtZSBvcmRlci5cbiAgICogVXNlcyBhIHN0cmljdCBlcXVhbGl0eSBjaGVjayAoPT09KS5cbiAgICpcbiAgICogICAgIGFzc2VydC5zYW1lT3JkZXJlZE1lbWJlcnMoWyAxLCAyLCAzIF0sIFsgMSwgMiwgMyBdLCAnc2FtZSBvcmRlcmVkIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgc2FtZU9yZGVyZWRNZW1iZXJzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHNldDFcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0MlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuc2FtZU9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24gKHNldDEsIHNldDIsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oc2V0MSwgbXNnLCBhc3NlcnQuc2FtZU9yZGVyZWRNZW1iZXJzLCB0cnVlKVxuICAgICAgLnRvLmhhdmUuc2FtZS5vcmRlcmVkLm1lbWJlcnMoc2V0Mik7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5ub3RTYW1lT3JkZXJlZE1lbWJlcnMoc2V0MSwgc2V0MiwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHNldDFgIGFuZCBgc2V0MmAgZG9uJ3QgaGF2ZSB0aGUgc2FtZSBtZW1iZXJzIGluIHRoZSBzYW1lXG4gICAqIG9yZGVyLiBVc2VzIGEgc3RyaWN0IGVxdWFsaXR5IGNoZWNrICg9PT0pLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdFNhbWVPcmRlcmVkTWVtYmVycyhbIDEsIDIsIDMgXSwgWyAyLCAxLCAzIF0sICdub3Qgc2FtZSBvcmRlcmVkIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgbm90U2FtZU9yZGVyZWRNZW1iZXJzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHNldDFcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0MlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90U2FtZU9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24gKHNldDEsIHNldDIsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oc2V0MSwgbXNnLCBhc3NlcnQubm90U2FtZU9yZGVyZWRNZW1iZXJzLCB0cnVlKVxuICAgICAgLnRvLm5vdC5oYXZlLnNhbWUub3JkZXJlZC5tZW1iZXJzKHNldDIpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuc2FtZURlZXBPcmRlcmVkTWVtYmVycyhzZXQxLCBzZXQyLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgc2V0MWAgYW5kIGBzZXQyYCBoYXZlIHRoZSBzYW1lIG1lbWJlcnMgaW4gdGhlIHNhbWUgb3JkZXIuXG4gICAqIFVzZXMgYSBkZWVwIGVxdWFsaXR5IGNoZWNrLlxuICAgKlxuICAgKiBhc3NlcnQuc2FtZURlZXBPcmRlcmVkTWVtYmVycyhbIHsgYTogMSB9LCB7IGI6IDIgfSwgeyBjOiAzIH0gXSwgWyB7IGE6IDEgfSwgeyBiOiAyIH0sIHsgYzogMyB9IF0sICdzYW1lIGRlZXAgb3JkZXJlZCBtZW1iZXJzJyk7XG4gICAqXG4gICAqIEBuYW1lIHNhbWVEZWVwT3JkZXJlZE1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0MVxuICAgKiBAcGFyYW0ge0FycmF5fSBzZXQyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5zYW1lRGVlcE9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24gKHNldDEsIHNldDIsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oc2V0MSwgbXNnLCBhc3NlcnQuc2FtZURlZXBPcmRlcmVkTWVtYmVycywgdHJ1ZSlcbiAgICAgIC50by5oYXZlLnNhbWUuZGVlcC5vcmRlcmVkLm1lbWJlcnMoc2V0Mik7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5ub3RTYW1lRGVlcE9yZGVyZWRNZW1iZXJzKHNldDEsIHNldDIsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBzZXQxYCBhbmQgYHNldDJgIGRvbid0IGhhdmUgdGhlIHNhbWUgbWVtYmVycyBpbiB0aGUgc2FtZVxuICAgKiBvcmRlci4gVXNlcyBhIGRlZXAgZXF1YWxpdHkgY2hlY2suXG4gICAqXG4gICAqIGFzc2VydC5ub3RTYW1lRGVlcE9yZGVyZWRNZW1iZXJzKFsgeyBhOiAxIH0sIHsgYjogMiB9LCB7IGM6IDMgfSBdLCBbIHsgYTogMSB9LCB7IGI6IDIgfSwgeyB6OiA1IH0gXSwgJ25vdCBzYW1lIGRlZXAgb3JkZXJlZCBtZW1iZXJzJyk7XG4gICAqIGFzc2VydC5ub3RTYW1lRGVlcE9yZGVyZWRNZW1iZXJzKFsgeyBhOiAxIH0sIHsgYjogMiB9LCB7IGM6IDMgfSBdLCBbIHsgYjogMiB9LCB7IGE6IDEgfSwgeyBjOiAzIH0gXSwgJ25vdCBzYW1lIGRlZXAgb3JkZXJlZCBtZW1iZXJzJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdFNhbWVEZWVwT3JkZXJlZE1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0MVxuICAgKiBAcGFyYW0ge0FycmF5fSBzZXQyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RTYW1lRGVlcE9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24gKHNldDEsIHNldDIsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oc2V0MSwgbXNnLCBhc3NlcnQubm90U2FtZURlZXBPcmRlcmVkTWVtYmVycywgdHJ1ZSlcbiAgICAgIC50by5ub3QuaGF2ZS5zYW1lLmRlZXAub3JkZXJlZC5tZW1iZXJzKHNldDIpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuaW5jbHVkZU1lbWJlcnMoc3VwZXJzZXQsIHN1YnNldCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHN1YnNldGAgaXMgaW5jbHVkZWQgaW4gYHN1cGVyc2V0YCBpbiBhbnkgb3JkZXIuIFVzZXMgYVxuICAgKiBzdHJpY3QgZXF1YWxpdHkgY2hlY2sgKD09PSkuIER1cGxpY2F0ZXMgYXJlIGlnbm9yZWQuXG4gICAqXG4gICAqICAgICBhc3NlcnQuaW5jbHVkZU1lbWJlcnMoWyAxLCAyLCAzIF0sIFsgMiwgMSwgMiBdLCAnaW5jbHVkZSBtZW1iZXJzJyk7XG4gICAqXG4gICAqIEBuYW1lIGluY2x1ZGVNZW1iZXJzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1cGVyc2V0XG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1YnNldFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaW5jbHVkZU1lbWJlcnMgPSBmdW5jdGlvbiAoc3VwZXJzZXQsIHN1YnNldCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihzdXBlcnNldCwgbXNnLCBhc3NlcnQuaW5jbHVkZU1lbWJlcnMsIHRydWUpXG4gICAgICAudG8uaW5jbHVkZS5tZW1iZXJzKHN1YnNldCk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5ub3RJbmNsdWRlTWVtYmVycyhzdXBlcnNldCwgc3Vic2V0LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgc3Vic2V0YCBpc24ndCBpbmNsdWRlZCBpbiBgc3VwZXJzZXRgIGluIGFueSBvcmRlci4gVXNlcyBhXG4gICAqIHN0cmljdCBlcXVhbGl0eSBjaGVjayAoPT09KS4gRHVwbGljYXRlcyBhcmUgaWdub3JlZC5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlTWVtYmVycyhbIDEsIDIsIDMgXSwgWyA1LCAxIF0sICdub3QgaW5jbHVkZSBtZW1iZXJzJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdEluY2x1ZGVNZW1iZXJzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1cGVyc2V0XG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1YnNldFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90SW5jbHVkZU1lbWJlcnMgPSBmdW5jdGlvbiAoc3VwZXJzZXQsIHN1YnNldCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihzdXBlcnNldCwgbXNnLCBhc3NlcnQubm90SW5jbHVkZU1lbWJlcnMsIHRydWUpXG4gICAgICAudG8ubm90LmluY2x1ZGUubWVtYmVycyhzdWJzZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuaW5jbHVkZURlZXBNZW1iZXJzKHN1cGVyc2V0LCBzdWJzZXQsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBzdWJzZXRgIGlzIGluY2x1ZGVkIGluIGBzdXBlcnNldGAgaW4gYW55IG9yZGVyLiBVc2VzIGEgZGVlcFxuICAgKiBlcXVhbGl0eSBjaGVjay4gRHVwbGljYXRlcyBhcmUgaWdub3JlZC5cbiAgICpcbiAgICogICAgIGFzc2VydC5pbmNsdWRlRGVlcE1lbWJlcnMoWyB7IGE6IDEgfSwgeyBiOiAyIH0sIHsgYzogMyB9IF0sIFsgeyBiOiAyIH0sIHsgYTogMSB9LCB7IGI6IDIgfSBdLCAnaW5jbHVkZSBkZWVwIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgaW5jbHVkZURlZXBNZW1iZXJzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1cGVyc2V0XG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1YnNldFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaW5jbHVkZURlZXBNZW1iZXJzID0gZnVuY3Rpb24gKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oc3VwZXJzZXQsIG1zZywgYXNzZXJ0LmluY2x1ZGVEZWVwTWVtYmVycywgdHJ1ZSlcbiAgICAgIC50by5pbmNsdWRlLmRlZXAubWVtYmVycyhzdWJzZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAubm90SW5jbHVkZURlZXBNZW1iZXJzKHN1cGVyc2V0LCBzdWJzZXQsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBzdWJzZXRgIGlzbid0IGluY2x1ZGVkIGluIGBzdXBlcnNldGAgaW4gYW55IG9yZGVyLiBVc2VzIGFcbiAgICogZGVlcCBlcXVhbGl0eSBjaGVjay4gRHVwbGljYXRlcyBhcmUgaWdub3JlZC5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlRGVlcE1lbWJlcnMoWyB7IGE6IDEgfSwgeyBiOiAyIH0sIHsgYzogMyB9IF0sIFsgeyBiOiAyIH0sIHsgZjogNSB9IF0sICdub3QgaW5jbHVkZSBkZWVwIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgbm90SW5jbHVkZURlZXBNZW1iZXJzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1cGVyc2V0XG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1YnNldFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90SW5jbHVkZURlZXBNZW1iZXJzID0gZnVuY3Rpb24gKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oc3VwZXJzZXQsIG1zZywgYXNzZXJ0Lm5vdEluY2x1ZGVEZWVwTWVtYmVycywgdHJ1ZSlcbiAgICAgIC50by5ub3QuaW5jbHVkZS5kZWVwLm1lbWJlcnMoc3Vic2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLmluY2x1ZGVPcmRlcmVkTWVtYmVycyhzdXBlcnNldCwgc3Vic2V0LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgc3Vic2V0YCBpcyBpbmNsdWRlZCBpbiBgc3VwZXJzZXRgIGluIHRoZSBzYW1lIG9yZGVyXG4gICAqIGJlZ2lubmluZyB3aXRoIHRoZSBmaXJzdCBlbGVtZW50IGluIGBzdXBlcnNldGAuIFVzZXMgYSBzdHJpY3QgZXF1YWxpdHlcbiAgICogY2hlY2sgKD09PSkuXG4gICAqXG4gICAqICAgICBhc3NlcnQuaW5jbHVkZU9yZGVyZWRNZW1iZXJzKFsgMSwgMiwgMyBdLCBbIDEsIDIgXSwgJ2luY2x1ZGUgb3JkZXJlZCBtZW1iZXJzJyk7XG4gICAqXG4gICAqIEBuYW1lIGluY2x1ZGVPcmRlcmVkTWVtYmVyc1xuICAgKiBAcGFyYW0ge0FycmF5fSBzdXBlcnNldFxuICAgKiBAcGFyYW0ge0FycmF5fSBzdWJzZXRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmluY2x1ZGVPcmRlcmVkTWVtYmVycyA9IGZ1bmN0aW9uIChzdXBlcnNldCwgc3Vic2V0LCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHN1cGVyc2V0LCBtc2csIGFzc2VydC5pbmNsdWRlT3JkZXJlZE1lbWJlcnMsIHRydWUpXG4gICAgICAudG8uaW5jbHVkZS5vcmRlcmVkLm1lbWJlcnMoc3Vic2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLm5vdEluY2x1ZGVPcmRlcmVkTWVtYmVycyhzdXBlcnNldCwgc3Vic2V0LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgc3Vic2V0YCBpc24ndCBpbmNsdWRlZCBpbiBgc3VwZXJzZXRgIGluIHRoZSBzYW1lIG9yZGVyXG4gICAqIGJlZ2lubmluZyB3aXRoIHRoZSBmaXJzdCBlbGVtZW50IGluIGBzdXBlcnNldGAuIFVzZXMgYSBzdHJpY3QgZXF1YWxpdHlcbiAgICogY2hlY2sgKD09PSkuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90SW5jbHVkZU9yZGVyZWRNZW1iZXJzKFsgMSwgMiwgMyBdLCBbIDIsIDEgXSwgJ25vdCBpbmNsdWRlIG9yZGVyZWQgbWVtYmVycycpO1xuICAgKiAgICAgYXNzZXJ0Lm5vdEluY2x1ZGVPcmRlcmVkTWVtYmVycyhbIDEsIDIsIDMgXSwgWyAyLCAzIF0sICdub3QgaW5jbHVkZSBvcmRlcmVkIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgbm90SW5jbHVkZU9yZGVyZWRNZW1iZXJzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1cGVyc2V0XG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1YnNldFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90SW5jbHVkZU9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24gKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oc3VwZXJzZXQsIG1zZywgYXNzZXJ0Lm5vdEluY2x1ZGVPcmRlcmVkTWVtYmVycywgdHJ1ZSlcbiAgICAgIC50by5ub3QuaW5jbHVkZS5vcmRlcmVkLm1lbWJlcnMoc3Vic2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLmluY2x1ZGVEZWVwT3JkZXJlZE1lbWJlcnMoc3VwZXJzZXQsIHN1YnNldCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHN1YnNldGAgaXMgaW5jbHVkZWQgaW4gYHN1cGVyc2V0YCBpbiB0aGUgc2FtZSBvcmRlclxuICAgKiBiZWdpbm5pbmcgd2l0aCB0aGUgZmlyc3QgZWxlbWVudCBpbiBgc3VwZXJzZXRgLiBVc2VzIGEgZGVlcCBlcXVhbGl0eVxuICAgKiBjaGVjay5cbiAgICpcbiAgICogICAgIGFzc2VydC5pbmNsdWRlRGVlcE9yZGVyZWRNZW1iZXJzKFsgeyBhOiAxIH0sIHsgYjogMiB9LCB7IGM6IDMgfSBdLCBbIHsgYTogMSB9LCB7IGI6IDIgfSBdLCAnaW5jbHVkZSBkZWVwIG9yZGVyZWQgbWVtYmVycycpO1xuICAgKlxuICAgKiBAbmFtZSBpbmNsdWRlRGVlcE9yZGVyZWRNZW1iZXJzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1cGVyc2V0XG4gICAqIEBwYXJhbSB7QXJyYXl9IHN1YnNldFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaW5jbHVkZURlZXBPcmRlcmVkTWVtYmVycyA9IGZ1bmN0aW9uIChzdXBlcnNldCwgc3Vic2V0LCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHN1cGVyc2V0LCBtc2csIGFzc2VydC5pbmNsdWRlRGVlcE9yZGVyZWRNZW1iZXJzLCB0cnVlKVxuICAgICAgLnRvLmluY2x1ZGUuZGVlcC5vcmRlcmVkLm1lbWJlcnMoc3Vic2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLm5vdEluY2x1ZGVEZWVwT3JkZXJlZE1lbWJlcnMoc3VwZXJzZXQsIHN1YnNldCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHN1YnNldGAgaXNuJ3QgaW5jbHVkZWQgaW4gYHN1cGVyc2V0YCBpbiB0aGUgc2FtZSBvcmRlclxuICAgKiBiZWdpbm5pbmcgd2l0aCB0aGUgZmlyc3QgZWxlbWVudCBpbiBgc3VwZXJzZXRgLiBVc2VzIGEgZGVlcCBlcXVhbGl0eVxuICAgKiBjaGVjay5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlRGVlcE9yZGVyZWRNZW1iZXJzKFsgeyBhOiAxIH0sIHsgYjogMiB9LCB7IGM6IDMgfSBdLCBbIHsgYTogMSB9LCB7IGY6IDUgfSBdLCAnbm90IGluY2x1ZGUgZGVlcCBvcmRlcmVkIG1lbWJlcnMnKTtcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlRGVlcE9yZGVyZWRNZW1iZXJzKFsgeyBhOiAxIH0sIHsgYjogMiB9LCB7IGM6IDMgfSBdLCBbIHsgYjogMiB9LCB7IGE6IDEgfSBdLCAnbm90IGluY2x1ZGUgZGVlcCBvcmRlcmVkIG1lbWJlcnMnKTtcbiAgICogICAgIGFzc2VydC5ub3RJbmNsdWRlRGVlcE9yZGVyZWRNZW1iZXJzKFsgeyBhOiAxIH0sIHsgYjogMiB9LCB7IGM6IDMgfSBdLCBbIHsgYjogMiB9LCB7IGM6IDMgfSBdLCAnbm90IGluY2x1ZGUgZGVlcCBvcmRlcmVkIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgbm90SW5jbHVkZURlZXBPcmRlcmVkTWVtYmVyc1xuICAgKiBAcGFyYW0ge0FycmF5fSBzdXBlcnNldFxuICAgKiBAcGFyYW0ge0FycmF5fSBzdWJzZXRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdEluY2x1ZGVEZWVwT3JkZXJlZE1lbWJlcnMgPSBmdW5jdGlvbiAoc3VwZXJzZXQsIHN1YnNldCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihzdXBlcnNldCwgbXNnLCBhc3NlcnQubm90SW5jbHVkZURlZXBPcmRlcmVkTWVtYmVycywgdHJ1ZSlcbiAgICAgIC50by5ub3QuaW5jbHVkZS5kZWVwLm9yZGVyZWQubWVtYmVycyhzdWJzZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAub25lT2YoaW5MaXN0LCBsaXN0LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBub24tb2JqZWN0LCBub24tYXJyYXkgdmFsdWUgYGluTGlzdGAgYXBwZWFycyBpbiB0aGUgZmxhdCBhcnJheSBgbGlzdGAuXG4gICAqXG4gICAqICAgICBhc3NlcnQub25lT2YoMSwgWyAyLCAxIF0sICdOb3QgZm91bmQgaW4gbGlzdCcpO1xuICAgKlxuICAgKiBAbmFtZSBvbmVPZlxuICAgKiBAcGFyYW0geyp9IGluTGlzdFxuICAgKiBAcGFyYW0ge0FycmF5PCo+fSBsaXN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5vbmVPZiA9IGZ1bmN0aW9uIChpbkxpc3QsIGxpc3QsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oaW5MaXN0LCBtc2csIGFzc2VydC5vbmVPZiwgdHJ1ZSkudG8uYmUub25lT2YobGlzdCk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5jaGFuZ2VzKGZ1bmN0aW9uLCBvYmplY3QsIHByb3BlcnR5LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBhIGZ1bmN0aW9uIGNoYW5nZXMgdGhlIHZhbHVlIG9mIGEgcHJvcGVydHkuXG4gICAqXG4gICAqICAgICB2YXIgb2JqID0geyB2YWw6IDEwIH07XG4gICAqICAgICB2YXIgZm4gPSBmdW5jdGlvbigpIHsgb2JqLnZhbCA9IDIyIH07XG4gICAqICAgICBhc3NlcnQuY2hhbmdlcyhmbiwgb2JqLCAndmFsJyk7XG4gICAqXG4gICAqIEBuYW1lIGNoYW5nZXNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbW9kaWZpZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBvciBnZXR0ZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IG5hbWUgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5jaGFuZ2VzID0gZnVuY3Rpb24gKGZuLCBvYmosIHByb3AsIG1zZykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG1zZyA9IHByb3A7XG4gICAgICBwcm9wID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5jaGFuZ2VzLCB0cnVlKS50by5jaGFuZ2Uob2JqLCBwcm9wKTtcbiAgfVxuXG4gICAvKipcbiAgICogIyMjIC5jaGFuZ2VzQnkoZnVuY3Rpb24sIG9iamVjdCwgcHJvcGVydHksIGRlbHRhLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBhIGZ1bmN0aW9uIGNoYW5nZXMgdGhlIHZhbHVlIG9mIGEgcHJvcGVydHkgYnkgYW4gYW1vdW50IChkZWx0YSkuXG4gICAqXG4gICAqICAgICB2YXIgb2JqID0geyB2YWw6IDEwIH07XG4gICAqICAgICB2YXIgZm4gPSBmdW5jdGlvbigpIHsgb2JqLnZhbCArPSAyIH07XG4gICAqICAgICBhc3NlcnQuY2hhbmdlc0J5KGZuLCBvYmosICd2YWwnLCAyKTtcbiAgICpcbiAgICogQG5hbWUgY2hhbmdlc0J5XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG1vZGlmaWVyIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3Qgb3IgZ2V0dGVyIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eSBuYW1lIF9vcHRpb25hbF9cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNoYW5nZSBhbW91bnQgKGRlbHRhKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5jaGFuZ2VzQnkgPSBmdW5jdGlvbiAoZm4sIG9iaiwgcHJvcCwgZGVsdGEsIG1zZykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0ICYmIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciB0bXBNc2cgPSBkZWx0YTtcbiAgICAgIGRlbHRhID0gcHJvcDtcbiAgICAgIG1zZyA9IHRtcE1zZztcbiAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgIGRlbHRhID0gcHJvcDtcbiAgICAgIHByb3AgPSBudWxsO1xuICAgIH1cblxuICAgIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmNoYW5nZXNCeSwgdHJ1ZSlcbiAgICAgIC50by5jaGFuZ2Uob2JqLCBwcm9wKS5ieShkZWx0YSk7XG4gIH1cblxuICAgLyoqXG4gICAqICMjIyAuZG9lc05vdENoYW5nZShmdW5jdGlvbiwgb2JqZWN0LCBwcm9wZXJ0eSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYSBmdW5jdGlvbiBkb2VzIG5vdCBjaGFuZ2UgdGhlIHZhbHVlIG9mIGEgcHJvcGVydHkuXG4gICAqXG4gICAqICAgICB2YXIgb2JqID0geyB2YWw6IDEwIH07XG4gICAqICAgICB2YXIgZm4gPSBmdW5jdGlvbigpIHsgY29uc29sZS5sb2coJ2ZvbycpOyB9O1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RDaGFuZ2UoZm4sIG9iaiwgJ3ZhbCcpO1xuICAgKlxuICAgKiBAbmFtZSBkb2VzTm90Q2hhbmdlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG1vZGlmaWVyIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3Qgb3IgZ2V0dGVyIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eSBuYW1lIF9vcHRpb25hbF9cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZG9lc05vdENoYW5nZSA9IGZ1bmN0aW9uIChmbiwgb2JqLCBwcm9wLCBtc2cpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyAmJiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBtc2cgPSBwcm9wO1xuICAgICAgcHJvcCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmRvZXNOb3RDaGFuZ2UsIHRydWUpXG4gICAgICAudG8ubm90LmNoYW5nZShvYmosIHByb3ApO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuY2hhbmdlc0J1dE5vdEJ5KGZ1bmN0aW9uLCBvYmplY3QsIHByb3BlcnR5LCBkZWx0YSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYSBmdW5jdGlvbiBkb2VzIG5vdCBjaGFuZ2UgdGhlIHZhbHVlIG9mIGEgcHJvcGVydHkgb3Igb2YgYSBmdW5jdGlvbidzIHJldHVybiB2YWx1ZSBieSBhbiBhbW91bnQgKGRlbHRhKVxuICAgKlxuICAgKiAgICAgdmFyIG9iaiA9IHsgdmFsOiAxMCB9O1xuICAgKiAgICAgdmFyIGZuID0gZnVuY3Rpb24oKSB7IG9iai52YWwgKz0gMTAgfTtcbiAgICogICAgIGFzc2VydC5jaGFuZ2VzQnV0Tm90QnkoZm4sIG9iaiwgJ3ZhbCcsIDUpO1xuICAgKlxuICAgKiBAbmFtZSBjaGFuZ2VzQnV0Tm90QnlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbW9kaWZpZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBvciBnZXR0ZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IG5hbWUgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge051bWJlcn0gY2hhbmdlIGFtb3VudCAoZGVsdGEpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmNoYW5nZXNCdXROb3RCeSA9IGZ1bmN0aW9uIChmbiwgb2JqLCBwcm9wLCBkZWx0YSwgbXNnKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQgJiYgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIHRtcE1zZyA9IGRlbHRhO1xuICAgICAgZGVsdGEgPSBwcm9wO1xuICAgICAgbXNnID0gdG1wTXNnO1xuICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgZGVsdGEgPSBwcm9wO1xuICAgICAgcHJvcCA9IG51bGw7XG4gICAgfVxuXG4gICAgbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuY2hhbmdlc0J1dE5vdEJ5LCB0cnVlKVxuICAgICAgLnRvLmNoYW5nZShvYmosIHByb3ApLmJ1dC5ub3QuYnkoZGVsdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuaW5jcmVhc2VzKGZ1bmN0aW9uLCBvYmplY3QsIHByb3BlcnR5LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBhIGZ1bmN0aW9uIGluY3JlYXNlcyBhIG51bWVyaWMgb2JqZWN0IHByb3BlcnR5LlxuICAgKlxuICAgKiAgICAgdmFyIG9iaiA9IHsgdmFsOiAxMCB9O1xuICAgKiAgICAgdmFyIGZuID0gZnVuY3Rpb24oKSB7IG9iai52YWwgPSAxMyB9O1xuICAgKiAgICAgYXNzZXJ0LmluY3JlYXNlcyhmbiwgb2JqLCAndmFsJyk7XG4gICAqXG4gICAqIEBuYW1lIGluY3JlYXNlc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb2RpZmllciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IG9yIGdldHRlciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHkgbmFtZSBfb3B0aW9uYWxfXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmluY3JlYXNlcyA9IGZ1bmN0aW9uIChmbiwgb2JqLCBwcm9wLCBtc2cpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyAmJiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBtc2cgPSBwcm9wO1xuICAgICAgcHJvcCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmluY3JlYXNlcywgdHJ1ZSlcbiAgICAgIC50by5pbmNyZWFzZShvYmosIHByb3ApO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuaW5jcmVhc2VzQnkoZnVuY3Rpb24sIG9iamVjdCwgcHJvcGVydHksIGRlbHRhLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBhIGZ1bmN0aW9uIGluY3JlYXNlcyBhIG51bWVyaWMgb2JqZWN0IHByb3BlcnR5IG9yIGEgZnVuY3Rpb24ncyByZXR1cm4gdmFsdWUgYnkgYW4gYW1vdW50IChkZWx0YSkuXG4gICAqXG4gICAqICAgICB2YXIgb2JqID0geyB2YWw6IDEwIH07XG4gICAqICAgICB2YXIgZm4gPSBmdW5jdGlvbigpIHsgb2JqLnZhbCArPSAxMCB9O1xuICAgKiAgICAgYXNzZXJ0LmluY3JlYXNlc0J5KGZuLCBvYmosICd2YWwnLCAxMCk7XG4gICAqXG4gICAqIEBuYW1lIGluY3JlYXNlc0J5XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG1vZGlmaWVyIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3Qgb3IgZ2V0dGVyIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eSBuYW1lIF9vcHRpb25hbF9cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNoYW5nZSBhbW91bnQgKGRlbHRhKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pbmNyZWFzZXNCeSA9IGZ1bmN0aW9uIChmbiwgb2JqLCBwcm9wLCBkZWx0YSwgbXNnKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQgJiYgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIHRtcE1zZyA9IGRlbHRhO1xuICAgICAgZGVsdGEgPSBwcm9wO1xuICAgICAgbXNnID0gdG1wTXNnO1xuICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgZGVsdGEgPSBwcm9wO1xuICAgICAgcHJvcCA9IG51bGw7XG4gICAgfVxuXG4gICAgbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuaW5jcmVhc2VzQnksIHRydWUpXG4gICAgICAudG8uaW5jcmVhc2Uob2JqLCBwcm9wKS5ieShkZWx0YSk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5kb2VzTm90SW5jcmVhc2UoZnVuY3Rpb24sIG9iamVjdCwgcHJvcGVydHksIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGEgZnVuY3Rpb24gZG9lcyBub3QgaW5jcmVhc2UgYSBudW1lcmljIG9iamVjdCBwcm9wZXJ0eS5cbiAgICpcbiAgICogICAgIHZhciBvYmogPSB7IHZhbDogMTAgfTtcbiAgICogICAgIHZhciBmbiA9IGZ1bmN0aW9uKCkgeyBvYmoudmFsID0gOCB9O1xuICAgKiAgICAgYXNzZXJ0LmRvZXNOb3RJbmNyZWFzZShmbiwgb2JqLCAndmFsJyk7XG4gICAqXG4gICAqIEBuYW1lIGRvZXNOb3RJbmNyZWFzZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb2RpZmllciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IG9yIGdldHRlciBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHkgbmFtZSBfb3B0aW9uYWxfXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRvZXNOb3RJbmNyZWFzZSA9IGZ1bmN0aW9uIChmbiwgb2JqLCBwcm9wLCBtc2cpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyAmJiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBtc2cgPSBwcm9wO1xuICAgICAgcHJvcCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmRvZXNOb3RJbmNyZWFzZSwgdHJ1ZSlcbiAgICAgIC50by5ub3QuaW5jcmVhc2Uob2JqLCBwcm9wKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLmluY3JlYXNlc0J1dE5vdEJ5KGZ1bmN0aW9uLCBvYmplY3QsIHByb3BlcnR5LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBhIGZ1bmN0aW9uIGRvZXMgbm90IGluY3JlYXNlIGEgbnVtZXJpYyBvYmplY3QgcHJvcGVydHkgb3IgZnVuY3Rpb24ncyByZXR1cm4gdmFsdWUgYnkgYW4gYW1vdW50IChkZWx0YSkuXG4gICAqXG4gICAqICAgICB2YXIgb2JqID0geyB2YWw6IDEwIH07XG4gICAqICAgICB2YXIgZm4gPSBmdW5jdGlvbigpIHsgb2JqLnZhbCA9IDE1IH07XG4gICAqICAgICBhc3NlcnQuaW5jcmVhc2VzQnV0Tm90QnkoZm4sIG9iaiwgJ3ZhbCcsIDEwKTtcbiAgICpcbiAgICogQG5hbWUgaW5jcmVhc2VzQnV0Tm90QnlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbW9kaWZpZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBvciBnZXR0ZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IG5hbWUgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge051bWJlcn0gY2hhbmdlIGFtb3VudCAoZGVsdGEpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmluY3JlYXNlc0J1dE5vdEJ5ID0gZnVuY3Rpb24gKGZuLCBvYmosIHByb3AsIGRlbHRhLCBtc2cpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCAmJiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgdG1wTXNnID0gZGVsdGE7XG4gICAgICBkZWx0YSA9IHByb3A7XG4gICAgICBtc2cgPSB0bXBNc2c7XG4gICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICBkZWx0YSA9IHByb3A7XG4gICAgICBwcm9wID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5pbmNyZWFzZXNCdXROb3RCeSwgdHJ1ZSlcbiAgICAgIC50by5pbmNyZWFzZShvYmosIHByb3ApLmJ1dC5ub3QuYnkoZGVsdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuZGVjcmVhc2VzKGZ1bmN0aW9uLCBvYmplY3QsIHByb3BlcnR5LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBhIGZ1bmN0aW9uIGRlY3JlYXNlcyBhIG51bWVyaWMgb2JqZWN0IHByb3BlcnR5LlxuICAgKlxuICAgKiAgICAgdmFyIG9iaiA9IHsgdmFsOiAxMCB9O1xuICAgKiAgICAgdmFyIGZuID0gZnVuY3Rpb24oKSB7IG9iai52YWwgPSA1IH07XG4gICAqICAgICBhc3NlcnQuZGVjcmVhc2VzKGZuLCBvYmosICd2YWwnKTtcbiAgICpcbiAgICogQG5hbWUgZGVjcmVhc2VzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG1vZGlmaWVyIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3Qgb3IgZ2V0dGVyIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eSBuYW1lIF9vcHRpb25hbF9cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuZGVjcmVhc2VzID0gZnVuY3Rpb24gKGZuLCBvYmosIHByb3AsIG1zZykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG1zZyA9IHByb3A7XG4gICAgICBwcm9wID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuZGVjcmVhc2VzLCB0cnVlKVxuICAgICAgLnRvLmRlY3JlYXNlKG9iaiwgcHJvcCk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5kZWNyZWFzZXNCeShmdW5jdGlvbiwgb2JqZWN0LCBwcm9wZXJ0eSwgZGVsdGEsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGEgZnVuY3Rpb24gZGVjcmVhc2VzIGEgbnVtZXJpYyBvYmplY3QgcHJvcGVydHkgb3IgYSBmdW5jdGlvbidzIHJldHVybiB2YWx1ZSBieSBhbiBhbW91bnQgKGRlbHRhKVxuICAgKlxuICAgKiAgICAgdmFyIG9iaiA9IHsgdmFsOiAxMCB9O1xuICAgKiAgICAgdmFyIGZuID0gZnVuY3Rpb24oKSB7IG9iai52YWwgLT0gNSB9O1xuICAgKiAgICAgYXNzZXJ0LmRlY3JlYXNlc0J5KGZuLCBvYmosICd2YWwnLCA1KTtcbiAgICpcbiAgICogQG5hbWUgZGVjcmVhc2VzQnlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbW9kaWZpZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBvciBnZXR0ZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IG5hbWUgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge051bWJlcn0gY2hhbmdlIGFtb3VudCAoZGVsdGEpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRlY3JlYXNlc0J5ID0gZnVuY3Rpb24gKGZuLCBvYmosIHByb3AsIGRlbHRhLCBtc2cpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCAmJiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgdG1wTXNnID0gZGVsdGE7XG4gICAgICBkZWx0YSA9IHByb3A7XG4gICAgICBtc2cgPSB0bXBNc2c7XG4gICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICBkZWx0YSA9IHByb3A7XG4gICAgICBwcm9wID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5kZWNyZWFzZXNCeSwgdHJ1ZSlcbiAgICAgIC50by5kZWNyZWFzZShvYmosIHByb3ApLmJ5KGRlbHRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLmRvZXNOb3REZWNyZWFzZShmdW5jdGlvbiwgb2JqZWN0LCBwcm9wZXJ0eSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYSBmdW5jdGlvbiBkb2VzIG5vdCBkZWNyZWFzZXMgYSBudW1lcmljIG9iamVjdCBwcm9wZXJ0eS5cbiAgICpcbiAgICogICAgIHZhciBvYmogPSB7IHZhbDogMTAgfTtcbiAgICogICAgIHZhciBmbiA9IGZ1bmN0aW9uKCkgeyBvYmoudmFsID0gMTUgfTtcbiAgICogICAgIGFzc2VydC5kb2VzTm90RGVjcmVhc2UoZm4sIG9iaiwgJ3ZhbCcpO1xuICAgKlxuICAgKiBAbmFtZSBkb2VzTm90RGVjcmVhc2VcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbW9kaWZpZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBvciBnZXR0ZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IG5hbWUgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5kb2VzTm90RGVjcmVhc2UgPSBmdW5jdGlvbiAoZm4sIG9iaiwgcHJvcCwgbXNnKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbXNnID0gcHJvcDtcbiAgICAgIHByb3AgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5kb2VzTm90RGVjcmVhc2UsIHRydWUpXG4gICAgICAudG8ubm90LmRlY3JlYXNlKG9iaiwgcHJvcCk7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5kb2VzTm90RGVjcmVhc2VCeShmdW5jdGlvbiwgb2JqZWN0LCBwcm9wZXJ0eSwgZGVsdGEsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGEgZnVuY3Rpb24gZG9lcyBub3QgZGVjcmVhc2VzIGEgbnVtZXJpYyBvYmplY3QgcHJvcGVydHkgb3IgYSBmdW5jdGlvbidzIHJldHVybiB2YWx1ZSBieSBhbiBhbW91bnQgKGRlbHRhKVxuICAgKlxuICAgKiAgICAgdmFyIG9iaiA9IHsgdmFsOiAxMCB9O1xuICAgKiAgICAgdmFyIGZuID0gZnVuY3Rpb24oKSB7IG9iai52YWwgPSA1IH07XG4gICAqICAgICBhc3NlcnQuZG9lc05vdERlY3JlYXNlQnkoZm4sIG9iaiwgJ3ZhbCcsIDEpO1xuICAgKlxuICAgKiBAbmFtZSBkb2VzTm90RGVjcmVhc2VcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbW9kaWZpZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBvciBnZXR0ZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IG5hbWUgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge051bWJlcn0gY2hhbmdlIGFtb3VudCAoZGVsdGEpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRvZXNOb3REZWNyZWFzZUJ5ID0gZnVuY3Rpb24gKGZuLCBvYmosIHByb3AsIGRlbHRhLCBtc2cpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCAmJiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgdG1wTXNnID0gZGVsdGE7XG4gICAgICBkZWx0YSA9IHByb3A7XG4gICAgICBtc2cgPSB0bXBNc2c7XG4gICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICBkZWx0YSA9IHByb3A7XG4gICAgICBwcm9wID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuZG9lc05vdERlY3JlYXNlQnksIHRydWUpXG4gICAgICAudG8ubm90LmRlY3JlYXNlKG9iaiwgcHJvcCkuYnkoZGVsdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIyAuZGVjcmVhc2VzQnV0Tm90QnkoZnVuY3Rpb24sIG9iamVjdCwgcHJvcGVydHksIGRlbHRhLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBhIGZ1bmN0aW9uIGRvZXMgbm90IGRlY3JlYXNlcyBhIG51bWVyaWMgb2JqZWN0IHByb3BlcnR5IG9yIGEgZnVuY3Rpb24ncyByZXR1cm4gdmFsdWUgYnkgYW4gYW1vdW50IChkZWx0YSlcbiAgICpcbiAgICogICAgIHZhciBvYmogPSB7IHZhbDogMTAgfTtcbiAgICogICAgIHZhciBmbiA9IGZ1bmN0aW9uKCkgeyBvYmoudmFsID0gNSB9O1xuICAgKiAgICAgYXNzZXJ0LmRlY3JlYXNlc0J1dE5vdEJ5KGZuLCBvYmosICd2YWwnLCAxKTtcbiAgICpcbiAgICogQG5hbWUgZGVjcmVhc2VzQnV0Tm90QnlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbW9kaWZpZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBvciBnZXR0ZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IG5hbWUgX29wdGlvbmFsX1xuICAgKiBAcGFyYW0ge051bWJlcn0gY2hhbmdlIGFtb3VudCAoZGVsdGEpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQG5hbWVzcGFjZSBBc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRlY3JlYXNlc0J1dE5vdEJ5ID0gZnVuY3Rpb24gKGZuLCBvYmosIHByb3AsIGRlbHRhLCBtc2cpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCAmJiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgdG1wTXNnID0gZGVsdGE7XG4gICAgICBkZWx0YSA9IHByb3A7XG4gICAgICBtc2cgPSB0bXBNc2c7XG4gICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICBkZWx0YSA9IHByb3A7XG4gICAgICBwcm9wID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5kZWNyZWFzZXNCdXROb3RCeSwgdHJ1ZSlcbiAgICAgIC50by5kZWNyZWFzZShvYmosIHByb3ApLmJ1dC5ub3QuYnkoZGVsdGEpO1xuICB9XG5cbiAgLyohXG4gICAqICMjIyAuaWZFcnJvcihvYmplY3QpXG4gICAqXG4gICAqIEFzc2VydHMgaWYgdmFsdWUgaXMgbm90IGEgZmFsc2UgdmFsdWUsIGFuZCB0aHJvd3MgaWYgaXQgaXMgYSB0cnVlIHZhbHVlLlxuICAgKiBUaGlzIGlzIGFkZGVkIHRvIGFsbG93IGZvciBjaGFpIHRvIGJlIGEgZHJvcC1pbiByZXBsYWNlbWVudCBmb3IgTm9kZSdzXG4gICAqIGFzc2VydCBjbGFzcy5cbiAgICpcbiAgICogICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0kgYW0gYSBjdXN0b20gZXJyb3InKTtcbiAgICogICAgIGFzc2VydC5pZkVycm9yKGVycik7IC8vIFJldGhyb3dzIGVyciFcbiAgICpcbiAgICogQG5hbWUgaWZFcnJvclxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pZkVycm9yID0gZnVuY3Rpb24gKHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHRocm93KHZhbCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzRXh0ZW5zaWJsZShvYmplY3QpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBpcyBleHRlbnNpYmxlIChjYW4gaGF2ZSBuZXcgcHJvcGVydGllcyBhZGRlZCB0byBpdCkuXG4gICAqXG4gICAqICAgICBhc3NlcnQuaXNFeHRlbnNpYmxlKHt9KTtcbiAgICpcbiAgICogQG5hbWUgaXNFeHRlbnNpYmxlXG4gICAqIEBhbGlhcyBleHRlbnNpYmxlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNFeHRlbnNpYmxlID0gZnVuY3Rpb24gKG9iaiwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmlzRXh0ZW5zaWJsZSwgdHJ1ZSkudG8uYmUuZXh0ZW5zaWJsZTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc05vdEV4dGVuc2libGUob2JqZWN0KVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaXMgX25vdF8gZXh0ZW5zaWJsZS5cbiAgICpcbiAgICogICAgIHZhciBub25FeHRlbnNpYmxlT2JqZWN0ID0gT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KTtcbiAgICogICAgIHZhciBzZWFsZWRPYmplY3QgPSBPYmplY3Quc2VhbCh7fSk7XG4gICAqICAgICB2YXIgZnJvemVuT2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG4gICAqXG4gICAqICAgICBhc3NlcnQuaXNOb3RFeHRlbnNpYmxlKG5vbkV4dGVuc2libGVPYmplY3QpO1xuICAgKiAgICAgYXNzZXJ0LmlzTm90RXh0ZW5zaWJsZShzZWFsZWRPYmplY3QpO1xuICAgKiAgICAgYXNzZXJ0LmlzTm90RXh0ZW5zaWJsZShmcm96ZW5PYmplY3QpO1xuICAgKlxuICAgKiBAbmFtZSBpc05vdEV4dGVuc2libGVcbiAgICogQGFsaWFzIG5vdEV4dGVuc2libGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdEV4dGVuc2libGUgPSBmdW5jdGlvbiAob2JqLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaXNOb3RFeHRlbnNpYmxlLCB0cnVlKS50by5ub3QuYmUuZXh0ZW5zaWJsZTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc1NlYWxlZChvYmplY3QpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBpcyBzZWFsZWQgKGNhbm5vdCBoYXZlIG5ldyBwcm9wZXJ0aWVzIGFkZGVkIHRvIGl0XG4gICAqIGFuZCBpdHMgZXhpc3RpbmcgcHJvcGVydGllcyBjYW5ub3QgYmUgcmVtb3ZlZCkuXG4gICAqXG4gICAqICAgICB2YXIgc2VhbGVkT2JqZWN0ID0gT2JqZWN0LnNlYWwoe30pO1xuICAgKiAgICAgdmFyIGZyb3plbk9iamVjdCA9IE9iamVjdC5zZWFsKHt9KTtcbiAgICpcbiAgICogICAgIGFzc2VydC5pc1NlYWxlZChzZWFsZWRPYmplY3QpO1xuICAgKiAgICAgYXNzZXJ0LmlzU2VhbGVkKGZyb3plbk9iamVjdCk7XG4gICAqXG4gICAqIEBuYW1lIGlzU2VhbGVkXG4gICAqIEBhbGlhcyBzZWFsZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc1NlYWxlZCA9IGZ1bmN0aW9uIChvYmosIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5pc1NlYWxlZCwgdHJ1ZSkudG8uYmUuc2VhbGVkO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90U2VhbGVkKG9iamVjdClcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGlzIF9ub3RfIHNlYWxlZC5cbiAgICpcbiAgICogICAgIGFzc2VydC5pc05vdFNlYWxlZCh7fSk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90U2VhbGVkXG4gICAqIEBhbGlhcyBub3RTZWFsZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdFNlYWxlZCA9IGZ1bmN0aW9uIChvYmosIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5pc05vdFNlYWxlZCwgdHJ1ZSkudG8ubm90LmJlLnNlYWxlZDtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc0Zyb3plbihvYmplY3QpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBpcyBmcm96ZW4gKGNhbm5vdCBoYXZlIG5ldyBwcm9wZXJ0aWVzIGFkZGVkIHRvIGl0XG4gICAqIGFuZCBpdHMgZXhpc3RpbmcgcHJvcGVydGllcyBjYW5ub3QgYmUgbW9kaWZpZWQpLlxuICAgKlxuICAgKiAgICAgdmFyIGZyb3plbk9iamVjdCA9IE9iamVjdC5mcmVlemUoe30pO1xuICAgKiAgICAgYXNzZXJ0LmZyb3plbihmcm96ZW5PYmplY3QpO1xuICAgKlxuICAgKiBAbmFtZSBpc0Zyb3plblxuICAgKiBAYWxpYXMgZnJvemVuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNGcm96ZW4gPSBmdW5jdGlvbiAob2JqLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaXNGcm96ZW4sIHRydWUpLnRvLmJlLmZyb3plbjtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc05vdEZyb3plbihvYmplY3QpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBpcyBfbm90XyBmcm96ZW4uXG4gICAqXG4gICAqICAgICBhc3NlcnQuaXNOb3RGcm96ZW4oe30pO1xuICAgKlxuICAgKiBAbmFtZSBpc05vdEZyb3plblxuICAgKiBAYWxpYXMgbm90RnJvemVuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOb3RGcm96ZW4gPSBmdW5jdGlvbiAob2JqLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaXNOb3RGcm96ZW4sIHRydWUpLnRvLm5vdC5iZS5mcm96ZW47XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNFbXB0eSh0YXJnZXQpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gYW55IHZhbHVlcy5cbiAgICogRm9yIGFycmF5cyBhbmQgc3RyaW5ncywgaXQgY2hlY2tzIHRoZSBgbGVuZ3RoYCBwcm9wZXJ0eS5cbiAgICogRm9yIGBNYXBgIGFuZCBgU2V0YCBpbnN0YW5jZXMsIGl0IGNoZWNrcyB0aGUgYHNpemVgIHByb3BlcnR5LlxuICAgKiBGb3Igbm9uLWZ1bmN0aW9uIG9iamVjdHMsIGl0IGdldHMgdGhlIGNvdW50IG9mIG93blxuICAgKiBlbnVtZXJhYmxlIHN0cmluZyBrZXlzLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzRW1wdHkoW10pO1xuICAgKiAgICAgYXNzZXJ0LmlzRW1wdHkoJycpO1xuICAgKiAgICAgYXNzZXJ0LmlzRW1wdHkobmV3IE1hcCk7XG4gICAqICAgICBhc3NlcnQuaXNFbXB0eSh7fSk7XG4gICAqXG4gICAqIEBuYW1lIGlzRW1wdHlcbiAgICogQGFsaWFzIGVtcHR5XG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fFN0cmluZ3xNYXB8U2V0fSB0YXJnZXRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAbmFtZXNwYWNlIEFzc2VydFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNFbXB0eSA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzRW1wdHksIHRydWUpLnRvLmJlLmVtcHR5O1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90RW1wdHkodGFyZ2V0KVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBjb250YWlucyB2YWx1ZXMuXG4gICAqIEZvciBhcnJheXMgYW5kIHN0cmluZ3MsIGl0IGNoZWNrcyB0aGUgYGxlbmd0aGAgcHJvcGVydHkuXG4gICAqIEZvciBgTWFwYCBhbmQgYFNldGAgaW5zdGFuY2VzLCBpdCBjaGVja3MgdGhlIGBzaXplYCBwcm9wZXJ0eS5cbiAgICogRm9yIG5vbi1mdW5jdGlvbiBvYmplY3RzLCBpdCBnZXRzIHRoZSBjb3VudCBvZiBvd25cbiAgICogZW51bWVyYWJsZSBzdHJpbmcga2V5cy5cbiAgICpcbiAgICogICAgIGFzc2VydC5pc05vdEVtcHR5KFsxLCAyXSk7XG4gICAqICAgICBhc3NlcnQuaXNOb3RFbXB0eSgnMzQnKTtcbiAgICogICAgIGFzc2VydC5pc05vdEVtcHR5KG5ldyBTZXQoWzUsIDZdKSk7XG4gICAqICAgICBhc3NlcnQuaXNOb3RFbXB0eSh7IGtleTogNyB9KTtcbiAgICpcbiAgICogQG5hbWUgaXNOb3RFbXB0eVxuICAgKiBAYWxpYXMgbm90RW1wdHlcbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8U3RyaW5nfE1hcHxTZXR9IHRhcmdldFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBuYW1lc3BhY2UgQXNzZXJ0XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdEVtcHR5ID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RFbXB0eSwgdHJ1ZSkudG8ubm90LmJlLmVtcHR5O1xuICB9O1xuXG4gIC8qIVxuICAgKiBBbGlhc2VzLlxuICAgKi9cblxuICAoZnVuY3Rpb24gYWxpYXMobmFtZSwgYXMpe1xuICAgIGFzc2VydFthc10gPSBhc3NlcnRbbmFtZV07XG4gICAgcmV0dXJuIGFsaWFzO1xuICB9KVxuICAoJ2lzT2snLCAnb2snKVxuICAoJ2lzTm90T2snLCAnbm90T2snKVxuICAoJ3Rocm93cycsICd0aHJvdycpXG4gICgndGhyb3dzJywgJ1Rocm93JylcbiAgKCdpc0V4dGVuc2libGUnLCAnZXh0ZW5zaWJsZScpXG4gICgnaXNOb3RFeHRlbnNpYmxlJywgJ25vdEV4dGVuc2libGUnKVxuICAoJ2lzU2VhbGVkJywgJ3NlYWxlZCcpXG4gICgnaXNOb3RTZWFsZWQnLCAnbm90U2VhbGVkJylcbiAgKCdpc0Zyb3plbicsICdmcm96ZW4nKVxuICAoJ2lzTm90RnJvemVuJywgJ25vdEZyb3plbicpXG4gICgnaXNFbXB0eScsICdlbXB0eScpXG4gICgnaXNOb3RFbXB0eScsICdub3RFbXB0eScpO1xufTtcbiIsIi8qIVxuICogY2hhaVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNoYWksIHV0aWwpIHtcbiAgY2hhaS5leHBlY3QgPSBmdW5jdGlvbiAodmFsLCBtZXNzYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBjaGFpLkFzc2VydGlvbih2YWwsIG1lc3NhZ2UpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmZhaWwoW21lc3NhZ2VdKVxuICAgKiAjIyMgLmZhaWwoYWN0dWFsLCBleHBlY3RlZCwgW21lc3NhZ2VdLCBbb3BlcmF0b3JdKVxuICAgKlxuICAgKiBUaHJvdyBhIGZhaWx1cmUuXG4gICAqXG4gICAqICAgICBleHBlY3QuZmFpbCgpO1xuICAgKiAgICAgZXhwZWN0LmZhaWwoXCJjdXN0b20gZXJyb3IgbWVzc2FnZVwiKTtcbiAgICogICAgIGV4cGVjdC5mYWlsKDEsIDIpO1xuICAgKiAgICAgZXhwZWN0LmZhaWwoMSwgMiwgXCJjdXN0b20gZXJyb3IgbWVzc2FnZVwiKTtcbiAgICogICAgIGV4cGVjdC5mYWlsKDEsIDIsIFwiY3VzdG9tIGVycm9yIG1lc3NhZ2VcIiwgXCI+XCIpO1xuICAgKiAgICAgZXhwZWN0LmZhaWwoMSwgMiwgdW5kZWZpbmVkLCBcIj5cIik7XG4gICAqXG4gICAqIEBuYW1lIGZhaWxcbiAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcGVyYXRvclxuICAgKiBAbmFtZXNwYWNlIEJERFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBjaGFpLmV4cGVjdC5mYWlsID0gZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBhY3R1YWw7XG4gICAgICAgIGFjdHVhbCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBtZXNzYWdlID0gbWVzc2FnZSB8fCAnZXhwZWN0LmZhaWwoKSc7XG4gICAgdGhyb3cgbmV3IGNoYWkuQXNzZXJ0aW9uRXJyb3IobWVzc2FnZSwge1xuICAgICAgICBhY3R1YWw6IGFjdHVhbFxuICAgICAgLCBleHBlY3RlZDogZXhwZWN0ZWRcbiAgICAgICwgb3BlcmF0b3I6IG9wZXJhdG9yXG4gICAgfSwgY2hhaS5leHBlY3QuZmFpbCk7XG4gIH07XG59O1xuIiwiLyohXG4gKiBjaGFpXG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY2hhaSwgdXRpbCkge1xuICB2YXIgQXNzZXJ0aW9uID0gY2hhaS5Bc3NlcnRpb247XG5cbiAgZnVuY3Rpb24gbG9hZFNob3VsZCAoKSB7XG4gICAgLy8gZXhwbGljaXRseSBkZWZpbmUgdGhpcyBtZXRob2QgYXMgZnVuY3Rpb24gYXMgdG8gaGF2ZSBpdCdzIG5hbWUgdG8gaW5jbHVkZSBhcyBgc3NmaWBcbiAgICBmdW5jdGlvbiBzaG91bGRHZXR0ZXIoKSB7XG4gICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIFN0cmluZ1xuICAgICAgICAgIHx8IHRoaXMgaW5zdGFuY2VvZiBOdW1iZXJcbiAgICAgICAgICB8fCB0aGlzIGluc3RhbmNlb2YgQm9vbGVhblxuICAgICAgICAgIHx8IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdGhpcyBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgICByZXR1cm4gbmV3IEFzc2VydGlvbih0aGlzLnZhbHVlT2YoKSwgbnVsbCwgc2hvdWxkR2V0dGVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgQXNzZXJ0aW9uKHRoaXMsIG51bGwsIHNob3VsZEdldHRlcik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNob3VsZFNldHRlcih2YWx1ZSkge1xuICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFpanMvY2hhaS9pc3N1ZXMvODY6IHRoaXMgbWFrZXNcbiAgICAgIC8vIGB3aGF0ZXZlci5zaG91bGQgPSBzb21lVmFsdWVgIGFjdHVhbGx5IHNldCBgc29tZVZhbHVlYCwgd2hpY2ggaXNcbiAgICAgIC8vIGVzcGVjaWFsbHkgdXNlZnVsIGZvciBgZ2xvYmFsLnNob3VsZCA9IHJlcXVpcmUoJ2NoYWknKS5zaG91bGQoKWAuXG4gICAgICAvL1xuICAgICAgLy8gTm90ZSB0aGF0IHdlIGhhdmUgdG8gdXNlIFtbRGVmaW5lUHJvcGVydHldXSBpbnN0ZWFkIG9mIFtbUHV0XV1cbiAgICAgIC8vIHNpbmNlIG90aGVyd2lzZSB3ZSB3b3VsZCB0cmlnZ2VyIHRoaXMgdmVyeSBzZXR0ZXIhXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Nob3VsZCcsIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gbW9kaWZ5IE9iamVjdC5wcm90b3R5cGUgdG8gaGF2ZSBgc2hvdWxkYFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCAnc2hvdWxkJywge1xuICAgICAgc2V0OiBzaG91bGRTZXR0ZXJcbiAgICAgICwgZ2V0OiBzaG91bGRHZXR0ZXJcbiAgICAgICwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG5cbiAgICB2YXIgc2hvdWxkID0ge307XG5cbiAgICAvKipcbiAgICAgKiAjIyMgLmZhaWwoW21lc3NhZ2VdKVxuICAgICAqICMjIyAuZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBbbWVzc2FnZV0sIFtvcGVyYXRvcl0pXG4gICAgICpcbiAgICAgKiBUaHJvdyBhIGZhaWx1cmUuXG4gICAgICpcbiAgICAgKiAgICAgc2hvdWxkLmZhaWwoKTtcbiAgICAgKiAgICAgc2hvdWxkLmZhaWwoXCJjdXN0b20gZXJyb3IgbWVzc2FnZVwiKTtcbiAgICAgKiAgICAgc2hvdWxkLmZhaWwoMSwgMik7XG4gICAgICogICAgIHNob3VsZC5mYWlsKDEsIDIsIFwiY3VzdG9tIGVycm9yIG1lc3NhZ2VcIik7XG4gICAgICogICAgIHNob3VsZC5mYWlsKDEsIDIsIFwiY3VzdG9tIGVycm9yIG1lc3NhZ2VcIiwgXCI+XCIpO1xuICAgICAqICAgICBzaG91bGQuZmFpbCgxLCAyLCB1bmRlZmluZWQsIFwiPlwiKTtcbiAgICAgKlxuICAgICAqXG4gICAgICogQG5hbWUgZmFpbFxuICAgICAqIEBwYXJhbSB7TWl4ZWR9IGFjdHVhbFxuICAgICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3BlcmF0b3JcbiAgICAgKiBAbmFtZXNwYWNlIEJERFxuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG5cbiAgICBzaG91bGQuZmFpbCA9IGZ1bmN0aW9uIChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCBvcGVyYXRvcikge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgbWVzc2FnZSA9IGFjdHVhbDtcbiAgICAgICAgICBhY3R1YWwgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlIHx8ICdzaG91bGQuZmFpbCgpJztcbiAgICAgIHRocm93IG5ldyBjaGFpLkFzc2VydGlvbkVycm9yKG1lc3NhZ2UsIHtcbiAgICAgICAgICBhY3R1YWw6IGFjdHVhbFxuICAgICAgICAsIGV4cGVjdGVkOiBleHBlY3RlZFxuICAgICAgICAsIG9wZXJhdG9yOiBvcGVyYXRvclxuICAgICAgfSwgc2hvdWxkLmZhaWwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAjIyMgLmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIFttZXNzYWdlXSlcbiAgICAgKlxuICAgICAqIEFzc2VydHMgbm9uLXN0cmljdCBlcXVhbGl0eSAoYD09YCkgb2YgYGFjdHVhbGAgYW5kIGBleHBlY3RlZGAuXG4gICAgICpcbiAgICAgKiAgICAgc2hvdWxkLmVxdWFsKDMsICczJywgJz09IGNvZXJjZXMgdmFsdWVzIHRvIHN0cmluZ3MnKTtcbiAgICAgKlxuICAgICAqIEBuYW1lIGVxdWFsXG4gICAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAgICogQHBhcmFtIHtNaXhlZH0gZXhwZWN0ZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAqIEBuYW1lc3BhY2UgU2hvdWxkXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cblxuICAgIHNob3VsZC5lcXVhbCA9IGZ1bmN0aW9uICh2YWwxLCB2YWwyLCBtc2cpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24odmFsMSwgbXNnKS50by5lcXVhbCh2YWwyKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogIyMjIC50aHJvdyhmdW5jdGlvbiwgW2NvbnN0cnVjdG9yL3N0cmluZy9yZWdleHBdLCBbc3RyaW5nL3JlZ2V4cF0sIFttZXNzYWdlXSlcbiAgICAgKlxuICAgICAqIEFzc2VydHMgdGhhdCBgZnVuY3Rpb25gIHdpbGwgdGhyb3cgYW4gZXJyb3IgdGhhdCBpcyBhbiBpbnN0YW5jZSBvZlxuICAgICAqIGBjb25zdHJ1Y3RvcmAsIG9yIGFsdGVybmF0ZWx5IHRoYXQgaXQgd2lsbCB0aHJvdyBhbiBlcnJvciB3aXRoIG1lc3NhZ2VcbiAgICAgKiBtYXRjaGluZyBgcmVnZXhwYC5cbiAgICAgKlxuICAgICAqICAgICBzaG91bGQudGhyb3coZm4sICdmdW5jdGlvbiB0aHJvd3MgYSByZWZlcmVuY2UgZXJyb3InKTtcbiAgICAgKiAgICAgc2hvdWxkLnRocm93KGZuLCAvZnVuY3Rpb24gdGhyb3dzIGEgcmVmZXJlbmNlIGVycm9yLyk7XG4gICAgICogICAgIHNob3VsZC50aHJvdyhmbiwgUmVmZXJlbmNlRXJyb3IpO1xuICAgICAqICAgICBzaG91bGQudGhyb3coZm4sIFJlZmVyZW5jZUVycm9yLCAnZnVuY3Rpb24gdGhyb3dzIGEgcmVmZXJlbmNlIGVycm9yJyk7XG4gICAgICogICAgIHNob3VsZC50aHJvdyhmbiwgUmVmZXJlbmNlRXJyb3IsIC9mdW5jdGlvbiB0aHJvd3MgYSByZWZlcmVuY2UgZXJyb3IvKTtcbiAgICAgKlxuICAgICAqIEBuYW1lIHRocm93XG4gICAgICogQGFsaWFzIFRocm93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0Vycm9yQ29uc3RydWN0b3J9IGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ2V4cFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9FcnJvciNFcnJvcl90eXBlc1xuICAgICAqIEBuYW1lc3BhY2UgU2hvdWxkXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cblxuICAgIHNob3VsZC5UaHJvdyA9IGZ1bmN0aW9uIChmbiwgZXJydCwgZXJycywgbXNnKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2cpLnRvLlRocm93KGVycnQsIGVycnMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAjIyMgLmV4aXN0XG4gICAgICpcbiAgICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBuZWl0aGVyIGBudWxsYCBub3IgYHVuZGVmaW5lZGAuXG4gICAgICpcbiAgICAgKiAgICAgdmFyIGZvbyA9ICdoaSc7XG4gICAgICpcbiAgICAgKiAgICAgc2hvdWxkLmV4aXN0KGZvbywgJ2ZvbyBleGlzdHMnKTtcbiAgICAgKlxuICAgICAqIEBuYW1lIGV4aXN0XG4gICAgICogQG5hbWVzcGFjZSBTaG91bGRcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuXG4gICAgc2hvdWxkLmV4aXN0ID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5leGlzdDtcbiAgICB9XG5cbiAgICAvLyBuZWdhdGlvblxuICAgIHNob3VsZC5ub3QgPSB7fVxuXG4gICAgLyoqXG4gICAgICogIyMjIC5ub3QuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgW21lc3NhZ2VdKVxuICAgICAqXG4gICAgICogQXNzZXJ0cyBub24tc3RyaWN0IGluZXF1YWxpdHkgKGAhPWApIG9mIGBhY3R1YWxgIGFuZCBgZXhwZWN0ZWRgLlxuICAgICAqXG4gICAgICogICAgIHNob3VsZC5ub3QuZXF1YWwoMywgNCwgJ3RoZXNlIG51bWJlcnMgYXJlIG5vdCBlcXVhbCcpO1xuICAgICAqXG4gICAgICogQG5hbWUgbm90LmVxdWFsXG4gICAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAgICogQHBhcmFtIHtNaXhlZH0gZXhwZWN0ZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAqIEBuYW1lc3BhY2UgU2hvdWxkXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cblxuICAgIHNob3VsZC5ub3QuZXF1YWwgPSBmdW5jdGlvbiAodmFsMSwgdmFsMiwgbXNnKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKHZhbDEsIG1zZykudG8ubm90LmVxdWFsKHZhbDIpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAjIyMgLnRocm93KGZ1bmN0aW9uLCBbY29uc3RydWN0b3IvcmVnZXhwXSwgW21lc3NhZ2VdKVxuICAgICAqXG4gICAgICogQXNzZXJ0cyB0aGF0IGBmdW5jdGlvbmAgd2lsbCBfbm90XyB0aHJvdyBhbiBlcnJvciB0aGF0IGlzIGFuIGluc3RhbmNlIG9mXG4gICAgICogYGNvbnN0cnVjdG9yYCwgb3IgYWx0ZXJuYXRlbHkgdGhhdCBpdCB3aWxsIG5vdCB0aHJvdyBhbiBlcnJvciB3aXRoIG1lc3NhZ2VcbiAgICAgKiBtYXRjaGluZyBgcmVnZXhwYC5cbiAgICAgKlxuICAgICAqICAgICBzaG91bGQubm90LnRocm93KGZuLCBFcnJvciwgJ2Z1bmN0aW9uIGRvZXMgbm90IHRocm93Jyk7XG4gICAgICpcbiAgICAgKiBAbmFtZSBub3QudGhyb3dcbiAgICAgKiBAYWxpYXMgbm90LlRocm93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0Vycm9yQ29uc3RydWN0b3J9IGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ2V4cFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9FcnJvciNFcnJvcl90eXBlc1xuICAgICAqIEBuYW1lc3BhY2UgU2hvdWxkXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cblxuICAgIHNob3VsZC5ub3QuVGhyb3cgPSBmdW5jdGlvbiAoZm4sIGVycnQsIGVycnMsIG1zZykge1xuICAgICAgbmV3IEFzc2VydGlvbihmbiwgbXNnKS50by5ub3QuVGhyb3coZXJydCwgZXJycyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqICMjIyAubm90LmV4aXN0XG4gICAgICpcbiAgICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBuZWl0aGVyIGBudWxsYCBub3IgYHVuZGVmaW5lZGAuXG4gICAgICpcbiAgICAgKiAgICAgdmFyIGJhciA9IG51bGw7XG4gICAgICpcbiAgICAgKiAgICAgc2hvdWxkLm5vdC5leGlzdChiYXIsICdiYXIgZG9lcyBub3QgZXhpc3QnKTtcbiAgICAgKlxuICAgICAqIEBuYW1lIG5vdC5leGlzdFxuICAgICAqIEBuYW1lc3BhY2UgU2hvdWxkXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cblxuICAgIHNob3VsZC5ub3QuZXhpc3QgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLm5vdC5leGlzdDtcbiAgICB9XG5cbiAgICBzaG91bGRbJ3Rocm93J10gPSBzaG91bGRbJ1Rocm93J107XG4gICAgc2hvdWxkLm5vdFsndGhyb3cnXSA9IHNob3VsZC5ub3RbJ1Rocm93J107XG5cbiAgICByZXR1cm4gc2hvdWxkO1xuICB9O1xuXG4gIGNoYWkuc2hvdWxkID0gbG9hZFNob3VsZDtcbiAgY2hhaS5TaG91bGQgPSBsb2FkU2hvdWxkO1xufTtcbiIsIi8qIVxuICogQ2hhaSAtIGFkZENoYWluaW5nTWV0aG9kIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKiFcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgYWRkTGVuZ3RoR3VhcmQgPSByZXF1aXJlKCcuL2FkZExlbmd0aEd1YXJkJyk7XG52YXIgY2hhaSA9IHJlcXVpcmUoJy4uLy4uL2NoYWknKTtcbnZhciBmbGFnID0gcmVxdWlyZSgnLi9mbGFnJyk7XG52YXIgcHJveGlmeSA9IHJlcXVpcmUoJy4vcHJveGlmeScpO1xudmFyIHRyYW5zZmVyRmxhZ3MgPSByZXF1aXJlKCcuL3RyYW5zZmVyRmxhZ3MnKTtcblxuLyohXG4gKiBNb2R1bGUgdmFyaWFibGVzXG4gKi9cblxuLy8gQ2hlY2sgd2hldGhlciBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBpcyBzdXBwb3J0ZWRcbnZhciBjYW5TZXRQcm90b3R5cGUgPSB0eXBlb2YgT2JqZWN0LnNldFByb3RvdHlwZU9mID09PSAnZnVuY3Rpb24nO1xuXG4vLyBXaXRob3V0IGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIHN1cHBvcnQsIHRoaXMgbW9kdWxlIHdpbGwgbmVlZCB0byBhZGQgcHJvcGVydGllcyB0byBhIGZ1bmN0aW9uLlxuLy8gSG93ZXZlciwgc29tZSBvZiBmdW5jdGlvbnMnIG93biBwcm9wcyBhcmUgbm90IGNvbmZpZ3VyYWJsZSBhbmQgc2hvdWxkIGJlIHNraXBwZWQuXG52YXIgdGVzdEZuID0gZnVuY3Rpb24oKSB7fTtcbnZhciBleGNsdWRlTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0Rm4pLmZpbHRlcihmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBwcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGVzdEZuLCBuYW1lKTtcblxuICAvLyBOb3RlOiBQaGFudG9tSlMgMS54IGluY2x1ZGVzIGBjYWxsZWVgIGFzIG9uZSBvZiBgdGVzdEZuYCdzIG93biBwcm9wZXJ0aWVzLFxuICAvLyBidXQgdGhlbiByZXR1cm5zIGB1bmRlZmluZWRgIGFzIHRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZvciBgY2FsbGVlYC4gQXMgYVxuICAvLyB3b3JrYXJvdW5kLCB3ZSBwZXJmb3JtIGFuIG90aGVyd2lzZSB1bm5lY2Vzc2FyeSB0eXBlLWNoZWNrIGZvciBgcHJvcERlc2NgLFxuICAvLyBhbmQgdGhlbiBmaWx0ZXIgaXQgb3V0IGlmIGl0J3Mgbm90IGFuIG9iamVjdCBhcyBpdCBzaG91bGQgYmUuXG4gIGlmICh0eXBlb2YgcHJvcERlc2MgIT09ICdvYmplY3QnKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIHJldHVybiAhcHJvcERlc2MuY29uZmlndXJhYmxlO1xufSk7XG5cbi8vIENhY2hlIGBGdW5jdGlvbmAgcHJvcGVydGllc1xudmFyIGNhbGwgID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwsXG4gICAgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8qKlxuICogIyMjIC5hZGRDaGFpbmFibGVNZXRob2QoY3R4LCBuYW1lLCBtZXRob2QsIGNoYWluaW5nQmVoYXZpb3IpXG4gKlxuICogQWRkcyBhIG1ldGhvZCB0byBhbiBvYmplY3QsIHN1Y2ggdGhhdCB0aGUgbWV0aG9kIGNhbiBhbHNvIGJlIGNoYWluZWQuXG4gKlxuICogICAgIHV0aWxzLmFkZENoYWluYWJsZU1ldGhvZChjaGFpLkFzc2VydGlvbi5wcm90b3R5cGUsICdmb28nLCBmdW5jdGlvbiAoc3RyKSB7XG4gKiAgICAgICB2YXIgb2JqID0gdXRpbHMuZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gKiAgICAgICBuZXcgY2hhaS5Bc3NlcnRpb24ob2JqKS50by5iZS5lcXVhbChzdHIpO1xuICogICAgIH0pO1xuICpcbiAqIENhbiBhbHNvIGJlIGFjY2Vzc2VkIGRpcmVjdGx5IGZyb20gYGNoYWkuQXNzZXJ0aW9uYC5cbiAqXG4gKiAgICAgY2hhaS5Bc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKCdmb28nLCBmbiwgY2hhaW5pbmdCZWhhdmlvcik7XG4gKlxuICogVGhlIHJlc3VsdCBjYW4gdGhlbiBiZSB1c2VkIGFzIGJvdGggYSBtZXRob2QgYXNzZXJ0aW9uLCBleGVjdXRpbmcgYm90aCBgbWV0aG9kYCBhbmRcbiAqIGBjaGFpbmluZ0JlaGF2aW9yYCwgb3IgYXMgYSBsYW5ndWFnZSBjaGFpbiwgd2hpY2ggb25seSBleGVjdXRlcyBgY2hhaW5pbmdCZWhhdmlvcmAuXG4gKlxuICogICAgIGV4cGVjdChmb29TdHIpLnRvLmJlLmZvbygnYmFyJyk7XG4gKiAgICAgZXhwZWN0KGZvb1N0cikudG8uYmUuZm9vLmVxdWFsKCdmb28nKTtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4IG9iamVjdCB0byB3aGljaCB0aGUgbWV0aG9kIGlzIGFkZGVkXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBvZiBtZXRob2QgdG8gYWRkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2QgZnVuY3Rpb24gdG8gYmUgdXNlZCBmb3IgYG5hbWVgLCB3aGVuIGNhbGxlZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2hhaW5pbmdCZWhhdmlvciBmdW5jdGlvbiB0byBiZSBjYWxsZWQgZXZlcnkgdGltZSB0aGUgcHJvcGVydHkgaXMgYWNjZXNzZWRcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGFkZENoYWluYWJsZU1ldGhvZFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFkZENoYWluYWJsZU1ldGhvZChjdHgsIG5hbWUsIG1ldGhvZCwgY2hhaW5pbmdCZWhhdmlvcikge1xuICBpZiAodHlwZW9mIGNoYWluaW5nQmVoYXZpb3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICBjaGFpbmluZ0JlaGF2aW9yID0gZnVuY3Rpb24gKCkgeyB9O1xuICB9XG5cbiAgdmFyIGNoYWluYWJsZUJlaGF2aW9yID0ge1xuICAgICAgbWV0aG9kOiBtZXRob2RcbiAgICAsIGNoYWluaW5nQmVoYXZpb3I6IGNoYWluaW5nQmVoYXZpb3JcbiAgfTtcblxuICAvLyBzYXZlIHRoZSBtZXRob2RzIHNvIHdlIGNhbiBvdmVyd3JpdGUgdGhlbSBsYXRlciwgaWYgd2UgbmVlZCB0by5cbiAgaWYgKCFjdHguX19tZXRob2RzKSB7XG4gICAgY3R4Ll9fbWV0aG9kcyA9IHt9O1xuICB9XG4gIGN0eC5fX21ldGhvZHNbbmFtZV0gPSBjaGFpbmFibGVCZWhhdmlvcjtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3R4LCBuYW1lLFxuICAgIHsgZ2V0OiBmdW5jdGlvbiBjaGFpbmFibGVNZXRob2RHZXR0ZXIoKSB7XG4gICAgICAgIGNoYWluYWJsZUJlaGF2aW9yLmNoYWluaW5nQmVoYXZpb3IuY2FsbCh0aGlzKTtcblxuICAgICAgICB2YXIgY2hhaW5hYmxlTWV0aG9kV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIHRoZSBgc3NmaWAgZmxhZyB0byBgY2hhaW5hYmxlTWV0aG9kV3JhcHBlcmAgY2F1c2VzIHRoaXNcbiAgICAgICAgICAvLyBmdW5jdGlvbiB0byBiZSB0aGUgc3RhcnRpbmcgcG9pbnQgZm9yIHJlbW92aW5nIGltcGxlbWVudGF0aW9uXG4gICAgICAgICAgLy8gZnJhbWVzIGZyb20gdGhlIHN0YWNrIHRyYWNlIG9mIGEgZmFpbGVkIGFzc2VydGlvbi5cbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vIEhvd2V2ZXIsIHdlIG9ubHkgd2FudCB0byB1c2UgdGhpcyBmdW5jdGlvbiBhcyB0aGUgc3RhcnRpbmcgcG9pbnQgaWZcbiAgICAgICAgICAvLyB0aGUgYGxvY2tTc2ZpYCBmbGFnIGlzbid0IHNldC5cbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vIElmIHRoZSBgbG9ja1NzZmlgIGZsYWcgaXMgc2V0LCB0aGVuIHRoaXMgYXNzZXJ0aW9uIGlzIGJlaW5nXG4gICAgICAgICAgLy8gaW52b2tlZCBmcm9tIGluc2lkZSBvZiBhbm90aGVyIGFzc2VydGlvbi4gSW4gdGhpcyBjYXNlLCB0aGUgYHNzZmlgXG4gICAgICAgICAgLy8gZmxhZyBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSB0aGUgb3V0ZXIgYXNzZXJ0aW9uLlxuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gTm90ZSB0aGF0IG92ZXJ3cml0aW5nIGEgY2hhaW5hYmxlIG1ldGhvZCBtZXJlbHkgcmVwbGFjZXMgdGhlIHNhdmVkXG4gICAgICAgICAgLy8gbWV0aG9kcyBpbiBgY3R4Ll9fbWV0aG9kc2AgaW5zdGVhZCBvZiBjb21wbGV0ZWx5IHJlcGxhY2luZyB0aGVcbiAgICAgICAgICAvLyBvdmVyd3JpdHRlbiBhc3NlcnRpb24uIFRoZXJlZm9yZSwgYW4gb3ZlcndyaXRpbmcgYXNzZXJ0aW9uIHdvbid0XG4gICAgICAgICAgLy8gc2V0IHRoZSBgc3NmaWAgb3IgYGxvY2tTc2ZpYCBmbGFncy5cbiAgICAgICAgICBpZiAoIWZsYWcodGhpcywgJ2xvY2tTc2ZpJykpIHtcbiAgICAgICAgICAgIGZsYWcodGhpcywgJ3NzZmknLCBjaGFpbmFibGVNZXRob2RXcmFwcGVyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gY2hhaW5hYmxlQmVoYXZpb3IubWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBuZXdBc3NlcnRpb24gPSBuZXcgY2hhaS5Bc3NlcnRpb24oKTtcbiAgICAgICAgICB0cmFuc2ZlckZsYWdzKHRoaXMsIG5ld0Fzc2VydGlvbik7XG4gICAgICAgICAgcmV0dXJuIG5ld0Fzc2VydGlvbjtcbiAgICAgICAgfTtcblxuICAgICAgICBhZGRMZW5ndGhHdWFyZChjaGFpbmFibGVNZXRob2RXcmFwcGVyLCBuYW1lLCB0cnVlKTtcblxuICAgICAgICAvLyBVc2UgYE9iamVjdC5zZXRQcm90b3R5cGVPZmAgaWYgYXZhaWxhYmxlXG4gICAgICAgIGlmIChjYW5TZXRQcm90b3R5cGUpIHtcbiAgICAgICAgICAvLyBJbmhlcml0IGFsbCBwcm9wZXJ0aWVzIGZyb20gdGhlIG9iamVjdCBieSByZXBsYWNpbmcgdGhlIGBGdW5jdGlvbmAgcHJvdG90eXBlXG4gICAgICAgICAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgICAgICAgLy8gUmVzdG9yZSB0aGUgYGNhbGxgIGFuZCBgYXBwbHlgIG1ldGhvZHMgZnJvbSBgRnVuY3Rpb25gXG4gICAgICAgICAgcHJvdG90eXBlLmNhbGwgPSBjYWxsO1xuICAgICAgICAgIHByb3RvdHlwZS5hcHBseSA9IGFwcGx5O1xuICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihjaGFpbmFibGVNZXRob2RXcmFwcGVyLCBwcm90b3R5cGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE90aGVyd2lzZSwgcmVkZWZpbmUgYWxsIHByb3BlcnRpZXMgKHNsb3chKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB2YXIgYXNzZXJ0ZXJOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN0eCk7XG4gICAgICAgICAgYXNzZXJ0ZXJOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChhc3NlcnRlck5hbWUpIHtcbiAgICAgICAgICAgIGlmIChleGNsdWRlTmFtZXMuaW5kZXhPZihhc3NlcnRlck5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY3R4LCBhc3NlcnRlck5hbWUpO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNoYWluYWJsZU1ldGhvZFdyYXBwZXIsIGFzc2VydGVyTmFtZSwgcGQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJhbnNmZXJGbGFncyh0aGlzLCBjaGFpbmFibGVNZXRob2RXcmFwcGVyKTtcbiAgICAgICAgcmV0dXJuIHByb3hpZnkoY2hhaW5hYmxlTWV0aG9kV3JhcHBlcik7XG4gICAgICB9XG4gICAgLCBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59O1xuIiwidmFyIGZuTGVuZ3RoRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZnVuY3Rpb24gKCkge30sICdsZW5ndGgnKTtcblxuLyohXG4gKiBDaGFpIC0gYWRkTGVuZ3RoR3VhcmQgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyMjIC5hZGRMZW5ndGhHdWFyZChmbiwgYXNzZXJ0aW9uTmFtZSwgaXNDaGFpbmFibGUpXG4gKlxuICogRGVmaW5lIGBsZW5ndGhgIGFzIGEgZ2V0dGVyIG9uIHRoZSBnaXZlbiB1bmludm9rZWQgbWV0aG9kIGFzc2VydGlvbi4gVGhlXG4gKiBnZXR0ZXIgYWN0cyBhcyBhIGd1YXJkIGFnYWluc3QgY2hhaW5pbmcgYGxlbmd0aGAgZGlyZWN0bHkgb2ZmIG9mIGFuIHVuaW52b2tlZFxuICogbWV0aG9kIGFzc2VydGlvbiwgd2hpY2ggaXMgYSBwcm9ibGVtIGJlY2F1c2UgaXQgcmVmZXJlbmNlcyBgZnVuY3Rpb25gJ3NcbiAqIGJ1aWx0LWluIGBsZW5ndGhgIHByb3BlcnR5IGluc3RlYWQgb2YgQ2hhaSdzIGBsZW5ndGhgIGFzc2VydGlvbi4gV2hlbiB0aGVcbiAqIGdldHRlciBjYXRjaGVzIHRoZSB1c2VyIG1ha2luZyB0aGlzIG1pc3Rha2UsIGl0IHRocm93cyBhbiBlcnJvciB3aXRoIGFcbiAqIGhlbHBmdWwgbWVzc2FnZS5cbiAqXG4gKiBUaGVyZSBhcmUgdHdvIHdheXMgaW4gd2hpY2ggdGhpcyBtaXN0YWtlIGNhbiBiZSBtYWRlLiBUaGUgZmlyc3Qgd2F5IGlzIGJ5XG4gKiBjaGFpbmluZyB0aGUgYGxlbmd0aGAgYXNzZXJ0aW9uIGRpcmVjdGx5IG9mZiBvZiBhbiB1bmludm9rZWQgY2hhaW5hYmxlXG4gKiBtZXRob2QuIEluIHRoaXMgY2FzZSwgQ2hhaSBzdWdnZXN0cyB0aGF0IHRoZSB1c2VyIHVzZSBgbGVuZ3RoT2ZgIGluc3RlYWQuIFRoZVxuICogc2Vjb25kIHdheSBpcyBieSBjaGFpbmluZyB0aGUgYGxlbmd0aGAgYXNzZXJ0aW9uIGRpcmVjdGx5IG9mZiBvZiBhbiB1bmludm9rZWRcbiAqIG5vbi1jaGFpbmFibGUgbWV0aG9kLiBOb24tY2hhaW5hYmxlIG1ldGhvZHMgbXVzdCBiZSBpbnZva2VkIHByaW9yIHRvXG4gKiBjaGFpbmluZy4gSW4gdGhpcyBjYXNlLCBDaGFpIHN1Z2dlc3RzIHRoYXQgdGhlIHVzZXIgY29uc3VsdCB0aGUgZG9jcyBmb3IgdGhlXG4gKiBnaXZlbiBhc3NlcnRpb24uXG4gKlxuICogSWYgdGhlIGBsZW5ndGhgIHByb3BlcnR5IG9mIGZ1bmN0aW9ucyBpcyB1bmNvbmZpZ3VyYWJsZSwgdGhlbiByZXR1cm4gYGZuYFxuICogd2l0aG91dCBtb2RpZmljYXRpb24uXG4gKlxuICogTm90ZSB0aGF0IGluIEVTNiwgdGhlIGZ1bmN0aW9uJ3MgYGxlbmd0aGAgcHJvcGVydHkgaXMgY29uZmlndXJhYmxlLCBzbyBvbmNlXG4gKiBzdXBwb3J0IGZvciBsZWdhY3kgZW52aXJvbm1lbnRzIGlzIGRyb3BwZWQsIENoYWkncyBgbGVuZ3RoYCBwcm9wZXJ0eSBjYW5cbiAqIHJlcGxhY2UgdGhlIGJ1aWx0LWluIGZ1bmN0aW9uJ3MgYGxlbmd0aGAgcHJvcGVydHksIGFuZCB0aGlzIGxlbmd0aCBndWFyZCB3aWxsXG4gKiBubyBsb25nZXIgYmUgbmVjZXNzYXJ5LiBJbiB0aGUgbWVhbiB0aW1lLCBtYWludGFpbmluZyBjb25zaXN0ZW5jeSBhY3Jvc3MgYWxsXG4gKiBlbnZpcm9ubWVudHMgaXMgdGhlIHByaW9yaXR5LlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge1N0cmluZ30gYXNzZXJ0aW9uTmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBpc0NoYWluYWJsZVxuICogQG5hbWVzcGFjZSBVdGlsc1xuICogQG5hbWUgYWRkTGVuZ3RoR3VhcmRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFkZExlbmd0aEd1YXJkIChmbiwgYXNzZXJ0aW9uTmFtZSwgaXNDaGFpbmFibGUpIHtcbiAgaWYgKCFmbkxlbmd0aERlc2MuY29uZmlndXJhYmxlKSByZXR1cm4gZm47XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbGVuZ3RoJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlzQ2hhaW5hYmxlKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIENoYWkgcHJvcGVydHk6ICcgKyBhc3NlcnRpb25OYW1lICsgJy5sZW5ndGguIER1ZScgK1xuICAgICAgICAgICcgdG8gYSBjb21wYXRpYmlsaXR5IGlzc3VlLCBcImxlbmd0aFwiIGNhbm5vdCBkaXJlY3RseSBmb2xsb3cgXCInICtcbiAgICAgICAgICBhc3NlcnRpb25OYW1lICsgJ1wiLiBVc2UgXCInICsgYXNzZXJ0aW9uTmFtZSArICcubGVuZ3RoT2ZcIiBpbnN0ZWFkLicpO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBDaGFpIHByb3BlcnR5OiAnICsgYXNzZXJ0aW9uTmFtZSArICcubGVuZ3RoLiBTZWUnICtcbiAgICAgICAgJyBkb2NzIGZvciBwcm9wZXIgdXNhZ2Ugb2YgXCInICsgYXNzZXJ0aW9uTmFtZSArICdcIi4nKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBmbjtcbn07XG4iLCIvKiFcbiAqIENoYWkgLSBhZGRNZXRob2QgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbnZhciBhZGRMZW5ndGhHdWFyZCA9IHJlcXVpcmUoJy4vYWRkTGVuZ3RoR3VhcmQnKTtcbnZhciBjaGFpID0gcmVxdWlyZSgnLi4vLi4vY2hhaScpO1xudmFyIGZsYWcgPSByZXF1aXJlKCcuL2ZsYWcnKTtcbnZhciBwcm94aWZ5ID0gcmVxdWlyZSgnLi9wcm94aWZ5Jyk7XG52YXIgdHJhbnNmZXJGbGFncyA9IHJlcXVpcmUoJy4vdHJhbnNmZXJGbGFncycpO1xuXG4vKipcbiAqICMjIyAuYWRkTWV0aG9kKGN0eCwgbmFtZSwgbWV0aG9kKVxuICpcbiAqIEFkZHMgYSBtZXRob2QgdG8gdGhlIHByb3RvdHlwZSBvZiBhbiBvYmplY3QuXG4gKlxuICogICAgIHV0aWxzLmFkZE1ldGhvZChjaGFpLkFzc2VydGlvbi5wcm90b3R5cGUsICdmb28nLCBmdW5jdGlvbiAoc3RyKSB7XG4gKiAgICAgICB2YXIgb2JqID0gdXRpbHMuZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gKiAgICAgICBuZXcgY2hhaS5Bc3NlcnRpb24ob2JqKS50by5iZS5lcXVhbChzdHIpO1xuICogICAgIH0pO1xuICpcbiAqIENhbiBhbHNvIGJlIGFjY2Vzc2VkIGRpcmVjdGx5IGZyb20gYGNoYWkuQXNzZXJ0aW9uYC5cbiAqXG4gKiAgICAgY2hhaS5Bc3NlcnRpb24uYWRkTWV0aG9kKCdmb28nLCBmbik7XG4gKlxuICogVGhlbiBjYW4gYmUgdXNlZCBhcyBhbnkgb3RoZXIgYXNzZXJ0aW9uLlxuICpcbiAqICAgICBleHBlY3QoZm9vU3RyKS50by5iZS5mb28oJ2JhcicpO1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHggb2JqZWN0IHRvIHdoaWNoIHRoZSBtZXRob2QgaXMgYWRkZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG9mIG1ldGhvZCB0byBhZGRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZCBmdW5jdGlvbiB0byBiZSB1c2VkIGZvciBuYW1lXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAbmFtZSBhZGRNZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhZGRNZXRob2QoY3R4LCBuYW1lLCBtZXRob2QpIHtcbiAgdmFyIG1ldGhvZFdyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gU2V0dGluZyB0aGUgYHNzZmlgIGZsYWcgdG8gYG1ldGhvZFdyYXBwZXJgIGNhdXNlcyB0aGlzIGZ1bmN0aW9uIHRvIGJlIHRoZVxuICAgIC8vIHN0YXJ0aW5nIHBvaW50IGZvciByZW1vdmluZyBpbXBsZW1lbnRhdGlvbiBmcmFtZXMgZnJvbSB0aGUgc3RhY2sgdHJhY2Ugb2ZcbiAgICAvLyBhIGZhaWxlZCBhc3NlcnRpb24uXG4gICAgLy9cbiAgICAvLyBIb3dldmVyLCB3ZSBvbmx5IHdhbnQgdG8gdXNlIHRoaXMgZnVuY3Rpb24gYXMgdGhlIHN0YXJ0aW5nIHBvaW50IGlmIHRoZVxuICAgIC8vIGBsb2NrU3NmaWAgZmxhZyBpc24ndCBzZXQuXG4gICAgLy9cbiAgICAvLyBJZiB0aGUgYGxvY2tTc2ZpYCBmbGFnIGlzIHNldCwgdGhlbiBlaXRoZXIgdGhpcyBhc3NlcnRpb24gaGFzIGJlZW5cbiAgICAvLyBvdmVyd3JpdHRlbiBieSBhbm90aGVyIGFzc2VydGlvbiwgb3IgdGhpcyBhc3NlcnRpb24gaXMgYmVpbmcgaW52b2tlZCBmcm9tXG4gICAgLy8gaW5zaWRlIG9mIGFub3RoZXIgYXNzZXJ0aW9uLiBJbiB0aGUgZmlyc3QgY2FzZSwgdGhlIGBzc2ZpYCBmbGFnIGhhc1xuICAgIC8vIGFscmVhZHkgYmVlbiBzZXQgYnkgdGhlIG92ZXJ3cml0aW5nIGFzc2VydGlvbi4gSW4gdGhlIHNlY29uZCBjYXNlLCB0aGVcbiAgICAvLyBgc3NmaWAgZmxhZyBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSB0aGUgb3V0ZXIgYXNzZXJ0aW9uLlxuICAgIGlmICghZmxhZyh0aGlzLCAnbG9ja1NzZmknKSkge1xuICAgICAgZmxhZyh0aGlzLCAnc3NmaScsIG1ldGhvZFdyYXBwZXIpO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgdmFyIG5ld0Fzc2VydGlvbiA9IG5ldyBjaGFpLkFzc2VydGlvbigpO1xuICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgbmV3QXNzZXJ0aW9uKTtcbiAgICByZXR1cm4gbmV3QXNzZXJ0aW9uO1xuICB9O1xuXG4gIGFkZExlbmd0aEd1YXJkKG1ldGhvZFdyYXBwZXIsIG5hbWUsIGZhbHNlKTtcbiAgY3R4W25hbWVdID0gcHJveGlmeShtZXRob2RXcmFwcGVyLCBuYW1lKTtcbn07XG4iLCIvKiFcbiAqIENoYWkgLSBhZGRQcm9wZXJ0eSB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxudmFyIGNoYWkgPSByZXF1aXJlKCcuLi8uLi9jaGFpJyk7XG52YXIgZmxhZyA9IHJlcXVpcmUoJy4vZmxhZycpO1xudmFyIGlzUHJveHlFbmFibGVkID0gcmVxdWlyZSgnLi9pc1Byb3h5RW5hYmxlZCcpO1xudmFyIHRyYW5zZmVyRmxhZ3MgPSByZXF1aXJlKCcuL3RyYW5zZmVyRmxhZ3MnKTtcblxuLyoqXG4gKiAjIyMgLmFkZFByb3BlcnR5KGN0eCwgbmFtZSwgZ2V0dGVyKVxuICpcbiAqIEFkZHMgYSBwcm9wZXJ0eSB0byB0aGUgcHJvdG90eXBlIG9mIGFuIG9iamVjdC5cbiAqXG4gKiAgICAgdXRpbHMuYWRkUHJvcGVydHkoY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLCAnZm9vJywgZnVuY3Rpb24gKCkge1xuICogICAgICAgdmFyIG9iaiA9IHV0aWxzLmZsYWcodGhpcywgJ29iamVjdCcpO1xuICogICAgICAgbmV3IGNoYWkuQXNzZXJ0aW9uKG9iaikudG8uYmUuaW5zdGFuY2VvZihGb28pO1xuICogICAgIH0pO1xuICpcbiAqIENhbiBhbHNvIGJlIGFjY2Vzc2VkIGRpcmVjdGx5IGZyb20gYGNoYWkuQXNzZXJ0aW9uYC5cbiAqXG4gKiAgICAgY2hhaS5Bc3NlcnRpb24uYWRkUHJvcGVydHkoJ2ZvbycsIGZuKTtcbiAqXG4gKiBUaGVuIGNhbiBiZSB1c2VkIGFzIGFueSBvdGhlciBhc3NlcnRpb24uXG4gKlxuICogICAgIGV4cGVjdChteUZvbykudG8uYmUuZm9vO1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHggb2JqZWN0IHRvIHdoaWNoIHRoZSBwcm9wZXJ0eSBpcyBhZGRlZFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgb2YgcHJvcGVydHkgdG8gYWRkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBnZXR0ZXIgZnVuY3Rpb24gdG8gYmUgdXNlZCBmb3IgbmFtZVxuICogQG5hbWVzcGFjZSBVdGlsc1xuICogQG5hbWUgYWRkUHJvcGVydHlcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhZGRQcm9wZXJ0eShjdHgsIG5hbWUsIGdldHRlcikge1xuICBnZXR0ZXIgPSBnZXR0ZXIgPT09IHVuZGVmaW5lZCA/IGZ1bmN0aW9uICgpIHt9IDogZ2V0dGVyO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdHgsIG5hbWUsXG4gICAgeyBnZXQ6IGZ1bmN0aW9uIHByb3BlcnR5R2V0dGVyKCkge1xuICAgICAgICAvLyBTZXR0aW5nIHRoZSBgc3NmaWAgZmxhZyB0byBgcHJvcGVydHlHZXR0ZXJgIGNhdXNlcyB0aGlzIGZ1bmN0aW9uIHRvXG4gICAgICAgIC8vIGJlIHRoZSBzdGFydGluZyBwb2ludCBmb3IgcmVtb3ZpbmcgaW1wbGVtZW50YXRpb24gZnJhbWVzIGZyb20gdGhlXG4gICAgICAgIC8vIHN0YWNrIHRyYWNlIG9mIGEgZmFpbGVkIGFzc2VydGlvbi5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSG93ZXZlciwgd2Ugb25seSB3YW50IHRvIHVzZSB0aGlzIGZ1bmN0aW9uIGFzIHRoZSBzdGFydGluZyBwb2ludCBpZlxuICAgICAgICAvLyB0aGUgYGxvY2tTc2ZpYCBmbGFnIGlzbid0IHNldCBhbmQgcHJveHkgcHJvdGVjdGlvbiBpcyBkaXNhYmxlZC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSWYgdGhlIGBsb2NrU3NmaWAgZmxhZyBpcyBzZXQsIHRoZW4gZWl0aGVyIHRoaXMgYXNzZXJ0aW9uIGhhcyBiZWVuXG4gICAgICAgIC8vIG92ZXJ3cml0dGVuIGJ5IGFub3RoZXIgYXNzZXJ0aW9uLCBvciB0aGlzIGFzc2VydGlvbiBpcyBiZWluZyBpbnZva2VkXG4gICAgICAgIC8vIGZyb20gaW5zaWRlIG9mIGFub3RoZXIgYXNzZXJ0aW9uLiBJbiB0aGUgZmlyc3QgY2FzZSwgdGhlIGBzc2ZpYCBmbGFnXG4gICAgICAgIC8vIGhhcyBhbHJlYWR5IGJlZW4gc2V0IGJ5IHRoZSBvdmVyd3JpdGluZyBhc3NlcnRpb24uIEluIHRoZSBzZWNvbmRcbiAgICAgICAgLy8gY2FzZSwgdGhlIGBzc2ZpYCBmbGFnIGhhcyBhbHJlYWR5IGJlZW4gc2V0IGJ5IHRoZSBvdXRlciBhc3NlcnRpb24uXG4gICAgICAgIC8vXG4gICAgICAgIC8vIElmIHByb3h5IHByb3RlY3Rpb24gaXMgZW5hYmxlZCwgdGhlbiB0aGUgYHNzZmlgIGZsYWcgaGFzIGFscmVhZHkgYmVlblxuICAgICAgICAvLyBzZXQgYnkgdGhlIHByb3h5IGdldHRlci5cbiAgICAgICAgaWYgKCFpc1Byb3h5RW5hYmxlZCgpICYmICFmbGFnKHRoaXMsICdsb2NrU3NmaScpKSB7XG4gICAgICAgICAgZmxhZyh0aGlzLCAnc3NmaScsIHByb3BlcnR5R2V0dGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXN1bHQgPSBnZXR0ZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgdmFyIG5ld0Fzc2VydGlvbiA9IG5ldyBjaGFpLkFzc2VydGlvbigpO1xuICAgICAgICB0cmFuc2ZlckZsYWdzKHRoaXMsIG5ld0Fzc2VydGlvbik7XG4gICAgICAgIHJldHVybiBuZXdBc3NlcnRpb247XG4gICAgICB9XG4gICAgLCBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59O1xuIiwiLyohXG4gKiBDaGFpIC0gY29tcGFyZUJ5SW5zcGVjdCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE2IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyohXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cblxudmFyIGluc3BlY3QgPSByZXF1aXJlKCcuL2luc3BlY3QnKTtcblxuLyoqXG4gKiAjIyMgLmNvbXBhcmVCeUluc3BlY3QobWl4ZWQsIG1peGVkKVxuICpcbiAqIFRvIGJlIHVzZWQgYXMgYSBjb21wYXJlRnVuY3Rpb24gd2l0aCBBcnJheS5wcm90b3R5cGUuc29ydC4gQ29tcGFyZXMgZWxlbWVudHNcbiAqIHVzaW5nIGluc3BlY3QgaW5zdGVhZCBvZiBkZWZhdWx0IGJlaGF2aW9yIG9mIHVzaW5nIHRvU3RyaW5nIHNvIHRoYXQgU3ltYm9sc1xuICogYW5kIG9iamVjdHMgd2l0aCBpcnJlZ3VsYXIvbWlzc2luZyB0b1N0cmluZyBjYW4gc3RpbGwgYmUgc29ydGVkIHdpdGhvdXQgYVxuICogVHlwZUVycm9yLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGZpcnN0IGVsZW1lbnQgdG8gY29tcGFyZVxuICogQHBhcmFtIHtNaXhlZH0gc2Vjb25kIGVsZW1lbnQgdG8gY29tcGFyZVxuICogQHJldHVybnMge051bWJlcn0gLTEgaWYgJ2EnIHNob3VsZCBjb21lIGJlZm9yZSAnYic7IG90aGVyd2lzZSAxXG4gKiBAbmFtZSBjb21wYXJlQnlJbnNwZWN0XG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tcGFyZUJ5SW5zcGVjdChhLCBiKSB7XG4gIHJldHVybiBpbnNwZWN0KGEpIDwgaW5zcGVjdChiKSA/IC0xIDogMTtcbn07XG4iLCIvKiFcbiAqIENoYWkgLSBleHBlY3RUeXBlcyB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiAjIyMgLmV4cGVjdFR5cGVzKG9iaiwgdHlwZXMpXG4gKlxuICogRW5zdXJlcyB0aGF0IHRoZSBvYmplY3QgYmVpbmcgdGVzdGVkIGFnYWluc3QgaXMgb2YgYSB2YWxpZCB0eXBlLlxuICpcbiAqICAgICB1dGlscy5leHBlY3RUeXBlcyh0aGlzLCBbJ2FycmF5JywgJ29iamVjdCcsICdzdHJpbmcnXSk7XG4gKlxuICogQHBhcmFtIHtNaXhlZH0gb2JqIGNvbnN0cnVjdGVkIEFzc2VydGlvblxuICogQHBhcmFtIHtBcnJheX0gdHlwZSBBIGxpc3Qgb2YgYWxsb3dlZCB0eXBlcyBmb3IgdGhpcyBhc3NlcnRpb25cbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGV4cGVjdFR5cGVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnZhciBBc3NlcnRpb25FcnJvciA9IHJlcXVpcmUoJ2Fzc2VydGlvbi1lcnJvcicpO1xudmFyIGZsYWcgPSByZXF1aXJlKCcuL2ZsYWcnKTtcbnZhciB0eXBlID0gcmVxdWlyZSgndHlwZS1kZXRlY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHBlY3RUeXBlcyhvYmosIHR5cGVzKSB7XG4gIHZhciBmbGFnTXNnID0gZmxhZyhvYmosICdtZXNzYWdlJyk7XG4gIHZhciBzc2ZpID0gZmxhZyhvYmosICdzc2ZpJyk7XG5cbiAgZmxhZ01zZyA9IGZsYWdNc2cgPyBmbGFnTXNnICsgJzogJyA6ICcnO1xuXG4gIG9iaiA9IGZsYWcob2JqLCAnb2JqZWN0Jyk7XG4gIHR5cGVzID0gdHlwZXMubWFwKGZ1bmN0aW9uICh0KSB7IHJldHVybiB0LnRvTG93ZXJDYXNlKCk7IH0pO1xuICB0eXBlcy5zb3J0KCk7XG5cbiAgLy8gVHJhbnNmb3JtcyBbJ2xvcmVtJywgJ2lwc3VtJ10gaW50byAnYSBsb3JlbSwgb3IgYW4gaXBzdW0nXG4gIHZhciBzdHIgPSB0eXBlcy5tYXAoZnVuY3Rpb24gKHQsIGluZGV4KSB7XG4gICAgdmFyIGFydCA9IH5bICdhJywgJ2UnLCAnaScsICdvJywgJ3UnIF0uaW5kZXhPZih0LmNoYXJBdCgwKSkgPyAnYW4nIDogJ2EnO1xuICAgIHZhciBvciA9IHR5cGVzLmxlbmd0aCA+IDEgJiYgaW5kZXggPT09IHR5cGVzLmxlbmd0aCAtIDEgPyAnb3IgJyA6ICcnO1xuICAgIHJldHVybiBvciArIGFydCArICcgJyArIHQ7XG4gIH0pLmpvaW4oJywgJyk7XG5cbiAgdmFyIG9ialR5cGUgPSB0eXBlKG9iaikudG9Mb3dlckNhc2UoKTtcblxuICBpZiAoIXR5cGVzLnNvbWUoZnVuY3Rpb24gKGV4cGVjdGVkKSB7IHJldHVybiBvYmpUeXBlID09PSBleHBlY3RlZDsgfSkpIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICBmbGFnTXNnICsgJ29iamVjdCB0ZXN0ZWQgbXVzdCBiZSAnICsgc3RyICsgJywgYnV0ICcgKyBvYmpUeXBlICsgJyBnaXZlbicsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICBzc2ZpXG4gICAgKTtcbiAgfVxufTtcbiIsIi8qIVxuICogQ2hhaSAtIGZsYWcgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyMjIC5mbGFnKG9iamVjdCwga2V5LCBbdmFsdWVdKVxuICpcbiAqIEdldCBvciBzZXQgYSBmbGFnIHZhbHVlIG9uIGFuIG9iamVjdC4gSWYgYVxuICogdmFsdWUgaXMgcHJvdmlkZWQgaXQgd2lsbCBiZSBzZXQsIGVsc2UgaXQgd2lsbFxuICogcmV0dXJuIHRoZSBjdXJyZW50bHkgc2V0IHZhbHVlIG9yIGB1bmRlZmluZWRgIGlmXG4gKiB0aGUgdmFsdWUgaXMgbm90IHNldC5cbiAqXG4gKiAgICAgdXRpbHMuZmxhZyh0aGlzLCAnZm9vJywgJ2JhcicpOyAvLyBzZXR0ZXJcbiAqICAgICB1dGlscy5mbGFnKHRoaXMsICdmb28nKTsgLy8gZ2V0dGVyLCByZXR1cm5zIGBiYXJgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBjb25zdHJ1Y3RlZCBBc3NlcnRpb25cbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIChvcHRpb25hbClcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGZsYWdcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmxhZyhvYmosIGtleSwgdmFsdWUpIHtcbiAgdmFyIGZsYWdzID0gb2JqLl9fZmxhZ3MgfHwgKG9iai5fX2ZsYWdzID0gT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgZmxhZ3Nba2V5XSA9IHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmbGFnc1trZXldO1xuICB9XG59O1xuIiwiLyohXG4gKiBDaGFpIC0gZ2V0QWN0dWFsIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAuZ2V0QWN0dWFsKG9iamVjdCwgW2FjdHVhbF0pXG4gKlxuICogUmV0dXJucyB0aGUgYGFjdHVhbGAgdmFsdWUgZm9yIGFuIEFzc2VydGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IChjb25zdHJ1Y3RlZCBBc3NlcnRpb24pXG4gKiBAcGFyYW0ge0FyZ3VtZW50c30gY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLmFzc2VydCBhcmd1bWVudHNcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGdldEFjdHVhbFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0QWN0dWFsKG9iaiwgYXJncykge1xuICByZXR1cm4gYXJncy5sZW5ndGggPiA0ID8gYXJnc1s0XSA6IG9iai5fb2JqO1xufTtcbiIsIi8qIVxuICogQ2hhaSAtIGdldEVudW1lcmFibGVQcm9wZXJ0aWVzIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAuZ2V0RW51bWVyYWJsZVByb3BlcnRpZXMob2JqZWN0KVxuICpcbiAqIFRoaXMgYWxsb3dzIHRoZSByZXRyaWV2YWwgb2YgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBhbiBvYmplY3QsXG4gKiBpbmhlcml0ZWQgb3Igbm90LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGdldEVudW1lcmFibGVQcm9wZXJ0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0RW51bWVyYWJsZVByb3BlcnRpZXMob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIgbmFtZSBpbiBvYmplY3QpIHtcbiAgICByZXN1bHQucHVzaChuYW1lKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8qIVxuICogQ2hhaSAtIG1lc3NhZ2UgY29tcG9zaXRpb24gdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qIVxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG5cbnZhciBmbGFnID0gcmVxdWlyZSgnLi9mbGFnJylcbiAgLCBnZXRBY3R1YWwgPSByZXF1aXJlKCcuL2dldEFjdHVhbCcpXG4gICwgb2JqRGlzcGxheSA9IHJlcXVpcmUoJy4vb2JqRGlzcGxheScpO1xuXG4vKipcbiAqICMjIyAuZ2V0TWVzc2FnZShvYmplY3QsIG1lc3NhZ2UsIG5lZ2F0ZU1lc3NhZ2UpXG4gKlxuICogQ29uc3RydWN0IHRoZSBlcnJvciBtZXNzYWdlIGJhc2VkIG9uIGZsYWdzXG4gKiBhbmQgdGVtcGxhdGUgdGFncy4gVGVtcGxhdGUgdGFncyB3aWxsIHJldHVyblxuICogYSBzdHJpbmdpZmllZCBpbnNwZWN0aW9uIG9mIHRoZSBvYmplY3QgcmVmZXJlbmNlZC5cbiAqXG4gKiBNZXNzYWdlIHRlbXBsYXRlIHRhZ3M6XG4gKiAtIGAje3RoaXN9YCBjdXJyZW50IGFzc2VydGVkIG9iamVjdFxuICogLSBgI3thY3R9YCBhY3R1YWwgdmFsdWVcbiAqIC0gYCN7ZXhwfWAgZXhwZWN0ZWQgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IChjb25zdHJ1Y3RlZCBBc3NlcnRpb24pXG4gKiBAcGFyYW0ge0FyZ3VtZW50c30gY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLmFzc2VydCBhcmd1bWVudHNcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGdldE1lc3NhZ2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRNZXNzYWdlKG9iaiwgYXJncykge1xuICB2YXIgbmVnYXRlID0gZmxhZyhvYmosICduZWdhdGUnKVxuICAgICwgdmFsID0gZmxhZyhvYmosICdvYmplY3QnKVxuICAgICwgZXhwZWN0ZWQgPSBhcmdzWzNdXG4gICAgLCBhY3R1YWwgPSBnZXRBY3R1YWwob2JqLCBhcmdzKVxuICAgICwgbXNnID0gbmVnYXRlID8gYXJnc1syXSA6IGFyZ3NbMV1cbiAgICAsIGZsYWdNc2cgPSBmbGFnKG9iaiwgJ21lc3NhZ2UnKTtcblxuICBpZih0eXBlb2YgbXNnID09PSBcImZ1bmN0aW9uXCIpIG1zZyA9IG1zZygpO1xuICBtc2cgPSBtc2cgfHwgJyc7XG4gIG1zZyA9IG1zZ1xuICAgIC5yZXBsYWNlKC8jXFx7dGhpc1xcfS9nLCBmdW5jdGlvbiAoKSB7IHJldHVybiBvYmpEaXNwbGF5KHZhbCk7IH0pXG4gICAgLnJlcGxhY2UoLyNcXHthY3RcXH0vZywgZnVuY3Rpb24gKCkgeyByZXR1cm4gb2JqRGlzcGxheShhY3R1YWwpOyB9KVxuICAgIC5yZXBsYWNlKC8jXFx7ZXhwXFx9L2csIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9iakRpc3BsYXkoZXhwZWN0ZWQpOyB9KTtcblxuICByZXR1cm4gZmxhZ01zZyA/IGZsYWdNc2cgKyAnOiAnICsgbXNnIDogbXNnO1xufTtcbiIsIi8qIVxuICogQ2hhaSAtIGdldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDExLTIwMTYgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKiFcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scyA9IHJlcXVpcmUoJy4vZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scycpO1xuXG4vKipcbiAqICMjIyAuZ2V0T3duRW51bWVyYWJsZVByb3BlcnRpZXMob2JqZWN0KVxuICpcbiAqIFRoaXMgYWxsb3dzIHRoZSByZXRyaWV2YWwgb2YgZGlyZWN0bHktb3duZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmRcbiAqIHN5bWJvbHMgb2YgYW4gb2JqZWN0LiBUaGlzIGZ1bmN0aW9uIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIE9iamVjdC5rZXlzIG9ubHlcbiAqIHJldHVybnMgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcywgbm90IGVudW1lcmFibGUgcHJvcGVydHkgc3ltYm9scy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAbmFtZSBnZXRPd25FbnVtZXJhYmxlUHJvcGVydGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzKG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5jb25jYXQoZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scyhvYmopKTtcbn07XG4iLCIvKiFcbiAqIENoYWkgLSBnZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDExLTIwMTYgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAuZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scyhvYmplY3QpXG4gKlxuICogVGhpcyBhbGxvd3MgdGhlIHJldHJpZXZhbCBvZiBkaXJlY3RseS1vd25lZCBlbnVtZXJhYmxlIHByb3BlcnR5IHN5bWJvbHMgb2YgYW5cbiAqIG9iamVjdC4gVGhpcyBmdW5jdGlvbiBpcyBuZWNlc3NhcnkgYmVjYXVzZSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzXG4gKiByZXR1cm5zIGJvdGggZW51bWVyYWJsZSBhbmQgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgc3ltYm9scy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAbmFtZSBnZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scyhvYmopIHtcbiAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gW107XG5cbiAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgc3ltKS5lbnVtZXJhYmxlO1xuICB9KTtcbn07XG4iLCIvKiFcbiAqIENoYWkgLSBnZXRQcm9wZXJ0aWVzIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAuZ2V0UHJvcGVydGllcyhvYmplY3QpXG4gKlxuICogVGhpcyBhbGxvd3MgdGhlIHJldHJpZXZhbCBvZiBwcm9wZXJ0eSBuYW1lcyBvZiBhbiBvYmplY3QsIGVudW1lcmFibGUgb3Igbm90LFxuICogaW5oZXJpdGVkIG9yIG5vdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAbmFtZSBnZXRQcm9wZXJ0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0UHJvcGVydGllcyhvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCk7XG5cbiAgZnVuY3Rpb24gYWRkUHJvcGVydHkocHJvcGVydHkpIHtcbiAgICBpZiAocmVzdWx0LmluZGV4T2YocHJvcGVydHkpID09PSAtMSkge1xuICAgICAgcmVzdWx0LnB1c2gocHJvcGVydHkpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpO1xuICB3aGlsZSAocHJvdG8gIT09IG51bGwpIHtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90bykuZm9yRWFjaChhZGRQcm9wZXJ0eSk7XG4gICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKiFcbiAqIGNoYWlcbiAqIENvcHlyaWdodChjKSAyMDExIEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyohXG4gKiBEZXBlbmRlbmNpZXMgdGhhdCBhcmUgdXNlZCBmb3IgbXVsdGlwbGUgZXhwb3J0cyBhcmUgcmVxdWlyZWQgaGVyZSBvbmx5IG9uY2VcbiAqL1xuXG52YXIgcGF0aHZhbCA9IHJlcXVpcmUoJ3BhdGh2YWwnKTtcblxuLyohXG4gKiB0ZXN0IHV0aWxpdHlcbiAqL1xuXG5leHBvcnRzLnRlc3QgPSByZXF1aXJlKCcuL3Rlc3QnKTtcblxuLyohXG4gKiB0eXBlIHV0aWxpdHlcbiAqL1xuXG5leHBvcnRzLnR5cGUgPSByZXF1aXJlKCd0eXBlLWRldGVjdCcpO1xuXG4vKiFcbiAqIGV4cGVjdFR5cGVzIHV0aWxpdHlcbiAqL1xuZXhwb3J0cy5leHBlY3RUeXBlcyA9IHJlcXVpcmUoJy4vZXhwZWN0VHlwZXMnKTtcblxuLyohXG4gKiBtZXNzYWdlIHV0aWxpdHlcbiAqL1xuXG5leHBvcnRzLmdldE1lc3NhZ2UgPSByZXF1aXJlKCcuL2dldE1lc3NhZ2UnKTtcblxuLyohXG4gKiBhY3R1YWwgdXRpbGl0eVxuICovXG5cbmV4cG9ydHMuZ2V0QWN0dWFsID0gcmVxdWlyZSgnLi9nZXRBY3R1YWwnKTtcblxuLyohXG4gKiBJbnNwZWN0IHV0aWxcbiAqL1xuXG5leHBvcnRzLmluc3BlY3QgPSByZXF1aXJlKCcuL2luc3BlY3QnKTtcblxuLyohXG4gKiBPYmplY3QgRGlzcGxheSB1dGlsXG4gKi9cblxuZXhwb3J0cy5vYmpEaXNwbGF5ID0gcmVxdWlyZSgnLi9vYmpEaXNwbGF5Jyk7XG5cbi8qIVxuICogRmxhZyB1dGlsaXR5XG4gKi9cblxuZXhwb3J0cy5mbGFnID0gcmVxdWlyZSgnLi9mbGFnJyk7XG5cbi8qIVxuICogRmxhZyB0cmFuc2ZlcnJpbmcgdXRpbGl0eVxuICovXG5cbmV4cG9ydHMudHJhbnNmZXJGbGFncyA9IHJlcXVpcmUoJy4vdHJhbnNmZXJGbGFncycpO1xuXG4vKiFcbiAqIERlZXAgZXF1YWwgdXRpbGl0eVxuICovXG5cbmV4cG9ydHMuZXFsID0gcmVxdWlyZSgnZGVlcC1lcWwnKTtcblxuLyohXG4gKiBEZWVwIHBhdGggaW5mb1xuICovXG5cbmV4cG9ydHMuZ2V0UGF0aEluZm8gPSBwYXRodmFsLmdldFBhdGhJbmZvO1xuXG4vKiFcbiAqIENoZWNrIGlmIGEgcHJvcGVydHkgZXhpc3RzXG4gKi9cblxuZXhwb3J0cy5oYXNQcm9wZXJ0eSA9IHBhdGh2YWwuaGFzUHJvcGVydHk7XG5cbi8qIVxuICogRnVuY3Rpb24gbmFtZVxuICovXG5cbmV4cG9ydHMuZ2V0TmFtZSA9IHJlcXVpcmUoJ2dldC1mdW5jLW5hbWUnKTtcblxuLyohXG4gKiBhZGQgUHJvcGVydHlcbiAqL1xuXG5leHBvcnRzLmFkZFByb3BlcnR5ID0gcmVxdWlyZSgnLi9hZGRQcm9wZXJ0eScpO1xuXG4vKiFcbiAqIGFkZCBNZXRob2RcbiAqL1xuXG5leHBvcnRzLmFkZE1ldGhvZCA9IHJlcXVpcmUoJy4vYWRkTWV0aG9kJyk7XG5cbi8qIVxuICogb3ZlcndyaXRlIFByb3BlcnR5XG4gKi9cblxuZXhwb3J0cy5vdmVyd3JpdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vb3ZlcndyaXRlUHJvcGVydHknKTtcblxuLyohXG4gKiBvdmVyd3JpdGUgTWV0aG9kXG4gKi9cblxuZXhwb3J0cy5vdmVyd3JpdGVNZXRob2QgPSByZXF1aXJlKCcuL292ZXJ3cml0ZU1ldGhvZCcpO1xuXG4vKiFcbiAqIEFkZCBhIGNoYWluYWJsZSBtZXRob2RcbiAqL1xuXG5leHBvcnRzLmFkZENoYWluYWJsZU1ldGhvZCA9IHJlcXVpcmUoJy4vYWRkQ2hhaW5hYmxlTWV0aG9kJyk7XG5cbi8qIVxuICogT3ZlcndyaXRlIGNoYWluYWJsZSBtZXRob2RcbiAqL1xuXG5leHBvcnRzLm92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZCA9IHJlcXVpcmUoJy4vb3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kJyk7XG5cbi8qIVxuICogQ29tcGFyZSBieSBpbnNwZWN0IG1ldGhvZFxuICovXG5cbmV4cG9ydHMuY29tcGFyZUJ5SW5zcGVjdCA9IHJlcXVpcmUoJy4vY29tcGFyZUJ5SW5zcGVjdCcpO1xuXG4vKiFcbiAqIEdldCBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBzeW1ib2xzIG1ldGhvZFxuICovXG5cbmV4cG9ydHMuZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scyA9IHJlcXVpcmUoJy4vZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scycpO1xuXG4vKiFcbiAqIEdldCBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG1ldGhvZFxuICovXG5cbmV4cG9ydHMuZ2V0T3duRW51bWVyYWJsZVByb3BlcnRpZXMgPSByZXF1aXJlKCcuL2dldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzJyk7XG5cbi8qIVxuICogQ2hlY2tzIGVycm9yIGFnYWluc3QgYSBnaXZlbiBzZXQgb2YgY3JpdGVyaWFcbiAqL1xuXG5leHBvcnRzLmNoZWNrRXJyb3IgPSByZXF1aXJlKCdjaGVjay1lcnJvcicpO1xuXG4vKiFcbiAqIFByb3hpZnkgdXRpbFxuICovXG5cbmV4cG9ydHMucHJveGlmeSA9IHJlcXVpcmUoJy4vcHJveGlmeScpO1xuXG4vKiFcbiAqIGFkZExlbmd0aEd1YXJkIHV0aWxcbiAqL1xuXG5leHBvcnRzLmFkZExlbmd0aEd1YXJkID0gcmVxdWlyZSgnLi9hZGRMZW5ndGhHdWFyZCcpO1xuXG4vKiFcbiAqIGlzUHJveHlFbmFibGVkIGhlbHBlclxuICovXG5cbmV4cG9ydHMuaXNQcm94eUVuYWJsZWQgPSByZXF1aXJlKCcuL2lzUHJveHlFbmFibGVkJyk7XG5cbi8qIVxuICogaXNOYU4gbWV0aG9kXG4gKi9cblxuZXhwb3J0cy5pc05hTiA9IHJlcXVpcmUoJy4vaXNOYU4nKTtcbiIsIi8vIFRoaXMgaXMgKGFsbW9zdCkgZGlyZWN0bHkgZnJvbSBOb2RlLmpzIHV0aWxzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvYmxvYi9mOGMzMzVkMGNhZjQ3ZjE2ZDMxNDEzZjg5YWEyOGVkYTM4NzhlM2FhL2xpYi91dGlsLmpzXG5cbnZhciBnZXROYW1lID0gcmVxdWlyZSgnZ2V0LWZ1bmMtbmFtZScpO1xudmFyIGdldFByb3BlcnRpZXMgPSByZXF1aXJlKCcuL2dldFByb3BlcnRpZXMnKTtcbnZhciBnZXRFbnVtZXJhYmxlUHJvcGVydGllcyA9IHJlcXVpcmUoJy4vZ2V0RW51bWVyYWJsZVByb3BlcnRpZXMnKTtcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnNwZWN0O1xuXG4vKipcbiAqICMjIyAuaW5zcGVjdChvYmosIFtzaG93SGlkZGVuXSwgW2RlcHRoXSwgW2NvbG9yc10pXG4gKlxuICogRWNob2VzIHRoZSB2YWx1ZSBvZiBhIHZhbHVlLiBUcmllcyB0byBwcmludCB0aGUgdmFsdWUgb3V0XG4gKiBpbiB0aGUgYmVzdCB3YXkgcG9zc2libGUgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcHJpbnQgb3V0LlxuICogQHBhcmFtIHtCb29sZWFufSBzaG93SGlkZGVuIEZsYWcgdGhhdCBzaG93cyBoaWRkZW4gKG5vdCBlbnVtZXJhYmxlKVxuICogICAgcHJvcGVydGllcyBvZiBvYmplY3RzLiBEZWZhdWx0IGlzIGZhbHNlLlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlcHRoIERlcHRoIGluIHdoaWNoIHRvIGRlc2NlbmQgaW4gb2JqZWN0LiBEZWZhdWx0IGlzIDIuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGNvbG9ycyBGbGFnIHRvIHR1cm4gb24gQU5TSSBlc2NhcGUgY29kZXMgdG8gY29sb3IgdGhlXG4gKiAgICBvdXRwdXQuIERlZmF1bHQgaXMgZmFsc2UgKG5vIGNvbG9yaW5nKS5cbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGluc3BlY3RcbiAqL1xuZnVuY3Rpb24gaW5zcGVjdChvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMpIHtcbiAgdmFyIGN0eCA9IHtcbiAgICBzaG93SGlkZGVuOiBzaG93SGlkZGVuLFxuICAgIHNlZW46IFtdLFxuICAgIHN0eWxpemU6IGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIHN0cjsgfVxuICB9O1xuICByZXR1cm4gZm9ybWF0VmFsdWUoY3R4LCBvYmosICh0eXBlb2YgZGVwdGggPT09ICd1bmRlZmluZWQnID8gMiA6IGRlcHRoKSk7XG59XG5cbi8vIFJldHVybnMgdHJ1ZSBpZiBvYmplY3QgaXMgYSBET00gZWxlbWVudC5cbnZhciBpc0RPTUVsZW1lbnQgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gIGlmICh0eXBlb2YgSFRNTEVsZW1lbnQgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9iamVjdCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmplY3QgJiZcbiAgICAgIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICAnbm9kZVR5cGUnIGluIG9iamVjdCAmJlxuICAgICAgb2JqZWN0Lm5vZGVUeXBlID09PSAxICYmXG4gICAgICB0eXBlb2Ygb2JqZWN0Lm5vZGVOYW1lID09PSAnc3RyaW5nJztcbiAgfVxufTtcblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG4gIC8vIFByb3ZpZGUgYSBob29rIGZvciB1c2VyLXNwZWNpZmllZCBpbnNwZWN0IGZ1bmN0aW9ucy5cbiAgLy8gQ2hlY2sgdGhhdCB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhbiBpbnNwZWN0IGZ1bmN0aW9uIG9uIGl0XG4gIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUuaW5zcGVjdCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcbiAgICBpZiAodHlwZW9mIHJldCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldCA9IGZvcm1hdFZhbHVlKGN0eCwgcmV0LCByZWN1cnNlVGltZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcbiAgdmFyIHByaW1pdGl2ZSA9IGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKTtcbiAgaWYgKHByaW1pdGl2ZSkge1xuICAgIHJldHVybiBwcmltaXRpdmU7XG4gIH1cblxuICAvLyBJZiB0aGlzIGlzIGEgRE9NIGVsZW1lbnQsIHRyeSB0byBnZXQgdGhlIG91dGVyIEhUTUwuXG4gIGlmIChpc0RPTUVsZW1lbnQodmFsdWUpKSB7XG4gICAgaWYgKCdvdXRlckhUTUwnIGluIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUub3V0ZXJIVE1MO1xuICAgICAgLy8gVGhpcyB2YWx1ZSBkb2VzIG5vdCBoYXZlIGFuIG91dGVySFRNTCBhdHRyaWJ1dGUsXG4gICAgICAvLyAgIGl0IGNvdWxkIHN0aWxsIGJlIGFuIFhNTCBlbGVtZW50XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEF0dGVtcHQgdG8gc2VyaWFsaXplIGl0XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoZG9jdW1lbnQueG1sVmVyc2lvbikge1xuICAgICAgICAgIHZhciB4bWxTZXJpYWxpemVyID0gbmV3IFhNTFNlcmlhbGl6ZXIoKTtcbiAgICAgICAgICByZXR1cm4geG1sU2VyaWFsaXplci5zZXJpYWxpemVUb1N0cmluZyh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gRmlyZWZveCAxMS0gZG8gbm90IHN1cHBvcnQgb3V0ZXJIVE1MXG4gICAgICAgICAgLy8gICBJdCBkb2VzLCBob3dldmVyLCBzdXBwb3J0IGlubmVySFRNTFxuICAgICAgICAgIC8vICAgVXNlIHRoZSBmb2xsb3dpbmcgdG8gcmVuZGVyIHRoZSBlbGVtZW50XG4gICAgICAgICAgdmFyIG5zID0gXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI7XG4gICAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhucywgJ18nKTtcblxuICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh2YWx1ZS5jbG9uZU5vZGUoZmFsc2UpKTtcbiAgICAgICAgICB2YXIgaHRtbCA9IGNvbnRhaW5lci5pbm5lckhUTUxcbiAgICAgICAgICAgIC5yZXBsYWNlKCc+PCcsICc+JyArIHZhbHVlLmlubmVySFRNTCArICc8Jyk7XG4gICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gVGhpcyBjb3VsZCBiZSBhIG5vbi1uYXRpdmUgRE9NIGltcGxlbWVudGF0aW9uLFxuICAgICAgICAvLyAgIGNvbnRpbnVlIHdpdGggdGhlIG5vcm1hbCBmbG93OlxuICAgICAgICAvLyAgIHByaW50aW5nIHRoZSBlbGVtZW50IGFzIGlmIGl0IGlzIGFuIG9iamVjdC5cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciB2aXNpYmxlS2V5cyA9IGdldEVudW1lcmFibGVQcm9wZXJ0aWVzKHZhbHVlKTtcbiAgdmFyIGtleXMgPSBjdHguc2hvd0hpZGRlbiA/IGdldFByb3BlcnRpZXModmFsdWUpIDogdmlzaWJsZUtleXM7XG5cbiAgdmFyIG5hbWUsIG5hbWVTdWZmaXg7XG5cbiAgLy8gU29tZSB0eXBlIG9mIG9iamVjdCB3aXRob3V0IHByb3BlcnRpZXMgY2FuIGJlIHNob3J0Y3V0LlxuICAvLyBJbiBJRSwgZXJyb3JzIGhhdmUgYSBzaW5nbGUgYHN0YWNrYCBwcm9wZXJ0eSwgb3IgaWYgdGhleSBhcmUgdmFuaWxsYSBgRXJyb3JgLFxuICAvLyBhIGBzdGFja2AgcGx1cyBgZGVzY3JpcHRpb25gIHByb3BlcnR5OyBpZ25vcmUgdGhvc2UgZm9yIGNvbnNpc3RlbmN5LlxuICBpZiAoa2V5cy5sZW5ndGggPT09IDAgfHwgKGlzRXJyb3IodmFsdWUpICYmIChcbiAgICAgIChrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdID09PSAnc3RhY2snKSB8fFxuICAgICAgKGtleXMubGVuZ3RoID09PSAyICYmIGtleXNbMF0gPT09ICdkZXNjcmlwdGlvbicgJiYga2V5c1sxXSA9PT0gJ3N0YWNrJylcbiAgICAgKSkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBuYW1lID0gZ2V0TmFtZSh2YWx1ZSk7XG4gICAgICBuYW1lU3VmZml4ID0gbmFtZSA/ICc6ICcgKyBuYW1lIDogJyc7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tGdW5jdGlvbicgKyBuYW1lU3VmZml4ICsgJ10nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH1cbiAgICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKERhdGUucHJvdG90eXBlLnRvVVRDU3RyaW5nLmNhbGwodmFsdWUpLCAnZGF0ZScpO1xuICAgIH1cbiAgICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJhc2UgPSAnJ1xuICAgICwgYXJyYXkgPSBmYWxzZVxuICAgICwgdHlwZWRBcnJheSA9IGZhbHNlXG4gICAgLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIGlmIChpc1R5cGVkQXJyYXkodmFsdWUpKSB7XG4gICAgdHlwZWRBcnJheSA9IHRydWU7XG4gICAgYnJhY2VzID0gWydbJywgJ10nXTtcbiAgfVxuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG5hbWUgPSBnZXROYW1lKHZhbHVlKTtcbiAgICBuYW1lU3VmZml4ID0gbmFtZSA/ICc6ICcgKyBuYW1lIDogJyc7XG4gICAgYmFzZSA9ICcgW0Z1bmN0aW9uJyArIG5hbWVTdWZmaXggKyAnXSc7XG4gIH1cblxuICAvLyBNYWtlIFJlZ0V4cHMgc2F5IHRoYXQgdGhleSBhcmUgUmVnRXhwc1xuICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGRhdGVzIHdpdGggcHJvcGVydGllcyBmaXJzdCBzYXkgdGhlIGRhdGVcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgRGF0ZS5wcm90b3R5cGUudG9VVENTdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGVycm9yIHdpdGggbWVzc2FnZSBmaXJzdCBzYXkgdGhlIGVycm9yXG4gIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICBpZiAoa2V5cy5sZW5ndGggPT09IDAgJiYgKCFhcnJheSB8fCB2YWx1ZS5sZW5ndGggPT0gMCkpIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArIGJyYWNlc1sxXTtcbiAgfVxuXG4gIGlmIChyZWN1cnNlVGltZXMgPCAwKSB7XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbT2JqZWN0XScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG5cbiAgY3R4LnNlZW4ucHVzaCh2YWx1ZSk7XG5cbiAgdmFyIG91dHB1dDtcbiAgaWYgKGFycmF5KSB7XG4gICAgb3V0cHV0ID0gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cyk7XG4gIH0gZWxzZSBpZiAodHlwZWRBcnJheSkge1xuICAgIHJldHVybiBmb3JtYXRUeXBlZEFycmF5KHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKSB7XG4gIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgndW5kZWZpbmVkJywgJ3VuZGVmaW5lZCcpO1xuXG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykgKyAnXFwnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBpZiAodmFsdWUgPT09IDAgJiYgKDEvdmFsdWUpID09PSAtSW5maW5pdHkpIHtcbiAgICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCctMCcsICdudW1iZXInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuXG4gICAgY2FzZSAnc3ltYm9sJzpcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSh2YWx1ZS50b1N0cmluZygpLCAnc3ltYm9sJyk7XG4gIH1cbiAgLy8gRm9yIHNvbWUgcmVhc29uIHR5cGVvZiBudWxsIGlzIFwib2JqZWN0XCIsIHNvIHNwZWNpYWwgY2FzZSBoZXJlLlxuICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ251bGwnLCAnbnVsbCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKHZhbHVlKSB7XG4gIHJldHVybiAnWycgKyBFcnJvci5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgKyAnXSc7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAgU3RyaW5nKGkpLCB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cblxuICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKCFrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIGtleSwgdHJ1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFR5cGVkQXJyYXkodmFsdWUpIHtcbiAgdmFyIHN0ciA9ICdbICc7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgIGlmIChzdHIubGVuZ3RoID49IGNvbmZpZy50cnVuY2F0ZVRocmVzaG9sZCAtIDcpIHtcbiAgICAgIHN0ciArPSAnLi4uJztcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBzdHIgKz0gdmFsdWVbaV0gKyAnLCAnO1xuICB9XG4gIHN0ciArPSAnIF0nO1xuXG4gIC8vIFJlbW92aW5nIHRyYWlsaW5nIGAsIGAgaWYgdGhlIGFycmF5IHdhcyBub3QgdHJ1bmNhdGVkXG4gIGlmIChzdHIuaW5kZXhPZignLCAgXScpICE9PSAtMSkge1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKCcsICBdJywgJyBdJyk7XG4gIH1cblxuICByZXR1cm4gc3RyO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KSB7XG4gIHZhciBuYW1lO1xuICB2YXIgcHJvcERlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhbHVlLCBrZXkpO1xuICB2YXIgc3RyO1xuXG4gIGlmIChwcm9wRGVzY3JpcHRvcikge1xuICAgIGlmIChwcm9wRGVzY3JpcHRvci5nZXQpIHtcbiAgICAgIGlmIChwcm9wRGVzY3JpcHRvci5zZXQpIHtcbiAgICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXIvU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocHJvcERlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmICh2aXNpYmxlS2V5cy5pbmRleE9mKGtleSkgPCAwKSB7XG4gICAgbmFtZSA9ICdbJyArIGtleSArICddJztcbiAgfVxuICBpZiAoIXN0cikge1xuICAgIGlmIChjdHguc2Vlbi5pbmRleE9mKHZhbHVlW2tleV0pIDwgMCkge1xuICAgICAgaWYgKHJlY3Vyc2VUaW1lcyA9PT0gbnVsbCkge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlW2tleV0sIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZVtrZXldLCByZWN1cnNlVGltZXMgLSAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHIuaW5kZXhPZignXFxuJykgPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICBzdHIgPSBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJykuc3Vic3RyKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0NpcmN1bGFyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxLCBuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cbmZ1bmN0aW9uIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKSB7XG4gIHZhciBsZW5ndGggPSBvdXRwdXQucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cikge1xuICAgIHJldHVybiBwcmV2ICsgY3VyLmxlbmd0aCArIDE7XG4gIH0sIDApO1xuXG4gIGlmIChsZW5ndGggPiA2MCkge1xuICAgIHJldHVybiBicmFjZXNbMF0gK1xuICAgICAgICAgICAoYmFzZSA9PT0gJycgPyAnJyA6IGJhc2UgKyAnXFxuICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgb3V0cHV0LmpvaW4oJyxcXG4gICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgYnJhY2VzWzFdO1xuICB9XG5cbiAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyAnICcgKyBvdXRwdXQuam9pbignLCAnKSArICcgJyArIGJyYWNlc1sxXTtcbn1cblxuZnVuY3Rpb24gaXNUeXBlZEFycmF5KGFyKSB7XG4gIC8vIFVuZm9ydHVuYXRlbHkgdGhlcmUncyBubyB3YXkgdG8gY2hlY2sgaWYgYW4gb2JqZWN0IGlzIGEgVHlwZWRBcnJheVxuICAvLyBXZSBoYXZlIHRvIGNoZWNrIGlmIGl0J3Mgb25lIG9mIHRoZXNlIHR5cGVzXG4gIHJldHVybiAodHlwZW9mIGFyID09PSAnb2JqZWN0JyAmJiAvXFx3K0FycmF5XSQvLnRlc3Qob2JqZWN0VG9TdHJpbmcoYXIpKSk7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpIHx8XG4gICAgICAgICAodHlwZW9mIGFyID09PSAnb2JqZWN0JyAmJiBvYmplY3RUb1N0cmluZyhhcikgPT09ICdbb2JqZWN0IEFycmF5XScpO1xufVxuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gdHlwZW9mIHJlID09PSAnb2JqZWN0JyAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gdHlwZW9mIGQgPT09ICdvYmplY3QnICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gdHlwZW9mIGUgPT09ICdvYmplY3QnICYmIG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nO1xufVxuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG4iLCIvKiFcbiAqIENoYWkgLSBpc05hTiB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE1IFNha3RoaXByaXlhbiBWYWlyYW1hbmkgPHRoZWNoYXJnaW5ndm9sY2Fub0BnbWFpbC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAuaXNOYU4odmFsdWUpXG4gKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBOYU4gb3Igbm90LlxuICpcbiAqICAgICB1dGlscy5pc05hTihOYU4pOyAvLyB0cnVlXG4gKlxuICogQHBhcmFtIHtWYWx1ZX0gVGhlIHZhbHVlIHdoaWNoIGhhcyB0byBiZSBjaGVja2VkIGlmIGl0IGlzIE5hTlxuICogQG5hbWUgaXNOYU5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzTmFOKHZhbHVlKSB7XG4gIC8vIFJlZmVyIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1pc25hbi1udW1iZXJcbiAgLy8gc2VjdGlvbidzIE5PVEUuXG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbi8vIElmIEVDTUFTY3JpcHQgNidzIE51bWJlci5pc05hTiBpcyBwcmVzZW50LCBwcmVmZXIgdGhhdC5cbm1vZHVsZS5leHBvcnRzID0gTnVtYmVyLmlzTmFOIHx8IGlzTmFOO1xuIiwidmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xuXG4vKiFcbiAqIENoYWkgLSBpc1Byb3h5RW5hYmxlZCBoZWxwZXJcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAuaXNQcm94eUVuYWJsZWQoKVxuICpcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjaGVjayBpZiBDaGFpJ3MgcHJveHkgcHJvdGVjdGlvbiBmZWF0dXJlIGlzIGVuYWJsZWQuIElmXG4gKiBwcm94aWVzIGFyZSB1bnN1cHBvcnRlZCBvciBkaXNhYmxlZCB2aWEgdGhlIHVzZXIncyBDaGFpIGNvbmZpZywgdGhlbiByZXR1cm5cbiAqIGZhbHNlLiBPdGhlcndpc2UsIHJldHVybiB0cnVlLlxuICpcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGlzUHJveHlFbmFibGVkXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1Byb3h5RW5hYmxlZCgpIHtcbiAgcmV0dXJuIGNvbmZpZy51c2VQcm94eSAmJlxuICAgIHR5cGVvZiBQcm94eSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgUmVmbGVjdCAhPT0gJ3VuZGVmaW5lZCc7XG59O1xuIiwiLyohXG4gKiBDaGFpIC0gZmxhZyB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyohXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cblxudmFyIGluc3BlY3QgPSByZXF1aXJlKCcuL2luc3BlY3QnKTtcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcblxuLyoqXG4gKiAjIyMgLm9iakRpc3BsYXkob2JqZWN0KVxuICpcbiAqIERldGVybWluZXMgaWYgYW4gb2JqZWN0IG9yIGFuIGFycmF5IG1hdGNoZXNcbiAqIGNyaXRlcmlhIHRvIGJlIGluc3BlY3RlZCBpbi1saW5lIGZvciBlcnJvclxuICogbWVzc2FnZXMgb3Igc2hvdWxkIGJlIHRydW5jYXRlZC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBqYXZhc2NyaXB0IG9iamVjdCB0byBpbnNwZWN0XG4gKiBAbmFtZSBvYmpEaXNwbGF5XG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb2JqRGlzcGxheShvYmopIHtcbiAgdmFyIHN0ciA9IGluc3BlY3Qob2JqKVxuICAgICwgdHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopO1xuXG4gIGlmIChjb25maWcudHJ1bmNhdGVUaHJlc2hvbGQgJiYgc3RyLmxlbmd0aCA+PSBjb25maWcudHJ1bmNhdGVUaHJlc2hvbGQpIHtcbiAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJykge1xuICAgICAgcmV0dXJuICFvYmoubmFtZSB8fCBvYmoubmFtZSA9PT0gJydcbiAgICAgICAgPyAnW0Z1bmN0aW9uXSdcbiAgICAgICAgOiAnW0Z1bmN0aW9uOiAnICsgb2JqLm5hbWUgKyAnXSc7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICByZXR1cm4gJ1sgQXJyYXkoJyArIG9iai5sZW5ndGggKyAnKSBdJztcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iailcbiAgICAgICAgLCBrc3RyID0ga2V5cy5sZW5ndGggPiAyXG4gICAgICAgICAgPyBrZXlzLnNwbGljZSgwLCAyKS5qb2luKCcsICcpICsgJywgLi4uJ1xuICAgICAgICAgIDoga2V5cy5qb2luKCcsICcpO1xuICAgICAgcmV0dXJuICd7IE9iamVjdCAoJyArIGtzdHIgKyAnKSB9JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufTtcbiIsIi8qIVxuICogQ2hhaSAtIG92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxudmFyIGNoYWkgPSByZXF1aXJlKCcuLi8uLi9jaGFpJyk7XG52YXIgdHJhbnNmZXJGbGFncyA9IHJlcXVpcmUoJy4vdHJhbnNmZXJGbGFncycpO1xuXG4vKipcbiAqICMjIyAub3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kKGN0eCwgbmFtZSwgbWV0aG9kLCBjaGFpbmluZ0JlaGF2aW9yKVxuICpcbiAqIE92ZXJ3cml0ZXMgYW4gYWxyZWFkeSBleGlzdGluZyBjaGFpbmFibGUgbWV0aG9kXG4gKiBhbmQgcHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBwcmV2aW91cyBmdW5jdGlvbiBvclxuICogcHJvcGVydHkuICBNdXN0IHJldHVybiBmdW5jdGlvbnMgdG8gYmUgdXNlZCBmb3JcbiAqIG5hbWUuXG4gKlxuICogICAgIHV0aWxzLm92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZChjaGFpLkFzc2VydGlvbi5wcm90b3R5cGUsICdsZW5ndGhPZicsXG4gKiAgICAgICBmdW5jdGlvbiAoX3N1cGVyKSB7XG4gKiAgICAgICB9XG4gKiAgICAgLCBmdW5jdGlvbiAoX3N1cGVyKSB7XG4gKiAgICAgICB9XG4gKiAgICAgKTtcbiAqXG4gKiBDYW4gYWxzbyBiZSBhY2Nlc3NlZCBkaXJlY3RseSBmcm9tIGBjaGFpLkFzc2VydGlvbmAuXG4gKlxuICogICAgIGNoYWkuQXNzZXJ0aW9uLm92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZCgnZm9vJywgZm4sIGZuKTtcbiAqXG4gKiBUaGVuIGNhbiBiZSB1c2VkIGFzIGFueSBvdGhlciBhc3NlcnRpb24uXG4gKlxuICogICAgIGV4cGVjdChteUZvbykudG8uaGF2ZS5sZW5ndGhPZigzKTtcbiAqICAgICBleHBlY3QobXlGb28pLnRvLmhhdmUubGVuZ3RoT2YuYWJvdmUoMyk7XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBvYmplY3Qgd2hvc2UgbWV0aG9kIC8gcHJvcGVydHkgaXMgdG8gYmUgb3ZlcndyaXR0ZW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG9mIG1ldGhvZCAvIHByb3BlcnR5IHRvIG92ZXJ3cml0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGZ1bmN0aW9uIHRvIGJlIHVzZWQgZm9yIG5hbWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNoYWluaW5nQmVoYXZpb3IgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgZnVuY3Rpb24gdG8gYmUgdXNlZCBmb3IgcHJvcGVydHlcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIG92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZChjdHgsIG5hbWUsIG1ldGhvZCwgY2hhaW5pbmdCZWhhdmlvcikge1xuICB2YXIgY2hhaW5hYmxlQmVoYXZpb3IgPSBjdHguX19tZXRob2RzW25hbWVdO1xuXG4gIHZhciBfY2hhaW5pbmdCZWhhdmlvciA9IGNoYWluYWJsZUJlaGF2aW9yLmNoYWluaW5nQmVoYXZpb3I7XG4gIGNoYWluYWJsZUJlaGF2aW9yLmNoYWluaW5nQmVoYXZpb3IgPSBmdW5jdGlvbiBvdmVyd3JpdGluZ0NoYWluYWJsZU1ldGhvZEdldHRlcigpIHtcbiAgICB2YXIgcmVzdWx0ID0gY2hhaW5pbmdCZWhhdmlvcihfY2hhaW5pbmdCZWhhdmlvcikuY2FsbCh0aGlzKTtcbiAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdmFyIG5ld0Fzc2VydGlvbiA9IG5ldyBjaGFpLkFzc2VydGlvbigpO1xuICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgbmV3QXNzZXJ0aW9uKTtcbiAgICByZXR1cm4gbmV3QXNzZXJ0aW9uO1xuICB9O1xuXG4gIHZhciBfbWV0aG9kID0gY2hhaW5hYmxlQmVoYXZpb3IubWV0aG9kO1xuICBjaGFpbmFibGVCZWhhdmlvci5tZXRob2QgPSBmdW5jdGlvbiBvdmVyd3JpdGluZ0NoYWluYWJsZU1ldGhvZFdyYXBwZXIoKSB7XG4gICAgdmFyIHJlc3VsdCA9IG1ldGhvZChfbWV0aG9kKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB2YXIgbmV3QXNzZXJ0aW9uID0gbmV3IGNoYWkuQXNzZXJ0aW9uKCk7XG4gICAgdHJhbnNmZXJGbGFncyh0aGlzLCBuZXdBc3NlcnRpb24pO1xuICAgIHJldHVybiBuZXdBc3NlcnRpb247XG4gIH07XG59O1xuIiwiLyohXG4gKiBDaGFpIC0gb3ZlcndyaXRlTWV0aG9kIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG52YXIgYWRkTGVuZ3RoR3VhcmQgPSByZXF1aXJlKCcuL2FkZExlbmd0aEd1YXJkJyk7XG52YXIgY2hhaSA9IHJlcXVpcmUoJy4uLy4uL2NoYWknKTtcbnZhciBmbGFnID0gcmVxdWlyZSgnLi9mbGFnJyk7XG52YXIgcHJveGlmeSA9IHJlcXVpcmUoJy4vcHJveGlmeScpO1xudmFyIHRyYW5zZmVyRmxhZ3MgPSByZXF1aXJlKCcuL3RyYW5zZmVyRmxhZ3MnKTtcblxuLyoqXG4gKiAjIyMgLm92ZXJ3cml0ZU1ldGhvZChjdHgsIG5hbWUsIGZuKVxuICpcbiAqIE92ZXJ3cml0ZXMgYW4gYWxyZWFkeSBleGlzdGluZyBtZXRob2QgYW5kIHByb3ZpZGVzXG4gKiBhY2Nlc3MgdG8gcHJldmlvdXMgZnVuY3Rpb24uIE11c3QgcmV0dXJuIGZ1bmN0aW9uXG4gKiB0byBiZSB1c2VkIGZvciBuYW1lLlxuICpcbiAqICAgICB1dGlscy5vdmVyd3JpdGVNZXRob2QoY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLCAnZXF1YWwnLCBmdW5jdGlvbiAoX3N1cGVyKSB7XG4gKiAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0cikge1xuICogICAgICAgICB2YXIgb2JqID0gdXRpbHMuZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gKiAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBGb28pIHtcbiAqICAgICAgICAgICBuZXcgY2hhaS5Bc3NlcnRpb24ob2JqLnZhbHVlKS50by5lcXVhbChzdHIpO1xuICogICAgICAgICB9IGVsc2Uge1xuICogICAgICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICogICAgICAgICB9XG4gKiAgICAgICB9XG4gKiAgICAgfSk7XG4gKlxuICogQ2FuIGFsc28gYmUgYWNjZXNzZWQgZGlyZWN0bHkgZnJvbSBgY2hhaS5Bc3NlcnRpb25gLlxuICpcbiAqICAgICBjaGFpLkFzc2VydGlvbi5vdmVyd3JpdGVNZXRob2QoJ2ZvbycsIGZuKTtcbiAqXG4gKiBUaGVuIGNhbiBiZSB1c2VkIGFzIGFueSBvdGhlciBhc3NlcnRpb24uXG4gKlxuICogICAgIGV4cGVjdChteUZvbykudG8uZXF1YWwoJ2JhcicpO1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHggb2JqZWN0IHdob3NlIG1ldGhvZCBpcyB0byBiZSBvdmVyd3JpdHRlblxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgb2YgbWV0aG9kIHRvIG92ZXJ3cml0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGZ1bmN0aW9uIHRvIGJlIHVzZWQgZm9yIG5hbWVcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIG92ZXJ3cml0ZU1ldGhvZFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG92ZXJ3cml0ZU1ldGhvZChjdHgsIG5hbWUsIG1ldGhvZCkge1xuICB2YXIgX21ldGhvZCA9IGN0eFtuYW1lXVxuICAgICwgX3N1cGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG5hbWUgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgfTtcblxuICBpZiAoX21ldGhvZCAmJiAnZnVuY3Rpb24nID09PSB0eXBlb2YgX21ldGhvZClcbiAgICBfc3VwZXIgPSBfbWV0aG9kO1xuXG4gIHZhciBvdmVyd3JpdGluZ01ldGhvZFdyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gU2V0dGluZyB0aGUgYHNzZmlgIGZsYWcgdG8gYG92ZXJ3cml0aW5nTWV0aG9kV3JhcHBlcmAgY2F1c2VzIHRoaXNcbiAgICAvLyBmdW5jdGlvbiB0byBiZSB0aGUgc3RhcnRpbmcgcG9pbnQgZm9yIHJlbW92aW5nIGltcGxlbWVudGF0aW9uIGZyYW1lcyBmcm9tXG4gICAgLy8gdGhlIHN0YWNrIHRyYWNlIG9mIGEgZmFpbGVkIGFzc2VydGlvbi5cbiAgICAvL1xuICAgIC8vIEhvd2V2ZXIsIHdlIG9ubHkgd2FudCB0byB1c2UgdGhpcyBmdW5jdGlvbiBhcyB0aGUgc3RhcnRpbmcgcG9pbnQgaWYgdGhlXG4gICAgLy8gYGxvY2tTc2ZpYCBmbGFnIGlzbid0IHNldC5cbiAgICAvL1xuICAgIC8vIElmIHRoZSBgbG9ja1NzZmlgIGZsYWcgaXMgc2V0LCB0aGVuIGVpdGhlciB0aGlzIGFzc2VydGlvbiBoYXMgYmVlblxuICAgIC8vIG92ZXJ3cml0dGVuIGJ5IGFub3RoZXIgYXNzZXJ0aW9uLCBvciB0aGlzIGFzc2VydGlvbiBpcyBiZWluZyBpbnZva2VkIGZyb21cbiAgICAvLyBpbnNpZGUgb2YgYW5vdGhlciBhc3NlcnRpb24uIEluIHRoZSBmaXJzdCBjYXNlLCB0aGUgYHNzZmlgIGZsYWcgaGFzXG4gICAgLy8gYWxyZWFkeSBiZWVuIHNldCBieSB0aGUgb3ZlcndyaXRpbmcgYXNzZXJ0aW9uLiBJbiB0aGUgc2Vjb25kIGNhc2UsIHRoZVxuICAgIC8vIGBzc2ZpYCBmbGFnIGhhcyBhbHJlYWR5IGJlZW4gc2V0IGJ5IHRoZSBvdXRlciBhc3NlcnRpb24uXG4gICAgaWYgKCFmbGFnKHRoaXMsICdsb2NrU3NmaScpKSB7XG4gICAgICBmbGFnKHRoaXMsICdzc2ZpJywgb3ZlcndyaXRpbmdNZXRob2RXcmFwcGVyKTtcbiAgICB9XG5cbiAgICAvLyBTZXR0aW5nIHRoZSBgbG9ja1NzZmlgIGZsYWcgdG8gYHRydWVgIHByZXZlbnRzIHRoZSBvdmVyd3JpdHRlbiBhc3NlcnRpb25cbiAgICAvLyBmcm9tIGNoYW5naW5nIHRoZSBgc3NmaWAgZmxhZy4gQnkgdGhpcyBwb2ludCwgdGhlIGBzc2ZpYCBmbGFnIGlzIGFscmVhZHlcbiAgICAvLyBzZXQgdG8gdGhlIGNvcnJlY3Qgc3RhcnRpbmcgcG9pbnQgZm9yIHRoaXMgYXNzZXJ0aW9uLlxuICAgIHZhciBvcmlnTG9ja1NzZmkgPSBmbGFnKHRoaXMsICdsb2NrU3NmaScpO1xuICAgIGZsYWcodGhpcywgJ2xvY2tTc2ZpJywgdHJ1ZSk7XG4gICAgdmFyIHJlc3VsdCA9IG1ldGhvZChfc3VwZXIpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgZmxhZyh0aGlzLCAnbG9ja1NzZmknLCBvcmlnTG9ja1NzZmkpO1xuXG4gICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHZhciBuZXdBc3NlcnRpb24gPSBuZXcgY2hhaS5Bc3NlcnRpb24oKTtcbiAgICB0cmFuc2ZlckZsYWdzKHRoaXMsIG5ld0Fzc2VydGlvbik7XG4gICAgcmV0dXJuIG5ld0Fzc2VydGlvbjtcbiAgfVxuXG4gIGFkZExlbmd0aEd1YXJkKG92ZXJ3cml0aW5nTWV0aG9kV3JhcHBlciwgbmFtZSwgZmFsc2UpO1xuICBjdHhbbmFtZV0gPSBwcm94aWZ5KG92ZXJ3cml0aW5nTWV0aG9kV3JhcHBlciwgbmFtZSk7XG59O1xuIiwiLyohXG4gKiBDaGFpIC0gb3ZlcndyaXRlUHJvcGVydHkgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbnZhciBjaGFpID0gcmVxdWlyZSgnLi4vLi4vY2hhaScpO1xudmFyIGZsYWcgPSByZXF1aXJlKCcuL2ZsYWcnKTtcbnZhciBpc1Byb3h5RW5hYmxlZCA9IHJlcXVpcmUoJy4vaXNQcm94eUVuYWJsZWQnKTtcbnZhciB0cmFuc2ZlckZsYWdzID0gcmVxdWlyZSgnLi90cmFuc2ZlckZsYWdzJyk7XG5cbi8qKlxuICogIyMjIC5vdmVyd3JpdGVQcm9wZXJ0eShjdHgsIG5hbWUsIGZuKVxuICpcbiAqIE92ZXJ3cml0ZXMgYW4gYWxyZWFkeSBleGlzdGluZyBwcm9wZXJ0eSBnZXR0ZXIgYW5kIHByb3ZpZGVzXG4gKiBhY2Nlc3MgdG8gcHJldmlvdXMgdmFsdWUuIE11c3QgcmV0dXJuIGZ1bmN0aW9uIHRvIHVzZSBhcyBnZXR0ZXIuXG4gKlxuICogICAgIHV0aWxzLm92ZXJ3cml0ZVByb3BlcnR5KGNoYWkuQXNzZXJ0aW9uLnByb3RvdHlwZSwgJ29rJywgZnVuY3Rpb24gKF9zdXBlcikge1xuICogICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAqICAgICAgICAgdmFyIG9iaiA9IHV0aWxzLmZsYWcodGhpcywgJ29iamVjdCcpO1xuICogICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgRm9vKSB7XG4gKiAgICAgICAgICAgbmV3IGNoYWkuQXNzZXJ0aW9uKG9iai5uYW1lKS50by5lcXVhbCgnYmFyJyk7XG4gKiAgICAgICAgIH0gZWxzZSB7XG4gKiAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gKiAgICAgICAgIH1cbiAqICAgICAgIH1cbiAqICAgICB9KTtcbiAqXG4gKlxuICogQ2FuIGFsc28gYmUgYWNjZXNzZWQgZGlyZWN0bHkgZnJvbSBgY2hhaS5Bc3NlcnRpb25gLlxuICpcbiAqICAgICBjaGFpLkFzc2VydGlvbi5vdmVyd3JpdGVQcm9wZXJ0eSgnZm9vJywgZm4pO1xuICpcbiAqIFRoZW4gY2FuIGJlIHVzZWQgYXMgYW55IG90aGVyIGFzc2VydGlvbi5cbiAqXG4gKiAgICAgZXhwZWN0KG15Rm9vKS50by5iZS5vaztcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4IG9iamVjdCB3aG9zZSBwcm9wZXJ0eSBpcyB0byBiZSBvdmVyd3JpdHRlblxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgb2YgcHJvcGVydHkgdG8gb3ZlcndyaXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBnZXR0ZXIgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgZ2V0dGVyIGZ1bmN0aW9uIHRvIGJlIHVzZWQgZm9yIG5hbWVcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIG92ZXJ3cml0ZVByb3BlcnR5XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb3ZlcndyaXRlUHJvcGVydHkoY3R4LCBuYW1lLCBnZXR0ZXIpIHtcbiAgdmFyIF9nZXQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGN0eCwgbmFtZSlcbiAgICAsIF9zdXBlciA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gIGlmIChfZ2V0ICYmICdmdW5jdGlvbicgPT09IHR5cGVvZiBfZ2V0LmdldClcbiAgICBfc3VwZXIgPSBfZ2V0LmdldFxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdHgsIG5hbWUsXG4gICAgeyBnZXQ6IGZ1bmN0aW9uIG92ZXJ3cml0aW5nUHJvcGVydHlHZXR0ZXIoKSB7XG4gICAgICAgIC8vIFNldHRpbmcgdGhlIGBzc2ZpYCBmbGFnIHRvIGBvdmVyd3JpdGluZ1Byb3BlcnR5R2V0dGVyYCBjYXVzZXMgdGhpc1xuICAgICAgICAvLyBmdW5jdGlvbiB0byBiZSB0aGUgc3RhcnRpbmcgcG9pbnQgZm9yIHJlbW92aW5nIGltcGxlbWVudGF0aW9uIGZyYW1lc1xuICAgICAgICAvLyBmcm9tIHRoZSBzdGFjayB0cmFjZSBvZiBhIGZhaWxlZCBhc3NlcnRpb24uXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEhvd2V2ZXIsIHdlIG9ubHkgd2FudCB0byB1c2UgdGhpcyBmdW5jdGlvbiBhcyB0aGUgc3RhcnRpbmcgcG9pbnQgaWZcbiAgICAgICAgLy8gdGhlIGBsb2NrU3NmaWAgZmxhZyBpc24ndCBzZXQgYW5kIHByb3h5IHByb3RlY3Rpb24gaXMgZGlzYWJsZWQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIElmIHRoZSBgbG9ja1NzZmlgIGZsYWcgaXMgc2V0LCB0aGVuIGVpdGhlciB0aGlzIGFzc2VydGlvbiBoYXMgYmVlblxuICAgICAgICAvLyBvdmVyd3JpdHRlbiBieSBhbm90aGVyIGFzc2VydGlvbiwgb3IgdGhpcyBhc3NlcnRpb24gaXMgYmVpbmcgaW52b2tlZFxuICAgICAgICAvLyBmcm9tIGluc2lkZSBvZiBhbm90aGVyIGFzc2VydGlvbi4gSW4gdGhlIGZpcnN0IGNhc2UsIHRoZSBgc3NmaWAgZmxhZ1xuICAgICAgICAvLyBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSB0aGUgb3ZlcndyaXRpbmcgYXNzZXJ0aW9uLiBJbiB0aGUgc2Vjb25kXG4gICAgICAgIC8vIGNhc2UsIHRoZSBgc3NmaWAgZmxhZyBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSB0aGUgb3V0ZXIgYXNzZXJ0aW9uLlxuICAgICAgICAvL1xuICAgICAgICAvLyBJZiBwcm94eSBwcm90ZWN0aW9uIGlzIGVuYWJsZWQsIHRoZW4gdGhlIGBzc2ZpYCBmbGFnIGhhcyBhbHJlYWR5IGJlZW5cbiAgICAgICAgLy8gc2V0IGJ5IHRoZSBwcm94eSBnZXR0ZXIuXG4gICAgICAgIGlmICghaXNQcm94eUVuYWJsZWQoKSAmJiAhZmxhZyh0aGlzLCAnbG9ja1NzZmknKSkge1xuICAgICAgICAgIGZsYWcodGhpcywgJ3NzZmknLCBvdmVyd3JpdGluZ1Byb3BlcnR5R2V0dGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldHRpbmcgdGhlIGBsb2NrU3NmaWAgZmxhZyB0byBgdHJ1ZWAgcHJldmVudHMgdGhlIG92ZXJ3cml0dGVuXG4gICAgICAgIC8vIGFzc2VydGlvbiBmcm9tIGNoYW5naW5nIHRoZSBgc3NmaWAgZmxhZy4gQnkgdGhpcyBwb2ludCwgdGhlIGBzc2ZpYFxuICAgICAgICAvLyBmbGFnIGlzIGFscmVhZHkgc2V0IHRvIHRoZSBjb3JyZWN0IHN0YXJ0aW5nIHBvaW50IGZvciB0aGlzIGFzc2VydGlvbi5cbiAgICAgICAgdmFyIG9yaWdMb2NrU3NmaSA9IGZsYWcodGhpcywgJ2xvY2tTc2ZpJyk7XG4gICAgICAgIGZsYWcodGhpcywgJ2xvY2tTc2ZpJywgdHJ1ZSk7XG4gICAgICAgIHZhciByZXN1bHQgPSBnZXR0ZXIoX3N1cGVyKS5jYWxsKHRoaXMpO1xuICAgICAgICBmbGFnKHRoaXMsICdsb2NrU3NmaScsIG9yaWdMb2NrU3NmaSk7XG5cbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXdBc3NlcnRpb24gPSBuZXcgY2hhaS5Bc3NlcnRpb24oKTtcbiAgICAgICAgdHJhbnNmZXJGbGFncyh0aGlzLCBuZXdBc3NlcnRpb24pO1xuICAgICAgICByZXR1cm4gbmV3QXNzZXJ0aW9uO1xuICAgICAgfVxuICAgICwgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufTtcbiIsInZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcbnZhciBmbGFnID0gcmVxdWlyZSgnLi9mbGFnJyk7XG52YXIgZ2V0UHJvcGVydGllcyA9IHJlcXVpcmUoJy4vZ2V0UHJvcGVydGllcycpO1xudmFyIGlzUHJveHlFbmFibGVkID0gcmVxdWlyZSgnLi9pc1Byb3h5RW5hYmxlZCcpO1xuXG4vKiFcbiAqIENoYWkgLSBwcm94aWZ5IHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAucHJveGlmeShvYmplY3QpXG4gKlxuICogUmV0dXJuIGEgcHJveHkgb2YgZ2l2ZW4gb2JqZWN0IHRoYXQgdGhyb3dzIGFuIGVycm9yIHdoZW4gYSBub24tZXhpc3RlbnRcbiAqIHByb3BlcnR5IGlzIHJlYWQuIEJ5IGRlZmF1bHQsIHRoZSByb290IGNhdXNlIGlzIGFzc3VtZWQgdG8gYmUgYSBtaXNzcGVsbGVkXG4gKiBwcm9wZXJ0eSwgYW5kIHRodXMgYW4gYXR0ZW1wdCBpcyBtYWRlIHRvIG9mZmVyIGEgcmVhc29uYWJsZSBzdWdnZXN0aW9uIGZyb21cbiAqIHRoZSBsaXN0IG9mIGV4aXN0aW5nIHByb3BlcnRpZXMuIEhvd2V2ZXIsIGlmIGEgbm9uQ2hhaW5hYmxlTWV0aG9kTmFtZSBpc1xuICogcHJvdmlkZWQsIHRoZW4gdGhlIHJvb3QgY2F1c2UgaXMgaW5zdGVhZCBhIGZhaWx1cmUgdG8gaW52b2tlIGEgbm9uLWNoYWluYWJsZVxuICogbWV0aG9kIHByaW9yIHRvIHJlYWRpbmcgdGhlIG5vbi1leGlzdGVudCBwcm9wZXJ0eS5cbiAqXG4gKiBJZiBwcm94aWVzIGFyZSB1bnN1cHBvcnRlZCBvciBkaXNhYmxlZCB2aWEgdGhlIHVzZXIncyBDaGFpIGNvbmZpZywgdGhlblxuICogcmV0dXJuIG9iamVjdCB3aXRob3V0IG1vZGlmaWNhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30gbm9uQ2hhaW5hYmxlTWV0aG9kTmFtZVxuICogQG5hbWVzcGFjZSBVdGlsc1xuICogQG5hbWUgcHJveGlmeVxuICovXG5cbnZhciBidWlsdGlucyA9IFsnX19mbGFncycsICdfX21ldGhvZHMnLCAnX29iaicsICdhc3NlcnQnXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwcm94aWZ5KG9iaiwgbm9uQ2hhaW5hYmxlTWV0aG9kTmFtZSkge1xuICBpZiAoIWlzUHJveHlFbmFibGVkKCkpIHJldHVybiBvYmo7XG5cbiAgcmV0dXJuIG5ldyBQcm94eShvYmosIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIHByb3h5R2V0dGVyKHRhcmdldCwgcHJvcGVydHkpIHtcbiAgICAgIC8vIFRoaXMgY2hlY2sgaXMgaGVyZSBiZWNhdXNlIHdlIHNob3VsZCBub3QgdGhyb3cgZXJyb3JzIG9uIFN5bWJvbCBwcm9wZXJ0aWVzXG4gICAgICAvLyBzdWNoIGFzIGBTeW1ib2wudG9TdHJpbmdUYWdgLlxuICAgICAgLy8gVGhlIHZhbHVlcyBmb3Igd2hpY2ggYW4gZXJyb3Igc2hvdWxkIGJlIHRocm93biBjYW4gYmUgY29uZmlndXJlZCB1c2luZ1xuICAgICAgLy8gdGhlIGBjb25maWcucHJveHlFeGNsdWRlZEtleXNgIHNldHRpbmcuXG4gICAgICBpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgIGNvbmZpZy5wcm94eUV4Y2x1ZGVkS2V5cy5pbmRleE9mKHByb3BlcnR5KSA9PT0gLTEgJiZcbiAgICAgICAgICAhUmVmbGVjdC5oYXModGFyZ2V0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgLy8gU3BlY2lhbCBtZXNzYWdlIGZvciBpbnZhbGlkIHByb3BlcnR5IGFjY2VzcyBvZiBub24tY2hhaW5hYmxlIG1ldGhvZHMuXG4gICAgICAgIGlmIChub25DaGFpbmFibGVNZXRob2ROYW1lKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgQ2hhaSBwcm9wZXJ0eTogJyArIG5vbkNoYWluYWJsZU1ldGhvZE5hbWUgKyAnLicgK1xuICAgICAgICAgICAgcHJvcGVydHkgKyAnLiBTZWUgZG9jcyBmb3IgcHJvcGVyIHVzYWdlIG9mIFwiJyArXG4gICAgICAgICAgICBub25DaGFpbmFibGVNZXRob2ROYW1lICsgJ1wiLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIHByb3BlcnR5IGlzIHJlYXNvbmFibHkgY2xvc2UgdG8gYW4gZXhpc3RpbmcgQ2hhaSBwcm9wZXJ0eSxcbiAgICAgICAgLy8gc3VnZ2VzdCB0aGF0IHByb3BlcnR5IHRvIHRoZSB1c2VyLiBPbmx5IHN1Z2dlc3QgcHJvcGVydGllcyB3aXRoIGFcbiAgICAgICAgLy8gZGlzdGFuY2UgbGVzcyB0aGFuIDQuXG4gICAgICAgIHZhciBzdWdnZXN0aW9uID0gbnVsbDtcbiAgICAgICAgdmFyIHN1Z2dlc3Rpb25EaXN0YW5jZSA9IDQ7XG4gICAgICAgIGdldFByb3BlcnRpZXModGFyZ2V0KS5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJlxuICAgICAgICAgICAgYnVpbHRpbnMuaW5kZXhPZihwcm9wKSA9PT0gLTFcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHZhciBkaXN0ID0gc3RyaW5nRGlzdGFuY2VDYXBwZWQoXG4gICAgICAgICAgICAgIHByb3BlcnR5LFxuICAgICAgICAgICAgICBwcm9wLFxuICAgICAgICAgICAgICBzdWdnZXN0aW9uRGlzdGFuY2VcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoZGlzdCA8IHN1Z2dlc3Rpb25EaXN0YW5jZSkge1xuICAgICAgICAgICAgICBzdWdnZXN0aW9uID0gcHJvcDtcbiAgICAgICAgICAgICAgc3VnZ2VzdGlvbkRpc3RhbmNlID0gZGlzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzdWdnZXN0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgQ2hhaSBwcm9wZXJ0eTogJyArIHByb3BlcnR5ICtcbiAgICAgICAgICAgICcuIERpZCB5b3UgbWVhbiBcIicgKyBzdWdnZXN0aW9uICsgJ1wiPycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIENoYWkgcHJvcGVydHk6ICcgKyBwcm9wZXJ0eSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVXNlIHRoaXMgcHJveHkgZ2V0dGVyIGFzIHRoZSBzdGFydGluZyBwb2ludCBmb3IgcmVtb3ZpbmcgaW1wbGVtZW50YXRpb25cbiAgICAgIC8vIGZyYW1lcyBmcm9tIHRoZSBzdGFjayB0cmFjZSBvZiBhIGZhaWxlZCBhc3NlcnRpb24uIEZvciBwcm9wZXJ0eVxuICAgICAgLy8gYXNzZXJ0aW9ucywgdGhpcyBwcmV2ZW50cyB0aGUgcHJveHkgZ2V0dGVyIGZyb20gc2hvd2luZyB1cCBpbiB0aGUgc3RhY2tcbiAgICAgIC8vIHRyYWNlIHNpbmNlIGl0J3MgaW52b2tlZCBiZWZvcmUgdGhlIHByb3BlcnR5IGdldHRlci4gRm9yIG1ldGhvZCBhbmRcbiAgICAgIC8vIGNoYWluYWJsZSBtZXRob2QgYXNzZXJ0aW9ucywgdGhpcyBmbGFnIHdpbGwgZW5kIHVwIGdldHRpbmcgY2hhbmdlZCB0b1xuICAgICAgLy8gdGhlIG1ldGhvZCB3cmFwcGVyLCB3aGljaCBpcyBnb29kIHNpbmNlIHRoaXMgZnJhbWUgd2lsbCBubyBsb25nZXIgYmUgaW5cbiAgICAgIC8vIHRoZSBzdGFjayBvbmNlIHRoZSBtZXRob2QgaXMgaW52b2tlZC4gTm90ZSB0aGF0IENoYWkgYnVpbHRpbiBhc3NlcnRpb25cbiAgICAgIC8vIHByb3BlcnRpZXMgc3VjaCBhcyBgX19mbGFnc2AgYXJlIHNraXBwZWQgc2luY2UgdGhpcyBpcyBvbmx5IG1lYW50IHRvXG4gICAgICAvLyBjYXB0dXJlIHRoZSBzdGFydGluZyBwb2ludCBvZiBhbiBhc3NlcnRpb24uIFRoaXMgc3RlcCBpcyBhbHNvIHNraXBwZWRcbiAgICAgIC8vIGlmIHRoZSBgbG9ja1NzZmlgIGZsYWcgaXMgc2V0LCB0aHVzIGluZGljYXRpbmcgdGhhdCB0aGlzIGFzc2VydGlvbiBpc1xuICAgICAgLy8gYmVpbmcgY2FsbGVkIGZyb20gd2l0aGluIGFub3RoZXIgYXNzZXJ0aW9uLiBJbiB0aGF0IGNhc2UsIHRoZSBgc3NmaWBcbiAgICAgIC8vIGZsYWcgaXMgYWxyZWFkeSBzZXQgdG8gdGhlIG91dGVyIGFzc2VydGlvbidzIHN0YXJ0aW5nIHBvaW50LlxuICAgICAgaWYgKGJ1aWx0aW5zLmluZGV4T2YocHJvcGVydHkpID09PSAtMSAmJiAhZmxhZyh0YXJnZXQsICdsb2NrU3NmaScpKSB7XG4gICAgICAgIGZsYWcodGFyZ2V0LCAnc3NmaScsIHByb3h5R2V0dGVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHkpO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqICMgc3RyaW5nRGlzdGFuY2VDYXBwZWQoc3RyQSwgc3RyQiwgY2FwKVxuICogUmV0dXJuIHRoZSBMZXZlbnNodGVpbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byBzdHJpbmdzLCBidXQgbm8gbW9yZSB0aGFuIGNhcC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJBXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyQlxuICogQHBhcmFtIHtudW1iZXJ9IG51bWJlclxuICogQHJldHVybiB7bnVtYmVyfSBtaW4oc3RyaW5nIGRpc3RhbmNlIGJldHdlZW4gc3RyQSBhbmQgc3RyQiwgY2FwKVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc3RyaW5nRGlzdGFuY2VDYXBwZWQoc3RyQSwgc3RyQiwgY2FwKSB7XG4gIGlmIChNYXRoLmFicyhzdHJBLmxlbmd0aCAtIHN0ckIubGVuZ3RoKSA+PSBjYXApIHtcbiAgICByZXR1cm4gY2FwO1xuICB9XG5cbiAgdmFyIG1lbW8gPSBbXTtcbiAgLy8gYG1lbW9gIGlzIGEgdHdvLWRpbWVuc2lvbmFsIGFycmF5IGNvbnRhaW5pbmcgZGlzdGFuY2VzLlxuICAvLyBtZW1vW2ldW2pdIGlzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHN0ckEuc2xpY2UoMCwgaSkgYW5kXG4gIC8vIHN0ckIuc2xpY2UoMCwgaikuXG4gIGZvciAodmFyIGkgPSAwOyBpIDw9IHN0ckEubGVuZ3RoOyBpKyspIHtcbiAgICBtZW1vW2ldID0gQXJyYXkoc3RyQi5sZW5ndGggKyAxKS5maWxsKDApO1xuICAgIG1lbW9baV1bMF0gPSBpO1xuICB9XG4gIGZvciAodmFyIGogPSAwOyBqIDwgc3RyQi5sZW5ndGg7IGorKykge1xuICAgIG1lbW9bMF1bal0gPSBqO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPD0gc3RyQS5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjaCA9IHN0ckEuY2hhckNvZGVBdChpIC0gMSk7XG4gICAgZm9yICh2YXIgaiA9IDE7IGogPD0gc3RyQi5sZW5ndGg7IGorKykge1xuICAgICAgaWYgKE1hdGguYWJzKGkgLSBqKSA+PSBjYXApIHtcbiAgICAgICAgbWVtb1tpXVtqXSA9IGNhcDtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBtZW1vW2ldW2pdID0gTWF0aC5taW4oXG4gICAgICAgIG1lbW9baSAtIDFdW2pdICsgMSxcbiAgICAgICAgbWVtb1tpXVtqIC0gMV0gKyAxLFxuICAgICAgICBtZW1vW2kgLSAxXVtqIC0gMV0gK1xuICAgICAgICAgIChjaCA9PT0gc3RyQi5jaGFyQ29kZUF0KGogLSAxKSA/IDAgOiAxKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWVtb1tzdHJBLmxlbmd0aF1bc3RyQi5sZW5ndGhdO1xufVxuIiwiLyohXG4gKiBDaGFpIC0gdGVzdCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyohXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cblxudmFyIGZsYWcgPSByZXF1aXJlKCcuL2ZsYWcnKTtcblxuLyoqXG4gKiAjIyMgLnRlc3Qob2JqZWN0LCBleHByZXNzaW9uKVxuICpcbiAqIFRlc3QgYW5kIG9iamVjdCBmb3IgZXhwcmVzc2lvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IChjb25zdHJ1Y3RlZCBBc3NlcnRpb24pXG4gKiBAcGFyYW0ge0FyZ3VtZW50c30gY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLmFzc2VydCBhcmd1bWVudHNcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIHRlc3RcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlc3Qob2JqLCBhcmdzKSB7XG4gIHZhciBuZWdhdGUgPSBmbGFnKG9iaiwgJ25lZ2F0ZScpXG4gICAgLCBleHByID0gYXJnc1swXTtcbiAgcmV0dXJuIG5lZ2F0ZSA/ICFleHByIDogZXhwcjtcbn07XG4iLCIvKiFcbiAqIENoYWkgLSB0cmFuc2ZlckZsYWdzIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAudHJhbnNmZXJGbGFncyhhc3NlcnRpb24sIG9iamVjdCwgaW5jbHVkZUFsbCA9IHRydWUpXG4gKlxuICogVHJhbnNmZXIgYWxsIHRoZSBmbGFncyBmb3IgYGFzc2VydGlvbmAgdG8gYG9iamVjdGAuIElmXG4gKiBgaW5jbHVkZUFsbGAgaXMgc2V0IHRvIGBmYWxzZWAsIHRoZW4gdGhlIGJhc2UgQ2hhaVxuICogYXNzZXJ0aW9uIGZsYWdzIChuYW1lbHkgYG9iamVjdGAsIGBzc2ZpYCwgYGxvY2tTc2ZpYCxcbiAqIGFuZCBgbWVzc2FnZWApIHdpbGwgbm90IGJlIHRyYW5zZmVycmVkLlxuICpcbiAqXG4gKiAgICAgdmFyIG5ld0Fzc2VydGlvbiA9IG5ldyBBc3NlcnRpb24oKTtcbiAqICAgICB1dGlscy50cmFuc2ZlckZsYWdzKGFzc2VydGlvbiwgbmV3QXNzZXJ0aW9uKTtcbiAqXG4gKiAgICAgdmFyIGFub3RoZXJBc3NlcnRpb24gPSBuZXcgQXNzZXJ0aW9uKG15T2JqKTtcbiAqICAgICB1dGlscy50cmFuc2ZlckZsYWdzKGFzc2VydGlvbiwgYW5vdGhlckFzc2VydGlvbiwgZmFsc2UpO1xuICpcbiAqIEBwYXJhbSB7QXNzZXJ0aW9ufSBhc3NlcnRpb24gdGhlIGFzc2VydGlvbiB0byB0cmFuc2ZlciB0aGUgZmxhZ3MgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCB0aGUgb2JqZWN0IHRvIHRyYW5zZmVyIHRoZSBmbGFncyB0bzsgdXN1YWxseSBhIG5ldyBhc3NlcnRpb25cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5jbHVkZUFsbFxuICogQG5hbWVzcGFjZSBVdGlsc1xuICogQG5hbWUgdHJhbnNmZXJGbGFnc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2ZlckZsYWdzKGFzc2VydGlvbiwgb2JqZWN0LCBpbmNsdWRlQWxsKSB7XG4gIHZhciBmbGFncyA9IGFzc2VydGlvbi5fX2ZsYWdzIHx8IChhc3NlcnRpb24uX19mbGFncyA9IE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG4gIGlmICghb2JqZWN0Ll9fZmxhZ3MpIHtcbiAgICBvYmplY3QuX19mbGFncyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cblxuICBpbmNsdWRlQWxsID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMyA/IGluY2x1ZGVBbGwgOiB0cnVlO1xuXG4gIGZvciAodmFyIGZsYWcgaW4gZmxhZ3MpIHtcbiAgICBpZiAoaW5jbHVkZUFsbCB8fFxuICAgICAgICAoZmxhZyAhPT0gJ29iamVjdCcgJiYgZmxhZyAhPT0gJ3NzZmknICYmIGZsYWcgIT09ICdsb2NrU3NmaScgJiYgZmxhZyAhPSAnbWVzc2FnZScpKSB7XG4gICAgICBvYmplY3QuX19mbGFnc1tmbGFnXSA9IGZsYWdzW2ZsYWddO1xuICAgIH1cbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogIVxuICogQ2hhaSAtIGNoZWNrRXJyb3IgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNiBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyMjIC5jaGVja0Vycm9yXG4gKlxuICogQ2hlY2tzIHRoYXQgYW4gZXJyb3IgY29uZm9ybXMgdG8gYSBnaXZlbiBzZXQgb2YgY3JpdGVyaWEgYW5kL29yIHJldHJpZXZlcyBpbmZvcm1hdGlvbiBhYm91dCBpdC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbi8qKlxuICogIyMjIC5jb21wYXRpYmxlSW5zdGFuY2UodGhyb3duLCBlcnJvckxpa2UpXG4gKlxuICogQ2hlY2tzIGlmIHR3byBpbnN0YW5jZXMgYXJlIGNvbXBhdGlibGUgKHN0cmljdCBlcXVhbCkuXG4gKiBSZXR1cm5zIGZhbHNlIGlmIGVycm9yTGlrZSBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgRXJyb3IsIGJlY2F1c2UgaW5zdGFuY2VzXG4gKiBjYW4gb25seSBiZSBjb21wYXRpYmxlIGlmIHRoZXkncmUgYm90aCBlcnJvciBpbnN0YW5jZXMuXG4gKlxuICogQG5hbWUgY29tcGF0aWJsZUluc3RhbmNlXG4gKiBAcGFyYW0ge0Vycm9yfSB0aHJvd24gZXJyb3JcbiAqIEBwYXJhbSB7RXJyb3J8RXJyb3JDb25zdHJ1Y3Rvcn0gZXJyb3JMaWtlIG9iamVjdCB0byBjb21wYXJlIGFnYWluc3RcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY29tcGF0aWJsZUluc3RhbmNlKHRocm93biwgZXJyb3JMaWtlKSB7XG4gIHJldHVybiBlcnJvckxpa2UgaW5zdGFuY2VvZiBFcnJvciAmJiB0aHJvd24gPT09IGVycm9yTGlrZTtcbn1cblxuLyoqXG4gKiAjIyMgLmNvbXBhdGlibGVDb25zdHJ1Y3Rvcih0aHJvd24sIGVycm9yTGlrZSlcbiAqXG4gKiBDaGVja3MgaWYgdHdvIGNvbnN0cnVjdG9ycyBhcmUgY29tcGF0aWJsZS5cbiAqIFRoaXMgZnVuY3Rpb24gY2FuIHJlY2VpdmUgZWl0aGVyIGFuIGVycm9yIGNvbnN0cnVjdG9yIG9yXG4gKiBhbiBlcnJvciBpbnN0YW5jZSBhcyB0aGUgYGVycm9yTGlrZWAgYXJndW1lbnQuXG4gKiBDb25zdHJ1Y3RvcnMgYXJlIGNvbXBhdGlibGUgaWYgdGhleSdyZSB0aGUgc2FtZSBvciBpZiBvbmUgaXNcbiAqIGFuIGluc3RhbmNlIG9mIGFub3RoZXIuXG4gKlxuICogQG5hbWUgY29tcGF0aWJsZUNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0Vycm9yfSB0aHJvd24gZXJyb3JcbiAqIEBwYXJhbSB7RXJyb3J8RXJyb3JDb25zdHJ1Y3Rvcn0gZXJyb3JMaWtlIG9iamVjdCB0byBjb21wYXJlIGFnYWluc3RcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY29tcGF0aWJsZUNvbnN0cnVjdG9yKHRocm93biwgZXJyb3JMaWtlKSB7XG4gIGlmIChlcnJvckxpa2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIC8vIElmIGBlcnJvckxpa2VgIGlzIGFuIGluc3RhbmNlIG9mIGFueSBlcnJvciB3ZSBjb21wYXJlIHRoZWlyIGNvbnN0cnVjdG9yc1xuICAgIHJldHVybiB0aHJvd24uY29uc3RydWN0b3IgPT09IGVycm9yTGlrZS5jb25zdHJ1Y3RvciB8fCB0aHJvd24gaW5zdGFuY2VvZiBlcnJvckxpa2UuY29uc3RydWN0b3I7XG4gIH0gZWxzZSBpZiAoZXJyb3JMaWtlLnByb3RvdHlwZSBpbnN0YW5jZW9mIEVycm9yIHx8IGVycm9yTGlrZSA9PT0gRXJyb3IpIHtcbiAgICAvLyBJZiBgZXJyb3JMaWtlYCBpcyBhIGNvbnN0cnVjdG9yIHRoYXQgaW5oZXJpdHMgZnJvbSBFcnJvciwgd2UgY29tcGFyZSBgdGhyb3duYCB0byBgZXJyb3JMaWtlYCBkaXJlY3RseVxuICAgIHJldHVybiB0aHJvd24uY29uc3RydWN0b3IgPT09IGVycm9yTGlrZSB8fCB0aHJvd24gaW5zdGFuY2VvZiBlcnJvckxpa2U7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogIyMjIC5jb21wYXRpYmxlTWVzc2FnZSh0aHJvd24sIGVyck1hdGNoZXIpXG4gKlxuICogQ2hlY2tzIGlmIGFuIGVycm9yJ3MgbWVzc2FnZSBpcyBjb21wYXRpYmxlIHdpdGggYSBtYXRjaGVyIChTdHJpbmcgb3IgUmVnRXhwKS5cbiAqIElmIHRoZSBtZXNzYWdlIGNvbnRhaW5zIHRoZSBTdHJpbmcgb3IgcGFzc2VzIHRoZSBSZWdFeHAgdGVzdCxcbiAqIGl0IGlzIGNvbnNpZGVyZWQgY29tcGF0aWJsZS5cbiAqXG4gKiBAbmFtZSBjb21wYXRpYmxlTWVzc2FnZVxuICogQHBhcmFtIHtFcnJvcn0gdGhyb3duIGVycm9yXG4gKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGVyck1hdGNoZXIgdG8gbG9vayBmb3IgaW50byB0aGUgbWVzc2FnZVxuICogQG5hbWVzcGFjZSBVdGlsc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjb21wYXRpYmxlTWVzc2FnZSh0aHJvd24sIGVyck1hdGNoZXIpIHtcbiAgdmFyIGNvbXBhcmlzb25TdHJpbmcgPSB0eXBlb2YgdGhyb3duID09PSAnc3RyaW5nJyA/IHRocm93biA6IHRocm93bi5tZXNzYWdlO1xuICBpZiAoZXJyTWF0Y2hlciBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiBlcnJNYXRjaGVyLnRlc3QoY29tcGFyaXNvblN0cmluZyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVyck1hdGNoZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGNvbXBhcmlzb25TdHJpbmcuaW5kZXhPZihlcnJNYXRjaGVyKSAhPT0gLTE7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbWFnaWMtbnVtYmVyc1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqICMjIyAuZ2V0RnVuY3Rpb25OYW1lKGNvbnN0cnVjdG9yRm4pXG4gKlxuICogUmV0dXJucyB0aGUgbmFtZSBvZiBhIGZ1bmN0aW9uLlxuICogVGhpcyBhbHNvIGluY2x1ZGVzIGEgcG9seWZpbGwgZnVuY3Rpb24gaWYgYGNvbnN0cnVjdG9yRm4ubmFtZWAgaXMgbm90IGRlZmluZWQuXG4gKlxuICogQG5hbWUgZ2V0RnVuY3Rpb25OYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvckZuXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgZnVuY3Rpb25OYW1lTWF0Y2ggPSAvXFxzKmZ1bmN0aW9uKD86XFxzfFxccypcXC9cXCpbXig/OipcXC8pXStcXCpcXC9cXHMqKSooW15cXChcXC9dKykvO1xuZnVuY3Rpb24gZ2V0RnVuY3Rpb25OYW1lKGNvbnN0cnVjdG9yRm4pIHtcbiAgdmFyIG5hbWUgPSAnJztcbiAgaWYgKHR5cGVvZiBjb25zdHJ1Y3RvckZuLm5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gSGVyZSB3ZSBydW4gYSBwb2x5ZmlsbCBpZiBjb25zdHJ1Y3RvckZuLm5hbWUgaXMgbm90IGRlZmluZWRcbiAgICB2YXIgbWF0Y2ggPSBTdHJpbmcoY29uc3RydWN0b3JGbikubWF0Y2goZnVuY3Rpb25OYW1lTWF0Y2gpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgbmFtZSA9IG1hdGNoWzFdO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBuYW1lID0gY29uc3RydWN0b3JGbi5uYW1lO1xuICB9XG5cbiAgcmV0dXJuIG5hbWU7XG59XG5cbi8qKlxuICogIyMjIC5nZXRDb25zdHJ1Y3Rvck5hbWUoZXJyb3JMaWtlKVxuICpcbiAqIEdldHMgdGhlIGNvbnN0cnVjdG9yIG5hbWUgZm9yIGFuIEVycm9yIGluc3RhbmNlIG9yIGNvbnN0cnVjdG9yIGl0c2VsZi5cbiAqXG4gKiBAbmFtZSBnZXRDb25zdHJ1Y3Rvck5hbWVcbiAqIEBwYXJhbSB7RXJyb3J8RXJyb3JDb25zdHJ1Y3Rvcn0gZXJyb3JMaWtlXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGdldENvbnN0cnVjdG9yTmFtZShlcnJvckxpa2UpIHtcbiAgdmFyIGNvbnN0cnVjdG9yTmFtZSA9IGVycm9yTGlrZTtcbiAgaWYgKGVycm9yTGlrZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgY29uc3RydWN0b3JOYW1lID0gZ2V0RnVuY3Rpb25OYW1lKGVycm9yTGlrZS5jb25zdHJ1Y3Rvcik7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yTGlrZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIElmIGBlcnJgIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBFcnJvciBpdCBpcyBhbiBlcnJvciBjb25zdHJ1Y3RvciBpdHNlbGYgb3IgYW5vdGhlciBmdW5jdGlvbi5cbiAgICAvLyBJZiB3ZSd2ZSBnb3QgYSBjb21tb24gZnVuY3Rpb24gd2UgZ2V0IGl0cyBuYW1lLCBvdGhlcndpc2Ugd2UgbWF5IG5lZWQgdG8gY3JlYXRlIGEgbmV3IGluc3RhbmNlXG4gICAgLy8gb2YgdGhlIGVycm9yIGp1c3QgaW4gY2FzZSBpdCdzIGEgcG9vcmx5LWNvbnN0cnVjdGVkIGVycm9yLiBQbGVhc2Ugc2VlIGNoYWlqcy9jaGFpL2lzc3Vlcy80NSB0byBrbm93IG1vcmUuXG4gICAgY29uc3RydWN0b3JOYW1lID0gZ2V0RnVuY3Rpb25OYW1lKGVycm9yTGlrZSkudHJpbSgpIHx8XG4gICAgICAgIGdldEZ1bmN0aW9uTmFtZShuZXcgZXJyb3JMaWtlKCkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5ldy1jYXBcbiAgfVxuXG4gIHJldHVybiBjb25zdHJ1Y3Rvck5hbWU7XG59XG5cbi8qKlxuICogIyMjIC5nZXRNZXNzYWdlKGVycm9yTGlrZSlcbiAqXG4gKiBHZXRzIHRoZSBlcnJvciBtZXNzYWdlIGZyb20gYW4gZXJyb3IuXG4gKiBJZiBgZXJyYCBpcyBhIFN0cmluZyBpdHNlbGYsIHdlIHJldHVybiBpdC5cbiAqIElmIHRoZSBlcnJvciBoYXMgbm8gbWVzc2FnZSwgd2UgcmV0dXJuIGFuIGVtcHR5IHN0cmluZy5cbiAqXG4gKiBAbmFtZSBnZXRNZXNzYWdlXG4gKiBAcGFyYW0ge0Vycm9yfFN0cmluZ30gZXJyb3JMaWtlXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGdldE1lc3NhZ2UoZXJyb3JMaWtlKSB7XG4gIHZhciBtc2cgPSAnJztcbiAgaWYgKGVycm9yTGlrZSAmJiBlcnJvckxpa2UubWVzc2FnZSkge1xuICAgIG1zZyA9IGVycm9yTGlrZS5tZXNzYWdlO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvckxpa2UgPT09ICdzdHJpbmcnKSB7XG4gICAgbXNnID0gZXJyb3JMaWtlO1xuICB9XG5cbiAgcmV0dXJuIG1zZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbXBhdGlibGVJbnN0YW5jZTogY29tcGF0aWJsZUluc3RhbmNlLFxuICBjb21wYXRpYmxlQ29uc3RydWN0b3I6IGNvbXBhdGlibGVDb25zdHJ1Y3RvcixcbiAgY29tcGF0aWJsZU1lc3NhZ2U6IGNvbXBhdGlibGVNZXNzYWdlLFxuICBnZXRNZXNzYWdlOiBnZXRNZXNzYWdlLFxuICBnZXRDb25zdHJ1Y3Rvck5hbWU6IGdldENvbnN0cnVjdG9yTmFtZSxcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vKiBnbG9iYWxzIFN5bWJvbDogZmFsc2UsIFVpbnQ4QXJyYXk6IGZhbHNlLCBXZWFrTWFwOiBmYWxzZSAqL1xuLyohXG4gKiBkZWVwLWVxbFxuICogQ29weXJpZ2h0KGMpIDIwMTMgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG52YXIgdHlwZSA9IHJlcXVpcmUoJ3R5cGUtZGV0ZWN0Jyk7XG5mdW5jdGlvbiBGYWtlTWFwKCkge1xuICB0aGlzLl9rZXkgPSAnY2hhaS9kZWVwLWVxbF9fJyArIE1hdGgucmFuZG9tKCkgKyBEYXRlLm5vdygpO1xufVxuXG5GYWtlTWFwLnByb3RvdHlwZSA9IHtcbiAgZ2V0OiBmdW5jdGlvbiBnZXRNYXAoa2V5KSB7XG4gICAgcmV0dXJuIGtleVt0aGlzLl9rZXldO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uIHNldE1hcChrZXksIHZhbHVlKSB7XG4gICAgaWYgKE9iamVjdC5pc0V4dGVuc2libGUoa2V5KSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGtleSwgdGhpcy5fa2V5LCB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9LFxufTtcblxudmFyIE1lbW9pemVNYXAgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyA/IFdlYWtNYXAgOiBGYWtlTWFwO1xuLyohXG4gKiBDaGVjayB0byBzZWUgaWYgdGhlIE1lbW9pemVNYXAgaGFzIHJlY29yZGVkIGEgcmVzdWx0IG9mIHRoZSB0d28gb3BlcmFuZHNcbiAqXG4gKiBAcGFyYW0ge01peGVkfSBsZWZ0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7TWl4ZWR9IHJpZ2h0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7TWVtb2l6ZU1hcH0gbWVtb2l6ZU1hcFxuICogQHJldHVybnMge0Jvb2xlYW58bnVsbH0gcmVzdWx0XG4qL1xuZnVuY3Rpb24gbWVtb2l6ZUNvbXBhcmUobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBtZW1vaXplTWFwKSB7XG4gIC8vIFRlY2huaWNhbGx5LCBXZWFrTWFwIGtleXMgY2FuICpvbmx5KiBiZSBvYmplY3RzLCBub3QgcHJpbWl0aXZlcy5cbiAgaWYgKCFtZW1vaXplTWFwIHx8IGlzUHJpbWl0aXZlKGxlZnRIYW5kT3BlcmFuZCkgfHwgaXNQcmltaXRpdmUocmlnaHRIYW5kT3BlcmFuZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2YXIgbGVmdEhhbmRNYXAgPSBtZW1vaXplTWFwLmdldChsZWZ0SGFuZE9wZXJhbmQpO1xuICBpZiAobGVmdEhhbmRNYXApIHtcbiAgICB2YXIgcmVzdWx0ID0gbGVmdEhhbmRNYXAuZ2V0KHJpZ2h0SGFuZE9wZXJhbmQpO1xuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKiFcbiAqIFNldCB0aGUgcmVzdWx0IG9mIHRoZSBlcXVhbGl0eSBpbnRvIHRoZSBNZW1vaXplTWFwXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gbGVmdEhhbmRPcGVyYW5kXG4gKiBAcGFyYW0ge01peGVkfSByaWdodEhhbmRPcGVyYW5kXG4gKiBAcGFyYW0ge01lbW9pemVNYXB9IG1lbW9pemVNYXBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVzdWx0XG4qL1xuZnVuY3Rpb24gbWVtb2l6ZVNldChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG1lbW9pemVNYXAsIHJlc3VsdCkge1xuICAvLyBUZWNobmljYWxseSwgV2Vha01hcCBrZXlzIGNhbiAqb25seSogYmUgb2JqZWN0cywgbm90IHByaW1pdGl2ZXMuXG4gIGlmICghbWVtb2l6ZU1hcCB8fCBpc1ByaW1pdGl2ZShsZWZ0SGFuZE9wZXJhbmQpIHx8IGlzUHJpbWl0aXZlKHJpZ2h0SGFuZE9wZXJhbmQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsZWZ0SGFuZE1hcCA9IG1lbW9pemVNYXAuZ2V0KGxlZnRIYW5kT3BlcmFuZCk7XG4gIGlmIChsZWZ0SGFuZE1hcCkge1xuICAgIGxlZnRIYW5kTWFwLnNldChyaWdodEhhbmRPcGVyYW5kLCByZXN1bHQpO1xuICB9IGVsc2Uge1xuICAgIGxlZnRIYW5kTWFwID0gbmV3IE1lbW9pemVNYXAoKTtcbiAgICBsZWZ0SGFuZE1hcC5zZXQocmlnaHRIYW5kT3BlcmFuZCwgcmVzdWx0KTtcbiAgICBtZW1vaXplTWFwLnNldChsZWZ0SGFuZE9wZXJhbmQsIGxlZnRIYW5kTWFwKTtcbiAgfVxufVxuXG4vKiFcbiAqIFByaW1hcnkgRXhwb3J0XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBkZWVwRXF1YWw7XG5tb2R1bGUuZXhwb3J0cy5NZW1vaXplTWFwID0gTWVtb2l6ZU1hcDtcblxuLyoqXG4gKiBBc3NlcnQgZGVlcGx5IG5lc3RlZCBzYW1lVmFsdWUgZXF1YWxpdHkgYmV0d2VlbiB0d28gb2JqZWN0cyBvZiBhbnkgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBsZWZ0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7TWl4ZWR9IHJpZ2h0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gKG9wdGlvbmFsKSBBZGRpdGlvbmFsIG9wdGlvbnNcbiAqIEBwYXJhbSB7QXJyYXl9IFtvcHRpb25zLmNvbXBhcmF0b3JdIChvcHRpb25hbCkgT3ZlcnJpZGUgZGVmYXVsdCBhbGdvcml0aG0sIGRldGVybWluaW5nIGN1c3RvbSBlcXVhbGl0eS5cbiAqIEBwYXJhbSB7QXJyYXl9IFtvcHRpb25zLm1lbW9pemVdIChvcHRpb25hbCkgUHJvdmlkZSBhIGN1c3RvbSBtZW1vaXphdGlvbiBvYmplY3Qgd2hpY2ggd2lsbCBjYWNoZSB0aGUgcmVzdWx0cyBvZlxuICAgIGNvbXBsZXggb2JqZWN0cyBmb3IgYSBzcGVlZCBib29zdC4gQnkgcGFzc2luZyBgZmFsc2VgIHlvdSBjYW4gZGlzYWJsZSBtZW1vaXphdGlvbiwgYnV0IHRoaXMgd2lsbCBjYXVzZSBjaXJjdWxhclxuICAgIHJlZmVyZW5jZXMgdG8gYmxvdyB0aGUgc3RhY2suXG4gKiBAcmV0dXJuIHtCb29sZWFufSBlcXVhbCBtYXRjaFxuICovXG5mdW5jdGlvbiBkZWVwRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKSB7XG4gIC8vIElmIHdlIGhhdmUgYSBjb21wYXJhdG9yLCB3ZSBjYW4ndCBhc3N1bWUgYW55dGhpbmc7IHNvIGJhaWwgdG8gaXRzIGNoZWNrIGZpcnN0LlxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmNvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gZXh0ZW5zaXZlRGVlcEVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucyk7XG4gIH1cblxuICB2YXIgc2ltcGxlUmVzdWx0ID0gc2ltcGxlRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kKTtcbiAgaWYgKHNpbXBsZVJlc3VsdCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBzaW1wbGVSZXN1bHQ7XG4gIH1cblxuICAvLyBEZWVwZXIgY29tcGFyaXNvbnMgYXJlIHB1c2hlZCB0aHJvdWdoIHRvIGEgbGFyZ2VyIGZ1bmN0aW9uXG4gIHJldHVybiBleHRlbnNpdmVEZWVwRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBNYW55IGNvbXBhcmlzb25zIGNhbiBiZSBjYW5jZWxlZCBvdXQgZWFybHkgdmlhIHNpbXBsZSBlcXVhbGl0eSBvciBwcmltaXRpdmUgY2hlY2tzLlxuICogQHBhcmFtIHtNaXhlZH0gbGVmdEhhbmRPcGVyYW5kXG4gKiBAcGFyYW0ge01peGVkfSByaWdodEhhbmRPcGVyYW5kXG4gKiBAcmV0dXJuIHtCb29sZWFufG51bGx9IGVxdWFsIG1hdGNoXG4gKi9cbmZ1bmN0aW9uIHNpbXBsZUVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCkge1xuICAvLyBFcXVhbCByZWZlcmVuY2VzIChleGNlcHQgZm9yIE51bWJlcnMpIGNhbiBiZSByZXR1cm5lZCBlYXJseVxuICBpZiAobGVmdEhhbmRPcGVyYW5kID09PSByaWdodEhhbmRPcGVyYW5kKSB7XG4gICAgLy8gSGFuZGxlICstMCBjYXNlc1xuICAgIHJldHVybiBsZWZ0SGFuZE9wZXJhbmQgIT09IDAgfHwgMSAvIGxlZnRIYW5kT3BlcmFuZCA9PT0gMSAvIHJpZ2h0SGFuZE9wZXJhbmQ7XG4gIH1cblxuICAvLyBoYW5kbGUgTmFOIGNhc2VzXG4gIGlmIChcbiAgICBsZWZ0SGFuZE9wZXJhbmQgIT09IGxlZnRIYW5kT3BlcmFuZCAmJiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIHJpZ2h0SGFuZE9wZXJhbmQgIT09IHJpZ2h0SGFuZE9wZXJhbmQgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBBbnl0aGluZyB0aGF0IGlzIG5vdCBhbiAnb2JqZWN0JywgaS5lLiBzeW1ib2xzLCBmdW5jdGlvbnMsIGJvb2xlYW5zLCBudW1iZXJzLFxuICAvLyBzdHJpbmdzLCBhbmQgdW5kZWZpbmVkLCBjYW4gYmUgY29tcGFyZWQgYnkgcmVmZXJlbmNlLlxuICBpZiAoaXNQcmltaXRpdmUobGVmdEhhbmRPcGVyYW5kKSB8fCBpc1ByaW1pdGl2ZShyaWdodEhhbmRPcGVyYW5kKSkge1xuICAgIC8vIEVhc3kgb3V0IGIvYyBpdCB3b3VsZCBoYXZlIHBhc3NlZCB0aGUgZmlyc3QgZXF1YWxpdHkgY2hlY2tcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qIVxuICogVGhlIG1haW4gbG9naWMgb2YgdGhlIGBkZWVwRXF1YWxgIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGxlZnRIYW5kT3BlcmFuZFxuICogQHBhcmFtIHtNaXhlZH0gcmlnaHRIYW5kT3BlcmFuZFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAob3B0aW9uYWwpIEFkZGl0aW9uYWwgb3B0aW9uc1xuICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMuY29tcGFyYXRvcl0gKG9wdGlvbmFsKSBPdmVycmlkZSBkZWZhdWx0IGFsZ29yaXRobSwgZGV0ZXJtaW5pbmcgY3VzdG9tIGVxdWFsaXR5LlxuICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMubWVtb2l6ZV0gKG9wdGlvbmFsKSBQcm92aWRlIGEgY3VzdG9tIG1lbW9pemF0aW9uIG9iamVjdCB3aGljaCB3aWxsIGNhY2hlIHRoZSByZXN1bHRzIG9mXG4gICAgY29tcGxleCBvYmplY3RzIGZvciBhIHNwZWVkIGJvb3N0LiBCeSBwYXNzaW5nIGBmYWxzZWAgeW91IGNhbiBkaXNhYmxlIG1lbW9pemF0aW9uLCBidXQgdGhpcyB3aWxsIGNhdXNlIGNpcmN1bGFyXG4gICAgcmVmZXJlbmNlcyB0byBibG93IHRoZSBzdGFjay5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGVxdWFsIG1hdGNoXG4qL1xuZnVuY3Rpb24gZXh0ZW5zaXZlRGVlcEVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgb3B0aW9ucy5tZW1vaXplID0gb3B0aW9ucy5tZW1vaXplID09PSBmYWxzZSA/IGZhbHNlIDogb3B0aW9ucy5tZW1vaXplIHx8IG5ldyBNZW1vaXplTWFwKCk7XG4gIHZhciBjb21wYXJhdG9yID0gb3B0aW9ucyAmJiBvcHRpb25zLmNvbXBhcmF0b3I7XG5cbiAgLy8gQ2hlY2sgaWYgYSBtZW1vaXplZCByZXN1bHQgZXhpc3RzLlxuICB2YXIgbWVtb2l6ZVJlc3VsdExlZnQgPSBtZW1vaXplQ29tcGFyZShsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMubWVtb2l6ZSk7XG4gIGlmIChtZW1vaXplUmVzdWx0TGVmdCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBtZW1vaXplUmVzdWx0TGVmdDtcbiAgfVxuICB2YXIgbWVtb2l6ZVJlc3VsdFJpZ2h0ID0gbWVtb2l6ZUNvbXBhcmUocmlnaHRIYW5kT3BlcmFuZCwgbGVmdEhhbmRPcGVyYW5kLCBvcHRpb25zLm1lbW9pemUpO1xuICBpZiAobWVtb2l6ZVJlc3VsdFJpZ2h0ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIG1lbW9pemVSZXN1bHRSaWdodDtcbiAgfVxuXG4gIC8vIElmIGEgY29tcGFyYXRvciBpcyBwcmVzZW50LCB1c2UgaXQuXG4gIGlmIChjb21wYXJhdG9yKSB7XG4gICAgdmFyIGNvbXBhcmF0b3JSZXN1bHQgPSBjb21wYXJhdG9yKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCk7XG4gICAgLy8gQ29tcGFyYXRvcnMgbWF5IHJldHVybiBudWxsLCBpbiB3aGljaCBjYXNlIHdlIHdhbnQgdG8gZ28gYmFjayB0byBkZWZhdWx0IGJlaGF2aW9yLlxuICAgIGlmIChjb21wYXJhdG9yUmVzdWx0ID09PSBmYWxzZSB8fCBjb21wYXJhdG9yUmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICBtZW1vaXplU2V0KGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucy5tZW1vaXplLCBjb21wYXJhdG9yUmVzdWx0KTtcbiAgICAgIHJldHVybiBjb21wYXJhdG9yUmVzdWx0O1xuICAgIH1cbiAgICAvLyBUbyBhbGxvdyBjb21wYXJhdG9ycyB0byBvdmVycmlkZSAqYW55KiBiZWhhdmlvciwgd2UgcmFuIHRoZW0gZmlyc3QuIFNpbmNlIGl0IGRpZG4ndCBkZWNpZGVcbiAgICAvLyB3aGF0IHRvIGRvLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0byByZXR1cm4gdGhlIGJhc2ljIHRlc3RzIGZpcnN0IGJlZm9yZSB3ZSBtb3ZlIG9uLlxuICAgIHZhciBzaW1wbGVSZXN1bHQgPSBzaW1wbGVFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQpO1xuICAgIGlmIChzaW1wbGVSZXN1bHQgIT09IG51bGwpIHtcbiAgICAgIC8vIERvbid0IG1lbW9pemUgdGhpcywgaXQgdGFrZXMgbG9uZ2VyIHRvIHNldC9yZXRyaWV2ZSB0aGFuIHRvIGp1c3QgY29tcGFyZS5cbiAgICAgIHJldHVybiBzaW1wbGVSZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgdmFyIGxlZnRIYW5kVHlwZSA9IHR5cGUobGVmdEhhbmRPcGVyYW5kKTtcbiAgaWYgKGxlZnRIYW5kVHlwZSAhPT0gdHlwZShyaWdodEhhbmRPcGVyYW5kKSkge1xuICAgIG1lbW9pemVTZXQobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zLm1lbW9pemUsIGZhbHNlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBUZW1wb3JhcmlseSBzZXQgdGhlIG9wZXJhbmRzIGluIHRoZSBtZW1vaXplIG9iamVjdCB0byBwcmV2ZW50IGJsb3dpbmcgdGhlIHN0YWNrXG4gIG1lbW9pemVTZXQobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zLm1lbW9pemUsIHRydWUpO1xuXG4gIHZhciByZXN1bHQgPSBleHRlbnNpdmVEZWVwRXF1YWxCeVR5cGUobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBsZWZ0SGFuZFR5cGUsIG9wdGlvbnMpO1xuICBtZW1vaXplU2V0KGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucy5tZW1vaXplLCByZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBleHRlbnNpdmVEZWVwRXF1YWxCeVR5cGUobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBsZWZ0SGFuZFR5cGUsIG9wdGlvbnMpIHtcbiAgc3dpdGNoIChsZWZ0SGFuZFR5cGUpIHtcbiAgICBjYXNlICdTdHJpbmcnOlxuICAgIGNhc2UgJ051bWJlcic6XG4gICAgY2FzZSAnQm9vbGVhbic6XG4gICAgY2FzZSAnRGF0ZSc6XG4gICAgICAvLyBJZiB0aGVzZSB0eXBlcyBhcmUgdGhlaXIgaW5zdGFuY2UgdHlwZXMgKGUuZy4gYG5ldyBOdW1iZXJgKSB0aGVuIHJlLWRlZXBFcXVhbCBhZ2FpbnN0IHRoZWlyIHZhbHVlc1xuICAgICAgcmV0dXJuIGRlZXBFcXVhbChsZWZ0SGFuZE9wZXJhbmQudmFsdWVPZigpLCByaWdodEhhbmRPcGVyYW5kLnZhbHVlT2YoKSk7XG4gICAgY2FzZSAnUHJvbWlzZSc6XG4gICAgY2FzZSAnU3ltYm9sJzpcbiAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgY2FzZSAnV2Vha01hcCc6XG4gICAgY2FzZSAnV2Vha1NldCc6XG4gICAgY2FzZSAnRXJyb3InOlxuICAgICAgcmV0dXJuIGxlZnRIYW5kT3BlcmFuZCA9PT0gcmlnaHRIYW5kT3BlcmFuZDtcbiAgICBjYXNlICdBcmd1bWVudHMnOlxuICAgIGNhc2UgJ0ludDhBcnJheSc6XG4gICAgY2FzZSAnVWludDhBcnJheSc6XG4gICAgY2FzZSAnVWludDhDbGFtcGVkQXJyYXknOlxuICAgIGNhc2UgJ0ludDE2QXJyYXknOlxuICAgIGNhc2UgJ1VpbnQxNkFycmF5JzpcbiAgICBjYXNlICdJbnQzMkFycmF5JzpcbiAgICBjYXNlICdVaW50MzJBcnJheSc6XG4gICAgY2FzZSAnRmxvYXQzMkFycmF5JzpcbiAgICBjYXNlICdGbG9hdDY0QXJyYXknOlxuICAgIGNhc2UgJ0FycmF5JzpcbiAgICAgIHJldHVybiBpdGVyYWJsZUVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucyk7XG4gICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgIHJldHVybiByZWdleHBFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQpO1xuICAgIGNhc2UgJ0dlbmVyYXRvcic6XG4gICAgICByZXR1cm4gZ2VuZXJhdG9yRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKTtcbiAgICBjYXNlICdEYXRhVmlldyc6XG4gICAgICByZXR1cm4gaXRlcmFibGVFcXVhbChuZXcgVWludDhBcnJheShsZWZ0SGFuZE9wZXJhbmQuYnVmZmVyKSwgbmV3IFVpbnQ4QXJyYXkocmlnaHRIYW5kT3BlcmFuZC5idWZmZXIpLCBvcHRpb25zKTtcbiAgICBjYXNlICdBcnJheUJ1ZmZlcic6XG4gICAgICByZXR1cm4gaXRlcmFibGVFcXVhbChuZXcgVWludDhBcnJheShsZWZ0SGFuZE9wZXJhbmQpLCBuZXcgVWludDhBcnJheShyaWdodEhhbmRPcGVyYW5kKSwgb3B0aW9ucyk7XG4gICAgY2FzZSAnU2V0JzpcbiAgICAgIHJldHVybiBlbnRyaWVzRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKTtcbiAgICBjYXNlICdNYXAnOlxuICAgICAgcmV0dXJuIGVudHJpZXNFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gb2JqZWN0RXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKTtcbiAgfVxufVxuXG4vKiFcbiAqIENvbXBhcmUgdHdvIFJlZ3VsYXIgRXhwcmVzc2lvbnMgZm9yIGVxdWFsaXR5LlxuICpcbiAqIEBwYXJhbSB7UmVnRXhwfSBsZWZ0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7UmVnRXhwfSByaWdodEhhbmRPcGVyYW5kXG4gKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAqL1xuXG5mdW5jdGlvbiByZWdleHBFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQpIHtcbiAgcmV0dXJuIGxlZnRIYW5kT3BlcmFuZC50b1N0cmluZygpID09PSByaWdodEhhbmRPcGVyYW5kLnRvU3RyaW5nKCk7XG59XG5cbi8qIVxuICogQ29tcGFyZSB0d28gU2V0cy9NYXBzIGZvciBlcXVhbGl0eS4gRmFzdGVyIHRoYW4gb3RoZXIgZXF1YWxpdHkgZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7U2V0fSBsZWZ0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7U2V0fSByaWdodEhhbmRPcGVyYW5kXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIChPcHRpb25hbClcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICovXG5cbmZ1bmN0aW9uIGVudHJpZXNFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpIHtcbiAgLy8gSUUxMSBkb2Vzbid0IHN1cHBvcnQgU2V0I2VudHJpZXMgb3IgU2V0I0BAaXRlcmF0b3IsIHNvIHdlIG5lZWQgbWFudWFsbHkgcG9wdWxhdGUgdXNpbmcgU2V0I2ZvckVhY2hcbiAgaWYgKGxlZnRIYW5kT3BlcmFuZC5zaXplICE9PSByaWdodEhhbmRPcGVyYW5kLnNpemUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGxlZnRIYW5kT3BlcmFuZC5zaXplID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIGxlZnRIYW5kSXRlbXMgPSBbXTtcbiAgdmFyIHJpZ2h0SGFuZEl0ZW1zID0gW107XG4gIGxlZnRIYW5kT3BlcmFuZC5mb3JFYWNoKGZ1bmN0aW9uIGdhdGhlckVudHJpZXMoa2V5LCB2YWx1ZSkge1xuICAgIGxlZnRIYW5kSXRlbXMucHVzaChbIGtleSwgdmFsdWUgXSk7XG4gIH0pO1xuICByaWdodEhhbmRPcGVyYW5kLmZvckVhY2goZnVuY3Rpb24gZ2F0aGVyRW50cmllcyhrZXksIHZhbHVlKSB7XG4gICAgcmlnaHRIYW5kSXRlbXMucHVzaChbIGtleSwgdmFsdWUgXSk7XG4gIH0pO1xuICByZXR1cm4gaXRlcmFibGVFcXVhbChsZWZ0SGFuZEl0ZW1zLnNvcnQoKSwgcmlnaHRIYW5kSXRlbXMuc29ydCgpLCBvcHRpb25zKTtcbn1cblxuLyohXG4gKiBTaW1wbGUgZXF1YWxpdHkgZm9yIGZsYXQgaXRlcmFibGUgb2JqZWN0cyBzdWNoIGFzIEFycmF5cywgVHlwZWRBcnJheXMgb3IgTm9kZS5qcyBidWZmZXJzLlxuICpcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGxlZnRIYW5kT3BlcmFuZFxuICogQHBhcmFtIHtJdGVyYWJsZX0gcmlnaHRIYW5kT3BlcmFuZFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAoT3B0aW9uYWwpXG4gKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAqL1xuXG5mdW5jdGlvbiBpdGVyYWJsZUVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucykge1xuICB2YXIgbGVuZ3RoID0gbGVmdEhhbmRPcGVyYW5kLmxlbmd0aDtcbiAgaWYgKGxlbmd0aCAhPT0gcmlnaHRIYW5kT3BlcmFuZC5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBpbmRleCA9IC0xO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChkZWVwRXF1YWwobGVmdEhhbmRPcGVyYW5kW2luZGV4XSwgcmlnaHRIYW5kT3BlcmFuZFtpbmRleF0sIG9wdGlvbnMpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyohXG4gKiBTaW1wbGUgZXF1YWxpdHkgZm9yIGdlbmVyYXRvciBvYmplY3RzIHN1Y2ggYXMgdGhvc2UgcmV0dXJuZWQgYnkgZ2VuZXJhdG9yIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge0l0ZXJhYmxlfSBsZWZ0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7SXRlcmFibGV9IHJpZ2h0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gKE9wdGlvbmFsKVxuICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gKi9cblxuZnVuY3Rpb24gZ2VuZXJhdG9yRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKSB7XG4gIHJldHVybiBpdGVyYWJsZUVxdWFsKGdldEdlbmVyYXRvckVudHJpZXMobGVmdEhhbmRPcGVyYW5kKSwgZ2V0R2VuZXJhdG9yRW50cmllcyhyaWdodEhhbmRPcGVyYW5kKSwgb3B0aW9ucyk7XG59XG5cbi8qIVxuICogRGV0ZXJtaW5lIGlmIHRoZSBnaXZlbiBvYmplY3QgaGFzIGFuIEBAaXRlcmF0b3IgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBvYmplY3QgaGFzIGFuIEBAaXRlcmF0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGhhc0l0ZXJhdG9yRnVuY3Rpb24odGFyZ2V0KSB7XG4gIHJldHVybiB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnICYmXG4gICAgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgdGFyZ2V0W1N5bWJvbC5pdGVyYXRvcl0gPT09ICdmdW5jdGlvbic7XG59XG5cbi8qIVxuICogR2V0cyBhbGwgaXRlcmF0b3IgZW50cmllcyBmcm9tIHRoZSBnaXZlbiBPYmplY3QuIElmIHRoZSBPYmplY3QgaGFzIG5vIEBAaXRlcmF0b3IgZnVuY3Rpb24sIHJldHVybnMgYW4gZW1wdHkgYXJyYXkuXG4gKiBUaGlzIHdpbGwgY29uc3VtZSB0aGUgaXRlcmF0b3IgLSB3aGljaCBjb3VsZCBoYXZlIHNpZGUgZWZmZWN0cyBkZXBlbmRpbmcgb24gdGhlIEBAaXRlcmF0b3IgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICogQHJldHVybnMge0FycmF5fSBhbiBhcnJheSBvZiBlbnRyaWVzIGZyb20gdGhlIEBAaXRlcmF0b3IgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZ2V0SXRlcmF0b3JFbnRyaWVzKHRhcmdldCkge1xuICBpZiAoaGFzSXRlcmF0b3JGdW5jdGlvbih0YXJnZXQpKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBnZXRHZW5lcmF0b3JFbnRyaWVzKHRhcmdldFtTeW1ib2wuaXRlcmF0b3JdKCkpO1xuICAgIH0gY2F0Y2ggKGl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFtdO1xufVxuXG4vKiFcbiAqIEdldHMgYWxsIGVudHJpZXMgZnJvbSBhIEdlbmVyYXRvci4gVGhpcyB3aWxsIGNvbnN1bWUgdGhlIGdlbmVyYXRvciAtIHdoaWNoIGNvdWxkIGhhdmUgc2lkZSBlZmZlY3RzLlxuICpcbiAqIEBwYXJhbSB7R2VuZXJhdG9yfSB0YXJnZXRcbiAqIEByZXR1cm5zIHtBcnJheX0gYW4gYXJyYXkgb2YgZW50cmllcyBmcm9tIHRoZSBHZW5lcmF0b3IuXG4gKi9cbmZ1bmN0aW9uIGdldEdlbmVyYXRvckVudHJpZXMoZ2VuZXJhdG9yKSB7XG4gIHZhciBnZW5lcmF0b3JSZXN1bHQgPSBnZW5lcmF0b3IubmV4dCgpO1xuICB2YXIgYWNjdW11bGF0b3IgPSBbIGdlbmVyYXRvclJlc3VsdC52YWx1ZSBdO1xuICB3aGlsZSAoZ2VuZXJhdG9yUmVzdWx0LmRvbmUgPT09IGZhbHNlKSB7XG4gICAgZ2VuZXJhdG9yUmVzdWx0ID0gZ2VuZXJhdG9yLm5leHQoKTtcbiAgICBhY2N1bXVsYXRvci5wdXNoKGdlbmVyYXRvclJlc3VsdC52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG4vKiFcbiAqIEdldHMgYWxsIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUga2V5cyBmcm9tIGEgdGFyZ2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEByZXR1cm5zIHtBcnJheX0gYW4gYXJyYXkgb2Ygb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBrZXlzIGZyb20gdGhlIHRhcmdldC5cbiAqL1xuZnVuY3Rpb24gZ2V0RW51bWVyYWJsZUtleXModGFyZ2V0KSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiB0YXJnZXQpIHtcbiAgICBrZXlzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4ga2V5cztcbn1cblxuLyohXG4gKiBEZXRlcm1pbmVzIGlmIHR3byBvYmplY3RzIGhhdmUgbWF0Y2hpbmcgdmFsdWVzLCBnaXZlbiBhIHNldCBvZiBrZXlzLiBEZWZlcnMgdG8gZGVlcEVxdWFsIGZvciB0aGUgZXF1YWxpdHkgY2hlY2sgb2ZcbiAqIGVhY2gga2V5LiBJZiBhbnkgdmFsdWUgb2YgdGhlIGdpdmVuIGtleSBpcyBub3QgZXF1YWwsIHRoZSBmdW5jdGlvbiB3aWxsIHJldHVybiBmYWxzZSAoZWFybHkpLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGxlZnRIYW5kT3BlcmFuZFxuICogQHBhcmFtIHtNaXhlZH0gcmlnaHRIYW5kT3BlcmFuZFxuICogQHBhcmFtIHtBcnJheX0ga2V5cyBBbiBhcnJheSBvZiBrZXlzIHRvIGNvbXBhcmUgdGhlIHZhbHVlcyBvZiBsZWZ0SGFuZE9wZXJhbmQgYW5kIHJpZ2h0SGFuZE9wZXJhbmQgYWdhaW5zdFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAoT3B0aW9uYWwpXG4gKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAqL1xuZnVuY3Rpb24ga2V5c0VxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwga2V5cywgb3B0aW9ucykge1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIGlmIChsZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGRlZXBFcXVhbChsZWZ0SGFuZE9wZXJhbmRba2V5c1tpXV0sIHJpZ2h0SGFuZE9wZXJhbmRba2V5c1tpXV0sIG9wdGlvbnMpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyohXG4gKiBSZWN1cnNpdmVseSBjaGVjayB0aGUgZXF1YWxpdHkgb2YgdHdvIE9iamVjdHMuIE9uY2UgYmFzaWMgc2FtZW5lc3MgaGFzIGJlZW4gZXN0YWJsaXNoZWQgaXQgd2lsbCBkZWZlciB0byBgZGVlcEVxdWFsYFxuICogZm9yIGVhY2ggZW51bWVyYWJsZSBrZXkgaW4gdGhlIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBsZWZ0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7TWl4ZWR9IHJpZ2h0SGFuZE9wZXJhbmRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gKE9wdGlvbmFsKVxuICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gKi9cblxuZnVuY3Rpb24gb2JqZWN0RXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKSB7XG4gIHZhciBsZWZ0SGFuZEtleXMgPSBnZXRFbnVtZXJhYmxlS2V5cyhsZWZ0SGFuZE9wZXJhbmQpO1xuICB2YXIgcmlnaHRIYW5kS2V5cyA9IGdldEVudW1lcmFibGVLZXlzKHJpZ2h0SGFuZE9wZXJhbmQpO1xuICBpZiAobGVmdEhhbmRLZXlzLmxlbmd0aCAmJiBsZWZ0SGFuZEtleXMubGVuZ3RoID09PSByaWdodEhhbmRLZXlzLmxlbmd0aCkge1xuICAgIGxlZnRIYW5kS2V5cy5zb3J0KCk7XG4gICAgcmlnaHRIYW5kS2V5cy5zb3J0KCk7XG4gICAgaWYgKGl0ZXJhYmxlRXF1YWwobGVmdEhhbmRLZXlzLCByaWdodEhhbmRLZXlzKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleXNFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIGxlZnRIYW5kS2V5cywgb3B0aW9ucyk7XG4gIH1cblxuICB2YXIgbGVmdEhhbmRFbnRyaWVzID0gZ2V0SXRlcmF0b3JFbnRyaWVzKGxlZnRIYW5kT3BlcmFuZCk7XG4gIHZhciByaWdodEhhbmRFbnRyaWVzID0gZ2V0SXRlcmF0b3JFbnRyaWVzKHJpZ2h0SGFuZE9wZXJhbmQpO1xuICBpZiAobGVmdEhhbmRFbnRyaWVzLmxlbmd0aCAmJiBsZWZ0SGFuZEVudHJpZXMubGVuZ3RoID09PSByaWdodEhhbmRFbnRyaWVzLmxlbmd0aCkge1xuICAgIGxlZnRIYW5kRW50cmllcy5zb3J0KCk7XG4gICAgcmlnaHRIYW5kRW50cmllcy5zb3J0KCk7XG4gICAgcmV0dXJuIGl0ZXJhYmxlRXF1YWwobGVmdEhhbmRFbnRyaWVzLCByaWdodEhhbmRFbnRyaWVzLCBvcHRpb25zKTtcbiAgfVxuXG4gIGlmIChsZWZ0SGFuZEtleXMubGVuZ3RoID09PSAwICYmXG4gICAgICBsZWZ0SGFuZEVudHJpZXMubGVuZ3RoID09PSAwICYmXG4gICAgICByaWdodEhhbmRLZXlzLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgcmlnaHRIYW5kRW50cmllcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyohXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGFyZ3VtZW50IGlzIGEgcHJpbWl0aXZlLlxuICpcbiAqIFRoaXMgaW50ZW50aW9uYWxseSByZXR1cm5zIHRydWUgZm9yIGFsbCBvYmplY3RzIHRoYXQgY2FuIGJlIGNvbXBhcmVkIGJ5IHJlZmVyZW5jZSxcbiAqIGluY2x1ZGluZyBmdW5jdGlvbnMgYW5kIHN5bWJvbHMuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICovXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyogIVxuICogQ2hhaSAtIGdldEZ1bmNOYW1lIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTYgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAuZ2V0RnVuY05hbWUoY29uc3RydWN0b3JGbilcbiAqXG4gKiBSZXR1cm5zIHRoZSBuYW1lIG9mIGEgZnVuY3Rpb24uXG4gKiBXaGVuIGEgbm9uLWZ1bmN0aW9uIGluc3RhbmNlIGlzIHBhc3NlZCwgcmV0dXJucyBgbnVsbGAuXG4gKiBUaGlzIGFsc28gaW5jbHVkZXMgYSBwb2x5ZmlsbCBmdW5jdGlvbiBpZiBgYUZ1bmMubmFtZWAgaXMgbm90IGRlZmluZWQuXG4gKlxuICogQG5hbWUgZ2V0RnVuY05hbWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0XG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnZhciB0b1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbnZhciBmdW5jdGlvbk5hbWVNYXRjaCA9IC9cXHMqZnVuY3Rpb24oPzpcXHN8XFxzKlxcL1xcKlteKD86KlxcLyldK1xcKlxcL1xccyopKihbXlxcc1xcKFxcL10rKS87XG5mdW5jdGlvbiBnZXRGdW5jTmFtZShhRnVuYykge1xuICBpZiAodHlwZW9mIGFGdW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgbmFtZSA9ICcnO1xuICBpZiAodHlwZW9mIEZ1bmN0aW9uLnByb3RvdHlwZS5uYW1lID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgYUZ1bmMubmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBIZXJlIHdlIHJ1biBhIHBvbHlmaWxsIGlmIEZ1bmN0aW9uIGRvZXMgbm90IHN1cHBvcnQgdGhlIGBuYW1lYCBwcm9wZXJ0eSBhbmQgaWYgYUZ1bmMubmFtZSBpcyBub3QgZGVmaW5lZFxuICAgIHZhciBtYXRjaCA9IHRvU3RyaW5nLmNhbGwoYUZ1bmMpLm1hdGNoKGZ1bmN0aW9uTmFtZU1hdGNoKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIG5hbWUgPSBtYXRjaFsxXTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSWYgd2UndmUgZ290IGEgYG5hbWVgIHByb3BlcnR5IHdlIGp1c3QgdXNlIGl0XG4gICAgbmFtZSA9IGFGdW5jLm5hbWU7XG4gIH1cblxuICByZXR1cm4gbmFtZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRGdW5jTmFtZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogIVxuICogQ2hhaSAtIHBhdGh2YWwgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2xvZ2ljYWxwYXJhZG94L2ZpbHRyXG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAuaGFzUHJvcGVydHkob2JqZWN0LCBuYW1lKVxuICpcbiAqIFRoaXMgYWxsb3dzIGNoZWNraW5nIHdoZXRoZXIgYW4gb2JqZWN0IGhhcyBvd25cbiAqIG9yIGluaGVyaXRlZCBmcm9tIHByb3RvdHlwZSBjaGFpbiBuYW1lZCBwcm9wZXJ0eS5cbiAqXG4gKiBCYXNpY2FsbHkgZG9lcyB0aGUgc2FtZSB0aGluZyBhcyB0aGUgYGluYFxuICogb3BlcmF0b3IgYnV0IHdvcmtzIHByb3Blcmx5IHdpdGggbnVsbC91bmRlZmluZWQgdmFsdWVzXG4gKiBhbmQgb3RoZXIgcHJpbWl0aXZlcy5cbiAqXG4gKiAgICAgdmFyIG9iaiA9IHtcbiAqICAgICAgICAgYXJyOiBbJ2EnLCAnYicsICdjJ11cbiAqICAgICAgICwgc3RyOiAnSGVsbG8nXG4gKiAgICAgfVxuICpcbiAqIFRoZSBmb2xsb3dpbmcgd291bGQgYmUgdGhlIHJlc3VsdHMuXG4gKlxuICogICAgIGhhc1Byb3BlcnR5KG9iaiwgJ3N0cicpOyAgLy8gdHJ1ZVxuICogICAgIGhhc1Byb3BlcnR5KG9iaiwgJ2NvbnN0cnVjdG9yJyk7ICAvLyB0cnVlXG4gKiAgICAgaGFzUHJvcGVydHkob2JqLCAnYmFyJyk7ICAvLyBmYWxzZVxuICpcbiAqICAgICBoYXNQcm9wZXJ0eShvYmouc3RyLCAnbGVuZ3RoJyk7IC8vIHRydWVcbiAqICAgICBoYXNQcm9wZXJ0eShvYmouc3RyLCAxKTsgIC8vIHRydWVcbiAqICAgICBoYXNQcm9wZXJ0eShvYmouc3RyLCA1KTsgIC8vIGZhbHNlXG4gKlxuICogICAgIGhhc1Byb3BlcnR5KG9iai5hcnIsICdsZW5ndGgnKTsgIC8vIHRydWVcbiAqICAgICBoYXNQcm9wZXJ0eShvYmouYXJyLCAyKTsgIC8vIHRydWVcbiAqICAgICBoYXNQcm9wZXJ0eShvYmouYXJyLCAzKTsgIC8vIGZhbHNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICogQHBhcmFtIHtTdHJpbmd8U3ltYm9sfSBuYW1lXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gd2hldGhlciBpdCBleGlzdHNcbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGhhc1Byb3BlcnR5XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGhhc1Byb3BlcnR5KG9iaiwgbmFtZSkge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcgfHwgb2JqID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVGhlIGBpbmAgb3BlcmF0b3IgZG9lcyBub3Qgd29yayB3aXRoIHByaW1pdGl2ZXMuXG4gIHJldHVybiBuYW1lIGluIE9iamVjdChvYmopO1xufVxuXG4vKiAhXG4gKiAjIyBwYXJzZVBhdGgocGF0aClcbiAqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdXNlZCB0byBwYXJzZSBzdHJpbmcgb2JqZWN0XG4gKiBwYXRocy4gVXNlIGluIGNvbmp1bmN0aW9uIHdpdGggYGludGVybmFsR2V0UGF0aFZhbHVlYC5cbiAqXG4gKiAgICAgIHZhciBwYXJzZWQgPSBwYXJzZVBhdGgoJ215b2JqZWN0LnByb3BlcnR5LnN1YnByb3AnKTtcbiAqXG4gKiAjIyMgUGF0aHM6XG4gKlxuICogKiBDYW4gYmUgaW5maW5pdGVseSBkZWVwIGFuZCBuZXN0ZWQuXG4gKiAqIEFycmF5cyBhcmUgYWxzbyB2YWxpZCB1c2luZyB0aGUgZm9ybWFsIGBteW9iamVjdC5kb2N1bWVudFszXS5wcm9wZXJ0eWAuXG4gKiAqIExpdGVyYWwgZG90cyBhbmQgYnJhY2tldHMgKG5vdCBkZWxpbWl0ZXIpIG11c3QgYmUgYmFja3NsYXNoLWVzY2FwZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAqIEByZXR1cm5zIHtPYmplY3R9IHBhcnNlZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2VQYXRoKHBhdGgpIHtcbiAgdmFyIHN0ciA9IHBhdGgucmVwbGFjZSgvKFteXFxcXF0pXFxbL2csICckMS5bJyk7XG4gIHZhciBwYXJ0cyA9IHN0ci5tYXRjaCgvKFxcXFxcXC58W14uXSs/KSsvZyk7XG4gIHJldHVybiBwYXJ0cy5tYXAoZnVuY3Rpb24gbWFwTWF0Y2hlcyh2YWx1ZSkge1xuICAgIHZhciByZWdleHAgPSAvXlxcWyhcXGQrKVxcXSQvO1xuICAgIHZhciBtQXJyID0gcmVnZXhwLmV4ZWModmFsdWUpO1xuICAgIHZhciBwYXJzZWQgPSBudWxsO1xuICAgIGlmIChtQXJyKSB7XG4gICAgICBwYXJzZWQgPSB7IGk6IHBhcnNlRmxvYXQobUFyclsxXSkgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkID0geyBwOiB2YWx1ZS5yZXBsYWNlKC9cXFxcKFsuXFxbXFxdXSkvZywgJyQxJykgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VkO1xuICB9KTtcbn1cblxuLyogIVxuICogIyMgaW50ZXJuYWxHZXRQYXRoVmFsdWUob2JqLCBwYXJzZWRbLCBwYXRoRGVwdGhdKVxuICpcbiAqIEhlbHBlciBjb21wYW5pb24gZnVuY3Rpb24gZm9yIGAucGFyc2VQYXRoYCB0aGF0IHJldHVybnNcbiAqIHRoZSB2YWx1ZSBsb2NhdGVkIGF0IHRoZSBwYXJzZWQgYWRkcmVzcy5cbiAqXG4gKiAgICAgIHZhciB2YWx1ZSA9IGdldFBhdGhWYWx1ZShvYmosIHBhcnNlZCk7XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCB0byBzZWFyY2ggYWdhaW5zdFxuICogQHBhcmFtIHtPYmplY3R9IHBhcnNlZCBkZWZpbml0aW9uIGZyb20gYHBhcnNlUGF0aGAuXG4gKiBAcGFyYW0ge051bWJlcn0gZGVwdGggKG5lc3RpbmcgbGV2ZWwpIG9mIHRoZSBwcm9wZXJ0eSB3ZSB3YW50IHRvIHJldHJpZXZlXG4gKiBAcmV0dXJucyB7T2JqZWN0fFVuZGVmaW5lZH0gdmFsdWVcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGludGVybmFsR2V0UGF0aFZhbHVlKG9iaiwgcGFyc2VkLCBwYXRoRGVwdGgpIHtcbiAgdmFyIHRlbXBvcmFyeVZhbHVlID0gb2JqO1xuICB2YXIgcmVzID0gbnVsbDtcbiAgcGF0aERlcHRoID0gKHR5cGVvZiBwYXRoRGVwdGggPT09ICd1bmRlZmluZWQnID8gcGFyc2VkLmxlbmd0aCA6IHBhdGhEZXB0aCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoRGVwdGg7IGkrKykge1xuICAgIHZhciBwYXJ0ID0gcGFyc2VkW2ldO1xuICAgIGlmICh0ZW1wb3JhcnlWYWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiBwYXJ0LnAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRlbXBvcmFyeVZhbHVlID0gdGVtcG9yYXJ5VmFsdWVbcGFydC5pXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlbXBvcmFyeVZhbHVlID0gdGVtcG9yYXJ5VmFsdWVbcGFydC5wXTtcbiAgICAgIH1cblxuICAgICAgaWYgKGkgPT09IChwYXRoRGVwdGggLSAxKSkge1xuICAgICAgICByZXMgPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG4vKiAhXG4gKiAjIyBpbnRlcm5hbFNldFBhdGhWYWx1ZShvYmosIHZhbHVlLCBwYXJzZWQpXG4gKlxuICogQ29tcGFuaW9uIGZ1bmN0aW9uIGZvciBgcGFyc2VQYXRoYCB0aGF0IHNldHNcbiAqIHRoZSB2YWx1ZSBsb2NhdGVkIGF0IGEgcGFyc2VkIGFkZHJlc3MuXG4gKlxuICogIGludGVybmFsU2V0UGF0aFZhbHVlKG9iaiwgJ3ZhbHVlJywgcGFyc2VkKTtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IHRvIHNlYXJjaCBhbmQgZGVmaW5lIG9uXG4gKiBAcGFyYW0geyp9IHZhbHVlIHRvIHVzZSB1cG9uIHNldFxuICogQHBhcmFtIHtPYmplY3R9IHBhcnNlZCBkZWZpbml0aW9uIGZyb20gYHBhcnNlUGF0aGBcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGludGVybmFsU2V0UGF0aFZhbHVlKG9iaiwgdmFsLCBwYXJzZWQpIHtcbiAgdmFyIHRlbXBPYmogPSBvYmo7XG4gIHZhciBwYXRoRGVwdGggPSBwYXJzZWQubGVuZ3RoO1xuICB2YXIgcGFydCA9IG51bGw7XG4gIC8vIEhlcmUgd2UgaXRlcmF0ZSB0aHJvdWdoIGV2ZXJ5IHBhcnQgb2YgdGhlIHBhdGhcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoRGVwdGg7IGkrKykge1xuICAgIHZhciBwcm9wTmFtZSA9IG51bGw7XG4gICAgdmFyIHByb3BWYWwgPSBudWxsO1xuICAgIHBhcnQgPSBwYXJzZWRbaV07XG5cbiAgICAvLyBJZiBpdCdzIHRoZSBsYXN0IHBhcnQgb2YgdGhlIHBhdGgsIHdlIHNldCB0aGUgJ3Byb3BOYW1lJyB2YWx1ZSB3aXRoIHRoZSBwcm9wZXJ0eSBuYW1lXG4gICAgaWYgKGkgPT09IChwYXRoRGVwdGggLSAxKSkge1xuICAgICAgcHJvcE5hbWUgPSB0eXBlb2YgcGFydC5wID09PSAndW5kZWZpbmVkJyA/IHBhcnQuaSA6IHBhcnQucDtcbiAgICAgIC8vIE5vdyB3ZSBzZXQgdGhlIHByb3BlcnR5IHdpdGggdGhlIG5hbWUgaGVsZCBieSAncHJvcE5hbWUnIG9uIG9iamVjdCB3aXRoIHRoZSBkZXNpcmVkIHZhbFxuICAgICAgdGVtcE9ialtwcm9wTmFtZV0gPSB2YWw7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFydC5wICE9PSAndW5kZWZpbmVkJyAmJiB0ZW1wT2JqW3BhcnQucF0pIHtcbiAgICAgIHRlbXBPYmogPSB0ZW1wT2JqW3BhcnQucF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFydC5pICE9PSAndW5kZWZpbmVkJyAmJiB0ZW1wT2JqW3BhcnQuaV0pIHtcbiAgICAgIHRlbXBPYmogPSB0ZW1wT2JqW3BhcnQuaV07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHRoZSBvYmogZG9lc24ndCBoYXZlIHRoZSBwcm9wZXJ0eSB3ZSBjcmVhdGUgb25lIHdpdGggdGhhdCBuYW1lIHRvIGRlZmluZSBpdFxuICAgICAgdmFyIG5leHQgPSBwYXJzZWRbaSArIDFdO1xuICAgICAgLy8gSGVyZSB3ZSBzZXQgdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdoaWNoIHdpbGwgYmUgZGVmaW5lZFxuICAgICAgcHJvcE5hbWUgPSB0eXBlb2YgcGFydC5wID09PSAndW5kZWZpbmVkJyA/IHBhcnQuaSA6IHBhcnQucDtcbiAgICAgIC8vIEhlcmUgd2UgZGVjaWRlIGlmIHRoaXMgcHJvcGVydHkgd2lsbCBiZSBhbiBhcnJheSBvciBhIG5ldyBvYmplY3RcbiAgICAgIHByb3BWYWwgPSB0eXBlb2YgbmV4dC5wID09PSAndW5kZWZpbmVkJyA/IFtdIDoge307XG4gICAgICB0ZW1wT2JqW3Byb3BOYW1lXSA9IHByb3BWYWw7XG4gICAgICB0ZW1wT2JqID0gdGVtcE9ialtwcm9wTmFtZV07XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogIyMjIC5nZXRQYXRoSW5mbyhvYmplY3QsIHBhdGgpXG4gKlxuICogVGhpcyBhbGxvd3MgdGhlIHJldHJpZXZhbCBvZiBwcm9wZXJ0eSBpbmZvIGluIGFuXG4gKiBvYmplY3QgZ2l2ZW4gYSBzdHJpbmcgcGF0aC5cbiAqXG4gKiBUaGUgcGF0aCBpbmZvIGNvbnNpc3RzIG9mIGFuIG9iamVjdCB3aXRoIHRoZVxuICogZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKlxuICogKiBwYXJlbnQgLSBUaGUgcGFyZW50IG9iamVjdCBvZiB0aGUgcHJvcGVydHkgcmVmZXJlbmNlZCBieSBgcGF0aGBcbiAqICogbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBmaW5hbCBwcm9wZXJ0eSwgYSBudW1iZXIgaWYgaXQgd2FzIGFuIGFycmF5IGluZGV4ZXJcbiAqICogdmFsdWUgLSBUaGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5LCBpZiBpdCBleGlzdHMsIG90aGVyd2lzZSBgdW5kZWZpbmVkYFxuICogKiBleGlzdHMgLSBXaGV0aGVyIHRoZSBwcm9wZXJ0eSBleGlzdHMgb3Igbm90XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAqIEByZXR1cm5zIHtPYmplY3R9IGluZm9cbiAqIEBuYW1lc3BhY2UgVXRpbHNcbiAqIEBuYW1lIGdldFBhdGhJbmZvXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGdldFBhdGhJbmZvKG9iaiwgcGF0aCkge1xuICB2YXIgcGFyc2VkID0gcGFyc2VQYXRoKHBhdGgpO1xuICB2YXIgbGFzdCA9IHBhcnNlZFtwYXJzZWQubGVuZ3RoIC0gMV07XG4gIHZhciBpbmZvID0ge1xuICAgIHBhcmVudDogcGFyc2VkLmxlbmd0aCA+IDEgPyBpbnRlcm5hbEdldFBhdGhWYWx1ZShvYmosIHBhcnNlZCwgcGFyc2VkLmxlbmd0aCAtIDEpIDogb2JqLFxuICAgIG5hbWU6IGxhc3QucCB8fCBsYXN0LmksXG4gICAgdmFsdWU6IGludGVybmFsR2V0UGF0aFZhbHVlKG9iaiwgcGFyc2VkKSxcbiAgfTtcbiAgaW5mby5leGlzdHMgPSBoYXNQcm9wZXJ0eShpbmZvLnBhcmVudCwgaW5mby5uYW1lKTtcblxuICByZXR1cm4gaW5mbztcbn1cblxuLyoqXG4gKiAjIyMgLmdldFBhdGhWYWx1ZShvYmplY3QsIHBhdGgpXG4gKlxuICogVGhpcyBhbGxvd3MgdGhlIHJldHJpZXZhbCBvZiB2YWx1ZXMgaW4gYW5cbiAqIG9iamVjdCBnaXZlbiBhIHN0cmluZyBwYXRoLlxuICpcbiAqICAgICB2YXIgb2JqID0ge1xuICogICAgICAgICBwcm9wMToge1xuICogICAgICAgICAgICAgYXJyOiBbJ2EnLCAnYicsICdjJ11cbiAqICAgICAgICAgICAsIHN0cjogJ0hlbGxvJ1xuICogICAgICAgICB9XG4gKiAgICAgICAsIHByb3AyOiB7XG4gKiAgICAgICAgICAgICBhcnI6IFsgeyBuZXN0ZWQ6ICdVbml2ZXJzZScgfSBdXG4gKiAgICAgICAgICAgLCBzdHI6ICdIZWxsbyBhZ2FpbiEnXG4gKiAgICAgICAgIH1cbiAqICAgICB9XG4gKlxuICogVGhlIGZvbGxvd2luZyB3b3VsZCBiZSB0aGUgcmVzdWx0cy5cbiAqXG4gKiAgICAgZ2V0UGF0aFZhbHVlKG9iaiwgJ3Byb3AxLnN0cicpOyAvLyBIZWxsb1xuICogICAgIGdldFBhdGhWYWx1ZShvYmosICdwcm9wMS5hdHRbMl0nKTsgLy8gYlxuICogICAgIGdldFBhdGhWYWx1ZShvYmosICdwcm9wMi5hcnJbMF0ubmVzdGVkJyk7IC8vIFVuaXZlcnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAqIEByZXR1cm5zIHtPYmplY3R9IHZhbHVlIG9yIGB1bmRlZmluZWRgXG4gKiBAbmFtZXNwYWNlIFV0aWxzXG4gKiBAbmFtZSBnZXRQYXRoVmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZ2V0UGF0aFZhbHVlKG9iaiwgcGF0aCkge1xuICB2YXIgaW5mbyA9IGdldFBhdGhJbmZvKG9iaiwgcGF0aCk7XG4gIHJldHVybiBpbmZvLnZhbHVlO1xufVxuXG4vKipcbiAqICMjIyAuc2V0UGF0aFZhbHVlKG9iamVjdCwgcGF0aCwgdmFsdWUpXG4gKlxuICogRGVmaW5lIHRoZSB2YWx1ZSBpbiBhbiBvYmplY3QgYXQgYSBnaXZlbiBzdHJpbmcgcGF0aC5cbiAqXG4gKiBgYGBqc1xuICogdmFyIG9iaiA9IHtcbiAqICAgICBwcm9wMToge1xuICogICAgICAgICBhcnI6IFsnYScsICdiJywgJ2MnXVxuICogICAgICAgLCBzdHI6ICdIZWxsbydcbiAqICAgICB9XG4gKiAgICwgcHJvcDI6IHtcbiAqICAgICAgICAgYXJyOiBbIHsgbmVzdGVkOiAnVW5pdmVyc2UnIH0gXVxuICogICAgICAgLCBzdHI6ICdIZWxsbyBhZ2FpbiEnXG4gKiAgICAgfVxuICogfTtcbiAqIGBgYFxuICpcbiAqIFRoZSBmb2xsb3dpbmcgd291bGQgYmUgYWNjZXB0YWJsZS5cbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb3BlcnRpZXMgPSByZXF1aXJlKCd0ZWEtcHJvcGVydGllcycpO1xuICogcHJvcGVydGllcy5zZXQob2JqLCAncHJvcDEuc3RyJywgJ0hlbGxvIFVuaXZlcnNlIScpO1xuICogcHJvcGVydGllcy5zZXQob2JqLCAncHJvcDEuYXJyWzJdJywgJ0InKTtcbiAqIHByb3BlcnRpZXMuc2V0KG9iaiwgJ3Byb3AyLmFyclswXS5uZXN0ZWQudmFsdWUnLCB7IGhlbGxvOiAndW5pdmVyc2UnIH0pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZXRQYXRoVmFsdWUob2JqLCBwYXRoLCB2YWwpIHtcbiAgdmFyIHBhcnNlZCA9IHBhcnNlUGF0aChwYXRoKTtcbiAgaW50ZXJuYWxTZXRQYXRoVmFsdWUob2JqLCB2YWwsIHBhcnNlZCk7XG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoYXNQcm9wZXJ0eTogaGFzUHJvcGVydHksXG4gIGdldFBhdGhJbmZvOiBnZXRQYXRoSW5mbyxcbiAgZ2V0UGF0aFZhbHVlOiBnZXRQYXRoVmFsdWUsXG4gIHNldFBhdGhWYWx1ZTogc2V0UGF0aFZhbHVlLFxufTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcblx0KGdsb2JhbC50eXBlRGV0ZWN0ID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4vKiAhXG4gKiB0eXBlLWRldGVjdFxuICogQ29weXJpZ2h0KGMpIDIwMTMgamFrZSBsdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xudmFyIHByb21pc2VFeGlzdHMgPSB0eXBlb2YgUHJvbWlzZSA9PT0gJ2Z1bmN0aW9uJztcblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbnZhciBnbG9iYWxPYmplY3QgPSB0eXBlb2Ygc2VsZiA9PT0gJ29iamVjdCcgPyBzZWxmIDogZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGlkLWJsYWNrbGlzdFxuXG52YXIgc3ltYm9sRXhpc3RzID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgbWFwRXhpc3RzID0gdHlwZW9mIE1hcCAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgc2V0RXhpc3RzID0gdHlwZW9mIFNldCAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgd2Vha01hcEV4aXN0cyA9IHR5cGVvZiBXZWFrTWFwICE9PSAndW5kZWZpbmVkJztcbnZhciB3ZWFrU2V0RXhpc3RzID0gdHlwZW9mIFdlYWtTZXQgIT09ICd1bmRlZmluZWQnO1xudmFyIGRhdGFWaWV3RXhpc3RzID0gdHlwZW9mIERhdGFWaWV3ICE9PSAndW5kZWZpbmVkJztcbnZhciBzeW1ib2xJdGVyYXRvckV4aXN0cyA9IHN5bWJvbEV4aXN0cyAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yICE9PSAndW5kZWZpbmVkJztcbnZhciBzeW1ib2xUb1N0cmluZ1RhZ0V4aXN0cyA9IHN5bWJvbEV4aXN0cyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnICE9PSAndW5kZWZpbmVkJztcbnZhciBzZXRFbnRyaWVzRXhpc3RzID0gc2V0RXhpc3RzICYmIHR5cGVvZiBTZXQucHJvdG90eXBlLmVudHJpZXMgPT09ICdmdW5jdGlvbic7XG52YXIgbWFwRW50cmllc0V4aXN0cyA9IG1hcEV4aXN0cyAmJiB0eXBlb2YgTWFwLnByb3RvdHlwZS5lbnRyaWVzID09PSAnZnVuY3Rpb24nO1xudmFyIHNldEl0ZXJhdG9yUHJvdG90eXBlID0gc2V0RW50cmllc0V4aXN0cyAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IFNldCgpLmVudHJpZXMoKSk7XG52YXIgbWFwSXRlcmF0b3JQcm90b3R5cGUgPSBtYXBFbnRyaWVzRXhpc3RzICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXcgTWFwKCkuZW50cmllcygpKTtcbnZhciBhcnJheUl0ZXJhdG9yRXhpc3RzID0gc3ltYm9sSXRlcmF0b3JFeGlzdHMgJiYgdHlwZW9mIEFycmF5LnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nO1xudmFyIGFycmF5SXRlcmF0b3JQcm90b3R5cGUgPSBhcnJheUl0ZXJhdG9yRXhpc3RzICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihbXVtTeW1ib2wuaXRlcmF0b3JdKCkpO1xudmFyIHN0cmluZ0l0ZXJhdG9yRXhpc3RzID0gc3ltYm9sSXRlcmF0b3JFeGlzdHMgJiYgdHlwZW9mIFN0cmluZy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJztcbnZhciBzdHJpbmdJdGVyYXRvclByb3RvdHlwZSA9IHN0cmluZ0l0ZXJhdG9yRXhpc3RzICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZignJ1tTeW1ib2wuaXRlcmF0b3JdKCkpO1xudmFyIHRvU3RyaW5nTGVmdFNsaWNlTGVuZ3RoID0gODtcbnZhciB0b1N0cmluZ1JpZ2h0U2xpY2VMZW5ndGggPSAtMTtcbi8qKlxuICogIyMjIHR5cGVPZiAob2JqKVxuICpcbiAqIFVzZXMgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgIHRvIGRldGVybWluZSB0aGUgdHlwZSBvZiBhbiBvYmplY3QsXG4gKiBub3JtYWxpc2luZyBiZWhhdmlvdXIgYWNyb3NzIGVuZ2luZSB2ZXJzaW9ucyAmIHdlbGwgb3B0aW1pc2VkLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IG9iamVjdFxuICogQHJldHVybiB7U3RyaW5nfSBvYmplY3QgdHlwZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gdHlwZURldGVjdChvYmopIHtcbiAgLyogISBTcGVlZCBvcHRpbWlzYXRpb25cbiAgICogUHJlOlxuICAgKiAgIHN0cmluZyBsaXRlcmFsICAgICB4IDMsMDM5LDAzNSBvcHMvc2VjIMKxMS42MiUgKDc4IHJ1bnMgc2FtcGxlZClcbiAgICogICBib29sZWFuIGxpdGVyYWwgICAgeCAxLDQyNCwxMzggb3BzL3NlYyDCsTQuNTQlICg3NSBydW5zIHNhbXBsZWQpXG4gICAqICAgbnVtYmVyIGxpdGVyYWwgICAgIHggMSw2NTMsMTUzIG9wcy9zZWMgwrExLjkxJSAoODIgcnVucyBzYW1wbGVkKVxuICAgKiAgIHVuZGVmaW5lZCAgICAgICAgICB4IDksOTc4LDY2MCBvcHMvc2VjIMKxMS45MiUgKDc1IHJ1bnMgc2FtcGxlZClcbiAgICogICBmdW5jdGlvbiAgICAgICAgICAgeCAyLDU1Niw3Njkgb3BzL3NlYyDCsTEuNzMlICg3NyBydW5zIHNhbXBsZWQpXG4gICAqIFBvc3Q6XG4gICAqICAgc3RyaW5nIGxpdGVyYWwgICAgIHggMzgsNTY0LDc5NiBvcHMvc2VjIMKxMS4xNSUgKDc5IHJ1bnMgc2FtcGxlZClcbiAgICogICBib29sZWFuIGxpdGVyYWwgICAgeCAzMSwxNDgsOTQwIG9wcy9zZWMgwrExLjEwJSAoNzkgcnVucyBzYW1wbGVkKVxuICAgKiAgIG51bWJlciBsaXRlcmFsICAgICB4IDMyLDY3OSwzMzAgb3BzL3NlYyDCsTEuOTAlICg3OCBydW5zIHNhbXBsZWQpXG4gICAqICAgdW5kZWZpbmVkICAgICAgICAgIHggMzIsMzYzLDM2OCBvcHMvc2VjIMKxMS4wNyUgKDgyIHJ1bnMgc2FtcGxlZClcbiAgICogICBmdW5jdGlvbiAgICAgICAgICAgeCAzMSwyOTYsODcwIG9wcy9zZWMgwrEwLjk2JSAoODMgcnVucyBzYW1wbGVkKVxuICAgKi9cbiAgdmFyIHR5cGVvZk9iaiA9IHR5cGVvZiBvYmo7XG4gIGlmICh0eXBlb2ZPYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHR5cGVvZk9iajtcbiAgfVxuXG4gIC8qICEgU3BlZWQgb3B0aW1pc2F0aW9uXG4gICAqIFByZTpcbiAgICogICBudWxsICAgICAgICAgICAgICAgeCAyOCw2NDUsNzY1IG9wcy9zZWMgwrExLjE3JSAoODIgcnVucyBzYW1wbGVkKVxuICAgKiBQb3N0OlxuICAgKiAgIG51bGwgICAgICAgICAgICAgICB4IDM2LDQyOCw5NjIgb3BzL3NlYyDCsTEuMzclICg4NCBydW5zIHNhbXBsZWQpXG4gICAqL1xuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgcmV0dXJuICdudWxsJztcbiAgfVxuXG4gIC8qICEgU3BlYyBDb25mb3JtYW5jZVxuICAgKiBUZXN0OiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHdpbmRvdylgYFxuICAgKiAgLSBOb2RlID09PSBcIltvYmplY3QgZ2xvYmFsXVwiXG4gICAqICAtIENocm9tZSA9PT0gXCJbb2JqZWN0IGdsb2JhbF1cIlxuICAgKiAgLSBGaXJlZm94ID09PSBcIltvYmplY3QgV2luZG93XVwiXG4gICAqICAtIFBoYW50b21KUyA9PT0gXCJbb2JqZWN0IFdpbmRvd11cIlxuICAgKiAgLSBTYWZhcmkgPT09IFwiW29iamVjdCBXaW5kb3ddXCJcbiAgICogIC0gSUUgMTEgPT09IFwiW29iamVjdCBXaW5kb3ddXCJcbiAgICogIC0gSUUgRWRnZSA9PT0gXCJbb2JqZWN0IFdpbmRvd11cIlxuICAgKiBUZXN0OiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMpYGBcbiAgICogIC0gQ2hyb21lIFdvcmtlciA9PT0gXCJbb2JqZWN0IGdsb2JhbF1cIlxuICAgKiAgLSBGaXJlZm94IFdvcmtlciA9PT0gXCJbb2JqZWN0IERlZGljYXRlZFdvcmtlckdsb2JhbFNjb3BlXVwiXG4gICAqICAtIFNhZmFyaSBXb3JrZXIgPT09IFwiW29iamVjdCBEZWRpY2F0ZWRXb3JrZXJHbG9iYWxTY29wZV1cIlxuICAgKiAgLSBJRSAxMSBXb3JrZXIgPT09IFwiW29iamVjdCBXb3JrZXJHbG9iYWxTY29wZV1cIlxuICAgKiAgLSBJRSBFZGdlIFdvcmtlciA9PT0gXCJbb2JqZWN0IFdvcmtlckdsb2JhbFNjb3BlXVwiXG4gICAqL1xuICBpZiAob2JqID09PSBnbG9iYWxPYmplY3QpIHtcbiAgICByZXR1cm4gJ2dsb2JhbCc7XG4gIH1cblxuICAvKiAhIFNwZWVkIG9wdGltaXNhdGlvblxuICAgKiBQcmU6XG4gICAqICAgYXJyYXkgbGl0ZXJhbCAgICAgIHggMiw4ODgsMzUyIG9wcy9zZWMgwrEwLjY3JSAoODIgcnVucyBzYW1wbGVkKVxuICAgKiBQb3N0OlxuICAgKiAgIGFycmF5IGxpdGVyYWwgICAgICB4IDIyLDQ3OSw2NTAgb3BzL3NlYyDCsTAuOTYlICg4MSBydW5zIHNhbXBsZWQpXG4gICAqL1xuICBpZiAoXG4gICAgQXJyYXkuaXNBcnJheShvYmopICYmXG4gICAgKHN5bWJvbFRvU3RyaW5nVGFnRXhpc3RzID09PSBmYWxzZSB8fCAhKFN5bWJvbC50b1N0cmluZ1RhZyBpbiBvYmopKVxuICApIHtcbiAgICByZXR1cm4gJ0FycmF5JztcbiAgfVxuXG4gIC8vIE5vdCBjYWNoaW5nIGV4aXN0ZW5jZSBvZiBgd2luZG93YCBhbmQgcmVsYXRlZCBwcm9wZXJ0aWVzIGR1ZSB0byBwb3RlbnRpYWxcbiAgLy8gZm9yIGB3aW5kb3dgIHRvIGJlIHVuc2V0IGJlZm9yZSB0ZXN0cyBpbiBxdWFzaS1icm93c2VyIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdyAhPT0gbnVsbCkge1xuICAgIC8qICEgU3BlYyBDb25mb3JtYW5jZVxuICAgICAqIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9icm93c2Vycy5odG1sI2xvY2F0aW9uKVxuICAgICAqIFdoYXRXRyBIVE1MJDcuNy4zIC0gVGhlIGBMb2NhdGlvbmAgaW50ZXJmYWNlXG4gICAgICogVGVzdDogYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aW5kb3cubG9jYXRpb24pYGBcbiAgICAgKiAgLSBJRSA8PTExID09PSBcIltvYmplY3QgT2JqZWN0XVwiXG4gICAgICogIC0gSUUgRWRnZSA8PTEzID09PSBcIltvYmplY3QgT2JqZWN0XVwiXG4gICAgICovXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cubG9jYXRpb24gPT09ICdvYmplY3QnICYmIG9iaiA9PT0gd2luZG93LmxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gJ0xvY2F0aW9uJztcbiAgICB9XG5cbiAgICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICAgKiAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jZG9jdW1lbnQpXG4gICAgICogV2hhdFdHIEhUTUwkMy4xLjEgLSBUaGUgYERvY3VtZW50YCBvYmplY3RcbiAgICAgKiBOb3RlOiBNb3N0IGJyb3dzZXJzIGN1cnJlbnRseSBhZGhlciB0byB0aGUgVzNDIERPTSBMZXZlbCAyIHNwZWNcbiAgICAgKiAgICAgICAoaHR0cHM6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0yLUhUTUwvaHRtbC5odG1sI0lELTI2ODA5MjY4KVxuICAgICAqICAgICAgIHdoaWNoIHN1Z2dlc3RzIHRoYXQgYnJvd3NlcnMgc2hvdWxkIHVzZSBIVE1MVGFibGVDZWxsRWxlbWVudCBmb3JcbiAgICAgKiAgICAgICBib3RoIFREIGFuZCBUSCBlbGVtZW50cy4gV2hhdFdHIHNlcGFyYXRlcyB0aGVzZS5cbiAgICAgKiAgICAgICBXaGF0V0cgSFRNTCBzdGF0ZXM6XG4gICAgICogICAgICAgICA+IEZvciBoaXN0b3JpY2FsIHJlYXNvbnMsIFdpbmRvdyBvYmplY3RzIG11c3QgYWxzbyBoYXZlIGFcbiAgICAgKiAgICAgICAgID4gd3JpdGFibGUsIGNvbmZpZ3VyYWJsZSwgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgbmFtZWRcbiAgICAgKiAgICAgICAgID4gSFRNTERvY3VtZW50IHdob3NlIHZhbHVlIGlzIHRoZSBEb2N1bWVudCBpbnRlcmZhY2Ugb2JqZWN0LlxuICAgICAqIFRlc3Q6IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZG9jdW1lbnQpYGBcbiAgICAgKiAgLSBDaHJvbWUgPT09IFwiW29iamVjdCBIVE1MRG9jdW1lbnRdXCJcbiAgICAgKiAgLSBGaXJlZm94ID09PSBcIltvYmplY3QgSFRNTERvY3VtZW50XVwiXG4gICAgICogIC0gU2FmYXJpID09PSBcIltvYmplY3QgSFRNTERvY3VtZW50XVwiXG4gICAgICogIC0gSUUgPD0xMCA9PT0gXCJbb2JqZWN0IERvY3VtZW50XVwiXG4gICAgICogIC0gSUUgMTEgPT09IFwiW29iamVjdCBIVE1MRG9jdW1lbnRdXCJcbiAgICAgKiAgLSBJRSBFZGdlIDw9MTMgPT09IFwiW29iamVjdCBIVE1MRG9jdW1lbnRdXCJcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIHdpbmRvdy5kb2N1bWVudCA9PT0gJ29iamVjdCcgJiYgb2JqID09PSB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHJldHVybiAnRG9jdW1lbnQnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygd2luZG93Lm5hdmlnYXRvciA9PT0gJ29iamVjdCcpIHtcbiAgICAgIC8qICEgU3BlYyBDb25mb3JtYW5jZVxuICAgICAgICogKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3dlYmFwcGFwaXMuaHRtbCNtaW1ldHlwZWFycmF5KVxuICAgICAgICogV2hhdFdHIEhUTUwkOC42LjEuNSAtIFBsdWdpbnMgLSBJbnRlcmZhY2UgTWltZVR5cGVBcnJheVxuICAgICAgICogVGVzdDogYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuYXZpZ2F0b3IubWltZVR5cGVzKWBgXG4gICAgICAgKiAgLSBJRSA8PTEwID09PSBcIltvYmplY3QgTVNNaW1lVHlwZXNDb2xsZWN0aW9uXVwiXG4gICAgICAgKi9cbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Lm5hdmlnYXRvci5taW1lVHlwZXMgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgb2JqID09PSB3aW5kb3cubmF2aWdhdG9yLm1pbWVUeXBlcykge1xuICAgICAgICByZXR1cm4gJ01pbWVUeXBlQXJyYXknO1xuICAgICAgfVxuXG4gICAgICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICAgICAqIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS93ZWJhcHBhcGlzLmh0bWwjcGx1Z2luYXJyYXkpXG4gICAgICAgKiBXaGF0V0cgSFRNTCQ4LjYuMS41IC0gUGx1Z2lucyAtIEludGVyZmFjZSBQbHVnaW5BcnJheVxuICAgICAgICogVGVzdDogYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuYXZpZ2F0b3IucGx1Z2lucylgYFxuICAgICAgICogIC0gSUUgPD0xMCA9PT0gXCJbb2JqZWN0IE1TUGx1Z2luc0NvbGxlY3Rpb25dXCJcbiAgICAgICAqL1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cubmF2aWdhdG9yLnBsdWdpbnMgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgb2JqID09PSB3aW5kb3cubmF2aWdhdG9yLnBsdWdpbnMpIHtcbiAgICAgICAgcmV0dXJuICdQbHVnaW5BcnJheSc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCh0eXBlb2Ygd2luZG93LkhUTUxFbGVtZW50ID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgIHR5cGVvZiB3aW5kb3cuSFRNTEVsZW1lbnQgPT09ICdvYmplY3QnKSAmJlxuICAgICAgICBvYmogaW5zdGFuY2VvZiB3aW5kb3cuSFRNTEVsZW1lbnQpIHtcbiAgICAgIC8qICEgU3BlYyBDb25mb3JtYW5jZVxuICAgICAgKiAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvd2ViYXBwYXBpcy5odG1sI3BsdWdpbmFycmF5KVxuICAgICAgKiBXaGF0V0cgSFRNTCQ0LjQuNCAtIFRoZSBgYmxvY2txdW90ZWAgZWxlbWVudCAtIEludGVyZmFjZSBgSFRNTFF1b3RlRWxlbWVudGBcbiAgICAgICogVGVzdDogYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdibG9ja3F1b3RlJykpYGBcbiAgICAgICogIC0gSUUgPD0xMCA9PT0gXCJbb2JqZWN0IEhUTUxCbG9ja0VsZW1lbnRdXCJcbiAgICAgICovXG4gICAgICBpZiAob2JqLnRhZ05hbWUgPT09ICdCTE9DS1FVT1RFJykge1xuICAgICAgICByZXR1cm4gJ0hUTUxRdW90ZUVsZW1lbnQnO1xuICAgICAgfVxuXG4gICAgICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICAgICAqIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnLyNodG1sdGFibGVkYXRhY2VsbGVsZW1lbnQpXG4gICAgICAgKiBXaGF0V0cgSFRNTCQ0LjkuOSAtIFRoZSBgdGRgIGVsZW1lbnQgLSBJbnRlcmZhY2UgYEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudGBcbiAgICAgICAqIE5vdGU6IE1vc3QgYnJvd3NlcnMgY3VycmVudGx5IGFkaGVyIHRvIHRoZSBXM0MgRE9NIExldmVsIDIgc3BlY1xuICAgICAgICogICAgICAgKGh0dHBzOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMi1IVE1ML2h0bWwuaHRtbCNJRC04MjkxNTA3NSlcbiAgICAgICAqICAgICAgIHdoaWNoIHN1Z2dlc3RzIHRoYXQgYnJvd3NlcnMgc2hvdWxkIHVzZSBIVE1MVGFibGVDZWxsRWxlbWVudCBmb3JcbiAgICAgICAqICAgICAgIGJvdGggVEQgYW5kIFRIIGVsZW1lbnRzLiBXaGF0V0cgc2VwYXJhdGVzIHRoZXNlLlxuICAgICAgICogVGVzdDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpXG4gICAgICAgKiAgLSBDaHJvbWUgPT09IFwiW29iamVjdCBIVE1MVGFibGVDZWxsRWxlbWVudF1cIlxuICAgICAgICogIC0gRmlyZWZveCA9PT0gXCJbb2JqZWN0IEhUTUxUYWJsZUNlbGxFbGVtZW50XVwiXG4gICAgICAgKiAgLSBTYWZhcmkgPT09IFwiW29iamVjdCBIVE1MVGFibGVDZWxsRWxlbWVudF1cIlxuICAgICAgICovXG4gICAgICBpZiAob2JqLnRhZ05hbWUgPT09ICdURCcpIHtcbiAgICAgICAgcmV0dXJuICdIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQnO1xuICAgICAgfVxuXG4gICAgICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICAgICAqIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnLyNodG1sdGFibGVoZWFkZXJjZWxsZWxlbWVudClcbiAgICAgICAqIFdoYXRXRyBIVE1MJDQuOS45IC0gVGhlIGB0ZGAgZWxlbWVudCAtIEludGVyZmFjZSBgSFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnRgXG4gICAgICAgKiBOb3RlOiBNb3N0IGJyb3dzZXJzIGN1cnJlbnRseSBhZGhlciB0byB0aGUgVzNDIERPTSBMZXZlbCAyIHNwZWNcbiAgICAgICAqICAgICAgIChodHRwczovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTItSFRNTC9odG1sLmh0bWwjSUQtODI5MTUwNzUpXG4gICAgICAgKiAgICAgICB3aGljaCBzdWdnZXN0cyB0aGF0IGJyb3dzZXJzIHNob3VsZCB1c2UgSFRNTFRhYmxlQ2VsbEVsZW1lbnQgZm9yXG4gICAgICAgKiAgICAgICBib3RoIFREIGFuZCBUSCBlbGVtZW50cy4gV2hhdFdHIHNlcGFyYXRlcyB0aGVzZS5cbiAgICAgICAqIFRlc3Q6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpKVxuICAgICAgICogIC0gQ2hyb21lID09PSBcIltvYmplY3QgSFRNTFRhYmxlQ2VsbEVsZW1lbnRdXCJcbiAgICAgICAqICAtIEZpcmVmb3ggPT09IFwiW29iamVjdCBIVE1MVGFibGVDZWxsRWxlbWVudF1cIlxuICAgICAgICogIC0gU2FmYXJpID09PSBcIltvYmplY3QgSFRNTFRhYmxlQ2VsbEVsZW1lbnRdXCJcbiAgICAgICAqL1xuICAgICAgaWYgKG9iai50YWdOYW1lID09PSAnVEgnKSB7XG4gICAgICAgIHJldHVybiAnSFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnQnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qICEgU3BlZWQgb3B0aW1pc2F0aW9uXG4gICogUHJlOlxuICAqICAgRmxvYXQ2NEFycmF5ICAgICAgIHggNjI1LDY0NCBvcHMvc2VjIMKxMS41OCUgKDgwIHJ1bnMgc2FtcGxlZClcbiAgKiAgIEZsb2F0MzJBcnJheSAgICAgICB4IDEsMjc5LDg1MiBvcHMvc2VjIMKxMi45MSUgKDc3IHJ1bnMgc2FtcGxlZClcbiAgKiAgIFVpbnQzMkFycmF5ICAgICAgICB4IDEsMTc4LDE4NSBvcHMvc2VjIMKxMS45NSUgKDgzIHJ1bnMgc2FtcGxlZClcbiAgKiAgIFVpbnQxNkFycmF5ICAgICAgICB4IDEsMDA4LDM4MCBvcHMvc2VjIMKxMi4yNSUgKDgwIHJ1bnMgc2FtcGxlZClcbiAgKiAgIFVpbnQ4QXJyYXkgICAgICAgICB4IDEsMTI4LDA0MCBvcHMvc2VjIMKxMi4xMSUgKDgxIHJ1bnMgc2FtcGxlZClcbiAgKiAgIEludDMyQXJyYXkgICAgICAgICB4IDEsMTcwLDExOSBvcHMvc2VjIMKxMi44OCUgKDgwIHJ1bnMgc2FtcGxlZClcbiAgKiAgIEludDE2QXJyYXkgICAgICAgICB4IDEsMTc2LDM0OCBvcHMvc2VjIMKxNS43OSUgKDg2IHJ1bnMgc2FtcGxlZClcbiAgKiAgIEludDhBcnJheSAgICAgICAgICB4IDEsMDU4LDcwNyBvcHMvc2VjIMKxNC45NCUgKDc3IHJ1bnMgc2FtcGxlZClcbiAgKiAgIFVpbnQ4Q2xhbXBlZEFycmF5ICB4IDEsMTEwLDYzMyBvcHMvc2VjIMKxNC4yMCUgKDgwIHJ1bnMgc2FtcGxlZClcbiAgKiBQb3N0OlxuICAqICAgRmxvYXQ2NEFycmF5ICAgICAgIHggNywxMDUsNjcxIG9wcy9zZWMgwrExMy40NyUgKDY0IHJ1bnMgc2FtcGxlZClcbiAgKiAgIEZsb2F0MzJBcnJheSAgICAgICB4IDUsODg3LDkxMiBvcHMvc2VjIMKxMS40NiUgKDgyIHJ1bnMgc2FtcGxlZClcbiAgKiAgIFVpbnQzMkFycmF5ICAgICAgICB4IDYsNDkxLDY2MSBvcHMvc2VjIMKxMS43NiUgKDc5IHJ1bnMgc2FtcGxlZClcbiAgKiAgIFVpbnQxNkFycmF5ICAgICAgICB4IDYsNTU5LDc5NSBvcHMvc2VjIMKxMS42NyUgKDgyIHJ1bnMgc2FtcGxlZClcbiAgKiAgIFVpbnQ4QXJyYXkgICAgICAgICB4IDYsNDYzLDk2NiBvcHMvc2VjIMKxMS40MyUgKDg1IHJ1bnMgc2FtcGxlZClcbiAgKiAgIEludDMyQXJyYXkgICAgICAgICB4IDUsNjQxLDg0MSBvcHMvc2VjIMKxMy40OSUgKDgxIHJ1bnMgc2FtcGxlZClcbiAgKiAgIEludDE2QXJyYXkgICAgICAgICB4IDYsNTgzLDUxMSBvcHMvc2VjIMKxMS45OCUgKDgwIHJ1bnMgc2FtcGxlZClcbiAgKiAgIEludDhBcnJheSAgICAgICAgICB4IDYsNjA2LDA3OCBvcHMvc2VjIMKxMS43NCUgKDgxIHJ1bnMgc2FtcGxlZClcbiAgKiAgIFVpbnQ4Q2xhbXBlZEFycmF5ICB4IDYsNjAyLDIyNCBvcHMvc2VjIMKxMS43NyUgKDgzIHJ1bnMgc2FtcGxlZClcbiAgKi9cbiAgdmFyIHN0cmluZ1RhZyA9IChzeW1ib2xUb1N0cmluZ1RhZ0V4aXN0cyAmJiBvYmpbU3ltYm9sLnRvU3RyaW5nVGFnXSk7XG4gIGlmICh0eXBlb2Ygc3RyaW5nVGFnID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBzdHJpbmdUYWc7XG4gIH1cblxuICB2YXIgb2JqUHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gIC8qICEgU3BlZWQgb3B0aW1pc2F0aW9uXG4gICogUHJlOlxuICAqICAgcmVnZXggbGl0ZXJhbCAgICAgIHggMSw3NzIsMzg1IG9wcy9zZWMgwrExLjg1JSAoNzcgcnVucyBzYW1wbGVkKVxuICAqICAgcmVnZXggY29uc3RydWN0b3IgIHggMiwxNDMsNjM0IG9wcy9zZWMgwrEyLjQ2JSAoNzggcnVucyBzYW1wbGVkKVxuICAqIFBvc3Q6XG4gICogICByZWdleCBsaXRlcmFsICAgICAgeCAzLDkyOCwwMDkgb3BzL3NlYyDCsTAuNjUlICg3OCBydW5zIHNhbXBsZWQpXG4gICogICByZWdleCBjb25zdHJ1Y3RvciAgeCAzLDkzMSwxMDggb3BzL3NlYyDCsTAuNTglICg4NCBydW5zIHNhbXBsZWQpXG4gICovXG4gIGlmIChvYmpQcm90b3R5cGUgPT09IFJlZ0V4cC5wcm90b3R5cGUpIHtcbiAgICByZXR1cm4gJ1JlZ0V4cCc7XG4gIH1cblxuICAvKiAhIFNwZWVkIG9wdGltaXNhdGlvblxuICAqIFByZTpcbiAgKiAgIGRhdGUgICAgICAgICAgICAgICB4IDIsMTMwLDA3NCBvcHMvc2VjIMKxNC40MiUgKDY4IHJ1bnMgc2FtcGxlZClcbiAgKiBQb3N0OlxuICAqICAgZGF0ZSAgICAgICAgICAgICAgIHggMyw5NTMsNzc5IG9wcy9zZWMgwrExLjM1JSAoNzcgcnVucyBzYW1wbGVkKVxuICAqL1xuICBpZiAob2JqUHJvdG90eXBlID09PSBEYXRlLnByb3RvdHlwZSkge1xuICAgIHJldHVybiAnRGF0ZSc7XG4gIH1cblxuICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICogKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvaW5kZXguaHRtbCNzZWMtcHJvbWlzZS5wcm90b3R5cGUtQEB0b3N0cmluZ3RhZylcbiAgICogRVM2JDI1LjQuNS40IC0gUHJvbWlzZS5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gc2hvdWxkIGJlIFwiUHJvbWlzZVwiOlxuICAgKiBUZXN0OiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFByb21pc2UucmVzb2x2ZSgpKWBgXG4gICAqICAtIENocm9tZSA8PTQ3ID09PSBcIltvYmplY3QgT2JqZWN0XVwiXG4gICAqICAtIEVkZ2UgPD0yMCA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxuICAgKiAgLSBGaXJlZm94IDI5LUxhdGVzdCA9PT0gXCJbb2JqZWN0IFByb21pc2VdXCJcbiAgICogIC0gU2FmYXJpIDcuMS1MYXRlc3QgPT09IFwiW29iamVjdCBQcm9taXNlXVwiXG4gICAqL1xuICBpZiAocHJvbWlzZUV4aXN0cyAmJiBvYmpQcm90b3R5cGUgPT09IFByb21pc2UucHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdQcm9taXNlJztcbiAgfVxuXG4gIC8qICEgU3BlZWQgb3B0aW1pc2F0aW9uXG4gICogUHJlOlxuICAqICAgc2V0ICAgICAgICAgICAgICAgIHggMiwyMjIsMTg2IG9wcy9zZWMgwrExLjMxJSAoODIgcnVucyBzYW1wbGVkKVxuICAqIFBvc3Q6XG4gICogICBzZXQgICAgICAgICAgICAgICAgeCA0LDU0NSw4Nzkgb3BzL3NlYyDCsTEuMTMlICg4MyBydW5zIHNhbXBsZWQpXG4gICovXG4gIGlmIChzZXRFeGlzdHMgJiYgb2JqUHJvdG90eXBlID09PSBTZXQucHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdTZXQnO1xuICB9XG5cbiAgLyogISBTcGVlZCBvcHRpbWlzYXRpb25cbiAgKiBQcmU6XG4gICogICBtYXAgICAgICAgICAgICAgICAgeCAyLDM5Niw4NDIgb3BzL3NlYyDCsTEuNTklICg4MSBydW5zIHNhbXBsZWQpXG4gICogUG9zdDpcbiAgKiAgIG1hcCAgICAgICAgICAgICAgICB4IDQsMTgzLDk0NSBvcHMvc2VjIMKxNi41OSUgKDgyIHJ1bnMgc2FtcGxlZClcbiAgKi9cbiAgaWYgKG1hcEV4aXN0cyAmJiBvYmpQcm90b3R5cGUgPT09IE1hcC5wcm90b3R5cGUpIHtcbiAgICByZXR1cm4gJ01hcCc7XG4gIH1cblxuICAvKiAhIFNwZWVkIG9wdGltaXNhdGlvblxuICAqIFByZTpcbiAgKiAgIHdlYWtzZXQgICAgICAgICAgICB4IDEsMzIzLDIyMCBvcHMvc2VjIMKxMi4xNyUgKDc2IHJ1bnMgc2FtcGxlZClcbiAgKiBQb3N0OlxuICAqICAgd2Vha3NldCAgICAgICAgICAgIHggNCwyMzcsNTEwIG9wcy9zZWMgwrEyLjAxJSAoNzcgcnVucyBzYW1wbGVkKVxuICAqL1xuICBpZiAod2Vha1NldEV4aXN0cyAmJiBvYmpQcm90b3R5cGUgPT09IFdlYWtTZXQucHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdXZWFrU2V0JztcbiAgfVxuXG4gIC8qICEgU3BlZWQgb3B0aW1pc2F0aW9uXG4gICogUHJlOlxuICAqICAgd2Vha21hcCAgICAgICAgICAgIHggMSw1MDAsMjYwIG9wcy9zZWMgwrEyLjAyJSAoNzggcnVucyBzYW1wbGVkKVxuICAqIFBvc3Q6XG4gICogICB3ZWFrbWFwICAgICAgICAgICAgeCAzLDg4MSwzODQgb3BzL3NlYyDCsTEuNDUlICg4MiBydW5zIHNhbXBsZWQpXG4gICovXG4gIGlmICh3ZWFrTWFwRXhpc3RzICYmIG9ialByb3RvdHlwZSA9PT0gV2Vha01hcC5wcm90b3R5cGUpIHtcbiAgICByZXR1cm4gJ1dlYWtNYXAnO1xuICB9XG5cbiAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAqIChodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wL2luZGV4Lmh0bWwjc2VjLWRhdGF2aWV3LnByb3RvdHlwZS1AQHRvc3RyaW5ndGFnKVxuICAgKiBFUzYkMjQuMi40LjIxIC0gRGF0YVZpZXcucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddIHNob3VsZCBiZSBcIkRhdGFWaWV3XCI6XG4gICAqIFRlc3Q6IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpYGBcbiAgICogIC0gRWRnZSA8PTEzID09PSBcIltvYmplY3QgT2JqZWN0XVwiXG4gICAqL1xuICBpZiAoZGF0YVZpZXdFeGlzdHMgJiYgb2JqUHJvdG90eXBlID09PSBEYXRhVmlldy5wcm90b3R5cGUpIHtcbiAgICByZXR1cm4gJ0RhdGFWaWV3JztcbiAgfVxuXG4gIC8qICEgU3BlYyBDb25mb3JtYW5jZVxuICAgKiAoaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC9pbmRleC5odG1sI3NlYy0lbWFwaXRlcmF0b3Jwcm90b3R5cGUlLUBAdG9zdHJpbmd0YWcpXG4gICAqIEVTNiQyMy4xLjUuMi4yIC0gJU1hcEl0ZXJhdG9yUHJvdG90eXBlJVtAQHRvU3RyaW5nVGFnXSBzaG91bGQgYmUgXCJNYXAgSXRlcmF0b3JcIjpcbiAgICogVGVzdDogYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuZXcgTWFwKCkuZW50cmllcygpKWBgXG4gICAqICAtIEVkZ2UgPD0xMyA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxuICAgKi9cbiAgaWYgKG1hcEV4aXN0cyAmJiBvYmpQcm90b3R5cGUgPT09IG1hcEl0ZXJhdG9yUHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdNYXAgSXRlcmF0b3InO1xuICB9XG5cbiAgLyogISBTcGVjIENvbmZvcm1hbmNlXG4gICAqIChodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wL2luZGV4Lmh0bWwjc2VjLSVzZXRpdGVyYXRvcnByb3RvdHlwZSUtQEB0b3N0cmluZ3RhZylcbiAgICogRVM2JDIzLjIuNS4yLjIgLSAlU2V0SXRlcmF0b3JQcm90b3R5cGUlW0BAdG9TdHJpbmdUYWddIHNob3VsZCBiZSBcIlNldCBJdGVyYXRvclwiOlxuICAgKiBUZXN0OiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5ldyBTZXQoKS5lbnRyaWVzKCkpYGBcbiAgICogIC0gRWRnZSA8PTEzID09PSBcIltvYmplY3QgT2JqZWN0XVwiXG4gICAqL1xuICBpZiAoc2V0RXhpc3RzICYmIG9ialByb3RvdHlwZSA9PT0gc2V0SXRlcmF0b3JQcm90b3R5cGUpIHtcbiAgICByZXR1cm4gJ1NldCBJdGVyYXRvcic7XG4gIH1cblxuICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICogKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvaW5kZXguaHRtbCNzZWMtJWFycmF5aXRlcmF0b3Jwcm90b3R5cGUlLUBAdG9zdHJpbmd0YWcpXG4gICAqIEVTNiQyMi4xLjUuMi4yIC0gJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlW0BAdG9TdHJpbmdUYWddIHNob3VsZCBiZSBcIkFycmF5IEl0ZXJhdG9yXCI6XG4gICAqIFRlc3Q6IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoW11bU3ltYm9sLml0ZXJhdG9yXSgpKWBgXG4gICAqICAtIEVkZ2UgPD0xMyA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxuICAgKi9cbiAgaWYgKGFycmF5SXRlcmF0b3JFeGlzdHMgJiYgb2JqUHJvdG90eXBlID09PSBhcnJheUl0ZXJhdG9yUHJvdG90eXBlKSB7XG4gICAgcmV0dXJuICdBcnJheSBJdGVyYXRvcic7XG4gIH1cblxuICAvKiAhIFNwZWMgQ29uZm9ybWFuY2VcbiAgICogKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvaW5kZXguaHRtbCNzZWMtJXN0cmluZ2l0ZXJhdG9ycHJvdG90eXBlJS1AQHRvc3RyaW5ndGFnKVxuICAgKiBFUzYkMjEuMS41LjIuMiAtICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSVbQEB0b1N0cmluZ1RhZ10gc2hvdWxkIGJlIFwiU3RyaW5nIEl0ZXJhdG9yXCI6XG4gICAqIFRlc3Q6IGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoJydbU3ltYm9sLml0ZXJhdG9yXSgpKWBgXG4gICAqICAtIEVkZ2UgPD0xMyA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxuICAgKi9cbiAgaWYgKHN0cmluZ0l0ZXJhdG9yRXhpc3RzICYmIG9ialByb3RvdHlwZSA9PT0gc3RyaW5nSXRlcmF0b3JQcm90b3R5cGUpIHtcbiAgICByZXR1cm4gJ1N0cmluZyBJdGVyYXRvcic7XG4gIH1cblxuICAvKiAhIFNwZWVkIG9wdGltaXNhdGlvblxuICAqIFByZTpcbiAgKiAgIG9iamVjdCBmcm9tIG51bGwgICB4IDIsNDI0LDMyMCBvcHMvc2VjIMKxMS42NyUgKDc2IHJ1bnMgc2FtcGxlZClcbiAgKiBQb3N0OlxuICAqICAgb2JqZWN0IGZyb20gbnVsbCAgIHggNSw4MzgsMDAwIG9wcy9zZWMgwrEwLjk5JSAoODQgcnVucyBzYW1wbGVkKVxuICAqL1xuICBpZiAob2JqUHJvdG90eXBlID09PSBudWxsKSB7XG4gICAgcmV0dXJuICdPYmplY3QnO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdFxuICAgIC5wcm90b3R5cGVcbiAgICAudG9TdHJpbmdcbiAgICAuY2FsbChvYmopXG4gICAgLnNsaWNlKHRvU3RyaW5nTGVmdFNsaWNlTGVuZ3RoLCB0b1N0cmluZ1JpZ2h0U2xpY2VMZW5ndGgpO1xufVxuXG5yZXR1cm4gdHlwZURldGVjdDtcblxufSkpKTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5mdW5jdGlvbiBlc2NhcGUocykge1xuICByZXR1cm4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKVxufVxuXG5mdW5jdGlvbiBnZXRJZHgobmFtZSwgcHJlZml4KSB7XG4gIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYF4ke2VzY2FwZShwcmVmaXgpfShcXFxcZCspJGApXG4gIGNvbnN0IHJldCA9IG5hbWUubWF0Y2gocmVnKVxuICBpZiAocmV0ID09IG51bGwpIHJldHVybiAtMSAvLyBpZiBubyBpbmRleFxuICByZXR1cm4gcmV0WzFdIHx8IC0xIC8vIGdyZWF0ZXIgdGhlbiBvciBlcXVhbCB0byAwXG59XG5cbmZ1bmN0aW9uIGdldExhc3RJZHgobm9kZSwgcHJlZml4KSB7XG4gIGNvbnN0IGdldElkeFdpdGhQcmUgPSAobmFtZSkgPT4gZ2V0SWR4KG5hbWUsIHByZWZpeClcbiAgLy9yZXR1cm4gT2JqZWN0LmtleXMobm9kZSkubWFwKGtleT0+Z2V0SWR4V2l0aFByZShrZXkpKS5yZWR1Y2UoTWF0aC5tYXgpXG4gIHJldHVybiBPYmplY3Qua2V5cyhub2RlKS5tYXAoa2V5PT5nZXRJZHhXaXRoUHJlKGtleSkpLnJlZHVjZSgoYWNjLGkpPT5NYXRoLm1heChhY2MsaSksIC0xKVxuICAvL09iamVjdC5rZXlzKG5vZGUpLm1hcChrZXk9PmNvbnNvbGUubG9nKGtleSkpXG59XG5cbmNvbnN0IEdldEhlbHBlclRyYWl0ID0ge1xuICBnZXRMYXN0SWR4KHByZWZpeCkge1xuICAgIHJldHVybiBnZXRMYXN0SWR4KHRoaXMsIHByZWZpeClcbiAgfVxufVxuXG5leHBvcnRcbmZ1bmN0aW9uIG1peGluR2V0SGVscGVyKG9iaikge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgb2JqLCBHZXRIZWxwZXJUcmFpdClcbn1cbiIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IHthc3NlcnR9IGZyb20gJ2NoYWknXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBoZWxwZXJcblxuaW1wb3J0ICogYXMgaGVscGVyIGZyb20gJy4vaGVscGVyJ1xuXG5kZXNjcmliZSgnaGVscGVyJywgZnVuY3Rpb24oKSB7XG4gIC8vIGR1bW15IG5vZGUgb2JqXG4gIGNvbnN0IG5vZGUgPSB7XG4gICAgX25vZGUzOiB7fSxcbiAgICBfY2gxOiB7fSxcbiAgICBfbm9kZTE6IHt9LFxuICAgIF9jaDI6IHt9LFxuICAgIF9ub2RlMDoge30sXG4gIH1cbiAgZGVzY3JpYmUoJy5taXhpbkdldEhlbHBlcicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIG1peGluXG4gICAgY29uc3QgdGVtcE5vZGUgPSBoZWxwZXIubWl4aW5HZXRIZWxwZXIobm9kZSlcblxuICAgIGl0KCdoYXMgZ2V0TGFzdElkeCcsIGZ1bmN0aW9uKCkge1xuICAgICAgYXNzZXJ0LnByb3BlcnR5KHRlbXBOb2RlLCAnZ2V0TGFzdElkeCcpXG4gICAgfSlcbiAgICBpdCgnZmluZCBpbmRleCBsZWFzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgYXNzZXJ0LmVxdWFsKHRlbXBOb2RlLmdldExhc3RJZHgoJ19ub2RlJyksIDMpXG4gICAgICBhc3NlcnQuZXF1YWwodGVtcE5vZGUuZ2V0TGFzdElkeCgnX2NoJyksIDIpXG4gICAgfSlcbiAgICBpdCgncmV0dXJuIC0xIGlmIG5vIGZpbmQgaW5kZXgnLCBmdW5jdGlvbigpIHtcbiAgICAgIGFzc2VydC5lcXVhbCh0ZW1wTm9kZS5nZXRMYXN0SWR4KCdfZHVtbXknKSwgLTEpXG4gICAgfSlcbiAgfSlcbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9