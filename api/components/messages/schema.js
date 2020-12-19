const mongoose = require("mongoose");
const {Schema} = mongoose;

const UsersSchema = new Schema(
    {
        messages: {
            type: Array,
        }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("messages", UsersSchema);
