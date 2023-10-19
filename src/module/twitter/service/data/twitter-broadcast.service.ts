import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseEntityService } from '../../../../shared/service/base-entity.service'
import { TwitterBroadcast } from '../../model/twitter-broadcast.entity'
import { TwitterUserService } from './twitter-user.service'

@Injectable()
export class TwitterBroadcastService extends BaseEntityService<TwitterBroadcast> {
  constructor(
    @InjectRepository(TwitterBroadcast)
    public readonly repository: Repository<TwitterBroadcast>,
    @Inject(TwitterUserService)
    public readonly twitterUserService: TwitterUserService,
  ) {
    super()
  }

  public async getRawOneById(id: string) {
    const space = await this.repository
      .createQueryBuilder('b')
      .select('b.*')
      .andWhere('b.id = :id', { id })
      .getRawOne()
    return space
  }
}
