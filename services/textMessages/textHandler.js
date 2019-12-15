const Response =require("../response");
const i18n = require("../../i18n.config");
const utils = require("../../utils/utils");
const templates = require("../../constants/templates");
const config = require("../config");
const dataStore = require('../../constants/dataStore');
module.exports = class TextHandler {
    constructor (user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }
   async getHandler() {
       console.log(
           "Received text:",
           `${ this.webhookEvent.message.text } for ${ this.user.psid }`
       );

       // check greeting is here and is confident
       let greeting = this.firstEntity(this.webhookEvent.message.nlp, "greetings");

       let message = this.webhookEvent.message.text.trim().toLowerCase();

       let response;

       if (
           (greeting && greeting.confidence > 0.8) ||
           message.includes("start over")
       ) {
           response = Response.genNuxMessage(this.user);
       } else if (this.webhookEvent.message.text === "test") {
           let buttons = [];
           buttons = dataStore.goals.map(goal => Response.genWebUrlButton(goal.name, goal.url));
           return Response.genButtonTemplate("Please choose an appropriate option", buttons);
       }else {
           response = [
               Response.genText(
                   i18n.__("fallback.any", {
                       message: this.webhookEvent.message.text
                   })
               ),
               Response.genText(i18n.__("get_started.guidance")),
               Response.genQuickReply(i18n.__("get_started.help"), [
                   {
                       title: i18n.__("menu.suggestion"),
                       payload: "CURATION"
                   },
                   {
                       title: i18n.__("menu.help"),
                       payload: "CARE_HELP"
                   }
               ])
           ];
       }

       return response;
   }

    firstEntity (nlp, name) {
        return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
    }
};

