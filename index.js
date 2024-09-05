const express = require('express');

const app = new express();

const PORT  = process.env.PORT || 5001;
let sampleData = 'Initial data recieved';

let waitingClients = [];

app.get('/shortPolling', (req, res) => {
    res.sendFile(__dirname + '/src/shortPolling/index.html');
});

app.get('/longPolling', (req, res) => {
    res.sendFile(__dirname + '/src/longPolling/index.html');
});

app.get('/getData', (req, res) => {
    res.send({
        data: sampleData,
    }); 
});

app.get('/updateData', (req, res) => {
    sampleData = 'updated data recieved'
    res.send({
        data: sampleData,
    });
});

//Long polling 

app.get('/getLongPollingData', (req, res) => {
    if(sampleData !== req.query.lastData) {
        res.json({ data: sampleData });
    }else {
        waitingClients.push(res);
    }
});

app.get('/updateLongPollingData', (req, res) => {
    sampleData = req.query.data

    while(waitingClients.length > 0){
        const client = waitingClients.pop();
        client.json({data: sampleData});
    }
    res.send({
        message: 'Data updated successfully for all clients',
    });
});

app.listen(PORT, () => {
    console.log(`Application running at: ${PORT}`);
})