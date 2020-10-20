const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const port = 8000;

app.use(bodyParser.json());
const Bus = require('./models/bus.models');
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
            const notification = new Bus({
                id: Math.random().toString(),
                title: args.Noo.title,
                place: args.Noo.place,
                time: args.Noo.time,
            });
            return notification.save().then(result=>{
                console.log({...result._doc});
                return {...result._doc}
            }).catch(error=>{
                console.log(error);
            })
        }
    },
    graphiql: true
}));

mongoose.connect('mongodb://localhost:27017/MyIUB', {useNewUrlParser: true, useUnifiedTopology: true}).then(
    app.listen(port,()=>{
        console.log('Server is Running on ' + port);
    })
).catch(err =>{
    console.log(err);
})
