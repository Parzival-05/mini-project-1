require('dotenv').config();

const express = require('express');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const sequelize = require('./db');
const fileUpload = require('express-fileupload')
const cors = require('cors')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = require('./routes')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require('path')

const PORT = process.env.PORT;

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
}

start();