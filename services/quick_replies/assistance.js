"use strict";

// Imports dependencies
const Response = require("../response");
const config = require("../config");
const i18n = require("../../i18n.config");
const links = require("../../constants/dataStore");
const templates = require("../../constants/templates");

module.exports = class Assistance {
   constructor (user, webhookEvent) {
       this.user =user;
       this.webhookEvent = webhookEvent;
   }
    handlePayload(payload) {
       let responses ;
       responses = Response.genQuickReply("Please select what sort of assistance do you need",
           [
               {
                   title: "SIP Calculator",
                   payload:"CALCULATOR"
               },
               {
                   title:"Goal Planning",
                   payload: "GOAL"
               },
               {
                   title:"Personal Assistance",
                   payload:"SERVICE"
               }
           ]);
       return responses;
   }
};