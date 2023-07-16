require('dotenv').config(); // нужно подключить dotenv, чтобы считать переменные окружения (env) 

const express = require('express'); // импорт модуля
const sequelize = require('./db');
const models = require('./models/models')

const PORT = process.env.PORT; // порт, на котором будет работать сайт. Переменная PORT берется из .env  

const app = express() // создали объект

const start = async () => {
    try {
        await sequelize.authenticate(); // авторизоваться в БД
        await sequelize.sync(); // для сверки состояний со схемой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
}

start();