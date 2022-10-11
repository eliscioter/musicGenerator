import mongoose from 'mongoose'

const Token = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Token', Token)