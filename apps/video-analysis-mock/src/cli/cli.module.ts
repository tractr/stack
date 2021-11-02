import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { AlertService, FramePerformanceService } from './services';

import { MessageBrokerAlertModule } from '@cali/message-broker-alert';
import { MessageBrokerPredictionLogModule } from '@cali/message-broker-prediction-log';

@Module({
  imports: [
    ConsoleModule,
    MessageBrokerAlertModule.register({
      url: 'amqp://localhost:5672',
    }),
    MessageBrokerPredictionLogModule.register({
      url: 'amqp://localhost:5672',
    }),
  ],
  providers: [AlertService, FramePerformanceService],
})
export class CliModule {}
