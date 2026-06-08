/**
 * Generates src/data/keywords.js from Scryfall catalog + curated definitions.
 * Run: node scripts/generate-keywords.mjs
 */
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../src/data/keywords.js");

const CATEGORY_SYMBOL = {
  combat: "⚔️",
  evasion: "🦅",
  protection: "🛡️",
  casting: "💨",
  cost: "💰",
  alternate: "🔄",
  trigger: "⚡",
  landwalk: "🌲",
  cycling: "🔁",
  counter: "🔢",
  mechanic: "⚙️",
};

const KEYWORD_CATEGORY = {
  Deathtouch: "combat", Defender: "combat", "Double Strike": "combat", "First Strike": "combat",
  Lifelink: "combat", Menace: "combat", Reach: "combat", Trample: "combat", Vigilance: "combat",
  Flying: "evasion", Fear: "evasion", Intimidate: "evasion", Shadow: "evasion", Skulk: "evasion",
  Horsemanship: "evasion", "Hexproof from": "protection", Hexproof: "protection", Indestructible: "protection",
  Protection: "protection", Shroud: "protection", Ward: "protection", "Umbra armor": "protection",
  Flash: "casting", Split: "casting", "Split second": "casting",
  Affinity: "cost", Convoke: "cost", Delve: "cost", Emerge: "cost", Evoke: "cost", Improvise: "cost",
  Offering: "cost", Prowl: "cost", Spectacle: "cost", Surge: "cost", Assist: "cost", Bargain: "cost",
  Casualty: "cost", Blitz: "cost", Dash: "cost", Jump: "cost", "Jump-start": "alternate",
  Flashback: "alternate", Madness: "alternate", Retrace: "alternate", Unearth: "alternate",
  Escape: "alternate", Foretell: "alternate", Suspend: "alternate", Cipher: "alternate",
  Cycling: "cycling", Landcycling: "cycling", Typecycling: "cycling",
  Plainswalk: "landwalk", Islandwalk: "landwalk", Swampwalk: "landwalk", Mountainwalk: "landwalk",
  Forestwalk: "landwalk", Landwalk: "landwalk",
  Modular: "counter", Proliferate: "counter", Suspend: "counter",
};

