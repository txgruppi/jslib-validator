(function(){
  var root = this;

  var validators = {};

  function validator(name) {
    if (arguments.length === 1) {
      return validators[name];
    } else {
      var args = Array.prototype.slice.call(arguments, 1);
      var fn = validator(name);
      if (typeof args[args.length-1] !== 'function') {
        throw new Error("Missing callback as last argument");
      }
      fn.apply(fn, args);
    }
  }

  validator.register = function(name, fn) {
    validators[name] = fn;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = validator;
  } else {
    root.validator = validator;
  }
})();
