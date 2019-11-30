"use strict";

// Imports dependencies
const Response = require("../response");
const config = require("../config");
const i18n = require("../../i18n.config");
const dataStore = require("../../constants/dataStore");

module.exports = class Calculator {
    constructor (user, payload) {
        this.user = user;
        this.payload = payload;
    }

    handlePayload (payload) {
        console.log("Handling calculation");
        let buttons = [
            Response.genWebUrlButton(
                i18n.__("calculator.prompt"),
                dataStore.calculatorLink
            ),
        ];


        return Response.genGenericTemplate(
            dataStore.GenericTemplateImage,
            "SIP Calculator | One tool for all your needs",
            "You can come back to the chat anytime",
            buttons
        );

        //return response;
    }
};