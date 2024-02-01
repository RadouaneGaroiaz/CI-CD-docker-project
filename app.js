const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config();
//swagger
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");

//allow any cors

const cors = require('cors');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Initialize DB
require('./initDB')();

const ProductRoute = require('./Routes/Product.route');
app.use('/products', ProductRoute);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "my Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple products API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Radouane Garoiaz",
        url: "radouane.garoiaz@gmail.com",
        email: "radouane.garoiaz@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

//404 handler and pass to error handler
//app.use((req, res, next) => {
  /*
  const err = new Error('Not found');
  err.status = 404;
  next(err);
  */
  // You can use the above code if your not using the http-errors module
 // next(createError(404, 'Not found'));
//});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});
