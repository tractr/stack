import { Construct } from 'constructs';
import * as deepmerge from 'deepmerge';

import { AppConfig, Environments } from '../configs';
import { TerraformEnvironmentVariables } from '../dtos';

import { AwsStack, AwsStackConfig } from '@trxn/terraform-aws-stack';
import { NetworkGroup } from '@trxn/terraform-group-network';
import { PoolGroup } from '@trxn/terraform-group-pool';
import {
  guessNxDockerizedAppsNames,
  RegistryGroup,
} from '@trxn/terraform-group-registry';
import { ZoneGroup } from '@trxn/terraform-group-zone';
import { AdminComponent } from '@trxn/terraform-service-admin';
import { ApiComponent } from '@trxn/terraform-service-api';
import { PostgresComponent } from '@trxn/terraform-service-postgres';
import { PwaComponent } from '@trxn/terraform-service-pwa';

export class MainStack extends AwsStack<AwsStackConfig> {
  protected readonly registryGroup: RegistryGroup;

  protected readonly zoneGroup: ZoneGroup;

  protected readonly networkGroup: NetworkGroup;

  protected readonly poolGroups: PoolGroup[] = [];

  constructor(
    scope: Construct,
    id: string,
    config: AwsStackConfig,
    terraformEnvs: TerraformEnvironmentVariables,
  ) {
    super(scope, id, config);

    const { PROJECT_CODE, DOMAIN_NAME, AWS_AVAILABILITY_ZONES } = terraformEnvs;

    // Add a registry for each apps that need to build a docker container
    this.registryGroup = new RegistryGroup(this, 'registry', {
      appsPath: guessNxDockerizedAppsNames(),
      projectCode: PROJECT_CODE,
    });

    // Add a zone group to aws
    this.zoneGroup = new ZoneGroup(this, 'zone', {
      domainName: DOMAIN_NAME,
    });

    // Add a network group to aws
    this.networkGroup = new NetworkGroup(this, 'network', {
      zones: AWS_AVAILABILITY_ZONES,
    });

    // Create a pool for each environment
    for (const environment of Environments) {
      // Merge app configs and environment configs
      const mergedConfig = deepmerge(AppConfig, environment.config);

      // Add the pool group that will host our container
      const poolGroup = new PoolGroup(this, environment.resourceId, {
        registryGroup: this.registryGroup,
        networkGroup: this.networkGroup,
        zoneGroup: this.zoneGroup,
        reverseProxyConfig: mergedConfig.reverseProxy,
        subDomain: environment.subDomain,
        fileStorageConfig: {
          s3PublicRead: true,
          s3AllowUpload: true,
        },
      });

      // Add a pwa as a http service
      poolGroup.addHttpService(PwaComponent, 'pwa', mergedConfig.pwa);

      // Add an admin as a http service
      poolGroup.addHttpService(AdminComponent, 'admin', mergedConfig.admin);

      // Add a api as a http service
      const api = poolGroup.addHttpService(
        ApiComponent,
        'api',
        mergedConfig.api,
      );

      // Add a postgres as a backend service
      poolGroup.addBackendService(
        PostgresComponent,
        'postgres',
        [api],
        mergedConfig.postgres,
      );

      // Store group
      this.poolGroups.push(poolGroup);
    }
  }
}
