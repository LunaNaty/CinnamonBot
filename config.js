const config = {
  // Bot Owner, level 10 by default. A User ID. Should never be anything else than the bot owner's ID.
  "devID": process.env.DEVID,

  // Your Bot's Token. Available on https://discordapp.com/developers/applications/me
  "token": process.env.TOKEN,

  // settings for where to store the user info and settings for guilds
  "mongo": {
    "dbName": process.env.DBNAME,
    "url": process.env.MONGOURL
  },

  // Default per-server settings. New guilds have these settings. 

  // DO NOT LEAVE ANY OF THESE BLANK, AS YOU WILL NOT BE ABLE TO UPDATE THEM
  // VIA COMMANDS IN THE GUILD.
  
  "defaultSettings" : {
    "prefix": "C!",
    "modLogChannel": "staff-logs",
    "modRole": "Staff",
    "adminRole": "Co owner/Vice President",
    "trialMod": "Trial Staff",
    "supporterRole": "Supporter",
    "systemNotice": "true", // This gives a notice when a user tries to run a command that they do not have permission to use.
    "welcomeChannel": "mainhall",
    "welcomeEnabled": "true",
    "rulesacceptChannel": "rules-accept"
  },

  // PERMISSION LEVEL DEFINITIONS.

  permLevels: [
    // This is the lowest permisison level, this is for non-roled users.
    {
      level: 1,
      name: "User", 
      // Don't bother checking, just return true which allows them to execute any command their
      // level allows them to.
      check: () => true
    },

    {
      level: 2,
      // This is the name of the role.
      name: "Supporter",
      // The following lines check the guild the message came from for the roles.
      // Then it checks if the member that authored the message has the role.
      // If they do return true, which will allow them to execute the command in question.
      // If they don't then return false, which will prevent them from executing the command.
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.supporterRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 3,
      name: "Trial Mod", 
      // Simple check, if the guild owner id matches the message author's ID, then it will return true.
      // Otherwise it will return false.
      check: (message) => message.author.id === config.devID
    },

    {
      level: 4,
      // This is the name of the role.
      name: "Bot Dev",
      // The following lines check the guild the message came from for the roles.
      // Then it checks if the member that authored the message has the role.
      // If they do return true, which will allow them to execute the command in question.
      // If they don't then return false, which will prevent them from executing the command.
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.trialMod.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    // This is your permission level, the staff levels should always be above the rest of the roles.
    {
      level: 5,
      // This is the name of the role.
      name: "Mod",
      // The following lines check the guild the message came from for the roles.
      // Then it checks if the member that authored the message has the role.
      // If they do return true, which will allow them to execute the command in question.
      // If they don't then return false, which will prevent them from executing the command.
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    {
      level: 6,
      name: "Admin", 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },

    // This is the server owner.
    {
      level: 7,
      name: "Server Owner", 
      // Simple check, if the guild owner id matches the message author's ID, then it will return true.
      // Otherwise it will return false.
      check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },
  ]
}

module.exports = config;
