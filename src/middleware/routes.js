const book = require("../router/book.route");
const user = require("../router/user.route");
const event = require("../router/event.route");
const auth = require("../router/auth.route");

function ApiRoutes(app) {
  app.use("/auth", auth);
  app.use("/user", user);
  app.use("/book", book);
  app.use("/event", event);
}

module.exports = { ApiRoutes };
