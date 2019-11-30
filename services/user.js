"use strict";

class User {
    constructor (psid) {
        this.psid = psid;
        this.firstName = "";
        this.lastName = "";
        this.locale = "";
        this.timezone = "";
        this.gender = "neutral";
        this.email = "";
        this.isMember = false;
        this.risk = "";
        this.roi = 0;
    }

    setProfile (profile) {
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.locale = profile.locale;
        this.timezone = profile.timezone;
        if ( profile.gender ) {
            this.gender = profile.gender;
        }
        if ( profile.email ) {
            this.email = profile.email;
        }
    }

    setRoi (roi) {
        this.roi = roi;
    }
};
let users = {};
let getUser = (psid) => {
    return users[psid];
}
module.exports = {
    User,
    getUser,
    users
}

