import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import CustomerModel from "../models/CustomerModel.js";

export const createCustomer = asyncHandler(async (req, res) => {
    let { username, password, role } = req.body;

    password = await bcrypt.hash(password, 10);

    const createdCustomer = await CustomerModel.create({
        username,
        password,
        role
    });

    if (!createdCustomer) throw new Error("Invalid input");

    res.status(201).json(createdCustomer);
});

export const addRole = asyncHandler(async (req, res) => {
    const { role } = req.body
    const user = req.params.id
    try {
        const updatedRole = await CustomerModel.findByIdAndUpdate(
            user,
            { $push: { role: role } },
            { new: true }
        )
        res.status(200).json(updatedRole)
    } catch(err) {
        res.sendStatus(500)
    }
})

export const fetchRole = asyncHandler(async (req, res) => {
    const username = req.params.id

    const fetchUserRole = await CustomerModel.findOne({username: new RegExp('^'+username+'$', "i")})

    const role = fetchUserRole.role
    
    if(!fetchUserRole) return res.sendStatus(401)

    res.status(200).json(role)
})