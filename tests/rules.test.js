const RuleTester = require("eslint").RuleTester;
const { rules } = require("../index");
const {
  valid,
  requiredPropertyKeyMissing,
  requiredPropertyNameMissing,
  requiredPropertyDescriptionMissing,
  requiredPropertyVersionMissing,
  requiredPropertyTypeMissing,
  optionalPropWithoutDefaultValue,
  missingPropsLabel,
  missingPropsDescription,
  badSourceName,
  badSourceDescription,
} = require("./components");

const ruleTester = new RuleTester({
  parserOptions: {
    "ecmaVersion": 12,
    "sourceType": "module",
  },

});

function convertObjectToCJSExportString(obj) {
  return `module.exports = ${JSON.stringify(obj)}`;
}

function convertObjectToESMExportString(obj) {
  return `export default ${JSON.stringify(obj)}`;
}

ruleTester.run("required-properties-key-test", rules["required-properties-key"], {
  valid: [
    {
      code: convertObjectToCJSExportString(valid),
    },
    {
      code: convertObjectToESMExportString(valid),
    },
  ],
  invalid: [
    {
      code: convertObjectToCJSExportString(requiredPropertyKeyMissing),
      errors: [
        {
          message: "Components must export a key property. See https://pipedream.com/docs/components/guidelines/#required-metadata",
        },
      ],
    },
    {
      code: convertObjectToESMExportString(requiredPropertyKeyMissing),
      errors: [
        {
          message: "Components must export a key property. See https://pipedream.com/docs/components/guidelines/#required-metadata",
        },
      ],
    },
  ],
});

ruleTester.run("required-properties-name-test", rules["required-properties-name"], {
  valid: [
    {
      code: convertObjectToCJSExportString(valid),
    },
    {
      code: convertObjectToESMExportString(valid),
    },
  ],
  invalid: [
    {
      code: convertObjectToCJSExportString(requiredPropertyNameMissing),
      errors: [
        {
          message: "Components must export a name property. See https://pipedream.com/docs/components/guidelines/#required-metadata",
        },
      ],
    },
    {
      code: convertObjectToESMExportString(requiredPropertyNameMissing),
      errors: [
        {
          message: "Components must export a name property. See https://pipedream.com/docs/components/guidelines/#required-metadata",
        },
      ],
    },
  ],
});

ruleTester.run("required-properties-description-test", rules["required-properties-description"], {
  valid: [
    {
      code: convertObjectToCJSExportString(valid),
    },
    {
      code: convertObjectToESMExportString(valid),
    },
  ],
  invalid: [
    {
      code: convertObjectToCJSExportString(requiredPropertyDescriptionMissing),
      errors: [
        {
          message: "Components must export a description property. See https://pipedream.com/docs/components/guidelines/#required-metadata",
        },
      ],
    },
    {
      code: convertObjectToESMExportString(requiredPropertyDescriptionMissing),
      errors: [
        {
          message: "Components must export a description property. See https://pipedream.com/docs/components/guidelines/#required-metadata",
        },
      ],
    },
  ],
});

ruleTester.run("required-properties-version-test", rules["required-properties-version"], {
  valid: [
    {
      code: convertObjectToCJSExportString(valid),
    },
    {
      code: convertObjectToESMExportString(valid),
    },
  ],
  invalid: [
    {
      code: convertObjectToCJSExportString(requiredPropertyVersionMissing),
      errors: [
        {
          message: "Components must export a version property. See https://pipedream.com/docs/components/guidelines/#required-metadata",
        },
      ],
    },
    {
      code: convertObjectToESMExportString(requiredPropertyVersionMissing),
      errors: [
        {
          message: "Components must export a version property. See https://pipedream.com/docs/components/guidelines/#required-metadata",
        },
      ],
    },
  ],
});

