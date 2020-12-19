require("dotenv").config({path: './.env'});
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cookieParser());
const corsOptions = {
    origin: [process.env.CLIENT_URI, 'http://localhost:3000'],
    credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors()); // include before other routes
const routes = require("./routes/routes");
const {error404Handler, errorHandler} = require("./middlewares");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
require("./database/index");

app.set('trust proxy', true)
app.use(
    session({
        secret: process.env.SECRETTOKEN,
        saveUninitialized: false,
        resave: true,
        name: process.env.SECRETTOKEN,
        proxy: true,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', //Cambia automaticamente si esta en produccion
        },
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: 2 * 24 * 60 * 60, //Duracion de la cookie (2 días)
            secret: process.env.SECRETTOKEN,
        }),
    })
);

app.use(express.json({limit: "10mb", extended: true}));
app.use(express.urlencoded({extended: true, limit: "10mb"}));
app.use(morgan(process.env.LOGGER));

app.use("/api", routes);
app.use(error404Handler);
app.use(errorHandler);

app.disable("x-powered-by");

module.exports = app;
