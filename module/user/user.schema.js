
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
const { getProfile, updateProfile, deleteProfile, getAll, getById } = require('./controller/user');


const schema = new GraphQLSchema({
    query : new GraphQLObjectType({
        name:"userQuery",
        description:"userQuery schema",
        fields:{
            getProfile:getProfile,
            getAll:getAll,
            getById:getById
           
        }
    }),
    mutation : new GraphQLObjectType({
        name:"usermutation",
        description:"usermutation schema",
        fields:{
            updateProfile:updateProfile,
            deleteProfile:deleteProfile,
        }
    })

})

module.exports = schema