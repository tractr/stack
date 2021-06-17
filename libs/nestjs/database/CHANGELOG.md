# Changelog

This file was generated using
[@jscutlery/semver](https://github.com/jscutlery/semver).

# [1.4.0](https://github.com/tractr/stack/compare/nestjs-database-1.3.0...nestjs-database-1.4.0) (2021-06-16)

### Features

- change stack lerna repository to nx workspace
  ([#119](https://github.com/tractr/stack/issues/119))
  ([e9104bd](https://github.com/tractr/stack/commit/e9104bde081619c0f3752bb9d129e19d1d6bda5d))

# Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# @tractr/nestjs-database [1.3.0](https://github.com/tractr/stack/compare/@tractr/nestjs-database@1.2.2...@tractr/nestjs-database@1.3.0) (2021-04-12)

### Features

- update README of packages to publish new versions
  ([#77](https://github.com/tractr/stack/issues/77))
  ([e6bf415](https://github.com/tractr/stack/commit/e6bf415af3fe5588c15577f047a6262f81c1564f))

### Dependencies

- **@tractr/nestjs-core:** upgraded to 1.5.0

## @tractr/nestjs-database [1.2.2](https://github.com/tractr/stack/compare/@tractr/nestjs-database@1.2.1...@tractr/nestjs-database@1.2.2) (2021-04-09)

### Bug Fixes

- enforce prisma options to have better typing
  ([#54](https://github.com/tractr/stack/issues/54))
  ([2b8b073](https://github.com/tractr/stack/commit/2b8b07379e55801fd5ad84001a0081ebaab5004d))

## @tractr/nestjs-database [1.2.1](https://github.com/tractr/stack/compare/@tractr/nestjs-database@1.2.0...@tractr/nestjs-database@1.2.1) (2021-04-05)

### Dependencies

- **@tractr/nestjs-core:** upgraded to 1.4.1

# @tractr/nestjs-database [1.2.0](https://github.com/tractr/stack/compare/@tractr/nestjs-database@1.1.0...@tractr/nestjs-database@1.2.0) (2021-04-02)

### Features

- put the prisma log into the nestjs logger
  ([#51](https://github.com/tractr/stack/issues/51))
  ([ab89373](https://github.com/tractr/stack/commit/ab893733650253d0aa17cbaaab50277183855563))

# @tractr/nestjs-database [1.1.0](https://github.com/tractr/stack/compare/@tractr/nestjs-database@1.0.1...@tractr/nestjs-database@1.1.0) (2021-03-12)

### Features

- add test to hapify templates models
  ([#3](https://github.com/tractr/stack/issues/3))
  ([94cfa21](https://github.com/tractr/stack/commit/94cfa21e3b19770da715d48f86ec37462cb01d49))

## @tractr/nestjs-database [1.0.1](https://github.com/tractr/stack/compare/@tractr/nestjs-database@1.0.0...@tractr/nestjs-database@1.0.1) (2021-03-08)

### Bug Fixes

- change prepare scripts to prepublishOnly and not build when installing
  packages
  ([17366ad](https://github.com/tractr/stack/commit/17366ada324f19b5a853a96a01f42996a43385b8))
- remove postinsall scripts from packages.json
  ([e65748b](https://github.com/tractr/stack/commit/e65748b26a993f0e35bbec960907fcaaa5fe6270))
- replace postinstall script to prepare to build packages/ only on local
  ([5d96852](https://github.com/tractr/stack/commit/5d96852f2e753c78c62248c3f9846e6e0e94c07c))

# @tractr/nestjs-database 1.0.0 (2021-03-04)

### Bug Fixes

- add the rights files into packages to publish to npm registry
  ([760c1f9](https://github.com/tractr/stack/commit/760c1f98da944f39f821c7d4e30847e229bba44d))
- enfore repository settings to match with tractr/stack and allow npm publish
  ([0bd1ea3](https://github.com/tractr/stack/commit/0bd1ea38f5c1fc5f88e5611b214de8418bd59bdc))
- **nestjs-database:** change output build directory to dist
  ([f52eb70](https://github.com/tractr/stack/commit/f52eb702fb6c4a3fa3e20d89c49d5bd12955d7d3))
- add prisma generation into version control and start to configure nestjs-user
  to export files
  ([b621526](https://github.com/tractr/stack/commit/b621526e2a9c7dc5ed5f0a88c8cabffb636c17f7))

### Features

- **model templates:** working on unit test of rest dto service
  ([32c4bd8](https://github.com/tractr/stack/commit/32c4bd8624147565419cd8416763569ead397359))
- **nestjs-database:** make nestjs-database module global
  ([c926431](https://github.com/tractr/stack/commit/c926431759aea7dca9d09830b971bbb45d615028))