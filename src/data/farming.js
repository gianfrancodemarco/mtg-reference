export const FARMING = {
  en: {
    intro:
      "MTG Arena is free to play, but gold and gems gate how often you draft and grow your collection. Farming means repeating efficient routines to earn those currencies without spending real money.",
    sections: {
      general: "General Knowledge",
      loop: "Farming Loop",
    },
    general: {
      farmingConcept: {
        title: "What Is Farming?",
        icon: "🌾",
        desc: "Farming is deliberately repeating an action or routine to obtain resources — gold, gems, packs, or XP. On Arena, the goal is consistency and return on investment: how much gold do you earn per hour doing this?",
        note: "Farming only works when there are repeatable sources and useful sinks. On Arena, the main sink is draft entry, which converts gold into gems and cards.",
      },
      currencies: {
        title: "Gold vs Gems",
        icon: "💰",
        desc: "Gold is earned freely from quests and wins. Gems are the premium currency — hard to earn, easy to spend.",
        items: [
          {
            name: "Gold",
            icon: "🪙",
            color: "#d4a853",
            desc: "Earned from daily quests, win rewards, events, and the Mastery Pass. Used to enter most events and Quick Drafts.",
          },
          {
            name: "Gems",
            icon: "💎",
            color: "#818cf8",
            desc: "Bought in the store or earned from draft prizes. Treat gems as precious — spend gold first whenever possible.",
          },
        ],
        ratio:
          "Rough exchange rate: 750 gems ≈ $5 in the store, and each gem is worth about 5–7 gold when entering events. Converting gold → gems is only possible through Quick Draft.",
      },
      goldSources: {
        title: "Where Gold Comes From",
        icon: "📊",
        sources: [
          {
            name: "Daily Win Rewards",
            icon: "🏆",
            payout: "Up to 750 gold/day",
            highlight: "First 4 wins = 550 gold",
            desc: "Win #1 pays 250 gold; wins #2–#4 pay 100 each. Later wins mix smaller gold amounts with individual card rewards (ICRs).",
            tip: "At ~50% win rate, four wins usually takes around 8 games. Aim for four wins every day — this is the highest-ROI daily action.",
          },
          {
            name: "Daily Quests",
            icon: "📋",
            payout: "500–750 gold + 500 XP",
            highlight: "One new quest per day",
            desc: "Quests ask you to attack, cast spells, or play certain colors. You hold up to 3 quests at once; only one refreshes per day.",
            tip: "Re-roll a 500-gold quest once per day hoping for 750. Play at least every 3 days so quests don't expire unused.",
          },
          {
            name: "Weekly Win Track",
            icon: "📅",
            payout: "250 XP per win (15 wins max)",
            highlight: "3,750 XP/week cap",
            desc: "Weekly wins don't pay gold — they advance your Set Mastery level, which unlocks packs and Mastery Pass rewards.",
            tip: "Your daily four-win routine naturally feeds this track. No extra effort needed.",
          },
          {
            name: "Set Mastery & Mastery Pass",
            icon: "🎖️",
            payout: "Packs, gold, gems, draft tokens",
            highlight: "Pass costs 3,400 gems",
            desc: "Each set has a free mastery track (mostly packs) and a paid Mastery Pass with extra rewards at specific levels.",
            tip: "You can buy the Pass at any point and claim rewards retroactively for levels already earned.",
          },
          {
            name: "Ranked Season Rewards",
            icon: "🥇",
            payout: "Gold + packs (monthly)",
            highlight: "Platinum is a realistic target",
            desc: "At the end of each ranked season, Constructed and Limited queues pay out based on your final tier.",
            tip: "A steady four-wins-a-day routine often lands you around Platinum without extra grinding.",
          },
        ],
      },
      draftEconomy: {
        title: "Draft: Gold → Gems Converter",
        icon: "🃏",
        desc: "Draft is the best way to build a collection and the only reliable way to convert gold into gems. You keep every card you pick.",
        entries: [
          {
            name: "Quick Draft",
            gold: "5,000",
            gems: "750",
            format: "Best-of-one · vs bots",
            baseline: "3–3 finish ≈ 300 gems + 1 pack",
            note: "Your workhorse. Even 0–3 still returns 50 gems + 1 pack — better value than buying packs outright.",
          },
          {
            name: "Premier Draft",
            gold: "10,000",
            gems: "1,500",
            format: "Best-of-three · vs humans",
            baseline: "2–3 wins breaks even on gems",
            note: "Higher risk, higher ceiling. Best for experienced drafters with gem reserves.",
          },
        ],
        draftingTips: [
          "Rare-draft playable cards for your collection until you own four copies.",
          "Drafting beats cracking packs: even a bad run returns cards, gems, and a pack.",
          "Don't spend gems on pack purchases if you plan to draft regularly.",
        ],
      },
      keyRules: {
        title: "Golden Rules",
        icon: "⭐",
        rules: [
          { text: "Complete your daily quests — they're the best value and don't require a high win rate.", icon: "📋" },
          { text: "Spend gold before gems. Gold is easy to refill; gems are not.", icon: "🪙" },
          { text: "Never open packs with gold if you want to draft — save gold for Quick Draft entry.", icon: "🚫" },
          { text: "Use a fast Best-of-One deck to reach four daily wins quickly.", icon: "⚡" },
          { text: "Avoid special events for farming — they're fun but poor gold value.", icon: "🎪" },
          { text: "Wildcards are permanent once spent. Build one solid deck before splurging.", icon: "🃏" },
        ],
      },
    },
    loop: {
      goal: "Draft regularly without spending money — roughly one Quick Draft every 4–5 days.",
      steps: [
        {
          n: 1,
          title: "Pick a fast Constructed deck",
          desc: "Use a quick Best-of-One list to farm daily wins. Mono-Red Aggro is the classic — games end fast whether you win or lose.",
          detail: "Start with beginner decks and upgrade with wildcards. Between starter rewards and early wildcards, a functional Tier 2/3 list is achievable quickly.",
        },
        {
          n: 2,
          title: "Get four wins every day",
          desc: "Four wins = 550 gold from daily rewards, plus quest progress and weekly XP toward Mastery.",
          detail: "Re-roll a 500-gold quest when you can. Complete or progress at least one quest per session.",
        },
        {
          n: 3,
          title: "Save 5,000 gold → enter Quick Draft",
          desc: "After ~5 days of quest + four-win routine, you'll have enough gold for a Quick Draft entry.",
          detail: "Quick Draft is the cleanest gold-to-gems conversion. Plan around a baseline 3–3 finish.",
        },
        {
          n: 4,
          title: "Bank the gems — don't spend them",
          desc: "A typical 3–3 run pays ~300 gems + 1 pack, plus every card you drafted.",
          detail: "Repeat steps 1–4 until you reach 3,400 gems (~12 Quick Drafts). If you spike 6–3 or 7–2, your timeline accelerates. A bad 0–3 still returns 50 gems + 1 pack.",
        },
        {
          n: 5,
          title: "Buy the Mastery Pass",
          desc: "Once you've banked 3,400 gems (~12 Quick Drafts over ~60 days), buy the Mastery Pass for the current set.",
          detail: "Buy it at any point during an active season — retroactive rewards often recoup a big chunk of the cost immediately via gems, gold, and a draft token. Then the whole loop runs smoother.",
        },
      ],
      repeatLabel: "Repeat from step 1 — extra gold, gems, and draft tokens each season make every cycle faster.",
      dailyBudget: {
        title: "Daily Gold Budget (approx.)",
        rows: [
          { label: "4 daily wins", value: "550 gold" },
          { label: "Daily quest (avg.)", value: "500–750 gold" },
          { label: "Total per day", value: "~1,050–1,300 gold" },
          { label: "Days to 5,000 gold", value: "~4–5 days" },
        ],
      },
      compounding: {
        title: "Why the Loop Compounds",
        items: [
          "Collection improves — more cards, more wildcards, more deck options.",
          "Skill improves — better draft results mean more gems per run.",
          "Mastery Pass unlocks — extra gold, gems, and draft tokens each season.",
        ],
      },
    },
  },
  it: {
    intro:
      "MTG Arena è free to play, ma oro e gemme limitano quanto spesso puoi draftare e far crescere la collezione. Farmare significa ripetere routine efficienti per guadagnare valuta senza spendere soldi veri.",
    sections: {
      general: "Conoscenze generali",
      loop: "Loop di farming",
    },
    general: {
      farmingConcept: {
        title: "Cos'è il farming?",
        icon: "🌾",
        desc: "Farmare significa ripetere deliberatamente un'azione o una routine per ottenere risorse — oro, gemme, buste o XP. Su Arena l'obiettivo è costanza e ritorno sull'investimento: quanto oro guadagni all'ora facendo questo?",
        note: "Il farming funziona solo se ci sono fonti ripetibili e sink utili. Su Arena, il sink principale è l'ingresso al draft, che converte l'oro in gemme e carte.",
      },
      currencies: {
        title: "Oro vs gemme",
        icon: "💰",
        desc: "L'oro si guadagna gratis con missioni e vittorie. Le gemme sono la valuta premium — difficili da guadagnare, facili da spendere.",
        items: [
          {
            name: "Oro",
            icon: "🪙",
            color: "#d4a853",
            desc: "Si ottiene da missioni giornaliere, premi vittoria, eventi e Mastery Pass. Serve per entrare nella maggior parte degli eventi e nei Quick Draft.",
          },
          {
            name: "Gemme",
            icon: "💎",
            color: "#818cf8",
            desc: "Si comprano nello store o si guadagnano nei draft. Trattale come una risorsa preziosa — spendi prima l'oro quando puoi.",
          },
        ],
        ratio:
          "Tasso di cambio approssimativo: 750 gemme ≈ $5 nello store, e ogni gemma vale circa 5–7 ori negli eventi. Convertire oro → gemme è possibile solo tramite Quick Draft.",
      },
      goldSources: {
        title: "Da dove arriva l'oro",
        icon: "📊",
        sources: [
          {
            name: "Premi vittoria giornalieri",
            icon: "🏆",
            payout: "Fino a 750 ori/giorno",
            highlight: "Prime 4 vittorie = 550 ori",
            desc: "La vittoria #1 paga 250 ori; le vittorie #2–#4 pagano 100 ciascuna. Le vittorie successive mescolano ori minori con ricompense carte singole (ICR).",
            tip: "Con ~50% di win rate, quattro vittorie richiedono circa 8 partite. Punta a quattro vittorie ogni giorno — è l'azione giornaliera con il ROI più alto.",
          },
          {
            name: "Missioni giornaliere",
            icon: "📋",
            payout: "500–750 ori + 500 XP",
            highlight: "Una nuova missione al giorno",
            desc: "Le missioni chiedono di attaccare, lanciare magie o giocare certi colori. Puoi tenere fino a 3 missioni; ne si rigenera solo una al giorno.",
            tip: "Rilancia una missione da 500 ori una volta al giorno sperando in 750. Gioca almeno ogni 3 giorni così le missioni non scadono inutilizzate.",
          },
          {
            name: "Tracciamento vittorie settimanali",
            icon: "📅",
            payout: "250 XP per vittoria (max 15)",
            highlight: "Tetto 3.750 XP/settimana",
            desc: "Le vittorie settimanali non pagano oro — fanno avanzare il Set Mastery, che sblocca buste e ricompense del Mastery Pass.",
            tip: "La routine quotidiana di quattro vittorie alimenta naturalmente questo tracciamento. Nessuno sforzo extra.",
          },
          {
            name: "Set Mastery e Mastery Pass",
            icon: "🎖️",
            payout: "Buste, oro, gemme, token draft",
            highlight: "Il Pass costa 3.400 gemme",
            desc: "Ogni set ha un tracciamento gratuito (soprattutto buste) e un Mastery Pass a pagamento con ricompense extra a livelli specifici.",
            tip: "Puoi comprare il Pass in qualsiasi momento e riscattare retroattivamente le ricompense dei livelli già raggiunti.",
          },
          {
            name: "Ricompense stagione ranked",
            icon: "🥇",
            payout: "Oro + buste (mensili)",
            highlight: "Platino è un obiettivo realistico",
            desc: "A fine stagione ranked, le code Constructed e Limited pagano in base al tier finale.",
            tip: "Una routine costante di quattro vittorie al giorno spesso ti porta intorno al Platino senza grind extra.",
          },
        ],
      },
      draftEconomy: {
        title: "Draft: convertitore oro → gemme",
        icon: "🃏",
        desc: "Il draft è il modo migliore per costruire la collezione e l'unico modo affidabile per convertire oro in gemme. Tieni tutte le carte che scegli.",
        entries: [
          {
            name: "Quick Draft",
            gold: "5.000",
            gems: "750",
            format: "Best-of-one · vs bot",
            baseline: "Risultato 3–3 ≈ 300 gemme + 1 busta",
            note: "Il tuo cavallo di battaglia. Anche 0–3 restituisce 50 gemme + 1 busta — valore migliore dell'aprire buste direttamente.",
          },
          {
            name: "Premier Draft",
            gold: "10.000",
            gems: "1.500",
            format: "Best-of-three · vs umani",
            baseline: "2–3 vittorie pareggiano le gemme",
            note: "Rischio più alto, ceiling più alto. Meglio per drafter esperti con riserve di gemme.",
          },
        ],
        draftingTips: [
          "Rare-draffa carte giocabili in Constructed finché non ne possiedi quattro copie.",
          "Draftare batte aprire buste: anche una run negativa restituisce carte, gemme e una busta.",
          "Non spendere gemme in buste se prevedi di draftare regolarmente.",
        ],
      },
      keyRules: {
        title: "Regole d'oro",
        icon: "⭐",
        rules: [
          { text: "Completa le missioni giornaliere — sono il miglior valore e non richiedono un alto win rate.", icon: "📋" },
          { text: "Spendi oro prima delle gemme. L'oro si ricarica facilmente; le gemme no.", icon: "🪙" },
          { text: "Non aprire buste con l'oro se vuoi draftare — risparmia per il Quick Draft.", icon: "🚫" },
          { text: "Usa un mazzo Best-of-One veloce per raggiungere quattro vittorie al giorno.", icon: "⚡" },
          { text: "Evita gli eventi speciali per il farming — sono divertenti ma poco redditizi.", icon: "🎪" },
          { text: "I wildcard sono permanenti una volta spesi. Costruisci un mazzo solido prima di spendere tutto.", icon: "🃏" },
        ],
      },
    },
    loop: {
      goal: "Draftare regolarmente senza spendere soldi — circa un Quick Draft ogni 4–5 giorni.",
      steps: [
        {
          n: 1,
          title: "Scegli un mazzo Constructed veloce",
          desc: "Usa una lista Best-of-One rapida per farmare le vittorie giornaliere. Mono-Rosso Aggro è il classico — le partite finiscono in fretta.",
          detail: "Parti dai mazzi per principianti e potenziali con i wildcard. Tra ricompense iniziali e wildcard precoci, una lista Tier 2/3 funzionale è raggiungibile in breve.",
        },
        {
          n: 2,
          title: "Fai quattro vittorie ogni giorno",
          desc: "Quattro vittorie = 550 ori dai premi giornalieri, più progresso missioni e XP settimanale verso il Mastery.",
          detail: "Rilancia una missione da 500 ori quando puoi. Completa o avanza almeno una missione a sessione.",
        },
        {
          n: 3,
          title: "Risparmia 5.000 ori → entra in Quick Draft",
          desc: "Dopo ~5 giorni di routine missioni + quattro vittorie, avrai abbastanza oro per un Quick Draft.",
          detail: "Il Quick Draft è la conversione oro→gemme più pulita. Pianifica intorno a un risultato base 3–3.",
        },
        {
          n: 4,
          title: "Accumula le gemme — non spenderle",
          desc: "Una run tipica 3–3 paga ~300 gemme + 1 busta, più tutte le carte draftate.",
          detail: "Ripeti i passi 1–4 finché non raggiungi 3.400 gemme (~12 Quick Draft). Se spingi a 6–3 o 7–2, la timeline accelera. Un brutto 0–3 restituisce comunque 50 gemme + 1 busta.",
        },
        {
          n: 5,
          title: "Compra il Mastery Pass",
          desc: "Quando hai accumulato 3.400 gemme (~12 Quick Draft in ~60 giorni), compra il Mastery Pass del set corrente.",
          detail: "Compralo in qualsiasi momento durante una stagione attiva — le ricompense retroattive spesso recuperano subito gran parte del costo in gemme, oro e un token draft. Poi l'intero loop scorre più liscio.",
        },
      ],
      repeatLabel: "Ripeti dal passo 1 — oro, gemme e token draft extra ogni stagione rendono ogni ciclo più veloce.",
      dailyBudget: {
        title: "Budget oro giornaliero (circa)",
        rows: [
          { label: "4 vittorie giornaliere", value: "550 ori" },
          { label: "Missione giornaliera (media)", value: "500–750 ori" },
          { label: "Totale al giorno", value: "~1.050–1.300 ori" },
          { label: "Giorni per 5.000 ori", value: "~4–5 giorni" },
        ],
      },
      compounding: {
        title: "Perché il loop si autoalimenta",
        items: [
          "La collezione migliora — più carte, più wildcard, più opzioni di mazzo.",
          "L'abilità migliora — risultati draft migliori significano più gemme per run.",
          "Il Mastery Pass si sblocca — oro, gemme e token draft extra ogni stagione.",
        ],
      },
    },
  },
};
