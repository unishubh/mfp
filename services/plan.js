"use strict";

// Imports dependencies
const Response = require("./response");
const config = require("./config");
const i18n = require("../i18n.config");

module.exports = class Plan {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    handlePayload (payload) {
        let response;
        let outfit;

        switch ( payload ) {

            case "PLAN": //TODO add investment plans here
                response = Response.genQuickReply(i18n.__("plan.prompt"), [
                    {
                        title: i18n.__("plan.education"),
                        payload: "PLAN_EDUCATION"
                    },
                    {
                        title: i18n.__("plan.sip"),
                        payload: "PLAN_SIP"
                    },
                    {
                        title: i18n.__("plan.retirement"),
                        payload: "PLAN_RETIREMENT"
                    },
                    {
                        title: i18n.__("plan.wealth"),
                        payload: "PLAN_WEALTH"
                    }
                ]);
                break;

            case  "PLAN_SIP":
                response = Response.genText("Planning Sip will be handled here");
                break;
            case "PLAN_EDUCATION":
                response = Response.genText("Planning child education will be dealt with here");
                break;
            case "PLAN_RETIREMENT":
                response = Response.genText("Planning retirement will be dealt with here");
                break;
            case "PLAN_WEALTH":
                response = Response.genText("Planning wealth will be dealt with here");
                break;
        }

        return response;
    }

};
