export const masuToBaForm = (verb) => {
  // Irregular verbs (Group 3) - only "true" suru/kuru verbs
  const irregularNaiForms = {
    "suru": "sureba",
    "kuru": "kureba",
    "shimasu": "sureba",
    "kimasu": "kureba",
    "imasu": "ireba",
    "dekimasu": "dekireba"
  };

  if (irregularNaiForms[verb]) return irregularNaiForms[verb];

  // Handle "true" suru verbs (e.g., "benkyou shimasu" → "benkyou sureba")
  if (verb.includes(" shimasu")) {
    return verb.replace(" shimasu", " sureba");
  }
  if (verb.includes(" kimasu")) {
    return verb.replace(" kimasu", " kureba");
  }

  // Special case: "okimasu" can belong to both Group 1 (置く) and Group 2 (起きる)
  if (verb === "okimasu" || verb === "oku") {
    return ["okeba", "okireba"]; // Both possibilities
  }

  // Handle godan verbs ending with "shimasu" (e.g., "nakushimasu" → "nakuseba")
  if (verb.endsWith("shimasu") && verb !== "shimasu") {
    let stem = verb.slice(0, -7); // Remove "shimasu"
    return stem + "seba"; // Convert to godan ba-form
  }
  if (verb.endsWith("kimasu") && verb !== "kimasu") {
    let stem = verb.slice(0, -6); // Remove "shimasu"
    return stem + "keba"; // Convert to godan ba-form
  }
  if (verb.endsWith("chimasu") && verb !== "chimasu") {
    let stem = verb.slice(0, -7); // Remove "shimasu"
    return stem + "teba"; // Convert to godan ba-form
  }
  if (verb.endsWith("imasu") && verb !== "imasu") {
    let stem = verb.slice(0, -5); // Remove "shimasu"
    return stem + "eba"; // Convert to godan ba-form
  }
  if (verb.endsWith("tsu")) {
    let stem = verb.slice(0, -3); // Remove "tsu"
    return stem + "teba";
   } // Convert to godan potential-form (持ちます → 持てる)
  

  // Handle verbs ending with "imasu"
  if (verb.endsWith("imasu")) {
    const stem = verb.slice(0, -5); // Remove "imasu"
    const lastChar = stem.slice(-1);

    // Check if the last character is in the specified set
    if ("kgnmhbdrp".includes(lastChar)) {
      const godanNaiForms = {
        "k": "ke", "g": "ge", "n": "ne", "m": "me",
        "h": "he", "b": "be", "d": "de", "r": "re", "p": "pe"
      };
      return stem.slice(0, -1) + godanNaiForms[lastChar] + "ba";
    }
    
    // Otherwise, default "imasu" to "ieba"
    return stem + "ieba";
  }

  // If the verb is already in dictionary form, process it
  if (!verb.endsWith("masu")) {
    return convertDictToNai(verb);
  }

  // If the verb ends with "masu", process it
  let stem = verb.slice(0, -4); // Remove "masu"

  // Special case: "irimasu" (要る, to need) is a Godan verb → should be "ireba"
  if (verb === "irimasu") {
    return "ireba";
  }

  // *Ichidan verbs (Group 2)*
  if (verb.match(/(.*[aiueo])masu$/)) {
    return stem + "reba"; // Directly replace "masu" with "ba"
  }

  // *Godan verbs (Group 1)*
  return convertDictToNai(convertMasuToDict(verb));
};

// Converts Dictionary Form → ba-form
const convertDictToNai = (verb) => {
  if (verb.endsWith("iru") || verb.endsWith("eru")) {
    return verb.slice(0, -2) + "reba"; // Ichidan → Remove "ru" and add "ba"
  }

  const godanNaiForms = {
    "ku": "ke", "gu": "ge", "su": "se", "tsu": "te",
    "nu": "ne", "fu": "he", "bu": "be", "mu": "me", "ru": "re", "u": "e"
  };

  for (let ending in godanNaiForms) {
    if (verb.endsWith(ending)) {
      return verb.slice(0, -ending.length) + godanNaiForms[ending] + "ba";
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
