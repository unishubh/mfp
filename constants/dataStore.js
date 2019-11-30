const config = require("../services/config");

const dataStore = {
    "name": "PLAN",
    "options": {
        "sip": "PLAN_SIP",
        "wealth": "PLAN_WEALTH",
        "education": "PLAN_EDUCATION",
        "retirement": "PLAN_RETIREMENT",
    }
};

let fundLinkImage = `https://images.squarespace-cdn.com/content/v1/5c66186be8ba44af4272f756/1555346027018-T6M19V705O46YTH5NZDR/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/Male_Dinner.jpg?format=1000w`;
let fundLinkTitle = `Title`;
let fundsLinkSubtitle = `Sub`;

module.exports.fundsLink = {
    "INVEST_TAX": {
        url: `${ config.shopUrl }`,
        image: fundLinkImage,
        title: fundLinkTitle,
        subtitle: fundsLinkSubtitle,

    },
    "INVEST_LIQUID": {
        url: "https://trinityinvestcon.com/liquid_fund/",
        image: fundLinkImage,
        title: fundLinkTitle,
        subtitle: fundsLinkSubtitle,

    },
    "INVEST_SMALLCAP": {
        url: "https://trinityinvestcon.com/investment/equity_funds/small_cap_fund/",
        image: fundLinkImage,
        title: fundLinkTitle,
        subtitle: fundsLinkSubtitle,

    },
    "INVEST_LARGECAP": {
        url: "https://trinityinvestcon.com/investment/equity_funds/large_cap_fund/",
        image: fundLinkImage,
        title: fundLinkTitle,
        subtitle: fundsLinkSubtitle,

    },
    "INVEST_MULTICAP": {
        url: "https://trinityinvestcon.com/investment/equity_funds/multi_cap_fund/",
        image: fundLinkImage,
        title: fundLinkTitle,
        subtitle: fundsLinkSubtitle,

    },
    "INVEST_MIDCAP": {
        url: "https://trinityinvestcon.com/investment/equity_funds/mid_cap_fund/",
        image: fundLinkImage,
        title: fundLinkTitle,
        subtitle: fundsLinkSubtitle,

    },

};

module.exports.servieForm = "open.html";
module.exports.GenericTemplateImage = fundLinkImage;
module.exports.phone = "8989529628";
module.exports.androidUrl = "https://www.smartscribs.com";
module.exports.iosUrl = "https://www.smartscribs.com";
module.exports.calculatorLink = 'http://www.mutualfundcalculators.com';
module.exports.otherInvestmentsLink = "https://trinityinvestcon.com/investment/mutual_funds/top-mf.html";
module.exports.website = "trinityinvestcon.com";