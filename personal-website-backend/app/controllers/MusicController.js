import asyncHandler from "express-async-handler";

import MusicModel from "../models/MusicModel.js"
import UserModel from '../models/UserModel.js'

export const createMusic = asyncHandler(async (req, res) => {
    const { snippet: { title, thumbnail: { standard, maxres, def, medium, high: { url, width, height } } }, player: { embedHtml } } = req.body
    
    const createdMusic = await MusicModel.create({
        snippet: { title, thumbnail: { standard, maxres, def, medium, high: { url, width, height } } }, player: { embedHtml } 
    })    
    res.status(201).json(createdMusic)
}) 

export const fetchMusics = asyncHandler(async (req, res) => {

    const fetchedMusics = await MusicModel.find()

    if(!fetchedMusics) {
        throw new Error("No music found")
    }
    res.status(200).json(fetchedMusics)
})

export const fetchMusic = asyncHandler(async (req, res) => {
    const musicID = req.params.id
    
    const fetchedMusic = await MusicModel.findById(musicID)

    if(!fetchedMusic) {
        throw new Error("No music found")
    }
    res.status(200).json(fetchedMusic)
})

export const deletedMusic = asyncHandler(async (req, res) => {
    const musicID = req.params.id

    const find = await MusicModel.findByIdAndDelete(musicID)
    if(!find) {
        throw new Error("ID not found")
    }
    res.status(200).json(find)

})

export const updatedMusic = asyncHandler(async (req, res) => {
    const { snippet: { title, thumbnail: { standard, maxres, def, medium, high: { url, width, height } } }, player: { embedHtml } } = req.body
    const musicID = req.params.id
    const updateMusic = await MusicModel.findByIdAndUpdate(
        musicID, 
        { $set: { snippet: { title, thumbnail: { standard, maxres, def, medium, high: { url, width, height } } }, player: { embedHtml } } },
        { new: true })

    res.status(200).json(updateMusic)
})