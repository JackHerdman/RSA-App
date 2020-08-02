const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const applicants = require("./applicants.json")

server.use(cors());
server.use(bodyParser.json());
// server.use(express.json());

server.get("/api/applicants", (request, response) => {
    response.json(applicants);
})

server.post("/api/applicants", (request, response) => {
    try {
        let name = request.body.name.trim();
        let qualifications = request.body.qualifications;
        let day = request.body.dateParts[2];
        let month = request.body.dateParts[1];
        let year = request.body.dateParts[0];
        let expiry = { day, month, year }
        let highest = 0;
        for (let i = 0; i < applicants.length; i++) {
            if (applicants[i].licenceNumber > highest) {
                highest = applicants[i].licenceNumber;
            }
        }
        let a = { name, licenceNumber: ++highest, qualifications, expiry };
        applicants.push(a)
        response.json({ applicants: a, status: 200 });
    }
    catch (error) {
        response.json({ status: 500 });
    }
})

server.get('/home', (request, response) => {
    response.send("This is the home route");
})

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`The server is listening on port http://localhost:${PORT}`);
})