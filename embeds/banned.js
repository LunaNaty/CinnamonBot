
module.exports = {
  whichUser: () => {

  },

  dm: (user) => {
    return {
      "title": `You were banned by ${user.displayName}`,
      "color": 16264736,
      "timestamp": new Date().toISOString(),
      "footer": {
        "icon_url": "https://media.giphy.com/media/ToMjGpz63CcxpN235OE/giphy.gif",
        "text": "Sorry D:"
      }
    }
  },

  confirmation: (user, banned) => {
    return {
      "title": `${user.displayName} banned ${banned.displayName}`,
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
      "title": `Error banning ${banned.displayName}`,
      "description": "The Traitor shall live by the word of discord",
      "color": 16264736,
      "timestamp": new Date().toISOString(),
      "footer": {
        "text": "oof a error boi's"
      }
    }
  }
}