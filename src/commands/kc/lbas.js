const { Command } = require('discord.js-commando')
const KC = require('../../settings').KanColle

module.exports = class KCLbasCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lb',
            group: 'kc',
            memberName: 'lb',
            description: 'Land Base Aerial Support',
        })
    }

    async run(msg) {
        const message = KC.LBAS
        return msg.say(message)
    }
}