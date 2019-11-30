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
        if (payload === "SERVICE") {
            response = await templates.generateGenericTemplate();
        }
        return response;
    }
};