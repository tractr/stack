module.exports = {
  name: 'Hapify templates - models',
  description: 'Generate the models dtos',
  templates: [
    {
      path: 'generated/casl/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/casl/src/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/casl/src/config/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/casl/src/config/get-prisma-user-query.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/casl/src/config/permissions.config.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/casl/src/config/role-permission.config.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/casl/src/constants/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/casl/src/constants/default-select-ownerships.constant.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/casl/src/interfaces/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/casl/src/interfaces/actions.interface.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/casl/src/interfaces/app-ability.interface.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/casl/src/interfaces/subjects.interface.ts',
      engine: 'hpf',
      input: 'all',
    },
  ],
};
