import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import UserModel from "../models/UserModel.js";

export const createUser = asyncHandler(async (req, res) => {
    let { username, password } = req.body;

    password = await bcrypt.hash(password, 10);

    const createdUser = await UserModel.create({
        username,
        password,
    });
    if (!createdUser) throw new Error("Invalid input");

    res.status(201).json(createdUser);
});
