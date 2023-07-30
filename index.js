require('dotenv').config();


const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const generateQrCodeBase64 = require('./generate');

app.set('view engine','ejs');


app.use(express.static('public'));


app.use(bodyParser.urlencoded({extended : false}));

app.use(express.json());


app.get('/', (req,res) => {
    res.render('frontend');
});


app.post('/submit',async (req,res) => {

    try {

        const QR = await generateQrCodeBase64(req.body.url);

        
       res.header('Content-Type','text/plain');

       return res.send(QR);
        
    } catch (error) {
        console.log(error);
    }
    
}) 


const port = process.env.port || 7000;

app.listen(port,(error) => {
    if(error){
        console.log(error);
    };

    console.log(`Server listening on port ${port}`);
})

