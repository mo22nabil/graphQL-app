const express = require('express')
const app = express()
const port = 3000
const { graphqlHTTP } = require('express-graphql');

const connectDB = require('./DB/connection');
const schema = require("./module/index.schema")

app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema.rootSchema,
      graphiql: true,
    }),
  );
app.use(
    '/auth',
    graphqlHTTP({
      schema: schema.auhtSchema,
      graphiql: true,
    }),
  );
app.use(
    '/user',
    graphqlHTTP({
      schema: schema.userSchema,
      graphiql: true,
    }),
  );

connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))