import { ChildEntity } from 'typeorm'
import { TrackType } from '../enums/track-type.enum'
import { Track } from './track.entity'

@ChildEntity(TrackType.TWITCASTING_LIVE)
export class TrackTwitCastingLive extends Track {
}
