const express = require("express");
const router = express.Router();
const { eventController } = require("../controller/event.controller");
const { authguard } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { eventSchema } = require("../validation/event.validate");

router.post(
  "/createEvent",
  authguard(["ADMIN"]),
  validate(eventSchema),
  eventController.createEvent
);
router.post(
  "/joinEvent",
  authguard(["USER", "ADMIN"]),
  eventController.joinEvent
);
// router.get(
//   "/eventListUser/:id",
//   authguard(["ADMIN"]),
//   eventController.getUserEvents
// );
// router.put(
//   "/cancelEvent",
//   authguard(["USER", "ADMIN"]),
//   validate(eventSchema),
//   eventController.cancelEvent
// );
router.get("/getAllUser", authguard(["ADMIN"]), eventController.getAllUser);

module.exports = router;
