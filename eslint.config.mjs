import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("plugin:react/recommended"),
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // TODO: Remove this rule once the project is ready
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { ignoreRestSiblings: true },
      ],
    },
  },
];

export default eslintConfig;
