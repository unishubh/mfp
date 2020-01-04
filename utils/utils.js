module.exports.getGreetings = async () => {
    let d = new Date();
    let time = d.getHours();
    let greeting;
    if ( time < 10 ) {
        greeting = "Good morning";
    } else if ( time < 20 ) {
        greeting = "Good day";
    } else {
        greeting = "Good evening";
    }
    return greeting;
};