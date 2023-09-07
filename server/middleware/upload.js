const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/')); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, req.session.userData.DATE + '-' + file.originalname);
    },
  });


const upload = multer({ storage: storage });
module.exports = upload