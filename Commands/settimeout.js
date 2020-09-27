const { RichEmbed } = require("discord.js");

module.exports = {
    name: "settimeout",
    description: "run IdleFarm",
    run: async (client, message, args) => {
        client.settings.farming.enabled = false;
        clearInterval(client.timeoutFunction);

        client.settings.farming.timeout = parseInt(args[0]);
        message.channel.send("Set timeout to: " + args[0]);
        client.settings.farming.enabled = true;
        message.channel.send("!run")
    }
}