const IT_NAMES = {
  Absorb: "Assorbimento", Affinity: "Affinità", Afflict: "Affliggere", Afterlife: "Aldilà",
  Aftermath: "Epilogo", Amplify: "Amplificare", Annihilator: "Annientatore", Ascend: "Ascensione",
  Assist: "Assistenza", Augment: "Potenziamento corporeo", "Aura Swap": "Scambio aura", Awaken: "Risveglio",
  Backup: "Supporto", Banding: "Aggregazione", Bargain: "Contrattazione", "Battle Cry": "Grido di battaglia",
  Bestow: "Conferimento", Blitz: "Blitz", Bloodthirst: "Sete di sangue", Boast: "Vantarsi",
  Bushido: "Bushido", Buyback: "Riacquisto", Cascade: "Cascata", Casualty: "Vittima collaterale",
  Champion: "Campione", Changeling: "Mutamorfo", Cipher: "Cifrare", Cleave: "Spaccare",
  "Commander ninjutsu": "Ninjutsu del comandante", Companion: "Compagno", Compleated: "Completato",
  Conspire: "Congiura", Convoke: "Convocazione", Craft: "Creazione", Crew: "Equipaggio",
  "Cumulative upkeep": "Mantenimento cumulativo", Cycling: "Ciclo", Dash: "Scatto", Daybound: "Diurno",
  Deathtouch: "Tocco letale", Decayed: "Decomposto", Defender: "Difensore", Delve: "Scavare",
  Demonstrate: "Dimostrazione", Desertwalk: "Passa-deserto", Dethrone: "Detronizzare", Devoid: "Privo",
  Devour: "Divorare", Disguise: "Travestimento", Disturb: "Disturbare", "Double strike": "Doppio attacco",
  "Double Strike": "Doppio attacco", "Double team": "Doppia squadra", Dredge: "Dragare", Echo: "Eco",
  Embalm: "Imbalsamare", Emerge: "Emergere", Enchant: "Incantare", Encore: "Bis", Enlist: "Arruolare",
  Entwine: "Intrecciare", Epic: "Epico", Equip: "Equipaggiare", Escalate: "Escalation", Escape: "Fuga",
  Eternalize: "Eternalizzare", Evoke: "Evocazione forzata", Evolve: "Evoluzione", Exalted: "Esaltazione",
  Exhaust: "Esaurimento", Exploit: "Sfruttare", Extort: "Estorcere", Fabricate: "Fabbricare",
  Fading: "Svanire", Fear: "Paura", "First strike": "Attacco improvviso", "First Strike": "Attacco improvviso",
  Flanking: "Fiancheggiamento", Flash: "Lampo", Flashback: "Riflash", Flying: "Volare",
  Forecast: "Previsione", Foretell: "Presagio", Fortify: "Fortificare", Frenzy: "Frenesia",
  Fuse: "Fusione", Gift: "Dono", Graft: "Innesto", Gravestorm: "Tempesta tombale",
  Harmonize: "Armonizzare", Haste: "Rapidità", Haunt: "Infestare", Hexproof: "Anti-malocchio",
  "Hexproof from": "Anti-malocchio da", Hideaway: "Nascondiglio", Horsemanship: "Equitazione",
  Impending: "Imminente", Improvise: "Improvvisare", Indestructible: "Indistruttibile", Infect: "Infettare",
  Ingest: "Ingerire", Intimidate: "Intimidire", "Jump-start": "Riavvio", Kicker: "Potenziamento",
  Level: "Livello", "Level Up": "Aumento di livello", Lifelink: "Legame vitale", Madness: "Follia",
  Megamorph: "Megamorfosi", Melee: "Mischia", Menace: "Minacciare", Mentor: "Mentore", Miracle: "Miracolo",
  Mobilize: "Mobilitare", Modular: "Modulare", Morph: "Morfosi", Mutate: "Mutazione", Myriad: "Miriade",
  Nightbound: "Notturno", Ninjutsu: "Ninjutsu", Offering: "Offerta", Offspring: "Progenie",
  Outlast: "Sopravvivenza", Overload: "Sovraccarico", Partner: "Compagno", "Partner with": "Compagno di",
  Persist: "Persistere", Phasing: "Sfasamento", Poisonous: "Velenoso", Protection: "Protezione",
  Provoke: "Provocare", Prowess: "Abilità", Prowl: "Agguato", Rampage: "Furia", Reach: "Raggiungere",
  Rebound: "Rimbalzo", Reconfigure: "Riconfigurare", Recover: "Recupero", Reinforce: "Rinforzo",
  Renown: "Fama", Replicate: "Replicare", Retrace: "Ritracciare", Riot: "Rivolta", Ripple: "Ondeggiare",
  Saddle: "Sella", Scavenge: "Saprofagia", Shadow: "Ombra", Shroud: "Velo", Skulk: "Furtività",
  Sneak: "Infiltrazione", Soulbond: "Legame dell'anima", Soulshift: "Spostamento dell'anima",
  Spectacle: "Spettacolo", Splice: "Giunzione", "Split second": "Frazione di secondo", Spree: "Sfrenatezza",
  Squad: "Squadra", Station: "Stazione", Storm: "Tempesta", Sunburst: "Esplosione solare",
  Surge: "Ondata", Suspend: "Sospendere", Toxic: "Tossico", Training: "Addestramento",
  Trample: "Travolgere", Transfigure: "Trasfigurare", Transmute: "Trasmutare", Tribute: "Tributo",
  Undying: "Immortale", Unearth: "Dissotterrare", Unleash: "Scatenare", Vanishing: "Svanire",
  Vigilance: "Cautela", Ward: "Egida", Wither: "Avvizzire",
};

