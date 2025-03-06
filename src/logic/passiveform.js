export const toPassiveForm = (verb) => {
    // Handle "true" suru verbs (e.g., "benkyou shimasu" → "benkyou sareru")
    if (verb.includes(" shimasu")) {
        return verb.replace(" shimasu", " sareru");
    }
    if (verb.includes(" kimasu")) {
        return verb.replace(" kimasu", " korareru");
    }

    // Special case: "okimasu" can be both Godan (置く) and Ichidan (起きる)
    if (verb === "okimasu" || verb === "oku") {
        return ["okareru", "okirareru"]; // Both possibilities
    }

    // Handle godan verbs ending with "shimasu" (e.g., "nakushimasu" → "nakusareru")
    if (verb.endsWith("shimasu") && verb !== "shimasu") {
        let stem = verb.slice(0, -7); // Remove "shimasu"
        return stem + "sareru"; // Convert to godan passive form
    }
    if (verb.endsWith("kimasu") && verb !== "kimasu") {
        let stem = verb.slice(0, -6); // Remove "kimasu"
        return stem + "kareru"; // Convert to godan passive form
    }
    if (verb.endsWith("chimasu") && verb !== "chimasu") {
        let stem = verb.slice(0, -7); // Remove "chimasu"
        return stem + "tareru"; // Convert to godan passive form
    }
    if (verb.endsWith("tsu") && verb !== "tsu") {
        let stem = verb.slice(0, -3); // Remove "chimasu"
        return stem + "tareru"; // Convert to godan passive form
    }

    // If the verb is in masu-form (ends with "masu"), convert to dictionary form first
    if (verb.endsWith("masu")) {
        let dictForm = convertMasuToDict(verb);
        return toPassiveForm(dictForm);
    }

    // Ichidan verbs (る-verbs): remove "ru" and add "rareru"
    if (verb.endsWith("ru") && isIchidanVerb(verb)) {
        return verb.slice(0, -2) + "rareru";
    }

    // Godan verbs: Change last "u" sound to "areru"
    const godanChanges = {
        "u": "areru", "ku": "kareru", "gu": "gareru", "su": "sareru",
        "tsu": "tareru", "nu": "nareru", "bu": "bareru", "mu": "mareru", "ru": "rareru"
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
        "i": "u", "ki": "ku", "gi": "gu", "shi": "su", "chi": "tsu",
        "ni": "nu", "bi": "bu", "mi": "mu", "ri": "ru"
    };

    // Handle known Godan exceptions
    const godanExceptions = ["kaeru", "shiru", "hashiru", "keru", "shaberu", "suberu"];

    if (godanExceptions.includes(stem + "ru")) {
        return stem + "ru";
    }

    // Ensure correct godan transformation
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