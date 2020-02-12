"use strict";

// Imports dependencies
const Response = require("../response");

module.exports = class GetStarted {
    constructor(user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    handlePayload(payload) {
        let responses;
        responses = Response.genNuxMessage(this.user);
        return responses;
    }
};