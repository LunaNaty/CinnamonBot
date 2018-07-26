
exports.run = (client, message, args) => {
  const user = message.mentions.members.first();

  // remove the mention off the reason of banning

  args.shift();

  let reason = null;

  if (args.length > 0) reason = args.join(' ');

  if (!reason) {
    message.channel.send('What tag would you like to see? This will await will be cancelled in 30 seconds. It will finish when you provide a message that goes through the filter the first time.')
    .then(() => {
      message.channel.awaitMessages(response => response.user.id === message.author.id, {
        max: 1,
        time: 30000,
        errors: ['time'],
      })
      .then((collected) => {
        if (collected.first().content === 'cancel')
          return message.channel.send('Command Canceled');

        let reason = collected.first().content;
      })
      .catch(() => {
        message.channel.send('Failed to respond in time, ban was canceled');
      });
    });
  }
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