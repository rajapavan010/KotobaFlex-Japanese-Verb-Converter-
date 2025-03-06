export const masuToTaiForm = (verb) => {
    // Irregular verbs (Group 3) - only "true" suru/kuru verbs
    const irregularTaiForms = {
      "suru": "shitai",
      "kuru": "kitai",
      "shimasu": "shitai",
      "kimasu": "kitai",
      "benkyou suru": "benkyou shitai",
      "benkyou shimasu": "benkyou shitai",
      "mottekuru": "mottekitai",
    };

    if (irregularTaiForms[verb]) return irregularTaiForms[verb];

    // Handle "true" suru verbs (e.g., "benkyou shimasu" → "benkyou shitai")
    if (verb.includes(" shimasu")) {
      return verb.replace(" shimasu", " shitai");
    }
    if (verb.includes(" kimasu")) {
      return verb.replace(" kimasu", " kitai");
    }

    // Special case: "okimasu" can belong to both Group 1 (置く) and Group 2 (起きる)
    if (verb === "okimasu" || verb === "oku") {
      return ["okitai", "okitai"]; // Both possibilities
    }

    // Explicit fix for verbs ending in "ちます (chimasu)" 
    if (verb.endsWith("chimasu")) {
      let stem = verb.slice(0, -7); // Remove "chimasu"
      return stem + "chitai"; // Convert to godan tai-form (待ちます → 待ちたい)
    }
    if (verb.endsWith("tsu")) {
      let stem = verb.slice(0, -3); // Remove "tsu"
      return stem + "chitai"; // Convert to godan tai-form (持ちます → 持ちたい)
    }

    // Handle godan verbs ending with "shimasu" (e.g., "nakushimasu" → "nakushitai")
    if (verb.endsWith("shimasu") && verb !== "shimasu") {
      let stem = verb.slice(0, -7); // Remove "shimasu"
      return stem + "shitai"; // Convert to godan tai-form
    }
    if (verb.endsWith("kimasu") && verb !== "kimasu") {
      let stem = verb.slice(0, -6); // Remove "kimasu"
      return stem + "kitai"; // Convert to godan tai-form
    }

    // Handle verbs ending with "imasu"
    if (verb.endsWith("imasu")) {
      const stem = verb.slice(0, -5); // Remove "imasu"
      const lastChar = stem.slice(-1);

      // Check if the last character is in the specified set
      if ("kgnmhbdrp".includes(lastChar)) {
        const godanTaiForms = {
          "k": "kita", "g": "gita", "n": "nita", "m": "mita",
          "h": "hita", "b": "bita", "d": "dita", "r": "rita", "p": "pita"
        };
        return stem.slice(0, -1) + godanTaiForms[lastChar] + "i";
      }
      
      // Otherwise, default "imasu" to "itai"
      return stem + "itai";
    }

    // If the verb is already in dictionary form, process it
    if (!verb.endsWith("masu")) {
      return convertDictToTai(verb);
    }

    // If the verb ends with "masu", process it
    let stem = verb.slice(0, -4); // Remove "masu"

    // Ichidan verbs (Group 2)
    if (verb.match(/(.*[aiueo])masu$/)) {
      return stem + "tai"; // Directly replace "masu" with "tai"
    }

    // Godan verbs (Group 1)
    return convertDictToTai(convertMasuToDict(verb));
};

// Converts Dictionary Form → たい-Form
const convertDictToTai = (verb) => {
    if (verb.endsWith("iru") || verb.endsWith("eru")) {
      return verb.slice(0, -2) + "tai"; // Ichidan → Remove "ru" and add "tai"
    }

    const godanTaiForms = {
      "ku": "kitai", "gu": "gitai", "su": "shitai", "tsu": "taitai",
      "nu": "nitai", "fu": "hitai", "bu": "bitai", "mu": "mitai", "ru": "ritai", "u": "itai"
    };

    for (let ending in godanTaiForms) {
      if (verb.endsWith(ending)) {
        return verb.slice(0, -ending.length) + godanTaiForms[ending];
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