import { TweetV2SingleStreamResult, UserV1 } from 'twitter-api-v2'

export class TwitterUtils {
  /**
    * Returns the URL of a Twitter user, provided their username
    * @param {string} username - Username
    * @returns {string} User URL
    */
  public static getUserUrl(username: string): string {
    return `https://twitter.com/${username}`
  }

  public static getTweetUrl(username: string, tweetId: string): string {
    return `https://twitter.com/${username}/status/${tweetId}`
  }

  public static getIncludesUserById(data: TweetV2SingleStreamResult, id: string) {
    return data.includes?.users?.find?.((v) => v?.id === id)
  }

  public static getIncludesTweetById(data: TweetV2SingleStreamResult, id: string) {
    return data.includes?.tweets?.find?.((v) => v?.id === id)
  }

  public static isReplyStatus(data: TweetV2SingleStreamResult): boolean {
    return !!data.data?.referenced_tweets?.some?.((v) => v?.type === 'replied_to')
  }

  public static isRetweetStatus(data: TweetV2SingleStreamResult): boolean {
    return !!data.data?.referenced_tweets?.some?.((v) => v?.type === 'retweeted')
  }

  public static getReplyStatusUrl(data: TweetV2SingleStreamResult) {
    const tweetId = data.data.referenced_tweets.find((v) => v.type === 'replied_to').id
    const tweet = this.getIncludesTweetById(data, tweetId)
    const author = this.getIncludesUserById(data, tweet.author_id)
    return this.getTweetUrl(author.username, tweetId)
  }

  public static getRetweetStatusUrl(data: TweetV2SingleStreamResult) {
    const tweetId = data.data.referenced_tweets.find((v) => v.type === 'retweeted').id
    const tweet = this.getIncludesTweetById(data, tweetId)
    const author = this.getIncludesUserById(data, tweet.author_id)
    return this.getTweetUrl(author.username, tweetId)
  }

  public static getUserDescription(user: UserV1): string {
    const desc = user?.description || ''
    // const entities = user?.entities as any
    // const urls = entities?.description?.urls as Twit.Twitter.UrlEntity[] || []
    // if (urls.length) {
    //   urls.forEach((v) => {
    //     desc = desc.replace(v.url, v.expanded_url)
    //   })
    // }
    return desc
  }

  public static getUserProfileImageUrl(user: UserV1): string {
    const url = user?.profile_image_url_https?.replace?.('_normal', '') || null
    return url
  }

  public static getUserProfileBannerUrl(user: UserV1): string {
    const url = user?.profile_banner_url || null
    return url
  }
}
