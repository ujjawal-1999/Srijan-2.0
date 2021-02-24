const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('hbs');

mongoose.connect('mongodb+srv://srijan:srijan@cluster.7jtpo.mongodb.net/RegisterTest?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const router = require('./routers/router')
const paytmRouter = require('./routers/paytmRouter')
const notifyRouter = require('./routers/notify')

const app = express() 
app.use(express.json())

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())

const publicDirectoryPath = path.join(__dirname,'../public')

app.set('view engine','hbs');
app.set('views',path.join(__dirname,'../template/views'));

app.use(express.static(publicDirectoryPath))



const port = process.env.PORT || 3000

app.use('/register',router)
app.use('/paytmPath',paytmRouter)
app.use('/notify', notifyRouter)



app.listen(port, () => {
    console.log('Server is up on port : '+ port)
})