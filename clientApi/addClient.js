const conn = require('../configs/mysql');

module.exports.insertClient = (name, user_id) => {
    data = [name, user_id];
    conn.query("INSERT INTO Client (name, user_id) VALUES (?, ?)", data, (err, result) =>{
        if(err){
            console.log("error ", err,  "could not insert client ", name)
        } else {
            console.log("added client", name)
        }
    });
};