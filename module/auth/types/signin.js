
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

const signinType = new GraphQLObjectType({
    name:"signin",
    description  :"signin",
    fields:{
        message : {
            type:GraphQLString
        },
        token : {
            type:GraphQLString
        }
    }
}) 

module.exports = signinType