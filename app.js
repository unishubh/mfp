"use strict";

const express = require("express");
const {urlencoded, json} = require("body-parser");
const crypto = require("crypto");
const path = require("path");
const Receive = require("./services/receive");
const GraphAPi = require("./services/graph-api");
const User = require("./services/user");
const config = require("./services/config");
const i18n = require("./i18n.config");
const app = express();
const webhooks = require('./controllers/webhooks');
const profile = require('./controllers/profile');
const dbHandlerInsert = require("./dbHandlers/insert");

// Parse application/x-www-form-urlencoded
app.use(
    urlencoded({
        extended: true
    })
);

app.use(json({verify: verifyRequestSignature}));
app.use(express.static(path.join(path.resolve(), "public")));
app.set("view engine", "ejs");
app.get("/", function (_req, res) {
    res.render("index");
});

//Add the apis
app.post("/test", (req, res) => {

    console.log("Testing");
    res.status(200).send("Recieved");


});
app.get("/webhook", webhooks.webHookVerifier);
app.post("/webhook", webhooks.webhookHandler);
app.get("/profile", profile.profile);
app.post("/risk", webhooks.riskHandler);
app.post("/personalAssistance", webhooks.assistanceRequestHandler);
app.post('/close', async function (req, res) {

    req.body.formCallBack = true;
    req.body.formType = "SERVICE";
    res.status(200).send("Recieved");
    console.log(req.body);
    let userObj = User.getUser(req.body.data.uid);
    dbHandlerInsert.insertServiceRequest(req.body.data.uid, req.body.data.details);
    let receiveMessage = new Receive(userObj, req.body);
    return receiveMessage.handleMessage();

});
app.post("/investForm", webhooks.investFormHandler);

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
