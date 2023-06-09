import { formatFiles, Tree } from '@nrwl/devkit';

import {
  addFiles,
  addGitIgnoreEntry,
  addImplicitDependencies,
  addTemplateDependencies,
  createSecondaryEntrypoints,
  generateLibrary,
  normalizeOptions,
  updateProjectTargets,
} from './helpers';
import { addBabelRc } from './helpers/add-babelrc.helper';
import { HapifyLibraryGeneratorOptionsWithExtra } from './schema';
import * as packageJson from '../../../package.json';
import {
  addPackageToPackageJson,
  getLogger,
  installPackagesTask,
} from '../../helpers';
import { DEFAULT_LIBRARY_USE_CONTEXT } from '../../schematics.constants';
import addGenerateTarget from '../target-generate/generator';

export default async function hapifyLibraryGenerator(
  tree: Tree,
  options: HapifyLibraryGeneratorOptionsWithExtra,
) {
  const log = getLogger(tree);
  // Format options
  const normalizedOptions = normalizeOptions(tree, options);

  const currentVersion = packageJson.version;

  // Default values for library generator options
  const { extra, projectName, hapifyTemplate } = normalizedOptions;

  log.debug(`Generate ${hapifyTemplate} library`);

  await generateLibrary(tree, normalizedOptions);

  await createSecondaryEntrypoints(tree, normalizedOptions);

  addFiles(tree, normalizedOptions);

  addGitIgnoreEntry(tree, normalizedOptions);

  await addGenerateTarget(tree, {
    project: projectName,
    ...extra,
  });

  await addPackageToPackageJson(
    tree,
    ['@trxn/hapify-config', normalizedOptions.template].map((packageName) => ({
      packageName,
      version: currentVersion,
    })),
  );

  await addPackageToPackageJson(tree, '@hapify/cli');

  addImplicitDependencies(tree, normalizedOptions);

  updateProjectTargets(tree, normalizedOptions);

  if (DEFAULT_LIBRARY_USE_CONTEXT[hapifyTemplate].includes('react'))
    addBabelRc(tree, normalizedOptions);

  await addTemplateDependencies(tree, normalizedOptions);

  await formatFiles(tree);

  installPackagesTask(tree, options);
}
