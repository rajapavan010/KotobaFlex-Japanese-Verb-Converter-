export const masuToProhibitiveForm = (verb) => {
  // Irregular verbs (Group 3) - only "true" suru/kuru verbs
  const irregularProhibitiveForms = {
    "suru": "suru na",
    "kuru": "kuru na",
    "shimasu": "suru na",
    "kimasu": "kuru na",
    "benkyou suru": "benkyou suru na",
    "benkyou shimasu": "benkyou suru na",
    "mottekuru": "mottekuru na",
  };

  if (irregularProhibitiveForms[verb]) return irregularProhibitiveForms[verb];

  // Handle "true" suru verbs (e.g., "benkyou shimasu" → "benkyou suru na")
  if (verb.includes(" shimasu")) {
    return verb.replace(" shimasu", " suru na");
  }
  if (verb.includes(" kimasu")) {
    return verb.replace(" kimasu", " kuru na");
  }

  // Special case: "okimasu" can belong to both Group 1 (置く) and Group 2 (起きる)
  if (verb === "okimasu" || verb === "oku") {
    return ["oku na", "okiru na"]; // Both possibilities
  }

  // Explicit fix for verbs ending in "ちます (chimasu)" and "つ (tsuu)"
  if (verb.endsWith("chimasu")) {
    let stem = verb.slice(0, -7); // Remove "chimasu"
    return stem + "tsu na"; // Convert to godan prohibitive-form (待ちます → 待つな)
  }
  if (verb.endsWith("tsu")) {
    let stem = verb.slice(0, -7); // Remove "tsu"
    return stem + "tsu na"; // Convert to godan prohibitive-form (持ちます → 持つな)
  }

  // Handle godan verbs ending with "shimasu" (e.g., "nakushimasu" → "nakusu na")
  if (verb.endsWith("shimasu") && verb !== "shimasu") {
    let stem = verb.slice(0, -7); // Remove "shimasu"
    return stem + "su na"; // Convert to godan prohibitive-form
  }
  if (verb.endsWith("kimasu") && verb !== "kimasu") {
    let stem = verb.slice(0, -6); // Remove "kimasu"
    return stem + "ku na"; // Convert to godan prohibitive-form
  }

  // Handle verbs ending with "imasu"
  if (verb.endsWith("imasu")) {
    const stem = verb.slice(0, -5); // Remove "imasu"
    const lastChar = stem.slice(-1);

    // Check if the last character is in the specified set
    if ("kgnmhbdrp".includes(lastChar)) {
      const godanProhibitiveForms = {
        "k": "ku", "g": "gu", "n": "nu", "m": "mu",
        "h": "fu", "b": "bu", "d": "du", "r": "ru", "p": "pu"
      };
      return stem.slice(0, -1) + godanProhibitiveForms[lastChar] + " na";
    }
    
    // Otherwise, default "imasu" to "u na"
    return stem + "u na";
  }

  // If the verb is already in dictionary form, process it
  if (!verb.endsWith("masu")) {
    return convertDictToProhibitive(verb);
  }

  // If the verb ends with "masu", process it
  let stem = verb.slice(0, -4); // Remove "masu"

  // Ichidan verbs (Group 2)
  if (verb.match(/(.*[aiueo])masu$/)) {
    return stem + "ru na"; // Directly replace "masu" with "ru na"
  }

  // Godan verbs (Group 1)
  return convertDictToProhibitive(convertMasuToDict(verb));
};

// Converts Dictionary Form → Prohibitive Form
const convertDictToProhibitive = (verb) => {
  if (verb.endsWith("iru") || verb.endsWith("eru")) {
    return verb.slice(0, -2) + "ru na"; // Ichidan → Remove "ru" and add "ru na"
  }

  const godanProhibitiveForms = {
    "ku": "ku", "gu": "gu", "su": "su", "tsu": "tsu",
    "nu": "nu", "fu": "fu", "bu": "bu", "mu": "mu", "ru": "ru", "u": "u"
  };

  for (let ending in godanProhibitiveForms) {
    if (verb.endsWith(ending)) {
      return verb.slice(0, -ending.length) + godanProhibitiveForms[ending] + " na";
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