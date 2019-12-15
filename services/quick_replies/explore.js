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
        response = Response.genButtonTemplate("Want to explore more options ?", [
            Response.genPostbackButton("SIP Calculator", "CALCULATOR"),
            Response.genPostbackButton("EMI Calculator", "CALCULATOR"),
            Response.genPostbackButton("Goal Planning","GOAL")
        ]);

        let studyTemplate = Response.genButtonTemplate("Know more about Mutual Funds", [
            Response.genWebUrlButton("Blog", "https://www.smartscribs.com"),
            Response.genWebUrlButton("Videos", "https://www.smartscribs.com")
        ]);
        let template = await templates.shareTemplate();

        return [ studyTemplate, template, response ];


    }
};