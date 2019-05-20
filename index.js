const uneval = require('un-eval');
const { getOptions } = require('loader-utils');
const yaml = require('js-yaml');

module.exports = function(source) {
  this.cacheable && this.cacheable();

  try {
    const options = getOptions(this) || {};
    const safe = options.safe !== false;

    const res = safe
      ? yaml.safeLoadAll(source)
      : yaml.loadAll(source);

    return [
      `const doc = ${uneval(res)};`,
      'module.exports = doc.length <= 1 ? doc[0] : doc;'
    ].join('\n');
  } catch (err) {
    this.emitError(err);
    return null;
  }
};
