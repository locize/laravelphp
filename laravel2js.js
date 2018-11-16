const Engine = require('php-parser');

function laravelToJs(str, cb) {
  if (typeof str !== 'string') {
    return cb(new Error('The first parameter was not a string'));
  }

  const parser = new Engine({
    parser: {
      extractDoc: false,
      php7: true
    },
    ast: {
      withPositions: false
    }
  });

  try {
    var result = {};
    const ast = parser.parseCode(str);
    if (ast && ast.children && ast.children.length > 0) {
      const returnElem = ast.children.find((ele) => (ele.kind === 'return'));
      if (returnElem && returnElem.expr && returnElem.expr.items) {
        returnElem.expr.items.forEach((item) => {
          if (item && item.kind === 'entry' && item.key && item.key.kind === 'string' && item.key.value && item.value && item.value.kind === 'string') {
            result[item.key.value] = item.value.value || '';
          }
        });
      }
    }

    if (cb) return cb(null, result);
    return result;
  } catch (e) {
    if (cb) return cb(e);
    throw e;
  }
}

module.exports = laravelToJs;
