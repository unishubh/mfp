"use strict";

// Imports dependencies
const Response = require("../response");
const config = require("../config");
const i18n = require("../../i18n.config");
const links = require("../../constants/dataStore");
const templates = require("../../constants/templates");

module.exports = class Explore {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    async handlePayload (payload) {
        let response;
        response = Response.genQuickReply("Please select the appropriate option", [
            {
                title:"SIP Calculator",
                payload:"CALCULATOR"
            },
            {
                title: "EMI Calculator",
                payload: "CALCULATOR"
            },
            {
                title: "Goal Planning",
                payload: "GOAL"
            }
        ]);
        let template = await templates.shareTemplate();

        return [response, template];


    }
};