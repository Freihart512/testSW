module.exports = {
  extends: ["eslint-config-codely/typescript"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          parser: "flow",
          useTabs: false,
          PrintWidth: 80,
        },
      ],
    },
  ],
};
