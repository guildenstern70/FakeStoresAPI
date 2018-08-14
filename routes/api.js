

const express = require('express');
const router = express.Router();

function isEmpty(str) {
    return (!str || 0 === str.length);
}

/* GET home page. */
router.get('/version', function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    res.send({version: "0.1.0"});
});

/* GET google verify.
   Example:
   GET /api/google/verify/applications/packageAlessio/purchases/products/00001/tokens/2180183832218021?access_token=38032
 */
router.get('/google/verify/applications/:packagename/purchases/products/:productid/tokens/:token', function (req, res) {

    const accessToken = req.query.access_token;

    if (isEmpty(accessToken)) {
        const msg = "Unauthorized";
        console.error(msg);
        res.status(401).send(msg);
        return;
    }

    console.log("Access Token = " + accessToken);

    if (isEmpty(req.params.packagename)) {
        const msg = "Package name is null or empty";
        console.error(msg);
        res.status(400).send(msg);
        return;
    }

    if (isEmpty(req.params.productid)) {
        const msg = "Product ID is null or empty";
        console.error(msg);
        res.status(400).send(msg);
        return;
    }

    if (isEmpty(req.params.token)) {
        const msg = "Token is null or empty";
        console.error(msg);
        res.status(400).send(msg);
        return;
    }

    res.setHeader('Content-Type', 'application/json');

    console.log("Package Name = " + req.params.packagename);
    console.log("Product ID = " + req.params.productid);
    console.log("Token = " + req.params.token);

    const googleResponse = {
        "kind": "androidpublisher#productPurchase",
        "purchaseTimeMillis": Date.now(),
        "purchaseState": 0, // 0=purchased, 1=cancelled
        "consumptionState": 0, // 0=to be consumed, 1=consumed
        "developerPayload": "This is the developer payload",
        "orderId": "3289HJHHK987393J",
        "purchaseType": 1 // 0=test, 1=promo
    };

    res.send(googleResponse);
});

/* GET reports. */
router.get('/apple/verify/', function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    res.send({"todo": true});
});


module.exports = router;
