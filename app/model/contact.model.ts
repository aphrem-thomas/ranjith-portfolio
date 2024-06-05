import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type:String,
        required: [true, "Please provide a location"],
    },
    submittedDate: Date,
})

const Contacts = mongoose.models.contacts || mongoose.model("contacts", contactSchema);

export default Contacts;