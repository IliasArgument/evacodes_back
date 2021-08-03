
const UserModel = require('../models/UserModel');


exports.upload = (req, res, next) => {
    const files = req.files;
    console.log(files, 'files files files files files')
    if (!files) {
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error)
    }

    // convert images into base64 encoding
    let imgArray = files.map((file) => {
        let img = fs.readFileSync(file.path)

        return encode_image = img.toString('base64')
    })

    let result = imgArray.map((src, index) => {

        // create object to store data in the collection
        // let finalImg = {
            let filename = files[index].originalname;
            let contentType = files[index].mimetype;
            let imageBase64 = src;
        // }

        let newUpload = new UserModel(filename,
            contentType,
            imageBase64);

        return newUpload
            .save()
            .then(() => {
                return { msg: `${files[index].originalname} Uploaded Successfully...!` }
            })
            .catch(error => {
                if (error) {
                    if (error.name === 'MongoError' && error.code === 11000) {
                        return Promise.reject({ error: `Duplicate ${files[index].originalname}. File Already exists! ` });
                    }
                    return Promise.reject({ error: error.message || `Cannot Upload ${files[index].originalname} Something Missing!` })
                }
            })
    });

    Promise.all(result)
        .then(msg => {
            // res.json(msg);
            res.redirect('/')
        })
        .catch(err => {
            res.json(err);
        })
}