const { describe, it } = require('mocha');
const equal = require('assert-dir-equal');
const remove = require('..');
const Metalsmith = require('metalsmith');
const rm = require('rimraf').sync;

describe('@metalsmith/remove', function () {
  it('should remove files by patterns', function (done) {
    rm('test/fixtures/object/build');
    const m = Metalsmith('test/fixtures/object').use(
      remove({
        patterns: ['ignored.*', 'removed.*'],
      })
    );

    m.build(function (err) {
      if (err) return done(err);
      equal('test/fixtures/object/build', 'test/fixtures/object/expected');
      done();
    });
  });

  it('should take an array shorthand', function (done) {
    rm('test/fixtures/array/build');
    const m = Metalsmith('test/fixtures/array').use(
      remove(['ignored.*', 'removed.*'])
    );
    m.build(function (err) {
      if (err) return done(err);
      equal('test/fixtures/array/build', 'test/fixtures/array/expected');
      done();
    });
  });

  it('should take a string shorthand', function (done) {
    rm('test/fixtures/string/build');
    const m = Metalsmith('test/fixtures/string').use(remove('ignored.*'));
    m.build(function (err) {
      if (err) return done(err);
      equal('test/fixtures/string/build', 'test/fixtures/string/expected');
      done();
    });
  });

  it('should take a string and ignore tilda', function (done) {
    rm('test/fixtures/string-tilda/build');
    const m = Metalsmith('test/fixtures/string-tilda').use(remove('*~'));
    m.build(function (err) {
      if (err) return done(err);
      equal(
        'test/fixtures/string-tilda/build',
        'test/fixtures/string-tilda/expected'
      );
      done();
    });
  });
});
