const games = ['Resident Evil 7', 'Crush Crush', 'with Lego!', 'with Sayori', 'with Crayons!', 'Katawa Shoujo', 'Doki Doki Literature Club', 'Friday The 13th The game.'];

module.exports = async client => {
  // Log that the bot is online.
  client.logger.log(`[READY] ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${client.config.settings.prefix}help`, { type: "PLAYING" });

  setInterval(() => {
    client.user.setActivity(games[Math.floor(Math.random() * games.length)], { type: 'PLAYING' });
  }, 1500);
};