const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");

// App de express
const app = express();

// Parseo a json -> Middleware



// Primer middleware
app.use(express.json());

// Segundo middleare
app.use((request, response, next) => {
  console.log("Primer middleware");  
  next() // Continuar
})
app.use((request, response, next) => {
  console.log("segundo middleware");
  next();
})

const middlewareEncapsulado = (req, res, next) => {
  console.log("Middleware encapsulado para un endpoint en especifico");
  // next();
}
/**
 * Middlewares
 * - Nos sirve para poder realizar codigo antes de los endpoints.
 * - Tienen acceso a la request, a la response.
 * - Tienen una palabra llamada next() -> indica que puedes continuar
 */

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
  },
  createdAt: {
    type: Date
  }
})

// Modelos -> va capitalizado y en singular
const Koder = mongoose.model("Koders", koderSchema, "Koders");

// Home
app.get("/", (req, res) => {
  res.json("Estamos en el endpoint de HOME");
})

// Query params 

/**
 * path params -> request.params
 * query params -> request.query
 */
app.get("/koders", async (req, res) => {
  // Accedemos a nuestra bd
  try {
    // Todo lo que podia fallar
    const koders = await Koder.find(req.query); // { name: "Karla" }
    res.json({
      success: true,
      data: koders
    })
  }catch(err) {
    res.status(400)
    res.json({
      success: false,
      message: err.message
    })
  }
})

// Crear un koder
// parametros -> ruta, callback
// si queremos un middleware para ese endpoint en especifico, se pone como 2do parametro
// ruta, middleware, callback
app.post("/koders", middlewareEncapsulado, async (req, res) => {
  console.log("body en el endpoint de POST-->", req.body)
  /**
   * - Request -
   * Params
   * Query params
   * Body
   */
  try {
    const koder = await Koder.create(req.body)
    res.status(201);
    res.json({
      success: true,
      data: koder
    })
  } catch(err) {
    res.status(400);
    res.json({
      success: false,
      message: err.message
    })
  }
})

/**
 * Endpoint donde pueda encontrar el koder por su id.
 * /recurso/identificador
 * method: 
 * ruta: 
 * Model.findById()
 */

// Endpoint donde eliminemos al koder
// ruta -> /koders/:id
// metodo -> delete;

app.delete("/koders/:id", async (req, res) => {
  const { id } = req.params
  try {
    const deletedKoder = await Koder.findByIdAndDelete(id)
    let status = 200;
    const responseParams = {
      success: true,
      message: "El koder fue eliminado exitosamente"
    }
    // !variable -> variable === null, variable === undefined, variable === false
    if(!deletedKoder) {
      responseParams.success = false;
      responseParams.message = "El koder no fue encontrado";
      status = 404
    }
    // Mi codigo continua
    res.status(status);
    res.json(responseParams)
    
  }catch(err) {
    res.status(400);
    res.json({
      success: false,
      message: err.message
    })
  }
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

