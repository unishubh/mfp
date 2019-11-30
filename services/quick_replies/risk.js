"use strict";

// Imports dependencies
const Response = require("../response");
const config = require("../config");
const i18n = require("../../i18n.config");
const links = require("../../constants/dataStore");

module.exports = class Risk {
    constructor (user, payload) {
        this.user = user;
        this.payload = payload;
    }

    handlePayload (payload) {
        let buttons = [
            Response.genWebUrlButton(
                i18n.__("risk.take_risk_analysis.prompt"),
                `${ config.shopUrl }/risk.html`,
            ),
        ];


        return Response.genGenericTemplate(
            `https://images.squarespace-cdn.com/content/v1/5c66186be8ba44af4272f756/1555346027018-T6M19V705O46YTH5NZDR/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/Male_Dinner.jpg?format=1000w`,
            "Title",
            "Subtitle",
            buttons
        );

        //return response;
    }
};