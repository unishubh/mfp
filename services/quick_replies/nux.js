"use strict";

// Imports dependencies
const Response = require("../response");
const config = require("../config");
const i18n = require("../../i18n.config");
const links = require("../../constants/dataStore");

module.exports = class Nux {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    handlePayload(payload) {
        let response;
        switch (payload) {
            case "NUX_OLD" : {
                response = Response.genQuickReply(i18n.__("menu.investor"), [
                    {
                        title: "Test",
                        payload: "Test"
                    }
                ]);
              break;
            }
            case "NUX_NEW" : {
                console.log("Dealing with non investor");
                response = Response.genQuickReply(i18n.__("menu.nonInvestor"),[

                    {
                        title: i18n.__("menu.intro"),
                        payload: "NUX_INTRO"
                    },
                    {
                        title: i18n.__("menu.risk"),
                        payload: "RISK"
                    },
                    {
                        title: i18n.__("menu.plan"),
                        payload: "PLAN"
                    },
                    {
                        title: i18n.__("menu.calculate"),
                        payload: "CALCULATE",
                    },
                    {
                        title: i18n.__("menu.invest"),
                        payload: "INVEST"
                    },
                    {
                        title: i18n.__("menu.support"),
                        payload: "TALK"
                    },


                ]);
                break;
            }
            case "NUX_INTRO" : {

                break;
            }
        }

        return response;
    }
};
