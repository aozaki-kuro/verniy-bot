import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '../config/config.module'
import { HolodexModule } from '../holodex/holodex.module'
import { InstagramModule } from '../instagram/instagram.module'
import { TiktokModule } from '../tiktok/tiktok.module'
import { TrackModule } from '../track/track.module'
import { TwitCastingModule } from '../twitcasting/twitcasting.module'
import { TwitchModule } from '../twitch/twitch.module'
import { TwitterModule } from '../twitter/twitter.module'
import { DISCORD_ALL_COMMANDS } from './constants/discord-command.constant'
import { DiscordChannel } from './models/discord-channel.entity'
import { DiscordGuild } from './models/discord-guild.entity'
import { DiscordMessage } from './models/discord-message.entity'
import { DiscordUser } from './models/discord-user.entity'
import { DiscordChannelService } from './services/data/discord-channel.service'
import { DiscordGuildService } from './services/data/discord-guild.service'
import { DiscordMessageService } from './services/data/discord-message.service'
import { DiscordUserService } from './services/data/discord-user.service'
import { DiscordClientService } from './services/discord-client.service'
import { DiscordDbService } from './services/discord-db.service'
import { DiscordService } from './services/discord.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DiscordUser,
      DiscordGuild,
      DiscordChannel,
      DiscordMessage,
    ]),
    ConfigModule,
    TrackModule,
    forwardRef(() => TwitterModule),
    forwardRef(() => TwitCastingModule),
    forwardRef(() => TwitchModule),
    forwardRef(() => InstagramModule),
    forwardRef(() => TiktokModule),
    forwardRef(() => HolodexModule),
  ],
  providers: [
    DiscordService,
    DiscordClientService,
    DiscordDbService,
    DiscordUserService,
    DiscordGuildService,
    DiscordChannelService,
    DiscordMessageService,
    ...DISCORD_ALL_COMMANDS,
  ],
  exports: [
    DiscordService,
  ],
})
export class DiscordModule { }
