const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js')
const Settings = require('../../settings')

module.exports = class UserInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'user',
            group: 'util',
            memberName: 'user',
            description: 'Check user info',
            args: [
                {
                    key: 'user',
                    prompt: 'User?',
                    type: 'user',
                    wait: 10,
                },
            ],
        })
    }

    async run(msg, args) {

        function userEmbed(user) {
            let embed = new RichEmbed({
                color: 0x2196f3,
                thumbnail: { url: user.avatarURL },
            })

            embed.addField('Tag', user.tag)
            embed.addField('ID', user.id, true)
            embed.addField('Bot?', user.bot ? 'Yes' : 'No', true)
            embed.addField('Created At',
                new Date(user.createdTimestamp)
                    .toLocaleDateString(Settings.Global.LocaleCode, Settings.Global.DateOptions)
                // .toISOString()
                // .replace(/T|Z|\.\d{3}/g, ' ')
                // .trim()
            )
            embed.addField('Avatar URL', user.avatarURL)

            return embed
        }

        const embed = userEmbed(args.user)
        return msg.reply(embed)
    }
}