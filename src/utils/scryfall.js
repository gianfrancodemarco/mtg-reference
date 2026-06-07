const cache = new Map();

function englishUrls(name) {
  const encoded = encodeURIComponent(name);
  return {
    normal: `https://api.scryfall.com/cards/named?exact=${encoded}&format=image&version=normal`,
    large: `https://api.scryfall.com/cards/named?exact=${encoded}&format=image&version=large`,
    displayName: name,
    isItalian: false,
  };
}

function getImageUris(card) {
  if (card.image_uris) return card.image_uris;
  if (card.card_faces?.[0]?.image_uris) return card.card_faces[0].image_uris;
  return null;
}

async function fetchItalianCard(name) {
  const q = `!"${name}" lang:it`;
  const res = await fetch(
    `https://api.scryfall.com/cards/search?q=${encodeURIComponent(q)}&unique=cards&order=released&dir=desc`
  );
  if (!res.ok) return null;

  const data = await res.json();
  if (!data.data?.length) return null;

  const card = data.data.find((c) => getImageUris(c)) ?? data.data[0];
  const uris = getImageUris(card);
  if (!uris?.normal) return null;

  return {
    normal: uris.normal,
    large: uris.large || uris.normal,
    displayName: card.printed_name || card.name,
    isItalian: true,
  };
}

export async function fetchCardImages(name, lang) {
  const key = `${lang}:${name}`;
  if (cache.has(key)) return cache.get(key);

  const promise =
    lang === "it"
      ? fetchItalianCard(name).then((it) => it ?? { ...englishUrls(name), fallback: true })
      : Promise.resolve(englishUrls(name));

  cache.set(key, promise);
  return promise;
}