ruleTester.run("required-properties-type-test", rules["required-properties-type"], {
  valid: [
    {
      code: convertObjectToCJSExportString(valid),
    },
    {
      code: convertObjectToESMExportString(valid),
    },
  ],
  invalid: [
    {
      code: convertObjectToCJSExportString(requiredPropertyTypeMissing),
      errors: [
        {
          message: "Components must export a type property (\"source\" or \"action\")",
        },
      ],
    },
    {
      code: convertObjectToESMExportString(requiredPropertyTypeMissing),
      errors: [
        {
          message: "Components must export a type property (\"source\" or \"action\")",
        },
      ],
    },
  ],
});

ruleTester.run("default-value-required-for-optional-props-test", rules["default-value-required-for-optional-props"], {
  valid: [
    {
      code: convertObjectToCJSExportString(valid),
    },
    {
      code: convertObjectToESMExportString(valid),
    },
  ],
  invalid: [
    {
      code: convertObjectToCJSExportString(optionalPropWithoutDefaultValue),
      errors: [
        {
          message: "Component prop test is marked \"optional\", so it may need a \"default\" property. See https://pipedream.com/docs/components/guidelines/#default-values",
        },
      ],
    },
    {
      code: convertObjectToESMExportString(optionalPropWithoutDefaultValue),
      errors: [
        {
          message: "Component prop test is marked \"optional\", so it may need a \"default\" property. See https://pipedream.com/docs/components/guidelines/#default-values",
        },
      ],
    },
  ],
});

ruleTester.run("props-label-test", rules["props-label"], {
  valid: [
    {
      code: convertObjectToCJSExportString(valid),
    },
    {
      code: convertObjectToESMExportString(valid),
    },
  ],
  invalid: [
    {
      code: convertObjectToCJSExportString(missingPropsLabel),
      errors: [
        {
          message: "Component prop test must have a label. See https://pipedream.com/docs/components/guidelines/#props",
        },
      ],
    },
    {
      code: convertObjectToESMExportString(missingPropsLabel),
      errors: [
        {
          message: "Component prop test must have a label. See https://pipedream.com/docs/components/guidelines/#props",
        },
      ],
    },
  ],
});

ruleTester.run("props-description-test", rules["props-description"], {
  valid: [
    {
      code: convertObjectToCJSExportString(valid),
    },
    {
      code: convertObjectToESMExportString(valid),
    },
  ],
  invalid: [
    {
      code: convertObjectToCJSExportString(missingPropsDescription),
      errors: [
        {
          message: "Component prop test must have a description. See https://pipedream.com/docs/components/guidelines/#props",
        },
      ],
    },
    {
      code: convertObjectToESMExportString(missingPropsDescription),
      errors: [
        {
          message: "Component prop test must have a description. See https://pipedream.com/docs/components/guidelines/#props",
        },
      ],
    },
  ],
});

ruleTester.run("source-name-test", rules["source-name"], {
  valid: [
    {
      code: convertObjectToCJSExportString(valid),
    },
    {
      code: convertObjectToESMExportString(valid),
    },
  ],
  invalid: [
    {
      code: convertObjectToCJSExportString(badSourceName),
      errors: [
        {
          message: "Source names should start with \"New\". See https://pipedream.com/docs/components/guidelines/#source-name",
        },
      ],
    },
    {
      code: convertObjectToESMExportString(badSourceName),
      errors: [
        {
          message: "Source names should start with \"New\". See https://pipedream.com/docs/components/guidelines/#source-name",
        },
      ],
    },
  ],
});

ruleTester.run("source-description-test", rules["source-description"], {
  valid: [
    {
      code: convertObjectToCJSExportString(valid),
    },
    {
      code: convertObjectToESMExportString(valid),
    },
  ],
  invalid: [
    {
      code: convertObjectToCJSExportString(badSourceDescription),
      errors: [
        {
          message: "Source descriptions should start with \"Emit new\". See https://pipedream.com/docs/components/guidelines/#source-description",
        },
      ],
    },
    {
      code: convertObjectToESMExportString(badSourceDescription),
      errors: [
        {
          message: "Source descriptions should start with \"Emit new\". See https://pipedream.com/docs/components/guidelines/#source-description",
        },
      ],
    },
  ],
});
