var expect = require('chai').expect,
    validator = require('..');

describe('validator', function(){
  var noop = function(){};

  it("should be a function", function(){
    expect(validator).to.be.an.instanceof(Function);
  });

  it("should respond to .register", function(){
    expect(validator).itself.to.respondTo('register');
  });

  it('should register and return a validator', function(){
    var name = 'test1', fn = noop;
    validator.register(name, fn);
    expect(validator(name)).to.be.equal(fn);
  });

  it('should replace and existing validator if define a new with same name', function(){
    var name = 'test2', fn1 = noop, fn2 = function(){};
    validator.register(name, fn1);
    validator.register(name, fn2);
    expect(validator(name)).to.be.not.equal(fn1);
    expect(validator(name)).to.be.equal(fn2);
  });

  it('should call a validator if it takes more than one argument', function(done){
    var name = 'test3', fn = function(){done();};
    validator.register(name, fn);
    validator(name, 0, noop);
  });

  it('should call callback with no error if validation is ok', function(done){
    var name = 'test3', fn = function(num, cb){cb();};
    validator.register(name, fn);
    validator(name, 0, function(err){
      expect(err).to.be.not.ok;
      done();
    });
  });

  it('should call callback with error if validation is not ok', function(done){
    var name = 'test4', fn = function(num, cb){cb(new Error("invalid!"));};
    validator.register(name, fn);
    validator(name, 0, function(err){
      expect(err).to.be.ok;
      done();
    });
  });

  it('should throw an error if no callback is given', function(){
    var name = 'test5', fn = function(num, cb){cb();};
    validator.register(name, fn);
    expect(function(){validator(name, 0);}).to.throw('Missing callback as last argument');
  });
});
