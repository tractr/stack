import { relative } from 'path';

import {
  getWorkspaceLayout,
  readJson,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import fetch, { Response } from 'node-fetch';

import { NX_TOOLS_NX_PRISMA_PACKAGE } from './constants/nx-tools-prisma-package';
import generator from './generator';
import { PrismaLibraryGeneratorSchema } from './schema';

jest.mock('node-fetch');

describe('prisma-library generator', () => {
  let appTree: Tree;
  const options: PrismaLibraryGeneratorSchema = {
    name: 'test',
    type: 'nest',
    hapifyTemplates: ['prisma'],
    hapifyModelsJson: 'hapify-models.json',
    hapifyAdditionalTemplates: '',
    hapifyUseImportReplacements: true,
    useSecondaryEndpoint: true,
    addSecondaryEndpoint: [],
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();

    // Mock node fetch http call
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      Promise.resolve({
        json: () =>
          Promise.resolve({
            'dist-tags': { latest: '1.0.0' },
          }),
      }) as unknown as Promise<Response>,
    );
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });

  it('should generate a .hapifyrc.js file', async () => {
    await generator(appTree, {
      ...options,
    });

    const { libsDir } = getWorkspaceLayout(appTree);

    expect(appTree.exists(`${libsDir}/test/.hapifyrc.js`)).toBeTruthy();

    const relativePath = relative(`${libsDir}/test`, '.');
    expect(appTree.read(`${libsDir}/test/.hapifyrc.js`)?.toString())
      .toEqual(`const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@trxn/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'test',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '${relativePath}/hapify-models.json',
  extends: [
    '@trxn/hapify-templates-prisma',
  ],
  importReplacements: {
  "nestjs-models": "@proj/nestjs-models",
  "nestjs-models-common": "@proj/nestjs-models-common"
}
};
`);
  });

  it('should generate a prisma/seed.ts file', async () => {
    await generator(appTree, {
      ...options,
    });

    const { libsDir } = getWorkspaceLayout(appTree);

    expect(appTree.exists(`${libsDir}/test/prisma/seed.ts`)).toBeTruthy();
    expect(appTree.read(`${libsDir}/test/prisma/seed.ts`)?.toString())
      .toEqual(`import { seed } from '../src/index';

seed().catch((e) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start the server. See the error below.');
  // eslint-disable-next-line no-console
  console.error(e);
});`);
  });

  it('should generate a prisma/schemas/base.prisma file', async () => {
    await generator(appTree, {
      ...options,
    });

    const { libsDir } = getWorkspaceLayout(appTree);

    expect(
      appTree.exists(`${libsDir}/test/prisma/schemas/base.prisma`),
    ).toBeTruthy();

    const relativePath = relative(`${libsDir}/test/prisma`, '.');
    expect(
      appTree.read(`${libsDir}/test/prisma/schemas/base.prisma`)?.toString(),
    ).toEqual(`// ------------------------------------------------

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  output = "${relativePath}/node_modules/.prisma/client"
  previewFeatures = ["filterJson"]
}
`);
  });

  it('should add @nx-tools/nx-prisma package', async () => {
    await generator(appTree, { ...options });

    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson.devDependencies).toBeDefined();
    expect(
      packageJson.devDependencies[NX_TOOLS_NX_PRISMA_PACKAGE],
    ).toBeDefined();
  });
});
