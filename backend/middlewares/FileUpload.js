const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const allowed_extentions = [".png", ".jpg", ".jpeg"];
const rules = {
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            const ext = path.extname(file.originalname).toLowerCase();
            if( allowed_extentions.includes(ext) ) {
                    cb(null, './public');
                }
        },
        filename: function(req, file, cb) {
            const ext = path.extname(file.originalname).toLowerCase();
            let fname = uuid().split('-').join('') + ext
            cb(null, fname );
        }
    }),

    // fileFilter: function(req, file, cb) {
    //     const ext = path.extname(file.originalname).toLowerCase();
    //     if(!allowed_extentions.includes(ext)) {
    //         req.err = {message: 'File extension not allowed!'};
    //         return cb(null, false);
    //     }
    //     cb(null, true);
    // }
    
}

module.exports = multer({...rules}).array('files');