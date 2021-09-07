
/**
 * @name getUnicode
 * @description Récupère le unicode d'un emoji (convertie une emoji en son unicode)
 * @param {String} emoji 
 * @returns 
 */
function getUnicode (emoji) {
    var comp;
    if (emoji.length === 1) {
        comp = emoji.charCodeAt(0);
    }
    comp = (
        (emoji.charCodeAt(0) - 0xD800) * 0x400
      + (emoji.charCodeAt(1) - 0xDC00) + 0x10000
    );
    if (comp < 0) {
        comp = emoji.charCodeAt(0);
    }
    return comp.toString("16");
}

module.exports = { getUnicode }
