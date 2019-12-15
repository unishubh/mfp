"use strict";

// Imports dependencies
const Response = require("../response");
const config = require("../config");
const i18n = require("../../i18n.config");
const datastore = require("../../constants/dataStore");
const template = require("../../constants/templates");

module.exports = class Goals {
    constructor (user, payload) {
        this.user = user;
        this.payload = payload;
    }

    async handlePayload (payload) {
        let response;
        switch ( payload ) {
            case "GOAL" : {
                let buttons = [];
                buttons = datastore.goals.map(goal => Response.genWebUrlButton(goal.name, goal.url));
                let appButtons = await template.getAppButtons();
                response = Response.genButtonTemplate("Please choose an appropriate option", buttons);
            }
                break;
        }

        return response;
    }
};