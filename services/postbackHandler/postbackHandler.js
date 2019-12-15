const QuickRepliesHandler = require("../quick_replies/quickReplyHandler");

module.exports = class PostbackHandler {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    getHandler () {
        console.log("Hsndling payoad ");
        return this.handlePostback();

    }

    handlePostback () {
        let postback = this.webhookEvent.postback;
        // Check for the special Get Starded with referral
        let payload;
        if ( postback.referral && postback.referral.type == "OPEN_THREAD" ) {
            payload = postback.referral.ref;
        } else {
            // Get the payload of the postback
            payload = postback.payload;
        }
        let handler = new QuickRepliesHandler(this.user, this.webhookEvent);
        return handler.handlePayload(payload.toUpperCase());
    }
}