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
                    config.shopUrl + '/' + links.investmentForm,
                );
                response = Response.genButtonTemplate("Please fill out this form", [ button ]);
                break;

            case "INVEST": //TODO add investment options here
                let web = await templates.investTemplateWebsite();
                let mobile = await templates.investmentTemplateMobile();
                let movingOut = templates.MovingOutTemplate();
                let assistance = Response.genQuickReply("Want more assistance ?", [ {
                    title: "Need Assistance",
                    payload: "ASSIST"
                }
                ]);
                response = [ movingOut, mobile, web, assistance ];
                //response = web;

                break;
        }

        return response;
    }


};