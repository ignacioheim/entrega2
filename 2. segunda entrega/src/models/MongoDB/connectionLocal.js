const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/dbstore'
let rpta =  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connected error'))
db.once('open', () => {
    console.log('Connected')
})