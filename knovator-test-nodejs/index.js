const express = require('express'),
    mongoose = require('mongoose'),
    dotenv = require('dotenv'),
    app = express();

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT;

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

app.use('/user', userRoutes);
app.use('/post', postRoutes);

mongoose.connect(`mongodb://127.0.0.1:27017/post-test`).then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    });
});
