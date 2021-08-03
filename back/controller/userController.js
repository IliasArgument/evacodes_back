const UserModel = require('../models/UserModel');
const path = require("path");
const fs = require('fs');


class userController {

    async postUserData(req, res) {

        try {
            const { username, stack, skills, description } = req?.body

            const ava = req.files || {};

            const avatar = ava.avatar.map(ava => ava.filename).join('');
            const cv = ava.cv.map(cv => cv.filename).join('');

            const userDataDB = new UserModel({ stack, username, skills, description, avatar, cv });

            await userDataDB.save()
            // res.download('./uploads/cvs/cv-1627916323902.docx')
            return res.json({ message: 'Данные пользователя успешно попали в бд' })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Error POST' })

        }
    }

    async getUserCv(req, res) {

        const { path } = req;
        console.log(res.path, 'res res12')
        const cv = path.substr(8)

        try {
            console.log(cv, 'CV CV CV 567')
            return res.download(`C:/Users/maryb/Desktop/evacodes-dev/back/uploads/cvs/${cv}`)

        } catch (e) {
            console.log(e, 'uploadCV')
        }
    }



    async getUserData(req, res) {
        try {
            const users = await UserModel.find()
            res.json(users)

        } catch (e) {
            res.status(400).json({ message: 'Error GET' })
        }
    }



    async deleteUserData(req, res, next) {

        const { id } = req.body;
        console.log(req, 'del del del')
        UserModel.findByIdAndRemove(id)
            .exec()
            .then(data => {
                // rm -rf $filename
                console.log('Удален типчик')
                if (!data) res.status(404).end()
                return res.status(204).end()
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 'error',
                    message: 'something went wrong with deleting a filter'
                })
            })
    }
}

module.exports = new userController()

