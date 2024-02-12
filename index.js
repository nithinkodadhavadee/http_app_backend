const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

let ledStatus = '0000';
let microIp = 'http://192.168.1.13';
// let microIp = 'http://192.168.29.84';

app.get('/ledState', async (req, res) => {
    res.send(ledStatus);
});

app.get('/updateStatus', async (req, res) => {
    const newStatus = req.query.status;
    console.log('/updateStatus called');
    console.log(newStatus);
    ledStatus = newStatus.toString();
    res.send(ledStatus);
})

app.get('/led', async (req, res) => {
    const newStatus = req.query.state;


    console.log('led being updated');
    console.log(`newStatus: ${newStatus}`);
    if (/^[01]{4}$/.test(newStatus)) {
        ledStatus = newStatus;

        try {
            // Make an API call to 10.10.10.1/led with the new status as a query parameter
            // await axios.get(`${microIp}/led?state=${newStatus}`);
            res.send('LED status updated successfully');
        } catch (error) {
            console.error('Error updating LED status:', error.message);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Invalid input. Please provide a four-digit binary number.');
    }
});

app.get('/', (req, res) => {
    res.send('welcomd');
})
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
