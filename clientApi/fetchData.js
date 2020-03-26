const conn = require('../configs/mysql');

module.exports.getUsers = (client_id) =>{
    return new Promise((resolve, reject) =>{
        conn.query("SELECT name, email, phone, gender FROM Users WHERE client_id= ?", [client_id], (err, result) =>{
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

module.exports.getMessages = (client_id) =>{
    return new Promise((resolve, reject) =>{
        conn.query("SELECT u.name, m.message, m.sent_at FROM Users u JOIN Messages m ON (u.id=m.user_id) WHERE m.client_id = ?", 
        client_id, (err, result) =>{
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
        conn.query("SELECT u.name, s.details, s.time_received, s.resolved_at, s.is_resolved FROM Users u JOIN Service_requests s ON (u.id=s.user_id) WHERE s.client_id = ?",
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

