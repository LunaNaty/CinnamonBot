const randomId = require('random-id');

exports.run = (client, message, args) => {
  const user = message.mentions.users.first();

  if (!user) return message.reply('Need to tag a user to warn');

  // remove the mention off the args
  args.shift();

  // see if there is a reason to warn
  if (!args.length) return message.reply('you need to provide a reason to warn someone');

  let reason = args.join(' ');

  const date = new Date();

  const warning = {
    id: randomId(7),
    day: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
    reason: reason
  }

  client.userInfo.setProp(user.id, 'warnings', client.userInfo.getProp(user.id, 'warnings').concat([warning]));

  user.send(`you was warned for ${reason}`);
  message.reply(`${user.username} was warned for ${reason}`);
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['w'],
  permLevel: 'Trial Mod'
};

exports.help = {
  name: "warn",
  category: "Moderation",
  description: "warn user",
  usage: "warn @user reason"
};