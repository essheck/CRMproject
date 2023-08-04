const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser')
userRouter = require("./src/routers/user")
customerRouter = require("./src/routers/customer")
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
require('./src/database/mongoose')
const User = require('./src/models/user')
const Customer = require('./src/models/customer')

//sessions
const session = require('express-session');
const MongoStore = require('connect-mongo')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 3 * 24 * 60 * 60, //time till alive in mongostore
        autoRemove: 'native'
    })
}));



// Paths
const publicDirectoryPath = path.join(__dirname , './public')
const viewsPath = path.join(__dirname , 'src/templates/views');
const partialsPath = path.join(__dirname, 'src/templates/partials');
app.use('/public' , express.static(publicDirectoryPath));
app.set('view engine', 'hbs');
app.set('views' , viewsPath);
hbs.registerPartials(partialsPath);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);
app.use(customerRouter);


app.listen(port , ()=> {
    console.log('The session has started at 8000');
})