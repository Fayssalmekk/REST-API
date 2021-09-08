const express = require('express');
const router = express.Router();

const User = require('../../models/user');


// @route GET api/items
// @desc Get all items
// @access Public

//find all
router.get('/', (req, res) => {

    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
});

// find by username
router.get('/:username', (req, res) => {

    User.find({ 'username': req.params.username })
        .sort({ date: -1 })
        .then(users => res.json(users))
});

// @route POST api/items
// @desc Create a Post
// @access Public
/* router.post('/', (req, res) => {

    const newUser= new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.email
    });
    

    newUser.save()
        .then(user => res.json(user))
        
});
*/
router.post('/', async (req, res) => {
    
    

    // Check if this user already exisits
    let user1 = await User.findOne({ email: req.body.email  });
    let user2 = await User.findOne({  username: req.body.username });
    if (user1 || user2) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        res.send(user);
    }
});


router.put('/:id', async (req, res) => {
    try {
        User.findByIdAndUpdate(req.params.id, req.body).then(user => res.json({ message: 'updated' }))
    } catch (err) {
        res.status(400).send({ error: err });
    }
});






// @route DELETE api/items/:id
// @desc Delete an item
// @access Public

router.delete('/:id', (req, res) => {

    User.findById(req.params.id)
        .then(User => User.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});

//delete all
router.delete('/', (req, res) => {

    User.find()
        .then(User.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});


module.exports = router;