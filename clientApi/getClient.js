const conn = require('../configs/mysql');

module.exports.getClient = async (name, password) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM Client WHERE name=? AND password=?",[name, password], (err,res)=>{
            if (err) {
                console.log(err);
                reject(false);
            } else {
                resolve(res);
            }
        });
    });
}