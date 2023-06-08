const express = require("express");
const mongoose = require("mongoose");

// App de express
const app = express();
// Url de base de datos
const databaseURL = "mongodb+srv://ale:a123456@kodemia.fh2syr1.mongodb.net/kodemia"


/**
 * 1. Conectarse a la base de datos
 * 2. Levantar el servidor
 */

/**
 * 
 * Colleciones
 * Documentos -> schemas/modelos
 */


const koderSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 10,
    required: true
  },
  module: {
    type: String
  },
  generation: {
    type: String
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100
  },
  sex: {
    type: String,
    enum: ["f", "m", "o"]
  }
})

// Modelos -> va capitalizado y en singular
const Koder = mongoose.model("Koders", koderSchema, "Koders");

// Home
app.get("/", (req, res) => {
  res.json("Estamos en el endpoint de HOME");
})

app.get("/koders", async (req, res) => {
  console.log("aaaaaa");
  // Accedemos a nuestra bd
  const koders = await Koder.find();
  console.log("koders", koders)
})

app.post("/koders", async (req, res) => {
  // Accedemos a nuestra bd
  const koder = await Koder.create(req.body);
  console.log("koder", koder)
  return koder
})
// Conectar a la base de datos
mongoose.connect(databaseURL)
.then(() => {
  console.log("Conexion a la base de datos exitosa");
  // Levantar servidor
  app.listen(8080, () => {
    console.log("Mi servidor esta levantado")
  })
})
.catch((err) => {
  console.log("No se pudo conectar a la base de datos", err);
})

