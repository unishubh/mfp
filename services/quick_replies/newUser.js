"use strict";

// Imports dependencies
const Response = require("../response");
const config = require("../config");
const i18n = require("../../i18n.config");
const links = require("../../constants/dataStore");

module.exports = class NewUser {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    handlePayload () {
        let response = Response.genQuickReply("Please choose an option from below", [
            {
                title: "Open an investment account",
                payload: "OPEN_INVESTMENT_ACCOUNT"
            },
            {
                title: "Know your Risk Degree",
                payload: "RISK"
            },
            {
                title: "Plan your Goals",
                payload: "GOAL"
            },
            {
                title: "Use Calculators and explore more",
                payload: "EXPLORE"
            }
        ]);
        return response;
    };
};