var express = require('express');
var router = express.Router();

const CustomerController = require('../controllers/Customer-Controllers');

router.get('/CustomersData',CustomerController.CustomersData);
router.post('/addCustomer',CustomerController.addCustomer);
router.put('/editCustomer/:CId',CustomerController.editCustomer);
router.delete('/deleteCustomer/:CId',CustomerController.deleteCustomer);
router.put('/changeStatus/:CId',CustomerController.changeStatus);

module.exports = router;