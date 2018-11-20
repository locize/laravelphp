function js2laravel(resources, cb) {
  var result = `<?php
  return [`;
  const end = '  ];';

  (function stringifyJs(obj, level) {
    if (obj) {
      const keys = Object.keys(obj);
      keys.forEach((key, index) => {
        var value = obj[key] || '';
        if (typeof value === 'string') {
          value = value.replace(/'/g, '\\\'');
          result += `\n  ${'  '.repeat(level)}'${key}' => '${value}'`;
        }
        if (typeof value === 'object') {
          result += `\n  ${'  '.repeat(level)}'${key}' => [`;
          stringifyJs(value, level + 1);
          result += `\n  ${'  '.repeat(level)}]`;
        }
        if (index + 1 < keys.length) {
          result += ',';
        }
      });
    }
  })(resources, 1);

  result += `\n${end}`;

  if (cb) return cb(null, result);
  return result;
}

module.exports = js2laravel;
