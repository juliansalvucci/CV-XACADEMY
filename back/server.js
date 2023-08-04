const express = require('express');

const app = express();

const server = app.listen(3000, () => {
    console.log('Server Running On Port 3000');
});