const config = require('../services/config');
const GraphAPi = require('../services/graph-api');
const i18n = require('../i18n.config');
const Receive = require('../services/receive');
const Investcon = require('../services/investcon');
let {User, users} = require('../services/user');
const dbHandlerFetch = require('../dbHandlers/fetch');
const dbHandlerInser = require('../dbHandlers/insert');
//const users = User.users;

let webhookHandler = async (req, res) => {
    console.log('webhook');
    let body = req.body;

    if ( body.object === "page" ) {
        res.status(200).send("EVENT_RECEIVED");

        for ( const entry of body.entry ) {
            let webhookEvent = entry.messaging[0];
            if ( "read" in webhookEvent ) {
                console.log("Got a read event");
                continue;
            }

            if ( "delivery" in webhookEvent ) {
                console.log("Got a delivery event");
                continue;
            }

            let senderPsid = webhookEvent.sender.id;
            userExists = await dbHandlerFetch.getUser(senderPsid);
            if ( userExists === 0 ) {
                let user = new User(senderPsid);

                GraphAPi.getUserProfile(senderPsid)
                    .then(userProfile => {
                        user.setProfile(userProfile);
                    })

                    .catch(error => {
                        // The profile is unavailable
                        console.log("Profile is unavailable:", error);
                    })
                    .finally(async () => {
                        user.isMember = await Investcon.isMember(senderPsid);
                        users[senderPsid] = user;
                        i18n.setLocale(user.locale);
                        console.log(
                            "New Profile PSID:",
                            senderPsid,
                            "with locale:",
                            i18n.getLocale()
                        );
                        dbHandlerInser.insertUser(user.firstName + " " + user.lastName, user.psid, user.email, user.phone, user.gender);
                        users[senderPsid].presentCommand = webhookEvent;
                        let receiveMessage = new Receive(users[senderPsid], webhookEvent);
                        return receiveMessage.handleMessage();

                    });
            } else {
                users[senderPsid] = userExists;
                users[senderPsid].secondLastCommand = users[senderPsid].lastCommand;
                users[senderPsid].lastCommand = users[senderPsid].presentCommand;
                users[senderPsid].presentCommand = webhookEvent;
                if ( isBackCommand(webhookEvent) ) {
                    if ( users[senderPsid].secondLastCommand !== "" ) {
                        let receiveMessage = new Receive(users[senderPsid], users[senderPsid].secondLastCommand);
                        receiveMessage.handleMessage();
                    } else {
                        let receiveMessage = new Receive(users[senderPsid], users[senderPsid].lastCommand);
                        receiveMessage.handleMessage();
                    }

                }

                i18n.setLocale(users[senderPsid].locale);
                console.log(
                    "Profile already exists PSID:",
                    senderPsid,
                    "with locale:",
                    i18n.getLocale()
                );
                let receiveMessage = new Receive(users[senderPsid], webhookEvent);
                receiveMessage.handleMessage();
            }

        }
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
};

let webHookVerifier = async (req, res) => {
    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Checks if a token and mode is in the query string of the request
    if ( mode && token ) {
        // Checks the mode and token sent is correct
        if ( mode === "subscribe" && token === config.verifyToken ) {
            // Responds with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
};


let riskHandler = async (req, res) => {
    let psid = req.body.data.psid;
    let roi = req.body.data.roi;

    res.status(200).send("Recieved");
    let userObj = users[req.body.data.uid];
    req.body.formCallBack = true;
    req.body.formType = "RISK";
    let receiveMessage = new Receive(userObj, req.body);
    return receiveMessage.handleMessage();


};


let investFormHandler = async (req, res) => {
    req.body.formCallBack = true;
    req.body.formType = "INVESTMENT";
    res.status(200).send("Recieved");
    console.log(req.body);
    let userObj = users[req.body.data.uid];
    dbHandlerInser.insertInvestmentAccountRequest(req.body.data.uid, req.body.data.dob, req.body.data.address, req.body.data.mobile, req.body.data.email, req.body.data.nominee_name, req.body.data.bank, req.body.data.pan, req.body.data.ifsc);
    let receiveMessage = new Receive(userObj, req.body);
    return receiveMessage.handleMessage();
};

let assistanceRequestHandler = async (req, res) => {
    req.body.formCallBack = true;
    req.body.formType = "ASSISTANCE";
    res.status(200).send("Recieved");
    console.log(req.body);
    let userObj = users[req.body.data.uid];
    await dbHandlerInser.insertAssistanceRequest(req.body.data.uid, req.body.data.email, req.body.data.mobile, req.body.data.city, req.body.data.investment);
    let receiveMessage = new Receive(userObj, req.body);
    return receiveMessage.handleMessage();
};


let isBackCommand = (webhookEvent) => {

    try {
        return webhookEvent.message.text.toLowerCase() === "back";

    } catch ( e ) {
        return false;

    }
};

module.exports = {
    webhookHandler,
    webHookVerifier,
    users,
    riskHandler,
    investFormHandler,
    assistanceRequestHandler,
};