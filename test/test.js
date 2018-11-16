const expect = require('expect.js');
const fixtures = require('./fixtures');

function test(what, t) {
  describe(what, () => {
    it('index', t(require('../')[what]));
    it('direct', t(require('../' + what)));
  });
}

test('laravel2js', (fn) => (done) => {
  fn(fixtures.example.php, (err, res) => {
    expect(err).not.to.be.ok();
    expect(res).to.eql(fixtures.example.js);
    done();
  });
});

test('js2laravel', (fn) => (done) => {
  fn(fixtures.example.js, (err, res) => {
    expect(err).not.to.be.ok();
    expect(res).to.eql(fixtures.example.php);
    done();
  });
});

describe('sync', () => {

  test('laravel2js', (fn) => (done) => {
    const res = fn(fixtures.example.php);
    expect(res).to.eql(fixtures.example.js);
    done();
  });

  test('js2laravel', (fn) => (done) => {
    const res = fn(fixtures.example.js);
    expect(res).to.eql(fixtures.example.php);
    done();
  });

});
