# `eslint-plugin-pipedream`

This ESLint plugin implements rules that validate the [Pipedream component guidelines](https://pipedream.com/docs/components/guidelines/#guidelines-patterns). Only a subset of the guidelines are mapped to rules: those that can be statically-analyzed.

Learn more about Pipedream at [https://pipedream.com/docs](https://pipedream.com/docs), and read more about Pipedream components in [the component API docs](https://pipedream.com/docs/components/api/).

We will gladly accept issues and PRs in this repo.

## Installation

In the repo where you manage Pipedream components, run:

```bash
npm install eslint-plugin-pipedream --save-dev
```

Then add the Pipedream plugin to the `plugins` section of your [ESLint config file](https://eslint.org/docs/user-guide/configuring/):

```javascript
"plugins": [
  "pipedream"
],
```

