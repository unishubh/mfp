const QuickRepliesHandler = require("../quick_replies/quickReplyHandler");
module.exports = class ReferralHandler {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    getHandler () {
        console.log("Resonse payload from quick reply ", payload);
        return this.handleReferral();

    }
    handleReferral () {
        // Get the payload of the postback
        let payload = this.webhookEvent.referral.ref.toUpperCase();

        return this.handlePayload(payload);
    }
};