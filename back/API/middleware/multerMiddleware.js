const createHttpError = require('http-errors');
const multer = require('multer');
const path = require('path');

const mimeTypes = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png',
    'image/webp' : 'webp',
    'image/gif' : 'gif'
};

/**
 * Défini la configuration de multer (qui gère l'upload de fichier )
 */
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'back/images/')
    },
    filename: function (req, file, cb) {
        let error = null;
        if(!(file.mimetype in mimeTypes)) 
            error = createHttpError.BadRequest(`type/mime ${file.mimetype} image not unabled`);

        const name = file.originalname.split(' ').join('_').split('.').join('_');
        cb(error, `${name}-${Date.now()}.${mimeTypes[file.mimetype]}` )            
    }
})


module.exports = multer({ storage }).single('file')