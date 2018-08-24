const ROT = require('rot-js');

// Constants
const MAX_ROUNDS = 4
const INITIAL_HP = 20
const TARGET_SELF = 'self'
const TARGET_OTHER = 'target'

// TEMPLATES BEGIN
// {a} is attacker, {d} is defender/target, {o} is a randomly selected object,
// {v} is the verb associated with that object, and {b} is a random body part.

const WEAPONS = {
  'swing': {
    'axe': 3,
    'scimitar': 4,
    'buzzsaw': 5,
    'chainsaw': 6,
    'broadsword': 7,
    'katana': 4,
    'falchion': 5
  },
  'fire': {
    'raygun': 5,
    'flamethrower': 6,
    'crossbow': 3,
    'railgun': 6,
    'ballista': 6,
    'catapult': 5,
    'cannon': 4,
    'mortar': 3
  },
  'stab': {
    'naginata': 5,
    'lance': 4
  }
}

const SINGLE_PROJECTILE = {
    'fire': {
        'a psionic projectile': 4,
    },
    'hurl': {
        'pocket sand': 1,
        'a spear': 6,
        'a heavy rock': 3,
    },
    'toss': {
        'a moltov cocktail': 4,
        'a grenade': 5
    }
}

const FAMILIAR = {
    'divebomb': {
      'their owl companion': 3,
    },
    'charge': {
      'their pet goat': 3,
      'their pet unicorn': 4,
    },
    'constrict': {
      'their thick anaconda': 4,
    }
}

const SUMMON = {
    'charge': {
        'a badass tiger': 5,
        'a sharknado': 8,
        'a starving komodo dragon': 5
    },
    'swarm': {
        'all these muthafucking snakes': 5,
    }
}

const MELEE = {
    'stab': {
        'dagger': 5
    },
    'drive': {
        'fist': 4,
        'toe': 2
    }
}

const MARTIAL = {
  'roundhouse kick': 6,
  'uppercut': 5,
  'bitch-slap': 2,
  'headbutt': 4
}

const BODYPARTS = [
  'head',
  'throat',
  'neck',
  'solar plexus',
  'ribcage',
  'balls',
  'spleen',
  'kidney',
  'leg',
  'arm',
  'jugular',
  'abdomen',
  'shin',
  'knee',
  'other knee'
]

const VERB_IND_SUB = {
  'munch': 'munches', 'toss': 'tosses'
}

const ATTACK = {
  "{0} {3} their {2} at {1}!": (WEAPONS),
  "{0} {3} their {2} into {1}!": (MELEE),
  "{0} {3} their {2} into {1}'s {4}!": (MELEE),
  "{0} {3} {2} at {1}!": (SINGLE_PROJECTILE),
  "{0} {3} {2} at {1}'s {4}!": (SINGLE_PROJECTILE),
  "{0} {3} {2} into {1}'s {4}!": (SINGLE_PROJECTILE),
  "{0} summons {2} to {3} {1}!": SUMMON,
  "{0} orders {2} to {3} {1}!": FAMILIAR,
  "{0} {3} {1}!": (MARTIAL),
  "{1} is bowled over by {0}'s sudden bull rush!": 6,
  "{0} tickles {1}, causing them to pass out from lack of breath": 2,
  "{0} points at something in the distance, distracting {1} long enough to {3} them!": MARTIAL
}

const CRITICAL = {
  "Quicker than the eye can follow, {0} delivers a devastating blow with their {2} to {1}'s {4}.": WEAPONS,
  "The sky darkens as {0} begins to channel their inner focus. The air crackles as they slowly raise their {2} above their head before nailing an unescapable blow directly to {1}'s {4}!": WEAPONS,
  "{0} nails {1} in the {4} with their {2}! Critical hit!": WEAPONS,
  "With frightening speed and accuracy, {0} devastates {1} with a tactical precision strike to the {4}. Critical hit!": WEAPONS
}

const HEALS = {
    'inject': {
        'morphine': 4,
        'nanomachines': 5
    },
    'smoke': {
        'a fat joint': 2,
        'medicinal incense': 3,
        'their hookah': 3
    },
    'munch': {
        'on some': {
            'cake': 5,
            'cat food': 3,
            'dog food': 4
        },
        'on a': {
            'waffle': 4,
            'turkey leg': 2
        }
    },
    'drink': {
        'some': {
            'Ambrosia': 7,
            'unicorn piss': 5,
            'purple drank': 2,
            'sizzurp': 3,
            'goon wine': 2
        },
        'a': {
            'generic hp potion': 5,
            'refreshingly delicious can of 7-Up': 3,
            'fresh mug of ale': 3
        },
        'an': {
            'elixir': 5
        }
    }
}

const HEAL = {
  "{0} decides to {3} {2} instead of attacking.": HEALS,
  "{0} calls a timeout and {3} {2}.": (HEALS),
  "{0} decides to meditate on their round.": 5
}


const FUMBLE = {
  "{0} closes in on {1}, but suddenly remembers a funny joke and laughs instead.": 0,
  "{0} moves in to attack {1}, but is disctracted by a shiny.": 0,
  "{0} {3} their {2} at {1}, but has sweaty hands and loses their grip, hitting themself instead.": (WEAPONS),
  "{0} {3} their {2}, but fumbles and drops it on their {4}!": (WEAPONS)
}

const BOT = {
  "{0} charges its laser aaaaaaaand... BZZZZZZT! {1} is now a smoking crater for daring to challenge the bot.": INITIAL_HP
}

const HITS = [
  'deals', 'hits for'
]
const RECOVERS = [
  'recovers', 'gains', 'heals'
]

// TEMPLATES END

