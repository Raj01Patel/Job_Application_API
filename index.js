const express = require("express");
const mongoose = require("mongoose");
const jobRoutes = require("./route/jobroute")

const app = express();


mongoose.connect("mongodb://localhost:27017/job_app")
    .then(() => console.log("DB Connected successfully"))
    .catch((err) => console.log("Error connecting database", err))

app.use(express.json())
app.use(jobRoutes);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})