export const STACK_EXAMPLES = {
  en: [
    { title: "Lightning Bolt + Counterspell", steps: [
      { actor: "You", action: "Cast Lightning Bolt targeting opponent's creature", stack: ["Lightning Bolt"] },
      { actor: "Opponent", action: "Responds with Counterspell targeting your Lightning Bolt", stack: ["Counterspell", "Lightning Bolt"] },
      { actor: "Both pass", action: "Stack resolves top-down", stack: [] },
      { actor: "Result", action: "Counterspell resolves → Lightning Bolt is countered. Creature lives.", stack: [] },
    ], cards: ["Lightning Bolt", "Counterspell"] },
    { title: "Two Triggers Stack", steps: [
      { actor: "Event", action: "A creature dies — two 'when a creature dies' triggers fire", stack: ["Trigger A", "Trigger B"] },
      { actor: "Note", action: "Active player's triggers go on the stack last → resolve first", stack: [] },
      { actor: "Result", action: "Trigger B resolves first, then Trigger A.", stack: [] },
    ], cards: [] },
  ],
  it: [
    { title: "Fulmine + Contromagia", steps: [
      { actor: "Tu", action: "Lanci Fulmine bersagliando la creatura dell'avversario", stack: ["Fulmine"] },
      { actor: "Avversario", action: "Risponde con Contromagia bersagliando il tuo Fulmine", stack: ["Contromagia", "Fulmine"] },
      { actor: "Entrambi passano", action: "La pila si risolve dall'alto verso il basso", stack: [] },
      { actor: "Risultato", action: "Contromagia si risolve → Fulmine neutralizzato. La creatura sopravvive.", stack: [] },
    ], cards: ["Lightning Bolt", "Counterspell"] },
    { title: "Due abilità innescate in pila", steps: [
      { actor: "Evento", action: "Una creatura muore — si innescano due abilità «quando una creatura muore»", stack: ["Innesco A", "Innesco B"] },
      { actor: "Nota", action: "Le abilità del giocatore attivo vanno in pila per ultime → si risolvono per prime", stack: [] },
      { actor: "Risultato", action: "L'Innesco B si risolve per primo, poi l'Innesco A.", stack: [] },
    ], cards: [] },
  ],
};
