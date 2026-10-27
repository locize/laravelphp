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

describe('implicit and integer keys', () => {
  const php = "<?php\n  return [\n    'months' => ['January', 'February'],\n    'mixed' => ['x', 5 => 'five', '7' => 'seven', 'k' => 'v', 'y']\n  ];"

  test('laravel2js', (fn) => async () => {
    expect(await fn(php)).to.eql({
      months: { 0: 'January', 1: 'February' },
      mixed: { 0: 'x', 5: 'five', 7: 'seven', k: 'v', 8: 'y' }
    })
  })
})

describe('double-quoted strings', () => {
  const php = '<?php\n  return [\n    \'quoted\' => "Say \\"hi\\"",\n    \'newline\' => "Line 1\\nLine \\"2\\"",\n  ];'

  test('laravel2js', (fn) => async () => {
    expect(await fn(php)).to.eql({ quoted: 'Say "hi"', newline: 'Line 1\nLine "2"' })
  })
})
