const fetchClientData = require("../clientApi/fetchData");
const clientLogin = require("../clientApi/getClient");

const jwt = require('jsonwebtoken');

const clientUsersHandler = async (req, res) =>{
    console.log("in user handler");
    const id = req.id;
    users = await fetchClientData.getUsers(id);
    res.json(users);
}

const clientMessageHandler = async (req, res) =>{
    const {Uid} = req.body;
    const Cid = req.id;
    messages = await fetchClientData.getMessages(Cid, Uid);
    res.json(messages);
}

const clientServiceHandler = async (req, res) =>{
    const id = req.id;
    services = await fetchClientData.getServices(id);
    res.json(services);
}
const handleClientLogin = async (req, res) =>{
    const {name, password} = req.body;
    client_data = await clientLogin.getClient(name, password);
    if(client_data.length === 0){
        res.status(404);
        res.json("invalid name or password");
    } else {
        const id = client_data[0].id;
        console.log("id= ",id);
        const payload = {id, name};
        const token = jwt.sign(payload, "constants.jwtString", {
            expiresIn: '24h',
        });
        res.status(200);
        res.json({message: "Login Authenticated", token: token, id: id, client: client_data[0]});
    }
}

module.exports = {
    clientUsersHandler,
    clientMessageHandler,
    clientServiceHandler,
    handleClientLogin
};