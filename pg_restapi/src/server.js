require('dotenv').config();
const port = process.env.PORT || 3000;

const express = require('express');
const pool = require('./db');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', async (req, res) => {
    try {
        const data = await pool.query(`
            SELECT * FROM users
        `);
        res.status(200).send(data.rows);
    } catch (error) {
        console.error('Error getting data from database:', error);
        res.status(500).send('Error getting data from database');
    }
});

app.get('/setup', async (req, res) => {
    try {
         await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                product VARCHAR(100) NOT NULL
            );
        `);
        res.status(200).send('Database set up successfully');
    } catch (error) {
        console.error('Error setting up database:', error);
        res.status(500).send('Error setting up database');
    }
})

app.post('/user', async (req, res) => {

    try {
         await pool.query(`
            INSERT INTO users (name, product)
            VALUES ($1, $2)
        `, [req.body.name, req.body.product]);
        res.status(200).send('Database set up successfully');
    } catch (error) {
        console.error('Error inserting into database:', error);
        res.status(500).send('Error inserting into database');
    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});