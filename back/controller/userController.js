const mongoose = require('mongoose');
const UserModel = require('../models/UserModel');
const UserInterview = require('../models/UserDataOfInterview');
const fs = require('fs');
const nodemailer = require('nodemailer');



class userController {

    async dataUserInterview(req, res) {
        try {
            const { name, email } = req.body;
            console.log(name, email, 'email')
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ilakoles96@gmail.com',
                    pass: 'azzazelia777'
                }
            })
            const mailOptions = {
                from: 'ilakoles96@gmail.com',
                to: 'vitaliy@evacodes.com',
                subject: 'Пользователь ознакомился с интервью!',
                text: `name: ${name} - email: ${email}`
            }
            transporter.sendMail(mailOptions);

            console.log(req.body, 'phone email')

            // const userDataInterview = new UserInterview({  email, name });

            // await userDataInterview.save()
            return res.json({ message: 'Данные пользователя отправлены на email' })

        } catch (e) {
            res.status(400).json({ message: 'Login Error' })
        }
    }

    async postUserData(req, res) {

        try {
            const { username, stack, skills, description, checkbox } = req?.body

            const ava = req.files || {};
            const avatar = ava?.avatar?.map(ava => ava.filename).join('');
            const cv = ava?.cv?.map(cv => cv.filename).join('');

            const userDataDB = new UserModel({ stack, username, skills, description, avatar, cv, checkbox });

            await userDataDB.save()
            return res.json({ message: 'Данные пользователя успешно попали в бд' })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Error POST' })
        }
    }

    async postChangeNameUser(req, res) {
        try {
            const { username, newUserName } = req?.body;
            console.log(req?.body);

            // console.log(mongoose.connection.db.collection('userdatas'), 'mongo')
            // { "_id": req.body._id}, // Filter
            // {$set: {"name": req.body.name}}, // Update
            // {upsert: true} // add document with req.body._id if not exists 
            mongoose.connection.db.collection('userdatas').updateOne({ "username": username }, { $set: { "username": newUserName } })
            .then((obj) => {
                console.log('Updated - ' + obj);
            })
            .catch((err) => {
                console.log('Error: ' + err);
            })

            return res.json({ message: 'Данные пользователя успешно изменен' })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Error POST' })
        }
    }

    async getUserCv(req, res) {

        const { path } = req;
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

        const { id, avatar, cv } = req.body;

        UserModel.findByIdAndRemove(id)
            .exec()
            .then(data => {
                console.log('Удален типчик')

                if (!data) res.status(404).end();
                fs.unlinkSync(`C:/Users/maryb/Desktop/evacodes-dev/back/uploads/avatars/${avatar}`);
                fs.unlinkSync(`C:/Users/maryb/Desktop/evacodes-dev/back/uploads/cvs/${cv}`);

                res.status(204).end()

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

