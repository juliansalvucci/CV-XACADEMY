require("dotenv").config();
const express = require('express');
const { initializeDb } = require('./config/db');
const { resumeRoutes } = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
const cors = require('cors'); 
app.use(cors());

// MiddleWares
app.use(express.json());

// Rutas
app.use('/resume', resumeRoutes);

app.listen(port, async () => {
    await initializeDb();
    console.log(`Server Running On Port ${port}`);
});