// Move category target and multiplier (negative is damage)
const MOVES = {
  CRITICAL: {
    moves: CRITICAL,
    target: TARGET_OTHER,
    multiplier: -2
  },
  ATTACK: {
    moves: ATTACK,
    target: TARGET_OTHER,
    multiplier: -1
  },
  FUMBLE: {
    moves: FUMBLE,
    target: TARGET_SELF,
    multiplier: -1
  },
  HEAL: {
    moves: HEAL,
    target: TARGET_SELF,
    multiplier: 1
  },
  BOT: {
    moves: BOT,
    target: TARGET_OTHER,
    multiplier: -64
  }
}

// Weights of distribution for biased selection of moves

const weightedMoves = { 'CRITICAL': 0.05, 'ATTACK': 1, 'FUMBLE': 0.1, 'HEAL': 0.1 }

class Player {
  constructor(member, initial_hp=INITIAL_HP) {
    this.hp = initial_hp;
    this.member = member;
    this.wins = 0;
    this.losses = 0;
    this.draws = 0;
  }
}

const weighted_choice = (choices) => {
  return ROT.RNG.getWeightedValue(choices);
}


const nested_random = (d) => {
  let k = weighted_choice(dict_weight(d).wd)
  let result = [k]

  if (typeof d[k] === 'object') {
    let things = nested_random(d[k]);
    for (let t = 0; t < things.length; t++) {
      result.push(things[t]);
    }
  } else {
    result.push(d[k])
  }

  return result
}

const dict_weight = (d, top=true) => {
  let wd = {};
  let sw = 0;

  for (let k in d) {
    let v = d[k];
    let w;

    if (typeof v === 'object') {
      let r = dict_weight(v, false);
      let x = r.wd;
      let y = r.sw;
      wd[k] = (top) ? y : x;
      w = y
    } else {
      w = 1
      wd[k] = w
    }

    sw += w
  }

  if (top) {
    return { wd }
  } else {
    return { wd, sw }
  }
}

const generateAction = (attacker, defender, cat) => {
  if (!cat) cat = weighted_choice(weightedMoves);

  let { moves, target, multiplier } = MOVES[cat];

  target = (target === TARGET_OTHER) ? defender : attacker;

  let { move, obj, verb, hp_delta } = generate_move(moves)
  hp_delta *= multiplier
  let bodypart = BODYPARTS.random();

  let msg = move.format(attacker.member, defender.member, obj, verb, bodypart)
  if (hp_delta == 0) {
    // do nothing
  } else {
    target.hp += hp_delta;
    if (hp_delta > 0) {
      let s = RECOVERS.random()
      msg += ` It ${s} ${Math.abs(hp_delta)} damage (${target.hp})`;
    } else if (hp_delta < 0) {
      let s = HITS.random();
      msg += ` It ${s} ${Math.abs(hp_delta)} damage (${target.hp})`;
    }
  }

  return msg
}

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const generate_move = (moves) => {
  // Select move, action, object, etc
  let movelist = nested_random(moves);

  let hp_delta = movelist.pop()  // always last

  // randomize damage/healing done by -/+ 33%
  hp_delta = Math.floor(((hp_delta * randomInt(66, 133)) / 100))
  console.log(hp_delta)
  let move = movelist.shift()  // always first
  let verb = (movelist) ? movelist.shift() : null; // Optional
  let obj = (movelist) ? movelist.pop() : null;  // Optional

  if (movelist.length !== 0) {
    verb += ' ' + movelist.pop(); // Optional but present when obj is
  }

  return { move, obj, verb, hp_delta };
}

const wait = (time = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time);
  })
}

exports.run = (client, message, args, level) => {
  const defender = message.mentions.members.first();

  if (!defender) return message.reply('You have to tag someone to duel');

  if (defender.id === message.member.id) return message.reply('You can\'t duel yourself silly');

  const p1 = new Player(message.member);
  const p2 = new Player(defender);

  const order = [[p1, p2], [p2, p1]];

  message.channel.send(`${p1.member} challenges ${p2.member} to a duel`)
  .then(async (battleMsg) => {
    let i;
    for (i = 0; i < MAX_ROUNDS; i++) {
      if (p1.hp <= 0 || p2.hp <= 0) break;

      for (let o = 0; o < order.length; o++) {
        let [attacker, defender] = order[o];

        if (p1.hp <= 0 || p2.hp <= 0) break;

        let moveMsg;

        if (attacker.member.id === client.user.id) {
          moveMsg = generateAction(attacker, defender, 'BOT');
        } else {
          moveMsg = generateAction(attacker, defender);
        }

        battleMsg.edit(battleMsg.content + '\n' + moveMsg);
        await wait();
      }
    }

    let endMsg;

    if (p1.hp !== p2.hp) {
      let victor = (p1.hp > p2.hp) ? p1 : p2;
      let loser = (p1.hp < p2.hp) ? p1 : p2;
      victor.wins += 1
      loser.losses += 1

      endMsg = `After ${i + 1} rounds, ${victor.member} wins with ${victor.hp} HP!`;
      endMsg += '\nStats: '

      endMsg += `${p1.member} has ${p1.wins} wins, ${p1.losses} losses, ${p1.draws} draws`
      endMsg += `${p2.member} has ${p2.wins} wins, ${p2.losses} losses, ${p2.draws} draws`
    } else {

      p1.draws += 1;
      p2.draws += 1;

      endMsg = `After ${i + 1} rounds, the duel ends in a tie!`;
    }

    battleMsg.edit(battleMsg.content + '\n' + endMsg);
  })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "duel",
  category: "Miscelaneous",
  description: "Fight someone! attacks and such randomized (might change)",
  usage: "duel @user"
};