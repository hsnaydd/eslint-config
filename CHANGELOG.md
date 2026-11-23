# Changelog

## [3.0.0](https://github.com/hsnaydd/eslint-config/compare/v2.0.1...v3.0.0) (2026-11-23)


### ⚠ BREAKING CHANGES

* TypeScript 6.0 is now required. TypeScript 5 is no longer supported.

### Features

* upgrade @next/eslint-plugin-next to v16 ([bc31d8b](https://github.com/hsnaydd/eslint-config/commit/bc31d8b915bb7563cd8bc341e805d030264664f8))
* upgrade eslint-plugin-n to v18 ([fe0f559](https://github.com/hsnaydd/eslint-config/commit/fe0f559ce80c48184a1ab8b1a8e3fb0b0ee222a3))


### Bug Fixes

* define globals for JavaScript files ([d82e1f3](https://github.com/hsnaydd/eslint-config/commit/d82e1f387c633ea50807a9fbc7908f32931121b9))


### Build System

* require TypeScript 6 ([2601f76](https://github.com/hsnaydd/eslint-config/commit/2601f76277f5eb4234ce2778d4095037076cb3eb))

## [2.0.1](https://github.com/hsnaydd/eslint-config/compare/v2.0.0...v2.0.1) (2026-11-21)


### 📦 Package renamed

* This package was previously published as `@atolye15/eslint-config`. It now continues as `@hsnaydd/eslint-config`. Version 2.0.0 is also available under the new name with the same rules. To migrate, replace the package name in your `package.json` and in the imports of your ESLint config.

### Bug Fixes

* enable the recommended Next.js rules in the next preset ([aec9434](https://github.com/hsnaydd/eslint-config/commit/aec9434f7bcc7c712fe5bbf28c29812d9ab99be0))
* make the react and import plugins work with ESLint 10 ([1bddf4b](https://github.com/hsnaydd/eslint-config/commit/1bddf4b6dcd82920b86c9ed031ee48b2c91be9df))
* replace the deprecated @typescript-eslint/no-loop-func rule with the core rule ([2c20ac6](https://github.com/hsnaydd/eslint-config/commit/2c20ac6025903340f5d028b8099fafcd095553a9))

## 2.0.0 (2026-02-18)


### Features

* add Next.js configuration preset ([17d3bf3](https://github.com/hsnaydd/eslint-config/commit/17d3bf3a67d5e7162253a042b71b1c34d8aa9d17))
* add vitest configuration preset ([48647a2](https://github.com/hsnaydd/eslint-config/commit/48647a22731932f48352c4a29accef83652daab5))
* introduce @atolye15/eslint-config ([4131484](https://github.com/hsnaydd/eslint-config/commit/41314848134204c1095be6f550c0f4564ba1be21))


### Refactors

* modernize eslint config for es2022+ and typescript 5.x ([d927191](https://github.com/hsnaydd/eslint-config/commit/d927191d79cbeb244dc2622dfacf54f1e0e583d6))
* remove jest from react and node presets ([76e4295](https://github.com/hsnaydd/eslint-config/commit/76e429568e774a71f59fd78a452f102eeac504fb))
* standardize defineConfig([]) array convention ([19e1890](https://github.com/hsnaydd/eslint-config/commit/19e1890d6286be0c53fe83cd1297e8b7ae8cf4f0))
