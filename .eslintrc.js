// module.export = {
//   "env": {
//     "browser": true,
//     "node": true,
//     "es6": true
//   },
//   "extends": [
//     "airbnb",
//     "airbnb/hooks",
//     "eslint:recommended"
//   ],
//   "parser": "babel-eslint",
//   "parserOptions": {
//     "ecmaVersion": 7,
//     "ecmaFeatures": {
//       "jsx": true
//     },
//     "sourceType": "module"
//   },
//   "plugins": ["babel"],
//   // "settings": {
//   //   "import/resolver": {
//   //     "babel-module": {}
//   //   }
//   // },
//   "node": {
//     "paths": [
//         __dirname,
//     ],
// },
//   "rules": {
//     "react/jsx-props-no-spreading": [0, {}],
//     "jsx-a11y/label-has-associated-control": ["error", { "assert": "either" } ],
//     "jsx-a11y/anchor-is-valid": 0,
//     "no-console": [1, { "allow": ["info", "warn", "error"] }],
//     "arrow-body-style": 0,
//     "import/no-named-as-default": 0,
//     "import/prefer-default-export": 0,
//     "no-param-reassign": ["error", { "props": false }],
//   }
// }

module.exports = {
  parser: 'babel-eslint', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    'airbnb', // Uses the recommended rules from @eslint-plugin-react
    'airbnb/hooks', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:cypress/recommended',
  ],
  plugins: ['babel', 'cypress', 'import'],
  rules: {
    // Place to specify ESLint rules.
    // Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'no-console': [1, { allow: ['info', 'warn', 'error'] }],
    'react/jsx-props-no-spreading': [0, {}],
    'arrow-body-style': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': ['error', { props: false }],
  },
};
