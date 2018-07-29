const { inspect } = require('util');
const { getOptions } = require('loader-utils');
const yaml = require('js-yaml');

module.exports = function(source) {
  this.cacheable && this.cacheable();

  try {
    const options = getOptions(this);
    const safe = options.safe !== false;
    const res = safe ? yaml.safeLoad(source) : yaml.load(source);
    return `module.exports = ${inspect(res, { depth: null })}`;
  } catch (err) {
    this.emitError(err);
    return null;
  }
};
