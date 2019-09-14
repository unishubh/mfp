"use strict";

const express = require("express");
const {urlencoded, json} = require("body-parser");
const crypto = require("crypto");
const path = require("path");
const Receive = require("./services/receive");
const GraphAPi = require("./services/graph-api");
//const User = require ("./services/user");
const config = require("./services/config");
const i18n = require("./i18n.config");
const app = express();
const webhooks = require('./controllers/webhooks');
const profile = require('./controllers/profile');

var users = {};

// Parse application/x-www-form-urlencoded
app.use(
    urlencoded({
        extended: true
    })
);

// Parse application/json. Verify that callback came from Facebook
app.use(json({verify: verifyRequestSignature}));

// Serving static files in Express
app.use(express.static(path.join(path.resolve(), "public")));

// Set template engine in Express
app.set("view engine", "ejs");

// Respond with index file when a GET request is made to the homepage
app.get("/", function (_req, res) {
    res.render("index");
});

// Adds support for GET requests to our webhook
app.get("/webhook", webhooks.webHookVerifier);

// Creates the endpoint for your webhook
app.post("/webhook", webhooks.webhookHandler);

// Set up your App's Messenger Profile
app.get("/profile", profile.profile);

app.post('/close', function (req, res) {

    let user = {
        psid: req.body.uid,
    };
    req.body.user = user;
    req.body.formCallBack = true;
    req.body.success = true;
    console.log(req.body);
    let receiveMessage = new Receive(req.body.user, req.body);
    return receiveMessage.handleMessage();

})

// Verify that the callback came from Facebook.
function verifyRequestSignature (req, res, buf) {
    let signature = req.headers["x-hub-signature"];

    if ( !signature ) {
        console.log("Couldn't validate the signature.");
    } else {
        let elements = signature.split("=");
        let signatureHash = elements[1];
        let expectedHash = crypto
            .createHmac("sha1", config.appSecret)
            .update(buf)
            .digest("hex");
        if ( signatureHash !== expectedHash ) {
            throw new Error("Couldn't validate the request signature.");
        }
    }
}

// Check if all environment variables are set
config.checkEnvVariables();

// listen for requests :)
var listener = app.listen(config.port, function () {
    console.log("Your app is listening on port " + listener.address().port);

    if ( Object.keys(config.personas).length === 0 && config.appUrl && config.verifyToken ) {
        console.log(
            "Is this the first time running?\n" +
            "Make sure to set the both the Messenger profile, persona " +
            "and webhook by visiting:\n" +
            config.appUrl +
            "/profile?mode=all&verify_token=" +
            config.verifyToken
        );
    }

    if ( config.pageId ) {
        console.log("Test your app by messaging:");
        console.log("https://m.me/" + config.pageId);
    }
});
