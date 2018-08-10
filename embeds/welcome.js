
module.exports = {
  guild: (client, member) => {
    return {
      "title": `Hello ${member.displayName}! Welcome to CinnamonBuns!`,
      "color": 16663691,
      "timestamp": new Date().toISOString(),
      "footer": {
        "text": "Enjoy your stay :3"
      },
      "image": {
        "url": "https://cdn.discordapp.com/attachments/471600179662028802/473119712134430750/WelcomeMessageImage.jpg"
      }
    };
  },

  dm: (client, member) => {
    return {
      "title": `Welcome ${member.displayName}! Welcome to cinnamonBuns!`,
      "description": "Before you begin chatting there's a couple things you could do first to make being in this server the best experience possible!\nPlease read the Rules so you don't accidently break any!\nIf you want a custom colour you can get a number of different colours if you say =rank in Botchannel!\n\nOnce you've done this you're ready to start chatting, if you have any questions please send them to the server owner Natyori#0001\n\nAlso if you accidently leave the server or want to invite a friend then here's a permanent invite link!\n\nhttps://discord.gg/q55yXMe\n\nIf you invite somebody to the server, you can acquire the Supporter role!\nPlease ask a mod/admin to acquire it after you have done this!",
      "color": 12011097,
      "timestamp": "2018-07-25T18:14:20.238Z",
      "image": {
        "url": "https://cdn.discordapp.com/attachments/471600179662028802/473115234102411264/ServerWelcome.png"
      },
      "footer": {
        "text": "Hope you enjoy your stay :3"
      }
    };
  }
}