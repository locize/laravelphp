const fs = require('fs');
const path = require('path');

module.exports = {
  example: {
    js: require('./example.json'),
    php: fs.readFileSync(path.join(__dirname, 'example.php')).toString().replace(/\n$/, '')
  }
};
