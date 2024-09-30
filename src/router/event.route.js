const express = require("express");
const router = express.Router();
const { eventController } = require("../controller/event.controller");
const { authguard } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { eventSchema } = require("../validation/event.validate");

router.post(
  "/create-Event",
  authguard(["ADMIN"]),
  validate(eventSchema),
  eventController.createEvent
);
router.post(
  "/join-Event",
  authguard(["USER", "ADMIN"]),
  eventController.joinEvent
);
router.get(
  "/eventList-User/:id",
  authguard(["ADMIN"]),
  eventController.getUserEvents
);
router.put(
  "/cancel-Event",
  authguard(["USER", "ADMIN"]),
  validate(eventSchema),
  eventController.cancelEvent
);
router.get("/getAll-User", authguard(["ADMIN"]), eventController.getAllUser);

module.exports = router;
