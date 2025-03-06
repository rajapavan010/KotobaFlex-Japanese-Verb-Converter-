export const masuToTaraForm = (verb) => {
    // Irregular verbs (Group 3) - only "true" suru/kuru verbs
    const irregularTaraForms = {
      "suru": "shitara",
      "kuru": "kitara",
      "shimasu": "shitara",
      "kimasu": "kitara",
      "benkyou suru": "benkyou shitara",
      "benkyou shimasu": "benkyou shitara",
      "mottekuru": "mottekitara",
    };

    if (irregularTaraForms[verb]) return irregularTaraForms[verb];

    // Handle "true" suru verbs (e.g., "benkyou shimasu" → "benkyou shitara")
    if (verb.includes(" shimasu")) {
      return verb.replace(" shimasu", " shitara");
    }
    if (verb.includes(" kimasu")) {
      return verb.replace(" kimasu", " kitara");
    }

    // Special case: "okimasu" can belong to both Group 1 (置く) and Group 2 (起きる)
    if (verb === "okimasu" || verb === "oku") {
      return ["okattara", "okitara"]; // Both possibilities
    }

    // Explicit fix for verbs ending in "ちます (chimasu)" 
    if (verb.endsWith("chimasu")) {
      let stem = verb.slice(0, -7); // Remove "chimasu"
      return stem + "mattara"; // Convert to godan たら-form (待ちます → 待ったら)
    }
    if (verb.endsWith("tsu")) {
      let stem = verb.slice(0, -7); // Remove "tsu"
      return stem + "mattara"; // Convert to godan たら-form (持ちます → 持ったら)
    }

    // Handle godan verbs ending with "shimasu" (e.g., "nakushimasu" → "nakushitara")
    if (verb.endsWith("shimasu") && verb !== "shimasu") {
      let stem = verb.slice(0, -7); // Remove "shimasu"
      return stem + "shitara"; // Convert to godan たら-form
    }
    if (verb.endsWith("kimasu") && verb !== "kimasu") {
      let stem = verb.slice(0, -6); // Remove "kimasu"
      return stem + "kattara"; // Convert to godan たら-form
    }

    // Handle verbs ending with "imasu"
    if (verb.endsWith("imasu")) {
      const stem = verb.slice(0, -5); // Remove "imasu"
      const lastChar = stem.slice(-1);

      // Check if the last character is in the specified set
      if ("kgnmhbdrp".includes(lastChar)) {
        const godanTaraForms = {
          "k": "itara", "g": "idara", "n": "ndara", "m": "ndara",
          "h": "ttara", "b": "ndara", "d": "ttara", "r": "ttara", "p": "ttara"
        };
        return stem.slice(0, -1) + godanTaraForms[lastChar];
      }
      
      // Otherwise, default "imasu" to "ttara"
      return stem + "ttara";
    }

    // If the verb is already in dictionary form, process it
    if (!verb.endsWith("masu")) {
      return convertDictToTara(verb);
    }

    // If the verb ends with "masu", process it
    let stem = verb.slice(0, -4); // Remove "masu"

    // Ichidan verbs (Group 2)
    if (verb.match(/(.*[aiueo])masu$/)) {
      return stem + "tattara"; // Directly replace "masu" with "たら"
    }

    // Godan verbs (Group 1)
    return convertDictToTara(convertMasuToDict(verb));
};

// Converts Dictionary Form → たら-Form
const convertDictToTara = (verb) => {
    if (verb.endsWith("iru") || verb.endsWith("eru")) {
      return verb.slice(0, -2) + "tattara"; // Ichidan → Remove "ru" and add "たら"
    }

    const godanTaraForms = {
      "ku": "itara", "gu": "idara", "su": "shitara", "tsu": "tattara",
      "nu": "ndara", "fu": "ttara", "bu": "ndara", "mu": "ndara", "ru": "ttara", "u": "ttara"
    };

    for (let ending in godanTaraForms) {
      if (verb.endsWith(ending)) {
        return verb.slice(0, -ending.length) + godanTaraForms[ending];
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