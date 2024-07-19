const JobModel = require("../model/jobmodel");

const createJob = async (req, res) => {

    try {
        const response = await JobModel.create(req.body);
        res.json({
            success: true,
            message: "Job created successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            messae: "Something went wrong, please try again after sometime",
        });
    }
}

const listJob = async (req, res) => {
    const minSalary = req.query.minSalary
    const jobList = await JobModel.find({
        // title: {
        //     $regex: new RegExp(`${req.query.title}`, "gi"),
        // },

        salary: {
            $gt: minSalary,
        }

    })
    res.json({
        success: true,
        message: "Job List",
        results: jobList,
    })
}

const updateJob = async (req, res) => {

    const updateObj = {
        $set: req.body,
    };
    // const filterObj = {
    //     salary: 80000,
    // }
    const response = await JobModel.findByIdAndUpdate(req.params.id, updateObj);
    // const response = await JobModel.updateMany(filterObj, updateObj);
    console.log(response);
    if (!response) {
        return res.json({
            success: false,
            message: "Item not updated or Found"
        })
    }
    res.json({
        success: true,
        message: "update job API",
    })
}

const deleteJob = async (req, res) => {

    const response = await JobModel.findByIdAndDelete(req.params.id)
    if (!response) {
        return res.json({
            success: false,
            message: "Invalid ID"
        });
    }
    res.json({
        success: true,
        message: "Job Deleted",
    })
}

const jobController = {
    createJob,
    listJob,
    updateJob,
    deleteJob,
}

module.exports = jobController;

