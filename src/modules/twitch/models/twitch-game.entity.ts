import { Column, Entity } from 'typeorm'
import { BaseExternalEntity } from '../../database/models/base-external.entity'

@Entity('twitch_game')
export class TwitchGame extends BaseExternalEntity {
  @Column({ name: 'name', type: 'text' })
  name: string
}
