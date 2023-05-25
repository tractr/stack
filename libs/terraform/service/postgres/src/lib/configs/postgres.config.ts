import {PostgresComponentDefaultConfig} from '../interfaces';

import {Secret, SERVICE_COMPONENT_DEFAULT_CONFIG,} from '@trxn/terraform-service-ecs';

export const POSTGRES_COMPONENT_DEFAULT_CONFIG: PostgresComponentDefaultConfig =
  {
    ...SERVICE_COMPONENT_DEFAULT_CONFIG,
    containerConfig: {
      imageName: 'postgres',
      imageTag: '13-alpine',
      environments: {
        POSTGRES_DB: 'api',
        POSTGRES_USER: Secret(),
        POSTGRES_PASSWORD: Secret(),
      },
    },
    enableBackups: false,
    backupsConfig: {
      imageName: 'fekide/volumerize',
      imageTag: '1.8.2-postgres',
      environments: {
        VOLUMERIZE_SOURCE: '/source',
        VOLUMERIZE_TARGET: 'file:///backups',
        VOLUMERIZE_JOBBER_TIME: '0 0 */4 * * *',
        VOLUMERIZE_FULL_IF_OLDER_THAN: '3D',
        REMOVE_OLDER_THAN: '30D',
        VOLUMERIZE_POSTGRES_DATABASE: 'api',
        VOLUMERIZE_POSTGRES_USERNAME: Secret('POSTGRES_USER'),
        VOLUMERIZE_POSTGRES_PASSWORD: Secret('POSTGRES_PASSWORD'),
        VOLUMERIZE_POSTGRES_HOST: (service) => service.getServiceDomainName('postgres'),
        VOLUMERIZE_POSTGRES_PORT: '5432',
      },
    },
  };
