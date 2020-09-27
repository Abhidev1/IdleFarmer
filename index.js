const { Client, Collection } = require("discord.js");
const { token, prefix } = require("./config.json")

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
client.settings = require("./settings.json");
client.timeoutFunction = null;

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log('----------------------------------------------------------');
    console.log('Connected to Discord via the token successfully.');
    console.log(`Username: ${client.user.tag}`);
    console.log(`User ID: ${client.user.id}`);
    console.log(`Prefix: ${prefix}`);
    console.log('----------------------------------------------------------');
})

client.on("message", async message => {

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        if(message.author.id === client.user.id) {
            command.run(client, message, args);
        } else {
            console.log(`${message.author.tag} tried to use the ${command.name} command.`)
        }
    }
});

client.login(token);