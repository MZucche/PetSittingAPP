function getUserInfo (user){
    return{
        username: user.username,
        name: user.name,
        surname: user.surname,
        address: user.address,
        zone: user.zone,
        id: user.id,
        email: user.email,
        phone: user.phone,
        rating: user.rating,
    }
}

module.exports = getUserInfo;