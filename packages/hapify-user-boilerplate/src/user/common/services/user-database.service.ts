import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../../../core/database';

@Injectable()
export class UserDatabaseService {
  constructor(private readonly databaseService: DatabaseService) {}

  public findUnique(
    params: Prisma.UserFindUniqueArgs
  ): ReturnType<Prisma.UserDelegate['findUnique']> {
    return this.databaseService.user.findUnique(params);
  }

  public findFirst(
    params: Prisma.UserFindFirstArgs
  ): ReturnType<Prisma.UserDelegate['findFirst']> {
    return this.databaseService.user.findFirst(params);
  }

  public findMany(
    params: Prisma.UserFindManyArgs
  ): ReturnType<Prisma.UserDelegate['findMany']> {
    return this.databaseService.user.findMany(params);
  }

  public create(
    params: Prisma.UserCreateArgs
  ): ReturnType<Prisma.UserDelegate['create']> {
    return this.databaseService.user.create(params);
  }

  public update(
    params: Prisma.UserUpdateArgs
  ): ReturnType<Prisma.UserDelegate['update']> {
    return this.databaseService.user.update(params);
  }

  public updateMany(
    params: Prisma.UserUpdateManyArgs
  ): ReturnType<Prisma.UserDelegate['updateMany']> {
    return this.databaseService.user.updateMany(params);
  }

  public upsert(
    params: Prisma.UserUpsertArgs
  ): ReturnType<Prisma.UserDelegate['upsert']> {
    return this.databaseService.user.upsert(params);
  }

  public delete(
    params: Prisma.UserDeleteArgs
  ): ReturnType<Prisma.UserDelegate['delete']> {
    return this.databaseService.user.delete(params);
  }

  public deleteMany(
    params: Prisma.UserDeleteManyArgs
  ): ReturnType<Prisma.UserDelegate['deleteMany']> {
    return this.databaseService.user.deleteMany(params);
  }

  public count(
    params: Prisma.UserCountArgs
  ): ReturnType<Prisma.UserDelegate['count']> {
    return this.databaseService.user.count(params);
  }

  public aggregate(
    params: Prisma.UserAggregateArgs
  ): ReturnType<Prisma.UserDelegate['aggregate']> {
    return this.databaseService.user.aggregate(params);
  }
}
