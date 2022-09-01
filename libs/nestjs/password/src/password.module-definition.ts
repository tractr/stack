import { ConfigurableModuleBuilder } from '@nestjs/common';

import { PasswordModuleOptions } from './interfaces';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<PasswordModuleOptions>().build();