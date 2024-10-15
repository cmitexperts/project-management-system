const mongoose = require('mongoose');

 async function connection() {
 const conn = await mongoose.connect(
    "mongodb://localhost:27017",
    {
        dbName:"admin"
    }
)
return conn;
}

module.exports =  connection ;