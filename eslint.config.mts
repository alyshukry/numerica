import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import json from "@eslint/json"
import { defineConfig } from "eslint/config"

export default defineConfig([
    // JS + TS files
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        ignores: ["dist/**", "node_modules/**"],
        languageOptions: {
            globals: globals.node
        },
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended
        ],
        rules: {
            indent: ["error", 4],
            semi: ["error", "never"],
            quotes: ["error", "single"],
            camelcase: ["error", { properties: "always" }],
            "comma-dangle": ["error", "always-multiline"],
            "no-unused-vars": ["warn"],
            "no-console": "off",
            "arrow-parens": ["error", "always"],
            "object-curly-spacing": ["error", "always"]
        }
    },

    // JSON files
    {
        files: ["**/*.json"],
        plugins: { json },
        language: "json/json",
        extends: ["json/recommended"]
    }
])