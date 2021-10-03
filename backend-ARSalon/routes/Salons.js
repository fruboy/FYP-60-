var express = require('express');
var router = express.Router();
//Salon Controller import
const SalonController = require('../controllers/Salon-Controllers');

// Salon Routes
router.post('/register',SalonController.salonSignupController);
router.get('/SalonsData',SalonController.SalonsData);
router.delete('/deleteSalon/:SId',SalonController.deleteSalon);
router.put('/editSalon/:SId',SalonController.editSalon);

router.post('/emailCheck',SalonController.emailCheck);
router.post('/usernameCheck',SalonController.usernameCheck);
router.post('/login',SalonController.salonLogin);
router.post('/logout',SalonController.Logout);

router.get('/allSalons',SalonController.getAllSalons);
router.get('/:id',SalonController.getSalonbyId);
router.get('/appointments/:salonid',SalonController.getAppointmentsbyId);


router.put('/changeAppointmentStatus/:appId',SalonController.changeAppointmentStatus);
router.delete('/deleteAppointment/:appId',SalonController.deleteAppointment);

router.put('/editProfile/:SalonId',SalonController.editProfile);
router.put('/changeMembershipPlan/:SalonId',SalonController.changeMembershipPlan);
router.put('/changeStatus/:SalonId',SalonController.changeStatus);

module.exports = router;






