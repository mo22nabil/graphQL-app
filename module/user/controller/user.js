const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
  } = require('graphql');
  const bcrypt = require('bcrypt');
  const userModel = require('../../../DB/model/User');

const userType = require('../types/user');
const { auth } = require('../../../middleWear/auth');
const { endPoint } = require('../user.endPoint');
const getProfile={
    type : userType,
    args : {
        token:{
            type :GraphQLString
        }
    },
    resolve :async (_,args)=>{
        const user =await auth(args.token,endPoint.profile)
        console.log(user);
        const findUser = await userModel.findOne({_id:user._id})
        findUser.message ="Done"
        return findUser 
    }
}
const updateProfile={
    type : userType,
    args : {
        token:{
            type :GraphQLString
        },
        name:{
            type :GraphQLString
        }
    },
    resolve :async (_,args)=>{
        const user =await auth(args.token,endPoint.profile)
        console.log(user);
        const updatedUser = await userModel.findOneAndUpdate({_id:user._id},
            {name:args.name},{new:true}
        )
        updatedUser.message ="Done"
        return updatedUser 
    }
}
const deleteProfile={
    type : userType,
    args : {
        token:{
            type :GraphQLString
        }
    },
    resolve :async (_,args)=>{
        const user =await auth(args.token,endPoint.profile)
        const deleteUser = await userModel.findOneAndDelete({_id:user._id})
        deleteUser.message ="Done"
        return deleteUser 
    }
}
const getAll={
    type :new GraphQLList(userType),
    args : {
        token:{
            type :GraphQLString
        }
    },
    resolve :async (_,args)=>{
        const user =await auth(args.token,endPoint.profile)
        const allUsers = await userModel.find({})
        return allUsers 
    }
}

const getById = {
    type: userType,
    args:{
        token:{
            type:GraphQLString
        },
        id:{
            type:new GraphQLNonNull (GraphQLID)
        },
    },
    resolve:async (_,args)=>{
        await auth(args.token,endPoint.profile)
        return await userModel.findById(args.id)
    }
}


  module.exports = {
    getProfile,updateProfile,deleteProfile ,getAll ,getById  
  }