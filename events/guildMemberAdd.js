
// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.config.settings;

  // If welcome is off, don't proceed (don't welcome the user)
  if (!settings.welcomeEnabled) return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  const guildEmbed = {
    "title": welcomeMessage,
    "color": 16663691,
    "timestamp": new Date().toISOString(),
    "footer": {
      "text": "Enjoy your stay :3"
    },
    "image": {
      "url": "https://cdn.discordapp.com/attachments/471600179662028802/471615977101197322/9c0b6c1a89547a4e53964a5e865ad5b3-700.jpg"
    }
  };

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.find("name", settings.welcomeChannel).send({ embed: guildEmbed })
  .then(() => {

    const dmEmbed = {
      "title": "Welcome {{user}}! Welcome to cinnamonBuns!".replace("{{user}}", member.user.tag),
      "description": "Here's a spare link so if you accidentally leave you can easily join back or if you want to invite a friend! \n\n https://discord.gg/q55yXMe \n\n If you invite a friend you can aquire the Supporter role, this gives you access to the premium self assignable roles!",
      "color": 12011097,
      "timestamp": "2018-07-25T18:14:20.238Z",
      "image": {
        "url": "https://cdn.discordapp.com/attachments/471600179662028802/472064728232099861/ServerHeader.jpg"
      },
      "footer": {
        "text": "Hope you enjoy your stay :3"
      }
    };

    member.send({ embed: dmEmbed });
  })
  .catch(console.error);
};