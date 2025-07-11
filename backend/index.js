require('dotenv').config();
const express = require('express');
const cors = require('cors');
const filesRouter = require('./routes/files');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/api', filesRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});