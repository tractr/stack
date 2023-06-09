import { ServiceComponent } from '../services';

export interface ContainerDefinition {
  name: string;
  image: string;
  entryPoint?: string[];
  essential?: boolean;
  cpu?: number;
  memory?: number;
  networkMode: string;
  logConfiguration: {
    logDriver: string;
    options: {
      'awslogs-group': string;
      'awslogs-region': string;
      'awslogs-stream-prefix': string;
    };
  };
  environment?: EnvironmentDefinition[];
  secrets?: SecretDefinition[];
  portMappings?: {
    containerPort: number;
    hostPort?: number;
    protocol?: 'tcp' | 'udp';
  }[];
  mountPoints?: MountPointDefinition[];
  dockerLabels?: Record<string, string>;
}

export interface EnvironmentDefinition {
  name: string;
  value: string;
}

export interface SecretDefinition {
  name: string;
  valueFrom: string;
}

export interface ImageDefinition {
  name: string;
  imageUri: string;
}

export interface MountPointDefinition {
  sourceVolume: string;
  containerPath: string;
}

export interface MountPoint extends MountPointDefinition {
  preventDestroy?: boolean;
  enableBackups?: boolean;
}

export type EnvironmentCb<C extends ContainerConfig = ContainerConfig> = (
  service: ServiceComponent,
  config: C,
) => string;

export type EnvironmentValue = {
  type: 'env';
  value: string | EnvironmentCb;
};
export type SecretValue = {
  type: 'secret';
  secretKey?: string;
};

export type EnvironmentLikeValue = string | EnvironmentCb | EnvironmentValue;
export type SecretLikeValue = symbol | SecretValue;
export type EnvironmentOrSecretValue = EnvironmentLikeValue | SecretLikeValue;

export interface ContainerInternalConfig {
  name: string;
}

export interface ContainerPublicConfig {
  /**
   * The public Docker image, example: traefik, blacklabelops/volumerize
   * Or the private application name: api-backend
   */
  imageName: string;
  imageTag: string;
  cpu?: number;
  memory?: number;
  environments?: Record<string, EnvironmentOrSecretValue>;
  labels?: Record<string, string>;
}

export type ContainerConfig = ContainerInternalConfig & ContainerPublicConfig;
