const Response = require("../response");
const i18n = require("../../i18n.config");

module.exports = class AttachmentHandler {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    getHandler () {
        console.log("Resonse payload from quick reply ", payload);
        return this.handleAttachment(payload);

    }

    handleAttachment () {
        let response;

        // Get the attachment
        let attachment = this.webhookEvent.message.attachments[0];
        console.log("Received attachment:", `${ attachment } for ${ this.user.psid }`);

        response = Response.genQuickReply(i18n.__("fallback.attachment"), [
            {
                title: i18n.__("menu.help"),
                payload: "CARE_HELP"
            },
            {
                title: i18n.__("menu.start_over"),
                payload: "GET_STARTED"
            }
        ]);

        return response;
    }
}