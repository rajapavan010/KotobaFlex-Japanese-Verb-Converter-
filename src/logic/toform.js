export const masuToToForm = (verb) => {
    // Irregular verbs (Group 3) - only "true" suru/kuru verbs
    const irregularToForms = {
      "suru": "suru to",
      "kuru": "kuru to",
      "shimasu": "suru to",
      "kimasu": "kuru to",
      "benkyou suru": "benkyou suru to",
      "benkyou shimasu": "benkyou suru to",
      "mottekuru": "mottekuru to",
    };
  
    if (irregularToForms[verb]) return irregularToForms[verb];

    // Handle "true" suru verbs (e.g., "benkyou shimasu" → "benkyou suru to")
    if (verb.includes(" shimasu")) {
      return verb.replace(" shimasu", " suru to");
    }
    if (verb.includes(" kimasu")) {
      return verb.replace(" kimasu", " kuru to");
    }

    // Special case: "okimasu" can belong to both Group 1 (置く) and Group 2 (起きる)
    if (verb === "okimasu" || verb === "oku") {
      return ["oku to", "okiru to"]; // Both possibilities
    }

    // Explicit fix for verbs ending in "ちます (chimasu)" and "つます (tsumasu)"
    if (verb.endsWith("chimasu")) {
      let stem = verb.slice(0, -7); // Remove "chimasu"
      return stem + "tsu to"; // Convert to godan と-form (待ちます → 待つと)
    }
    if (verb.endsWith("tsumasu")) {
      let stem = verb.slice(0, -7); // Remove "tsumasu"
      return stem + "tsu to"; // Convert to godan と-form (持ちます → 持つと)
    }

    // Handle godan verbs ending with "shimasu" (e.g., "nakushimasu" → "nakusu to")
    if (verb.endsWith("shimasu") && verb !== "shimasu") {
      let stem = verb.slice(0, -7); // Remove "shimasu"
      return stem + "su to"; // Convert to godan と-form
    }
    if (verb.endsWith("kimasu") && verb !== "kimasu") {
      let stem = verb.slice(0, -6); // Remove "kimasu"
      return stem + "ku to"; // Convert to godan と-form
    }

    // Handle verbs ending with "imasu"
    if (verb.endsWith("imasu")) {
      const stem = verb.slice(0, -5); // Remove "imasu"
      const lastChar = stem.slice(-1);

      // Check if the last character is in the specified set
      if ("kgnmhbdrp".includes(lastChar)) {
        const godanToForms = {
          "k": "ku", "g": "gu", "n": "nu", "m": "mu",
          "h": "fu", "b": "bu", "d": "du", "r": "ru", "p": "pu"
        };
        return stem.slice(0, -1) + godanToForms[lastChar] + " to";
      }
      
      // Otherwise, default "imasu" to "u to"
      return stem + "u to";
    }

    // If the verb is already in dictionary form, process it
    if (!verb.endsWith("masu")) {
      return convertDictToToForm(verb);
    }

    // If the verb ends with "masu", process it
    let stem = verb.slice(0, -4); // Remove "masu"

    // Ichidan verbs (Group 2)
    if (verb.match(/(.*[aiueo])masu$/)) {
      return stem + "ru to"; // Directly replace "masu" with "ru to"
    }

    // Godan verbs (Group 1)
    return convertDictToToForm(convertMasuToDict(verb));
};

// Converts Dictionary Form → と-Form
const convertDictToToForm = (verb) => {
    if (verb.endsWith("iru") || verb.endsWith("eru")) {
      return verb.slice(0, -2) + "ru to"; // Ichidan → Remove "ru" and add "ru to"
    }

    const godanToForms = {
      "ku": "ku", "gu": "gu", "su": "su", "tsu": "tsu",
      "nu": "nu", "fu": "fu", "bu": "bu", "mu": "mu", "ru": "ru", "u": "u"
    };

    for (let ending in godanToForms) {
      if (verb.endsWith(ending)) {
        return verb.slice(0, -ending.length) + godanToForms[ending] + " to";
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