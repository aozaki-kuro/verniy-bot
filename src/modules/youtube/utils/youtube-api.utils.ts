/* eslint-disable camelcase */
import { youtube_v3 } from 'googleapis'

export class YoutubeApiUtils {
  public static getThumbnailUrl(thumbnails: youtube_v3.Schema$ThumbnailDetails) {
    const url = this.getThumbnail(thumbnails)?.url
    return url
  }

  public static getThumbnail(thumbnails: youtube_v3.Schema$ThumbnailDetails) {
    const thumbnail = thumbnails?.maxres || thumbnails?.high || thumbnails?.medium || thumbnails?.default
    return thumbnail
  }
}
