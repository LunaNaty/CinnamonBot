const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const userToCheck = message.mentions.users.first();

  if (!userToCheck) return message.reply('tag a user to remove warnings for');

  args.shift();

  if (args.length === 0) return message.reply('A warning id is needed');

  let id = args[0];

  let warnings = client.userInfo.getProp(userToCheck.id, 'warnings');

  for (let w = 0; w < warnings.length; w++) {
    if (warnings[w].id === id) {
      warnings.splice(w, 1);

      client.userInfo.setProp(userToCheck.id, 'warnings', warnings);

      return message.reply(`Warning ${id} was remove for ${userToCheck.username}`);
    }
  }

  message.reply('no id matching that');
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ws'],
  permLevel: 'Trial Mod'
};

exports.help = {
  name: "removewarnings",
  category: "Moderation",
  description: "removes a warning",
  usage: "rw @user warningId"
};