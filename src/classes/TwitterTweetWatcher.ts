import EventEmitter from 'events'
import Twit from 'twit'
import winston from 'winston'
import { logger as baseLogger } from '../logger'

export class TwitterTweetWatcher extends EventEmitter {
  private logger: winston.Logger
  private stream: Twit.Stream

  constructor(private twit: Twit) {
    super()
    this.logger = baseLogger.child({ label: '[TwitterTweetWatcher]' })
    this.twit = twit
  }

  public watch(userIds: string[]) {
    this.logger.info(`Id count: ${userIds?.length || 0}`)
    if (!userIds?.length) {
      return
    }

    this.logger.info('Watching...')
    const streamPath = 'statuses/filter'
    const streamParams = { follow: userIds.join(',') }
    this.logger.info(`Stream path: ${streamPath}`)
    this.logger.info(`Stream pararms: ${JSON.stringify(streamParams)}`)
    const stream = this.twit.stream(streamPath, streamParams)
    this.stream = stream

    stream.on('error', (error) => this.logger.error(error.message))
    stream.on('warning', (message) => this.logger.warn(`Warning: ${message}`))
    stream.on('limit', (message) => this.logger.warn(`Limit: ${message}`))
    stream.on('connect', () => this.logger.info('Connecting...'))
    stream.on('connected', () => this.logger.info('Connected!'))
    stream.on('disconnect', (message) => this.logger.warn(`Disconnect: ${message}`))
    stream.on('reconnect', (req, res, connectInterval) => this.logger.info(`Reconnect in ${connectInterval}ms`))
    stream.on('tweet', (tweet) => this.emit('tweet', tweet))
  }
}
