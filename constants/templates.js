const Response = require("../services/response");
const dataStore = require("./dataStore");
const i18n = require("../i18n.config");
let getAppButtons = async () => {
    let playStoreButton = Response.genWebUrlButton("Download Android App", dataStore.androidUrl);
    let appStoreButton = Response.genWebUrlButton("Download  IOS App", dataStore.iosUrl);
    return [ playStoreButton, appStoreButton ];
}

module.exports.generateGenericTemplate = async () => {

    let callButton = await Response.genPhoneButton("Call us", dataStore.phone);
    let whatsAppButton = await Response.genPhoneButton("Whatsapp US", dataStore.phone);
    let appButtons = await getAppButtons();
    let buttons = [ callButton, whatsAppButton];
    let appTemp = Response.genButtonTemplate("You can also try our app", appButtons);
    let text = Response.genText("Thanks for raising your concern, someone from the team will contact you in the next 24 Hours.")
    let abs =  Response.genGenericTemplate(dataStore.GenericTemplateImage, i18n.__("service.title"), "", buttons);
    return [text, abs, appTemp];
};

module.exports.investmentTemplateMobile = async () => {

    let buttons = await getAppButtons();
    return Response.genButtonTemplate("Invest through mobile", buttons);
};

module.exports.investTemplateWebsite = async () => {
    let buttons = [
        Response.genWebUrlButton("Invest in Saving Option", dataStore.calculatorLink),
        Response.genWebUrlButton("Invest in tax Saving options", dataStore.calculatorLink),
        Response.genWebUrlButton("Other investing options", dataStore.otherInvestmentsLink)
    ];
    return Response.genButtonTemplate("Please choose an option", buttons);
};

module.exports.shareTemplate = async () => {
    let buttons = await getAppButtons();
    let visit = Response.genWebUrlButton("Visit Website", dataStore.website);
    buttons = buttons.push(visit);
    return Response.genButtonTemplate("Please choose an option", buttons);
};
module.exports.MovingOutTemplate = () => {
    let response = Response.genText("You are now moving out of my domain, just type a Hello in messenger to talk to me again");
    return response;
}