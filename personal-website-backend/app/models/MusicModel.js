import mongoose from "mongoose"

const Thumbnail = new mongoose.Schema(
    {
        url: { 
            type: String, 
            required: true 
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    }
)

const Data = new mongoose.Schema(
    {  
        snippet: {
            title: {
                type: String, 
                required: true
            },
            thumbnail: {
                def: {
                    type: Thumbnail,
                    required: true
                },
                medium: {
                    type: Thumbnail,
                    required: true
                },
                high: {
                    type: Thumbnail,
                    required: true
                },
                standard: {
                    type: Thumbnail,
                },
                maxres: {
                    type: Thumbnail,
                }
            }
        }, 
        player: {
            embedHtml: {
                type: String,
                required: true
            }
        },
    },
    { timestamps: true },
)

export default mongoose.model("Music", Data)