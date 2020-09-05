import { Injectable, Logger } from '@nestjs/common'
import * as Twit from 'twit'
import { EnvironmentService } from '../../environment/services/environment.service'
import { TwitterConstants } from '../constants/twitter.constants'
import { TwitterEventService } from './twitter-event.service'

@Injectable()
export class TwitterService {
  private readonly _logger = new Logger(TwitterService.name)

  private _client: Twit

  public get client(): Twit {
    return this._client
  }

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly twitterEventService: TwitterEventService,
  ) { }

  public start() {
    const isEnabled = this.environmentService.getBoolean(TwitterConstants.ENABLED)
    if (!isEnabled) {
      return
    }

    try {
      this.initClient()
      this.checkTweets()
    } catch (error) {
      this._logger.error(error.message)
    }
  }

  private initClient() {
    const consumerKey = this.environmentService.getValue(TwitterConstants.CONSUMER_KEY)
    const consumerSecret = this.environmentService.getValue(TwitterConstants.CONSUMER_SECRET)
    const accessToken = this.environmentService.getValue(TwitterConstants.ACCESS_TOKEN)
    const accessTokenSecret = this.environmentService.getValue(TwitterConstants.ACCESS_TOKEN_SECRET)

    if (this.environmentService.isDev) {
      this._logger.debug(`ConsumerKey: ${consumerKey}`)
      this._logger.debug(`ConsumerSecret: ${consumerSecret}`)
      this._logger.debug(`AccessToken: ${accessToken}`)
      this._logger.debug(`AccessTokenSecret: ${accessTokenSecret}`)
    }

    if ([consumerKey, consumerSecret, accessToken, accessTokenSecret].some(v => !v)) {
      throw new Error('Missing config keys')
    }

    this._client = new Twit({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token: accessToken,
      access_token_secret: accessTokenSecret
    })
  }

  private checkTweets() {
    const isEnabled = this.environmentService.getBoolean(TwitterConstants.CHECK_TWEETS_ENABLED)
    if (!isEnabled) {
      return
    }

    this._logger.log('Checking tweets...')
    const path = 'statuses/filter'
    const params = { follow: '2591243785' }
    const stream = this.client.stream(path, params)
    this.twitterEventService.attachStreamEvents(stream)
  }
}
