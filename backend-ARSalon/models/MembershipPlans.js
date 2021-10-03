const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MembershipPlans = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    } 
},
    {
        timestamps: true,
    }
);
module.exports = MembershipPlan = mongoose.model("MembershipPlans", MembershipPlans);