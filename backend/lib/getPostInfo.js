function getPostInfo (post){
    return{
        petType: post.petType,
        serviceType: post.serviceType,
        experience: post.experience,
        availabilityFrequency: post.availabilityFrequency,
        availabilityDays: post.availabilityDays,
        availabilityDates: post.availabilityDates,
        description: post.description,
        price: post.price,
        user: post.user,
    }
}

module.exports = getPostInfo;