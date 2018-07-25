
exports.run = (client, message, args) => {
  message.channel.send({
    file: 'https://cdn.discordapp.com/attachments/471600179662028802/471755005091905537/ojpoinpin.png'
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ap'],
  permLevel: "User"
};

exports.help = {
  name: "akkoprofile",
  category: "Miscelaneous",
  description: "Sends Akko's Profile",
  usage: "akkoprofile"
};