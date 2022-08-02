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

const { signup, signin } = require('./controller/auth');


const schema = new GraphQLSchema({
    query : new GraphQLObjectType({
        name:"auhtQuery",
        description:"auhtQuery schema",
        fields:{
            helloAuth:{
                type: GraphQLString,
                resolve:()=>{
                    return "auth query"
                }
            }
        }
    }),
    mutation : new GraphQLObjectType({
        name:"auhtmutation",
        description:"auhtmutation schema",
        fields:{
            signup:signup,
            signin:signin
        }
    })
})

module.exports = schema