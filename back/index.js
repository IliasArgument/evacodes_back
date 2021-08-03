const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const path = require("path");

const cors = require('cors');

const multer = require('multer');

mongoose.set('useFindAndModify', false);

const PORT = process.env.PORT || 5000

const app = express();

app.use(express.static('./uploads/avatars'));


const storageSec = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'cv') {
            cb(null, './uploads/cvs');
        } else if (file.fieldname === 'avatar') {
            cb(null, './uploads/avatars');

        }
    },
    // destination: path.join(__dirname, "./uploads/cvs"),
    filename: (req, file, cb) => {
        console.log(file, 'FILE CV CV')
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
const uploadSec = multer({ storage: storageSec })

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

app.use(
    cors({
        origin: (origin, callback) => callback(null, true),
        credentials: true
    })
);

app.use(express.urlencoded({
    extended: true
}))

app.use('/api/v1/login', authRouter)

const multiUpload = uploadSec.fields([{ name: 'avatar', maxCount: 10 }, { name: 'cv', maxCount: 10 }]);
app.use('/api/v1', multiUpload, userRouter);

app.use('/api/v1/cv', userRouter );

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://qwerty:qwerty123@cluster0.rzx5h.mongodb.net/auth-roles`, { useNewUrlParser: true })
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}



start()
