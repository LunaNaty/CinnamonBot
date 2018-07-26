
exports.run = async (client, message, args) => {
  const user = message.mentions.members.first();

  // remove the mention off the reason of banning

  args.shift();

  let reason = (args.length) ? args.join(' ') : await client.awaitReply(message, `What reason should we ban ${user.displayName} for?`);

  if (!reason) return message.reply('Took to long to respon command canceled');

  if (reason === 'cancel') return message.reply('Command canceled');

  user.send(`You are being banned for ${reason}`);

  user.ban(reason)
  .then(() => {
    message.reply(`${user.displayName} was banned for ${reason}`);
  })
  .catch(() => {
    message.reply(`Error trying to ban ${user.displayName} do I have the perms to?`);
  })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['b'],
  permLevel: 'Bot Dev'
};

exports.help = {
  name: "ban",
  category: "Moderation",
  description: "Bans user",
  usage: "ban @user reason"
};