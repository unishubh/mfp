const fetchClientData = require("../clientApi/fetchData");

const clientUsersHandler = async (req, res) =>{
    console.log("in user handler");
    const {id} = req.params;
    users = await fetchClientData.getUsers(id);
    res.json(users);
}

const clientMessageHandler = async (req, res) =>{
    const {id} = req.params;
    messages = await fetchClientData.getMessages(id);
    res.json(messages);
}

const clientServiceHandler = async (req, res) =>{
    const {id} = req.params;
    services = await fetchClientData.getServices(id);
    res.json(services);
}

module.exports = {
    clientUsersHandler,
    clientMessageHandler,
    clientServiceHandler,
};