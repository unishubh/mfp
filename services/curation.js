"use strict";

// Imports dependencies
const Response = require ("./response"),
    config = require ("./config"),
    i18n = require ("../i18n.config");

module.exports = class Curation {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    handlePayload (payload) {
        let response;
        let outfit;

        switch (payload) {


            case "INVEST": //TODO add investment options here
                response = Response.genQuickReply (i18n.__ ("invest.prompt"), [
                    {
                        title: i18n.__ ("invest.existing"),
                        payload: "EXISTING"
                    },
                    {
                        title: i18n.__ ("invest.new"),
                        payload: "NEW"
                    }
                ]);
                break;

            case "PLAN": //TODO add investment plans here
                response = Response.genQuickReply (i18n.__ ("plan.prompt"), [
                    {
                        title: i18n.__ ("plan.education"),
                        payload: "PLAN_EDUCATION"
                    },
                    {
                        title: i18n.__ ("plan.sip"),
                        payload: "PLAN_SIP"
                    },
                    {
                        title: i18n.__ ("plan.retirement"),
                        payload: "PLAN_RETIREMENT"
                    },
                    {
                        title: i18n.__ ("plan.wealth"),
                        payload: "PLAN_WEALTH"
                    }
                ]);
                break;
            case "EXISTING" :

                break;

            case "NEW":
                break;

            case "PLAN_SIP":
                break;

            case "PLAN_WEALTH":
                break;

                case ""




        }

        return response;
    }

    genCurationResponse (payload) {
        let occasion = payload.split ("_")[3].toLowerCase ();
        let budget = payload.split ("_")[2].toLowerCase ();
        let outfit = `${this.user.gender}-${occasion}`;

        let buttons = [
            Response.genWebUrlButton (
                i18n.__ ("curation.shop"),
                `${config.shopUrl}/products/${outfit}`
            ),
            Response.genPostbackButton (
                i18n.__ ("curation.show"),
                "CURATION_OTHER_STYLE"
            )
        ];

        if (budget === "50") {
            buttons.push (
                Response.genPostbackButton (i18n.__ ("curation.sales"), "CARE_SALES")
            );
        }

        let response = Response.genGenericTemplate (
            `${config.appUrl}/styles/${outfit}.jpg`,
            i18n.__ ("curation.title"),
            i18n.__ ("curation.subtitle"),
            buttons
        );

        return response;
    }

    randomOutfit () {
        let occasion = ["work", "party", "dinner"];
        let randomIndex = Math.floor (Math.random () * occasion.length);

        return occasion[randomIndex];
    }
};
