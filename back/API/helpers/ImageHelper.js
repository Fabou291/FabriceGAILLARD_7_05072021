const fsPromises = require("fs/promises");

/**
 * @function remove
 * @description Supprime l'image du dossier image
 * @param {String} id 
 */
const remove = async (fileName) => {
    const err = await fsPromises.unlink(`back/images/${fileName}`);
    if(err) throw err;
};

module.exports = {remove};