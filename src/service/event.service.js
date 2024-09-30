const mongoose = require("mongoose");
const Event = require("../model/event.model");
const UserEvent = require("../model/userEvent.model");
const { statusCodeEnum } = require("../helper/status.enum");
const { responseEnum } = require("../helper/response.enum");
const { response } = require("../helper/response.helper");
const { errorHandler } = require("../helper/errorHandler.helper");
const { generateTimes } = require("../utils/time");
const now = new Date();

async function insertEvent(eventData) {
  try {
    const { startTime, endTime } = generateTimes(eventData.startTime);
    eventData.startTime = startTime;
    eventData.endTime = endTime;
    const event = new Event(eventData);
    await event.save();
    return response(
      responseEnum.Success,
      statusCodeEnum.HTTP_CREATED,
      responseEnum.Created,
      event
    );
  } catch (error) {
    return errorHandler(error);
  }
}

async function eventJoin(eventId, userId) {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return response(
        responseEnum.Error,
        statusCodeEnum.HTTP_NOT_FOUND,
        responseEnum.NotFound
      );
    }
    const existData = await UserEvent.findOne({ eventId, userId });
    if (existData) {
      return response(
        responseEnum.Error,
        statusCodeEnum.HTTP_METHOD_NOT_ALLOWED,
        responseEnum.Duplicate
      );
    }
    const overlap = await UserEvent.find({
      userId,
      status: "going",
      $or: [
        { startTime: { $lt: event.endTime, $gte: event.startTime } },
        { endTime: { $gt: event.startTime, $lte: event.endTime } },
        {
          startTime: { $lte: event.startTime },
          endTime: { $gte: event.endTime },
        },
      ],
    });
    if (overlap.length > 0) {
      return response(responseEnum.Error, statusCodeEnum.HTTP_CONFLICT);
    }
    await UserEvent.create({ userId, eventId });
    return response(
      responseEnum.Success,
      statusCodeEnum.HTTP_CREATED,
      responseEnum.Joined,
      { eventId, userId }
    );
  } catch (error) {
    return errorHandler(error);
  }
}

async function latestEvents(userId) {
  try {
    const objectId = new mongoose.Types.ObjectId(userId);
    const events = await UserEvent.aggregate([
      {
        $match: { userId: objectId },
      },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "eventDetails",
        },
      },
      { $unwind: "$eventDetails" },
      {
        $facet: {
          past: [
            { $match: { "eventDetails.endTime": { $lt: now } } },
            { $sort: { "eventDetails.endTime": -1 } },
          ],
          present: [
            {
              $match: {
                "eventDetails.startTime": { $lte: now },
                "eventDetails.endTime": { $gte: now },
              },
            },
            { $sort: { "eventDetails.startTime": -1 } },
          ],
          future: [
            { $match: { "eventDetails.startTime": { $gt: now } } },
            { $sort: { "eventDetails.startTime": -1 } },
          ],
        },
      },
    ]);
    return response(responseEnum.Success, statusCodeEnum.HTTP_OK, events);
  } catch (error) {
    return errorHandler(error);
  }
}

async function eventCancel(eventId, userId) {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return response(
        responseEnum.Error,
        statusCodeEnum.HTTP_NOT_FOUND,
        responseEnum.NotFound
      );
    }
    const eventStartTime = new Date(event.startTime);
    const timeDiffer = eventStartTime - now;
    const eightHours = 8 * 60 * 60 * 1000;
    if (timeDiffer <= 0) {
      return response(
        responseEnum.Error,
        statusCodeEnum.HTTP_METHOD_NOT_ALLOWED,
        "Cannot cancel the event as it has already started or finished."
      );
    } else if (timeDiffer < eightHours) {
      return response(
        responseEnum.Error,
        statusCodeEnum.HTTP_METHOD_NOT_ALLOWED,
        "Cannot cancel the event as it starts in less than 8 hours."
      );
    }
    const userEvent = await UserEvent.findOneAndUpdate(
      { eventId, userId },
      { status: "canceled" },
      { new: true }
    );
    if (!userEvent) {
      return response(
        responseEnum.Error,
        statusCodeEnum.HTTP_NOT_FOUND,
        responseEnum.NotFound
      );
    }
    return response(
      responseEnum.Success,
      statusCodeEnum.HTTP_OK,
      responseEnum.Deleted
    );
  } catch (error) {
    return errorHandler(error);
  }
}

async function getList() {
  try {
    const list = await UserEvent.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "eventDetails",
        },
      },
      {
        $unwind: "$eventDetails",
      },
      {
        $project: {
          _id: 1,
          user: "$userDetails.name",
          eventName: "$eventDetails.eventName",
          status: 1,
        },
      },
    ]);
    if (list.length === 0) {
      return response(
        responseEnum.Error,
        statusCodeEnum.HTTP_NOT_FOUND,
        responseEnum.NotFound
      );
    }
    return response(responseEnum.Success, statusCodeEnum.HTTP_OK, list);
  } catch (error) {
    return errorHandler(error);
  }
}

const eventService = {
  insertEvent,
  eventJoin,
  latestEvents,
  eventCancel,
  getList,
};
module.exports = { eventService };
