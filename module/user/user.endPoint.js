const { roles } = require("../../middleWear/auth");



const endPoint = {
    profile  : [roles.User,roles.Admin]
}

module.exports={
    endPoint
}   