const express = require('express');
const db = require('./db'); 

const cors =require('cors')
const colors = require('colors')

const app = express();
app.use(cors())

app.use(express.json());

app.get('/getData', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM zitara');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const port = process.env.PORT  || 5000
app.listen(port , () => {
  console.log(`Server is running at http://localhost:${port}.`.bgCyan.white);
});
