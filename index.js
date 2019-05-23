const uneval = require('un-eval');
const { getOptions } = require('loader-utils');
const yaml = require('js-yaml');

module.exports = function(source) {
  this.cacheable && this.cacheable();

  try {
    const {
      safe,
      iterator,
      ...options
    } = getOptions(this) || {};

    const res = safe !== false
      ? yaml.safeLoadAll(source, iterator, options)
      : yaml.loadAll(source, iterator, options);

    return [
      `const doc = ${uneval(res)};`,
      'module.exports = doc.length <= 1 ? doc[0] : doc;'
    ].join('\n');
  } catch (err) {
    this.emitError(err);
    return null;
  }
};
