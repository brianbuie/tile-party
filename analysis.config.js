module.exports = {
  crawlFrom: "./client",
  includeSubComponents: true,
  processors: [["count-components-and-props", { outputTo: "./.analysis/component-usage.json" }]],
};
