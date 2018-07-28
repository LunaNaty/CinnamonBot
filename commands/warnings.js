const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const userToCheck = message.mentions.users.first();

  // if (!userToCheck) 

  let warnedUsers = client.userInfo.filter((user) => user.warnings.length !== 0);

  console.log(warnedUsers)

  const embed = new Discord.RichEmbed()
  .setTitle("Warned users")
  .setColor(16090536);
  
  for (user of warnedUsers.length) {

    let warnings = '';
    for (let w = 0; w < user.warnings; w++) {
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