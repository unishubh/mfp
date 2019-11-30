"use strict";

const i18n = require("../i18n.config");
const utils = require("../utils/utils");

module.exports = class Response {
    static genQuickReply (text, quickReplies) {
        let response = {
            text: text,
            quick_replies: []
        };

        for ( let quickReply of quickReplies ) {
            response["quick_replies"].push({
                content_type: "text",
                title: quickReply["title"],
                payload: quickReply["payload"]
            });
        }

        return response;
    }

    static genGenericTemplate (image_url, title, subtitle, buttons) {
        let response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [
                        {
                            title: title,
                            subtitle: subtitle,
                            image_url: image_url,
                            buttons: buttons
                        }
                    ]
                }
            }
        };

        return response;
    }

    static genImageTemplate (image_url, title, subtitle = "") {
        let response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [
                        {
                            title: title,
                            subtitle: subtitle,
                            image_url: image_url
                        }
                    ]
                }
            }
        };

        return response;
    }

    static genButtonTemplate (title, buttons) {
        let response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: title,
                    buttons: buttons
                }
            }
        };

        return response;
    }

    static genText (text) {
        let response = {
            text: text
        };

        return response;
    }

    static genTextWithPersona (text, persona_id) {
        let response = {
            text: text,
            persona_id: persona_id
        };

        return response;
    }

    static genPostbackButton (title, payload) {
        let response = {
            type: "postback",
            title: title,
            payload: payload
        };

        return response;
    }

    static genWebUrlButton (title, url) {
        let response = {
            type: "web_url",
            title: title,
            url: url
        };

        return response;
    }

    static genWebUrlButtonExtension (title, url) {
        let response = {
            type: "web_url",
            title: title,
            url: url,
            messenger_extensions: true
        };

        return response;
    }

    static genPhoneButton (title, phoneNumber) {
        let response = {
            type: "phone_number",
            title,
            payload: phoneNumber
        }
        return response;
    }

    static async genNuxMessage (user) {


        let welcome = this.genText(
            i18n.__("get_started.welcome", {
                userFirstName: user.firstName,
                greetings: await utils.getGreetings()
            })
        );


        let intro = this.genText(i18n.__("get_started.intro", {
            botName: "MoneyBhai"
        }));

        let isInvestor = this.genQuickReply(i18n.__("get_started.question"), [
            {
                title: "Already an investor",
                payload: "OLD"
            },
            {
                title: "New to investment",
                payload: "NEW"
            }

        ]);
        let nuxMessages = [ welcome, intro, isInvestor ];


        return nuxMessages;
    }
};
