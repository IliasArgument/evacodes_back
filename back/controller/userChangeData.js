const mongoose = require('mongoose');


class userChangeData {

    async postChangeNameUser(req, res) {
        try {
            const { username, newName } = req?.body;
            console.log(req?.body);

            // console.log(mongoose.connection.db.collection('userdatas'), 'mongo')
            // { "_id": req.body._id}, // Filter
            // {$set: {"name": req.body.name}}, // Update
            // {upsert: true} // add document with req.body._id if not exists 
            mongoose.connection.db.collection('userdatas').updateOne({ "username": username }, { $set: { "username": newName } })
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
    async postChangeSkillsUser(req, res) {
        try {
            const { skills, newSkills } = req?.body;
            console.log(req?.body);

            mongoose.connection.db.collection('userdatas').updateOne({ "skills": skills }, { $set: { "skills": newSkills } })
                .then((obj) => {
                    console.log('Updated - ' + obj);
                })
                .catch((err) => {
                    console.log('Error: ' + err);
                })

            return res.json({ message: 'Данные пользователя успешно изменены' })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Error POST' })
        }
    }

    async postChangeStackUser(req, res) {
        try {
            const { stack, newStack } = req?.body;
            console.log(req?.body);

            mongoose.connection.db.collection('userdatas').updateOne({ "stack": stack }, { $set: { "stack": newStack } })
                .then((obj) => {
                    console.log('Updated - ' + obj);
                })
                .catch((err) => {
                    console.log('Error: ' + err);
                })

            return res.json({ message: 'Данные пользователя успешно изменены' })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Error POST' })
        }
    }

    async postChangeDescriptionUser(req, res) {
        try {
            const { desk, newDesk } = req?.body;
            console.log(req?.body);

            mongoose.connection.db.collection('userdatas').updateOne({ "description": desk }, { $set: { "description": newDesk } })
                .then((obj) => {
                    console.log('Updated - ' + obj);
                })
                .catch((err) => {
                    console.log('Error: ' + err);
                })

            return res.json({ message: 'Данные пользователя успешно изменены' })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Error POST' })
        }
    }

}

module.exports = new userChangeData()
