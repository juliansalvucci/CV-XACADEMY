require("dotenv").config();
const express = require('express');
const { initializeDb } = require('./config/db');
const { cvRoute } = require('./routes');

const app = express();
const port = process.env.PORT;

// Configuración de CORS
const cors = require('cors'); 
app.use(cors());

// MiddleWares
app.use(express.json());

// Rutas
app.use('/cv', cvRoute);

app.listen(port, async () => {
    await initializeDb();
    console.log(`Server Running On Port ${port}`);
});
