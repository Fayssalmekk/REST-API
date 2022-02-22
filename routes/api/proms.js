const express = require('express');
const router = express.Router();

const Item = require('../../models/prom');

// @route GET api/items
// @desc Get all items
// @access Public
router.get('/', (req, res) => {

    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route POST api/items
// @desc Create a Post
// @access Public
router.post('/', (req, res) => {

    const newItem = new Item({
        version: req.body.version,
	receiver: req.body.receiver,
	groupKey: req.body.groupKey,
	status: req.body.status,
	truncatedAlerts: req.body.truncatedAlerts,
	groupLabels: req.body.groupLabels,
        externalURL: req.body.externalURL,
	alerts: req.body.alerts
    });

    newItem.save()
        .then(item => res.json(item))
});

router.put('/:id', async (req, res) => {
    try {
    Item.findByIdAndUpdate(req.params.id, req.body).then(item => res.json(item))
    } catch (err) {
        res.status(400).send({ error: err });
    }
});


// @route DELETE api/items/:id
// @desc Delete an item
// @access Public

router.delete('/:id', (req, res) => {

    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});


module.exports = router;
