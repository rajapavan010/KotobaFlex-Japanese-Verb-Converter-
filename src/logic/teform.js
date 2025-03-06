export const masuToTeForm = (verb) => {
  const irregularTeForms = { "shimasu": "shite", "kimasu": "kite", "ikimasu": "itte" };
  if (irregularTeForms[verb]) return irregularTeForms[verb];
  if (!verb.endsWith("masu")) return "Not a masu-form verb";

  let stem = verb.slice(0, -4); // Remove 'masu'

  const godanTeForms = {
      "chi": "tte", "ri": "tte", "mi": "nde", "bi": "nde", "ni": "nde",
      "ki": "ite", "gi": "ide", "shi": "shite"
  };

  // Handle special exceptions first
  const exceptions = {
      "kakimasu": "kaite", "ikimasu": "itte", "arukimasu": "aruite", "kikimasu": "kiite", "mimasu" : "mite", "karimasu" : "karite", "imasu" : "ite", "okimasu" : "okite"
  };
  if (exceptions[verb]) return exceptions[verb];

  // Apply Godan verb transformations by fully removing the last syllable before adding te-form
  for (let [ending, replacement] of Object.entries(godanTeForms)) {
      if (stem.endsWith(ending)) {
          return stem.slice(0, -ending.length) + replacement;
      }
  }

  // Group 2 & 3 verbs: Simply remove 'masu' and add 'te'
  return stem + "te";
};