const express = require('express')
const router = express.Router()
const EventController = require('../controllers/EventController');


router.get('/', EventController.getAllEvents)
router.get('/:id', EventController.getAllUserEvents)

router.post('/', EventController.create)

module.exports = router

