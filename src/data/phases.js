export const PHASES = {
  en: [
    { id: "begin", label: "Beginning", icon: "🌅", color: "#f59e0b", steps: [
      { name: "Untap", desc: "Untap all your permanents. No spells or abilities can be cast." },
      { name: "Upkeep", desc: "'At the beginning of your upkeep' effects trigger. Players may cast instants." },
      { name: "Draw", desc: "Draw a card. First player skips their first draw of the game." },
    ]},
    { id: "pre", label: "Main 1", icon: "📜", color: "#10b981", steps: [
      { name: "Main Phase 1", desc: "Cast creatures, artifacts, enchantments, planeswalkers, sorceries, instants. Play one land." },
    ]},
    { id: "combat", label: "Combat", icon: "🗡️", color: "#ef4444", steps: [
      { name: "Beginning of Combat", desc: "Last chance before attackers are declared." },
      { name: "Declare Attackers", desc: "Tap untapped creatures to attack." },
      { name: "Declare Blockers", desc: "Defending player assigns blockers." },
      { name: "Combat Damage", desc: "Simultaneous damage. First strike fires early." },
      { name: "End of Combat", desc: "'At end of combat' triggers happen." },
    ]},
    { id: "post", label: "Main 2", icon: "📖", color: "#8b5cf6", steps: [
      { name: "Main Phase 2", desc: "Cast more spells. Still can play a land if you haven't." },
    ]},
    { id: "end", label: "End", icon: "🌙", color: "#6366f1", steps: [
      { name: "End Step", desc: "'At the beginning of the end step' triggers." },
      { name: "Cleanup", desc: "Discard to 7. Remove damage. End-of-turn effects expire." },
    ]},
  ],
  it: [
    { id: "begin", label: "Iniziale", icon: "🌅", color: "#f59e0b", steps: [
      { name: "Districamento", desc: "Districa tutti i tuoi permanenti. Nessuna magia o abilità può essere lanciata." },
      { name: "Mantenimento", desc: "Si innescano gli effetti «all'inizio del tuo mantenimento». I giocatori possono lanciare istantanei." },
      { name: "Pesca", desc: "Pesca una carta. Il giocatore iniziale salta la prima pesca della partita." },
    ]},
    { id: "pre", label: "Princ. 1", icon: "📜", color: "#10b981", steps: [
      { name: "Fase principale 1", desc: "Lancia creature, artefatti, incantesimi, planeswalker, stregonerie e istantanei. Gioca una terra." },
    ]},
    { id: "combat", label: "Combatt.", icon: "🗡️", color: "#ef4444", steps: [
      { name: "Inizio del combattimento", desc: "Ultima possibilità prima di dichiarare gli attaccanti." },
      { name: "Dichiarazione attaccanti", desc: "TAPpa le creature non TAPpate per attaccare." },
      { name: "Dichiarazione bloccanti", desc: "Il giocatore in difesa assegna i bloccanti." },
      { name: "Danno da combattimento", desc: "Danno simultaneo. Attacco improvviso e doppio attacco si risolvono prima." },
      { name: "Fine del combattimento", desc: "Si innescano le abilità «alla fine del combattimento»." },
    ]},
    { id: "post", label: "Princ. 2", icon: "📖", color: "#8b5cf6", steps: [
      { name: "Fase principale 2", desc: "Lancia altre magie. Puoi ancora giocare una terra se non l'hai fatto." },
    ]},
    { id: "end", label: "Finale", icon: "🌙", color: "#6366f1", steps: [
      { name: "Fase finale", desc: "Si innescano le abilità «all'inizio della fase finale»." },
      { name: "Pulizia", desc: "Scarta fino a 7. Rimuovi i danni. Gli effetti di fine turno scadono." },
    ]},
  ],
};
