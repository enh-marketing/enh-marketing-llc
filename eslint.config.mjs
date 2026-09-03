import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import reactHooks from "eslint-plugin-react-hooks";

/** Replaces eslint-config-next.
 *
 *  That preset bundled three things: TypeScript rules, the react-hooks rules,
 *  and Next-specific checks (next/no-img-element, next/no-html-link-for-pages
 *  and the rest of the core-web-vitals set). The first two are reproduced here
 *  from their own packages. The third is dropped because those rules only
 *  describe Next APIs that no longer exist in this project, and eslint-plugin-astro
 *  covers the equivalent ground for .astro files.
 *
 *  One rule is deliberately not restored: next/no-img-element, which would flag
 *  the plain <img> tags that replaced next/image. They are correct here, since
 *  astro:assets cannot be reached from inside a React component. */
export default defineConfig([
  globalIgnores(["dist/**", ".astro/**", "node_modules/**", ".next/**"]),

  ...tseslint.configs.recommended,
  ...astro.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },
]);
