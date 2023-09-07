module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "standard-with-typescript",
    "plugin:react/recommended"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script",
        project: "./tsconfig.json"
      }
    }
  ],
  "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": 'off',
      "react/react-in-jsx-scope": 'off',
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      indent: ["error", 2],
      "jsx-quotes": ["error", "prefer-single"],
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/method-signature-style": "off",
      "@typescript-eslint/strict-boolean-expressions": "off"
  }
}
