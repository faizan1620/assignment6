"use strict";
exports.__esModule = true;
var exp = require("express");
var app = exp();
//const bodyParser=require('body');
var users_1 = require("./users");
var port = 3000;
app.use(exp.urlencoded());
app.use(exp.static('public'));
// Parse JSON bodies (as sent by API clients)
app.use(exp.json());
//app.use(bodyParser.json());
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});
app.use('/users', users_1["default"]);
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
