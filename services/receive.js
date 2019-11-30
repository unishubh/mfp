"use strict";

const GraphAPi = require("./graph-api");
const Handler = require("./getHandler");

module.exports = class Receive {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }

    async handleMessage () {
        const handler = new Handler(this.user, this.webhookEvent);
        let responses = await handler.getHanlder();

        if ( Array.isArray(responses) ) {
            let delay = 0;
            for ( let response of responses ) {
                this.sendMessage(response, delay * 2000);
                delay++;
            }
        } else {
            this.sendMessage(responses);
        }
    }

    // handleTextMessage () {
    //     console.log(
    //         "Received text:",
    //         `${ this.webhookEvent.message.text } for ${ this.user.psid }`
    //     );
    //
    //     // check greeting is here and is confident
    //     let greeting = this.firstEntity(this.webhookEvent.message.nlp, "greetings");
    //
    //     let message = this.webhookEvent.message.text.trim().toLowerCase();
    //
    //     let response;
    //
    //     if (
    //         (greeting && greeting.confidence > 0.8) ||
    //         message.includes("start over")
    //     ) {
    //         response = Response.genNuxMessage(this.user);
    //     } else if ( Number(message) ) {
    //         response = Order.handlePayload("ORDER_NUMBER");
    //     } else if ( message.includes("#") ) {
    //         response = Survey.handlePayload("CSAT_SUGGESTION");
    //     } else if ( message.includes(i18n.__("care.help").toLowerCase()) ) {
    //         let care = new Care(this.user, this.webhookEvent);
    //         response = care.handlePayload("CARE_HELP");
    //     } else {
    //         response = [
    //             Response.genText(
    //                 i18n.__("fallback.any", {
    //                     message: this.webhookEvent.message.text
    //                 })
    //             ),
    //             Response.genText(i18n.__("get_started.guidance")),
    //             Response.genQuickReply(i18n.__("get_started.help"), [
    //                 {
    //                     title: i18n.__("menu.suggestion"),
    //                     payload: "CURATION"
    //                 },
    //                 {
    //                     title: i18n.__("menu.help"),
    //                     payload: "CARE_HELP"
    //                 }
    //             ])
    //         ];
    //     }
    //
    //     return response;
    // }

    // Handles message events with attachments
    // handleFormCallBack () {
    //     console.log("hadling formcallback");
    //     let phrase;
    //     if ( this.webhookEvent.success ) {
    //         phrase = "form.success"
    //     } else {
    //         phrase = "form.failure"
    //     }
    //     let response;
    //     response = [
    //         Response.genText(i18n.__(phrase))
    //     ];
    //     return response
    //
    // }

    // handleAttachmentMessage () {
    //     let response;
    //
    //     // Get the attachment
    //     let attachment = this.webhookEvent.message.attachments[0];
    //     console.log("Received attachment:", `${ attachment } for ${ this.user.psid }`);
    //
    //     response = Response.genQuickReply(i18n.__("fallback.attachment"), [
    //         {
    //             title: i18n.__("menu.help"),
    //             payload: "CARE_HELP"
    //         },
    //         {
    //             title: i18n.__("menu.start_over"),
    //             payload: "GET_STARTED"
    //         }
    //     ]);
    //
    //     return response;
    // }

    // // Handles mesage events with quick replies
    // handleQuickReply () {
    //     // Get the payload of the quick reply
    //     let payload = this.webhookEvent.message.quick_reply.payload;
    //     console.log("Resonse payload from quick reply ", payload);
    //     return this.handlePayload(payload);
    // }

    // Handles postbacks events
    // handlePostback () {
    //     let postback = this.webhookEvent.postback;
    //     // Check for the special Get Starded with referral
    //     let payload;
    //     if ( postback.referral && postback.referral.type == "OPEN_THREAD" ) {
    //         payload = postback.referral.ref;
    //     } else {
    //         // Get the payload of the postback
    //         payload = postback.payload;
    //     }
    //     return this.handlePayload(payload.toUpperCase());
    // }

    // Handles referral events
    // handleReferral () {
    //     // Get the payload of the postback
    //     let payload = this.webhookEvent.referral.ref.toUpperCase();
    //
    //     return this.handlePayload(payload);
    // }


    sendMessage (response, delay = 0) {
        // Check if there is delay in the response
        if ( "delay" in response ) {
            delay = response["delay"];
            delete response["delay"];
        }

        // Construct the message body
        let requestBody = {
            recipient: {
                id: this.user.psid
            },
            message: response
        };

        // Check if there is persona id in the response
        if ( "persona_id" in response ) {
            let persona_id = response["persona_id"];
            delete response["persona_id"];

            requestBody = {
                recipient: {
                    id: this.user.psid
                },
                message: response,
                persona_id: persona_id
            };
        }

        setTimeout(() => GraphAPi.callSendAPI(requestBody), delay);
    }


};
