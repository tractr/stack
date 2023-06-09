import { ApiContainerConfig } from './interfaces';

import { HttpContainer } from '@trxn/terraform-service-ecs';

export class ApiContainer extends HttpContainer<ApiContainerConfig> {
  usePrivateImage(): boolean {
    return true;
  }

  protected getPort(): number {
    return 3000;
  }
}
