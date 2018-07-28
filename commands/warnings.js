const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const userToCheck = message.mentions.users.first();

  if (userToCheck) {
    let userWarnings = client.userInfo.getProp(userToCheck.id, 'warnings');

    const embed = new Discord.RichEmbed()
    .setTitle(`${userToCheck.username}'s warnings`)
    .setColor(16090536);
    
    let warnings = '';
    for (let w = 0; w < userWarning.length; w++) {
      let warning = userWarnings[w];

      warnings += `${warning.id} | ${warning.day} | ${warning.reason}\n`
    }

    embed.setDescription(warnings);
    
    return message.channel.send({ embed });
  }

  let warnedUsers = client.userInfo.filterArray((user) => user.warnings.length !== 0);

  const embed = new Discord.RichEmbed()
  .setTitle("Warned users")
  .setColor(16090536);
  
  for (let u = 0; u < warnedUsers; u++) {
    let user = warnedUsers[u];

    let warnings = '';
    for (let w = 0; w < user.warnings.length; w++) {
      let warning = user.warnings[w];

      warnings += `${warning.id} | ${warning.day} | ${warning.reason}\n`
    }

    embed.addField(client.users.get(user.user).tag || user.user, warnings);
  }
  
  message.channel.send({ embed });
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ws'],
  permLevel: 'Trial Mod'
};

exports.help = {
  name: "warnings",
  category: "Moderation",
  description: "checks warnings",
  usage: "warnings [@user]"
};