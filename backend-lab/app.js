'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3003;

const admin = require('./enrollAdmin.js');
const user = require('./registerUser.js');
const query = require('./query.js');

async function init() {
    app.use(cors())
    app.use(express.json());

    await connect();

    app.get('/', (req, res) => res.send('Hello World!'));

    app.post('/lab/addEMR', (req, res) => addEMR(req, res));
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
}

async function connect() {
    await admin.enroll();
    await user.register();
}


async function addEMR(req, res) {
    //userEmail: userEmail,
    //adderEmail: adderEmail,
    //emrID: emrID,
    //type: type,
    //content: content
    try {
        await query.initialize();
        const result = await query.addEMR(req.body.userEmail, req.body.adderEmail, req.body.emrID, req.body.type, req.body.content);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
        console.error(`error on addEMRRoute: ${error}`);
    }
}



init();
