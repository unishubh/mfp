module.exports.getGreetings = async () => {
    let d = new Date();
    let time = d.getHours();
    if(time <12){
        return "Good Morning";
    } else if (time > 12) {
        return "Good Afternoon";
    }
};