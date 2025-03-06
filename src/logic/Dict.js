export const masuToDictionary = (verb) => {
    // Irregular verbs (Group 3) - only "true" suru/kuru verbs
    const irregularDictionaryForms = {
        "suru": "suru",
        "kuru": "kuru",
        "shimasu": "suru",
        "kimasu": "kuru",
        "benkyou shimasu": "benkyou suru",
        "mottekimasu": "mottekuru",
    };

    if (irregularDictionaryForms[verb]) return irregularDictionaryForms[verb];

    // Handle "true" suru verbs (e.g., "benkyou shimasu" → "benkyou suru")
    if (verb.includes(" shimasu")) {
        return verb.replace(" shimasu", " suru");
    }
    if (verb.includes(" kimasu")) {
        return verb.replace(" kimasu", " kuru");
    }

    // Special case: "okimasu" can belong to both Group 1 (置く) and Group 2 (起きる)
    if (verb === "okimasu" || verb === "oku") {
        return ["oku", "okiru"]; // Both possibilities
    }

    // Explicit fix for verbs ending in "ちます (chimasu)" and "つます (tsumasu)"
    if (verb.endsWith("chimasu")) {
        let stem = verb.slice(0, -7); // Remove "chimasu"
        return stem + "tsu"; // Convert to godan dictionary-form (待ちます → 待つ)
    }
    if (verb.endsWith("tsumasu")) {
        let stem = verb.slice(0, -7); // Remove "tsumasu"
        return stem + "tsu"; // Convert to godan dictionary-form (持ちます → 持つ)
    }

    // Handle godan verbs ending with "shimasu" (e.g., "nakushimasu" → "nakusu")
    if (verb.endsWith("shimasu") && verb !== "shimasu") {
        let stem = verb.slice(0, -7); // Remove "shimasu"
        return stem + "su"; // Convert to godan dictionary-form
    }
    if (verb.endsWith("kimasu") && verb !== "kimasu") {
        let stem = verb.slice(0, -6); // Remove "kimasu"
        return stem + "ku"; // Convert to godan dictionary-form
    }

    // Handle verbs ending with "imasu"
    if (verb.endsWith("imasu")) {
        const stem = verb.slice(0, -5); // Remove "imasu"
        const lastChar = stem.slice(-1);

        // Check if the last character is in the specified set
        if ("kgnmhbdrp".includes(lastChar)) {
            const godanDictionaryForms = {
                "k": "ku", "g": "gu", "n": "nu", "m": "mu",
                "h": "fu", "b": "bu", "d": "du", "r": "ru", "p": "pu"
            };
            return stem.slice(0, -1) + godanDictionaryForms[lastChar];
        }
        
        // Otherwise, default "imasu" to "u"
        return stem + "u";
    }

    // *Ichidan verbs (Group 2)*
    if (verb.match(/(.*[aiueo])masu$/)) {
        return verb.slice(0, -4) + "ru"; // Directly replace "masu" with "ru"
    }

    return "Could not determine verb type";
};
