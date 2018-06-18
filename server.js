//Підключаємо бібліотеки
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const mysql = require('mysql');
const fs = require('fs');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
    }
});

var upload = multer({
    storage: storage
});

//Клієнтська частина сайту знаходитиметься у папці public
app.use(express.static(__dirname + '/public'));
//Стандарти кодування
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));




//Upload images
app.post('/images', upload.any(), function (req, res, next) {
    res.sendStatus(200);
})

//Усі адреси контролюються клієнтським ангуляром
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//Запуск серверу
app.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});
