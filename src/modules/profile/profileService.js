const axios = require('axios');
const login = async (username, password) => {
    //http://www.mapna-evidc.com/server1/api/admin/login
    const {data: {token, role}} = await axios.post('http://www.mapna-evidc.com/server1/api/admin/login', {
        username,
        password,
        roles: ['connectedAdmin', 'connectedAgency']
    });

    return (token && role) ? {token, role} : {};
}

module.exports = {
    login
}