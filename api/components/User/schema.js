const mongoose = require("mongoose");
const {Schema} = mongoose;

const UsersSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default:'estudiante'
        }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("users", UsersSchema);
