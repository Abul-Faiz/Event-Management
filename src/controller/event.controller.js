const { eventService } = require("../service/event.service");

async function createEvent(req, res) {
  /*
      #swagger.tags = ['Event']
      #swagger.summary = 'create events'
      #swagger.parameters['body'] = {
      in: 'body',
      description: 'Event object',
      schema: {
            eventName : "Event Management",
            description : "A small mini project with proper base setup",
      }
}
    */
  const result = await eventService.insertEvent(req.body);
  res.json(result);
}

async function joinEvent(req, res) {
  //    #swagger.tags = ['Event']
  //    #swagger.summary = 'Join event'
  const { eventId, userId } = req.query;
  const result = await eventService.eventJoin(eventId, userId);
  res.json(result);
}

// async function getUserEvents(req, res) {
//   // #swagger.tags = ['Event']
//   // #swagger.summary = 'Fetch user past, current, and future events API'
//   const result = await eventService.latestEvents(req.params.userId);
//   res.json(result);
// }

// async function cancelEvent(req, res) {
//   // #swagger.tags = ['Event']
//   // #swagger.summary = 'cancel event API'
//   const { eventId, userId } = req.query;
//   const result = await eventService.eventCancel(eventId, userId);
//   res.json(result);
// }

async function getAllUser(req, res) {
  // #swagger.tags = ['Event']
  // #swagger.summary = 'get all user API'
  const result = await eventService.getList();
  res.json(result);
}

const eventController = {
  createEvent,
  joinEvent,
  // getUserEvents,
  // cancelEvent,
  getAllUser,
};
module.exports = { eventController };
