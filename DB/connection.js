const mongoose = require('mongoose');


const connectDB  = ()=>{
    return mongoose.connect('mongodb://localhost:27017/saraha')
    .then(r=> {console.log('connection Done')})
    .catch(e=> console.log('connection Err'))
}

module.exports = connectDB