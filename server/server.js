const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./config/config");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//importar usuarios.js
app.use(require("./routes/usuario"));

//coneccion db
mongoose.connect(
    process.env.URLDB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    },
    (err, res) => {
        if (err) throw err;
        console.log("base de datos online");
    }
);

app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerdo:", process.env.PORT);
});