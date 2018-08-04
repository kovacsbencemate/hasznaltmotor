const express = require('express');
const hbs = require('express-handlebars')
const motors = require('./data.js')
const app = express();

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.get('/', function (req, res) {
    res.render('home');
});

app.use(express.static("Public"))
app.get('/send', function (req, res) {
    const param = req.query
    if (param.maxCcm === ""){
    param.maxCcm = 1000000
    }
    const filtered = motors.filter(function(motor){
        return motor.ccm >= param.minCcm && motor.ccm <= param.maxCcm
    })


    res.render('results', {motors: filtered})
});




app.listen(3000);

console.log("Server started");
