const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

//middlewares

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Constant

app.set('port', process.env.PORT || 2500);

//routes


//starting the server

app.listen(app.get('port'), () => {
    console.log('Start Server on port: '+ app.get('port'));
});

//start Bifinex
const bifinex = require("./Bifinex/mainBifinex");
bifinex.start();
bifinex.btcusd();
