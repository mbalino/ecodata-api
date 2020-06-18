const dotenv = require("dotenv");
const isDev = process.env.NODE_ENV !== "production";

const envFile = isDev ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

const bodyParser = require("body-parser");
const compression = require("compression");

const mongoose = require("mongoose");

let urlMongo;

if (process.env.DB_USER) {
    urlMongo = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin&w=1`;
} else {
    urlMongo = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
}

mongoose.set("useCreateIndex", true);

mongoose.connect(urlMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const DollarController = require("./controllers/DollarController");
const DollarInstance = new DollarController();

const express = require("express");

const server = express();

server.use(compression());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get("/api/get-quote/:doldate", DollarInstance.getDollar);
server.get("/api/get-all-quotes", DollarInstance.getDollarAll);

server.listen(process.env.PORT);

console.log(
    `Server started on port ${process.env.PORT} | Url: ${process.env.URL}`
);
