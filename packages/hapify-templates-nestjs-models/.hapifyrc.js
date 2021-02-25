module.exports = {
  name: 'Hapify templates for Nestjs models',
  description: 'Generate the models for a Nestjs application',
  templates: [
    {
      path: 'src/generated/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'src/generated/models.module.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'src/generated/helpers/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/helpers/format-populate.helper.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/{kebab}.module.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/common/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/common/{kebab}-model.module.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/common/services/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/common/services/{kebab}-database.service.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/common/services/{kebab}.service.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/{kebab}-rest.module.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/controllers/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/controllers/{kebab}.controller.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/services/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/services/{kebab}-rest-dto.service.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-create-body.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-find-unique-query.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-find-unique-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-find-many-query.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-count-query.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-update-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-update-body.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-upsert-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-upsert-body.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-delete-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
  ],
};
