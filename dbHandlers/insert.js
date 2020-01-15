const conn = require('../configs/mysql');

module.exports.insertUser = (name, fbID, email, phone, gender) => {
    let data = [ name, fbID, email, phone, gender ];
    conn.query("INSERT INTO Users (name, fbid, email, phone, gender) VALUES (?,?,?,?,?)", data, (err, result) => {
        if ( err ) {
            console.log("Could not save data for user ", name, "because", err);
        } else {
            console.log("Successfully saved user ", name);
        }
    });
};

module.exports.insertMessage = (user_id, type, message) => {
    let data = [ user_id, type, message ];
    conn.query("INSERT INTO Messages (user_id, type, message) VALUES (?,?,?)", data, (err, result) => {
        if ( err ) {
            console.log("Could not save message for user ", user_id, "because", err);
        } else {
            console.log("Successfully saved message for user ", user_id);
        }
    });
};

module.exports.insertServiceRequest = async (user_id, details) => {
    return new Promise((resolve, reject) => {
        let data = [ user_id, details ];
        conn.query("INSERT INTO Service_requests (user_id, details) VALUES (?,?)", data, (err, result) => {
            if ( err ) {
                console.log("Could not save service request for user ", user_id, "because", err);
                reject(false);
            } else {
                console.log("Successfully saved message for user ", user_id);
                resolve(true);
            }
        });
    });
};

module.exports.insertInvestmentAccountRequest = async (user_id, dob, address, mobile, email, nominee, bank, pan, ifsc) => {
    return new Promise((resolve, reject) => {
        let data = [ user_id, dob, address, mobile, email, nominee, bank, pan, ifsc ];
        conn.query("INSERT INTO Investment_account (user_id, dob, address, mobile, email, nominee, bank, pan, ifsc) VALUES (?,?,?,?,?,?,?,?,?)", data, (err, result) => {
            if ( err ) {
                console.log("Could not save investment account  request for user ", user_id, "because", err);
                reject(false);
            } else {
                console.log("Successfully saved investment account request for user ", user_id);
                resolve(true);
            }
        });
    });
};

module.exports.insertAssistanceRequest = async (user_id, email, phone, city, details) => {
    return new Promise((resolve, reject) => {
        let data = [ user_id, email, phone, city, details ];
        conn.query("INSERT INTO Assistance_requests (user_id, email, phone, city, details) VALUES (?,?,?,?,?)", data, (err, result) => {
            if ( err ) {
                console.log("Could not save assistance request  request for user ", user_id, "because", err);
                reject(false);
            } else {
                console.log("Successfully saved assistance request request for user ", user_id);
                resolve(true);
            }
        });
    });
};

