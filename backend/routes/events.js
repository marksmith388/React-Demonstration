const router = require('express').Router();
const Events = require('../models/events.model');
let Event = require('../models/events.model');

router.route('/').get((req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const type = req.body.type;
  const duration = Number(req.body.duration);
  const username = req.body.username;

  const newEvent = new Event({
      title,
      description,
      date,
      type,
      duration,
      username
    });

  newEvent.save()
    .then(() => res.json('Event added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Events.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Events.findByIdAndDelete(req.params.id)
      .then(() => res.json('Event deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Events.findById(req.params.id)
      .then(event => {
        event.title = req.body.title;
        event.description = req.body.description;
        event.date = Date.parse(req.body.date);
        event.type = req.body.type;
        event.duration = Number(req.body.duration);
        event.username = req.body.username;

        event.save()
          .then(() => res.json('Event Updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;