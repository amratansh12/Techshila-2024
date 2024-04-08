const express  = require('express');

const authRouter = require('./Routes/authRoutes');

const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
    res.send('Hello World');
});

app.use('/api/v1/auth', authRouter);

module.exports = app;