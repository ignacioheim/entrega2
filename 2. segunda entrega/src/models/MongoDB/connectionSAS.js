const mongoose = require('mongoose')

const url = 'mongodb+srv://ignacioheim:12345@cluster0.hosjt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
let rpta =  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => {
    console.log('Error: ' + err)
})

console.log('Conectado')