"use strict";

// Imports dependencies
const Response = require("../response");
const config = require("../config");
const i18n = require("../../i18n.config");
const links = require("../../constants/dataStore");
const templates = require("../../constants/templates");

module.exports = class Investment {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    async handlePayload (payload) {
        let response;

        switch ( payload ) {
            case "OPEN_INVESTMENT_ACCOUNT":
                let button = Response.genWebUrlButtonExtension(
                    i18n.__("Open account form"),
                    config.shopUrl + '/' + links.investmentForm+"?psid="+this.user.psid,
                );
                response = Response.genButtonTemplate("Please fill out this form", [ button ]);
                break;

            case "KNOW_INVEST": //TODO add investment options here
                let web = await templates.investTemplateWebsite();
                let mobile = await templates.investmentTemplateMobile();
                let movingOut = templates.MovingOutTemplate();
                response = [ movingOut, mobile, web ];
                //response = web;

                break;

            case "INVEST":
                let template = Response.genButtonTemplate("Already Know where to invest?", [
                    Response.genPostbackButton("Yes, I know", "KNOW_INVEST")
                ]);

                let assistance = Response.genButtonTemplate("Need assistance in Investing ?", [
                    Response.genPostbackButton("I need assistance", "ASSIST")
                ]);

                response = [template, assistance];
        }

        return response;
    }


};