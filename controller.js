const { nextTick } = require("process");
const db = require("./dataModel");


module.exports = {
    // Middleware to send back an array of all doctors
    getDoctors(req, res, next) {
        db.query("SELECT * FROM DOCTORS;")
            .then(resp => {
                res.locals = resp.rows;
                return next();
            })
            .catch(err => {
                return next({
                    log: "Error caught in getDoctorsByDate middleware",
                    status: 400,
                    msg: {err}
                });
            });
    },

    getAppsByDoctor(req, res, next) {
        db.query(
            `SELECT apps.kind, apps.date, d.first_name AS doctor_first, d.last_name AS doctor_last FROM apps
             LEFT JOIN doctors AS d ON d.id = apps.doctor_id WHERE doctor_id = $1;`, [req.params.doctorID])
            .then(resp => {
                res.locals = resp.rows;
                return next();
            })
            .catch(err => {
                return next({
                    log: "Error caught in getDoctorsByDoctor middleware",
                    status: 400,
                    msg: {err}
                });
            })
    },

    getAppsByDate(req, res, next) {
        const date = req.params.date;
        db.query(
            `SELECT apps.kind, apps.date, d.first_name AS doctor_first, d.last_name AS doctor_last FROM apps
             LEFT JOIN doctors AS d ON d.id = apps.doctor_id
             WHERE date >= '${date} 00:00:00' AND date <= '${date} 24:00:00';`)
            .then(resp => {
                res.locals = resp.rows;
                return next();
            })
            .catch(err => {
                return next({
                    log: "Error caught in getDoctorsByDate middleware",
                    status: 400,
                    msg: {err}
                });
            });
    },

    deleteApp(req, res, next) {
        db.query(`DELETE FROM apps WHERE id = $1;`, [req.params.appID])
            .then(resp => {
                res.locals = resp.rows;
                return next();
            })
            .catch(err => {
                return next({
                    log: "Error caught in deleteApp middleware",
                    status: 400,
                    msg: {err}
                })
            });
    },

    // For this method it's really important the date format is yyyy/mm/dd hh:mm:ss
    async addApp(req, res, next) {
        const {date, patient_id, doctor_id, kind} = req.body;
        if (Number(date.slice(14, 16)) % 15 !== 0) {
            return next({
                log: "Error in addApp: Invalid date/time, must be increment of 15 minutes",
                status: 400,
                msg: {err: "Invalid date/time, must be increment of 15 minutes"}
            });
        } else {
            const numApps = await db.query("SELECT * FROM apps WHERE doctor_id = $1 AND date = $2", [doctor_id, date]);

            if (numApps.rows.length < 3) {
                db.query(`INSERT INTO apps (patient_id, doctor_id, date, kind) VALUES ($1, $2, $3, $4);`, [patient_id, doctor_id, date, kind])
                    .then(resp => next())
                    .catch(err => {
                        return next({
                            log: "Error caught in addApp middleware",
                            status: 400,
                            msg: {err}
                        })
                    });
            } else {
                return next({
                    log: "Error caught in addApp middleware: Doctor already has maximum amount of appointments for that day",
                    status: 400,
                    msg: {err: "Error caught in addApp middleware: Doctor already has maximum amount of appointments for that day"}
                });

            }
            
            

        };
    }
};