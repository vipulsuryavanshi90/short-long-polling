import express from 'express';

const app = new express();

const PORT  = process.env.PORT || 5001;
let sampleData = 'Initial data recieved';

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

app.listen(PORT, () => {
    console.log(`Application running at: ${PORT}`);
})