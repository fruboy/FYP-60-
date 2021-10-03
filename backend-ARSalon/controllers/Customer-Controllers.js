var User = require('../models/user');
const bcrypt = require('bcryptjs');

const CustomersData = async (req, res, next) => {
    let resultsArray = [];
    const users = await User.find({});
    for (let i = 0; i < users.length; i++) {
        //console.log(typeof users[i].date)
        resultsArray[i] = {
            key: users[i]._id,
            name: users[i].name,
            Email: users[i].email,
            JoinDate: (users[i].date).toString().substring(4, 15),
            number: users[i].number,
            status: users[i].status
        }
    };
    res.json(resultsArray);
};
const addCustomer = async (req, res, next) => {
    const password = await bcrypt.hash(req.body.password, 10);
    const newCustomer = new User({
        name: req.body.name,
        email: req.body.email,
        password,
        number: req.body.number,
        status: "Active"
    });
    const result = await newCustomer.save()
        .catch((error) => {
            res.json({
                "error message": error,
                "status": "Record not added"
            });
        });
    res.json({ "status": "Record added" });
};
const editCustomer = async (req, res, next) => {
    const id = req.params.CId;
    const filter = { _id: id };
    if (req.body.password != undefined){
        password = await bcrypt.hash(req.body.password, 10);
        let prof = await User.findOneAndUpdate(filter,
            {
                name: req.body.name,
                email: req.body.email,
                number: req.body.phone,
                password
            }
        );
        if (prof === null) {
            res.json({ "message": "No Customer found with given id!" });
        }
        else {
            res.json({ "message": "Changes Saved" });
        }
    }
    else{    
        let prof = await User.findOneAndUpdate(filter,
            {
                name: req.body.name,
                email: req.body.email,
                number: req.body.phone,
            }
        );
        if (prof === null) {
            res.json({ "message": "No Customer found with given id!" });
        }
        else {
            res.json({ "message": "Changes Saved" });
        }
    }
};
const deleteCustomer = async (req, res, next) => {
    try {
        const app = await User.findByIdAndDelete(req.params.CId);
        if (!app) {
            res.json({ "message": "No Customer found with given id!" });
        }
        else {
            res.json({ "message": "Customer Deleted" });
        }
    } catch (error) {
        response.status(500).json(error);
    }
};
const changeStatus = async (req, res, next) => {
    const id = req.params.CId;
    const filter = { _id: id };
    let prof = await User.findOneAndUpdate(filter,
        {
            status: req.body.status
        });
    if (prof === null) {
        res.json({ "message": "No Customers found with given id!" });
    }
    else {
        res.json({ "message": "Customer Status changed" });
    }
};
module.exports = {
    CustomersData,
    addCustomer,
    editCustomer,
    deleteCustomer,
    changeStatus
};