const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001; // Change from 3000 to 3001 or any other available port
// You can change this port if needed

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let data = []; // This will hold our spreadsheet data

// Endpoint to get spreadsheet data
app.get('/api/data', (req, res) => {
    res.json(data);
});

// Endpoint to update spreadsheet data
app.post('/api/data', (req, res) => {
    data = req.body; // Update the data with the new input
    res.status(200).send('Data updated successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
