import mongoose from "mongoose";

const Customer = new mongoose.Schema(
    { 
        username: { 
            type: String, 
            required: true
        },
        password: { 
            type: String,
            required: true,
            min: 6
        },
        role: [{
            type: String,
            required: true  
        }]
    },
    { 
        timestamps: true
    }
)

export default mongoose.model('Customer', Customer)