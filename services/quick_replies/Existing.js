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
        let response = Response.genButtonTemplate(i18n.__("get_started.question"), [
            Response.genPostbackButton(
                i18n.__("old.need_service"),
                "SERVICE"
            ),
            Response.genPostbackButton(
                i18n.__("old.invest_more"),
                "INVEST"
            ),
            Response.genPostbackButton(
                i18n.__("old.explore"),
                "EXPLORE"
            ),
        ]);
        return response;

    }
};
