import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
    thumbnailurl: {
        type: String,
        required: [true, "Please provide a thumbnailurl"],
    },
    role: {
        type: String,
        required: [true, "Please provide a role"],
    },
    company: {
        type: String,
        required: [true, "Please company name"],
    },
    location: {
        type:String,
    },
    department:{
        type:String,
        required: [true, "Please company department"],
    },
    url: {
        type: String,
        required: [true, "Please job url"],
    },
    submitter:{
        type: String,
        required: [true, "Please provide who submitted"],
    },
    submitter_email:{
        type: String,
        required: [true, "Please provide email of who submitted"],
    },
    approved:{
        type: Boolean,
        required: [true, "Please provide email of who submitted"],
    },
    submittedDate: Date,
})

const Jobs = mongoose.models.jobs || mongoose.model("jobs", jobsSchema);

export default Jobs;