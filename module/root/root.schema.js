
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
const { hello } = require('./controller/auth');


const schema = new GraphQLSchema({
    query : new GraphQLObjectType({
      name : "rootQuery",
      description : "root Query description",
        fields : {
          hello : hello
        }
    })
})

module.exports = schema