const analyzeProps = require('./scripts/analyze-props.js');

module.exports = {
  crawlFrom: './client',
  includeSubComponents: true,
  processors: [analyzeProps],
};
