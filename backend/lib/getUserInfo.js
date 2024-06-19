function getUserInfo (user){
    return{
        username: user.username,
        name: user.name,
        phone: user.phone,
        email: user.email,
        id: user.id,
        address: user.address,
    }
}

module.exports = getUserInfo;