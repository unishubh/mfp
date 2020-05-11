const fetchClientInfobox = require("../clientApi/fetchDashboardData");

const infoBoxHandler = async (req, res) =>{
    const id = req.id;
    users = await fetchClientInfobox.getUserCount(id);
    unqUsers = await fetchClientInfobox.getUniqueUserCount(id);
    msgs = await fetchClientInfobox.getMsgCount(id);
    usrToday = await fetchClientInfobox.getUserTodayCount(id);
    res.json({usrCnt: users[0].count, unqUsrCnt: unqUsers[0].count, msgCnt: msgs[0].count, usrTodayCnt: usrToday[0].count});
}

module.exports = {
    infoBoxHandler
};