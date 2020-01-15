const Response = require("../response");
const i18n = require("../../i18n.config");
const templates = require("../../constants/templates");

module.exports = class FormCallbackHandler {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    getHandler () {
        console.log("Resonse payload from quick reply ", this.webhookEvent.formType);
        return this.handleFormCallBack();

    }

    async handleFormCallBack () {
        let payload = this.webhookEvent.formType;
        let response;
        if ( payload === "SERVICE" ) {
            response = await templates.generateServiceResponseTemplate();
        } else if ( payload === "INVESTMENT" ) {
            let temp = await templates.generateInstantServiceTemplate();
            response = temp;
        } else if ( payload === "RISK" ) {

            response = Response.genQuickReply("Thank you for calculating your risk tolerance. You are a [[random]] category investor and should target [[random]]% ROI. In case you want to edit preferances, you can Edit the Risk Degree", [
                {
                    title: "Edit Risk Score",
                    payload: "RISK"
                },
                {
                    title: "Proceed to Goal planning",
                    payload: "GOAL"
                }
            ])
        }
        else if (payload === "ASSISTANCE") {
            response = await templates.generateInstantServiceTemplate();
        }
        return response;
    }
};