const Investment = require("./investment");
const Care = require("./care");
const Nux = require("./nux");
const Plan = require("./plan");
const Calculator = require("./calculator");
const Risk = require("./risk");
const Existing = require("./Existing");
const Service = require("./service");
const Explore = require("./explore");
const NewUser = require("./newUser");
const Goal = require("./goal");
const Assistance = require("./assistance");

const Response = require("../response");
const GraphAPi = require("../graph-api");

module.exports = class QuickReplyHandler {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    getHandler () {
        let payload = this.webhookEvent.message.quick_reply.payload;
        console.log("Resonse payload from quick reply ", payload);
        return this.handlePayload(payload);

    }

    handlePayload (payload) {
        console.log("Received Payload:", `${ payload } for ${ this.user.psid }`);

        // Log CTA event in FBA
        GraphAPi.callFBAEventsAPI(this.user.psid, payload);

        let response, handler;

        // Set the response based on the payload
        if (
            payload === "GET_STARTED" ||
            payload === "DEVDOCS" ||
            payload === "GITHUB"
        ) {
            response = Response.genNuxMessage(this.user);
        } else if ( payload.includes("INVEST") ) {
            handler = new Investment(this.user, this.webhookEvent);
        } else if ( payload.includes("PLAN") ) {
            handler = new Plan(this.user, this.webhookEvent);

        } else if ( payload.includes("CARE") ) {
            handler = new Care(this.user, this.webhookEvent);

        } else if ( payload.includes("NUX") ) {
            handler = new Nux(this.user, this.webhookEvent);

        } else if ( payload.includes("RISK") ) {
            handler = new Risk(this.user, this.webhookEvent);

        } else if ( payload.includes("CALCULATOR") ) {
            handler = new Calculator(this.user, this.webhookEvent);

        } else if ( payload.includes("OLD") ) {
            handler = new Existing(this.user, this.webhookEvent);
        } else if ( payload.includes("SERVICE") ) {
            handler = new Service(this.user, this.webhookEvent);
        } else if ( payload.includes("ASSIST") ) {
            handler = new Assistance(this.user, this.webhookEvent);
        } else if ( payload.includes("EXPLORE") ) {
            handler = new Explore(this.user, this.webhookEvent);
        } else if ( payload.includes("NEW") ) {
            handler = new NewUser(this.user, this.webhookEvent);
        } else if ( payload.includes("GOAL") ) {
            handler = new Goal(this.user, this.webhookEvent);
        } else {
            response = {
                text: `This is a default postback message for payload: ${ payload }!`
            };
            return response;
        }

        return handler.handlePayload(payload);
    }

}