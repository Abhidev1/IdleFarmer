const { RichEmbed } = require("discord.js");

module.exports = {
    name: "run",
    description: "run IdleFarm",
    run: async (client, message, args) => {
        if(client.settings.farming.enabled === true) {
            console.log("[*] Ran")
            client.timeoutFunction = setInterval(function() {
                message.channel.send(";sell").then(() => {
                    console.log("[*] Sent sell command");
                });
            }, client.settings.farming.timeout * 1000)
        } else {
            console.log("[*] Enabled is false")
            clearInterval(client.timeoutFunction);
        }
    }
}