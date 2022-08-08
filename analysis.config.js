const myProcessor = ({ forEachComponent, sortObjectKeysByValue, output }) => {
  let result = {};

  forEachComponent(({ componentName, component }) => {
    const { instances } = component;

    if (!instances) {
      return;
    }

    result[componentName] = {
      instances: instances.length,
      props: {},
    };

    instances.forEach(instance => {
      for (const prop in instance.props) {
        if (result[componentName].props[prop] === undefined) {
          result[componentName].props[prop] = {
            instances: 0,
            values: {},
          };
        }
        result[componentName].props[prop].instances++;

        let val = instance.props[prop];
        if (result[componentName].props[prop].values[val] === undefined) {
          result[componentName].props[prop].values[val] = 0;
        }

        result[componentName].props[prop].values[val]++;
      }
    });

    result[componentName].props = sortObjectKeysByValue(result[componentName].props, prop => prop.instances);

    for (const prop in result[componentName].props) {
      result[componentName].props[prop].values = sortObjectKeysByValue(result[componentName].props[prop].values);
    }
  });

  result = sortObjectKeysByValue(result, component => component.instances);

  output(result, "./.analysis/prop-usage.json");

  return result;
};

const hold = ["count-components-and-props", { outputTo: "./.analysis/component-usage.json" }];

module.exports = {
  crawlFrom: "./client",
  includeSubComponents: true,
  processors: [myProcessor],
};
