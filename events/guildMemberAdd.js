
// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.config.settings;

  // If welcome is off, don't proceed (don't welcome the user)
  if (!settings.welcomeEnabled) return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  const embed = {
    "title": welcomeMessage,
    "color": 16663691,
    "timestamp": Date.now().toISOString(),
    "footer": {
      "text": "Enjoy your stay :3"
    },
    "image": {
      "url": "https://cdn.discordapp.com/attachments/471600179662028802/471615977101197322/9c0b6c1a89547a4e53964a5e865ad5b3-700.jpg"
    }
  };

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.find("name", settings.welcomeChannel).send({ embed }).catch(console.error);
};