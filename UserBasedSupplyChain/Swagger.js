var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const Web3 = require('web3');
const Window = require('window');
const window = new Window();
const Tx = require('ethereumjs-tx').Transaction;
var abi = require('../abi');
var web3;
var instance;
var networkId;
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

const contractAddress = "0x1D5C7a92469dfd29d7ECEa7a525C620E895576Ed";//0x1D5C7a92469dfd29d7ECEa7a525C620E895576Ed
const infuraURL = "https://rinkeby.infura.io/v3/8b5a5775abdb479d862df16b39f7354f";
// const privateKey = "f60e1e89d1b1b24c3569229f576548860364ed53f73d2baea670170fdfe5b3ab"
const privateKey = Buffer.from(
    "98a672b94f680da9791800380aff9f23d8fea90e70a483a352240bd35eb659fb",
    'hex',
  )
const myAddress = "0x6898Ea29bF4506aDf7e7Bf7954c9a8F06B541f7C";
/**
 * @swagger
 * tags:
 *   - name: Basic
 *     description: "User Management"
 *     
 * components:
 *   schemas:
 *     login2:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: User's phone number
 *         password:
 *           type: string
 *           description: User's Password
 *       example:
 *         phoneNumber: "9898989898"
 *         password: testPassword
 */

/**
 * @swagger
 * /api/InitialSetup:
 *  get:
 *    summary: Initial Setup
 *   
 *    tags:
 *      - Basic

 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
router.get('/InitialSetup', async (req, res) => {
    console.log("Metamask!");
    // web3 = new Web3(window.ethereum);
    web3 = new Web3(new Web3.providers.HttpProvider(infuraURL))
    // console.log(web3);
    console.log(window.ethereum);

    contract = new web3.eth.Contract(abi, contractAddress);
    networkId = await web3.eth.net.getId();
    console.log(networkId);
    console.log(contract.methods);
    console.log(await web3.eth.getTransactionCount(myAddress))
    // window.ethereum.enable();
    res.send("working");
});



/**
 * @swagger
 * /api/Authenticate/{UserName}/{Password}:
 *  get:
 *    summary: Initial Setup
 *    parameters:
 *     - in: path
 *       name: UserName
 *       schema:
 *          type : string
 *          required : true
 *          description:  UserName Required
 *     - in: path
 *       name: Password
 *       schema:
 *          type : string
 *          required : true
 *          description:  Password Required
 * 
 *
 *    tags:
 *      - Basic
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/Authenticate/:UserName/:Password', async (req, res) => {
         console.log(req.params);
    
        const result = await contract.methods.Authenticate(req.params.UserName,req.params.Password).call();
        res.send(result);
     });





/**
 * @swagger
 * /api/testConnection:
 *  get:
 *    summary: testing the connection by hitting a simple dummy method
 *    tags:
 *      - getters
 *      
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/testConnection', async (req, res) => {
    const result = await contract.methods.AdminAddress().call();
    res.send(result);
 });


/**
 * @swagger
 * /api/getUserList:
 *  get:
 *    summary: Getting User Keylist
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/getUserList', async (req,res)=>{
    const result = await contract.methods.useKeys().call();
    res.send(result);
 });



 /**
 * @swagger
 * /api/getDrugDetails/{SerialNumber}:
 *  get:
 *    summary: Getting Baisc Drug details
 *    parameters:
 *     - in: path
 *       name: SerialNumber
 *       schema:
 *          type : string
 *          required : true
 *          description:  UserName Required
 *    
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
  router.get('/getDrugDetails/:SerialNumber', async (req,res)=>{
    const result = await contract.methods.BatchDrugDetails(req.params.UserName).call();
    res.send(result);
 });





/**
 * @swagger
 * /api/getDrugKeyList:
 *  get:
 *    summary: Getting Drug Key list
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/getDrugKeyList', async (req,res)=>{
    const result = await contract.methods.getDrugKeyList().call();
    console.log(result.length);
    res.send(result);
 });



/**
 * @swagger
 * /api/UserDetails/{UserName}:
 *  get:
 *    summary: get User Details
 *    parameters:
 *     - in: path
 *       name: UserName
 *       schema:
 *          type : string
 *          required : true
 *          description:  UserName Required
 *
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/UserDetails/:UserName', async (req,res)=>{
   const result = await contract.methods.BatchUserDetails(req.params.UserName).call();
   res.send(result);
});



/**
 * @swagger
 * /api/ManufacturerDetails/{SerialNumber}:
 *  get:
 *    summary: Manufacturer Details
 *    parameters:
 *     - in: path
 *       name: SerialNumber
 *       schema:
 *          type : string
 *          required : true
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/ManufacturerDetails/:SerialNumber', async (req,res)=>{
   const result = await contract.methods.BatchManufactureringDetails(req.params.SerailNumber).call();
   res.send(result);
});



/**
 * @swagger
 * /api/DistributorDetails/{SerialNumber}:
 *  get:
 *    summary: Distributor Details
 *    parameters:
 *     - in: path
 *       name: SerialNumber
 *       schema:
 *          type : string
 *          required : true
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/DistributorDetails/:SerialNumber', async (req,res)=>{
    const result = await contract.methods.BatchdistributorDetails(req.params.SerailNumber).call();
    res.send(result);
 });



/**
 * @swagger
 * /api/WholesalerDetails/{SerailNumber}:
 *  get:
 *    summary: WholeSaler Details
 *    parameters:
 *     - in: path
 *       name: SerialNumber
 *       schema:
 *          type : string
 *          required : true
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/WholesalerDetails/:SerialNumber', async (req,res)=>{
   const result = await contract.methods.BatchWholesalerDetails(req.params.SerailNumber).call();
   res.send(result);
});


/**
 * @swagger
 * /api/PharmacyDetails/{serailNumber}:
 *  get:
 *    summary: Pharmacy Details
 *    parameters:
 *     - in: path
 *       name: SerialNumber
 *       schema:
 *          type : string
 *          required : true
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/PharmacyDetails/:SerailNumber', async (req,res)=>{
   const result = await contract.methods.BatchPharmacyDetails(req.params.SerailNumber).call();
   res.send(result);
});

/**
 * @swagger
 * /api/UserRole/{UserName}:
 *  get:
 *    summary: User Role 
 *    parameters:
 *     - in: path
 *       name: UserName
 *       schema:
 *          type : string
 *          required : true
 *          description:  UserName Required
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/UserRole/:UserName', async (req,res)=>{
    const result = await contract.methods.userRole(req.params.UserName).call();
    res.send(result);
 });




/**
 * @swagger
 * /api/AddUser:
 *  post:
 *    summary: adding drug Details
 *    tags:
 *      - Setters
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
router.post('/AddUser', async (req, res) => {
    console.log(req.body);
    const web3js = web3;
    web3js.eth.getTransactionCount(myAddress).then(function(v){
        console.log("Count: "+v);
        count = v;
        var amount = web3js.utils.toHex(1e16);
        //creating raw tranaction
        var rawTransaction = {
            "from":myAddress,
             "gasPrice":web3js.utils.toHex(35* 1e9),
             "gasLimit":web3js.utils.toHex(4481130),
             "to":contractAddress,"value":"0x0",
             "data":contract.methods.setUser("Admin","Satya",1234,"Satya","Satya","Satya@gmail.com","Manufacturer").encodeABI(),
             "nonce":web3js.utils.toHex(count)}
        console.log(rawTransaction);
        //creating tranaction via ethereumjs-tx
        var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
        //signing transaction with private key
        transaction.sign(privateKey);
        //sending transacton via web3js module
        web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
        .on('transactionHash',console.log);
    })
    res.send("Check hash returned in terminal on https://rinkeby.etherscan.io/")
})



/**
 * @swagger
 * /api/AddDrug:
 *  post:
 *    summary: adding drug Details
 *    parameters:
 *     - name: CurrentUser
 *       description: CurrentUser
 *       in: formData
 *       required: true
 *       type: string  
 *     - name: Name
 *       description: Name
 *       in: formData
 *       required: true
 *       type: string 
 *     - name: ContactNo
 *       description: ContactNo
 *       in: formData
 *       required: true
 *       type: int32   
 *     - name: UserName
 *       description: UserName
 *       in: formData
 *       required: true
 *       type: string  
 *     - name: Password
 *       description: Password
 *       in: formData
 *       required: true
 *       type: string 
 *     - name: Role
 *       description: Role
 *       in: formData
 *       required: true
 *       type: string  
 *  
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/AddDrug', async (req, res) => {
   const web3js = web3;
   web3js.eth.getTransactionCount(myAddress).then(function(v){
    
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(35* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.addDrugDetails("Satya",3,3,"Strepsils","Manufacturer",1648814012,1748814012,5,10,"0x0000000000000000000000000000000000000000").encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on https://rinkeby.etherscan.io/")
});



/**
 * @swagger
 * /api/UpdateDrug:
 *  post:
 *    summary: adding drug Details
 *  
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/UpdateDrug', async (req, res) => {
   const web3js = web3;
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(35* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.addDrugDetails("Satya",2,2,"saridon","Manufacturer",1648814012,1748814012,5,10,"0x1d42EbE493E7AA9bda76873F78a53b10a7ec677a").encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on https://rinkeby.etherscan.io/")
});





/**
 * @swagger
 * /api/ManufacturerShipping:
 *  post:
 *    summary: adding drug Details
 *  
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/ManufacturerShipping', async (req, res) => {
   const web3js = web3;
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(35* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.moveFromManufacturer("0x1d42EbE493E7AA9bda76873F78a53b10a7ec677a","Satya","Distributor","Prateek",10).encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on https://rinkeby.etherscan.io/")
});








/**
 * @swagger
 * /api/DistributorReceiving:
 *  post:
 *    summary: adding drug Details
 *  
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/DistributorReceiving', async (req, res) => {
   const web3js = web3;
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(35* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.distributorReceving("0x1d42EbE493E7AA9bda76873F78a53b10a7ec677a","Prateek","Distributor",7).encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on https://rinkeby.etherscan.io/")
});


/**
 * @swagger
 * /api/DistributorShipping:
 *  post:
 *    summary: adding drug Details
 *  
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/DistributorShipping', async (req, res) => {
   const web3js = web3;
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(35* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.moveFromDistributor("Prateek","0x1d42EbE493E7AA9bda76873F78a53b10a7ec677a",7,"Teja").encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on https://rinkeby.etherscan.io/")
});


/**
 * @swagger
 * /api/WholesalerReceiving:
 *  post:
 *    summary: adding drug Details
 *  
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/WholesalerReceiving', async (req, res) => {
   const web3js = web3;
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(35* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.wholesalerReceving("0x1d42EbE493E7AA9bda76873F78a53b10a7ec677a","Teja","Wholesaler",7).encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on https://rinkeby.etherscan.io/")
});



/**
 * @swagger
 * /api/WholesalerrShipping:
 *  post:
 *    summary: adding drug Details
 *  
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/WholesalerrShipping', async (req, res) => {
   const web3js = web3;
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(35* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.moveFromWholeSaler("Teja","0x1d42EbE493E7AA9bda76873F78a53b10a7ec677a",7,"Sanket").encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on https://rinkeby.etherscan.io/")
});

/**
 * @swagger
 * /api/PharmacyReceiving:
 *  post:
 *    summary: adding drug Details
 *  
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/PharmacyReceiving', async (req, res) => {
   const web3js = web3;
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(35* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.importToPharmacy("0x1d42EbE493E7AA9bda76873F78a53b10a7ec677a","Sanket","Pharmacy",7).encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on https://rinkeby.etherscan.io/")
});



/**
 * @swagger
 * /api/ChangeAdmin:
 *  post:
 *    summary: adding drug Details
 *  
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/ChangeAdmin', async (req, res) => {
   const web3js = web3;
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(35* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.changeAdmin("0x1d42EbE493E7AA9bda76873F78a53b10a7ec677a","Satya","Admin").encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on https://rinkeby.etherscan.io/")
});






module.exports = router;
