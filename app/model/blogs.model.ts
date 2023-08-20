import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    tags: {
        type:[String]
    },
    text: {
        type: String,
        default: '',
    },
    submittedDate: Date,
})

const Blogs = mongoose.models.blogs || mongoose.model("blogs", blogsSchema);

export default Blogs;