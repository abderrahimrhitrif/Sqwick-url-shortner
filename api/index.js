const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Url = require('./Models/Url');
const validUrl = require('valid-url')

app.use(express.json());

require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI);


const corsOptions = {
    origin: '*'
};
app.use(cors(corsOptions));

app.post('/shorten', async (req, res) => {
    const { url } = req.body;
    if (validUrl.isUri(url)) {
        const shortCode = uuidv4().substring(0, 6);
        try {
            const urlDoc = await Url.create({
                url,
                shortCode
            })
            res.status(200).json(urlDoc.shortCode);
        } catch (error) {
            throw (error)
        }
    } else {
        res.status(400).json('invalid url')
    }



})

app.get("/r/:shortCode", async(req, res) =>{

        const { shortCode } = req.params;
        const urlDoc = await Url.findOne({ shortCode });
        if (urlDoc) {
            res.status(302).redirect(urlDoc.url);
          } else {
            res.status(404).json({ error: 'Short code not found' });
          }

})
// module.exports = app;
app.listen(4000);