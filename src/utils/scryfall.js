const cache = new Map();
const API_DELAY_MS = 110;

let queue = Promise.resolve();

function enqueue(task) {
  const run = queue.then(task);
  queue = run.catch(() => {});
  return run;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getImageUris(card) {
  if (card.image_uris) return card.image_uris;
  if (card.card_faces?.[0]?.image_uris) return card.card_faces[0].image_uris;
  return null;
}

async function scryfallFetch(url) {
  return enqueue(async () => {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "mtg-reference/1.0",
      },
    });
    await sleep(API_DELAY_MS);
    if (!res.ok) return null;
    return res.json();
  });
}

async function fetchCardJson(name) {
  const encoded = encodeURIComponent(name);
  let card = await scryfallFetch(`https://api.scryfall.com/cards/named?exact=${encoded}`);
  if (!card) {
    card = await scryfallFetch(`https://api.scryfall.com/cards/named?fuzzy=${encoded}`);
  }
  return card;
}

function cardToImages(card, displayName, isItalian = false) {
  const uris = getImageUris(card);
  if (!uris?.normal) return null;

  return {
    normal: uris.normal,
    large: uris.large || uris.normal,
    displayName: displayName || card.printed_name || card.name,
    isItalian,
  };
}

async function fetchItalianCard(name) {
  const q = encodeURIComponent(`!"${name}" lang:it`);
  const data = await scryfallFetch(
    `https://api.scryfall.com/cards/search?q=${q}&unique=cards&order=released&dir=desc`
  );
  if (!data?.data?.length) return null;

  const card = data.data.find((c) => getImageUris(c)) ?? data.data[0];
  return cardToImages(card, card.printed_name || card.name, true);
}

async function fetchEnglishCard(name) {
  const card = await fetchCardJson(name);
  if (!card) return null;
  return cardToImages(card, name, false);
}

export async function fetchCardImages(name, lang) {
  const key = `${lang}:${name}`;
  if (cache.has(key)) return cache.get(key);

  const promise = (async () => {
    if (lang === "it") {
      const italian = await fetchItalianCard(name);
      if (italian) return italian;
    }

    const english = await fetchEnglishCard(name);
    if (english) return { ...english, fallback: lang === "it" };

    throw new Error(`Card not found: ${name}`);
  })();

  cache.set(key, promise);
  return promise;
}

export function clearScryfallCache() {
  cache.clear();
}
