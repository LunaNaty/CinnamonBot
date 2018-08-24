const items = require('../items');

const controls = ['⬅', '➡'];

exports.run = (client, message, args) => {
  message.awaitReactions((r, user) => {
    return (user.id === message.author.id && controls.includes(r.emoji.name));
  }, {
    limit: 1,
    time: 15000,
    errors: ['time']
  })
  .then(() => {

  })
}

const buyItem = (user, item) => {
  let buns = client.userInfo.getProp(user.id, 'coins');


}

const awaitControl = (message) => {
  message.awaitReactions((r, user) => {
    return (user.id === message.author.id && controls.includes(r.emoji.name));
  }, {
    limit: 1,
    time: 15000,
    errors: ['time']
  })
  .then(() => {

  })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "shop",
  category: "Miscelaneous",
  description: "opens the shop",
  usage: "shop"
};