require('dotenv').config(); // нужно подключить dotenv, чтобы считать переменные окружения (env) 

const express = require('express'); // импорт модуля
const sequelize = require('./db');
const fileUpload = require('express-fileupload')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT; // порт, на котором будет работать сайт. Переменная PORT берется из .env 

const app = express() // создали объект
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler) // обработка ошибок

const start = async () => {
    try {
        await sequelize.authenticate(); // авторизоваться в БД
        await sequelize.sync({ alter: true }); // для сверки состояний со схемой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
}

start();