export const masuToYouniForm = (verb) => {
  // Irregular verbs (Group 3) - only "true" suru/kuru verbs
  const irregularYouniForms = {
      "suru": "suru youni",
      "kuru": "kuru youni",
      "shimasu": "suru youni",
      "kimasu": "kuru youni",
      "benkyou suru": "benkyou suru youni",
      "benkyou shimasu": "benkyou suru youni",
      "mottekuru": "mottekuru youni",
  };

  if (irregularYouniForms[verb]) return irregularYouniForms[verb];

  // Handle "true" suru verbs (e.g., "benkyou shimasu" → "benkyou suru youni")
  if (verb.includes(" shimasu")) {
      return verb.replace(" shimasu", " suru youni");
  }
  if (verb.includes(" kimasu")) {
      return verb.replace(" kimasu", " kuru youni");
  }

  // Special case: "okimasu" can belong to both Group 1 (置く) and Group 2 (起きる)
  if (verb === "okimasu" || verb === "oku") {
      return ["oku youni", "okiru youni"]; // Both possibilities
  }

  // Explicit fix for verbs ending in "ちます (chimasu)" 
  if (verb.endsWith("chimasu")) {
      let stem = verb.slice(0, -7); // Remove "chimasu"
      return stem + "tsu youni"; // Convert to godan yōni form (待ちます → 待つように)
  }
  if (verb.endsWith("tsu")) {
      let stem = verb.slice(0, -3); // Remove "tsu"
      return stem + "tsu youni"; // Convert to godan yōni form (持ちます → 持つように)
  }

  // Handle godan verbs ending with "shimasu" (e.g., "nakushimasu" → "nakusu youni")
  if (verb.endsWith("shimasu") && verb !== "shimasu") {
      let stem = verb.slice(0, -7); // Remove "shimasu"
      return stem + "su youni"; // Convert to godan yōni form
  }
  if (verb.endsWith("kimasu") && verb !== "kimasu") {
      let stem = verb.slice(0, -6); // Remove "kimasu"
      return stem + "ku youni"; // Convert to godan yōni form
  }

  // Handle verbs ending with "imasu"
  if (verb.endsWith("imasu")) {
      const stem = verb.slice(0, -5); // Remove "imasu"
      const lastChar = stem.slice(-1);

      // Check if the last character is in the specified set
      if ("kgnmhbdrp".includes(lastChar)) {
          const godanYouniForms = {
              "k": "ku", "g": "gu", "n": "nu", "m": "mu",
              "h": "fu", "b": "bu", "d": "du", "r": "ru", "p": "pu"
          };
          return stem.slice(0, -1) + godanYouniForms[lastChar] + " youni";
      }
      
      // Otherwise, default "imasu" to "iru youni"
      return stem + "ru youni";
  }

  // If the verb is already in dictionary form, process it
  if (!verb.endsWith("masu")) {
      return convertDictToYouni(verb);
  }

  // If the verb ends with "masu", process it
  let stem = verb.slice(0, -4); // Remove "masu"

  // Ichidan verbs (Group 2)
  if (verb.match(/(.*[aiueo])masu$/)) {
      return stem + "ru youni"; // Directly replace "masu" with "ru youni"
  }

  // Godan verbs (Group 1)
  return convertDictToYouni(convertMasuToDict(verb));
};

// Converts Dictionary Form → Youni Form
const convertDictToYouni = (verb) => {
  if (verb.endsWith("iru") || verb.endsWith("eru")) {
      return verb.slice(0, -2) + "ru youni"; // Ichidan → Remove "ru" and add "ru youni"
  }

  const godanYouniForms = {
      "ku": "ku", "gu": "gu", "su": "su", "tsu": "tsu",
      "nu": "nu", "fu": "fu", "bu": "bu", "mu": "mu", "ru": "ru", "u": "u"
  };

  for (let ending in godanYouniForms) {
      if (verb.endsWith(ending)) {
          return verb.slice(0, -ending.length) + godanYouniForms[ending] + " youni";
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
