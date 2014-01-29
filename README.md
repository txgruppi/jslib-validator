# Validator

[![Build Status](https://travis-ci.org/txgruppi/jslib-validator.png?branch=master)](https://travis-ci.org/txgruppi/jslib-validator)
[![devDependency Status](https://david-dm.org/txgruppi/jslib-validator/dev-status.png)](https://david-dm.org/txgruppi/jslib-validator#info=devDependencies)
[![browser support](https://ci.testling.com/txgruppi/jslib-validator.png)](http://ci.testling.com/txgruppi/jslib-validator)

Simple data validator

## Usage

### Register a function

```js
var validator = require('jslib-validator');
validator.register('==', function(a, b, cb){
  cb(a === b);
});
```

### Call a function

```js
var validator = require('jslib-validator');
validator.register('==', function(a, b, cb){
  cb(a === b ? null : 'not equal');
});
validator('==', 1, 1, function(err){
  if (err) {
    console.error(err);
  } else {
    console.log("valid");
  }
});
```

### Get a registered function

```js
var validator = require('jslib-validator');
validator.register('==', function(a, b, cb){
  cb(a === b ? null : 'not equal');
});
var eqValidator = validator('==');
```
