module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["xo", "prettier"],
  overrides: [
    {
      extends: ["xo-typescript", "prettier"],
      files: ["*.ts"],
    },
    {
      files: ["src/**/models/**/*.ts"],
      rules: {
        "@typescript-eslint/naming-convention": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-implicit-coercion": [2, { number: false }],
    "new-cap": ["error", { capIsNewExceptions: ["Router"] }],
  },
};
