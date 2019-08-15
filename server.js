"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
let hbs = require('express-hbs');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

require('dotenv').config();

// Do Registration routes.
var routes = require('./routes');
routes(app);

// Set static content.
app.use('/', express.static('./public'));

// Set view template engine for file extension server.view.html
app.engine('server.view.html', hbs.express4({
    extname: '.server.view.html',
    defaultLayout: 'views/layouts/_layout.server.view.html'
}));

hbs.registerHelper('checkWorkTypeTrigger', function (workTypeTrigger, typeTrigger, options) {
    if (parseInt(workTypeTrigger) === typeTrigger) {
        return options.fn(this);
    }
    return options.inverse(this);
});

hbs.registerHelper("checkedIf", function (condition) {
    return (condition) ? "checked" : "";
});

// Set view engine
app.set('view engine', 'server.view.html');

// Set views folder
app.set('views', './views');

// app.use('/', express.static('./public'));

app.listen(port, function (err) {
    if (err) {
        console.error('Something error !!');
        console.error(err);
    }

    console.log('App listen on port ' + port);
});