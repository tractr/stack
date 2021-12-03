import { Inject } from '@nestjs/common';
import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Alert } from '../models';

import { PUB_SUB_SERVICE, PubSubQueue } from '@cali/nestjs-pub-sub';

@Resolver(() => Alert)
export class AlertResolver {
  constructor(@Inject(PUB_SUB_SERVICE) private readonly pubSub: PubSub) {}

  /**
   * Provide a dummy root query to allow the schema to be builded
   * @returns
   */
  @Query(() => Alert)
  getAlert() {
    return {
      id: 'test',
    };
  }

  /**
   * Subscribe to alert creation notification
   * @returns an alert created iterator
   */
  @Subscription(() => Alert, {
    name: PubSubQueue.alertCreated,
  })
  alertCreatedHandler() {
    return this.pubSub.asyncIterator(PubSubQueue.alertCreated);
  }

  /**
   * Subscribe to alert update notification
   * @returns an alert updated iterator
   */
  @Subscription(() => Alert, {
    name: PubSubQueue.alertUpdated,
  })
  alertUpdatedHandler() {
    return this.pubSub.asyncIterator(PubSubQueue.alertUpdated);
  }
}