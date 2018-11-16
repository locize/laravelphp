function js2laravel(resources, cb) {
  var result = `<?php
  return [`;
  const end = `  ];
?>`;

  if (resources) {
    const keys = Object.keys(resources);
    keys.forEach((key, index) => {
      var value = resources[key];
      if (value && typeof value === 'string') {
        value = value.replace(/'/g, '\\\'');
      }
      result += `\n    '${key}' => '${value}'`;
      if (index + 1 < keys.length) {
        result += ',';
      }
    });
  }

  result += `\n${end}`;

  if (cb) return cb(null, result);
  return result;
}

module.exports = js2laravel;
