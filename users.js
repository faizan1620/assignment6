"use strict";
exports.__esModule = true;
var express = require('express');
var fs = require('fs');
var router = express.Router();
var myData = JSON.parse(fs.readFileSync("data.json").toString());
router.get('/', function (req, res) {
    res.send(myData);
});
router.post('/', function (req, res) {
    var found = 0;
    var user = req.body;
    for (var i = 0; i < myData.length; i++) {
        if (myData[i]["UId"] == user.UId) {
            res.sendStatus(404);
            found = 1;
        }
    }
    if (found == 0) {
        myData.push(user);
        var stringifyData = JSON.stringify(myData);
        fs.writeFileSync('data.json', stringifyData);
        res.send(myData);
    }
});
router["delete"]('/:id', function (req, res) {
    var id = req.params.id;
    myData = myData.filter(function (user) { return user.UId != id; });
    var stringifyData = JSON.stringify(myData);
    fs.writeFileSync('data.json', stringifyData);
    res.send(myData);
});
router.patch('/:id', function (req, res) {
    var id = req.params.id;
    var user = req.body;
    for (var i = 0; i < myData.length; i++) {
        if (myData[i]["UId"] == id) {
            break;
        }
    }
    myData[i]["First_Name"] = user.First_Name;
    myData[i]["Middle_Name"] = user.Middle_Name;
    myData[i]["Last_Name"] = user.Last_Name;
    myData[i]["Email"] = user.Email;
    myData[i]["Phone_Number"] = user.Phone_Number;
    myData[i]["Role"] = user.Role;
    myData[i]["Address"] = user.Address;
    var stringifyData = JSON.stringify(myData);
    fs.writeFileSync('data.json', stringifyData);
    res.send("User updated");
});
exports["default"] = router;
