const express = require('express'),
    router = express.Router();

const { createUser, login } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/login', login);

module.exports = router;