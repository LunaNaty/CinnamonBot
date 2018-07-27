const Discord = require('discord.js');

exports.run = (client, message, args) => {
  // Get a filtered list (for this guild only), and convert to an array while we're at it.
  const filtered = Array.from(client.points.values());

  // Sort it to get the top results... well... at the top. Y'know.
  const sorted = filtered.sort((a, b) => a.points < b.points);
  ​
  // Slice it, dice it, get the top 10 of it!
  const top10 = sorted.splice(0, 10);

  // Now shake it and show it! (as a nice embed, too!)
  const embed = new Discord.RichEmbed()
  .setTitle("Leaderboard")
  .setAuthor(client.user.username, client.user.avatarURL)
  .setDescription("Our top 10 points leaders!")
  .setColor(0x00AE86);
  
  for (const data of top10) {
    embed.addField(client.users.get(data.user).tag, `${data.points} points (level ${data.level})`);
  }
  
  message.channel.send({embed});
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['lb'],
  permLevel: "User"
};

exports.help = {
  name: "leaderboard",
  category: "Miscelaneous",
  description: "Shows your rank in points",
  usage: "leaderboard"
};