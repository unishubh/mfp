const Response = require("../services/response");
const dataStore = require("./dataStore");
const i18n = require("../i18n.config");
let getAppButtons = module.exports.getAppButtons = async () => {
    let playStoreButton = Response.genWebUrlButton("Download Android App", dataStore.androidUrl);
    let appStoreButton = Response.genWebUrlButton("Download  IOS App", dataStore.iosUrl);
    return [ playStoreButton, appStoreButton ];
};
let FacebookTemplate = module.exports.FacebookTemplate = async () => {
    let buttons = [
        Response.genWebUrlButton("FB Page", dataStore.fbPage),
        Response.genWebUrlButton("FB Group", dataStore.fbGroup),
    ];
    return Response.genButtonTemplate("Connect with us on Facebook", buttons);
};

module.exports.generateInstantServiceTemplate = async () => {
    let callButton = await Response.genPhoneButton("Call us", dataStore.phone);
    let whatsAppButton = await Response.genWebUrlButton("Whatsapp US", dataStore.whatsApp);
    let appButtons = await getAppButtons();
    let buttons = [ callButton, whatsAppButton ];
    let appTemp = Response.genButtonTemplate("You can also try our app", appButtons);
    let text = Response.genText("Thanks for showing Interest in Investment with us , someone from the team will contact you in the next 24 Hour.\n")
    let abs = Response.genGenericTemplate(dataStore.GenericTemplateImage, i18n.__("service.title"), "", buttons);

    return [ text, abs, appTemp ];
};

module.exports.generateServiceResponseTemplate = async () => {

    let callButton = await Response.genPhoneButton("Call us", dataStore.phone);
    let whatsAppButton = await Response.genWebUrlButton("Whatsapp US", dataStore.whatsApp);
    let appButtons = await getAppButtons();
    let buttons = [ callButton, whatsAppButton ];
    let appTemp = Response.genButtonTemplate("You can also try our app", appButtons);
    let text = Response.genText("Thanks for raising your concern, someone from the team will contact you in the next 24 Hours.")
    let abs = Response.genGenericTemplate(dataStore.GenericTemplateImage, i18n.__("service.title"), "", buttons);
    let fbButtons = [
        Response.genWebUrlButton("FB Page", dataStore.fbPage),
        Response.genWebUrlButton("FB Group", dataStore.fbGroup),
    ];
    let fbTemplate = Response.genButtonTemplate("Connect with us on Facebook", fbButtons);
    return [ text, abs, appTemp, fbTemplate ];
};

module.exports.investmentTemplateMobile = async () => {

    let buttons = await getAppButtons();
    return Response.genButtonTemplate("Invest through mobile", buttons);
};

module.exports.investTemplateWebsite = async () => {
    let buttons = [
        Response.genWebUrlButton("Invest in Saving Option", dataStore.investSaving),
        Response.genWebUrlButton("Invest in tax Saving options", dataStore.investTaxSaving),
        Response.genWebUrlButton("Other investing options", dataStore.investOthers),
    ];
    return Response.genButtonTemplate("Please choose an option", buttons);
};

module.exports.shareTemplate = async () => {
    let buttons = await getAppButtons();
    let visit = Response.genWebUrlButton("Visit Website", dataStore.website);
    buttons = [ ...buttons, visit ];
    return Response.genButtonTemplate("Please choose an option", buttons);
};
module.exports.MovingOutTemplate = () => {
    let response = Response.genText("External links will take you out of my domain, However you can anytime return to the char just by typing Hello");
    return response;
};