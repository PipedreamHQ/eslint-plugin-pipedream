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
  missingPropsLabelTimer,
  missingPropsLabelHttp,
  missingPropsDescription,
  missingPropsDescriptionTimer,
  missingPropsDescriptionHttp,
  badSourceName,
  badSourceDescription,
  tsVersion,
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

function withPrecedingStatement(code) {
  return `
  import foo from "bar";
  ${code}
  `;
}

function makeComponentTestCase ({
  ruleName,
  name = `${ruleName}-test`,
  validComponent = valid,
  invalidComponent,
  errorMessage,
}) {
  return {
    name,
    ruleName,
    validComponent,
    invalidComponent,
    errorMessage,
  };
}

const componentTestConfigs = [
  {
    ruleName: "required-properties-key",
    invalidComponent: requiredPropertyKeyMissing,
    errorMessage: "Components must export a key property. See https://pipedream.com/docs/components/guidelines/#required-metadata",
  },
  {
    ruleName: "required-properties-name",
    invalidComponent: requiredPropertyNameMissing,
    errorMessage: "Components must export a name property. See https://pipedream.com/docs/components/guidelines/#required-metadata",
  },
  {
    ruleName: "required-properties-description",
    invalidComponent: requiredPropertyDescriptionMissing,
    errorMessage: "Components must export a description property. See https://pipedream.com/docs/components/guidelines/#required-metadata",
  },
  {
    ruleName: "required-properties-version",
    invalidComponent: requiredPropertyVersionMissing,
    errorMessage: "Components must export a version property. See https://pipedream.com/docs/components/guidelines/#required-metadata",
  },
  {
    ruleName: "required-properties-type",
    invalidComponent: requiredPropertyTypeMissing,
    errorMessage: "Components must export a type property (\"source\" or \"action\")",
  },
  {
    ruleName: "default-value-required-for-optional-props",
    invalidComponent: optionalPropWithoutDefaultValue,
    errorMessage: "Component prop test is marked \"optional\", so it may need a \"default\" property. See https://pipedream.com/docs/components/guidelines/#default-values",
  },
  {
    ruleName: "props-label",
    validComponent: missingPropsLabelTimer,
    invalidComponent: missingPropsLabel,
    errorMessage: "Component prop test must have a label. See https://pipedream.com/docs/components/guidelines/#props",
  },
  {
    ruleName: "props-label",
    validComponent: missingPropsLabelHttp,
    invalidComponent: missingPropsLabel,
    errorMessage: "Component prop test must have a label. See https://pipedream.com/docs/components/guidelines/#props",
  },
  {
    ruleName: "props-description",
    validComponent: missingPropsDescriptionTimer,
    invalidComponent: missingPropsDescription,
    errorMessage: "Component prop test must have a description. See https://pipedream.com/docs/components/guidelines/#props",
  },
  {
    ruleName: "props-description",
    validComponent: missingPropsDescriptionHttp,
    invalidComponent: missingPropsDescription,
    errorMessage: "Component prop test must have a description. See https://pipedream.com/docs/components/guidelines/#props",
  },
  {
    ruleName: "source-name",
    invalidComponent: badSourceName,
    errorMessage: "Source names should start with \"New\". See https://pipedream.com/docs/components/guidelines/#source-name",
  },
  {
    ruleName: "source-description",
    invalidComponent: badSourceDescription,
    errorMessage: "Source descriptions should start with \"Emit new\". See https://pipedream.com/docs/components/guidelines/#source-description",
  },
  {
    name: "ts-version-test",
    ruleName: "no-ts-version",
    invalidComponent: tsVersion,
    errorMessage: "{{ts}} macro should be removed before committing",
  },
];

const componentTestCases = componentTestConfigs.map(makeComponentTestCase);

// Run `ruleTester.run` on each test case
componentTestCases.forEach((testCase) => {
  const {
    name,
    ruleName,
    validComponent,
    invalidComponent,
    errorMessage,
  } = testCase;
  ruleTester.run(name, rules[ruleName], {
    valid: [
      {
        code: convertObjectToCJSExportString(validComponent),
      },
      {
        code: convertObjectToESMExportString(validComponent),
      },
    ],
    invalid: [
      {
        code: convertObjectToCJSExportString(invalidComponent),
        errors: [
          {
            message: errorMessage,
          },
        ],
      },
      {
        code: convertObjectToESMExportString(invalidComponent),
        errors: [
          {
            message: errorMessage,
          },
        ],
      },
    ],
  });
});

RuleTester.describe("On ESM export default with preceding statements", () => {
  // Run each test case on ESM default export components with preceding statements
  // (lines above the `export default` declaration)
  componentTestCases.forEach((testCase) => {
    const {
      name,
      ruleName,
      validComponent,
      invalidComponent,
      errorMessage,
    } = testCase;
    ruleTester.run(name, rules[ruleName], {
      valid: [
        {
          code: withPrecedingStatement(convertObjectToESMExportString(validComponent)),
        },
      ],
      invalid: [
        {
          code: withPrecedingStatement(convertObjectToESMExportString(invalidComponent)),
          errors: [
            {
              message: errorMessage,
            },
          ],
        },
      ],
    });
  });
});
