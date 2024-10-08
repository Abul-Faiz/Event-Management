const book = require("../router/book.route");
const user = require("../router/user.route");
const auth = require("../router/auth.route");

function ApiRoutes(app) {
  app.use("/auth", auth);
  app.use("/user", user);
  app.use("/book", book);
}

module.exports = { ApiRoutes };
