/*
* @Author: wgs36
* @Date:   2017-02-08 21:47:48
* @Last Modified by:   wgs36
* @Last Modified time: 2017-02-16 12:23:27
*/

// assert function
if (typeof assert !== "function") {
    var assert = null;
}

if (typeof test !== "function") {
    var test = null;
}

function assert(value, desc) {
    'use strict';

    var results = document.getElementById("results");
    var li = document.createElement("li");
    var span = document.createElement("span");
    var text = document.createTextNode(desc);

    results.appendChild(li);
    li.appendChild(span);
    span.appendChild(text);

    span.className = value ? "pass" : "fail";
}

function asserts() {
    'use strict';

    var results;

    assert = function(value, desc) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        var text = document.createTextNode(desc);

        li.appendChild(span);
        span.append(text);

        span.className = value ? "pass" : "fail";

        results.appendChild(li);

        if (!value) {
            var liGroup = li.parentNode.parentNode;
            liGroup.childNodes[0].className = "fail";
        }

        return li;
    };

    test = function(name, fn) {
        results = document.getElementById("results");
        var ul = document.createElement("ul");
        results = assert(true, name).appendChild(ul);

        fn();
    };
}

function report(value, desc) {
	assert(true, desc);
}

function log() {
    console.log.apply(console, arguments);
}

// isType function
function _isNumber(value) {
    return typeof value === "number";
}

function _isString(value) {
    return typeof value === "string";
}

function _isBoolean(value) {
    return typeof value === "boolean";
}

function _isUndefined(value) {
    // return typeof value === "undefined";
    return value === (void 0);
}

function _isNull(value) {
    return value === null;
}

function _isPrimitive(value) {
    return _isNumber(value) || _isString(value) || _isBoolean(value)
        || _isNull(value) || _isUndefined(value);
}

function _isZero(value) {
    return value === 0;
}

// Is the given value `NaN`? (NaN is the only number which does not equal itself).
function _isNaN(value) {
    return _isNumber(value) && value !== value;
}

function _isInfinity(value) {
    return value === Infinity || value === -Infinity;
}

function _isFinity(value) {
    return _isNumber(value) && !_isInfinity(value) && !_isNaN(value);
}

function _isObject(value) {
    return !_isPrimitive(value);
}

function _isArray(value) {
    // return Array.isArray(value);
    return Object.prototype.toString.call(value) === '[object Array]';
}

function _isFunction(value) {
    return Object.prototype.toString.call(value) === '[object Function]';
}

function _isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
}

function _isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]';
}

function _isError(value) {
    return Object.prototype.toString.call(value) === '[object Error]';
}

function _isNumberObj(value) {
    return Object.prototype.toString.call(value)
        === '[object Number]' && !_isNumber(value);
}

function _isStringObj(value) {
    return Object.prototype.toString.call(value)
        === '[object String]' && !_isString(value);
}

function _isBooleanObj(value) {
    return Object.prototype.toString.call(value)
        === '[object Boolean]' && !_isBoolean(value);
}

function _isArguments(value) {
    return Object.prototype.toString.call(value) === '[object Arguments]';
}

// Equal function
function _strictEqual(a, b) {
    return a === b || (_isNaN(a) && _isNaN(b));
}

function _floatEqual(a, b, tol) {
    var ret = false;
    if (_isFinity(a) && _isFinity(b)) {
        tol = tol || 0.00001;
        ret = Math.abs(a - b) < tol;
    }

    return ret;
}

function _float_strictEqual(a, b, tol)
{
    var ret = false;
    if (_isFinity(a) && _isFinity(b)) {
        tol = tol || 0.00001;
        ret = Math.abs(a - b) < tol;
    }
    else
    {
        ret = _strictEqual(a, b);
    }

    return ret;
}

function _arrayEqual(a, b, tol)
{
    var ret = false;
    if (_isArray(a) && _isArray(b))
    {
        if (a.length === b.length)
        {
            var isOk = true;
            for (var i = 0; i < a.length; i++)
            {
                if (!_float_strictEqual(a[i], b[i], tol))
                {
                    isOk = false;
                    break;
                }
            }
            ret = isOk;
        }
    }

    return ret;
}

// string function
String.prototype.fmt = function(){
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function(m, i){
            return args[i];
        });
}

String.fmt = function() {
    if (arguments.length == 0)
        return null;

    var str = arguments[0];
    for (var i = 1; i < arguments.length;i++) {
        var re = new RegExp('\\{' + (i-1) + '\\}','gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

function _varDesc(value) {
    var ret = "";
    if (_isNumber(value)) {
        ret = "number({0})".fmt(value);
    }
    else if (_isString(value)) {
        ret = "string(\"{0}\")".fmt(value);
    }
    else if (_isBoolean(value)) {
        ret = "boolean({0})".fmt(value);
    }
    else if (_isNull(value)) {
        ret = "null".fmt(value);
    }
    else if (_isUndefined(value)) {
        ret = "undefined";
    }
    else if (_isArray(value)) {
        ret = "Array({0})".fmt(JSON.stringify(value));
    }
    else if (_isFunction(value)) {
        ret = "Function({0})".fmt(value.name);
    }
    else if (_isRegExp(value)) {
        ret = "Regexp({0})".fmt(value.toString());
    }
    else if (_isDate(value)) {
        ret = "Date({0})".fmt(value.toString());
    }
    else if (_isError(value)) {
        ret = "Error({0})".fmt(value.toString());
    }
    else if (_isNumberObj(value)) {
        ret = "Number({0})".fmt(value.toString());
    }
    else if (_isStringObj(value)) {
        ret = "String(\"{0}\")".fmt(value.toString());
    }
    else if (_isBooleanObj(value)) {
        ret = "Boolean({0})".fmt(value.toString());
    }
    else if (_isObject(value)) {
        ret = "Object({0})".fmt(JSON.stringify(value));
    }
    else {
        ret = "Unknown";
    }

    return ret;
}

function _classOf(obj) {
    if (obj === null) return "Null";
    if (obj === undefined) return "Undefined";
    return Object.prototype.toString.call(obj).slice(8, -1);
}

function _testCase(caseData) {
    var _test = function(sample) {
        return sample;
    };

    var _equal = _strictEqual;

    var _log = false;

    function _testCaseFun(caseData) {
        var sample = caseData.sample;
        var result = caseData.result;
        var fnResult = _test(sample);
        var isOk = _equal(result, fnResult);
        assert(isOk, _varDesc(sample) + " is " + result);
        if (_log)
        {
            log(_varDesc(sample) + " is " + fnResult);
        }
    }

    _testCaseFun.test = function(fn) {
        _test = fn;
        return _testCaseFun;
    }

    _testCaseFun.equal = function(fn) {
        _equal = fn;
        return _testCaseFun;
    }

    _testCaseFun.log = function() {
        _log = true;
        return _testCaseFun;
    }

    return _testCaseFun;
}