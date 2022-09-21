const { Pool } = require("pg");

const dbURI = "postgres://wcaribfs:d--YJeRgs82AkgWs_1g7SvbfYofxAVEk@heffalump.db.elephantsql.com/wcaribfs";
const pool = new Pool({
    connectionString: dbURI,
});

/* Shape of the DB

 * doctors:
    id SERIAL UNIQUE NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    PRIMARY KEY(id)

 * patients:
    id SERIAL NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    PRIMARY KEY(id)

 * apps:
    id SERIAL NOT NULL,
    patient_id integer not null,
    doctor_id integer not null,
    kind varchar(50) NOT NULL,
    date timestamp NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT patient_id foreign key(patient_id) references patients(id),
    CONSTRAINT doctor_id foreign key(doctor_id) references doctors(id)
 */

module.exports = {
    query: (text, params, cb) => {
        console.log("Query ran:", text);
        return pool.query(text, params, cb);
    },
};