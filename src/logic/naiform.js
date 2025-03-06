export const masuToNaiForm = (verb) => {
  // Irregular verbs (Group 3) - only "true" suru/kuru verbs
  const irregularNaiForms = {
    "suru": "shinai",
    "kuru": "konai",
    "shimasu": "shinai",
    "kimasu": "konai",
    "aru": "nai",
    "imasu": "inai",
    "benkyou suru": "benkyou shinai",
    "benkyou shimasu": "benkyou shinai",
    "mottekuru": "mottekonai",
  };

  if (irregularNaiForms[verb]) return irregularNaiForms[verb];

  // Handle "true" suru verbs (e.g., "benkyou shimasu" → "benkyou shinai")
  if (verb.includes(" shimasu")) {
    return verb.replace(" shimasu", " shinai");
  }
  if (verb.includes(" kimasu")) {
    return verb.replace(" kimasu", " konai");
  }

  // Special case: "okimasu" can belong to both Group 1 (置く) and Group 2 (起きる)
  if (verb === "okimasu" || verb === "oku") {
    return ["okanai", "okinai"]; // Both possibilities
  }

  // Handle godan verbs ending with "shimasu" (e.g., "nakushimasu" → "nakusanai")
  if (verb.endsWith("shimasu") && verb !== "shimasu") {
    let stem = verb.slice(0, -7); // Remove "shimasu"
    return stem + "sanai"; // Convert to godan nai-form
  }
  if (verb.endsWith("kimasu") && verb !== "kimasu") {
    let stem = verb.slice(0, -6); // Remove "shimasu"
    return stem + "kanai"; // Convert to godan nai-form
  }
  if (verb.endsWith("chimasu") && verb !== "chimasu") {
    let stem = verb.slice(0, -7); // Remove "shimasu"
    return stem + "tanai"; // Convert to godan nai-form
  }
  

  // Handle verbs ending with "imasu"
  if (verb.endsWith("imasu")) {
    const stem = verb.slice(0, -5); // Remove "imasu"
    const lastChar = stem.slice(-1);

    // Check if the last character is in the specified set
    if ("kgnmhbdrp".includes(lastChar)) {
      const godanNaiForms = {
        "k": "ka", "g": "ga", "n": "na", "m": "ma",
        "h": "ha", "b": "ba", "d": "da", "r": "ra", "p": "pa"
      };
      return stem.slice(0, -1) + godanNaiForms[lastChar] + "nai";
    }
    
    // Otherwise, default "imasu" to "iwanai"
    return stem + "wanai";
  }

  // If the verb is already in dictionary form, process it
  if (!verb.endsWith("masu")) {
    return convertDictToNai(verb);
  }

  // If the verb ends with "masu", process it
  let stem = verb.slice(0, -4); // Remove "masu"

  // Special case: "irimasu" (要る, to need) is a Godan verb → should be "iranai"
  if (verb === "irimasu") {
    return "iranai";
  }

  // *Ichidan verbs (Group 2)*
  if (verb.match(/(.*[aiueo])masu$/)) {
    return stem + "nai"; // Directly replace "masu" with "nai"
  }

  // *Godan verbs (Group 1)*
  return convertDictToNai(convertMasuToDict(verb));
};

// Converts Dictionary Form → Nai-form
const convertDictToNai = (verb) => {
  if (verb.endsWith("iru") || verb.endsWith("eru")) {
    return verb.slice(0, -2) + "nai"; // Ichidan → Remove "ru" and add "nai"
  }

  const godanNaiForms = {
    "ku": "ka", "gu": "ga", "su": "sa", "tsu": "ta",
    "nu": "na", "fu": "ha", "bu": "ba", "mu": "ma", "ru": "ra", "u": "wa"
  };

  for (let ending in godanNaiForms) {
    if (verb.endsWith(ending)) {
      return verb.slice(0, -ending.length) + godanNaiForms[ending] + "nai";
    }
  }

  return "Could not determine verb type";
};

// Converts Masu-form → Dictionary Form
const convertMasuToDict = (verb) => {
  let stem = verb.slice(0, -4); // Remove "masu"

  const godanDictionaryForms = {
    "i": "u", "ki": "ku", "gi": "gu", "shi": "su", "chi": "tsu",
    "ni": "nu", "hi": "fu", "bi": "bu", "mi": "mu", "ri": "ru"
  };

  const lastChar = stem.slice(-1);
  if (godanDictionaryForms[lastChar]) {
    return stem.slice(0, -1) + godanDictionaryForms[lastChar];
  }

  return stem + "ru"; // Default assumption for Ichidan verbs
};
