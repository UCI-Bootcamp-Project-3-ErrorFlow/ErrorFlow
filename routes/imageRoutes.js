// const router = require('express').Router();
// const { Image } = require('../models');
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now(), + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 },
//   fileFilter: fileFilter,
// });

// router.post(
//   '/image/uploadmulter',
//   upload.single('imageData'),
//   (req, res, next) => {
//     console.log(req.body);
//     const newImage = new Image({
//       imageName: req.body.imageName
//     });

//     newImage
//       .save()
//       .then((result) => {
//         console.log(result);
//         res.status(200).json({
//           success: true,
//           document: result,
//         });
//       })
//       .catch((err) => next(err));
//   }
// );

// module.exports = router;
