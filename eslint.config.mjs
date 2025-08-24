// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginNoUseExtendNative from 'eslint-plugin-no-use-extend-native'
import eslintPluginReact from 'eslint-plugin-react';
import sonarjs from "eslint-plugin-sonarjs";

export default tseslint.config(
  // Eslint defult
  eslint.configs.recommended,

  // ESLint plugins:
  eslintPluginNoUseExtendNative.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  // @ts-ignore
  sonarjs.configs.recommended,

  // TypeScript ESLint:
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    rules: {
      // desabled becuase there are cases where using 3rd party/build in JS functions, we know it will never return null
      "@typescript-eslint/no-non-null-assertion": "off",
      // changed TEMPORARLY since I need to change this code anyway
      "@typescript-eslint/no-unsafe-enum-comparison": "off",

    }
  },
  // Enable TypeScript parser for ES lint rules that require type checking
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigDirName: import.meta.dirname,
      },
    },
  },
  // Disable rules that type checking for JavaScript files, including this file
  {
    files: ['/.js', '/.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
);

