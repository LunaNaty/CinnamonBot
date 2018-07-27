const embeds = require('../embeds').banned;

exports.run = async (client, message, args) => {
  const user = message.mentions.members.first();

  // remove the mention off the reason of banning

  args.shift();

  let reason = (args.length) ? args.join(' ') : await client.awaitReply(message, `What reason should we ban ${user.displayName} for?`);

  if (!reason) return message.reply('Took to long to respon command canceled');

  if (reason.toLowerCase() === 'cancel') return message.reply('Command canceled');

  user.send({ embed: embeds.dm(message.author.username, reason) })

  user.ban(reason)
  .then(() => {
    message.channel.send({ embed: embeds.confirmation(message.author.username, user.displayName, reason) });
  })
  .catch(() => {
    message.channel.send({ embed: embeds.error(user.displayName) });
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