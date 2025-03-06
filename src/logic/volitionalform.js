export const toVolitionalForm = (verb) => {
  // Handle "true" suru verbs (e.g., "benkyou shimasu" → "benkyou shiyou")
  if (verb.includes(" shimasu")) {
      return verb.replace(" shimasu", " shiyou");
  }
  if (verb.includes(" kimasu")) {
      return verb.replace(" kimasu", " koyou");
  }

  // Special case: "okimasu" can be both Godan (置く) and Ichidan (起きる)
  if (verb === "okimasu" || verb === "oku") {
      return ["okou", "okiyou"]; // Both possibilities
  }

  // Handle godan verbs ending with "shimasu" (e.g., "nakushimasu" → "nakusou")
  if (verb.endsWith("shimasu") && verb !== "shimasu") {
      let stem = verb.slice(0, -7); // Remove "shimasu"
      return stem + "sou"; // Convert to godan volitional form
  }
  if (verb.endsWith("kimasu") && verb !== "kimasu") {
      let stem = verb.slice(0, -6); // Remove "kimasu"
      return stem + "kou"; // Convert to godan volitional form
  }
  if (verb.endsWith("chimasu") && verb !== "chimasu") {
      let stem = verb.slice(0, -7); // Remove "kimasu"
      return stem + "tou"; // Convert to godan volitional form
  }
  if (verb.endsWith("tsu")) {
    let stem = verb.slice(0, -3); // Remove "tsu"
    return stem + "tou"; // Convert to godan potential-form (持ちます → 持てる)
}

  // If the verb is in masu-form (ends with "masu"), convert to dictionary form first
  if (verb.endsWith("masu")) {
      let dictForm = convertMasuToDict(verb);
      return toVolitionalForm(dictForm);
  }

  // Ichidan verbs (る-verbs): remove "ru" and add "you"
  if (verb.endsWith("ru") && isIchidanVerb(verb)) {
      return verb.slice(0, -2) + "you";
  }

  // Godan verbs: Change last "u" sound to "ou"
  const godanChanges = {
      "u": "ou", "ku": "kou", "gu": "gou", "su": "sou",
      "tsu": "tou", "nu": "nou", "bu": "bou", "mu": "mou", "ru": "rou"
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
      "ki": "ku", "gi": "gu", "shi": "su", "chi": "tsu",
      "ni": "nu", "bi": "bu", "mi": "mu", "ri": "ru"
  };

  // Handle known Godan exceptions
  const godanExceptions = ["kaeru", "shiru", "hashiru", "keru", "shaberu", "suberu"];
  
  if (godanExceptions.includes(stem + "ru")) {
      return stem + "ru";
  }

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