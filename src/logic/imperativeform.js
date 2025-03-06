export const masuToImperativeForm = (verb) => {
  // Irregular verbs (Group 3) - only "true" suru/kuru verbs
  const irregularImperativeForms = {
    "suru": "shiro",
    "kuru": "koi",
    "shimasu": "shiro",
    "kimasu": "koi",
    "benkyou suru": "benkyou shiro",
    "benkyou shimasu": "benkyou shiro",
    "mottekuru": "mottekoi",
  };

  if (irregularImperativeForms[verb]) return irregularImperativeForms[verb];

  // Handle "true" suru verbs (e.g., "benkyou shimasu" → "benkyou shiro")
  if (verb.includes(" shimasu")) {
    return verb.replace(" shimasu", " shiro");
  }
  if (verb.includes(" kimasu")) {
    return verb.replace(" kimasu", " koi");
  }

  // Special case: "okimasu" can belong to both Group 1 (置く) and Group 2 (起きる)
  if (verb === "okimasu" || verb === "oku") {
    return ["oke", "okiro"]; // Both possibilities
  }

  // Explicit fix for verbs ending in "ちます (chimasu)" 
  if (verb.endsWith("chimasu")) {
    let stem = verb.slice(0, -7); // Remove "chimasu"
    return stem + "te"; // Convert to godan imperative-form (待ちます → 待て)
  }
  if (verb.endsWith("tsu")) {
    let stem = verb.slice(0, -3); // Remove "tsu"
    return stem + "te"; // Convert to godan imperative-form (持ちます → 持て)
  }

  // Handle godan verbs ending with "shimasu" (e.g., "nakushimasu" → "nakuse")
  if (verb.endsWith("shimasu") && verb !== "shimasu") {
    let stem = verb.slice(0, -7); // Remove "shimasu"
    return stem + "se"; // Convert to godan imperative-form
  }
  if (verb.endsWith("kimasu") && verb !== "kimasu") {
    let stem = verb.slice(0, -6); // Remove "kimasu"
    return stem + "ke"; // Convert to godan imperative-form
  }

  // Handle verbs ending with "imasu"
  if (verb.endsWith("imasu")) {
    const stem = verb.slice(0, -5); // Remove "imasu"
    const lastChar = stem.slice(-1);

    // Check if the last character is in the specified set
    if ("kgnmhbdrp".includes(lastChar)) {
      const godanImperativeForms = {
        "k": "ke", "g": "ge", "n": "ne", "m": "me",
        "h": "he", "b": "be", "d": "de", "r": "re", "p": "pe"
      };
      return stem.slice(0, -1) + godanImperativeForms[lastChar];
    }
    
    // Otherwise, default "imasu" to "iro"
    return stem + "ro";
  }

  // If the verb is already in dictionary form, process it
  if (!verb.endsWith("masu")) {
    return convertDictToImperative(verb);
  }

  // If the verb ends with "masu", process it
  let stem = verb.slice(0, -4); // Remove "masu"

  // Ichidan verbs (Group 2)
  if (verb.match(/(.*[aiueo])masu$/)) {
    return stem + "ro"; // Directly replace "masu" with "ro"
  }

  // Godan verbs (Group 1)
  return convertDictToImperative(convertMasuToDict(verb));
};

// Converts Dictionary Form → Imperative Form
const convertDictToImperative = (verb) => {
  if (verb.endsWith("iru") || verb.endsWith("eru")) {
    return verb.slice(0, -2) + "ro"; // Ichidan → Remove "ru" and add "ro"
  }

  const godanImperativeForms = {
    "ku": "ke", "gu": "ge", "su": "se", "tsu": "te",
    "nu": "ne", "fu": "he", "bu": "be", "mu": "me", "ru": "re", "u": "e"
  };

  for (let ending in godanImperativeForms) {
    if (verb.endsWith(ending)) {
      return verb.slice(0, -ending.length) + godanImperativeForms[ending];
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