module.exports = {
  name: 'Hapify templates for Nestjs models',
  description: 'Generate the models for a Nestjs application',
  templates: [
    {
      path: 'generated/nestjs-models/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models/src/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models/src/models.module.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models/src/{kebab}/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models/src/{kebab}/{kebab}.module.ts',
      engine: 'hpf',
      input: 'one',
    },
  ],
};