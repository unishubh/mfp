let profile = async (req, res) => {
    let token = req.query["verify_token"];
    let mode = req.query["mode"];

    if (!config.webhookUrl.startsWith("https://")) {
        res.status(200).send("ERROR - Need a proper API_URL in the .env file");
    }
    var Profile = require("./services/profile.js");
    Profile = new Profile();

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
        if (token === config.verifyToken) {
            if (mode == "webhook" || mode == "all") {
                Profile.setWebhook();
                res.write(
                    `<p>Set app ${config.appId} call to ${config.webhookUrl}</p>`
                );
            }
            if (mode == "profile" || mode == "all") {
                Profile.setThread();
                res.write(`<p>Set Messenger Profile of Page ${config.pageId}</p>`);
            }
            if (mode == "personas" || mode == "all") {
                Profile.setPersonas();
                res.write(`<p>Set Personas for ${config.appId}</p>`);
                res.write(
                    "<p>To persist the personas, add the following variables \
                    to your environment variables:</p>"
                );
                res.write("<ul>");
                res.write(`<li>PERSONA_BILLING = ${config.personaBilling.id}</li>`);
                res.write(`<li>PERSONA_CARE = ${config.personaCare.id}</li>`);
                res.write(`<li>PERSONA_ORDER = ${config.personaOrder.id}</li>`);
                res.write(`<li>PERSONA_SALES = ${config.personaSales.id}</li>`);
                res.write("</ul>");
            }
            if (mode == "nlp" || mode == "all") {
                GraphAPi.callNLPConfigsAPI();
                res.write(`<p>Enable Built-in NLP for Page ${config.pageId}</p>`);
            }
            if (mode == "domains" || mode == "all") {
                Profile.setWhitelistedDomains();
                res.write(`<p>Whitelisting domains: ${config.whitelistedDomains}</p>`);
            }
            res.status(200).end();
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    } else {
        // Returns a '404 Not Found' if mode or token are missing
        res.sendStatus(404);
    }
};

export {
    profile,
}