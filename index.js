var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;
var router = express.Router();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'weconnect'
});


router.get('/', function (req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

router.post('/test-page', function (req, res) {
    var name = req.body.name,
        color = req.body.color;
    console.log(name)
    res.json({
        message: 'hooray! welcome to our api!'
    });
    // ...
});

//create new user
router.post('/api/:email', function (req, res) {

    //  console.log(req.body.name);
    var body = req.body;
    var user = {

        name: body.name,
        email: body.email,
        phone: body.phone,
        time: body.time,
        money: body.money,
        days: body.days,
    }

    var queryStr = "INSERT INTO supporter VALUES ("+user.name+", "+user.email+", "+user.phone+", "+user.time+", "+user.money+", "+user.days+");";
    console.log("Query is " + queryStr);

    connection.query(queryStr, function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        res.writeHeader(200, {
        "Content-Type": "application/json"
    });
    res.end();
});

connection.connect();

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);