[![travis](https://img.shields.io/travis/locize/laravelphp.svg)](https://travis-ci.org/locize/laravelphp) [![npm](https://img.shields.io/npm/v/laravelphp.svg)](https://npmjs.org/package/laravelphp)

## Download

The source is available for download from
[GitHub](https://github.com/locize/laravelphp/archive/master.zip).
Alternatively, you can install using npm:

```sh
npm install --save laravelphp
```

You can then `require()` laravel as normal:

```js
const laravelphp = require('laravelphp');
```

Or you can direclty `require()` its functions:

```js
const laravel2js = require('laravelphp/laravel2js');
```

## Usage

```js

const php = `<?php
  return [
    'key1' => 'Hello! Let\'s go!',
    'key2' => 'An application to manipulate and process laravel php language files',
    'key' => [
      'nested' => 'laravel Data Manager'
    ]
  ];`;

const js = {
  "key1": "Hello! Let's go!",
  "key2": "An application to manipulate and process laravel php language files",
  "key": {
    "nested": "laravel Data Manager"
  }
};


const laravel2js = require('laravelphp/laravel2js');
laravel2js(php, (err, res) => {
  // res is like js
});

const js2laravel = require('laravelphp/js2laravel');
js2laravel(js, (err, res) => {
  // res is like php
});

```
