var express = require('express');
var router = express.Router();

const MemController = require('../controllers/Membership-Controllers');

router.get('/memPlans',MemController.PlansData);
router.post('/addMembershipPlan',MemController.addMembershipPlan);
router.get('/memPlans/:id',MemController.getMembershipPlanbyId);
router.delete('/deletePlan/:appId',MemController.deletePlan);
router.put('/editPlan/:PlanId',MemController.editPlan);


module.exports = router;