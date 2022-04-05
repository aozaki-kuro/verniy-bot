import winston from 'winston'
import { logger as baseLogger } from '../../../logger'
import { db } from '../Database'
import { TwitterUser } from '../models/TwitterUser'

class TwitterUserController {
  private logger: winston.Logger

  constructor() {
    this.logger = baseLogger.child({ label: '[TwitterUserController]' })
  }

  // eslint-disable-next-line class-methods-use-this
  private get repository() {
    return db.connection.getRepository(TwitterUser)
  }

  public async update(data: {
    id: string,
    createdAt: Date,
    username: string,
    name?: string,
    profileImageUrl?: string,
    profileBannerUrl?: string,
  }): Promise<TwitterUser> {
    if (!data) return null
    try {
      const user = await this.repository.save(data)
      return user
    } catch (error) {
      this.logger.error(`update: ${error.message}`, data)
    }
    return null
  }
}

export const twitterUserController = new TwitterUserController()
