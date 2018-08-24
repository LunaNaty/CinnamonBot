
const items = {
  roles: {
    'Hobbies': [
      {
        name: 'Anime Lover',
        price: 0,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'Anime Lover'), 'Purchased');
        }
      },
      {
        name: 'Music Lover',
        price: 0,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'Music Lover'), 'Purchased');
        }
      },
      {
        name: 'Games Lover',
        price: 0,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'Games Lover'), 'Purchased');
        }
      },
    ],
    'Channel Bypass': [
      {
        name: 'NSFW',
        price: 0,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'NSFW'), 'Purchased');
        }
      },
      {
        name: 'Spoiler',
        price: 0,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'Spoiler'), 'Purchased');
        }
      },
    ],
    'Gangs and Cults': [
      {
        name: 'Luna Cult',
        price: 0,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'Luna Cult'), 'Purchased');
        }
      },
      {
        name: 'Smol Gang',
        price: 0,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'Smol Gang'), 'Purchased');
        }
      },
    ],
    'Colors': [
      {
        name: 'Red',
        price: 50,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'Red'), 'Purchased');
        }
      },
      {
        name: 'Fire Red',
        price: 50,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'Fire Red'), 'Purchased');
        }
      },
      {
        name: 'Nightmare Red',
        price: 50,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'Nightmare Red'), 'Purchased');
        }
      },
      {
        name: 'Cherry Red',
        price: 50,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'Cherry Red'), 'Purchased');
        }
      },
      {
        name: 'Blue',
        price: 50,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'Blue'), 'Purchased');
        }
      },
      {
        name: 'Blossom Blue',
        price: 50,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'Blossom Blue'), 'Purchased');
        }
      },
      {
        name: 'Sea Blue',
        price: 50,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'Sea Blue'), 'Purchased');
        }
      },
      {
        name: 'Evening Blue',
        price: 50,
        purchase: (client, member) => {
          return member.addRole(member.guild.roles.find('name', 'Evening Blue'), 'Purchased');
        }
      },
    ]
  }
}

module.exports = items;