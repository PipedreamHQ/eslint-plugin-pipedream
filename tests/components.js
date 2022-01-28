module.exports = {
  valid: {
    key: "app-component",
    name: "New Events",
    description: "Emit new events",
    version: "0.0.1",
    type: "source",
    props: {
      test: {
        type: "string",
        label: "Test",
        description: "test",
        optional: true,
        default: "foo",
      },
    },
  },
  requiredPropertyKeyMissing: {
    name: "Test",
    description: "hello",
    version: "0.0.1",
    type: "source",
  },
  requiredPropertyNameMissing: {
    key: "test",
    description: "hello",
    version: "0.0.1",
    type: "source",
  },
  requiredPropertyDescriptionMissing: {
    key: "test",
    name: "Test",
    version: "0.0.1",
    type: "source",
  },
  requiredPropertyVersionMissing: {
    key: "test",
    name: "Test",
    description: "foo",
    type: "source",
  },
  requiredPropertyTypeMissing: {
    key: "test",
    name: "Test",
    description: "foo",
    version: "0.0.1",
  },
  optionalPropWithoutDefaultValue: {
    key: "test",
    name: "Test",
    description: "hello",
    version: "0.0.1",
    props: {
      test: {
        type: "string",
        label: "Test",
        description: "test",
        optional: true,
      },
    },
  },
  missingPropsLabel: {
    key: "test",
    name: "Test",
    description: "hello",
    version: "0.0.1",
    props: {
      test: {
        type: "string",
        description: "test",
      },
    },
  },
  missingPropsLabelTimer: {
    key: "test",
    name: "Test",
    description: "hello",
    version: "0.0.1",
    props: {
      test: {
        type: "$.interface.timer",
        description: "test",
      },
    },
  },
  missingPropsLabelHttp: {
    key: "test",
    name: "Test",
    description: "hello",
    version: "0.0.1",
    props: {
      test: {
        type: "$.interface.http",
        description: "test",
      },
    },
  },
  missingPropsDescription: {
    key: "test",
    name: "Test",
    description: "hello",
    version: "0.0.1",
    props: {
      test: {
        type: "string",
        label: "Test",
      },
    },
  },
  missingPropsDescriptionTimer: {
    key: "test",
    name: "Test",
    description: "hello",
    version: "0.0.1",
    props: {
      test: {
        type: "$.interface.timer",
        label: "Test",
      },
    },
  },
  missingPropsDescriptionHttp: {
    key: "test",
    name: "Test",
    description: "hello",
    version: "0.0.1",
    props: {
      test: {
        type: "$.interface.http",
        label: "Test",
      },
    },
  },
  badSourceName: {
    key: "test",
    name: "Test",
    description: "foo",
    type: "source",
  },
  badSourceDescription: {
    key: "test",
    name: "Test",
    description: "foo",
    type: "source",
  },
  tsVersion: {
    key: "test",
    name: "Test",
    description: "foo",
    type: "action",
    version: "0.0.{{ts}}",
  },
};
