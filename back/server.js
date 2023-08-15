require("dotenv").config();
const express = require('express');
const { initializeDb } = require('./config/db');
const { cvRoute } = require('./routes');
//const cvModel = require('./models').Resume;

const app = express();
const port = process.env.PORT;

// MiddleWares
app.use(express.json());

// Rutas
app.use('/cv', cvRoute);

/* Función de prueba para crear cv's.
app.post('/crearcv', (req, res) => {
    cvModel.create(req.body)
        .then((data) => {
            res.json({datos:data});
        })
        .catch((error) => {
            res.json( {error: error });
        });
}); */

app.listen(port, async () => {
    await initializeDb();
    console.log(`Server Running On Port ${port}`);
});