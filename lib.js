const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { databaseConnection } = require("./src/config/database");
const authRoutes = require("./src/router/user.route");
const eventRoutes = require("./src/router/event.route");
const userRoutes = require("./src/router/user.route");
const swaggerUi = require("swagger-ui-express");
const { ConnectionStringVerification } = require("./src/config/database");
const swaggerDocs = require("./src/docs/swagger-output.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
dotenv.config();

app.use(authRoutes);
app.use(eventRoutes);
app.use(userRoutes);

app.get("/health", ConnectionStringVerification, (req, res) => {
  res.status(200).json({
    joke: "OK",
    chuckle:
      "I'm healthier than a fitness app's server on New Year's Day! 🎉💪",
  });
});

databaseConnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Hosted on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
