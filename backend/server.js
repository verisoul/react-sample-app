require("dotenv").config({path: `.env`});
const express = require('express');
const fetch = require('node-fetch');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

if(!process.env.VERISOUL_API_KEY) {
    throw new Error('VERISOUL_API_KEY not set');
}
if(!process.env.REACT_APP_VERISOUL_ENV) {
    throw new Error('REACT_APP_VERISOUL_ENV not set');
}

const API_URL = `https://api.${process.env.REACT_APP_VERISOUL_ENV}.verisoul.ai`;
const headers = {
    'x-api-key': process.env.VERISOUL_API_KEY,
    'Content-Type': 'application/json'
};

app.post("/api/authenticated", async (req, res) => {
    try {
        const {session_id, account_id} = req.body;

        console.log("Received request on server")
        console.log('Session ID: ', session_id);
        console.log('Account ID: ', account_id);


        const body = JSON.stringify({
            session_id,
            account : {
                id: account_id
            }
        })

        // See https://docs.verisoul.ai/
        let response = await fetch(`${API_URL}/session/authenticate`, {
            method: 'POST',
            headers,
            body: body
        });

        let results = await response.json();

        res.status(200).send(results);
    } catch (err) {
        res.status(500).send({error: err.message});
    }
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
