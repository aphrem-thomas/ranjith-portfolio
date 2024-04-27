import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    thumbnailurl: {
        type: String,
        required: [true, "Please provide a thumbnailurl"],
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    location: {
        type:String,
        required: [true, "Please provide a location"],
    },
    url: {
        type: String,
        required: [true, "Please event url"],
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

const Events = mongoose.models.events || mongoose.model("events", eventSchema);

export default Events;