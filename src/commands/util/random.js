const { Command } = require('discord.js-commando')
const Logger = require('../../modules/Logger')
const Util = require('../../modules/Util')

module.exports = class RandomCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rd',
            group: 'util',
            memberName: 'rd',
            description: 'Random number generator BlessRNG',
            examples: ['rd', 'rd 10', 'rd 1 10', 'rd 2 3 5 7'],
        })
    }

    async run(msg, args) {
        let numbers = args.trim().split(' ')
        if (numbers.some(v => isNaN(v))) {
            msg.channel.send(`Invalid numbers`)
            return
        }

        let min, max, random
        switch (numbers.length) {
            case 1:
                min = 0
                max = numbers[0] != '' ? numbers[0] : 1E9
                break
            case 2:
                min = numbers[0]
                max = numbers[1]
                break
            default:
                min = 0
                max = numbers.length - 1
                random = Util.getRandomNumber(min, max)
                Logger.log(`RNG > Index ${random} of array ${numbers.length} elements > Value ${numbers[random]}`)
                msg.channel
                    .send(this.message(numbers[random]))
                    .catch(err => Logger.error(err))
                return
        }

        random = Util.getRandomNumber(min, max)
        msg.channel
            .send(this.message(random))
            .catch(err => Logger.error(err))
    }

    message(data) {
        return `:pray: ${data} :pray:`
    }
}