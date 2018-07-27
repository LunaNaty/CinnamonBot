
exports.run = (client, message, args) => {
  const key = message.author.id;

  message.channel.send(`You currently have ${client.userInfo.getProp(key, "points")}, and are level ${client.userInfo.getProp(key, "level")}!`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['p'],
  permLevel: "User"
};

exports.help = {
  name: "points",
  category: "Miscelaneous",
  description: "Shows your points and levels.",
  usage: "points"
};