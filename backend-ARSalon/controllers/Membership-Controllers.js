var MembershipPlan = require('../models/MembershipPlans');

const addMembershipPlan = async (req, res, next) => {
    const newPlan = new MembershipPlan({
        name: req.body.name,
        price: req.body.price,
        duration: req.body.duration
    });
    const result = await newPlan.save()
    .catch((error) => {
        res.json({ 
            "error message": error,
            "status": "Record not added"
        });
    });
    res.json({"status": "Record added"});
};

const PlansData = async (req, res, next) => {
    let resultsArray = [];
    let num_salons = 0;
    const plans = await MembershipPlan.find({});
    //console.log(salons);
    for (let i = 0; i < plans.length; i++) {
        num_salons = await Salon.countDocuments({ membership_plan:plans[i]._id });
        resultsArray[i] = {
            key: plans[i]._id,
            name: plans[i].name,
            price: plans[i].price,
            duration: plans[i].duration,
            salons: num_salons
        }
    };
    res.json(resultsArray);
};
const getMembershipPlanbyId = async (req, res, next) => {
    const membership = await MembershipPlan.findById(req.params.memId);
    if (membership != null) {
        res.json(membership);
    }
    else {
        res.json({ "message": "No data" });
    }
};
const deletePlan = async (req, res, next) => {
    try {
        const app = await MembershipPlan.findByIdAndDelete(req.params.appId);
        if (!app) {
            res.json({ "message": "No plan found with given id!" });
        }
        else {
            res.json({ "message": "Membership Plan Deleted" });
        }
    } catch (error) {
        response.status(500).json(error);
    }
};
const editPlan = async (req, res, next) => {
    const id = req.params.PlanId;
    const filter = { _id: id };
    let prof = await MembershipPlan.findOneAndUpdate(filter,
        {
            name: req.body.name,
            price: req.body.price,
            duration: req.body.duration,
        }
    );
    if (prof === null) {
        res.json({ "message": "No Plans found with given id!" });
    }
    else {
        res.json({ "message": "Changes Saved" });
    }
};
module.exports = {
    addMembershipPlan,
    PlansData,
    getMembershipPlanbyId,
    deletePlan,
    editPlan
};