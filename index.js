import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { resolvers, typeDefs } from './schema'
//import bodyparser from 'body-parser'

const PORT = process.env.PORT || 3001
const app = express()
//app.use(bodyparser.json());

//app.use((req, res, next) => {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
//    //res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//    if (req.method === "OPTIONS"){
//        return res.sendStatus(200);
//    }
//    next();
//});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
})

server.applyMiddleware({ app })

app.get('/', (req, res) => {
  res.send({ hello: 'there!' })
})

app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}/graphql`)
)