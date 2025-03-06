export const toCausativePassiveForm = (verb) => {
  // Handle "true" suru verbs (e.g., "benkyou shimasu" → "benkyou saserareru")
  if (verb.includes(" shimasu")) {
      return verb.replace(" shimasu", " saserareru");
  }
  if (verb.includes(" kimasu")) {
      return verb.replace(" kimasu", " kosaserareru");
  }

  // Special case: "okimasu" can be both Godan (置く) and Ichidan (起きる)
  if (verb === "okimasu" || verb === "oku") {
      return ["okasaserareru", "okisaserareru"]; // Both possibilities
  }

  // Handle godan verbs ending with "shimasu" (e.g., "nakushimasu" → "nakusaserareru")
  if (verb.endsWith("shimasu") && verb !== "shimasu") {
      let stem = verb.slice(0, -7); // Remove "shimasu"
      return stem + "saserareru"; // Convert to godan causative-passive form
  }
  if (verb.endsWith("kimasu") && verb !== "kimasu") {
      let stem = verb.slice(0, -6); // Remove "kimasu"
      return stem + "kasaserareru"; // Convert to godan causative-passive form
  }
  if (verb.endsWith("chimasu") && verb !== "chimasu") {
      let stem = verb.slice(0, -7); // Remove "chimasu"
      return stem + "tasaserareru"; // Convert to godan causative-passive form
  }
  if (verb.endsWith("tsu")) {
      let stem = verb.slice(0, -3); // Remove "tsu"
      return stem + "tasaserareru"; // Convert to causative-passive
  }

  // If the verb is in masu-form (ends with "masu"), convert to dictionary form first
  if (verb.endsWith("masu")) {
      let dictForm = convertMasuToDict(verb);
      return toCausativePassiveForm(dictForm);
  }

  // Ichidan verbs (る-verbs): remove "ru" and add "saserareru"
  if (verb.endsWith("ru") && isIchidanVerb(verb)) {
      return verb.slice(0, -2) + "saserareru";
  }

  // *Corrected Godan Verb Handling*
  if (verb.endsWith("su")) {
      return verb.slice(0, -2) + "saserareru"; // hanasu → hanasaserareru
  }
  if (verb.endsWith("tsu")) {
      return verb.slice(0, -3) + "taserareru"; // ✅ matsu → mataserareru
  }

  // *Fixed Godan Changes (Ensuring Proper Causative-Passive Forms)*
  const godanChanges = {
      "ku": "kasaserareru", "gu": "gasaserareru",
      "nu": "nasaserareru", "bu": "basaserareru", "mu": "masaserareru",
      "ru": "rasaserareru", "u": "asaserareru"
  };

  for (const [ending, replacement] of Object.entries(godanChanges)) {
      if (verb.endsWith(ending)) {
          return verb.slice(0, -ending.length) + replacement;
      }
  }

  return `Could not determine verb type for ${verb}`;
};

// Converts Masu-form → Dictionary-form
const convertMasuToDict = (verb) => {
  if (!verb.endsWith("masu")) return verb;

  let stem = verb.slice(0, -4); // Remove "masu"

  const godanDictionaryForms = {
      "i": "u", "ki": "ku", "gi": "gu", "shi": "su", "chi": "tsu",
      "ni": "nu", "bi": "bu", "mi": "mu", "ri": "ru"
  };

  // Handle known Godan exceptions
  const godanExceptions = ["kaeru", "shiru", "hashiru", "keru", "shaberu", "suberu"];

  if (godanExceptions.includes(stem + "ru")) {
      return stem + "ru";
  }

  // Ensure correct godan transformation
  const lastChar = stem.slice(-1);
  if (godanDictionaryForms[lastChar]) {
      return stem.slice(0, -1) + godanDictionaryForms[lastChar];
  }

  return stem + "ru"; // Default assumption for Ichidan verbs
};

// Checks if a verb is Ichidan
const isIchidanVerb = (verb) => {
  const godanExceptions = ["kaeru", "shiru", "hashiru", "keru", "shaberu", "suberu"];
  return verb.endsWith("ru") && !godanExceptions.includes(verb);
};
