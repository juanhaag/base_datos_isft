const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Esquema de la tabla para la base de datos
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

sequelize.sync();

app.use(express.json());

// Endpoints usando Sequelize (ORM)
app.post('/orm/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/orm/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/orm/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/orm/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/orm/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoints usando Procedimientos Almacenados (sin ORM)
app.post('/sp/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const [results] = await pool.query('CALL CreateUser(?, ?)', [name, email]);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/sp/users', async (req, res) => {
    try {
        const [results] = await pool.query('CALL GetAllUsers()');
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/sp/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await pool.query('CALL GetUserById(?)', [id]);
        if (results[0].length > 0) {
            res.json(results[0][0]);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/sp/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const [results] = await pool.query('CALL UpdateUser(?, ?, ?)', [id, name, email]);
        if (results.affectedRows > 0) {
            res.json({ message: 'Usuario actualizado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/sp/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await pool.query('CALL DeleteUser(?)', [id]);
        if (results.affectedRows > 0) {
            res.json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});