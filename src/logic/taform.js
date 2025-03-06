export const masuToTaForm = (verb) => {
  const irregularTaForms = { "shimasu": "shita", "kimasu": "kita", "ikimasu": "itta" };
  if (irregularTaForms[verb]) return irregularTaForms[verb];
  if (!verb.endsWith("masu")) return "Not a masu-form verb";

  let stem = verb.slice(0, -4); // Remove 'masu'

  const godanTaForms = {
      "chi": "tta", "ri": "tta", "mi": "nda", "bi": "nda", "ni": "nda",
      "ki": "ita", "gi": "ida", "shi": "shita"
  };

  // Handle special exceptions first
  const exceptions = {
      "kakimasu": "kaita", "ikimasu": "itta", "arukimasu": "aruita", "kikimasu": "kiita", "mimasu" : "mita", "karimasu" : "karita", "imasu" : "ita", "okimasu" : "okita"
  };
  if (exceptions[verb]) return exceptions[verb];

  // Apply Godan verb transformations by fully removing the last syllable before adding ta-form
  for (let [ending, replacement] of Object.entries(godanTaForms)) {
      if (stem.endsWith(ending)) {
          return stem.slice(0, -ending.length) + replacement;
      }
  }

  // Group 2 & 3 verbs: Simply remove 'masu' and add 'ta'
  return stem + "ta";
};