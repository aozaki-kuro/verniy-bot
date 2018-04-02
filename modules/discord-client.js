const Commando = require('discord.js-commando')
const path = require('path')

const Settings = require('../settings')
const Logger = require('../modules/logger')

const client = new Commando.Client({
    owner: process.env.DISCORD_OWNER || '153363129915539457',
    commandPrefix: process.env.DISCORD_PREFIX || '.',
    commandEditableDuration: 15,
    nonCommandEditable: false,
    unknownCommandResponse: false,
    // invite: Settings.Discord.InviteLink,
})

client
    .on('ready', () => {
        Logger.log(`${client.user.tag} READY!`)

        // KanColle cron
        require('../modules/kc-cron').run(client)

        // Twitter client
        const twitter = require('../modules/twitter-client')
        twitter.init({
            ConsumerKey: process.env.TWITTER_CONSUMER_KEY,
            ConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            AccessToken: process.env.TWITTER_ACCESS_TOKEN,
            AccessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        })
        twitter.follow({ discord: client, follows: Settings.TwitterFollow })
        twitter.followAva({ discord: client })

    })
    .on('reconnecting', () => {
        Logger.log('Reconnecting...')
    })
    .on('debug', info => {
        // Skip
        if ([
            'Authenticated using token',
            'Sending a heartbeat',
            'Heartbeat acknowledged',
        ].some(v => info.indexOf(v) != -1)) {
            return
        }

        Logger.log(info)
    })
    .on('warn', info => {
        Logger.log(info)
    })
    .on('error', error => {
        Logger.error(error)
    })
    .on('resume', replayed => { })
    .on('disconnect', event => { })
    .on('message', message => { })

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['dev', 'Developer'],
        ['util', 'Utility'],
        ['kc', 'KanColle'],
    ])
    .registerCommandsIn(path.join(__dirname, '..', 'commands'))

module.exports = {
    login: () => {
        Logger.log('Connecting to Discord server...')
        client
            .login(process.env.DISCORD_TOKEN)
            .catch(err => Logger.error(err))
    }
}
