const { RichEmbed } = require("discord.js");

module.exports = {
    name: "toggle",
    description: "toggle IdleFarm",
    run: async (client, message, args) => {
        if(client.settings.farming.enabled === false) { 
            client.settings.farming.enabled = true;
        } else {
            client.settings.farming.enabled = false;
        }

        let doneEmbed = new RichEmbed().setTitle("IdleFarmer").setDescription("Toggled to: " + client.settings.farming.enabled.toString());
        message.channel.send(doneEmbed);
    }
}