const mongoose = require('mongoose');

const connectionString = ''

const connect = async () => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (err) {
        console.error("Error connecting to mongodb")
        console.error(err)
    }

}

module.exports = {connect};
