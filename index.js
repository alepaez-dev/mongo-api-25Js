const express = require("express");
const mongoose = require("mongoose");

// App de express
const app = express();

// Url de base de datos
const databaseURL = "mongodb+srv://ale:a123456@kodemia.fh2syr1.mongodb.net/Kodemia"


/**
 * Conectarse a la base de datos
 * Levantar el servidor
 */


// Conectar a la base de datos
mongoose.connect(databaseURL)
.then(() => {
  console.log("Conexion a la base de datos exitosa");
})
.catch((err) => {
  console.log("No se pudo conectar a la base de datos", err);
})