export const masuToPotentialForm = (verb) => {
  // Irregular verbs (Group 3) - only "true" suru/kuru verbs
  const irregularPotentialForms = {
    "suru": "dekiru",
    "kuru": "korareru",
    "shimasu": "dekiru",
    "kimasu": "korareru",
    "benkyou suru": "benkyou dekiru",
    "benkyou shimasu": "benkyou dekiru",
    "mottekuru": "mottekorareru",
  };

  if (irregularPotentialForms[verb]) return irregularPotentialForms[verb];

  // Handle "true" suru verbs (e.g., "benkyou shimasu" → "benkyou dekiru")
  if (verb.includes(" shimasu")) {
    return verb.replace(" shimasu", " dekiru");
  }
  if (verb.includes(" kimasu")) {
    return verb.replace(" kimasu", " korareru");
  }

  // Special case: "okimasu" can belong to both Group 1 (置く) and Group 2 (起きる)
  if (verb === "okimasu" || verb === "oku") {
    return ["okeru", "okirareru"]; // Both possibilities
  }

  // Explicit fix for verbs ending in "ちます (chimasu)" 
  if (verb.endsWith("chimasu")) {
    let stem = verb.slice(0, -7); // Remove "chimasu"
    return stem + "teru"; // Convert to godan potential-form (待ちます → 待てる)
  }
  if (verb.endsWith("tsu")) {
    let stem = verb.slice(0, -3); // Remove "tsu"
    return stem + "teru"; // Convert to godan potential-form (持ちます → 持てる)
  }

  // Handle godan verbs ending with "shimasu" (e.g., "nakushimasu" → "nakuseru")
  if (verb.endsWith("shimasu") && verb !== "shimasu") {
    let stem = verb.slice(0, -7); // Remove "shimasu"
    return stem + "seru"; // Convert to godan potential-form
  }
  if (verb.endsWith("kimasu") && verb !== "kimasu") {
    let stem = verb.slice(0, -6); // Remove "kimasu"
    return stem + "keru"; // Convert to godan potential-form
  }

  // Handle verbs ending with "imasu"
  if (verb.endsWith("imasu")) {
    const stem = verb.slice(0, -5); // Remove "imasu"
    const lastChar = stem.slice(-1);

    // Check if the last character is in the specified set
    if ("kgnmhbdrp".includes(lastChar)) {
      const godanPotentialForms = {
        "k": "ke", "g": "ge", "n": "ne", "m": "me",
        "h": "he", "b": "be", "d": "de", "r": "re", "p": "pe"
      };
      return stem.slice(0, -1) + godanPotentialForms[lastChar] + "ru";
    }
    
    // Otherwise, default "imasu" to "ireru"
    return stem + "reru";
  }

  // If the verb is already in dictionary form, process it
  if (!verb.endsWith("masu")) {
    return convertDictToPotential(verb);
  }

  // If the verb ends with "masu", process it
  let stem = verb.slice(0, -4); // Remove "masu"

  // Ichidan verbs (Group 2)
  if (verb.match(/(.*[aiueo])masu$/)) {
    return stem + "rareru"; // Directly replace "masu" with "rareru"
  }

  // Godan verbs (Group 1)
  return convertDictToPotential(convertMasuToDict(verb));
};

// Converts Dictionary Form → Potential Form
const convertDictToPotential = (verb) => {
  if (verb.endsWith("iru") || verb.endsWith("eru")) {
    return verb.slice(0, -2) + "rareru"; // Ichidan → Remove "ru" and add "rareru"
  }

  const godanPotentialForms = {
    "ku": "ke", "gu": "ge", "su": "se", "tsu": "te",
    "nu": "ne", "fu": "he", "bu": "be", "mu": "me", "ru": "re", "u": "e"
  };

  for (let ending in godanPotentialForms) {
    if (verb.endsWith(ending)) {
      return verb.slice(0, -ending.length) + godanPotentialForms[ending] + "ru";
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