const config = require('../services/config');
const GraphAPi = require('../services/graph-api');
const i18n = require('../i18n.config');
const Receive = require('../services/receive');
const Investcon = require('../services/investcon');
let {User, users} = require('../services/user');
//const users = User.users;

let webhookHandler = async (req, res) => {
    console.log('webhook');
    let body = req.body;

    if ( body.object === "page" ) {
        res.status(200).send("EVENT_RECEIVED");

        body.entry.forEach(function (entry) {
            let webhookEvent = entry.messaging[0];
            if ( "read" in webhookEvent ) {
                console.log("Got a read event");
                return;
            }

            if ( "delivery" in webhookEvent ) {
                console.log("Got a delivery event");
                return;
            }

            let senderPsid = webhookEvent.sender.id;

            if ( !(senderPsid in users) ) {
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
                        let receiveMessage = new Receive (users[senderPsid], webhookEvent);
                        return receiveMessage.handleMessage ();

                    });
            } else {
                i18n.setLocale(users[senderPsid].locale);
                console.log(
                    "Profile already exists PSID:",
                    senderPsid,
                    "with locale:",
                    i18n.getLocale()
                );
                let receiveMessage = new Receive(users[senderPsid], webhookEvent);
                return receiveMessage.handleMessage();
            }

        });
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
    let psid = req.body.psid;
    let roi = req.body.roi;
    if ( !psid in users ) {
        console.log("Invalid user ID");
        res.sendStatus(400);
    } else {
        console.log(users[psid]);
        users[psid].setRoi(roi);
        res.sendStatus(200);
    }
};

module.exports = {
    webhookHandler,
    webHookVerifier,
    users,
    riskHandler,
}