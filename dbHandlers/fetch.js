const conn = require('../configs/mysql');
const {User} = require('../services/user');

module.exports.getUser = async (fbID) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM Users WHERE fbid = ?", fbID, (err, data) => {
            if ( err ) {
                console.log("Could not fetch user ", user_id, "because", err);
                reject(false);
            } else {
                if ( data.length === 0 ) {
                    console.log("No user found for fbID ", fbID);
                    resolve(0);
                } else {
                    console.log("Unique user found for ", fbID);
                    let user = new User(fbID);
                    user.email = data.email;
                    user.phone = data.phone;
                    user.gender = data.gender;
                    user.email = data.email;
                    resolve(user);
                }
            }
        });
    });
};