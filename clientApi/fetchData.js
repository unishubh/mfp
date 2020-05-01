const conn = require('../configs/mysql');

module.exports.getUsers = (client_id) =>{
    return new Promise((resolve, reject) =>{
        conn.query("SELECT id, name, email, phone, gender FROM Users WHERE client_id= ?", [client_id], (err, result) =>{
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

module.exports.getMessages = (client_id, user_id) =>{
    return new Promise((resolve, reject) =>{
        conn.query("SELECT message, sent_at FROM Messages WHERE client_id=? AND user_id=?", 
        [client_id, user_id], (err, result) =>{
            if(err){
                console.log("error- ",err);
                reject(false);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });   
};

module.exports.getServices = (client_id) =>{
    return new Promise((resolve, reject) =>{
        conn.query("SELECT s.id, u.name, s.details, s.time_received, s.resolved_at, s.is_resolved FROM Users u JOIN Service_requests s ON (u.id=s.user_id) WHERE s.client_id = ?",
        client_id, (err, result) =>{
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

