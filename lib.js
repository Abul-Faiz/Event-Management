const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { databaseConnection } = require("./src/config/database");
const userRoutes = require("./src/router/user.route");
const eventRoutes = require('./src/router/event.route')
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./src/docs/swagger-output.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
dotenv.config();

app.use(userRoutes)
app.use(eventRoutes)

databaseConnection()
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Hosted on ${process.env.PORT}`);
  });
})
.catch((error) => {
  console.log(error.message);
});

