const Event = require('../models/Events');
const AppError = require('../models/Error').ApplicationError
const errorHandler = require('../utils/ErrorHandler')
const validator = require('validator')


module.exports.create = async function (req, res) {

  try {
    // create greenwich start and end date
    const start = getStartandEndDates(req.body.start, req.body.end).startUTCDate
    const end = getStartandEndDates(req.body.start, req.body.end).endUTCDate
    // check double events
    const existingEvent = await Event.findOne(
      { start: start, end: end, 'location.latLng.lat': req.body.lat, 'location.latLng.lng': req.body.lng });
    if (existingEvent) {
      throw new AppError('An Event already exist at this venue on this day ', 400)
      //create event 
    } else {
      const event = await new Event(
        {
          user: req.body.user,
          end: end,
          start: start,
          title: req.body.title,
          details: req.body.details,
          location: {
            address: req.body.address,
            latLng: {
              lat: req.body.lat,
              lng: req.body.lng,
            }
          }
        }
      );

      await event.save()
      res.status(201).json(event)
    }

  } catch (e) {
    errorHandler(res, e)
  }
}



module.exports.getAllEvents = async function (req, res) {
  try {
    const events = await Event.find()
      .limit(4)
    res.status(200).json(events)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getAllUserEvents = async function (req, res) {
  try {
    const events = await Event.find({ user: req.params.id })
      .limit(4)
    res.status(200).json(events)
  } catch (e) {
    errorHandler(res, e)
  }
}



const getStartandEndDates = (startString, endString) => {
  //validate
  validate(startString, endString);

  //start date to greenwich
  const localstart = new Date(startString);
  const localstartToUTC = localstart.toUTCString()
  const start = new Date(localstartToUTC)
  // end date to greenwich
  const localend = new Date(endString);
  const localendToUTC = localend.toUTCString()
  const end = new Date(localendToUTC)

  return {
    startUTCDate: start,
    endUTCDate: end
  }  
}

const validate = (startString, endString) => {
  if (validator.isEmpty(startString) || validator.isEmpty(endString)) {
    throw new AppError("Validation Failed", 404);
  }
}