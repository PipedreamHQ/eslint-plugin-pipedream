function isModuleExports(node) {
  if (!node) return false;
  if (!node?.object || !node?.property) return false;
  if (node.object.name !== "module" || node.property.name !== "exports") return false;
  return true;
}

function isObjectWithProperties(node) {
  if (!node) return false;
  const {
    properties,
    type,
  } = node;
  if (type !== "ObjectExpression") return false;
  if (!properties || Object.keys(properties).length === 0) return false;
  return true;
}

// Does a component contain the right property? e.g. key, version
function componentContainsPropertyCheck(context, node, propertyName, message) {
  const {
    left,
    right,
  } = node.expression;
  if (!isModuleExports(left)) return;
  if (!isObjectWithProperties(right)) return;

  if (!right.properties.map((p) => p?.key?.name).includes(propertyName)) {
    context.report({
      node: node,
      message: message ?? `Components must export a ${propertyName} property. See https://pipedream.com/docs/components/guidelines/#required-metadata`,
    });
  }
}

// Do component props contain the right properties? e.g. label, description
function componentPropsContainsPropertyCheck(context, node, propertyName) {
  const {
    left,
    right,
  } = node.expression;
  if (!isModuleExports(left)) return;
  if (!isObjectWithProperties(right)) return;

  const { properties } = right;
  const propertyNames = properties.map((p) => p?.key?.name);
  if (propertyNames.includes("props") || propertyNames.includes("propDefinitions")) {
    const props = properties.find((p) => p?.key?.name === "props" || p?.key?.name === "propDefinitions");
    if (!isObjectWithProperties(props?.value)) return;
    for (const prop of props.value?.properties) {
      const {
        key,
        value: propDef,
      } = prop;

      // We don't want to lint app props or props that are defined in propDefinitions
      if (!isObjectWithProperties(propDef)) continue;
      if (!isObjectWithProperties(right)) continue;
      const propProperties = propDef.properties.map((p) => p?.key?.name);
      if (propProperties.includes("propDefinition")) continue;

      if (!propProperties.includes(propertyName)) {
        context.report({
          node: prop,
          message: `Component prop ${key?.name} must have a ${propertyName}. See https://pipedream.com/docs/components/guidelines/#props`,
        });
      }
    }
  }
}

function optionalComponentPropsHaveDefaultProperty(context, node) {
  const {
    left,
    right,
  } = node.expression;
  if (!isModuleExports(left)) return;
  if (!isObjectWithProperties(right)) return;

  const { properties } = right;
  const propertyNames = properties.map((p) => p?.key?.name);
  if (propertyNames.includes("props") || propertyNames.includes("propDefinitions")) {
    const props = properties.find((p) => p?.key?.name === "props" || p?.key?.name === "propDefinitions");
    if (!isObjectWithProperties(props?.value)) return;
    for (const prop of props.value?.properties) {
      const {
        key,
        value: propDef,
      } = prop;

      // We don't want to lint app props or props that are defined in propDefinitions
      if (!isObjectWithProperties(propDef)) continue;
      if (!isObjectWithProperties(right)) continue;
      const propProperties = propDef.properties.map((p) => p?.key?.name);
      if (propProperties.includes("propDefinition")) continue;

      const optionalValue = propDef.properties.find((p) => p?.key?.name === "optional")?.value?.value;

      if (propProperties.includes("optional") && optionalValue && !propProperties.includes("default")) {
        context.report({
          node: prop,
          message: `Component prop ${key?.name} is marked "optional", so it must have a "default" property. See https://pipedream.com/docs/components/guidelines/#default-values`,
        });
      }
    }
  }
}

module.exports = {
  rules: {
    "required-properties-key": {
      create: function (context) {
        return {
          ExpressionStatement(node) {
            componentContainsPropertyCheck(context, node, "key");
          },
        };
      },
    },
    "required-properties-name": {
      create: function (context) {
        return {
          ExpressionStatement(node) {
            componentContainsPropertyCheck(context, node, "name");
          },
        };
      },
    },
    "required-properties-version": {
      create: function (context) {
        return {
          ExpressionStatement(node) {
            componentContainsPropertyCheck(context, node, "version");
          },
        };
      },
    },
    "required-properties-description": {
      create: function (context) {
        return {
          ExpressionStatement(node) {
            componentContainsPropertyCheck(context, node, "description");
          },
        };
      },
    },
    "required-properties-type": {
      create: function (context) {
        return {
          ExpressionStatement(node) {
            componentContainsPropertyCheck(context, node, "type", "Components must export a type property (\"source\" or \"action\")");
          },
        };
      },
    },
    "props-label": {
      create: function (context) {
        return {
          ExpressionStatement(node) {
            componentPropsContainsPropertyCheck(context, node, "label");
          },
        };
      },
    },
    "props-description": {
      create: function (context) {
        return {
          ExpressionStatement(node) {
            componentPropsContainsPropertyCheck(context, node, "description");
          },
        };
      },
    },
    "default-value-required-for-optional-props": {
      create: function (context) {
        return {
          ExpressionStatement(node) {
            optionalComponentPropsHaveDefaultProperty(context, node);
          },
        };
      },
    },
    "source-name": {
      create: function (context) {
        return {
          ExpressionStatement(node) {
            componentContainsPropertyCheck(context, node, "type", "Components must export a type property (\"source\" or \"action\")");
          },
        };
      },
    },
    "source-description": {
      create: function (context) {
        return {
          ExpressionStatement(node) {
            componentContainsPropertyCheck(context, node, "type", "Components must export a type property (\"source\" or \"action\")");
          },
        };
      },
    },
  },
};
