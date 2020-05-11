const conn = require('../configs/mysql');

module.exports.getUserCount = (client_id) =>{
    return new Promise((resolve, reject) =>{
        conn.query("SELECT COUNT(IF(client_id=?, 1, NULL)) 'count' FROM Users;", [client_id], (err, result) =>{
            if(err){
                console.log("error- ", err);
                reject(false);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};

module.exports.getMsgCount = (client_id) =>{
    return new Promise((resolve, reject) =>{
        conn.query("SELECT COUNT(IF(client_id=?, 1, NULL)) 'count' FROM Messages;", [client_id], (err, result) =>{
            if(err){
                console.log("error- ", err);
                reject(false);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};

module.exports.getUniqueUserCount = (client_id) =>{
    return new Promise((resolve, reject) =>{
        conn.query("SELECT COUNT(IF(DATE(created_at)=CURRENT_DATE AND client_id=?, 1, NULL)) 'count' FROM Users;", [client_id], (err, result) =>{
            if(err){
                console.log("error- ", err);
                reject(false);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};

module.exports.getUserTodayCount = (client_id) =>{
    return new Promise((resolve, reject) =>{
        conn.query("SELECT COUNT(DISTINCT user_id) AS count FROM Messages WHERE client_id=? AND DATE(sent_at)=CURRENT_DATE;", [client_id], (err, result) =>{
            if(err){
                console.log("error- ", err);
                reject(false);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};