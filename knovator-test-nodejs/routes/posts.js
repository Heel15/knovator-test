const express = require('express'),
    router = express.Router(),
    auth = require('../middleware/auth');

const { createPost, deletePost, updatePost, activeInactiveCount, getPostByCoords } = require('../controllers/posts');

router.post('/createPost', auth, createPost);
router.delete('/deletePost/:postId', auth, deletePost);
router.put('/updatePost', auth, updatePost);
router.get('/getPostByCoords/:lat/:long', auth, getPostByCoords);
router.get('/activeInactiveCount', auth, activeInactiveCount);

module.exports = router;