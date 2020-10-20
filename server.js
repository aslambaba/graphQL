const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const port = 8000;

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`  
        type rootQuery{
            family: [String!]!
        }
        
        type rootMutation{
            createFamily(name: String): String
        }

        schema {
            query: rootQuery
            mutation: rootMutation
        }
    `),
    rootValue: {
        family: ()=>{
            return ['Aslam','Amna','Shama','Nusrat'];
        },
        createFamily: (args)=>{
            const Name = args.name;
            return Name;
        }
    },
    graphiql: true
}));

app.listen(port,()=>{
    console.log('Server is Running on ' + port);
})