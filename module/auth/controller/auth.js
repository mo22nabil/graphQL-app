const { compare } = require('bcrypt');
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
  const jwt = require('jsonwebtoken');
  
const signinType = require('../types/signin');

const { validation } = require('../../../middleWear/validation');
const { signupval, signinval } = require('../auth.validation');

const signup={
    type : GraphQLString,
    args : {
        userName:{
            type :new GraphQLNonNull(GraphQLString)
        },
        email:{
            type : new GraphQLNonNull(GraphQLString)
        },
        password:{
            type : new GraphQLNonNull(GraphQLString)
        },
        cpassword:{
            type : new GraphQLNonNull(GraphQLString)
        },
        age:{
            type : new GraphQLNonNull(GraphQLInt)
        },
    },
    resolve :async (_,args)=>{
        const {value,error} = validation(signupval ,args)
        if (error) {
            console.log(error);
            return "validation Error"
        } else {
            
            const {userName,email,password,age}= args
            const user = await userModel.findOne({email})
            if (user) {
                return "account exist"
            } else {
    
                const newUser = new userModel({userName,email,password,age})
                await newUser.save()
              return "Done"
            }
        }
    }
  }

const signin = {
    type :signinType,
    args : {
        email:{
            type : new GraphQLNonNull(GraphQLString)
        },
        password:{
            type : new GraphQLNonNull(GraphQLString)
        }
    },
    resolve :async (_,args)=>{
        const {value,error} = validation(signinval ,args)
        if (error) {
            console.log(error);
            return {message:"validation Error"}
        } else {
            const {email,password}  =args;
            const user =await userModel.findOne({email});
            if (!user) {
                return {message:"in-valid email"}
            } else {
                const match = await bcrypt.compare(password , user.password)
                if (!match) {
                    return {message:" email and password mismatch"}
                }else{
                    const token = jwt.sign({id:user._id},'GraphQl',{expiresIn:60*60})
                    return {message:"Done",token}

                }
            }
        }

    }
}

  module.exports = {
    signup,signin
  }