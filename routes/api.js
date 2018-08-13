

const express = require('express');
const router = express.Router();

const reports = {
    title: 'Reports',
    items: [
        {
            id: 0,
            created: '10-gen-2018',
            name: 'Report 831029',
            isComplete: true
        },
        {
            id: 1,
            created: '11-gen-2018',
            name: 'Report 831030',
            isComplete: false
        },
        {
            id: 2,
            created: '10-feb-2018',
            name: 'Report 831031',
            isComplete: false
        },
        {
            id: 3,
            created: '14-mar-2018',
            name: 'Report 831032',
            isComplete: false
        }
    ]
};

/* GET home page. */
router.get('/version', function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({version: "0.1.0"}));
});

/* GET reports. */
router.get('/reportsdata', function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    res.send(reports);
});

/* POST new report. */
router.post('/reportsdata', function (req, res) {

    console.log('POST Received ' + JSON.stringify(req.body));

    reports.items.push( {
        id: reports.items.length+1,
        created: req.body.date,
        name: req.body.name,
        isComplete: (req.body.complete=='true')
    });

    res.status(201).send(); // Created

});

/* DELETE existing report */
router.delete('/reportsdata', function (req, res) {

    const id = Number(req.query.id);
    for (let idx in reports.items) {
        const item = reports.items[idx];
        if (item.id === id) {
            console.log('Deleting item at ' + idx);
            delete reports.items[idx];
        }
    }
    res.status(204).send(); // No-Content
});

module.exports = router;
