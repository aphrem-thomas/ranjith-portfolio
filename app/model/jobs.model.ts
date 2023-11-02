import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
    thumbnailurl: {
        type: String,
        required: [true, "Please provide a thumbnailurl"],
    },
    role: {
        type: String,
        required: [true, "Please provide a email"],
    },
    company: {
        type: Boolean,
        default: false,
    },
    location: {
        type:[String]
    },
    department:{
        type:String
    },
    url: {
        type: String,
        default: '',
    },
    submittedDate: Date,
})

const Jobs = mongoose.models.jobs || mongoose.model("jobs", jobsSchema);

export default Jobs;