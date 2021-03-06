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

        let studyTemplate =  templates.studyTemplate;
        let template = await templates.shareTemplate();
        let callTemplate = await templates.whatsAppandCallButton();

        return [ studyTemplate, template, response, callTemplate ];


    }
};