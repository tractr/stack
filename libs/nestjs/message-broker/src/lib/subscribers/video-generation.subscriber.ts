/* eslint-disable camelcase */
import { Inject, Injectable } from '@nestjs/common';
import { Logger } from '@tractr/nestjs-core';
import { PubSub } from 'graphql-subscriptions';

import { NESTJS_MESSAGE_BROKER_VIDEO_GENERATION_QUEUE } from '../constants';

import { AlertVideoStatus } from '@cali/common-models';
import {
  AlertVideoUpdated,
  AlertVideoUpdatedWithVideo,
  EventTypeToCamelCase,
  MessageBrokerVideoGeneration,
  MessageBrokerVideoGenerationSubscribe,
} from '@cali/message-broker-video-generation';
import { ALERT_SERVICE, AlertService } from '@cali/nestjs-common';
import { PUB_SUB_SERVICE } from '@cali/nestjs-pub-sub';

type AlertVideoUpdatedData = {
  videoStatus: AlertVideoStatus;
  videoUrl: string | null;
};

@Injectable()
export class VideoGenerationSubscriber {
  constructor(
    private readonly logger: Logger,
    @Inject(ALERT_SERVICE) private readonly alertService: AlertService,
    @Inject(PUB_SUB_SERVICE) private readonly pubSub: PubSub,
  ) {
    this.logger.setContext(VideoGenerationSubscriber.name);
  }

  @MessageBrokerVideoGenerationSubscribe({
    queue: NESTJS_MESSAGE_BROKER_VIDEO_GENERATION_QUEUE,
    routingKey: '',
  })
  async handleVideoGenerationUpdated(rawMessage: MessageBrokerVideoGeneration) {
    this.logger.debug(
      `Received new video generation update from message broker (numFrame: ${rawMessage.num_frame}`,
    );

    const message = this.formatVideoGenerationMessage(rawMessage);
    const updatedData: AlertVideoUpdatedData = {
      videoStatus: message.eventType,
      videoUrl:
        message.eventType === 'videoAvailable' ? message.videoUrl : null,
    };

    try {
      const alert = await this.alertService.update({
        where: { externalFrameId: message.numFrame },
        data: { ...updatedData },
      });

      this.logger.debug(`Updated alert with new video status (id: ${alert.id}`);
    } catch (error) {
      this.logger.error(
        `Failed to update alert with new video status (numFrame: ${rawMessage.num_frame}): ${error}`,
      );
    }
  }

  private formatVideoGenerationMessage(
    message: MessageBrokerVideoGeneration,
  ): AlertVideoUpdated {
    let formattedMessage: Partial<AlertVideoUpdated> = {
      numFrame: message.num_frame,
      eventType: EventTypeToCamelCase[message.event_type],
    };

    if (message.event_type === 'video_available') {
      formattedMessage = {
        ...formattedMessage,
        videoUrl: message.video_url,
      } as AlertVideoUpdatedWithVideo;
    }
    return formattedMessage as AlertVideoUpdated;
  }
}