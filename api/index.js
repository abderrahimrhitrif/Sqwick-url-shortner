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
            res.json(urlDoc.shortCode);
        } catch (error) {
            throw (error)
        }
    } else {
        res.status(300).json('invalid url')
    }



})

app.get("/r/:shortCode", async(req, res) =>{
    try{
        const { shortCode } = req.params;
        const urlDoc = await Url.findOne({ shortCode });
        res.redirect(urlDoc.url);  
    }
    catch(error){
        res.json(error);
    }
})

app.listen(4000);