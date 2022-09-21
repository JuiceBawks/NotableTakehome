const express = require("express");
const controller = require("./controller");
const router = express.Router();


router.get("/doctors", controller.getDoctors, (req, res) => {
    res.status(200).json(res.locals);
});

router.get("/appsDoctor/:doctorID", controller.getAppsByDoctor, (req, res) => {
    res.status(200).json(res.locals);
});


router.get("/appsDate/:date", controller.getAppsByDate, (req, res) => {
    res.status(200).json(res.locals);
});

router.delete("/apps/:appID", controller.deleteApp, (req, res) => {
    res.status(200).send(`Appointment ${req.params.appID} deleted successfully!`);
});

/* The body I am expecting is 
    {
        date,
        patient_id, NOTE: I am using the ID instead of name since names can overlap but ids are unique, no potential for confusion between patients
        doctor_id, NOTE: Same note as above ^
        kind
    }
*/
router.post("/apps", controller.addApp, (req, res) => {
    res.status(200).send('Appointment successfully added!');
});

module.exports = router;