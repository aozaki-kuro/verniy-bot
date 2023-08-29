import axios from 'axios'
import Bottleneck from 'bottleneck'
import { TwitterGuestTokenBase } from '../base/twitter-guest-token-base'

export class TwitterGuestTokenDocumentCookie extends TwitterGuestTokenBase {
  constructor(
    protected readonly limiter: Bottleneck,
  ) {
    super(limiter)
  }

  // eslint-disable-next-line class-methods-use-this
  public async fetchToken(): Promise<string> {
    const { data } = await axios.request({
      method: 'GET',
      url: 'https://twitter.com',
      beforeRedirect(options, responseDetails) {
        const cookie = (responseDetails.headers['set-cookie'] as any as string[])
          .map((v) => v.split(';')[0]).join('; ')
        Object.assign(options.headers, { cookie })
      },
    })
    const token = /(?<=gt=)\d+/.exec(data)[0]
    return token
  }
}
