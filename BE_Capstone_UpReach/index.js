import { config } from './dbconfig.js';
import express from "express";
import sql from "mssql";


const app = express();

//connect to your database
const pool = new sql.ConnectionPool(config);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


//get api InfluencerType "api/InfluencerType"
app.get('/api/InfluencerType', async (req, res) => {
    try {
        console.log('Querying database...');
        pool.connect(config);
        const result = await pool.query('SELECT * FROM InfluencerType');
        console.log('Result:', result.recordset);
        res.send(result.recordset);
    } catch (err) {
        console.log('Error:', err);
        res.sendStatus(500);
    }
});