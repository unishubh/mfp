"use strict";

// Imports dependencies
const Response = require("../response");
const config = require("../config");
const i18n = require("../../i18n.config");
const links = require("../../constants/dataStore");

module.exports = class Existing {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    handlePayload () {

        let response = Response.genQuickReply(i18n.__("old.prompt"), [
            {
                title: i18n.__("old.need_service"),
                payload: "SERVICE"
            },
            {
                title: i18n.__("old.invest_more"),
                payload: "INVEST"
            },
            {
                title: i18n.__("old.assist"),
                payload: "ASSIST"
            }
        ]);
        return response;

    }
};
