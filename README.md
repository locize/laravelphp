[![travis](https://img.shields.io/travis/locize/laravelphp.svg)](https://travis-ci.org/locize/laravelphp) [![npm](https://img.shields.io/npm/v/laravelphp.svg)](https://npmjs.org/package/laravelphp)

## Download

The source is available for download from
[GitHub](https://github.com/locize/laravelphp/archive/master.zip).
Alternatively, you can install using npm:

```sh
npm install --save laravelphp
```

You can then `import` or `require()` laravel as normal:

```js
import resx from 'resx'
// or
const laravelphp = require('laravelphp')

laravelphp.laravel2js(php, (err, res) => {})
```

Or you can direclty `import` or `require()` its functions:

```js
import resx2js from 'laravelphp/laravel2js'
// or
const resx2js = require('laravelphp/cjs/laravel2js')
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
  ];`

const js = {
  "key1": "Hello! Let's go!",
  "key2": "An application to manipulate and process laravel php language files",
  "key": {
    "nested": "laravel Data Manager"
  }
}


import laravel2js from 'laravelphp/laravel2js'
laravel2js(php, (err, res) => {
  // res is like js
});

import js2laravel from 'laravelphp/js2laravel'
js2laravel(js, (err, res) => {
  // res is like php
});

```

Omitting the callback returns a promise

```js
const resJs = await laravel2js(php)
const resPhp = await js2laravel(js)
// or
laravel2js(php).then((res) => {})
js2laravel(js).then((res) => {})
```