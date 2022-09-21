This node server runs off a Postgres DB with 3 tables; doctors, patients, and apps (appointments).
NOTE: I am going to try and make sure anyone who makes a query to the DB from any IP has access, but if it's not working please email me so I can whitelist
Another note: I did not get around to type checking and verification, but I think what I have right now is a solid barebones backend

To start the server:
    start by running "npm i"
    then run "npm start"

To get a list of all current doctors: 
    make a get request to "http://localhost:3000/api/doctors"
    an array of objects containing doctors information is returned (id and name is all I have now)

To get a list of all appointments for a particular doctor:
    make a get request to "http://localhost:3000/api/appsDoctor/:doctorID" replacing ":doctorID" with the id of the doctor of your choosing
    this will return an array of appointment objects (kind of appointment, date, and doctors name is all it returns right now)

To get a list of all appointments for a particular date:
    make a get request to "http://localhost:3000/api/appsDoctor/:date" replacing ":date" with the id of the date of your choosing
    it's crucial the date is structured as follow: 'yyyy/mm/dd', and is url encoded, so instead of / %2f would be used (it would look like yyyy%2fmm%2fdd)
    this returns an array of appointment objects (kind of appointment, date, and doctors name is all it returns currently)

To delete an exiting appointment from a doctors calendar: 
    make a delete request to "http://localhost:3000/api/apps/:appID" replacing ":appID" with the ID of the appointment to be deleted
    this returns a single confirming if it was deleted or an error message
    currently it does not check if it deleted something or not, so if there wasn't a matching appointment it still assumes there was

To add a new appointment:
    make a post request to "http://localhost:3000/api/apps" with a body in the following structure:
        {
            date: "yyyy/mm/dd hh:mm:ss", (This is crucial as the checking of appointment time relies on position of the minutes)
            patient_id: number,
            doctor_id: number,
            kind: string
        }
    assuming the date is in the correct format it will check if it is an interval of 15 minutes
    you also can not add more than 3 appointments for one doctor at a specific time (as in day and time)