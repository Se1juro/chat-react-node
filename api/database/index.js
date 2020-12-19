const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;
mongoose
    .connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log("DataBase Connect Succesfull"))
    .catch((err) => console.log(err + " Error en la conexion a la BD"));

module.exports = mongoose;
