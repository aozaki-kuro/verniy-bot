const { Command } = require('discord.js-commando')
const Log = require('../../modules/logger')

module.exports = class DateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'date',
            group: 'dev',
            memberName: 'date',
            description: 'Date?',
        })
    }

    async run(msg, args) {
        var date = new Date()
        var iso = date.toISOString()
        var utc = date.toUTCString()
        var local = date
        Log.debug({ date, iso, utc, local })

        var data = [
            `ISO  : ${iso}`,
            `UTC  : ${utc}`,
            `LOCAL: ${local}`,
        ]

        data.forEach(v => Log.info(v))
        msg.channel.send(data.join('\n'))
    }
}