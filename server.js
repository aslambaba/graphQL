const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const port = 8000;

app.use(bodyParser.json());
let notifications = [];
app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
    
        type NotificationAlert{
            id: ID!
            title: String!
            place: String!
            time: String!
        }
    
        input NoficationInput{
            title: String!
            place: String!
            time: String!
        }

        type rootQuery{
            family: [NotificationAlert!]!
        }
        
        type rootMutation{
            createFamily(Noo: NoficationInput): NotificationAlert
        }
        

        schema {
            query: rootQuery
            mutation: rootMutation
        }
    `),
    rootValue: {
        family: ()=>{
            return notifications;
        },
        createFamily (args){
            const notification = {
                id: Math.random().toString(),
                title: args.Noo.title,
                place: args.Noo.place,
                time: args.Noo.time,
            };
            notifications.push(notification);
            return notification;
        }
    },
    graphiql: true
}));

app.listen(port,()=>{
    console.log('Server is Running on ' + port);
})