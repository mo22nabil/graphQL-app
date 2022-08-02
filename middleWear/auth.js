const userModel = require("../DB/model/User");
const { UserInputError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const roles = {
    Admin:"Admin",
    User:"User",
    Hr:"Hr",
}

const auth =async (BearerToken,accessRoles)=>{
    try {
        const token = BearerToken.split("Bearer ")[1]
         if (!token) {
             throw new UserInputError("un-auth user")
         } else {
             const decoded =jwt.verify(token , 'GraphQl');
             if (!decoded || !decoded.id) {
                 throw new UserInputError("un-auth user")
             } else {
                 const user =await userModel.findOne({_id:decoded.id})
                 .select('name role email')
                 if (!accessRoles.includes(user.role)) {
                    throw new UserInputError("not-authorized user")
                 } else {
                    return user
                 }
             }
         }
    } catch (error) {
        throw new UserInputError("catch error",{
            error
        })
    }
}

module.exports = {
    auth,
    roles
}