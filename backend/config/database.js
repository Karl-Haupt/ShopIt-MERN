const mongoose = require('mongoose');

const connectDatabase = () => {
    // console.log("This is the production port number: " + process.env.DB_URI);
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase;