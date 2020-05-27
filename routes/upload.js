const router = require('express').Router();
const path = require('path');
// const fs = require('fs');
// const {IncomingForm} = require('formidable').IncomingForm;
const formidable = require('formidable');

uploadWithFormidable = (req, res, next) => {
    const form = formidable({
        multiples: true,
        uploadDir: path.join(__dirname, '../public/uploads')
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        console.log(files)
        res.json({
            originalname: files.name,
            path: files.path
        });
        next(req)
    });
}
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '_' + file.originalname)
    }
})
//save or not a file if it meets the requirements, but not handle error
const fileFilter = function (req, file, cb) {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    // limits: 1024 * 1024 * 10,
    // fileFilter: fileFilter
})

const uploadFile = function (req, res, next) {
    upload.single('fileUpload')(req, res, (err) => {
        console.log('req2', req.file)
        if (err) return res.status(501).json({
            error: err
        });
        return res.status(200).send({
            originalname: req.file.originalname,
            uploadname: req.file.filename
        })
    })
}
// router.post('/upload', uploadWithFormidable);

// router.post('/upload', uploadWithFormidable);
// router.post('/upload', function (req, res) {
//     upload.single('fileUpload')((req, res) => {
//         console.log('req2',req.file)
//         // if (err) return res.status(501).json({
//         //     error: err
//         // });
//         return res.status(200).json({
//             originalname: req.file.originalname,
//             uploadname: req.file.filename
//         })

//     })
//     // next();
// })


router.post('/upload', uploadFile, (req, res, next) => {
    console.log('here',req.file)
     res.status(200).json({
        originalname: req.file.originalname,
        uploadname: req.file.filename
    })

    // res.status(200).send(req.file);
    next();
})
router.post('/download', (req, res, next) => {
    console.log('download', req.body.filename)
    const filePath = path.join(__dirname, '../public/uploads') + '/' + req.body.filename
    res.status(200).sendFile(filePath);
})
module.exports = router;