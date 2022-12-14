import mongoose from 'mongoose'

const Users = new mongoose.Schema(
    { 
        username: { 
            type: String, 
            required: true
        },
        password: { 
            type: String,
            required: true,
            min: 6
        }
    },
    { 
        timestamps: true
    }
)

export default mongoose.model('Users', Users)