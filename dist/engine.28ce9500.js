// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/class/Job.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function Job(title, requirements, salary, btnText) {
  _classCallCheck(this, Job);

  this.title = title;
  this.requirements = requirements;
  this.salary = salary;
  this.btnText = btnText;
};
},{}],"src/class/ListOfJobs.js":[function(require,module,exports) {
Job = require('./Job');

var listOfJobs = function listOfJobs() {
  return [new Job('Fry Cook', {
    int: 3,
    dex: 3,
    char: 3,
    perc: 3
  }, 1, 'Flip Burgers'), new Job('Barista', {
    int: 3,
    dex: 4,
    char: 4,
    perc: 3
  }, 1, 'Brew Coffee'), new Job('Code Monkey', {
    int: 5,
    dex: 3,
    char: 3,
    perc: 3
  }, 2, 'Slam Keyboard')];
};

module.exports = listOfJobs;
},{"./Job":"src/class/Job.js"}],"src/class/Player.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var listOfJobs = require('./ListOfJobs');

var Player =
/*#__PURE__*/
function () {
  function Player() {
    _classCallCheck(this, Player);

    this._money = 0;
    this._health = 20;
    this._statPoints = 5;
    this._int = 3;
    this._dex = 3;
    this._char = 3;
    this._perc = 3;
    this._job = 'none';
  }

  _createClass(Player, [{
    key: "update",
    value: function update(prop, operation, amount) {
      var property = "_".concat(prop);
      operation === 'add' ? this[property] += amount : this[property] -= amount;
      document.getElementById(prop).innerText = this[property];
    }
  }, {
    key: "increaseStat",
    value: function increaseStat(stat, fn) {
      if (this.statPoints > 0) {
        this.update('statPoints', 'sub', 1);
        this.update(stat, 'add', 1);
      } else {
        fn();
      }
    }
  }, {
    key: "chooseFirstJob",
    value: function chooseFirstJob() {
      var _this = this;

      var potentialJobs = listOfJobs().filter(function (job) {
        return job.requirements.int <= _this.int && job.requirements.dex <= _this.dex && job.requirements.char <= _this.char && job.requirements.perc <= _this.perc;
      });
      document.getElementById('statPointBlock').style.display = 'none';
      var btnBlockHTML = '';
      potentialJobs.forEach(function (job) {
        return btnBlockHTML += " <button class=\"btn button is-primary\">".concat(job.title, " - ").concat(job.salary, "</button>");
      });
      document.getElementById('controls').innerHTML = btnBlockHTML;
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      this.update('money', 'add', 0);
      this.update('health', 'add', 0);
      this.update('statPoints', 'add', 0);
      this.update('int', 'add', 0);
      this.update('dex', 'add', 0);
      this.update('char', 'add', 0);
      this.update('perc', 'add', 0);
      document.getElementById('controls').innerHTML = "\n      <button class=\"btn button is-primary\" id=\"incIntelligence\">Increase Intelligence</button>\n      <button class=\"btn button is-primary\" id=\"incDexterity\">Increase Dexterity</button>\n      <button class=\"btn button is-primary\" id=\"incCharisma\">Increase Charisma</button>\n      <button class=\"btn button is-primary\" id=\"incPerception\">Increase Perception</button>\n    ";

      document.getElementById('incIntelligence').onclick = function () {
        return _this2.increaseStat('int', function () {
          return _this2.chooseFirstJob();
        });
      };

      document.getElementById('incDexterity').onclick = function () {
        return _this2.increaseStat('dex', function () {
          return _this2.chooseFirstJob();
        });
      };

      document.getElementById('incCharisma').onclick = function () {
        return _this2.increaseStat('char', function () {
          return _this2.chooseFirstJob();
        });
      };

      document.getElementById('incPerception').onclick = function () {
        return _this2.increaseStat('perc', function () {
          return _this2.chooseFirstJob();
        });
      };
    }
  }, {
    key: "money",
    get: function get() {
      return this._money;
    }
  }, {
    key: "health",
    get: function get() {
      return this._health;
    }
  }, {
    key: "statPoints",
    get: function get() {
      return this._statPoints;
    }
  }, {
    key: "int",
    get: function get() {
      return this._int;
    }
  }, {
    key: "dex",
    get: function get() {
      return this._dex;
    }
  }, {
    key: "char",
    get: function get() {
      return this._char;
    }
  }, {
    key: "perc",
    get: function get() {
      return this._perc;
    }
  }, {
    key: "job",
    get: function get() {
      return this._job;
    }
  }]);

  return Player;
}();

module.exports = new Player();
},{"./ListOfJobs":"src/class/ListOfJobs.js"}],"src/engine.js":[function(require,module,exports) {
var player = require('./class/Player');

var engine = function engine() {
  document.getElementById('startBtn').onclick = function () {
    return player.init();
  };
};

engine();
},{"./class/Player":"src/class/Player.js"}],"../../.nvm/versions/node/v13.8.0/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42661" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.nvm/versions/node/v13.8.0/lib/node_modules/parcel/src/builtins/hmr-runtime.js","src/engine.js"], null)
//# sourceMappingURL=/engine.28ce9500.js.map