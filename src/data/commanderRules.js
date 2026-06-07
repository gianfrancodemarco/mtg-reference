export const COMMANDER_RULES = {
  en: [
    { title: "Deck Construction", icon: "📚", content: "Exactly 100 cards. 1 legendary creature (or planeswalker) as Commander. All cards must match the Commander's color identity. No card more than once (except basic lands). Commander lives in the Command Zone." },
    { title: "Command Zone & Tax", icon: "🏛️", mana: ["2"], content: "Commander starts in the Command Zone. Cast it from there paying its mana cost. Each recast from the Command Zone adds {2} to its cost (commander tax). When it would go to graveyard or exile, you may return it to the Command Zone instead." },
    { title: "Commander Damage", icon: "⚔️", content: "21 or more combat damage from a single Commander to one player = that player loses. Cumulative across all turns, even if the Commander left the battlefield in between." },
    { title: "Starting Life", icon: "❤️", content: "Each player starts at 40 life in Commander (not 20)." },
    { title: "Color Identity", icon: "🎨", content: "Color identity includes mana cost colors AND any mana symbols in the card's text box (including reminder text). A card with {W}{U} in cost and a {G} activation can't be in a WU commander's deck." },
    { title: "Multiplayer & Priority", icon: "🔄", content: "Designed for 4 players. Priority passes clockwise. Triggered abilities stack after each player may respond." },
    { title: "Banned Cards", icon: "🚫", content: "Commander has its own banlist. Notable bans: Mana Crypt, Jeweled Lotus, Stasis, Limited Resources, Biorhythm, Sway of the Stars. Always check the official list at mtgcommander.net." },
  ],
  it: [
    { title: "Costruzione del mazzo", icon: "📚", content: "Esattamente 100 carte. 1 creatura leggendaria (o planeswalker) come comandante. Tutte le carte devono rispettare l'identità cromatica del comandante. Nessuna carta più di una volta (eccetto le terre base). Il comandante resta nella zona comando." },
    { title: "Zona comando e tassa", icon: "🏛️", mana: ["2"], content: "Il comandante inizia nella zona comando. Lo lanci da lì pagando il suo costo di mana. Ogni rilancio dalla zona comando aggiunge {2} al costo (tassa del comandante). Quando dovrebbe andare al cimitero o in esilio, puoi restituirlo alla zona comando." },
    { title: "Danno del comandante", icon: "⚔️", content: "21 o più danni da combattimento da un singolo comandante a un giocatore = quel giocatore perde. Cumulativo per tutta la partita, anche se il comandante ha lasciato il campo nel frattempo." },
    { title: "Vita iniziale", icon: "❤️", content: "Ogni giocatore inizia a 40 punti vita in Commander (non 20)." },
    { title: "Identità cromatica", icon: "🎨", content: "L'identità cromatica include i colori del costo di mana e qualsiasi simbolo di mana nel testo della carta (incluso il testo di promemoria). Una carta con {W}{U} nel costo e un'abilità {G} non può stare nel mazzo di un comandante bianco-blu." },
    { title: "Multiplayer e priorità", icon: "🔄", content: "Progettato per 4 giocatori. La priorità passa in senso orario. Le abilità innescate vanno in pila dopo che ogni giocatore può rispondere." },
    { title: "Carte bandite", icon: "🚫", content: "Commander ha la sua lista bandite. Bandite notevoli: Cripta del Mana, Lotus Gemmato, Stasi, Risorse Limitate, Bioritmo. Controlla sempre la lista ufficiale su mtgcommander.net." },
  ],
};
