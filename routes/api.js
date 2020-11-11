
const cors = require('cors');
const express = require('express');
const router = express.Router();

router.all('*', cors());

function isEmpty(str) {
    return (!str || 0 === str.length);
}

/* GET home page. */
router.get('/version', function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    res.send({version: "0.1.0"});

});

/*
    GET google verify.
    Example:
    GET /api/google/verify/applications/packageAlessio/purchases/products/00001/tokens/2180183832218021?access_token=38032
 */
router.get('/google/verify/applications/:packagename/purchases/products/:productid/tokens/:token',
    function (req, res) {

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


/*
    GET huawei verify.
    Example:
    GET /api/huawei/applications/purchases/tokens/verify
 */
router.post('/huawei/applications/purchases/tokens/verify', function(req, res) {

    const purchaseToken = req.body["purchaseToken"];
    const productId = req.body["productId"]

    if (isEmpty(purchaseToken)) {
        const msg = "purchaseToken is null or empty";
        console.error(msg);
        res.status(400).send(msg);
        return;
    }

    if (isEmpty(productId)) {
        const msg = "productId is null or empty";
        console.error(msg);
        res.status(400).send(msg);
        return;
    }

    console.log("purchaseToken = " + purchaseToken);
    console.log("productId = " + purchaseToken);

    const huaweiResponse =
        {
            "responseCode": "0",
            "responseMessage": "OK, verified",
            "purchaseTokenData": purchaseToken,
            "dataSignature": "11/11/2011",
        };

    res.setHeader('Content-Type', 'application/json');
    res.send(huaweiResponse);
});


/*
    POST apple verify.
    Example:
    POST /api/apple/verify

    Body: {
        "receipt-data": base 64 of receipt
    }

 */
router.post('/apple/verify', function(req, res) {

    const receiptData = req.body["receipt-data"];

    if (isEmpty(receiptData)) {
        const msg = "Receipt Data is null or empty";
        console.error(msg);
        res.status(400).send(msg);
        return;
    }

    console.log("Receipt Data = " + receiptData);

    const appleResponse =
    {
        "receipt": {
            "receipt_type": "ProductionSandbox",
            "adam_id": 0,
            "app_item_id": 0,
            "bundle_id": "com.artsana.BebeCare1",
            "application_version": "1",
            "download_id": 0,
            "version_external_identifier": 0,
            "receipt_creation_date": "2018-10-04 08:37:08 Etc/GMT",
            "receipt_creation_date_ms": "1538642228000",
            "receipt_creation_date_pst": "2018-10-04 01:37:08 America/Los_Angeles",
            "request_date": "2018-10-04 13:07:58 Etc/GMT",
            "request_date_ms": "1538658478144",
            "request_date_pst": "2018-10-04 06:07:58 America/Los_Angeles",
            "original_purchase_date": "2013-08-01 07:00:00 Etc/GMT",
            "original_purchase_date_ms": "1375340400000",
            "original_purchase_date_pst": "2013-08-01 00:00:00 America/Los_Angeles",
            "original_application_version": "1.0",
            "in_app": [{
                "quantity": "1",
                "product_id": "com.artsana.bebecare.25Alerts",
                "transaction_id": "1000000452838655",
                "original_transaction_id": "1000000452838655",
                "purchase_date": "2018-10-04 08:37:07 Etc/GMT",
                "purchase_date_ms": "1538642227000",
                "purchase_date_pst": "2018-10-04 01:37:07 America/Los_Angeles",
                "original_purchase_date": "2018-10-04 08:37:07 Etc/GMT",
                "original_purchase_date_ms": "1538642227000",
                "original_purchase_date_pst": "2018-10-04 01:37:07 America/Los_Angeles",
                "is_trial_period": "false"
            }]
        },
        "status": 0,
        "environment": "Sandbox"
    };

    res.setHeader('Content-Type', 'application/json');
    res.send(appleResponse);
});


module.exports = router;
