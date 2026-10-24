const expect = require('expect.js')
const fixtures = require('./fixtures')

function test (what, t) {
  describe(what, () => {
    it('index', t(require('../')[what]))
    it('direct', t(require('../cjs/' + what)))
  })
}

test('laravel2js', (fn) => (done) => {
  fn(fixtures.example.php, (err, res) => {
    expect(err).not.to.be.ok()
    expect(res).to.eql(fixtures.example.js)
    done()
  })
})

test('js2laravel', (fn) => (done) => {
  fn(fixtures.example.js, (err, res) => {
    expect(err).not.to.be.ok()
    expect(res).to.eql(fixtures.example.php)
    done()
  })
})

describe('promise', () => {
  test('laravel2js', (fn) => async () => {
    const res = await fn(fixtures.example.php)
    expect(res).to.eql(fixtures.example.js)
  })

  test('js2laravel', (fn) => async () => {
    const res = await fn(fixtures.example.js)
    expect(res).to.eql(fixtures.example.php)
  })
})

describe('escaping', () => {
  const js = { trailing: 'ends with \\', path: 'C:\\\\temp', quote: "it's", "it's": { 'nested\\': 'v' } }

  test('js2laravel', (fn) => async () => {
    const php = await fn(js)
    expect(php).to.contain("'trailing' => 'ends with \\\\'")
    expect(php).to.contain("'it\\'s' => [")
    expect(await require('../').laravel2js(php)).to.eql(js)
  })
})
