"use strict";

// Imports dependencies
const Response = require("./response");
const config = require("./config");
const i18n = require("../i18n.config");

module.exports = class Curation {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    handlePayload (payload) {
        let response;
        let outfit;

        switch ( payload ) {


            case "INVEST": //TODO add investment options here
                response = Response.genQuickReply(i18n.__("invest.prompt"), [
                    {
                        title: i18n.__("invest.existing"),
                        payload: "INVEST_EXISTING"
                    },
                    {
                        title: i18n.__("invest.new"),
                        payload: "INVEST_NEW"
                    }
                ]);
                break;


            case "INVEST_NEW":
                response = Response.genQuickReply(i18n.__("invest.prompt"), [
                    {
                        title: i18n.__("invest.register"),
                        payload: "INVEST_REGISTER"
                    },
                    {
                        title: i18n.__("invest.choose_funds"),
                        payload: "INVEST_CHOOSE"
                    },
                    {
                        title: i18n.__("invest.open_investment_account"),
                        payload: "INVEST_OPEN"
                    }
                ]);
                break;

            case "INVEST_EXISTING":
                response = Response.genQuickReply(i18n.__("invest.prompt"), [
                    {
                        title: i18n.__("invest.portfolio"),
                        payload: "INVEST_PORTFOLIO"
                    },
                    {
                        title: i18n.__("invest.choose_funds"),
                        payload: "INVEST_CHOOSE"
                    },
                    {
                        title: i18n.__("invest.open_investment_account"),
                        payload: "INVEST_OPEN"
                    }
                ]);
                break;
            case"INVEST_OPEN":
                response = this.genOpenInvestmentResponse(payload);
                console.log("response received");
                break;
            case "INVEST_CHOOSE":
                console.log("Chossing option");
                response = this.generateInvestmentOptions()
                break;
            case "INVEST_PORTFOLIO":
                break;
            case "INVEST_REGISTER":
                break;


        }

        return response;
    }

    genOpenInvestmentResponse (payload) {
        console.log("building template");
        // let occasion = payload.split("_")[3].toLowerCase();
        // let budget = payload.split("_")[2].toLowerCase();
        // let outfit = `${this.user.gender}-${occasion}`;

        let buttons = [
            Response.genWebUrlButton(
                i18n.__("open_invest_account.link"),
                `${ config.shopUrl }/open.html`,
            ),
            // Response.genPostbackButton(
            //     i18n.__("curation.show"),
            //     "CURATION_OTHER_STYLE"
            // )
        ];

        // if (budget === "50") {
        //     buttons.push(
        //         Response.genPostbackButton(i18n.__("curation.sales"), "CARE_SALES")
        //     );
        // }

        let response = Response.genGenericTemplate(
            `https://images.squarespace-cdn.com/content/v1/5c66186be8ba44af4272f756/1555346027018-T6M19V705O46YTH5NZDR/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/Male_Dinner.jpg?format=1000w`,
            i18n.__("open_invest_account.title"),
            i18n.__("open_invest_account.subtitle"),
            buttons
        );

        return response;
    }

    generateInvestmentOptions () {
        console.log("generatimg imvestment options");
        let investmentOptions = [ [ i18n.__("choose.tax"), "INVEST_TAX" ], [ i18n.__("choose.liquid"), "INVEST_LIQUID" ], [ i18n.__("choose.midcap"), "INVEST_MIDCAP" ], [ i18n.__("choose.largecap"), "INVEST_LARGECAP" ], [ i18n.__("choose.smallcap"), "INVEST_SMALLCAP" ], [ i18n.__("choose.multicap"), "INVEST_MULTICAP" ] ];

        let response = Response.genQuickReply(i18n.__("invest.prompt"), [
            {
                title: i18n.__(investmentOptions[0][0]),
                payload: investmentOptions[0][1]
            },
            {
                title: i18n.__(investmentOptions[0][0]),
                payload: investmentOptions[0][1]
            },
            {
                title: i18n.__(investmentOptions[1][0]),
                payload: investmentOptions[1][1]
            },
            {
                title: i18n.__(investmentOptions[2][0]),
                payload: investmentOptions[2][1]
            },
            {
                title: i18n.__(investmentOptions[3][0]),
                payload: investmentOptions[3][1]
            },
            {
                title: i18n.__(investmentOptions[4][0]),
                payload: investmentOptions[4][1]
            },
            {
                title: i18n.__(investmentOptions[5][0]),
                payload: investmentOptions[5][1]
            }
        ]);
        return response;
    }

    randomOutfit () {
        let occasion = [ "work", "party", "dinner" ];
        let randomIndex = Math.floor(Math.random() * occasion.length);

        return occasion[randomIndex];
    }
};