const DEFINITIONS_EN = {
  Deathtouch: "Any amount of damage this deals to a creature is enough to destroy it.",
  Defender: "This creature can't attack.",
  "Double Strike": "This creature deals both first-strike and regular combat damage.",
  "First Strike": "This creature deals combat damage before creatures without first strike.",
  Flash: "You may cast this spell any time you could cast an instant.",
  Flying: "This creature can only be blocked by creatures with flying or reach.",
  Haste: "This creature can attack and tap as soon as it enters under your control.",
  Hexproof: "This permanent can't be the target of spells or abilities your opponents control.",
  Indestructible: "Effects that say 'destroy' don't destroy this. Lethal damage and deathtouch don't destroy it.",
  Lifelink: "Damage dealt by this source also causes its controller to gain that much life.",
  Menace: "This creature can't be blocked except by two or more creatures.",
  Protection: "This can't be damaged, enchanted, equipped, blocked, or targeted by sources with the stated quality.",
  Reach: "This creature can block creatures with flying.",
  Shroud: "This permanent can't be the target of spells or abilities.",
  Trample: "Excess combat damage is dealt to the player or planeswalker this creature is attacking.",
  Vigilance: "Attacking doesn't cause this creature to tap.",
  Ward: "When this becomes the target of a spell or ability an opponent controls, counter it unless that player pays the listed cost.",
  Kicker: "You may pay an additional cost to get an extra effect when you cast this spell.",
  Flashback: "You may cast this card from your graveyard for its flashback cost, then exile it.",
  Cascade: "When you cast this spell, exile cards from the top of your library until you exile a nonland card you can cast for less. Cast it without paying its mana cost.",
  Convoke: "Your creatures can help cast this spell. Each one you tap pays for {1} or one mana of its color.",
  Cycling: "Discard this card: draw a card.",
  Equip: "Attach to target creature you control. Activate only as a sorcery.",
  Crew: "Tap any number of creatures you control with total power N or more: This Vehicle becomes an artifact creature.",
  Mutate: "Cast on a creature you own. It mutates with the target, stacking abilities and power/toughness.",
  Mentor: "When this creature attacks, put a +1/+1 counter on target attacking creature with lesser power.",
  Prowess: "Whenever you cast a noncreature spell, this creature gets +1/+1 until end of turn.",
  Scavenge: "Exile this card from your graveyard: Put N +1/+1 counters on target creature.",
  Evoke: "You may cast this spell for its evoke cost. If you do, it's sacrificed when it enters.",
  Delve: "Each card you exile from your graveyard pays for {1}.",
  Affinity: "This spell costs {1} less to cast for each permanent of a stated type you control.",
  Annihilator: "Whenever this creature attacks, defending player sacrifices N permanents.",
  Exalted: "Whenever a creature you control attacks alone, it gets +1/+1 until end of turn.",
  Undying: "When this creature dies, if it had no +1/+1 counters, return it with a +1/+1 counter.",
  Persist: "When this creature dies, if it had no -1/-1 counters, return it with a -1/-1 counter.",
  Modular: "When this creature dies, put its +1/+1 counters on target artifact creature.",
  Storm: "When you cast this spell, copy it for each spell cast before it this turn.",
  Suspend: "You may pay the suspend cost. If you do, exile this card with time counters and cast it later without paying mana.",
  Morph: "You may cast this face down as a 2/2 creature for {3}. Turn it face up at any time for its morph cost.",
  Ninjutsu: "Return an unblocked attacker you control: Put this creature onto the battlefield tapped and attacking.",
  Bestow: "Cast this on a creature. It becomes an Aura. When the creature dies, this becomes a creature.",
  Monstrosity: "Activate: Put X +1/+1 counters on this creature. It becomes monstrous.",
  Outlast: "Tap, pay N life: Put a +1/+1 counter on this creature. Activate only as a sorcery.",
  Renown: "When this creature deals combat damage to a player, if it isn't renowned, put a +1/+1 counter on it and it becomes renowned.",
  Exploit: "When this creature enters, you may sacrifice a creature. If you do, trigger exploit effects.",
  Emerge: "Cast this spell by sacrificing a creature and paying the difference in mana costs.",
  Escalate: "Pay an additional cost each time you choose a target for this spell beyond the first.",
  Entwine: "Pay the entwine cost in addition to mana to get both modes instead of one.",
  Fuse: "Cast one or both halves. If both, they're cast as a single spell with both effects.",
  Overload: "You may pay the overload cost. If you do, change 'target' to 'each' in the spell's text.",
  Replicate: "When you cast this spell, copy it for each time you paid its replicate cost.",
  Buyback: "You may pay an additional cost when casting this spell. If you do, return it to your hand instead of putting it in your graveyard.",
  Madness: "If you discard this card, you may cast it for its madness cost. If you do, exile it when it resolves.",
  Dredge: "If you would draw a card, you may mill N cards and return this card from your graveyard to your hand instead.",
  Transmute: "Discard this card: search your library for a card of a stated type, reveal it, put it in your hand.",
  Forecast: "Activate during your upkeep if this card is in your hand: reveal it and activate its forecast ability.",
  Forecast: "Activate during your upkeep if this card is in your hand: reveal it and activate its forecast ability.",
  Banding: "You can attack in bands. Creatures in a band assign combat damage together.",
  Rampage: "Whenever this creature becomes blocked, it gets +N/+N until end of turn for each creature beyond the first that blocks it.",
  Flanking: "Creatures without flanking that block this creature get -1/-1 until end of turn.",
  Bushido: "When this creature blocks or becomes blocked, it gets +N/+N until end of turn.",
  Provoke: "When this creature enters, you may choose a creature. If you do, that creature attacks this turn if able.",
  Soulbond: "You may pair this creature with another unpaired creature for shared abilities.",
  Cipher: "When this spell resolves, you may exile it encoded on a creature you control.",
  Haunt: "When this creature dies or this spell resolves, you may haunt a creature.",
  Sunburst: "This enters with a charge counter on it for each color of mana spent to cast it.",
  Conspire: "As you cast this spell, you may tap two untapped creatures that share a color with it. If you do, copy it.",
  Retrace: "You may cast this card from your graveyard by discarding a land card in addition to paying its other costs.",
  Unearth: "Return this creature card from your graveyard. It gains haste. Exile it at end of turn.",
  Graft: "When this creature enters, you may put a +1/+1 counter on it and another creature.",
  Vanishing: "This enters with time counters. At end step, remove one. When the last is removed, sacrifice it.",
  Fading: "This enters with fade counters. At your upkeep, remove one. When the last is removed, sacrifice it.",
  Phasing: "This phases in or out during your untap step. While phased out, it's treated as though it doesn't exist.",
  Infect: "This deals damage to creatures in the form of -1/-1 counters and to players in the form of poison counters.",
  Wither: "This deals damage to creatures in the form of -1/-1 counters.",
  Toxic: "When this creature deals combat damage to a player, they get poison counters.",
  Poisonous: "When this creature deals combat damage to a player, they get N poison counters.",
  Extort: "Whenever you cast a spell, you may pay {W/B}. Each opponent loses 1 life and you gain 1 life.",
  Battalion: "Whenever this creature and at least two other creatures attack, trigger battalion abilities.",
  "Battle Cry": "Whenever this creature attacks, other attacking creatures get +1/+0 until end of turn.",
  Heroic: "Whenever you cast a spell that targets this creature, trigger heroic abilities.",
  Inspired: "Whenever this creature becomes untapped, trigger inspired abilities.",
  Constellation: "Whenever an enchantment enters under your control, trigger constellation abilities.",
  Landfall: "Whenever a land enters under your control, trigger landfall abilities.",
  Fabricate: "When this creature enters, put a +1/+1 counter on it or create a 1/1 colorless Servo artifact creature.",
  Improvise: "Your artifacts can help cast this spell. Each artifact you tap pays for {1}.",
  Afflict: "Whenever this creature becomes blocked, defending player loses 1 life.",
  Ascend: "You gain the city's blessing (10+ permanents) and unlock stronger effects.",
  Assist: "Another player may pay up to N of this spell's mana cost.",
  Backup: "Put +1/+1 counters on target creature. It gains the listed keyword abilities.",
  Blitz: "Cast for blitz cost. It gains haste and 'When this dies, draw a card.' Sacrifice it at end of turn.",
  Casualty: "As you cast this spell, you may sacrifice a creature. If you do, reduce the cost or get an extra effect.",
  Cleave: "You may cast the cleave cost version by removing part of the rules text.",
  Compleated: "Phyrexian mana spent to cast this reduces the number of oil counters it enters with.",
  Craft: "Exile artifacts and/or creatures you control with total mana value N, then activate craft abilities.",
  Daybound: "Transforms to nightbound at end of turn if a player cast two or more spells that turn.",
  Nightbound: "Transforms to daybound at end of turn if no player cast spells that turn.",
  Decayed: "This creature can't block. When it attacks, sacrifice it at end of combat.",
  Demonstrate: "When you cast this spell, you may copy it. If you do, each opponent may copy it without paying cost.",
  Devour: "As this enters, you may sacrifice any number of creatures. It enters with N +1/+1 counters.",
  Disguise: "Cast face down as a 2/2 creature for {3}. Turn face up for disguise cost with a triggered ability.",
  Disturb: "Cast from graveyard for disturb cost. It becomes a Spirit on the back and is exiled when it leaves.",
  Dethrone: "Whenever this creature attacks the player with the most life or tied for most, trigger dethrone.",
  Embalm: "Create an embalm token copy of this card in exile, then cast it for embalm cost.",
  Eternalize: "Create an eternalize token in exile, then cast it for eternalize cost.",
  Encore: "Cast from graveyard for encore cost. Creatures you control gain haste and must attack.",
  Enlist: "As this attacks, tap an untapped creature you control that isn't attacking to add its power.",
  Escalate: "Pay extra mana for each additional target beyond the first.",
  Escape: "Cast from graveyard by exiling other cards from your graveyard in addition to paying mana.",
  Foretell: "During your turn, you may pay {2} to exile this face down. Cast it on a later turn for its foretell cost.",
  Freerunning: "You may cast for freerunning cost if a player was dealt combat damage this turn by a Ninja or Rogue.",
  Gift: "When you cast this spell, you may give an opponent a gift to get a bonus effect.",
  Harmonize: "Cast for harmonize cost if you control a creature with four or more power.",
  Hideaway: "This enters tapped. When it enters, look at the top N cards and exile one face down.",
  Impending: "Cast for impending cost. It enters with time counters and becomes a creature when they reach zero.",
  Intensity: "The more you pay above the base cost, the stronger the effect.",
  Max: "At max speed (3+ lands or other condition), this vehicle/plane has enhanced abilities.",
  Mobilize: "Create N tapped and attacking token creatures that are removed at end of combat.",
  Offspring: "Pay offspring cost when casting. When this creature enters, create a smaller token copy.",
  Outlast: "Tap, pay life: Put a +1/+1 counter on this creature. Activate only as a sorcery.",
  Paradigm: "Choose a mode that persists and alters how the card works.",
  Partner: "You can have two commanders if both have partner.",
  "Partner with": "Pairs with a specific other commander as your two commanders.",
  Companion: "You may reveal this from outside the game if your deck meets its deck-building restriction.",
  Prototype: "Cast the prototype cost for a smaller version, or full cost for the full-size card.",
  Reconfigure: "Attach to a creature or detach as a sorcery. While attached, it grants abilities.",
  Recover: "When a creature dies, you may cast this from graveyard for recover cost.",
  Reinforce: "Discard this card: put N +1/+1 counters on target creature.",
  Ripple: "When this spell resolves, you may reveal the top four cards of your library. Cast any with same mana cost for free.",
  Saddle: "Tap creatures with total power N: This Mount becomes saddled until end of turn.",
  Skulk: "This creature can't be blocked by creatures with greater power.",
  Sneak: "Cast for sneak cost. It gains haste. Return it to hand at end of turn.",
  Spree: "Choose one or more modes, paying the spree cost for each additional mode.",
  Squad: "As an additional cost, you may pay N. If you do, create N token copies as it enters.",
  Station: "Tap creatures to put charge counters on this Spacecraft. At N counters it becomes a creature.",
  Surge: "You may pay the surge cost if another player has cast a spell this turn.",
  Training: "Whenever this creature attacks with a creature with greater power, put a +1/+1 counter on it.",
  Transfigure: "Sacrifice this creature: search your library for a creature with same mana value, put it onto the battlefield.",
  Tribute: "As this enters, an opponent may give it +1/+1 counters. If they don't, trigger the tribute effect.",
  Unleash: "As this enters, you may put a +1/+1 counter on it. It can't block if you do.",
  Warp: "Cast for warp cost. Exile it at end of turn, then return it to your hand.",
  Wizardcycling: "Cycling for {2}: search your library for a Wizard card.",
  Landwalk: "This creature can't be blocked if defending player controls a land of the stated type.",
  Plainswalk: "This creature can't be blocked if defending player controls a Plains.",
  Islandwalk: "This creature can't be blocked if defending player controls an Island.",
  Swampwalk: "This creature can't be blocked if defending player controls a Swamp.",
  Mountainwalk: "This creature can't be blocked if defending player controls a Mountain.",
  Forestwalk: "This creature can't be blocked if defending player controls a Forest.",
  Desertwalk: "This creature can't be blocked if defending player controls a Desert.",
  Nonbasic: "This creature can't be blocked if defending player controls a nonbasic land.",
  Changeling: "This card is every creature type.",
  Devoid: "This card is colorless regardless of colored mana symbols in its cost.",
  Myriad: "When this creature attacks, for each opponent other than defending player, create a token attacking that player.",
  Melee: "Whenever this creature attacks, it gets +N/+N until end of turn where N is the number of creatures you attacked with.",
  Megamorph: "Turn face up for megamorph cost: put a +1/+1 counter on it.",
  Miracle: "When you draw this card, you may reveal it and cast it for its miracle cost.",
  Rebound: "Cast this spell. At the beginning of your next upkeep, cast it again without paying cost, then exile it.",
  Soulshift: "When this creature dies, you may return target Spirit card with lesser mana value from your graveyard to your hand.",
  Splice: "As you cast this Arcane spell, you may reveal a card with splice from your hand and pay its splice cost.",
  Offering: "You may sacrifice a permanent of a stated type rather than pay this spell's mana cost.",
  Absorb: "If this source would deal damage, prevent N of that damage.",
  Amplify: "As this enters, put N +1/+1 counters on it for each creature of a stated type you control.",
  Aura: "Enchant permanent or player. Falls off if the enchanted object leaves the battlefield.",
  Awaken: "Put N +1/+1 counters on target land. It becomes a 0/0 Elemental creature with haste.",
  Champion: "When this enters, you may remove a creature you control. Return it when this leaves.",
  Conspire: "As you cast this spell, tap two creatures sharing a color with it to copy the spell.",
  Cumulative: "At the beginning of your upkeep, put a time counter on this permanent, then pay upkeep for each counter or sacrifice it.",
  Echo: "At the beginning of your upkeep, sacrifice this unless you pay its echo cost.",
  Frenzy: "Whenever this creature attacks and isn't blocked, it gets +N/+0 until end of turn.",
  Gravestorm: "When you cast this spell, copy it for each permanent put into a graveyard from the battlefield this turn.",
  Level: "Level up by paying cost. Higher levels have better stats and abilities.",
  Living: "This Equipment becomes a creature with living weapon.",
  Madness: "If you discard this card, you may cast it for its madness cost.",
  Prowl: "You may cast this for prowl cost if you dealt combat damage to a player this turn with a creature of a stated type.",
  Recover: "When a creature is put into your graveyard, you may cast this from graveyard for recover cost.",
  Shroud: "This permanent can't be the target of spells or abilities.",
  Split: "Cast one or both halves from a split card.",
  Storm: "Copy this spell for each spell cast before it this turn.",
  Sunburst: "This enters with a charge counter for each color of mana spent to cast it.",
  Suspend: "Exile this card with time counters. Cast it without paying mana when counters reach zero.",
  Toxic: "Combat damage to players also gives poison counters.",
  Typecycling: "Discard this card: search your library for a card of a stated type.",
  "Umbra armor": "If enchanted creature would be destroyed, remove an umbra armor counter instead.",
  "Hexproof from": "This permanent can't be the target of spells or abilities with the stated quality controlled by opponents.",
  "Choose a background": "Can be your Commander paired with a legendary creature with 'Choose a background'.",
  "Doctor's companion": "Can be your Commander paired with a Doctor.",
  "Friends forever": "Can be your Commander paired with a specific friend commander.",
  "For Mirrodin!": "When this Equipment enters, create a 1/1 colorless Phyrexian Goblin token.",
  "More Than Meets the Eye": "You may cast this card transformed by paying its alternate cost.",
  "Double team": "When this creature attacks, conjure a duplicate into your hand.",
  "Hidden agenda": "Start the game with this conspiracy face down in the command zone. Name a card secretly.",
  "Double agenda": "Start with two hidden agendas in the command zone.",
  "Living metal": "During your upkeep, this artifact becomes an artifact creature until your next upkeep.",
  "Living weapon": "When this Equipment enters, create a 0/0 black Germ token and attach this to it.",
  "Read Ahead": "As this Saga enters, choose a chapter to start at.",
  "Firebending": "Whenever you cast an instant or sorcery, this creature gets +1/+0 until end of turn.",
  "Web-slinging": "You may cast this as though it had flash if you attacked with a creature this turn.",
  Ravenous: "When this creature enters, if it wasn't cast, sacrifice it unless you pay its mana cost.",
  Bargain: "An additional cost you can pay if you sacrificed an artifact, creature, or enchantment as you cast this spell.",
  Augment: "Combine with a host creature from your hand or graveyard.",
  "Aura Swap": "Return an Aura you control to its owner's hand: attach this Aura to target legal permanent.",
  Riot: "This creature enters with your choice of a +1/+1 counter or haste.",
  Jump: "Pay jump cost: return a creature you control to hand, then cast this spell.",
  "Jump-start": "Cast from graveyard by discarding a card in addition to paying other costs.",
  Spectacle: "You may cast this spell for its spectacle cost if an opponent lost life this turn.",
  Afterlife: "When this creature dies, create a 1/1 black and white Spirit creature token with flying.",
  Aftermath: "Cast only from graveyard. Exile this half when it resolves.",
  Bloodthirst: "If an opponent was dealt damage this turn, this creature enters with +1/+1 counters.",
  Boast: "Once per combat, if this creature attacked, activate a boast ability.",
  Craft: "Exile permanents you control with total mana value N to activate craft.",
  Enchant: "Target a permanent or player. This Aura attaches to it.",
  Equip: "Attach to target creature you control. Activate only as a sorcery.",
  Fortify: "Attach to target land you control.",
  Graft: "When this enters, put a +1/+1 counter on it and you may put one on another creature.",
  Ingest: "Target player exiles the top card of their library.",
  Intensity: "Effects scale based on how much mana you spent above the base cost.",
  Mentor: "When this attacks, put a +1/+1 counter on an attacking creature with lesser power.",
  Modular: "When this dies, move its +1/+1 counters to target artifact creature.",
  Offering: "Sacrifice a permanent of a stated type: you may cast this spell without paying its mana cost.",
  Prototype: "Cast for prototype cost as a smaller creature, or pay full cost for the full card.",
  Reconfigure: "Attach or detach as a sorcery. Grants abilities while attached.",
  Station: "Tap creatures to put charge counters on this Spacecraft until it becomes a creature.",
  "Basic landcycling": "Discard this card: search your library for a basic land card.",
  Landcycling: "Discard this card: search your library for a land card of a stated type.",
  Plainscycling: "Discard this card: search your library for a Plains card.",
  Islandcycling: "Discard this card: search your library for an Island card.",
  Swampcycling: "Discard this card: search your library for a Swamp card.",
  Mountaincycling: "Discard this card: search your library for a Mountain card.",
  Forestcycling: "Discard this card: search your library for a Forest card.",
  Slivercycling: "Discard this card: search your library for a Sliver card.",
  Wizardcycling: "Discard this card: search your library for a Wizard card.",
  Multikicker: "You may pay the kicker cost multiple times.",
  "Commander ninjutsu": "From the command zone, return an unblocked attacker: put this commander onto the battlefield attacking.",
  Increment: "Put a +1/+1 counter on this creature.",
  Solved: "When you collect evidence of a stated value, unlock stronger effects.",
  Teamwork: "Modes or costs improve when you control multiple creatures.",
  Tiered: "Choose a tier when casting; higher tiers cost more and do more.",
  Power: "Pay power-up costs to unlock abilities on this card.",
  "Job select": "Choose a job that modifies this card's abilities.",
  Paradigm: "Choose a persistent mode when this enters.",
  "Max speed": "If you meet the speed condition, this has enhanced stats and abilities.",
  Mayhem: "You may cast this card from your graveyard for its mayhem cost.",
  "Choose a background": "Pairs with a legendary creature that has 'Choose a background' as your commanders.",
};

