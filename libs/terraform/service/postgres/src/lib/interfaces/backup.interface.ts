import {ContainerInternalConfig, ContainerPublicConfig, EnvironmentOrSecretValue,} from '@trxn/terraform-service-ecs';

export interface BackupContainerPublicConfig extends ContainerPublicConfig {
  environments: ContainerPublicConfig['environments'] & {
    VOLUMERIZE_SOURCE: EnvironmentOrSecretValue;
    VOLUMERIZE_TARGET: EnvironmentOrSecretValue;
    VOLUMERIZE_JOBBER_TIME: EnvironmentOrSecretValue;
    VOLUMERIZE_FULL_IF_OLDER_THAN: EnvironmentOrSecretValue;
    AWS_ACCESS_KEY_ID?: EnvironmentOrSecretValue;
    AWS_SECRET_ACCESS_KEY?: EnvironmentOrSecretValue;
    VOLUMERIZE_POSTGRES_USERNAME: EnvironmentOrSecretValue;
    VOLUMERIZE_POSTGRES_PASSWORD: EnvironmentOrSecretValue;
    VOLUMERIZE_POSTGRES_HOST: EnvironmentOrSecretValue;
    VOLUMERIZE_POSTGRES_PORT: EnvironmentOrSecretValue;
    VOLUMERIZE_POSTGRES_DATABASE: EnvironmentOrSecretValue;
  };
}
export type BackupContainerConfig = ContainerInternalConfig &
  BackupContainerPublicConfig;
