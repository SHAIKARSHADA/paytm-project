const express = require("express");
const mainRouter = require("./routes/index")
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(cors());
app.use(bodyParser());

const app = express();

app.use('/api/v1',mainRouter);