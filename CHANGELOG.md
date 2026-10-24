### 2.0.6

- `laravel2js`: array entries without a key and entries with an integer key are kept, numbered the way PHP does (`['January', 'February']` gives `0` and `1`, `['x', 5 => 'five', 'y']` gives `0`, `5` and `6`); they were dropped ([#4](https://github.com/locize/laravelphp/pull/4), by [@Pharex38](https://github.com/Pharex38))

### 2.0.5

- `js2laravel`: backslashes and quotes are escaped in keys and values, so a trailing backslash or a `'` in a key no longer breaks the PHP file, and a `\\` in a value no longer loses a backslash ([#3](https://github.com/locize/laravelphp/pull/3), by [@Pharex38](https://github.com/Pharex38))

### 2.0.4

- update deps

### 2.0.3

- transpile also esm

### 2.0.2

- fix export for node v14 cjs

### 2.0.1

- fix export for dynamic imports

### 2.0.0

- complete refactoring to make this module universal
- MIGRATION:
    - `require('laravelphp/laravel2js')` should be replaced with `require('laravelphp/cjs/laravel2js')`
    - `require('laravelphp/js2laravel')` should be replaced with `require('laravelphp/cjs/js2laravel')`
