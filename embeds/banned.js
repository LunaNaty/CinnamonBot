
module.exports = {
  dm: (user, reason) => {
    return {
      "title": `You were banned by ${user}`,
      "description": reason,
      "color": 16264736,
      "timestamp": new Date().toISOString(),
      "footer": {
        "icon_url": "https://media.giphy.com/media/ToMjGpz63CcxpN235OE/giphy.gif",
        "text": "Sorry D:"
      }
    }
  },

  confirmation: (user, banned, reason) => {
    return {
      "title": `${user} banned ${banned}`,
      "description": reason,
      "color": 65296,
      "timestamp": new Date().toISOString(),
      "footer": {
        "text": "Sad D:"
      },
      "image": {
        "url": "https://media.giphy.com/media/ToMjGpz63CcxpN235OE/giphy.gif"
      }
    }
  },

  error: (banned) => {
    return {
      "title": `Error banning ${banned}`,
      "description": "The Traitor shall live by discords word",
      "color": 16264736,
      "timestamp": "2018-07-26T20:37:22.974Z",
      "footer": {
        "text": "oof a error boi's"
      }
    }
  }
}