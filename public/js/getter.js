function getVariables (url, refdoc) {
    let parsedUrl = new URL(url);
    let psid = parsedUrl.searchParams.get("psid");
    // Proi = parsedUrl.searchParams.get("roi");
    // Ptime = parsedUrl.searchParams.get("time");
    // Pamount = parsedUrl.searchParams.get("amount");
    // time = (Ptime == null) ? 5 : Ptime;
    // amount = (Pamount == null) ? 2000 : Pamount;
    // roi = (Proi == null) ? 7 : Proi;
    console.log("getting here", psid);
    return psid;
}