// Remove duplicate keys accidentally - use last
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function scryfall(path) {
  const res = await fetch(`https://api.scryfall.com${path}`, {
    headers: { "User-Agent": "mtg-reference/1.0", Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res.json();
}

async function exampleCard(keyword) {
  const q = encodeURIComponent(`kw:${keyword}`);
  try {
    const data = await scryfall(`/cards/search?q=${q}&unique=cards&order=released`);
    if (data.data?.length) return data.data[0].name;
  } catch {
    /* ignore */
  }
  return null;
}

function fallbackDef(keyword) {
  return `Rules keyword: ${keyword}. See the card's oracle text for full rules.`;
}

function itName(keyword) {
  return IT_NAMES[keyword] || keyword;
}

function itDef(keyword, enDef) {
  // Keep Italian defs aligned where we have glossary terms; otherwise note EN rules
  const itOverrides = {
    "Tocco letale": "Una creatura che subisce un qualsiasi ammontare di danno da questa fonte viene distrutta.",
    "Difensore": "Questa creatura non può attaccare.",
    "Doppio attacco": "Infligge il danno da combattimento due volte.",
    "Attacco improvviso": "Infligge tutto il suo danno da combattimento prima delle creature senza attacco improvviso o doppio attacco.",
    Lampo: "Puoi lanciare questa magia in ogni momento in cui potresti lanciare un istantaneo.",
    Volare: "Può essere bloccata solo da creature con volare o raggiungere.",
    Rapidità: "Ignora la debolezza da evocazione. Può attaccare non appena entra sotto il tuo controllo.",
    "Anti-malocchio": "Non può essere bersaglio di magie o abilità controllate dagli avversari.",
    Indistruttibile: "Non può essere distrutta dal danno o da effetti che dicono «distruggi».",
    "Legame vitale": "Quando infligge danno, guadagni altrettanti punti vita.",
    Minacciare: "Non può essere bloccata tranne che da due o più creature.",
    Protezione: "Non può essere danneggiata, incantata, equipaggiata, bloccata o bersagliata dalla qualità indicata.",
    Raggiungere: "Questa creatura può bloccare creature con volare.",
    Velo: "Non può essere bersaglio di magie o abilità.",
    Travolgere: "Il danno da combattimento in eccesso va al giocatore o planeswalker attaccato.",
    Cautela: "Attacca senza TAPpare.",
    Egida: "Quando viene bersagliata da un avversario, deve pagare un costo o la magia o abilità viene neutralizzata.",
    Potenziamento: "Puoi pagare un costo aggiuntivo per ottenere un effetto extra quando lanci questa magia.",
    Riflash: "Puoi lanciare questa carta dal cimitero pagando il costo riflash, poi esilia la carta.",
    Cascata: "Quando lanci questa magia, esilia carte dal top del grimorio fino a una non-terra lanciabile; lanciala senza pagare il costo.",
    Convocazione: "Le tue creature possono aiutare a lanciare questa magia. Ogni creatura TAPpata paga per {1} o un mana del suo colore.",
    Ciclo: "Scarta questa carta: pesca una carta.",
    Equipaggiare: "Assegna a una creatura bersaglio che controlli. Attiva solo a velocità stregoneria.",
    Equipaggio: "TAPpa creature con forza totale N o superiore: questo Veicolo diventa una creatura artefatto.",
    Mutazione: "Lancia su una creatura che possiedi. Si combina con il bersaglio accumulando abilità e forza/costituzione.",
  };
  const name = itName(keyword);
  if (itOverrides[name]) return itOverrides[name];
  return enDef; // bilingual app: EN rules text when no IT translation yet
}

function categoryOf(keyword) {
  return KEYWORD_CATEGORY[keyword] || "mechanic";
}

async function main() {
  const catalog = await scryfall("/catalog/keyword-abilities");
  const keywords = [...catalog.data].sort((a, b) => a.localeCompare(b));

  const en = [];
  const it = [];

  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];
    const cat = categoryOf(keyword);
    const symbol = CATEGORY_SYMBOL[cat] || "⚙️";
    const enDef = DEFINITIONS_EN[keyword] || fallbackDef(keyword);
    const card = await exampleCard(keyword);
    const nameIt = itName(keyword);
    const defIt = itDef(keyword, enDef);

    en.push({ name: keyword, symbol, mana: [], def: enDef, card, category: cat });
    it.push({ name: nameIt, symbol, mana: [], def: defIt, card, category: cat });

    if ((i + 1) % 10 === 0) {
      process.stderr.write(`Fetched ${i + 1}/${keywords.length}\n`);
      await sleep(100);
    } else {
      await sleep(50);
    }
  }

  const content = `// Auto-generated by scripts/generate-keywords.mjs — do not edit by hand
// Regenerate: node scripts/generate-keywords.mjs
export const KEYWORDS = {
  en: ${JSON.stringify(en, null, 2)},
  it: ${JSON.stringify(it, null, 2)},
};
`;

  writeFileSync(OUT, content, "utf8");
  console.log(`Wrote ${keywords.length} keywords to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
