const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const port = 8000;

app.use(bodyParser.json());
const Bus = require('./models/bus.models');
const Members = require('./models/member.model');
let notifications = [];
app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
    
        type NotificationAlert{
            id: ID!
            title: String!
            place: String!
            time: String!
        }

        type NotificationMember{
            id: ID!
            email: String!
            password: String
        }
    
        input NotificationInput{
            title: String!
            place: String!
            time: String!
        }

        input NotificationMemberInput{
            email: String!
            password: String!
        }

        type rootQuery{
            family: [NotificationAlert!]!

        }
        
        type rootMutation{
            createFamily(Noo: NotificationInput): NotificationAlert
            createMember(Mem: NotificationMemberInput): NotificationMember
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
        },

        createMember(args2){

            return Members.findOne({email: args2.Mem.email}).then(UserFound=>{
                if(UserFound){
                    throw new Error('User Is Already Registered !!');
                }
                return bcrypt.hash(args2.Mem.password, 12)
            })
            .then( HashPassword =>{
                const Member = new Members({
                    email: args2.Mem.email,
                    password: HashPassword,
                });
                return Member.save();
            })
            .then(result2=>{
                console.log({...result2._doc});
                return {...result2._doc, id: result2.id}   
            })
            .catch(error1=>{
                throw error1;
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
