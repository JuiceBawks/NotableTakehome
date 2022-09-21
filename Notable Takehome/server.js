const express = require("express");
const router = require("./router");
const controller = require("./controller");
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hey! Please elaborate your request');
});

app.use("/api", router); 

app.use((err, req, res, next) => {
    const defErr = {
        log: "Middleware error caught",
        status: 400,
        msg: {err: "An error occured"}
    };
    const errObj = Object.assign({}, defErr, err);
    console.log(errObj.log);
    return res.status(errObj.status).json(errObj.msg);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});