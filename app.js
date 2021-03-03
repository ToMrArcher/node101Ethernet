const express = require('express')
const app = express();
var mysql = require('mysql');
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.use(express.urlencoded({
    extended: true
}))

var con = mysql.createConnection({
    host: "localhost",
    user: "syvert",
    password: "dust123",
    database: "apertiff20"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/", function (req, res) {
    con.query("SELECT * FROM recipes", function (err, results) {
        res.render("index", { recipes: results })
    });
});

app.get("/newrecipe", function (req, res) {
    res.render("newRecipe")
})

app.post("/", function (req, res) {
    var title = req.body.title;
    var body = req.body.body;
    con.query(`INSERT INTO recipes VALUES(NULL, "${title}", "${body}", curdate())`)
    res.redirect("/")
})

app.post("/deletepost/:id", function (req, res) {
    var id = req.params.id
    con.query(`DELETE FROM recipes WHERE ID = ${id}`)
    res.redirect("/")
})

app.listen(3000, function () {
    console.log("Listening on port 80");
});
