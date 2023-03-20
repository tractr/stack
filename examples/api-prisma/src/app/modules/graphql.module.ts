import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as NestjsGraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from './database.module';
import { NestjsServicesModule } from './services.module';
import { ModelsAuthorizationServicesModules } from '../../nestjs-authorization-services';
import { GraphqlAuthorizationModule } from '../../nestjs-graphql-resolvers-casl';
import { GraphqlModule } from '../../nestjs-resolvers';

@Module({
  imports: [
    NestjsGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [GraphqlAuthorizationModule],
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      debug: true,
      playground: true,
    }),
    GraphqlAuthorizationModule.register({
      imports: [
        ModelsAuthorizationServicesModules.register({
          imports: [DatabaseModule, NestjsServicesModule],
          defaultOwnershipIndexes: {
            User: { id: true, roleId: true },
            Role: { id: true },
            Right: { id: true },
          },
        }),
        NestjsServicesModule,
      ],
    }),
  ],
  exports: [GraphqlAuthorizationModule],
})
export class NestjsGraphqlModule {}
