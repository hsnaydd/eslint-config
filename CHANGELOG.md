# Changelog

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
