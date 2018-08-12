// This event executes when a new member joins a server. Let's welcome them!

const embeds = require('../embeds').welcome;

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getGuildSettings(member.guild);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  const acceptChannel = member.guild.channels.find("name", settings.rulesacceptChannel)

  acceptChannel.send(`Hello ${member} do you accept the rules? respond with \`accept\` if you do (you have 15 minutes to respond)`)
  .then(() => {
    acceptChannel.awaitMessages((m) => m.content.toLowerCase() === 'accept' && m.author.id === member.user.id, {
      max: 1, time: 900000, errors: ["time"]
    })
    .then((collected) => {
      const resp = collected.first();

      if (resp.author.id === member.user.id && resp.content.toLowerCase() === 'accept') {
        member.addRole('460383598151860224');
      } else {
        member.kick();
      }
    })
    .catch(() => {
      member.kick('didn\'t accept the rules');
    })
  })

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.find("name", settings.welcomeChannel).send({
    embed: embeds.guild(client, member)
  })
  .then(() => {
    member.send({
      embed: embeds.dm(client, member)
    })
  })
  .catch(console.error);
};
